from flask import Blueprint, jsonify, request
from argon2 import PasswordHasher
from models.db import db
from models.users import Users
from schemas.users import UsersSchema
from models.roles import Roles

display_bp = Blueprint('display_bp', __name__, url_prefix='/display')

@display_bp.route('/test', methods=['POST'])
def check_user():
    if request.data:
        ph = PasswordHasher()
        data = request.get_json()
        user = Users.query.filter_by(name=data['name']).first()
        ver = ph.verify(user.hash, data['password'])
        return jsonify({"status": "ok", "message": ver})
    else:
        return jsonify({"status": "error", "message": "no user"})


@display_bp.route('/test2')
def get_registered():
    registered_users = db.session.query(Users).filter(Users.role=='Registered').all()
    role_schema = UsersSchema(many=True)
    dump_roles = role_schema.dump(registered_users)
    return jsonify(dump_roles)
