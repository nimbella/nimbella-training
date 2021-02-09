# now a test succeed and another fails 
cp ../src/set.js packages/support/set.js
cp ../src/setget1.test.js packages/setget.test.js
# success
jest /setget
# fail
jest /get
