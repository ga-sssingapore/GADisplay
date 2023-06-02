from schemas.mm import mm
from models.users import Users
# Foreign Key
from schemas.roles import RolesSchema


class UsersSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Users
        include_fk = True
