from schemas.mm import mm
from models.roles import Roles


class RolesSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Roles
