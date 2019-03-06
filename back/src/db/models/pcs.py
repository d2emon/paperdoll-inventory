from app import db
from .messages import Message


START_X = 18
START_Y = 6

DIRECTIONS = {
    'North': (0, -1),
    'East': (1, 0),
    'South': (0, 1),
    'West': (-1, 0),
}


def get_direction(direction_id):
    return DIRECTIONS.get(direction_id, (0, 0))


class Race(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16))

    def __init__(self, name=''):
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class CharacterClass(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16))

    def __init__(self, name=''):
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Sex(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16))

    def __init__(self, name=''):
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Pc(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(16))

    strength = db.Column(db.Integer)
    agility = db.Column(db.Integer)
    stamina = db.Column(db.Integer)
    charisma = db.Column(db.Integer)
    wisdom = db.Column(db.Integer)
    intelligence = db.Column(db.Integer)

    hp = db.Column(db.Integer, default=150)
    food = db.Column(db.Float, default=200.0)
    xp = db.Column(db.Integer, default=0)
    coin = db.Column(db.Integer, default=100)

    x = db.Column(db.Integer, default=START_X)
    y = db.Column(db.Integer, default=START_Y)

    race_id = db.Column(db.Integer, db.ForeignKey('race.id'))
    race = db.relationship('Race')

    sex_id = db.Column(db.Integer, db.ForeignKey('sex.id'))
    sex = db.relationship('Sex')

    class_id = db.Column(db.Integer, db.ForeignKey('character_class.id'))
    character_class = db.relationship('CharacterClass')

    def __init__(self, **fields):
        self.name = fields.get('name', '')

        self.strength = fields.get('strength', 10)
        self.agility = fields.get('agility', 10)
        self.stamina = fields.get('stamina', 10)
        self.charisma = fields.get('charisma', 10)
        self.wisdom = fields.get('wisdom', 10)
        self.intelligence = fields.get('intelligence', 10)

        self.race_id = fields.get('race_id')
        self.sex_id = fields.get('sex_id')
        self.class_id = fields.get('class_id')

        self.hp = fields.get('hp', 150)
        self.food = fields.get('food', 200.0)
        self.xp = fields.get('xp', 0)
        self.coin = fields.get('coin', 100)

        self.x = fields.get('x', START_X)
        self.y = fields.get('y', START_Y)

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,

            'strength': self.strength,
            'agility': self.agility,
            'stamina': self.stamina,
            'charisma': self.charisma,
            'wisdom': self.wisdom,
            'intelligence': self.intelligence,

            'race': self.race,
            'sex': self.sex,
            'class': self.character_class,

            'hp': self.hp,
            'food': int(self.food),
            'xp': self.xp,
            'coin': self.coin,

            'position': {
                'x': self.x,
                'y': self.y,
            },
        }

    def read_messages(self):
        return self.messages.limit(4).all()

    def message(self, text="Huh?"):
        message = Message(self.id, text)
        db.session.add(message)
        db.session.commit()
        return message

    def clear_messages(self):
        Message.clear(self.id)
        # self.messages.delete()

    def walk(self, direction_id):
        x, y = get_direction(direction_id)
        new_x = self.x + x
        new_y = self.y + y

        # can_go = Location.can_go(new_x, new_y)
        # const canGo = state.castleId
        #   ? castleService.canGo(state.castleId, x, y)
        #   : worldMapService.canGo(x, y)

        # if not can_go:
        #     self.message()
        #     return False

        self.message(direction_id)
        self.x = new_x
        self.y = new_y

        self.eat()
        return True

    def eat(self):
        self.food -= 0.5
