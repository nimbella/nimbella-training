# deploy web content
find encoder
mkdir -p encoder/web
cp src/index.html encoder/web
cp src/index.js encoder/web
nim project deploy encoder
