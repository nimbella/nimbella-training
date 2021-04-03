nim kv clean
nim action invoke addr/crud -p op all
nim action invoke addr/crud -p op set -p name Michele -p company Nimbella -p phone 392
nim action invoke addr/crud -p op get -p name Michele
nim action invoke addr/crud -p op set -p name Mirella -p company Butterfly -p phone 328
nim action invoke addr/crud -p op all
nim action invoke addr/crud -p op del -p name Michele
nim action invoke addr/crud -p op all
