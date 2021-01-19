# enable ticker
nim trigger create ticker --feed /whisk-system/alarms/interval -p minutes 1
nim action update slack/tick tick.js
nim rule create ticker-tick ticker slack/tick
nim rule enable ticker-tick
