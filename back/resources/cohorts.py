from datetime import datetime
from flask import jsonify, request
from flask_jwt_extended import jwt_required
from middleware.requests import check_request, check_user
from flask_restful import Resource

from models.db import db
from models.cohorts import Cohorts
from schemas.cohorts import CohortsSchema


class CohortsEP(Resource):
    @classmethod
    @check_request
    @jwt_required()
    @check_user
    def put(cls):
        data = request.get_json()

    @classmethod
    def add_one(cls, data):
        cohort = CohortsSchema().load(data)
        print(cohort)
        # new_cohort = Cohorts(data['name'], data['starts'], data['ends'],
        #                      data['course_type'], data['schedule'], data['room'])

    @classmethod
    def convert_schedule(cls, sched):
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

    @classmethod
    def convert_time(cls, js_date):
        if js_date.endswith('Z'):
            return datetime.fromisoformat(js_date[:-1])

        return datetime.fromisoformat(js_date)


class CohortsEPBulk(Resource):
    @classmethod
    @check_request
    @jwt_required()
    @check_user
    def put(cls):
        data = request.get_json()
        corrected_data = {'name': data[0]['name'],
                          'starts': data[0]['starts'],
                          'ends': data[0]['ends'],
                          'course_type': str(data[0]['course_type']),
                          'schedule': CohortsEP.convert_schedule(data[0]['schedule']),
                          'room': int(data[0]['room'])
                          }
        print(corrected_data)
        CohortsEP.add_one(corrected_data)
        # for i in range(0, len(data)):
        #     pass
        return jsonify(data)


