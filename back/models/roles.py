from server import db

class Roles(db.Model):
    __tablename__='Roles'

    role = db.Column(db.String(10), primary_key=True)
    users = db.relationship('Users', backref='Roles')

    def __repr__(self):
        return f'<Role "{self.role}">'