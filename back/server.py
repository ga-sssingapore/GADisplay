from flask import Flask, jsonify, request
from dotenv import load_dotenv
from middleware.auth import login_required
import datetime
load_dotenv()

app = Flask(__name__)

data = [
    {
        "name": "Justinn",
        "registration_date": datetime.datetime.now()
    }
]

from blueprints.admin import routes as admin_routes

app.register_blueprint(admin_routes.admin_bp)

@app.route("/")
@login_required
def get_data():
    return jsonify(data)

# @app.route("/login", methods="POST")
# def login():
#     if request.method == "POST":
#         print(request)
