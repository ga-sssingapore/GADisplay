from models.db import db


class Adhocs(db.Model):
    __tablename__ = 'AdHocs'

    num = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255), nullable=False)
    starts = db.Column(db.DateTime, nullable=False)
    ends = db.Column(db.DateTime, nullable=False)
    active = db.Column(db.Boolean, server_default=db.FetchedValue())
    room = db.Column(db.ForeignKey('Rooms.room'), nullable=False)
    id = db.Column(db.ForeignKey('Users.id'), nullable=False)
    purpose = db.Column(db.Text)


    def __init__(self, name, starts, ends, room, id):
        self.name = name
        self.starts = starts
        self.ends = ends
        self.room = room
        self.id = id

    def __repr__(self):
        return f'<Adhoc "{self.name}">'

