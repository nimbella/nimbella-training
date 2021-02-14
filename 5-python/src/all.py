import nimbella
import json

def main(args):
    db = nimbella.redis()
    keys = db.keys("address:*")
    data = db.mget(keys)
    return { 
        "body": [json.loads(i.decode('utf-8')) for i in data]
    }
