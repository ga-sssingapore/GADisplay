import time
from datetime import datetime, timedelta
from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required
from sqlalchemy import case, or_
# Middleware
from middleware.requests import check_request
# Models
from models.db import db
from models.cohorts import Cohorts
from models.adhocs import Adhocs
from models.days_schedules import DaysSchedules
# Schemas
from schemas.cohorts import CohortsSchema, CohortsSchemaWSchedule
from schemas.adhocs import AdhocsSchema

display_bp = Blueprint('display_bp', __name__, url_prefix="/display")


def convert_time(js_date):
    # time.timezone looks at timezones west(???) of GM
    tz = timedelta(seconds=(time.timezone * -1))
    if js_date.endswith('Z'):
        return datetime.fromisoformat(js_date[:-1]) + tz
    # JS to Py iso format strips timezone
    return datetime.fromisoformat(js_date) + tz


@display_bp.route("/", methods=['POST'])
@check_request
def get_today():
    data = request.get_json()
    time_now = convert_time(data['now'])
    today = time_now.date()
    day = today.strftime('%a').lower()
    # Query courses/adhocs that start within today
    tomorrow = today + timedelta(days=1)
    try:
        adhocs_today = AdhocsSchema(many=True).dump(Adhocs.query.filter(
            Adhocs.active, Adhocs.room == data['room'],
            Adhocs.starts < tomorrow, Adhocs.ends >= time_now
        ).order_by(Adhocs.starts).all())
        cohorts_query = db.session.query(Cohorts).join(
            DaysSchedules, Cohorts.schedule == DaysSchedules.combi).filter(
            Cohorts.active, Cohorts.room == data['room'],
            Cohorts.starts < tomorrow, Cohorts.ends >= time_now
            )
        if day == 'sat':
            cohorts_today = cohorts_query.filter((DaysSchedules.sat_o or DaysSchedules.sat_e))
        else:
            cohorts_today = cohorts_query.filter(DaysSchedules.__table__.columns[day])
        cohorts_output = CohortsSchemaWSchedule(many=True).dump(cohorts_today.order_by(Cohorts.starts).all())
        return jsonify(adhoc=adhocs_today, cohort=cohorts_output)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error getting itinerary today' }), 400


@display_bp.route("/")
@jwt_required()
def get_all_events():
    try:
        # Wipe out inactive events first
        Cohorts.query.filter(or_(Cohorts.ends < datetime.now(), not Cohorts.active)).delete()
        Adhocs.query.filter(or_(Adhocs.ends < datetime.now(), not Adhocs.active)).delete()
        # Model queries still utilize session (via Model(db.model))
        db.session.commit()

        cohorts = CohortsSchema(many=True).dump(
            Cohorts.query.filter_by(active=True).order_by(
                case({"FT": 0, "Flex": 1, "PT": 2}, value=Cohorts.course_type), Cohorts.schedule, Cohorts.starts
            ).all()
        )
        adhocs = AdhocsSchema(many=True).dump(
            Adhocs.query.filter_by(active=True).order_by(
                Adhocs.starts, Adhocs.room
            ).all()
        )
        return jsonify(adhoc=adhocs, cohort=cohorts)
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error getting all events' }), 400
