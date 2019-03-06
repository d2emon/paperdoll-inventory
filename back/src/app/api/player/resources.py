from flask import request
from flask_restplus import Resource, marshal_with, marshal
from app import db
from db.models.pcs import Race, Sex, CharacterClass, Pc
from . import ns, api
from .models import LookupModel, CharacterModel


@ns.route('/races/')
class Races(Resource):
    @ns.doc('list_races')
    @marshal_with(LookupModel, envelope='races')
    def get(self):
        return Race.query.all()


@ns.route('/sexes/')
class Sexes(Resource):
    @ns.doc('list_sexes')
    @marshal_with(LookupModel, envelope='sexes')
    def get(self):
        return Sex.query.all()


@ns.route('/classes/')
class CharacterClasses(Resource):
    @ns.doc('list_classes')
    @marshal_with(LookupModel, envelope='classes')
    def get(self):
        return CharacterClass.query.all()


@ns.route('/')
class Characters(Resource):
    @ns.doc('list_characters')
    @marshal_with(CharacterModel, envelope='characters')
    def get(self):
        return Pc.query.all()

    @ns.doc('save_character')
    @ns.expect(CharacterModel)
    def put(self):
        data = api.payload.get('character', dict())
        pc = Pc(**data)
        db.session.add(pc)
        db.session.commit()
        return {
            'result': True,
            'character': marshal(pc, CharacterModel)
        }


@ns.route('/<int:character_id>/')
@ns.response(404, "Character not found")
@ns.param('character_id', "Character identifier")
class Character(Resource):
    @ns.doc('list_characters')
    @marshal_with(CharacterModel, envelope='character')
    def get(self, character_id):
        character = Pc.get_or_404(character_id)
        character.clear_messages()
        return character


@ns.route('/add/')
class AddCharacter(Resource):
    @ns.doc('create_character')
    @marshal_with(CharacterModel, envelope='character')
    def get(self):
        return Pc()


@ns.route('/<int:character_id>/go/')
@ns.response(404, "Character not found")
@ns.param('character_id', "Character identifier")
class MoveCharacter(Resource):
    @ns.doc('move_character')
    @marshal_with(CharacterModel, envelope='character')
    def post(self, character_id):
        direction_id = request.form.get('direction')
        character = Pc.get_or_404(character_id)
        character.walk(direction_id)
        return character
