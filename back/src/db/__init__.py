def init_db(db):
    if len(db.metadata.tables.keys()) <= 0:
        from .models.messages import Message
        from .models.locations import LocationType, Location
        from .models.castles import Castle
        from .models.npcs import Npc
        from .models.weapons import Weapon
        from .models.pcs import Pc, Race, CharacterClass, Sex
    db.create_all()

    generate_locations(db)
    generate_castle_locations(db)
    generate_npcs(db)

    generate_world(db)
    generate_castles(db)

    add_players(db)


def add_players(db):
    from .fixtures.pcs import RACES, CLASSES, SEXES
    from .fixtures.weapons import WEAPONS
    from .models.pcs import Pc, Race, CharacterClass, Sex
    from .models.weapons import Weapon

    for race in RACES:
        db.session.add(Race(race))

    for character_class in CLASSES:
        db.session.add(CharacterClass(character_class))

    for sex in SEXES:
        db.session.add(Sex(sex))

    for weapon in WEAPONS:
        db.session.add(Weapon(name=weapon))
    db.session.commit()

    kikoskia = Pc(
        name='Kikoskia',

        strength=25,
        agility=20,
        stamina=15,

        race_id=1,
        sex_id=1,
        class_id=1,

        x=0,
        y=9,

        castle_id=1,
    )

    db.session.add(kikoskia)
    db.session.commit()


def generate_locations(db):
    from .fixtures.locations import LOCATION_TYPES, PASSABLE
    from .models.locations import LocationType

    for location_id, name in enumerate(LOCATION_TYPES):
        passable = PASSABLE.get(location_id, True)
        db.session.add(LocationType(
            name=name,
            image_id=location_id + 1,
            passable=passable
        ))
    db.session.commit()


def generate_castle_locations(db):
    from .fixtures.castles import LOCATION_TYPES, CASTLES
    from .models.castles import CastleLocationType

    for location_id, name in enumerate(LOCATION_TYPES):
        passable = False
        db.session.add(CastleLocationType(
            name=name,
            image_id=location_id + 1,
            passable=passable,
        ))
    db.session.commit()


def generate_npcs(db):
    from .fixtures.npcs import NPC_TYPES, WALKING
    from .models.npcs import NpcType

    for npc_id, name in enumerate(NPC_TYPES):
        walking = WALKING.get(npc_id + 1, False)
        db.session.add(NpcType(
            name=name,
            image_id=npc_id + 1,
            walking=walking,
        ))
    db.session.commit()


def generate_world(db):
    from .fixtures.locations import WORLD_MAP
    from .models.locations import Location, GameMap

    game_map = GameMap()
    db.session.add(game_map)
    db.session.commit()

    for y, row in enumerate(WORLD_MAP):
        for x, location_type_id in enumerate(row):
            db.session.add(Location(
                map_id=game_map.id,
                x=x,
                y=y,
                location_type_id=location_type_id + 1,
            ))
    db.session.commit()


def generate_castle(db, castle_data, is_city):
    from .models.castles import CastleLocation, Castle
    from .models.npcs import Npc

    castle = Castle(is_city=is_city, **castle_data)
    db.session.add(castle)
    db.session.commit()

    npcs = castle_data.get('characters', [])
    for npc_data in npcs:
        npc = Npc(
            castle_id=castle.id,
            **npc_data
        )
        db.session.add(npc)
    db.session.commit()

    castle_map = castle_data.get('castle_map', [[]])
    for y, row in enumerate(castle_map):
        for x, location_type_id in enumerate(row):
            if not location_type_id:
                continue
            db.session.add(CastleLocation(
                castle_id=castle.id,
                x=x,
                y=y,
                location_type_id=location_type_id
            ))
    db.session.commit()


def generate_castles(db):
    from .fixtures.castles import CASTLES
    from .fixtures.cities import CITIES

    for castle_data in CASTLES:
        generate_castle(db, castle_data, False)

    for city_data in CITIES:
        generate_castle(db, city_data, False)
