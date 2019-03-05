from flask import Blueprint
from flask_restplus import Api

player_api = Blueprint('player_api_blueprint', __name__, url_prefix='/api/character')
api_rest = Api(player_api)

from .resources import *
