from flask import request
from flask_restplus import Resource, marshal_with, marshal
from app import db
from db.models.pcs import Race, Sex, CharacterClass, Pc
from . import api_rest
from .models import LookupModel, CharacterModel


@api_rest.route('/')
class Characters(Resource):
    @marshal_with(CharacterModel, envelope='characters')
    def get(self):
        return Pc.query.all()

    def put(self):
        data = api_rest.payload.get('character', dict())
        pc = Pc(**data)
        db.session.add(pc)
        db.session.commit()
        return {
            'result': True,
            'character': marshal(pc, CharacterModel)
        }


@api_rest.route('/<int:character_id>/')
class Character(Resource):
    @marshal_with(CharacterModel, envelope='character')
    def get(self, character_id):
        character = Pc.query.get(character_id)
        if not character:
            return None

        character.clear_messages()
        return character


@api_rest.route('/add/')
class AddCharacter(Resource):
    @marshal_with(CharacterModel, envelope='character')
    def get(self):
        return Pc()


@api_rest.route('/races/')
class Races(Resource):
    @marshal_with(LookupModel, envelope='races')
    def get(self):
        return Race.query.all()


@api_rest.route('/sexes/')
class Sexes(Resource):
    @marshal_with(LookupModel, envelope='sexes')
    def get(self):
        return Sex.query.all()


@api_rest.route('/classes/')
class CharacterClasses(Resource):
    @marshal_with(LookupModel, envelope='classes')
    def get(self):
        return CharacterClass.query.all()


@api_rest.route('/<int:character_id>/go/')
class MoveCharacter(Resource):
    @marshal_with(CharacterModel, envelope='character')
    def post(self, character_id):
        direction_id = request.form.get('direction')
        character = Pc.query.get(character_id)
        if character is not None:
            character.walk(direction_id)
        return character
