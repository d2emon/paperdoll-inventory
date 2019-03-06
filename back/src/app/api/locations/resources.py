from flask_restplus import Resource, marshal, marshal_with
from . import ns
from .models import LocationModel, CastleModel
from db.models.locations import Location
from db.models.castles import Castle


@ns.route('/map-<int:x>-<int:y>')
@ns.param('x', "X coordinate")
@ns.param('y', "Y coordinate")
class LocalMap(Resource):
    @ns.doc('get_map')
    def get(self, x, y):
        return {
            'localMap': marshal(Location.nearby(x, y).all(), LocationModel),
            'castles': marshal(Castle.nearby(x, y).all(), CastleModel),
            'cities': [],
            'location': marshal(Location.by_coords(x, y).first(), LocationModel),
            'castle': marshal(Castle.by_coords(x, y).first(), CastleModel),
        }


@ns.route('/location-<int:x>-<int:y>')
@ns.response(404, "Location not found")
@ns.param('x', "X coordinate")
@ns.param('y', "Y coordinate")
class Locations(Resource):
    @ns.doc('get_location')
    @marshal_with(LocationModel, envelope='location')
    def get(self, x, y):
        # return Location.get_or_404(x, y)
        return Location.by_coords(x, y)
