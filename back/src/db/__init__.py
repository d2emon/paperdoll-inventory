def init_db(db):
    if len(db.metadata.tables.keys()) <= 0:
        from .models.pcs import Pc, Race, CharacterClass, Sex
        from .models.messages import Message
        from .models.locations import LocationType, Location
        from .models.castles import Castle
    db.create_all()

    add_players(db)
    generate_world(db)
    generate_castles(db)


def add_players(db):
    from .fixtures.pcs import RACES, CLASSES, SEXES
    from .models.pcs import Pc, Race, CharacterClass, Sex

    for race in RACES:
        db.session.add(Race(race))

    for character_class in CLASSES:
        db.session.add(CharacterClass(character_class))

    for sex in SEXES:
        db.session.add(Sex(sex))
    db.session.commit()

    kikoskia = Pc(
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
    db.session.add(kikoskia)
    db.session.commit()


def generate_world(db):
    from .fixtures.locations import LOCATION_TYPES, PASSABLE, WORLD_MAP
    from .models.locations import LocationType, Location

    for location_id, name in enumerate(LOCATION_TYPES):
        passable = PASSABLE.get(location_id, True)
        db.session.add(LocationType(
            name=name,
            image_id=location_id + 1,
            passable=passable
        ))
    db.session.commit()

    for y, row in enumerate(WORLD_MAP):
        for x, location_type_id in enumerate(row):
            db.session.add(Location(
                x=x,
                y=y,
                location_type_id=location_type_id + 1,
            ))
    db.session.commit()


def generate_castles(db):
    from .fixtures.castles import CASTLES
    from .models.castles import Castle

    for castle_data in CASTLES:
        castle = Castle(**castle_data)

        castle_map = castle_data.get('castle_map', [[]])
        for x, row in enumerate(castle_map):
            for y, location_type_id in enumerate(row):
                if not location_type_id:
                    continue
                # print(location_type_id)
                # CastleLocation(
                #     castle_id=castle.id,
                #     x=x,
                #     y=y,
                #     location_type_id=location_type_id
                # ).save()
        db.session.add(castle)
    db.session.commit()
