import base64, os

def main(args):
    file = "%s/%s" % (os.path.dirname(__file__), "hello.png")
    with open(file, "rb") as f:
        img = f.read()
    return { 
        "body": base64.b64encode(img).decode("utf-8"),
        "headers": {
            "Content-Type": "image/png"
        }
    }
