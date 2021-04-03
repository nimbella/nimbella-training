# Invoking an action with parameters
nim action invoke hello 
nim action invoke hello -p name Mike

# invoking an action with json
echo '{ "name": "Nimble"}' >args.json
nim action invoke hello -P args.json
