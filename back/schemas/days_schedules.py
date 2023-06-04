from schemas.mm import mm
from models.days_schedules import DaysSchedules


class DaysSchedulesSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = DaysSchedules
