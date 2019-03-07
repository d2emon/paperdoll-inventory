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


class MapMixin:
    child_model = None

    X_MIN = 0
    X_MAX = 255

    Y_MIN = 0
    Y_MAX = 255

    def child_passable(self, x, y):
        child = self.child_by_coords(x, y).first()
        if child is None:
            return self.child_model.default_passable
        return child.passable

    def characters_passable(self, x, y):
        return True

    def child_can_go(self, x, y):
        if x < self.X_MIN or x > self.X_MAX:
            return False
        if y < self.Y_MIN or y > self.Y_MAX:
            return False
        if not self.child_passable(x, y):
            return False
        if not self.characters_passable(x, y):
            return False
        return True

    def child_by_coords(self, x, y):
        return self.child_model.by_coords(x, y).filter_by(map_id=self.id)
