from app import db
from .local_mixin import LocalMixin


class Castle(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))

    # location_type_id = db.Column(db.Integer, db.ForeignKey('location_type.id'))
    # location_type = db.relationship('LocationType')

    def __init__(self, **fields):
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.name = fields.get('name')
        # self.location_type_id = fields.get('location_type_id')

    @property
    def passable(self):
        # if self.location_type:
        #     return self.location_type.passable
        return True

    # @property
    # def locations(self):
    #     return CastleLocation.by_castle(self.id)
