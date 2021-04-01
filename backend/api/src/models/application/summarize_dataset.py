from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from src.models.enums.app_enums import STAGE, CORPUS_TYPE

import uuid
import datetime

class SummarizeDataset(object):
    def create(self, dataset, tags):
        self.datasetId      = dataset['datasetId']
        self.tags           = tags
        self.count          = dataset['count']

        return {
            'datasetId': self.datasetId,
            'tags': self.tags,
            'count': self.count
        }
    