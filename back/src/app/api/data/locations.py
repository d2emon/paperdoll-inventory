from .db import Record


X_OFFSET = 9
Y_OFFSET = 4

X_MAX = 255
Y_MAX = 255


class Location(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    def as_dict(self):
        return {
            'id': self.id,
            'x': self.x,
            'y': self.y,
            'location_type': self.location_type_id,
        }

    @classmethod
    def by_coords(cls, x, y):
        for item in cls.RECORDS:
            if x - X_OFFSET > item.x:
                continue
            if x + X_OFFSET + 1 < item.x:
                continue
            if y - Y_OFFSET > item.y:
                continue
            if y + Y_OFFSET + 1 < item.y:
                continue
            return item

    @classmethod
    def nearby(cls, x, y):
        def nearby_filter(item):
            if x - X_OFFSET > item.x:
                return False
            if x + X_OFFSET + 1 < item.x:
                return False
            if y - Y_OFFSET > item.y:
                return False
            if y + Y_OFFSET + 1 < item.y:
                return False
            return True

        """
        Promise.all([
            Promise.all(locations),
            castles.getCastlesIn(x0, x1, y0, y1)
        ])
        .then(([localMap, {castles}]) = > resolve({
            localMap: localMap,
            castles
        }))
        """
        return list(filter(nearby_filter, cls.RECORDS))


WORLD_MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [3, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 1, 1, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
]
for j, row in enumerate(WORLD_MAP):
    for i, location_type_id in enumerate(row):
        Location(x=i, y=j, location_type_id=location_type_id).save()
