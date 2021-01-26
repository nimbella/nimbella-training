# Test `helloweb.js` with `--web=true`
nim action update helloweb src/helloweb.js --web=true
nim action get helloweb --url 
URL=$(nim action get helloweb --url)
curl $URL
# GET url-encoded parameters
curl "$URL?name=Mike"
# POST url-encoded parameters
curl -X POST -d "name=Mike" -H "Content-Type: application/x-www-form-urlencoded"  "$URL"
# PUT with JSON parameters
curl -X PUT -d '{"name": "Mike"}' -H 'Content-type: application/json' $URL
