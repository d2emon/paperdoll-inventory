from flask import request
from flask_restplus import Resource
from datetime import datetime
from data.castles import Castle
from data.locations import Location
from data.messages import Message
from . import api_rest
from .security import SecureResource


@api_rest.route('/languages')
class Languages(Resource):
    def get(self):
        return {
            'languages': [
                'assembly',
                'c#',
                'c',
                'c++',
                'go',
                'java',
                'javascript',
                'object c',
                'pascal',
                'perl',
                'php',
                'python',
                'R',
                'ruby',
                'SQL',
                'swift',
                'visual basic',
            ],
        }


@api_rest.route('/resource/<string:resource_id>')
class ResourceOne(Resource):
    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}

    def post(self, resource_id):
        payload = request.json
        return {'timestamp': payload}, 201


@api_rest.route('/secure-resource/<string:resource_id>')
class SecureResourceOne(SecureResource):
    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}


@api_rest.route('/messages/<int:player_id>')
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


@api_rest.route('/map-<int:x>-<int:y>')
class LocalMap(Resource):
    def get(self, x, y):
        location = Location.by_coords(x, y)
        if location:
            location = location.serialize()
        locations = map(lambda record: record.serialize(), Location.nearby(x, y))
        castles = map(lambda record: record.serialize(), Castle.nearby(x, y))
        return {
            'location': location,
            'localMap': list(locations),
            'castles': list(castles),
            'cities': [],
        }


@api_rest.route('/location-<int:x>-<int:y>')
class Locations(Resource):
    def get(self, x, y):
        location = Location.by_coords(x, y)
        if location:
            location = location.serialize()
        return {
            'location': location,
        }


@api_rest.route('/castle/<int:castle_id>')
class Castles(Resource):
    def get(self, castle_id):
        castle = Castle.get_record(castle_id)
        if castle:
            castle_dict = castle.serialize()
            castle_dict['locations'] = castle.locations
            castle = castle_dict
        return {'castle': castle}
