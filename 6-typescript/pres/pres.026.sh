# Test the actions set/get/del
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/get -p name Michele
nim action invoke addr/del -p name Michele
nim action invoke addr/get -p name Michele
