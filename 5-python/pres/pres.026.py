## Image Resize on REPL
# start python3
# load image
from PIL import Image
img = Image.open("src/hello.png")
img.size

# calculate new dimension
w = 150
ratio = img.size[1] / img.size[0]
h = int(ratio * w)

# resize image
img1 = img.resize((w,h), Image.ANTIALIAS)
img1.size
