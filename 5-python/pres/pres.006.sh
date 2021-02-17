## Local Testing
# deploy hello
mkdir -p py/packages/default
cp src/hellopy.py py/packages/default/hellopy.py

# Manual test on the repl
PYTHONPATH=py/packages/default PYTHONDONTWRITEBYTECODE=1 python3
from hellopy import *

main({})
# {'hello': 'world'}

main({"name":"Mike"})
# {'hello': 'Mike'}

# exit
