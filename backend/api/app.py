from anuvaad_auditor.loghandler import log_info
from anuvaad_auditor.loghandler import log_error
from flask import Flask
from flask.blueprints import Blueprint
from flask_cors import CORS
from src import routes

import config
import threading
import time

from src.utilities.app_context import LOG_WITHOUT_CONTEXT

flask_app = Flask(__name__)

if config.ENABLE_CORS:
    cors    = CORS(flask_app, resources={r"/api/*": {"origins": "*"}})

for blueprint in vars(routes).values():
    if isinstance(blueprint, Blueprint):
        flask_app.register_blueprint(blueprint, url_prefix=config.API_URL_PREFIX)

@flask_app.route(config.API_URL_PREFIX)
def info():
    return "Welcome to Dataset APIs"

if __name__ == "__main__":
    log_info("starting module", LOG_WITHOUT_CONTEXT)
    flask_app.run(host=config.HOST, port=config.PORT, debug=config.DEBUG)
