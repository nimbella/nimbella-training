# Invoking an action with parameters
nim action invoke Jedi -p event idle
nim action invoke Jedi -p event hit
nim action invoke Jedi -p event enemy-spot
nim action invoke Jedi -p event wall-collide

# invoking an action with json
echo '{ "event": "idle"}' >args.json
nim action invoke Jedi -P args.json
