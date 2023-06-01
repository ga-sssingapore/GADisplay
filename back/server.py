import os

from flask import Flask

from models.db import db
from schemas.mm import mm
from flask_restful import Api

# Display_bp for testing models/schemas/marshmallow-sqlalchemy
from blueprints.display.routes import display_bp

# Flask_RESTful resources (controllers)
from resources import seed

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Setup Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')

# Initialize other app dependent instances
db.init_app(app)
mm.init_app(app)
api = Api(app)

app.register_blueprint(display_bp)

api.add_resource(seed.SeedRoles, '/seed/roles')
api.add_resource(seed.SeedRooms, '/seed/rooms')
api.add_resource(seed.SeedCourseTypes, '/seed/types')
api.add_resource(seed.SeedDaysSchedules, '/seed/days')

@app.route("/")
def get_data():
    return 'Server running!'
