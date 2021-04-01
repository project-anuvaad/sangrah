import config
import datetime
import os
import uuid

from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from anuvaad_auditor.loghandler import log_info, log_exception
from src.models import DatasetModel

class DatasetRepo(object):
    def __init__(self):
        self.datasetModel       = DatasetModel()

    def store(self, type, dataset):
        