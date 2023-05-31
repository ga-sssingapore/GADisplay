from marshmallow_sqlalchemy import column2field
from schemas.mm import mm
from models.users import Users


class UsersSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
