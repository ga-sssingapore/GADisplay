import psycopg2
from flask import Blueprint, jsonify, request
from middleware.requests import check_request
from argon2 import PasswordHasher
from models.db import db
from models.users import Users
from schemas.users import UsersSchema
from models.roles import Roles
from middleware.deserializers import deserialize_user

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
@deserialize_user
def register_user(body):
    try:
        print(body)
        print(request.get_json())
        # data = request.get_json()
        ph = PasswordHasher()
        # result = UsersSchema().load(data)
        hash = ph.hash(body['hash'])
        new_user = Users(body['name'], body['email'], hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({"status": "ok", "message": "user registered"})
    except Exception as e:
        print('Errors: ', e)
        return jsonify({"status": "error", "message": "error registering user"})
