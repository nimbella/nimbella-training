## Deployment and Test Online
nim project deploy .
nim action invoke support/get -p key hello
nim action invoke support/set -p key hello -p value world
nim action invoke support/get -p key hello
nim action invoke support/del -p key hello
nim action invoke support/get -p key hello
# can be automated too
