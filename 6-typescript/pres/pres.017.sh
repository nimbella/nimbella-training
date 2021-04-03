# updating as a web action
nim action update hello src/hello.js --web=true

# Using Curl  for web actions
URL=$(nim action get hello --url)
echo $URL

# use GET and url parameters

curl "$URL?name=Mike"

## use POST and form data (url-encoded)
curl -X POST -d name=Mike "$URL"
