from flask import request
from flask_restplus import Resource, abort
from functools import wraps


class SecureResource(Resource):
    # method_decorators = [require_auth]
    pass


def require_auth(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        if request.headers.get('authorization'):
            return func(*args, **kwargs)
        else:
            return abort(401)

    return wrapper
