from schemas.mm import mm
from models.cohorts import Cohorts
from models.course_types import CourseTypes
from models.days_schedules import DaysSchedules
from models.rooms import Rooms


class CohortsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Cohorts
        include_fk = True
