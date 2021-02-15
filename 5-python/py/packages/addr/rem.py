import nimbella
def main(args):
    db = nimbella.redis()
    key = "address:"+args.get("name", "")
    return { "body": db.delete(key) }
