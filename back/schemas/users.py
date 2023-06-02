from marshmallow_sqlalchemy import fields
from schemas.mm import mm
from schemas.roles import RolesSchema
from models.users import Users


class UsersSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        include_fk = True
