from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dotenv import load_dotenv
from middleware.auth import login_required
from blueprints.admin import routes as admin_routes
import os
import datetime
load_dotenv()

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
db = SQLAlchemy(app)

from models.users import Users
from models.roles import Roles

migrate = Migrate(app, db)

app.register_blueprint(admin_routes.admin_bp)

@app.route("/")
@login_required
def get_data():
    return jsonify({
        "name": "Justinn",
        "registration_date": datetime.datetime.now()
    }
)

# @app.route("/login", methods="POST")
# def login():
#     if request.method == "POST":
#         print(request)
