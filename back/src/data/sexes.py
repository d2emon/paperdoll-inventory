from .db import NamedRecord


class Sex(NamedRecord):
    RECORDS = []


Sex(name='Male').save()
Sex(name='Female').save()
