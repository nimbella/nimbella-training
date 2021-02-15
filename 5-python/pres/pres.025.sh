## Deploy Multifile Action
mkdir -p py/packages/default/image
cp src/image.py py/packages/default/image/__main__.py
cp src/hello.png py/packages/default/image/hello.png
nim project deploy py
nim action get image --url
