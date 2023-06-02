from functools import wraps
from flask import request, jsonify
from schemas.users import UsersSchema


def deserialize_user(endpoint):
    @wraps(endpoint)
    def decorator(*args, **kwargs):
        if not request.data:
            return jsonify({'status':'error', 'message':'invalid request'})
        else:
            data = request.get_json()
            result = UsersSchema().load(data)
            return endpoint(body=result, *args, **kwargs)
    return decorator
