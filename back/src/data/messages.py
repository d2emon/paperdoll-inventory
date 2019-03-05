from .db import Record


class Message(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
        self.player_id = fields.get('player_id')
        self.text = fields.get('text', 'Huh?')

    def serialize(self):
        return {
            'id': self.id,
            'player_id': self.player_id,
            'text': self.text,
        }

    @classmethod
    def by_player(cls, player_id):
        return list(filter(lambda item: item.player_id == player_id, cls.RECORDS))
