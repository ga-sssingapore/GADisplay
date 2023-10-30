import re
from models.db import db


class DaysSchedules(db.Model):
    __tablename__ = 'Days_Schedules'

    combi = db.Column(db.String(20), primary_key=True, nullable=False)
    mon = db.Column(db.Boolean, server_default=db.FetchedValue())
    tue = db.Column(db.Boolean, server_default=db.FetchedValue())
    wed = db.Column(db.Boolean, server_default=db.FetchedValue())
    thu = db.Column(db.Boolean, server_default=db.FetchedValue())
    fri = db.Column(db.Boolean, server_default=db.FetchedValue())
    sat_o = db.Column(db.Boolean, server_default=db.FetchedValue())
    sat_e = db.Column(db.Boolean, server_default=db.FetchedValue())
    sun = db.Column(db.Boolean, server_default=db.FetchedValue())
    cohort = db.relationship('Cohorts', backref='cohort', lazy=True)

    def __init__(self, mon=False, tue=False, wed=False, thu=False, fri=False, sat_o=False, sat_e=False, sun=False):
        combi_str = ''
        if mon:
            combi_str += 'Mo'
            self.mon = mon
        if tue:
            combi_str += 'Tu'
            self.tue = tue
        if wed:
            combi_str += 'We'
            self.wed = wed
        if thu:
            combi_str += 'Th'
            self.thu = thu
        if fri:
            combi_str += 'Fr'
            self.fri = fri
        if sat_o and sat_e:
            combi_str += 'SA'
            self.sat_o = sat_o
            self.sat_e = sat_e
        elif sat_o:
            combi_str += 'SO'
            self.sat_o = sat_o
        elif sat_e:
            combi_str += 'SE'
            self.sat_e = sat_e
        if sun:
            combi_str += 'Su'
            self.sun = sun

        if combi_str == '':
            self.combi = 'No'
        else:
            self.combi = combi_str

    def __repr__(self):
        return f'<DaysSchedules "{self.combi}">'

    @classmethod
    def add_schedule(cls, combi_str):
        combi_arr = re.findall(r"..", combi_str)
        schedule_arr = [False, False, False, False, False, False, False, False]
        for x in combi_arr:
            match x:
                case 'Mo':
                    schedule_arr[0] = True
                case 'Tu':
                    schedule_arr[1] = True
                case 'We':
                    schedule_arr[2] = True
                case 'Th':
                    schedule_arr[3] = True
                case 'Fr':
                    schedule_arr[4] = True
                case 'SO':
                    schedule_arr[5] = True
                case 'SE':
                    schedule_arr[6] = True
                case 'SA':
                    schedule_arr[5] = True
                    schedule_arr[6] = True
                case 'Su':
                    schedule_arr[7] = True
        try:
            schedule = DaysSchedules(*schedule_arr)
            print(schedule)
            db.session.add(schedule)
            db.session.commit()
        except Exception as e:
            print(e)
