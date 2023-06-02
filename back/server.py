import os
import sys

from flask import Flask

from models.db import db
from schemas.mm import mm
from flask_restful import Api
from flask_jwt_extended import JWTManager

# Blueprints
from blueprints.display.routes import display_bp
from blueprints.seed import seed_bp
from blueprints.auth import auth_bp

# Flask_RESTful resources (controllers)

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Setup Flask app
app = Flask(__name__)
db_url = os.environ.get('SQLALCHEMY_DATABASE_URI', None)
jwt_secret_key = os.environ.get('JWT_SECRET_KEY', None)
if db_url is None or jwt_secret_key is None:
    print('No DB Url or Secret Key(s)')
    sys.exit()

app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['JWT_SECRET_KEY'] = jwt_secret_key


# Initialize other app dependent instances
db.init_app(app)
mm.init_app(app)
api = Api(app)
jwt = JWTManager(app)

app.register_blueprint(display_bp)
app.register_blueprint(seed_bp)
app.register_blueprint(auth_bp)

@app.route("/")
def get_data():
    return 'Server running!'
