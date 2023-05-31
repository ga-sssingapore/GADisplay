from flask import Blueprint, jsonify, request
from models.db import db
from models.users import Users

display_bp = Blueprint('display_bp', __name__, url_prefix='/display')

@display_bp.route('/test', methods=['PUT'])
def add_user():
    if request.data:
        data = request.get_json()
        new_user = Users(data['name'], data['email'], data['hash'])
        db.session.add(new_user)
        db.session.commit()
    return jsonify({"status": "ok", "message": "user added"})