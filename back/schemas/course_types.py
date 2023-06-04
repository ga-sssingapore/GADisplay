from schemas.mm import mm
from models.course_types import CourseTypes


class CourseTypesSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = CourseTypes
