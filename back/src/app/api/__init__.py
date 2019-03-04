from flask import Blueprint
from flask_restplus import Api

api = Blueprint('api_blueprint', __name__, url_prefix='/api')
api_rest = Api(api)


# @api_blueprint.after_request
# def add_header(response):
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
#     return response


from .resources import *
