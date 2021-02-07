exports.main = function (args) {
    let rd = require("@nimbella/sdk").redis()
     return rd.delAsync(args.key).then(x => {
         rd.end(true)
         return {result:x}
     })
}
