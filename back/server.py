from flask import Flask, request
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

@app.route("/")
def test():
    return "<p>Hello, World!</p>"

# @app.route("/login", methods="POST")
# def login():
#     if request.method == "POST":
#         print(request)

