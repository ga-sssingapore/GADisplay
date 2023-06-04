from flask import jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from middleware.requests import check_request
from flask_restful import Resource

from models.db import db
from models.users import Users
from models.logins import Logins
from schemas.users import UsersSchema


class UsersEP(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        users = UsersSchema(many=True).dump(Users.query.all())
        return jsonify(users)

    # Promote to Admin
    @classmethod
    @check_request
    @jwt_required()
    def patch(cls):
        admin_role = get_jwt()['role']
        if admin_role != "Admin":
            return jsonify({'status': 'error', 'message': 'admin-only function'}), 403
        try:
            data = request.get_json()
            db.session.query(Users).filter_by(id=data['id']).update({'role': 'Admin'})
            db.session.commit()
            return jsonify({'status': 'ok', 'message': 'user promoted'})
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'error promoting user'}), 400

    # Promote to User
    @classmethod
    @check_request
    @jwt_required()
    def post(cls):
        admin_role = get_jwt()['role']
        if admin_role != "Admin":
            return jsonify({'status': 'error', 'message': 'admin-only function'}), 403
        try:
            data = request.get_json()
            db.session.query(Users).filter_by(id=data['id']).update({'role': 'User'})
            db.session.commit()
            return jsonify({'status': 'ok', 'message': 'user approved'})
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'error approving user'}), 400

    @classmethod
    @check_request
    @jwt_required()
    def delete(cls):
        admin_role = get_jwt()['role']
        if admin_role != "Admin":
            return jsonify({'status': 'error', 'message': 'admin-only function'}), 403
        try:
            data = request.get_json()
            db.session.query(Logins).filter_by(id=data['id']).delete()
            db.session.query(Users).filter_by(id=data['id']).delete()
            db.session.commit()
            return jsonify({'status': 'ok', 'message': 'user deleted'})
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'error deleting user'}), 400
