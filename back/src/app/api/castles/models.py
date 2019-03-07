from flask_restplus import fields
from . import api
from ..locations.models import LocationTypeModel, LocationModel


CharacterModel = api.model('Character', {
    'x': fields.Integer,
    'y': fields.Integer,
    'npc_type_id': fields.Integer,
    'location_type': fields.Nested(LocationTypeModel),
})

CastleModel = api.model('Castle', {
    'id': fields.Integer,
    'x': fields.Integer,
    'y': fields.Integer,
    'name': fields.String,
    'locations': fields.List(fields.Nested(LocationModel)),
    'characters': fields.List(fields.Nested(CharacterModel)),
})
