from flask_restplus import Resource
from data.classes import CharacterClass
from data.messages import Message
from data.players import Player
from data.races import Race
from data.sexes import Sex
from . import api_rest


@api_rest.route('/')
class Characters(Resource):
    def get(self):
        return {'characters': Player.serialize_all()}

    def put(self):
        data = api_rest.payload.get('character', dict())
        player = Player(**data)
        player.save()
        return {
            'result': True,
            'character': player.serialize(),
        }


@api_rest.route('/<int:character_id>/')
class Character(Resource):
    def get(self, character_id):
        character = Player.get_record(character_id)
        if not character:
            return {'character': None}

        character.clear_messages()
        return {'character': character.serialize()}


@api_rest.route('/add/')
class AddCharacter(Resource):
    def get(self):
        return {'character': Player().serialize()}


@api_rest.route('/races/')
class Races(Resource):
    def get(self):
        return {'races': Race.serialize_all()}


@api_rest.route('/sexes/')
class Sexes(Resource):
    def get(self):
        return {'sexes': Sex.serialize_all()}


@api_rest.route('/classes/')
class CharacterClasses(Resource):
    def get(self):
        return {'classes': CharacterClass.serialize_all()}
