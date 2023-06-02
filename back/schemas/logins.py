from schemas.mm import mm
from marshmallow_sqlalchemy import fields
from models.logins import Logins


class LoginsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Logins
        include_fk = True
