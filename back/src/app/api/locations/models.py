from flask_restplus import fields
from . import api

LocationTypeModel = api.model('LocationType', {
    'image_id': fields.Integer,
})

LocationModel = api.model('Location', {
    'x': fields.Integer,
    'y': fields.Integer,
    'location_type': fields.Nested(LocationTypeModel),
})

CastleModel = api.model('Castle', {
    'id': fields.Integer,
    'x': fields.Integer,
    'y': fields.Integer,
    'name': fields.String,
})
