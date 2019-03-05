class Record:
    RECORDS = []

    def __init__(self, **fields):
        self.id = fields.get('id')

    @classmethod
    def get_record(cls, item_id):
        for record in cls.RECORDS:
            if str(record.id) == str(item_id):
                return record

    @classmethod
    def get_records(cls):
        return cls.RECORDS

    def save(self):
        self.id = self.id or len(self.RECORDS) + 1
        record = self.get_record(self.id)
        if record:
            record_id = self.RECORDS.index(record)
            self.RECORDS[record_id] = self
        else:
            self.RECORDS.append(self)

    @classmethod
    def delete_record(cls, item_id):
        record = cls.get_record(item_id)
        if record:
            record_id = cls.RECORDS.index(record)
            del cls.RECORDS[record_id]

    def serialize(self):
        return {
            'id': self.id,
        }

    @classmethod
    def serialize_field(cls, field):
        if field is None:
            return None
        return field.serialize()

    @classmethod
    def serialize_all(cls):
        return list(map(lambda record: record.serialize(), cls.get_records()))


class LocalRecord(Record):
    X_OFFSET = 9
    Y_OFFSET = 4

    def __init__(self, **fields):
        super().__init__(**fields)
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.location_type_id = fields.get('location_type_id')

    def serialize(self):
        return {
            'id': self.id,
            'x': self.x,
            'y': self.y,
            'location_type': self.location_type_id,
        }

    @classmethod
    def by_coords(cls, x, y):
        for item in cls.RECORDS:
            if x == item.x and y == item.y:
                return item

    @classmethod
    def in_range(cls, x1, x2, y1, y2):
        def range_filter(item):
            if x1 > item.x:
                return False
            if x2 < item.x:
                return False
            if y1 > item.y:
                return False
            if y2 < item.y:
                return False
            return True
        return list(filter(range_filter, cls.RECORDS))


    @classmethod
    def nearby(cls, x, y):
        return cls.in_range(
            x - cls.X_OFFSET,
            x + cls.X_OFFSET + 1,
            y - cls.Y_OFFSET,
            y + cls.Y_OFFSET + 1,
        )


class NamedRecord(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.name = fields.get('name')

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }
