import base64, os, io
from PIL import Image 
def main(args):
    file = "%s/%s" % (os.path.dirname(__file__), "hello.png")
    img = Image.open(file) # read image
    w = int(args.get("w", "100")) # new width
    ratio = img.size[1] / img.size[0]
    h = int(ratio * w) # new height
    res = img.resize((w,h), Image.ANTIALIAS)
    buf = io.BytesIO()
    res.save(buf, format="PNG") # save image in a buffer
    return { # encode base64 after decoding buffer as a string
        "body": base64.b64encode(buf.getvalue()).decode("utf-8"),
        "headers": { "Content-Type": "image/png" }
    }
