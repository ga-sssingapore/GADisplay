from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, jwt_required, get_jwt_identity, get_jwt, get_jti, current_user
from argon2 import PasswordHasher
from uuid import uuid4
# Middleware
from middleware.requests import check_request
# Models
from models.db import db
from models.users import Users
from models.logins import Logins
# Schemas
from schemas.users import UsersSchema
from schemas.logins import LoginsSchema

auth_bp = Blueprint('auth_bp', __name__, url_prefix='/auth')
ph = PasswordHasher()
users_schema = UsersSchema()
logins_schema = LoginsSchema()


@auth_bp.route('/register', methods=["POST"])
@check_request
def register():
    name = request.json.get('name', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None or name is None:
        return jsonify({'status': 'error', 'message': 'missing credential(s)'}), 400
    # Check exiting user
    user_db = db.session.query(Users).filter(Users.email == email).one_or_none()
    if user_db is not None:
        return jsonify({'status': 'error', 'message': 'email already in use'}), 400
    pw_hash = ph.hash(password)
    try:
        new_user = Users(name, email, pw_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'user registered'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'error registering'}), 400


@auth_bp.route('/login', methods=["POST"])
@check_request
def login():
    email = request.json.get('email', None)
    password = request.json.get('password', None)
    if email is None or password is None:
        return jsonify({'status': 'error', 'message': 'email or password error'}), 401

    user_db = db.session.query(Users).filter(Users.email == email).first()

    if user_db is None:
        return jsonify({'status': 'error', 'message': 'invalid email'}), 401

    # Serialize user if present
    user = users_schema.dump(user_db)

    try:
        ph.verify(user['hash'], password)  # Raises VerificationError if fail verification
        user_id = user['id']
        payload = {'role': user['role'], 'name': user['name'], 'email': user['email']}  # id stored in claims as 'sub'
        # 02/06/2023: flask-jwt-extended generates tokens with uuid4 jti automatically
        access = create_access_token(user_db, additional_claims=payload)  # Default expiry: 15 mins
        refresh = create_refresh_token(user_db, additional_claims=payload)  # Default expiry: 30 days
        # Whitelist tokens
        db.session.query(Logins).filter_by(id=user_id).delete()
        access_db = Logins(get_jti(access), user_id)
        refresh_db = Logins(get_jti(refresh), user_id, get_jti(access), True)
        db.session.add(access_db)
        db.session.add(refresh_db)

        db.session.commit()
        return jsonify(access=access, refresh=refresh)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'invalid email or password'}), 401


@auth_bp.route('/login', methods=["DELETE"])
@jwt_required(refresh=True)
def logout():
    refresh_jti = get_jwt()['jti']
    try:
        access_jti = logins_schema.dump(Logins.query.filter_by(access_parent=refresh_jti)).one_or_none()
        if access_jti is not None:
            access = Logins.query.filter_by(jti=access_jti).one_or_none()
            if access is not None:
                db.session.delete(access)
        refresh = Logins.query.filter_by(jti=refresh_jti).one_or_none()
        if refresh is not None:
            db.session.delete(refresh)
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'user logged out'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'error logging out'})


@auth_bp.route('/refresh', methods=["POST"])
@jwt_required(refresh=True)
def refresh_session():
    # Confirmed to exist in DB by blocklist loader
    refresh = logins_schema.dump(Logins.query.filter_by(jti=get_jwt()['jti']).first())
    access_parent = refresh['access_parent']
    # Serialize user
    user = users_schema.dump(current_user)
    # Create new access token
    payload = {'role': user['role'], 'name': user['name'], 'email': user['email']}
    access = create_access_token(current_user, additional_claims=payload)
    # Create db entry for new access token, equivalent to doing a @post_load?
    access_db = Logins(get_jti(access), refresh['id'])
    db.session.add(access_db)
    # Swap access_parent in jti
    db.session.query(Logins).filter_by(jti=get_jwt()['jti']).update({'access_parent': get_jti(access)})
    # Remove old access token
    db.session.query(Logins).filter_by(jti=access_parent).delete()
    db.session.commit()
    return jsonify(access=access)


@auth_bp.route('/users')
@jwt_required()
def get_users():
    users = UsersSchema(many=True).dump(Users.query.all())
    return jsonify(users)
