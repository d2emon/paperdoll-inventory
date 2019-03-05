from flask import Blueprint
from flask_restplus import Api

messages_api = Blueprint('messages_api_blueprint', __name__, url_prefix='/api/messages')
api_rest = Api(messages_api)

from .resources import *
