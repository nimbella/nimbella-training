## Test and deploy our hello
cp src/hellopy2.py py/packages/default/hellopy.py

# testing (WITHOUT __pycache__)
PYTHONDONTWRITEBYTECODE=1 python3 py/packages/default/hellopy.py
# no news is a good news

# deploying
nim project deploy py
nim action invoke hellopy
nim activation logs
nim action invoke hellopy -p name Mike
nim activation logs
