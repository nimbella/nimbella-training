# notifications
nim package update slack -p notifications $NOTIFICATIONS
nim action update slack/notify notify.js
nim action invoke slack/notify -p text hello
nim action invoke slack/notify -p text hi
