import jwt
from functools import wraps
from flask import request, abort
from flask import current_app

def login_required(endpoint):
    @wraps(endpoint)
    def check_token_decorator(*args, **kwargs):
        if "Authorization" not in request.headers:
            return {
                "message": "Authentication token may be invalid",
                "data": None,
                "error": "unauthorized"
            }, 401
        token = request.headers["Authorization"].replace("Bearer ", "")
        print(token)
    return check_token_decorator