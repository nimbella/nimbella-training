# install and run local server
npm install -g http-server
http-server encoder/web --proxy https://$(nim auth current)-apigcp.nimbella.io
# in another terminal
vi encoder/web/index.html
