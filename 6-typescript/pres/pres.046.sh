## Deploying Crud
# prepare crud typescript
mkdir -p address/packages/addr/crud/src
cp src/package.json  address/packages/addr/crud/package.json
cp src/tsconfig.json address/packages/addr/crud/tsconfig.json
cp src/decl.d.ts      address/packages/addr/crud/src/decl.d.ts
cp src/index.d.ts     address/packages/addr/crud/src/index.d.ts
cp src/index.ts       address/packages/addr/crud/src/index.ts
echo "index.js"     > address/packages/addr/crud/.include

# deploy
find address/packages/addr/crud
nim project deploy address
ls -la address/packages/addr/crud
# note the index.js has been generated
