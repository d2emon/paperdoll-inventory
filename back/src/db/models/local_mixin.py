from app import db


class LocalMixin:
    x = db.Column(db.Integer)
    y = db.Column(db.Integer)
