from .db import Record
from.races import Race
from.sexes import Sex
from.classes import CharacterClass

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
    def characterClass(self):
        return CharacterClass.get_record(self.class_id)

    def as_dict(self):
        if self.race:
            race = self.race.as_dict()
        else:
            race = None

        if self.sex:
            sex = self.sex.as_dict()
        else:
            sex = None

        if self.characterClass:
            characterClass = self.characterClass.as_dict()
        else:
            characterClass = None

        return {
            'id': self.id,
            'name': self.name,

            'strength': self.strength,
            'agility': self.agility,
            'stamina': self.stamina,
            'charisma': self.charisma,
            'wisdom': self.wisdom,
            'intelligence': self.intelligence,

            'race': race,
            'sex': sex,
            'class': characterClass,

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
