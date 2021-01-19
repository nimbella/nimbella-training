# setup address project
mkdir -p address/packages/addr
cp src/set1.js address/packages/addr/set.js
cp src/get1.js address/packages/addr/get.js
nim auth current
nim project deploy address
