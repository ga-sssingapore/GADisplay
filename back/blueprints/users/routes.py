from flask import Blueprint, jsonify, request
from argon2 import PasswordHasher
from models.db import db
from models.users import Users

users_bp = Blueprint('users_bp', __name__, url_prefix='/users')

@users_bp.route('/register', methods=['PUT'])
def register_user():
    if request.data:
        data = request.get_json()
        ph = PasswordHasher()
        hash = ph.hash(data['password'])
        new_user = Users(data['name'], data['email'], hash)
        db.session.add(new_user)
        db.session.commit()
    return jsonify({"status": "ok", "message": "user registered"})