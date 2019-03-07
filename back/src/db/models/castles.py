from flask import abort
from app import db
from .local_mixin import LocalMixin
from .npcs import Npc


X_MAX = 38
Y_MAX = 18


class CastleLocationType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer)
    name = db.Column(db.String(16))
    passable = db.Column(db.Boolean)

    def __init__(self, **fields):
        self.name = fields.get('name')
        self.image_id = fields.get('image_id')
        self.passable = fields.get('passable', True)


class Castle(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    entrance_x = db.Column(db.Integer)
    entrance_y = db.Column(db.Integer)
    is_city = db.Column(db.Integer)

    # location_type_id = db.Column(db.Integer, db.ForeignKey('location_type.id'))
    # location_type = db.relationship('LocationType')

    def __init__(self, **fields):
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.name = fields.get('name')
        self.entrance_x = fields.get('entrance_x')
        self.entrance_y = fields.get('entrance_y')
        self.is_city = fields.get('is_city')

    @classmethod
    def get_or_404(cls, castle_id):
        castle = cls.query.get(castle_id)
        if castle is None:
            abort(404, "Character #{} doesn't exists".format(castle_id))
        return castle

    @property
    def passable(self):
        return True

    def can_go(self, x, y):
        def locatin_passable():
            item = CastleLocation.by_coords(x, y).filter_by(castle_id=self.id).first()
            if item is None:
                return CastleLocation.default_passable
            return item.passable

        def character_passable():
            item = Npc.by_coords(x, y).filter_by(castle_id=self.id).first()
            if item is None:
                return Npc.default_passable
            return item.passable

        if x < 0 or x > X_MAX:
            return False
        if y < 0 or y > Y_MAX:
            return False
        return locatin_passable() and character_passable()
    # @property
    # def locations(self):
    #     return CastleLocation.by_castle(self.id)

    def next_step(self, viewer):
        for character in self.characters:
            character.next_step(viewer)


class CastleLocation(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)

    location_type_id = db.Column(db.Integer, db.ForeignKey('castle_location_type.id'))
    location_type = db.relationship('CastleLocationType')

    castle_id = db.Column(db.Integer, db.ForeignKey('castle.id'))
    castle = db.relationship(
        'Castle',
        backref=db.backref('locations'),
    )

    def __init__(self, **fields):
        self.castle_id = fields.get('castle_id')
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    @property
    def passable(self):
        if self.location_type:
            return self.location_type.passable
        return True
