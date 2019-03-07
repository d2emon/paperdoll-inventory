from flask import abort
from app import db
from .local_mixin import LocalMixin, MapMixin


X_MAX = 255
Y_MAX = 255


class LocationType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer)
    name = db.Column(db.String(16))
    passable = db.Column(db.Boolean)

    def __init__(self, **fields):
        self.name = fields.get('name')
        self.image_id = fields.get('image_id')
        self.passable = fields.get('passable', True)


class Location(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)

    map_id = db.Column(db.Integer, db.ForeignKey('game_map.id'))
    game_map = db.relationship(
        'GameMap',
        backref=db.backref('locations'),
    )

    location_type_id = db.Column(db.Integer, db.ForeignKey('location_type.id'))
    location_type = db.relationship('LocationType')

    def __init__(self, **fields):
        self.map_id = fields.get('map_id')
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    @property
    def passable(self):
        if self.location_type:
            return self.location_type.passable
        return True


class GameMap(MapMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

    child_model = Location

    def __init__(self, **fields):
        self.name = fields.get('name')

    @classmethod
    def get_or_404(cls, map_id):
        item = cls.query.get(map_id)
        if item is None:
            abort(404, "Map #{} doesn't exists".format(map_id))
        return item

    def next_step(self, viewer):
        viewer.eat()
