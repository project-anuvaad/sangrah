from src.utilities.app_context import LOG_WITHOUT_CONTEXT
from src.utilities.pymongo_data_handling import normalize_bson_to_json

from src.db import get_db
from anuvaad_auditor.loghandler import log_info, log_exception
import pymongo

DB_SCHEMA_NAME  = 'summary_dataset'
# tag_mapping = {'languagePairs':1, 'collectionSource':3, 'domain':4, 'collectionMethod':5}

language_extension = {'pu':'Punjabi', 
                      'be':'Bengali',
                      'en':'English',
                      'ta':'Tamil', 
                      'ml':'Malyalam', 
                      'te':'Telugu', 
                      'ka':'Kannada', 
                      'hi':'Hindi', 
                      'ma':'Marathi',
                      'gu':'Gujarathi',
                      'as':'Assamese'}

def get_key(val, lang_dict):
    for key, value in lang_dict.items():
         if val == value:
             return key

class SummarizeDatasetModel(object):
    def __init__(self):
        collections = get_db()[DB_SCHEMA_NAME]
        try:
            collections.create_index('datasetId')
        except pymongo.errors.DuplicateKeyError as e:
            log_info("duplicate key, ignoring", LOG_WITHOUT_CONTEXT)
        except Exception as e:
            log_exception("db connection exception ",  LOG_WITHOUT_CONTEXT, e)

    def store(self, dataset):
        try:
            collections = get_db()[DB_SCHEMA_NAME]
            result     = collections.insert_one(dataset)
            if result != None and result.acknowledged == True:
                return True
        except Exception as e:
            log_exception("db connection exception ",  LOG_WITHOUT_CONTEXT, e)
            return False

    # def generate_grouping_query(self, group_param):
    #     group_query = {}
    #     tag_index = tag_mapping[group_param['value']]
    #     group_query['$group'] = {"_id": {"$arrayElemAt": ["$tags", tag_index]}, "num_parallel_sentences": {"$sum": "$count"}}
    #     return group_query
    
    def generate_match_query(self, criterions):
        match_query = {}
        match_params = []
        for criteria in criterions:
            if 'value' not in criteria.keys():
                src_lang = get_key(criteria['sourceLanguage']['value'], language_extension)
                tar_lang = get_key(criteria['targetLanguage']['value'], language_extension)
                match_param = src_lang + '-' + tar_lang
            else:
                match_param = criteria['value']
            match_params.append({"$in": [match_param, "$tags"]})
        
        match_query['$match'] = {"$expr": {"$and": match_params}}
        return match_query

    def search(self, dataset):
        # aggregate_query = []
        # aggregate_query.append(self.generate_match_query(dataset['criterions']))
        # aggregate_query.append(self.generate_grouping_query(dataset['groupby']))

        # try:
        #     corpus_stats = []
        #     collections = get_db()[DB_SCHEMA_NAME]
        #     docs = collections.aggregate(aggregate_query)
        #     for doc in docs:
        #         corpus_stats.append(normalize_bson_to_json(doc))
        #     return corpus_stats
        # except Exception as e:
        #     log_exception("db connection exception ",  LOG_WITHOUT_CONTEXT, e)
        #     return []
        try:
            language_extend = False
            corpus_stats = []
            aggregate_query = []
            if dataset['criterions'] != []:
                aggregate_query.append(self.generate_match_query(dataset['criterions']))
            collections = get_db()['dataset']
            unique_set = set()
            if dataset['groupby']['value'] == 'languagePairs':
                unique_values = collections.find().distinct('languagePairs')
                unique_list = []
                for unique in unique_values:
                    unique_list.append(unique['sourceLanguage']['value'] + '-' + unique['targetLanguage']['value'])
                unique_set.update(unique_list)
                language_extend = True
            elif dataset['groupby']['value'] == 'source':
                unique_values = collections.find().distinct('collectionSource')
                for unique in unique_values:
                    unique_set.update(unique['value'])
            elif dataset['groupby']['value'] == 'domain':
                unique_values = collections.find().distinct('domain')
                for unique in unique_values:
                    unique_set.update(unique['value'])
            else:
                return []
        # print(unique_set)
            collections = get_db()['summary_dataset']
            for i in unique_set:
                aggregate_query.append({"$match":{"$expr":{"$in": [i, "$tags"]}}})
                aggregate_query.append({"$group":{"_id":i, "value":{"$sum":"$count"}}})
                docs = collections.aggregate(aggregate_query)
                for doc in docs:
                    json_doc = normalize_bson_to_json(doc)
                    if language_extend == True:
                        lang = json_doc['_id'].split('-')[1]
                        json_doc['_id'] = language_extension[lang]
                    json_doc['label'] = json_doc['_id']
                    corpus_stats.append(json_doc)
                aggregate_query.pop()
                aggregate_query.pop()
            return corpus_stats
        except Exception as e:
            log_exception("db connection exception ",  LOG_WITHOUT_CONTEXT, e)
            return []