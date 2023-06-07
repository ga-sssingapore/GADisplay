from schemas.mm import mm
from models.adhocs import Adhocs
# For foreign keys
from schemas.rooms import RoomsSchema
from schemas.users import UsersSchema


class AdhocsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Adhocs
        include_fk = True

class AdhocsSchemaWUser(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Adhocs
        include_fk = True
    id = mm.Nested(UsersSchema, attribute='adhocs')
