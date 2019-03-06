from flask_restplus import fields
from . import api

MessageModel = api.model('Message', {
    'text': fields.String,
})
