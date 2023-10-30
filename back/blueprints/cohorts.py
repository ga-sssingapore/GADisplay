from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
from sqlalchemy import case
# Middleware
from middleware.requests import check_request, check_user, check_admin
# Models
from models.db import db
from models.cohorts import Cohorts
from models.days_schedules import DaysSchedules
# Schemas
from schemas.cohorts import CohortsSchema

cohorts_bp = Blueprint('cohorts_bp', __name__, url_prefix="/cohorts")


# Helper methods
def add_one(data, transform_schedule=False):
    try:
        cohort = CohortsSchema().load(data)
        cohort_check = db.session.query(Cohorts).filter_by(name=cohort['name']).one_or_none()
        if cohort_check is None:
            if transform_schedule:
                cohort['schedule'] = convert_schedule(cohort['schedule'])
                schedule_check = db.session.query(DaysSchedules).filter_by(combi=cohort['schedule']).one_or_none()
                if schedule_check is None:
                    DaysSchedules.add_schedule(cohort['schedule'])
            db.session.add(Cohorts(**cohort))
            return 'added'
        else:
            return 'duplicate'
    except Exception as e:
        raise e


# Convert schedule to DB combination strings
def convert_schedule(schedule):
    if schedule == 'Alt.S':
        return 'SO'
    elif schedule == 'Even.S':
        return 'SE'
    sat = ''
    combi_str = ''
    wed = False
    for x in schedule:
        match x:
            case 'M':
                combi_str += 'Mo'
            case 'T':
                if wed:
                    combi_str += 'Th'
                else:
                    combi_str += 'Tu'
                    wed = True
            case 'W':
                combi_str += 'We'
                wed = True
            case 'F':
                combi_str += 'Fr'
            case _:
                sat += x

    sun = ''
    if sat.endswith('S') and len(sat) > 1:
        sun = 'Su'
        sat = sat[:-1]
    elif sat == '':
        return combi_str
    match sat:
        case 'SO':
            return combi_str + 'SO' + sun
        case 'SE':
            return combi_str + 'SE' + sun
        case 'S':
            return combi_str + 'SA' + sun
        case _:
            return combi_str + sun


@cohorts_bp.route('/')
@jwt_required()
def get_cohorts():
    cohorts = CohortsSchema(many=True).dump(
        Cohorts.query.filter_by(**{'active': True}).order_by(
            case({"FT": 0, "Flex": 1, "PT": 2}, value=Cohorts.course_type), Cohorts.schedule, Cohorts.starts
        ).all()
    )
    return jsonify(cohorts)


# Routes
@cohorts_bp.route('/add', methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_cohort():
    data = request.get_json()
    incoming_schedule = DaysSchedules(*data['schedule'])
    existing_schedule = db.session.query(DaysSchedules).filter_by(combi=incoming_schedule.combi).one_or_none()
    if existing_schedule is None:
        db.session.add(incoming_schedule)
        db.session.commit()
    data['schedule'] = incoming_schedule.combi
    try:
        response = add_one(data)  # Adds to session
        if response == 'added':
            db.session.commit()  # Locks in to DB
            return jsonify({'status': 'ok', 'message': 'cohort added'})
        elif response == 'duplicate':
            return jsonify({'status': 'error', 'message': 'data already exists'}), 400
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error adding cohort'}), 400


@cohorts_bp.route('/add', methods=['PATCH'])
@check_request
@jwt_required()
@check_user
def patch_cohort():
    try:
        data = request.get_json()
        incoming_schedule = DaysSchedules(*data['schedule'])
        existing_schedule = db.session.query(DaysSchedules).filter_by(combi=incoming_schedule.combi).one_or_none()
        if existing_schedule is None:
            db.session.add(incoming_schedule)
            db.session.commit()
        data['schedule'] = incoming_schedule.combi
        edited_cohort = CohortsSchema().load(data)
        db.session.query(Cohorts).filter_by(name=edited_cohort['name']).update(edited_cohort)
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'cohort edited'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error editing cohort'}), 400


@cohorts_bp.route("/csv", methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_csv():
    data = request.get_json()
    print(data)
    try:
        duplicate = 0
        for item in data:
            response = add_one(item, True)  # Error raised if adding fails
            if response == 'duplicate':
                duplicate += 1
        db.session.commit()
        if duplicate < len(data):
            return jsonify({'status': 'ok', 'message': 'non-duplicate cohorts added'})
        elif duplicate >= len(data):
            return jsonify({'status': 'error', 'message': 'data already exists'}), 400
        else:
            return jsonify({'status': 'ok', 'message': 'cohorts added'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error adding cohorts'}), 400


@cohorts_bp.route('/delete', methods=['DELETE'])
@check_request
@jwt_required()
@check_admin
def delete_cohort():
    data = request.get_json()
    try:
        db.session.query(Cohorts).filter_by(name=data['name']).delete()
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'cohort deleted'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error deleting cohorts'}), 400
