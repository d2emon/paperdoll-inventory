from flask import Blueprint
from flask_restplus import Api

api_blueprint = Blueprint('api_blueprint', __name__, url_prefix='/api')
api = Api(
    api_blueprint,
    version='1.0',
    title='Ultima API',
    description='My Ultima API',
)


# @api_blueprint.after_request
# def add_header(response):
#     response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
#     return response


from .messages import *
from .player import *
from .locations import *
from .castles import *

from .resources import *
