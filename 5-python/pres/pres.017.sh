source init.src
mkdir py/packages/addr
cp -v src/{all,get,set,rem}.py py/packages/addr/
PYTHONDONTWRITEBYTECODE=1 PYTHONPATH=py/packages/addr python3
import set
set.main({"name":"Mike","company":"Nimbella","phone":"392"})
import get
get.main({"name":"Mike"})
import all
all.main({})
import rem
rem.main({"name":"Mike"})
all.main({})
