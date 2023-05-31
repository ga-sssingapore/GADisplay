import jwt
from functools import wraps
from flask import request, abort
from flask import current_app


def login_required(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        if "Authorization" not in request.headers:
            return {
                "message": "Authentication token may be invalid",
                "data": None,
                "error": "unauthorized"
            }, 401
        token = request.headers["Authorization"].replace("Bearer ", "")
        return endpoint(token, *args, **kwargs)
    return decorator
