from flask_restful import Resource
from flask import jsonify

from models.db import db
from models.roles import Roles


# Seed users' roles
class SeedRoles(Resource):
    @classmethod
    def get(cls):
        existing_roles = [item.role for item in Roles.query.all()]
        new_roles = list()
        if 'Registered' not in existing_roles:
            registered = Roles('Registered')
            new_roles.append(registered)
        if 'User' not in existing_roles:
            user = Roles('User')
            new_roles.append(user)
        if 'Admin' not in existing_roles:
            admin = Roles('Admin')
            new_roles.append(admin)
        if len(new_roles) == 0:
            return jsonify({'status': 'ok', 'message': 'roles already seeded'})
        else:
            db.session.add_all(new_roles)
            db.session.commit()
            return jsonify({'status': 'ok', 'message': 'roles seeded'})


# Seed rooms 1-6
class SeedClassrooms(Resource):
    @classmethod
    def get(cls):
        pass


# Seed FT/PT/Flex course types
class SeedCourseTypes(Resource):
    @classmethod
    def get(cls):
        pass


# Seed commonly used schedules
class SeedDaysSchedules(Resource):
    @classmethod
    def get(cls):
        pass