from flask import request
from flask_restplus import Resource
from datetime import datetime
# from data.castles import Castle
# from data.locations import Location
from . import api
from .security import SecureResource
from db.models.locations import Location
from db.models.castles import Castle

@api.route('/languages')
class Languages(Resource):
    def get(self):
        return {
            'languages': [
                'assembly',
                'c#',
                'c',
                'c++',
                'go',
                'java',
                'javascript',
                'object c',
                'pascal',
                'perl',
                'php',
                'python',
                'R',
                'ruby',
                'SQL',
                'swift',
                'visual basic',
            ],
        }


@api.route('/resource/<string:resource_id>')
class ResourceOne(Resource):
    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}

    def post(self, resource_id):
        payload = request.json
        return {'timestamp': payload}, 201


@api.route('/secure-resource/<string:resource_id>')
class SecureResourceOne(SecureResource):
    def get(self, resource_id):
        timestamp = datetime.utcnow().isoformat()
        return {'timestamp': timestamp}


@api.route('/castle/<int:castle_id>')
class Castles(Resource):
    def get(self, castle_id):
        castle = Castle.query.get(castle_id)
        # if castle:
        #     castle_dict = castle.serialize()
        #     castle_dict['locations'] = castle.locations
        #     castle = castle_dict
        return {'castle': castle}
