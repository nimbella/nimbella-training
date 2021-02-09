# setup a local redis
docker kill redis
docker run --name redis --rm -p 6379:6379 -d redis --requirepass password
# setup nimbella sdk
mkdir -p support/packages
cd support
npm install @nimbella/sdk
# connect the nimbella SDK to the local redis
export __NIM_REDIS_IP=127.0.0.1
export __NIM_REDIS_PASSWORD=password
# connecting to local redis
node --experimental-repl-await
let rd = require("@nimbella/sdk").redis()
rd.ready
