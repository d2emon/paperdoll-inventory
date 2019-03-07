from flask_restplus import fields
from . import api
from ..locations.models import LocationModel


LookupModel = api.model('Lookup', {
    'id': fields.Integer,
    'name': fields.String,
})

NeswModel = api.model('Nesw', {
   'n': fields.Nested(LocationModel, skip_none=True),
   'e': fields.Nested(LocationModel, skip_none=True),
   's': fields.Nested(LocationModel, skip_none=True),
   'w': fields.Nested(LocationModel, skip_none=True),
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

    'race': fields.Nested(LookupModel, skip_none=True),
    'sex': fields.Nested(LookupModel, skip_none=True),
    'character_class': fields.Nested(LookupModel, skip_none=True),

    'castle_id': fields.Integer,

    'nesw': fields.Nested(NeswModel, skip_none=True),
})
