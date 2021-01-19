# testing get/set
## set then get
nim action invoke addr/set -p key hello -p value world
nim action invoke addr/get -p key hello
nim action invoke addr/get -p key hi
# change value
nim action invoke addr/set -p key hello -p value earth
nim action invoke addr/get -p key hello
