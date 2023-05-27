import psycopg2
import os
from flask import Blueprint
from middleware.auth import login_required

admin_bp = Blueprint('admin_bp', __name__, url_prefix='/admin')

def get_users_db_connection():
    conn = psycopg2.connect(host='localhost',
                            database='ga_users_db',
                            user=os.environ['DB_USERNAME'],
                            password=os.environ['DB_PASSWORD'])
    return conn

@admin_bp.route('/user')
@login_required
def get_users():
    return "Users"