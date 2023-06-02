from models.db import db


class Roles(db.Model):
    __tablename__ = 'Roles'

    role = db.Column(db.String(10), primary_key=True)

    def __init__(self, role):
        self.role = role

    def __repr__(self):
        return f'<Role "{self.role}">'
