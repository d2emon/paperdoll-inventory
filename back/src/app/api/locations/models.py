from flask_restplus import fields
from . import api

LocationTypeModel = api.model('LocationType', {
    'image_id': fields.Integer,
    'is_pond': fields.Boolean,
}, skip_none=True)

LocationModel = api.model('Location', {
    'x': fields.Integer,
    'y': fields.Integer,
    'location_type': fields.Nested(LocationTypeModel, skip_none=True),
}, skip_none=True)

CastleModel = api.model('Castle', {
    'id': fields.Integer,
    'x': fields.Integer,
    'y': fields.Integer,
    'name': fields.String,
}, skip_none=True)
