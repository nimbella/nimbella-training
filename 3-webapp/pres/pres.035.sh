# test download
cat src/index1.html 
# <img src="/api/default/download">
cp src/download.js sample/packages/default/download.js
mkdir -p sample/web
cp src/favicon.ico sample/web/favicon.ico
cp src/index1.html sample/web/index.html
nim project deploy sample --incremental
URL=$(nim action get download --url)
curl -v $URL 2>&1 | grep location
# open browser
URL=$(nim action get upload --url)
PUT=$(curl $URL)
curl  -X PUT  -H 'Content-Type: image/png' --data-binary @src/sample2.png $PUT

