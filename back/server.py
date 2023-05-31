import os
import datetime

from flask import Flask, jsonify, request

from models.db import db
from schemas.mm import mm

# Import blueprints dictating route specific functions.
from blueprints.admin.routes import admin_bp
from blueprints.display.routes import display_bp
from blueprints.users.routes import users_bp
from blueprints.seed.routes import seed_bp

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Setup Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')

# Initialize other app dependent instances
db.init_app(app)
mm.init_app(app)

# Register routes from blueprints
app.register_blueprint(admin_bp)
app.register_blueprint(display_bp)
app.register_blueprint(users_bp)
app.register_blueprint(seed_bp)

@app.route("/")
def get_data():
    return jsonify({
        "name": "Justinn",
        "registration_date": datetime.datetime.now()
    }
)

# @app.route("/login", methods="POST")
# @login_required
# def login():
#     if request.method == "POST":
#         print(request)

if __name__ == '__main__':
    pass