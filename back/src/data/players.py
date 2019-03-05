from .db import Record
from .classes import CharacterClass
from .locations import Location
from .messages import Message
from .races import Race
from .sexes import Sex

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


class Player(Record):
    RECORDS = []

    def __init__(self, **fields):
        super().__init__(**fields)
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

    @property
    def race(self):
        return Race.get_record(self.race_id)

    @property
    def sex(self):
        return Sex.get_record(self.sex_id)

    @property
    def character_class(self):
        return CharacterClass.get_record(self.class_id)

    @property
    def messages(self):
        return Message.by_player(self.id)

    def clear_messages(self):
        for record in self.messages:
            Message.delete_record(record.id)

    def walk(self, direction_id):
        x, y = get_direction(direction_id)
        new_x = self.x + x
        new_y = self.y + y

        can_go = Location.can_go(new_x, new_y)
        # const canGo = state.castleId
        #   ? castleService.canGo(state.castleId, x, y)
        #   : worldMapService.canGo(x, y)

        if not can_go:
            self.message()
            return False

        self.message(direction_id)
        self.x = new_x
        self.y = new_y

        self.eat()
        return True

    def eat(self):
        self.food -= 0.5

    def message(self, text="Huh?"):
        message = Message(player_id=self.id, text=text)
        message.save()
        return message

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

            'race': self.serialize_field(self.race),
            'sex': self.serialize_field(self.sex),
            'class': self.serialize_field(self.character_class),

            'hp': self.hp,
            'food': int(self.food),
            'xp': self.xp,
            'coin': self.coin,

            'position': {
                'x': self.x,
                'y': self.y,
            },
        }


Kikoskia = Player(
    name='Kikoskia',

    strength=25,
    agility=20,
    stamina=15,

    race_id=1,
    sex_id=1,
    class_id=1,

    x=9,
    y=4,
)
Kikoskia.save()
