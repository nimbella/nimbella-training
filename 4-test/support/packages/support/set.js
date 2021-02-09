exports.main = function (args) {
    let rd = require("@nimbella/sdk").redis()
    return rd.setAsync(args.key, args.value)
        .then(x => {
            rd.end(true)
            return { result: x }
        })
}