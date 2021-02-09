# Testing Scan
cd support
mkdir packages/support
cp ../src/scan.js packages/support/scan.js
nim project deploy .
nim action invoke support/scan 
nim action invoke support/scan  -p cursor 20
nim action invoke support/scan  -p cursor 50
nim action invoke support/scan  -p cursor 110
nim action invoke support/scan  -p cursor 81
nim action invoke support/scan  -p cursor 121
nim action invoke support/scan  -p cursor 75
nim action invoke support/scan  -p cursor 63
