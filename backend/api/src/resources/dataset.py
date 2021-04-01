from flask_restful import fields, marshal_with, reqparse, Resource
from anuvaad_auditor.loghandler import log_info, log_exception
from flask import request
from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from src.models.application.dataset import ParallelDataset as AppParallelDataset
from src.models.api_response import APIResponse
from src.models.api_status import APIStatus
from src.repositories import DatasetRepo

datasetRepo     = DatasetRepo()

class ParallelCorpusCreateResource(Resource):
    def post(self):
        body        = request.get_json()

        appParallelCorpusObj    = AppParallelDataset()
        status, result          = appParallelCorpusObj.get_validated_dataset(body)
        if status == False:
            log_info('Missing params in ParallelCorpusCreateResource {} missing: {}'.format(body, key), LOG_WITHOUT_CONTEXT)
            res = APIResponse(APIStatus.ERR_GLOBAL_MISSING_PARAMETERS.value, None)
            return res.getresjson(), 400
        

        search_result = {}
        try:
            search_result   = datasetRepo.store_parallel_corpus_dataset(result)
            tags            = appParallelCorpusObj.get_tags(body)
            log_info('dataset tags {}'.format(tags), LOG_WITHOUT_CONTEXT)

        except Exception as e:
            log_exception("Exception at ParallelCorpusCreateResource ", LOG_WITHOUT_CONTEXT, e)
            res = APIResponse(APIStatus.ERR_GLOBAL_MISSING_PARAMETERS.value, None)
            return res.getresjson(), 400

        res = APIResponse(APIStatus.SUCCESS.value, search_result)
        return res.getres()