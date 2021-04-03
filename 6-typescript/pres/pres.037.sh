# copying configuration and files
cp src/hi.ts address/packages/addr/hellots/src/index.ts
cp src/package.json address/packages/addr/hellots/package.json
cp src/tsconfig.json address/packages/addr/hellots/tsconfig.json
# test and deploy
nim project deploy address
nim action invoke addr/hellots
# expect `hi`
