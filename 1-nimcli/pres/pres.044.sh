nim action update slack/second notify2.js -p prefix '[second] '
nim rule create slacker-second slacker slack/second
nim rule enable slacker-second
nim trigger fire slacker -p text from-trigger-2
nim rule disable slacker-first
nim trigger fire slacker -p text from-trigger-3
