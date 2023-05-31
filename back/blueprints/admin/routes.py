from flask import Blueprint, jsonify
from models.db import db
from models.users import Users
from models.roles import Roles
from middleware.auth import login_required

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')

@admin_bp.route('/user')
@login_required
def get_users():
    return "Users"

@admin_bp.route('/roles')
def get_roles():
    existing_roles = Roles.query.all()
    print(type(existing_roles))
    return jsonify(existing_roles)