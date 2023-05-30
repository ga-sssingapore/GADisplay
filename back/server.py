from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
import os
import datetime

# Load .env
from dotenv import load_dotenv
load_dotenv()

# Setup Flask app
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('SQLALCHEMY_DATABASE_URI')
# Setup database
db = SQLAlchemy(app)

# Import models utilizing database. db imported to models and returned as classes here.
from models.users import Users
from models.roles import Roles

# Migrate object allows for "flask db <cmd>" commands
migrate = Migrate(app, db)

# Import blueprints dictating route specific functions. db imported again here and returned as blueprints.
from blueprints.admin.routes import admin_bp
from blueprints.display.routes import display_bp

# Register routes from blueprints
app.register_blueprint(admin_bp)
app.register_blueprint(display_bp)

@app.route("/")
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
