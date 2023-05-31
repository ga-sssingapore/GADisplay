import os
import datetime

from flask import Flask, jsonify, request

from models.db import db
from schemas.mm import mm
from flask_restful import Api


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


@app.route("/")
def get_data():
    return 'Server running!'


if __name__ == '__main__':
    pass