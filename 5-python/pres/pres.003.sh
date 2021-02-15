# deploy hello
mkdir -p pygo/packages/default
#cp src/hello.py pygo/packages/default/hellopy.py
touch pygo/packages/default/hellopy.py
code -a pygo/packages/default
nim project deploy pygo

# test hello
nim action invoke hellopy
nim activation logs
nim action invoke hellopy -p name Mike
nim activation logs
