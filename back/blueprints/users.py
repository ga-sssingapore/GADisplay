from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
# Middleware
from middleware.requests import check_request, check_admin
# Models
from models.db import db
from models.users import Users
from models.logins import Logins
from models.adhocs import Adhocs
# Schemas
from schemas.users import UsersSchema

users_bp = Blueprint('users_bp', __name__, url_prefix="/users")


@users_bp.route('/')
@jwt_required()
def get_users():
    users = UsersSchema(many=True).dump(Users.query.all())
    return jsonify(users)


# Post to promote to User, Patch to promote to Admin
@users_bp.route('/promote', methods=["POST", "PATCH"])
@check_request
@jwt_required()
@check_admin
def promote():
    try:
        data = request.get_json()
        if request.method == "PATCH":
            db.session.query(Users).filter_by(id=data['id']).update({'role': 'Admin'})
        elif request.method == "POST":
            db.session.query(Users).filter_by(id=data['id']).update({'role': 'User'})
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'additional perms granted'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'error promoting user'}), 400


@users_bp.route('/delete', methods=["DELETE"])
@check_request
@jwt_required()
@check_admin
def delete():
    try:
        data = request.get_json()
        db.session.query(Logins).filter_by(id=data['id']).delete()
        former_staff = Users.query.filter_by(email="former.staff@generalassemb.ly").first()
        Adhocs.query.filter_by(id=data['id']).update({'id': former_staff.id})
        db.session.query(Users).filter_by(id=data['id']).delete()
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'user deleted'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'error deleting user'}), 400
