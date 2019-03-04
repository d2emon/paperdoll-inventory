from .db import Record


class Race(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.name = fields.get('name')

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


Race(name='Human').save()
Race(name='Elf').save()
Race(name='Dwarf').save()
Race(name='Bobbit').save()
