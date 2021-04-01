from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from src.models.enums.app_enums import STAGE, CORPUS_TYPE

import uuid
import  datetime

class Dataset(object):
    def __init__(self):
        self.datasetId      = str(uuid.uuid4)
        self.stage          = STAGE.SUBMITTED
        self.count          = None
        self.description    = None

        self.submitter      = None
        self.contributors   = None

        self.collection_sources = None
        self.domain             = None
        self.collection_method  = None
        self.license            = None

        self.publishedOn        = datetime.datetime.utcnow()
        self.submittedOn        = datetime.datetime.utcnow()
        self.validatedOn        = datetime.datetime.utcnow()

        self.validationSchema   = None
        self.hosting            = None


class ParallelDataset(Dataset):
    def __init__(self):
        self.type               = CORPUS_TYPE.PARALLEL_CORPUS
        self.languagePairs      = None
        self.targetValidated    = None
        self.alignmentMethod    = None

        super().__init__()

    def mandatory_params(self, data):
        keys    = ['count', 'submitter', 'contributors', 'languagePairs', 'collectionSource', 'domain', \
            'collectionMethod', 'license', 'validationSchema', 'hosting']
        for key in keys:
            if key not in data.keys():
                return False, key
        return True, None
    

    def validate(self, data):
        status, key = self.mandatory_params(data)
        return status, key
