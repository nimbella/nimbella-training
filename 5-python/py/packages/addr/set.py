import nimbella
import json

def main(args):
    db = nimbella.redis()
    key = "address:"+args.get("name", "")
    value = json.dumps({
            "name": args.get("name", ""),
            "company":  args.get("company", ""),
            "phone": args.get("phone", "")
    })
    return { "body": db.set(key, value) }
