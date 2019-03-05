from app import db


class Messages(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    player_id = db.Column(db.Integer)
    text = db.Column(db.String(80))

    def __init__(self, player_id=None, text=''):
        print(player_id, text)
        self.player_id = player_id
        self.text = text

    def serialize(self):
        return {
            'id': self.id,
            'player_id': self.player_id,
            'text': self.text,
        }