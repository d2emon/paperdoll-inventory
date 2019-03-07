import random
from app import db
from .local_mixin import LocalMixin


class NpcType(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    walking = db.Column(db.Boolean)

    def __init__(self, **fields):
        self.name = fields.get('name')
        self.walking = fields.get('walking')


class Npc(LocalMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128))
    song = db.Column(db.String(128))

    npc_type_id = db.Column(db.Integer, db.ForeignKey('npc_type.id'))
    npc_type = db.relationship('NpcType')

    castle_id = db.Column(db.Integer, db.ForeignKey('castle.id'))
    castle = db.relationship('Castle', backref='characters')

    def __init__(self, **fields):
        self.x = fields.get('x')
        self.y = fields.get('y')
        self.name = fields.get('name')
        self.song = fields.get('song')
        self.npc_type_id = fields.get('npc_type_id')
        self.castle_id = fields.get('castle_id')

    @property
    def passable(self):
        return False

    @property
    def walking(self):
        if not self.npc_type:
            return False
        return self.npc_type.walking

    def walk(self, viewer):
        x, y = random.choice((
            (0, -1),
            (1, 0),
            (0, 1),
            (-1, 0),
        ))
        new_x = self.x + x
        new_y = self.y + y
        if self.castle:
            if not self.castle.can_go(new_x, new_y):
                return
        self.x = new_x
        self.y = new_y

    def sing(self, viewer):
        viewer.message("{} sings:<br />{}".format(self.name, self.song))

    def next_step(self, viewer):
        actions = []
        if self.walking:
            actions.append(self.walk)
        if self.song:
            actions.append(self.sing)
        if len(actions) <= 0:
            return

        action = random.choice(actions)
        message = action(viewer)
        db.session.add(self)
        db.session.commit()
