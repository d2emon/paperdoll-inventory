from .db import NamedRecord


class CharacterClass(NamedRecord):
    RECORDS = []


CharacterClass(name='Fighter').save()
CharacterClass(name='Cleric').save()
CharacterClass(name='Wizard').save()
CharacterClass(name='Thief').save()
