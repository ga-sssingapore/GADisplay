from flask import Blueprint, jsonify

from models.db import db
from models.roles import Roles
from models.rooms import Rooms
from models.course_types import CourseTypes
from models.days_schedules import DaysSchedules

seed_bp = Blueprint('seed_bp', __name__, url_prefix='/seed')


'''
Seeds utilize only GET methods, utilize blueprint instead to
reduce number of api.add_resource needed in server.py
'''
@seed_bp.route('/roles')
def seed_routes():
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


@seed_bp.route('/rooms')
def seed_rooms():
    db.session.query(Rooms).delete()
    for i in range(1,7):
        new_room = Rooms(i)
        db.session.add(new_room)
    db.session.commit()
    return jsonify({'status': 'ok', 'message': 'rooms seeded'})


@seed_bp.route('/types')
def seed_types():
    db.session.query(CourseTypes).delete()
    db.session.add_all([CourseTypes('FT'), CourseTypes('Flex'), CourseTypes('PT')])
    db.session.commit()
    db.session.commit()
    return jsonify({'status': 'ok', 'message': 'course types seeded'})


@seed_bp.route('/days')
def seed_days():
    db.session.query(DaysSchedules).delete()
    # DaysSchedules(mon,tue,wed,thu,fri,sato,sate,sun)
    # Add MoTuWeTh
    mtwt = DaysSchedules(True, True, True, True)

    # Add MoTu
    mt = DaysSchedules(True,True)

    # Add WeTh
    wt = DaysSchedules(False,False,True,True)

    # Add Sat_odd
    so = DaysSchedules(False,False,False,False,False,True)

    # Add Sat_even
    se = DaysSchedules(False,False,False,False,False,False,True)

    db.session.add_all([mtwt, mt, wt, so, se])
    db.session.commit()
    return jsonify({'status': 'ok', 'message': 'common schedules seeded'})