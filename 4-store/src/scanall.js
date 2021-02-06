function collect(rd, res, cursor, match, count) {
    return rd.scanAsync(cursor, "MATCH", match, "COUNT", count)
    .then(r => {
        res = res.concat(r[1])
        if(r[0] == 0)
          return Promise.resolve(res) 
        return collect(rd, res, r[0], match, count)
    })
}

exports.main = function(args) {
    let rd = require("@nimbella/sdk").redis()
    let match = args.match || "*"
    let count = parseInt(args.count) || 10
    return collect(rd, [], 0, match, count)
        .then(x => ({ result: x }))
}