from flask_restplus import Resource, marshal, marshal_with
from . import ns, api
from .models import MessageModel
from db.models.pcs import Pc


@ns.route('/<int:character_id>/')
@ns.response(404, "Character not found")
@ns.param('character_id', "Character identifier")
class MessagesController(Resource):
    @ns.doc('receive_messages')
    @marshal_with(MessageModel, envelope='messages')
    def get(self, character_id):
        return Pc.get_or_404(character_id).read_messages()

    @ns.doc('send_message')
    def put(self, character_id):
        text = 'Huh?'
        if api.payload:
            text = api.payload.get('message') or text

        pc = Pc.get_or_404(character_id)
        message = pc.message(text)
        return {
            'result': True,
            'message': marshal(message, MessageModel),
            'messages': marshal(pc.read_messages(), MessageModel),
        }
