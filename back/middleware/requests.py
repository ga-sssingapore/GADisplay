from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import jwt_required, get_jwt


def check_request(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        if not request.data:
            return jsonify({'status': 'error', 'message': 'invalid request data'})
        return endpoint(*args, **kwargs)
    return decorator


def check_user(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        role = get_jwt()['role']
        if role == "Registered":
            return jsonify({'status': 'error', 'message': 'approved-only function'}), 403
        return endpoint(*args, **kwargs)
    return decorator


def check_admin(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        admin_role = get_jwt()['role']
        if admin_role != "Admin":
            return jsonify({'status': 'error', 'message': 'admin-only function'}), 403
        return endpoint(*args, **kwargs)
    return decorator
