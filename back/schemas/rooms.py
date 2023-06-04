from schemas.mm import mm
from models.rooms import Rooms


class RoomsSchema(mm.SQLAlchemyAutoSchema):
    class Meta:
        model = Rooms
