import config
import datetime
import os
import uuid

from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from anuvaad_auditor.loghandler import log_info, log_exception
from src.models.db import DatasetModel as DBDataset
from src.models.enums.app_enums import CORPUS_TYPE

class DatasetRepo(object):
    def __init__(self):
        self.datasetModel       = DatasetModel()

    def store(self, type, dataset):
        pass

    def store_paralle_corpus(self, dataset):
        pass