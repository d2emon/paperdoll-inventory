from .db import Record
from .classes import CharacterClass
from .messages import Message
from .races import Race
from .sexes import Sex

START_X = 18
START_Y = 6


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
        self.food = fields.get('food', 200)
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
            'food': self.food,
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
