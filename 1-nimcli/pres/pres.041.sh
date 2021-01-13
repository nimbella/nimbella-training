# inspecting trigger invocation
nim trigger create echoer
nim action create echo echo.js
nim rule create echoer-echo echoer echo
nim trigger fire echoer -p hello world
nim activation logs
nim activation result
