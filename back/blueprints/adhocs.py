from flask import Blueprint, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt
# Middleware
from middleware.requests import check_request, check_user, check_admin
# Models
from models.db import db
from models.adhocs import Adhocs
# Schemas
from schemas.adhocs import AdhocsSchema

adhocs_bp = Blueprint('adhocs_bp', __name__, url_prefix="/adhocs")


@adhocs_bp.route("/")
@jwt_required()
def get_adhoc():
    adhocs = AdhocsSchema(many=True).dump(Adhocs.query.all())
    return jsonify(adhocs)


@adhocs_bp.route("/add", methods=['PUT'])
@check_request
@jwt_required()
@check_user
def add_adhoc():
    data = request.get_json()
    user = get_jwt()['sub']
    data['id'] = user
    try:
        loaded_data = AdhocsSchema().load(data)
        db.session.add(Adhocs(**loaded_data))
        db.session.commit()
        return jsonify({'status': 'ok', 'message': 'adhoc added'})
    except Exception as e:
        print(e)
        return jsonify({'status': 'error', 'message': 'Error adding adhoc'}), 400

