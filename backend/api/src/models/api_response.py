
from flask import jsonify

class APIResponse :
    def __init__(self, statuscode, data):
        self.statuscode = statuscode
        self.statuscode['data']     = data
    
    def getres(self):
        return jsonify(self.statuscode)

    def getresjson(self):
        return self.statuscode
