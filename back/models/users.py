from uuid import uuid4
from sqlalchemy.dialects.postgresql import UUID
from models.db import db

class Users(db.Model):
    __tablename__='Users'

    id = db.Column(UUID(as_uuid=True), primary_key=True, server_default=db.FetchedValue())
    name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    hash = db.Column(db.String(255))
    role = db.Column(db.ForeignKey('Roles.role'), default='Registered')


    def __init__(self, name, email, hash):
        self.name = name
        self.email = email
        self.hash = hash


    def __repr__(self):
        return f'<User "{self.name}">'


    