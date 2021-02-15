# Manual test on the repl
cd pygo/packages/default
python3 -X pycache_prefix=/tmp
from hellopy import *
main({})
# {'hello': 'world'}
main({"name":"Mike"})
# {'hello': 'Mike'}
# exit
cd ../../..
