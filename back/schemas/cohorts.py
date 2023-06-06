from marshmallow import EXCLUDE
from schemas.mm import mm
from models.cohorts import Cohorts
# For foreign keys
from schemas.course_types import CourseTypesSchema
from schemas.days_schedules import DaysSchedulesSchema
from schemas.rooms import RoomsSchema


class CohortsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Cohorts
        include_fk = True
        unknown = EXCLUDE

class CohortsSchemaWSchedule(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Cohorts
        include_fk = True
        unknown = EXCLUDE
    schedule = mm.Nested(DaysSchedulesSchema, attribute='cohort')
