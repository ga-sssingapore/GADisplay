from sqlalchemy.dialects.postgresql import UUID
from models.db import db


class Logins(db.Model):
    __tablename__ = 'Logins'

    jti = db.Column(UUID(as_uuid=True), primary_key=True, nullable=False)
    refresh = db.Column(db.Boolean, server_default=db.FetchedValue(), nullable=False)
    access_parent = db.Column(db.ForeignKey('Logins.jti'))
    id = db.Column(db.ForeignKey('Users.id'))

    def __init__(self, jti, access_parent, id, refresh=False):
        self.jti = jti
        self.refresh = refresh
        self.access_parent = access_parent
        self.id = id

    def __repr__(self):
        return f'<Logins({"Refresh" if self.refresh else "Access"}) "{self.jti}">'
