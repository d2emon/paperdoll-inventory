def init_db(db):
    if len(db.metadata.tables.keys()) <= 0:
        from .models.pcs import Pc, Race, CharacterClass, Sex
        from .models.messages import Message
    db.create_all()
    add_players(db)


def add_players(db):
    from .models.pcs import Pc, Race, CharacterClass, Sex
    db.session.add(Race("Human"))
    db.session.add(Race('Elf'))
    db.session.add(Race('Dwarf'))
    db.session.add(Race('Bobbit'))

    db.session.add(CharacterClass('Fighter'))
    db.session.add(CharacterClass('Cleric'))
    db.session.add(CharacterClass('Wizard'))
    db.session.add(CharacterClass('Thief'))

    db.session.add(Sex('Male'))
    db.session.add(Sex('Female'))

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
