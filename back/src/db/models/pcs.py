from flask import abort
from app import db
from .messages import Message
from .castles import Castle
from .weapons import Weapon


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


class NamedMixin:
    name = db.Column(db.String(16))

    def __init__(self, name=''):
        self.name = name

    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
        }


class Race(NamedMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)


class CharacterClass(NamedMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)


class Sex(NamedMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)


pc_weapons_table = db.Table(
    'pc_weapons',
    db.metadata,
    db.Column('pc_id', db.Integer, db.ForeignKey('pc.id')),
    db.Column('weapon_id', db.Integer, db.ForeignKey('weapon.id')),
)


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

    active_weapon = db.Column(db.Integer, default=0)

    race_id = db.Column(db.Integer, db.ForeignKey('race.id'))
    race = db.relationship('Race')

    sex_id = db.Column(db.Integer, db.ForeignKey('sex.id'))
    sex = db.relationship('Sex')

    class_id = db.Column(db.Integer, db.ForeignKey('character_class.id'))
    character_class = db.relationship('CharacterClass')

    map_id = db.Column(db.Integer, db.ForeignKey('game_map.id'))
    game_map = db.relationship('GameMap')

    castle_id = db.Column(db.Integer, db.ForeignKey('castle.id'))
    castle = db.relationship('Castle')

    weapons = db.relationship('Weapon', secondary=pc_weapons_table)

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

        self.active_weapon = fields.get('active_weapon', 0)

        self.map_id = fields.get('map_id', 1)
        self.castle_id = fields.get('castle_id')

        dagger = Weapon.query.get(1)
        self.weapons.append(dagger)

    @classmethod
    def get_or_404(cls, character_id):
        pc = cls.query.get(character_id)
        if pc is None:
            abort(404, "Character #{} doesn't exists".format(character_id))
        return pc

    def save(self):
        db.session.add(self)
        db.session.commit()
        return True

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

    @property
    def actual_map(self):
        if self.castle:
            return self.castle
        return self.game_map

    @property
    def nesw(self):
        actual_map = self.actual_map
        return {
            'n': actual_map.child_by_coords(self.x, self.y - 1).first(),
            'e': actual_map.child_by_coords(self.x + 1, self.y).first(),
            's': actual_map.child_by_coords(self.x, self.y + 1).first(),
            'w': actual_map.child_by_coords(self.x - 1, self.y).first(),
        }

    @property
    def transactables(self):
        actual_map = self.actual_map
        return list(filter(lambda item: item is not None, [
            actual_map.characters_by_coords(self.x, self.y - 1).first(),
            actual_map.characters_by_coords(self.x + 1, self.y).first(),
            actual_map.characters_by_coords(self.x, self.y + 1).first(),
            actual_map.characters_by_coords(self.x - 1, self.y).first(),
        ]))

    def walk(self, direction_id):
        x, y = get_direction(direction_id)
        new_x = self.x + x
        new_y = self.y + y

        can_go = self.actual_map.child_can_go(new_x, new_y)

        if not can_go:
            self.message()
            return False

        self.message(direction_id)
        self.x = new_x
        self.y = new_y

        self.save()

        self.actual_map.next_step(self)
        return self.save()

    def eat(self):
        self.food -= 0.5

    def drop(self, **kwargs):
        if self.castle is None:
            self.message()
            return False

        ponds = list(filter(lambda item: item and item.location_type.is_pond, self.nesw.values()))
        if len(ponds) <= 0:
            self.message()
            return False

        coins = kwargs.get('coins')
        weapon = kwargs.get('weapon')
        armor = kwargs.get('armor')
        miracle = 0
        if coins:
            self.coin = max(0, self.coin - coins)
            self.message("Drop Pence: {}".format(coins))
            miracle = coins
        if weapon:
            self.message("Drop Weapon: {}".format(weapon))
            miracle = weapon
        if armor:
            self.message("Drop Armor: {}".format(armor))
            miracle = armor

        if miracle > 0:
            prise = Weapon.get_random()
            self.weapons.append(prise)

            db.session.add(self)
            db.session.commit()
            self.message("Shazam!")
            return True

        self.message('Drop Pence, Weapon, Armor')
        return False

    def ready(self, **kwargs):
        weapon = kwargs.get('weapon')
        armor = kwargs.get('armor')
        spell = kwargs.get('spell')
        if weapon:
            # self.message("Drop Weapon: {}".format(weapon))
            self.active_weapon = weapon
        if armor:
            # self.message("Drop Armor: {}".format(armor))
            self.active_weapon = armor
        if spell:
            # self.message("Drop Armor: {}".format(armor))
            self.active_weapon = spell
        db.session.add(self)
        db.session.commit()

        self.message('Ready Weapon, Armor, Spell')
        return False

    def enter_castle(self, castle_id):
        castle = Castle.query.get(castle_id)

        if castle is None:
            self.message()
            return False

        self.message("Entering... <br />{}".format(castle.name))

        self.x = castle.entrance_x
        self.y = castle.entrance_y
        self.castle = castle

        return self.save()

    def exit_castle(self):
        self.message("Exiting...")

        # castle_id = request.form.get('castle')
        # castle = Castle.get_or_404(castle_id)

        castle = self.castle
        if castle is None:
            return False

        self.x = castle.x
        self.y = castle.y
        self.castle = None

        return self.save()
