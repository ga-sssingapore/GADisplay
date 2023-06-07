import time
from datetime import datetime, timedelta, timezone, date
from flask import Blueprint, jsonify, request
# Middleware
from middleware.requests import check_request
# Models
from models.db import db
from models.cohorts import Cohorts
from models.adhocs import Adhocs
from models.days_schedules import DaysSchedules
# Schemas
from schemas.cohorts import CohortsSchemaWSchedule
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
    print(today, ":", day)
    adhocs_today = AdhocsSchema(many=True).dump(Adhocs.query.filter(
        Adhocs.active, Adhocs.room == data['room'],
        Adhocs.starts < tomorrow, Adhocs.ends >= time_now
    ).order_by(Adhocs.num).all())
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
    print(adhocs_today)
    return jsonify(adhoc=adhocs_today, cohort=cohorts_output)
