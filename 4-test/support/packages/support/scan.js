exports.main = function (args) {
    let rd = require("@nimbella/sdk").redis()
    let match = args.match || "*"
    let count = parseInt(args.count) || 10
    let cursor = parseInt(args.cursor) || 0
    return rd.scanAsync(cursor, "MATCH", match, "COUNT", count)
        .then(x => ({ result: x }))
}