from .db import Record


class CharacterClass(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.name = fields.get('name')

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }


CharacterClass(name='Fighter').save()
CharacterClass(name='Cleric').save()
CharacterClass(name='Wizard').save()
CharacterClass(name='Thief').save()
