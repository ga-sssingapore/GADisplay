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
def add_one(cls, data):
    cohort = CohortsSchema().load(data)
    print(cohort)
    # new_cohort = Cohorts(data['name'], data['starts'], data['ends'],
    #                      data['course_type'], data['schedule'], data['room'])


# Convert schedule to DB combination strings
def convert_schedule(sched):
    match sched:
        case 'Alt.S':
            return 'SO'
        case 'Even.S':
            return 'SE'
        case 'MT':
            return 'MoTu'
        case 'MTWT':
            return 'MoTuWeTh'
        case 'WT':
            return 'WeTh'

def convert_time(js_date):
    if js_date.endswith('Z'):
        return datetime.fromisoformat(js_date[:-1])

    return datetime.fromisoformat(js_date)


# Routes
@cohorts_bp.route('/add', methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_cohort():
    data = request.get_json()


@cohorts_bp.route("/csv", methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_csv(cls):
    data = request.get_json()
    corrected_data = {'name': data[0]['name'],
                      'starts': data[0]['starts'],
                      'ends': data[0]['ends'],
                      'course_type': str(data[0]['course_type']),
                      'schedule': convert_schedule(data[0]['schedule']),
                      'room': int(data[0]['room'])
                      }
    print(corrected_data)
    add_one(data[0])
    # for i in range(0, len(data)):
    #     pass
    return jsonify(data)
