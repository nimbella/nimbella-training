# create package without variables
nim package create greetings
cat hello.js
nim action create greetings/hello hello.js
cat hi.js
nim action create greetings/hi hi.js

# no variables, default
nim action invoke greetings/hello
nim action invoke greetings/hi
