# Deploy fixed actions
cp src/set2.js address/packages/addr/set.js
cp src/get2.js address/packages/addr/get.js
cp src/del.js address/packages/addr/del.js
find address
nim project deploy address
