# Deploy fixed actions
mkdir -p address/packages/addr
cp src/set.js address/packages/addr/set.js
cp src/get.js address/packages/addr/get.js
cp src/del.js address/packages/addr/del.js
find address
nim project deploy address
