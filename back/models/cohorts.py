from models.db import db


class Cohorts(db.Model):
    __tablename__ = 'Cohorts'

    name = db.Column(db.String(20), primary_key=True, nullable=False)
    starts = db.Column(db.DateTime, nullable=False)
    ends = db.Column(db.DateTime, nullable=False)
    active = db.Column(db.Boolean, server_default=db.FetchedValue())
    course_type = db.Column(db.ForeignKey('CourseTypes.type'), nullable=False)
    schedule = db.Column(db.ForeignKey('DaysSchedules.combi'), nullable=False)
    room = db.Column(db.ForeignKey('Rooms.room'), nullable=False)

    def __init__(self, name, starts, ends, course_type, schedule, room):
        self.name = name
        self.starts = starts
        self.ends = ends
        self.course_type = course_type
        self.schedule = schedule
        self.room = room

    def __repr__(self):
        return f'<Cohort "{self.name}">'
