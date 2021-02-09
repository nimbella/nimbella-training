# get the tes
cp ../src/setgetdel.test.js packages/setgetdel.test.js
# run the test
jest
cat packages/__snapshots__/setgetdel.test.js.snap
# run it again
jest
# change something
cp ../src/get.js packages/support/set.js
jest
# fix
cp ../src/set.js packages/support/set.js
jest
