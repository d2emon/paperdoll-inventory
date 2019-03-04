import os


class Config:
    FLASK_ENV = os.getenv('FLASK_ENV', 'production')
    SECRET_KEY = os.getenv('FLASK_SECRET', 'MySecretKey')

    APP_DIR = os.path.dirname(__file__)
    ROOT_DIR = os.path.dirname(APP_DIR)
    DIST_DIR = os.path.join(ROOT_DIR, 'dist')

    # if not os.path.exists(DIST_DIR):
    #     raise Exception("DIST_DIR not found: {}".format(DIST_DIR))
