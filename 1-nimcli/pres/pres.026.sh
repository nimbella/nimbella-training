# create package with 2 actions
nim package list
nim action list
nim package create greetings
nim action create greetings/hello hello.js
nim action create greetings/hi hi.js
# check and clean
nim package list
nim action list
nim package delete greetings
nim package delete greetings -r
nim package list
nim action list
