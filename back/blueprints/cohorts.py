from datetime import datetime
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
# Middleware
from middleware.requests import check_request, check_user
# Models
from models.db import db
from models.cohorts import Cohorts
# Schemas
from schemas.cohorts import CohortsSchema

cohorts_bp = Blueprint('cohorts_bp', __name__, url_prefix="/cohorts")


# Helper methods
def add_one(data):
    try:
        cohort = CohortsSchema().load(data)
        cohort_check = db.session.query(Cohorts).filter_by(name=cohort['name']).one_or_none()
        if cohort_check is None:
            cohort['schedule'] = convert_schedule(cohort['schedule'])
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
    t_count = 0
    sat = ''
    combistr = ''
    for x in schedule:
        match x:
            case 'M':
                combistr += 'Mo'
            case 'T':
                if t_count == 0:
                    combistr += 'Tu'
                    t_count += 1
                elif t_count == 1:
                    combistr += 'Th'
            case 'W':
                combistr += 'We'
            case 'F':
                combistr += 'Fr'
            case other:
                sat += x

    sun = ''
    if sat.endswith('S') and len(sat) > 1:
        sun = 'Su'
        sat = sat[:-1]
    elif sat == '':
        return combistr
    match sat:
        case 'SO':
            return combistr + 'SO' + sun
        case 'SE':
            return combistr + 'SE' + sun
        case 'S':
            return combistr + 'SA' + sun
        case other:
            return combistr + sun


def convert_time(js_date):
    if js_date.endswith('Z'):
        return datetime.fromisoformat(js_date[:-1])

    return datetime.fromisoformat(js_date)


@cohorts_bp.route('/')
@jwt_required()
def get_cohorts():
    cohorts = CohortsSchema(many=True).dump(Cohorts.query.all())
    return jsonify(cohorts)


# Routes
@cohorts_bp.route('/add', methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_cohort():
    data = request.get_json()
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


@cohorts_bp.route("/csv", methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_csv():
    data = request.get_json()
    try:
        duplicate = 0
        for i in range(0, len(data)):
            response = add_one(data[i])  # Error raised if adding fails
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
