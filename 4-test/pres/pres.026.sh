# simple get test
mkdir -p packages/support
cp ../src/get.js packages/support/get.js
# put tests for single file actions outside of folders
cp ../src/get.test.js packages/get.test.js
jest /get
