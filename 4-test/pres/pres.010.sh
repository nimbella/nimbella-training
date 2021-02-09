## Importing some values
# url to faas wars robot list
URL=https://apigcp.nimbella.io/api/v1/web/nimbots/rumble/public 
# getting the list
curl $URL >nimbots.json
cat nimbots.json
# extracting values
jq -r '.[]|" \(.name) \(.url)"'  <nimbots.json >nimbots.txt
cat nimbots.txt
# storing in redis online 
nim kv clean
xargs -L1 nim kv set <nimbots.txt
nim kv list
