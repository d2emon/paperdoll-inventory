class Record:
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
            record_id = cls.PLAYERS.index(record)
            del cls.PLAYERS[record_id]

    def as_dict(self):
        return {
            'id': self.id,
        }
