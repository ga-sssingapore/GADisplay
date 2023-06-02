import os

from flask import Flask

from models.db import db
from schemas.mm import mm
from flask_restful import Api

# Blueprints
from blueprints.display.routes import display_bp
from blueprints.seed import seed_bp

# Flask_RESTful resources (controllers)

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
app.register_blueprint(seed_bp)

@app.route("/")
def get_data():
    return 'Server running!'
