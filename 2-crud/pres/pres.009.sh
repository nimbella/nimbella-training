# deploy encoder
mkdir -p encoder/packages/default
cp src/binary.js encoder/packages/default
nim project deploy encoder
nim action invoke binary -p text hello
