# Test Bucket Creation in Python
cp src/bucket.py py/packages/default/bucket.py
nim project deploy py
nim object list
nim action invoke bucket -p name hello -p data world
nim activation logs
nim object list
nim object get hello .
cat hello
