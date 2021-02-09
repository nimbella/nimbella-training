# running tests with jest
mkdir -p packages/support/hello
cp ../src/.ignore packages/support/hello/.ignore
cp ../src/hello.js packages/support/hello/index.js
cp ../src/hello.test.js packages/support/hello/index.test.js
jest
# deploy and test "live"
nim project deploy .
nim action invoke support/hello
nim action invoke support/hello -p name Mike
