# Using Curl  for web actions

URL=$(nim action get Jedi --url)
echo $URL

# use GET and url parameters

curl "$URL?event=hit"

## use POST and form data (url-encoded)

curl -X POST -d event=enemy-spot "$URL"
