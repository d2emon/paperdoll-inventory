from app import db
from .local_mixin import LocalMixin


X_OFFSET = 9
Y_OFFSET = 4


class Castle(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)

    location_type_id = db.Column(db.Integer, db.ForeignKey('location_type.id'))
    location_type = db.relationship('LocationType')

    def __init__(self, **fields):
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    @classmethod
    def by_coords(cls, x, y):
        return cls.query.filter_by(x=x, y=y)

    @classmethod
    def in_range(cls, x1, x2, y1, y2):
        return cls.query.filter(
            cls.x > x1,
            cls.x < x2,
            cls.y > y1,
            cls.y < y2,
        )

    @classmethod
    def nearby(cls, x, y):
        return cls.in_range(
            x - X_OFFSET,
            x + X_OFFSET + 1,
            y - Y_OFFSET,
            y + Y_OFFSET + 1,
        )

    @property
    def passable(self):
        if self.location_type:
            return self.location_type.passable
        return True

    @classmethod
    def can_go(cls, x, y):
        item = cls.by_coords(x, y)
        if item is None:
            return False
        return item.passable
