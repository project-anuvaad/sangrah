#import logging
import os
import time

DEBUG           = False
API_URL_PREFIX  = "/sangrah/api"
HOST            = '0.0.0.0'
PORT            = 5001
BASE_DIR        = 'upload'
download_folder = 'upload'
ENABLE_CORS     = False

# mongodb
MONGO_DB_SCHEMA         = os.environ.get('MONGO_CH_DB', 'annotation')
MONGO_CONNECTION_URL    = os.environ.get('MONGO_CLUSTER_URL', 'mongodb://localhost:27017')