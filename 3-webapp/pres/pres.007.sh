# Exploring `--web=false`
nim action update hello src/hello.js --web=false
nim action get hello --url
# unauthorized access
URL=$(nim action get hello --url)
curl $URL
# invoking action 
AUTH=$(nim auth current --auth)
# not shown
curl -X POST -u $AUTH "$URL?blocking=true" | jq .
# API invocation showing result
curl -X POST -u $AUTH "$URL?blocking=true" | jq .response.result
# complete invocation with args!!!
curl -X POST -H "Content-Type: application/json" -d '{"name": "Mike"}' -u $AUTH "$URL?blocking=true" | jq .response.result
