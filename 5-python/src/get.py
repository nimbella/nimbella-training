import nimbella
import json

def main(args):
    db = nimbella.redis()
    key = "address:"+args.get("name", "")
    value = db.get(key).decode('utf-8')
    return { "body": json.loads(value) }
