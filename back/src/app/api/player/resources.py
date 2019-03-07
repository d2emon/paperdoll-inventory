from flask import request
from flask_restplus import Resource, marshal_with, marshal
from app import db
from db.models.pcs import Race, Sex, CharacterClass, Pc
from db.models.castles import Castle
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
    @marshal_with(LookupModel, envelope='classes', skip_none=True)
    def get(self):
        return CharacterClass.query.all()


@ns.route('/')
class Characters(Resource):
    @ns.doc('list_characters')
    @marshal_with(CharacterModel, envelope='characters', skip_none=True)
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
    @marshal_with(CharacterModel, envelope='character', skip_none=True)
    def get(self, character_id):
        character = Pc.get_or_404(character_id)
        character.clear_messages()
        return character


@ns.route('/add/')
class AddCharacter(Resource):
    @ns.doc('create_character')
    @marshal_with(CharacterModel, envelope='character', skip_none=True)
    def get(self):
        return Pc()


@ns.route('/<int:character_id>/do/<action>/')
@ns.response(404, "Character not found")
@ns.param('character_id', "Character identifier")
@ns.param('action', "Action to do")
class MoveCharacter(Resource):
    @ns.doc('do_action')
    @marshal_with(CharacterModel, envelope='character', skip_none=True)
    def post(self, character_id, action):
        character = Pc.get_or_404(character_id)
        if action == 'go':
            direction_id = request.form.get('direction')
            character.walk(direction_id)
        elif action == 'drop':
            character.drop(**request.form)
        elif action == 'enter':
            castle_id = request.form.get('castle')
            character.enter_castle(castle_id)
        elif action == 'exit':
            character.exit_castle()
        return character
