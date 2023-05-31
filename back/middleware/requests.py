from functools import wraps
from flask import request, jsonify


def check_request(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        if not request.data:
            return jsonify({'status':'error', 'message':'invalid request data'})
        return endpoint(*args, **kwargs)
    return decorator
