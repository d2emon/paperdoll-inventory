from .db import Record


class Sex(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.name = fields.get('name')

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


Sex(name='Male').save()
Sex(name='Female').save()
