from flask_restplus import fields
from . import api


LookupModel = api.model('Lookup', {
    'id': fields.Integer,
    'name': fields.String,
})

CharacterModel = api.model('Character', {
    'id': fields.Integer(readOnly=True),
    'name': fields.String,

    'strength': fields.Integer,
    'agility': fields.Integer,
    'stamina': fields.Integer,
    'charisma': fields.Integer,
    'wisdom': fields.Integer,
    'intelligence': fields.Integer,

    'hp': fields.Integer,
    'food': fields.Integer,
    'xp': fields.Integer,
    'coin': fields.Integer,

    'x': fields.Integer,
    'y': fields.Integer,

    'race': fields.Nested(LookupModel),
    'sex': fields.Nested(LookupModel),
    'character_class': fields.Nested(LookupModel),
})
