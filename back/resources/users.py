from flask import jsonify, request
from flask_jwt_extended import jwt_required
from middleware.requests import check_request, check_admin
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
    @check_admin
    def patch(cls):
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
    @check_admin
    def post(cls):
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
    @check_admin
    def delete(cls):
        try:
            data = request.get_json()
            db.session.query(Logins).filter_by(id=data['id']).delete()
            db.session.query(Users).filter_by(id=data['id']).delete()
            db.session.commit()
            return jsonify({'status': 'ok', 'message': 'user deleted'})
        except Exception as e:
            print(e)
            return jsonify({'status': 'error', 'message': 'error deleting user'}), 400
