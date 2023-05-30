from flask import Flask, jsonify, request
from dotenv import load_dotenv
from flask_migrate import Migrate
from models.db import db
from middleware.auth import login_required
from blueprints.admin import routes as admin_routes
from os import environ
import datetime
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('SQLALCHEMY_DATABASE_URI')
db.init_app(app)
migrate = Migrate(app, db)

data = [
    {
        "name": "Justinn",
        "registration_date": datetime.datetime.now()
    }
]


app.register_blueprint(admin_routes.admin_bp)

@app.route("/")
@login_required
def get_data():
    return jsonify(data)

# @app.route("/login", methods="POST")
# def login():
#     if request.method == "POST":
#         print(request)
