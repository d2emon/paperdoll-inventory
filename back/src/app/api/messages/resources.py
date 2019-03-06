from flask_restplus import Resource, marshal, marshal_with
from . import api_rest
from .models import MessageModel
from db.models.pcs import Pc


@api_rest.route('/<int:character_id>/')
class MessagesController(Resource):
    @marshal_with(MessageModel, envelope='messages')
    def get(self, character_id):
        return Pc.query.get(character_id).read_messages()

    def put(self, character_id):
        text = api_rest.payload.get('message') or 'Huh?'

        pc = Pc.query.get(character_id)
        message = pc.message(text)
        return {
            'result': True,
            'message': marshal(message, MessageModel),
            'messages': marshal(pc.read_messages(), MessageModel),
        }
