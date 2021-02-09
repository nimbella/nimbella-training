# Fixture fixes all tests
cp ../src/del.js packages/support/del.js
cp ../src/get.test2.js packages/get.test.js
# checking
jest /get
# checking all
jest
