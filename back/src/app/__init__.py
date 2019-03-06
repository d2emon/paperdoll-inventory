import os
import requests
from flask import Flask, current_app, send_file
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .config import Config
from db import init_db

app = Flask(
    __name__,
    static_folder="../paperdoll-inventory/public",
    template_folder="../paperdoll-inventory",
)

app.config.from_object('app.config.Config')

if app.debug:
    app.logger.info('Config: {}'.format(app.config))

cors = CORS(
    app,
    resources={r"/api/*": {"origins": "*"}}
)
db = SQLAlchemy(app)

init_db(db)

from .api import api
from .api.player import player_api
from .api.messages import messages_api

app.register_blueprint(api)
app.register_blueprint(player_api)
app.register_blueprint(messages_api)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
    if current_app.config['FLASK_ENV'] == 'development':
        request = requests.get("http://localhost:8080/{}".format(path))
        return (
            request.content,
            request.status_code,
            request.headers.items()
        )

    dist_dir = current_app.config['DIST_DIR']
    entry = os.path.join(dist_dir, 'index.html')
    # return app.send_static_file("index.html")
    # return render_template("index.html")
    # return send_from_directory(dist_dir, path)
    return send_file(entry)


if __name__ == '__main__':
    app.run()
