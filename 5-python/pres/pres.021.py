# bucket.py
import nimbella
def main(args):
    name = args.get("name", "")
    data = args.get("data", "")
    try:
        bucket = nimbella.storage()
        print(bucket)
        blob = bucket.blob(name)
        blob.upload_from_string(data)
        print(blob)
        return { "result": "ok" }
    except Exception as e:
        return { "error": str(e)}
