from flask_restplus import fields
from . import ns

MessageModel = ns.model('Message', {
    'text': fields.String,
})
