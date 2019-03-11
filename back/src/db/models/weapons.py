from sqlalchemy.sql.expression import func
from app import db


class Weapon(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(32))

    @classmethod
    def get_random(cls):
        return cls.query.order_by(func.random()).first()
