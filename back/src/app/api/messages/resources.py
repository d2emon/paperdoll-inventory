from flask_restplus import Resource
from data.messages import Message
from . import api_rest


@api_rest.route('/<int:player_id>/')
class Messages(Resource):
    def get(self, player_id):
        records = map(lambda record: record.serialize(), Message.by_player(player_id))
        return {'messages': list(records)}

    def put(self, player_id):
        text = api_rest.payload.get('message') or 'Huh?'
        message = Message(
            player_id=player_id,
            text=text
        )
        message.save()
        return {
            'result': True,
            'message': message.serialize(),
        }
