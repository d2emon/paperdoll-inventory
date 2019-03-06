from flask_restplus import Resource, marshal_with
from db.models.castles import Castle
from . import ns
from .models import CastleModel


@ns.route('/<int:castle_id>/')
@ns.response(404, "Castle not found")
@ns.param('castle_id', "Castle identifier")
class CastleResource(Resource):
    @ns.doc('list_castles')
    @marshal_with(CastleModel, envelope='castle', skip_none=True)
    def get(self, castle_id):
        return Castle.get_or_404(castle_id)
