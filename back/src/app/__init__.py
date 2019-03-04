import os
import random
import requests

from flask import Flask, current_app, send_file
from flask_cors import CORS

from .config import Config

from .api import api

app = Flask(
    __name__,
    static_folder="../paperdoll-inventory/public",
    template_folder="../paperdoll-inventory",
)
cors = CORS(
    app,
    resources={r"/api/*": {"origins": "*"}}
)

app.register_blueprint(api)

app.config.from_object('app.config.Config')

if app.debug:
    app.logger.info('Mode: {}'.format(Config.FLASK_ENV))
    app.logger.info('Config: {}'.format(app.config))


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
