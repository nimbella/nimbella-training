# create two actions with different prefixes
nim trigger create slacker
nim action update slack/first notify2.js -p prefix '[first] '
nim rule create slacker-first slacker slack/first
nim rule enable slacker-first
nim trigger fire slacker -p text from-trigger-1
