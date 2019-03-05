from .db import NamedRecord


class Race(NamedRecord):
    RECORDS = []


Race(name='Human').save()
Race(name='Elf').save()
Race(name='Dwarf').save()
Race(name='Bobbit').save()
