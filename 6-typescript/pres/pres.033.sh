## Create a TypeScript action
# prepare environment
mkdir -p address/packages/addr/hellots/src
cp src/hello.ts address/packages/addr/hellots/src/index.ts
# initializing 
cd address/packages/addr/hellots
npm -y init
tsc --init
# build
ls -la
tsc --outDir .
ls -la
echo "index.js" >.include
# deploy
cd ../../../..
nim project deploy address
nim action invoke addr/hellots
