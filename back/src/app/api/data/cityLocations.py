from .db import LocalRecord


class CastleLocation(LocalRecord):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.castle_id = fields.get('castle_id')

    def as_dict(self):
        return {
            'id': self.id,
            'castle_id': self.castle_id,
            'x': self.x,
            'y': self.y,
            'location_type': self.location_type_id,
        }

    @classmethod
    def by_castle(cls, castle_id):
        return list(filter(lambda item: item.castle_id == castle_id, cls.RECORDS))
