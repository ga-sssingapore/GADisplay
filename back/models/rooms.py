from models.db import db


class Rooms(db.Model):
    __tablename__ = 'Rooms'

    room = db.Column(db.Integer, primary_key=True, nullable=False)

    def __init__(self, room):
        self.room = room

    def __repr__(self):
        return f'<Room "{self.room}">'
