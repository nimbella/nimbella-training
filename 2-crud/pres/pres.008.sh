# testing locally the binary action
node
eval(require("fs").readFileSync("encoder/packages/default/binary.js", 'utf-8'))
main({"text":"hello"})
main({})
