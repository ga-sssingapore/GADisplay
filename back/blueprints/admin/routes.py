from flask import Blueprint
from middleware.auth import login_required


admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')

@admin_bp.route('/user')
@login_required
def get_users():
    return "Users"