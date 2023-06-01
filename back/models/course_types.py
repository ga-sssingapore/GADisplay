from models.db import db


class CourseTypes(db.Model):
    __tablename__ = 'Course_Types'

    type = db.Column(db.String(4), primary_key=True, nullable=False)

    def __init__(self, type):
        self.type = type

    def __repr__(self):
        return f'<CourseType "{self.type}">'
