# deploy the scanall action
cp ../src/scanall.js packages/support
nim project deploy .
nim action invoke support/scanall
nim action invoke support/scanall -p "match" "h*"
nim action invoke support/scanall -p "match" "m*"
