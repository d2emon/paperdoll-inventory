import random
from flask import request
from flask_restplus import Resource
from datetime import datetime
from . import api_rest
from .security import SecureResource
from .data.players import Player
from .data.races import Race
from .data.sexes import Sex
from .data.classes import CharacterClass
from .data.locations import Location


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


@api_rest.route('/random')
class RandomNumber(Resource):
    def get(self):
        return {'randomNumber': random.randint(1, 100)}


@api_rest.route('/characters')
class Characters(Resource):
    def get(self):
        records = map(lambda record: record.as_dict(), Player.get_records())
        return {'characters': list(records)}

    def put(self):
        data = api_rest.payload.get('character', dict())
        player = Player(**data)
        player.save()
        return {
            'result': True,
            'character': player.as_dict(),
        }


@api_rest.route('/character/<int:id>')
class Character(Resource):
    def get(self, id):
        player = Player.get_record(id)
        if player:
            player = player.as_dict()
        return {'character': player}


@api_rest.route('/character/new')
class AddCharacter(Resource):
    def get(self):
        return {'character': Player().as_dict()}


@api_rest.route('/races')
class Races(Resource):
    def get(self):
        records = map(lambda record: record.as_dict(), Race.get_records())
        return {'races': list(records)}


@api_rest.route('/sexes')
class Sexes(Resource):
    def get(self):
        records = map(lambda record: record.as_dict(), Sex.get_records())
        return {'sexes': list(records)}


@api_rest.route('/classes')
class CharacterClasses(Resource):
    def get(self):
        records = map(lambda record: record.as_dict(), CharacterClass.get_records())
        return {'classes': list(records)}


@api_rest.route('/map-<int:x>-<int:y>')
class LocalMap(Resource):
    def get(self, x, y):
        location = Location.by_coords(x, y)
        if location:
            location = location.as_dict()
        locations = map(lambda record: record.as_dict(), Location.nearby(x, y))
        return {
            'location': location,
            'localMap': list(locations),
            'castles': [],
            'cities': [],
        }
