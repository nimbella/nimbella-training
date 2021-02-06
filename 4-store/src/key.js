const db = require("@nimbella/sdk").redis()

function main(args) {
    let res = {}
    try {
        switch (args.op) {
            case "get":
                res = db.getAsync(args.key)
                break;
            case "set":
                res = db.setAsync(args.key, args.value)
                break;
            case "del":
                res = db.delAsync(args.key)
                break;
            default:
                res =  Promise.resolve({ "error": "bad args" })
                break;
        }
        return res
            .then(data => ({ "result": data }) )
            .catch(err => ({ "error": err }) )
    } catch (ex) {
        return { "error": ex.toString() }
    }
}

exports.main = main 