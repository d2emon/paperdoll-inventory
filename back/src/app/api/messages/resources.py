from flask_restplus import Resource
from data.messages import Message
from . import api_rest

from app import db
from models import Messages


@api_rest.route('/<int:player_id>/')
class MessagesController(Resource):
    def get(self, player_id):
        tm = Messages('message')
        db.session.add(tm)
        db.session.commit()

        for i in Messages.query.all():
            print(i.serialize())

        return {'messages': Message.serialize_records(Message.by_player(player_id))}

    def put(self, player_id):
        text = api_rest.payload.get('message') or 'Huh?'

        m = Messages(player_id, text)
        db.session.add(m)
        db.session.commit()

        message = Message(
            player_id=player_id,
            text=text
        )
        message.save()
        return {
            'result': True,
            'message': message.serialize(),
            'messages': Message.serialize_records(Message.by_player(player_id))
        }
