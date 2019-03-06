from app import db
from .local_mixin import LocalMixin


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

    location_type_id = db.Column(db.Integer, db.ForeignKey('location_type.id'))
    location_type = db.relationship('LocationType')

    def __init__(self, **fields):
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    @property
    def passable(self):
        if self.location_type:
            return self.location_type.passable
        return True
