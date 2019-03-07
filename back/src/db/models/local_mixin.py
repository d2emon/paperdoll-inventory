from app import db


X_OFFSET = 9
Y_OFFSET = 4


class LocalMixin:
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)

    default_passable = True

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

    @classmethod
    def can_go(cls, x, y):
        item = cls.by_coords(x, y).first()
        print(x, y, item)
        if item is None:
            return cls.default_passable
        print(x, y, item.passable)
        return item.passable
