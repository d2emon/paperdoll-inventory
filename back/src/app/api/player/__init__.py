from flask import Blueprint
from flask_restplus import Api, Namespace

player_api = Blueprint('player_api_blueprint', __name__, url_prefix='/api/character')
api_rest = Api(player_api)
ns = Namespace('characters', description='Characters')

from .resources import *
