from flask import Flask, jsonify, request
from dotenv import load_dotenv
import datetime
load_dotenv()

app = Flask(__name__)

data = [
    {
        "name": "Justinn",
        "registration_date": datetime.datetime.now()
    }
]


@app.route("/")
def get_data():
    return jsonify(data)

# @app.route("/login", methods="POST")
# def login():
#     if request.method == "POST":
#         print(request)
