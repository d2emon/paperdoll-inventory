from app import db


class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(80))

    character_id = db.Column(db.Integer, db.ForeignKey('pc.id'))
    character = db.relationship(
        'Pc',
        backref=db.backref('messages', order_by='Message.id.desc()', lazy='dynamic'),
    )

    def __init__(self, character_id=None, text=''):
        self.character_id = character_id
        self.text = text

    def serialize(self):
        return {
            'id': self.id,
            'player_id': self.character_id,
            'text': self.text,
        }

    @classmethod
    def by_player(cls, character_id):
        return cls.query.filter_by(character_id=character_id)

    @classmethod
    def clear(cls, character_id):
        cls.by_player(character_id).delete()
