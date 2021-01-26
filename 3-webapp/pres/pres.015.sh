ECHO='function main(args) { return { "body": args } }'
echo $ECHO
nim action update echo <(echo $ECHO) --kind nodejs:default --web=true
URL=$(nim action get echo --url)
curl $URL
# get with args
curl "$URL?a=1&b=2"
# post with form data
FORM='Content-Type: application/x-www-form-urlencoded'
curl -H "$FORM" -X POST -d 'a=1&b=2' $URL
# PUT with json and extra path
JSON='Content-Type: application/json'
curl -H "$JSON" -X PUT -d '{"a":1,"b":2}' $URL/extra/path
