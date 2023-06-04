from flask import jsonify
from flask_jwt_extended import jwt_required, get_jwt
from middleware.requests import check_request
from flask_restful import Resource

from models.users import Users
from schemas.users import UsersSchema


class UsersEP(Resource):
    @classmethod
    @jwt_required()
    def get(cls):
        users = UsersSchema(many=True).dump(Users.query.all())
        return jsonify(users)

    @classmethod
    @check_request
    @jwt_required()
    def patch(cls):
        admin_role = get_jwt()['role']
        if admin_role != "Admin":
            return jsonify({'status': 'error', 'message': 'admin-only function'}), 403

