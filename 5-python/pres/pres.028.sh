## Test and Deploy resize
# in a folder outside of packages
mkdir -p py/resize
cp src/resize.py py/resize/__main__.py
cp src/hello.png py/resize/hello.png
# let's zip by ourselves
cd py/resize
zip -r ../packages/default/resize.python-3.zip *
cd ../..
nim project deploy py
nim action get resize --url
# error!
nim activation logs
# missing module
