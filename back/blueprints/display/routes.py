from flask import Blueprint, jsonify, request
from middleware.requests import check_request
from argon2 import PasswordHasher
from models.db import db
from models.users import Users
from schemas.users import UsersSchema
from models.roles import Roles

display_bp = Blueprint('display_bp', __name__, url_prefix='/display')


@display_bp.route('/test', methods=['POST'])
@check_request
def check_user():
    ph = PasswordHasher()
    data = request.get_json()
    user = Users.query.filter_by(name=data['name']).first()
    ver = ph.verify(user.hash, data['password'])
    return jsonify({"status": "ok", "message": ver})


@display_bp.route('/test2')
def get_registered():
    registered_users = db.session.query(Users).filter(Users.role=='Registered').all()
    role_schema = UsersSchema(many=True)
    dump_roles = role_schema.dump(registered_users)
    return jsonify(dump_roles)


@display_bp.route('/test3')
def get_roles():
    existing_roles = Roles.query.all()
    print(type(existing_roles))
    return jsonify(existing_roles)


@display_bp.route('/register', methods=['PUT'])
def register_user():
    if request.data:
        data = request.get_json()
        ph = PasswordHasher()
        hash = ph.hash(data['password'])
        new_user = Users(data['name'], data['email'], hash)
        db.session.add(new_user)
        db.session.commit()
    return jsonify({"status": "ok", "message": "user registered"})
