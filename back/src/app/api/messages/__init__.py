from flask import Blueprint
from flask_restplus import Api, Namespace

messages_api = Blueprint('messages_api_blueprint', __name__, url_prefix='/api/messages')
api_rest = Api(messages_api)
ns = Namespace('messages', description='Messages')

from .resources import *
