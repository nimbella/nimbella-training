---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
---

![bg left:40% 80%](img/nimbella.png)

# **Lesson 5**

Python

https://www.nimbella.com


---
# Plan

- Creating Nimbella actions
  - using the REPL
  - doctests
- Nimbella support
  - Redis
  - Bucket
- Libraries
  - Virtualenv

---
# Hello in Python
```py
def main(args):
    name = args.get("name", "world")
    print("name:", name)
    return {
        "hello": name
    }
```
# live coding

---
```sh
# deploy hello
mkdir -p py/packages/default
cp src/hello.py py/packages/default/hellopy.py
#touch py/packages/default/hellopy.py
#code -a py/packages/default
nim project deploy py

# test hello
nim action invoke hellopy
nim activation logs
nim action invoke hellopy -p name Mike
nim activation logs
```

---
# <!--!--> Testing with the REPL
```sh
# Manual test on the repl
PYHONPATH=py/packages/default python3
from hellopy import *
main({})
# {'hello': 'world'}
main({"name":"Mike"})
# {'hello': 'Mike'}
# exit
```

---
#  Python doctest
```py
""" Test main
>>> main({})
{'hello': 'world'}
>>> main({"name":"Mike"})
{'hello': 'Mike'}
"""
```

## Invoke a doctest
```py
if __name__ == "__main__":
    import doctest
    doctest.testmod()
```

---
# Redis
...

---
# Test Redis Local
```sh
source init.src
mkdir py/packages/addr
cp -v src/{all,get,set,rem}.py py/packages/addr/
PYTHONPATH=py/packages/addr python3
import set
set.main({"name":"Mike","company":"Nimbella","phone":"392"})
import get
get.main({"name":"Mike"})
import all
all.main({})
import rem
rem.main({"name":""})
```

---
# Frontend

```sh
npx degit sveltejs/template py/web
cp src/App.svelte py/web/src/App.svelte
echo "public" >py/web/.include
echo -e "bucket:\n strip: 1" >py/project.yml
nim project deploy py
```

--- 
# Bucket
bucket.py

---
# Test Bucket in Python

```sh
cp src/bucket.py py/packages/default/bucket.py
nim project deploy py
nim object list
nim action invoke bucket -p name hello -p data world
nim activation logs
nim object list
nim object get hello .
cat hello
nim action invoke bucket 
```

---
image.py

---
```
mkdir -p py/packages/default/image
cp src/image.py py/packages/default/image/__main__.py
cp src/hello.png py/packages/default/image/hello.png
nim project deploy py
nim action get image --url
python3
```

---
```py
from PIL import Image
img = Image.open("src/hello.png")
img.size

w = 150
ratio = img.size[1] / img.size[0]
h = int(ratio * w)

img1 = img.resize((w,h), Image.ANTIALIAS)
img1.size
```

---
resize.py


---
```sh
mkdir -p py/resize
cp src/resize.py py/resize/__main__.py
cp src/hello.png py/resize/hello.png
cd py/resize
zip -r ../packages/default/resize.python-3.zip *
cd ../..
nim project deploy py
nim action get resize --url
# errore!
nim activation logs
```

---
```
# building a virtualenv with PIL
cd py/resize
ls
docker run -ti -v $PWD:/mnt --entrypoint=/bin/bash openwhisk/actionloop-python-v3.7
cd /mnt
virtualenv virtualenv
source virtualenv/bin/activate
which pip3
pip3 install Pillow
exit
zip -r ../packages/default/resize.python-3.zip *
cd ../..
```
---
```
ls py
nim project deploy py
nim action invoke resize
nim activation logs
```