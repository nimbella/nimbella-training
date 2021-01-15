function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = args.key
    return db.getAsync(key)
    .then(reply => { return {"body": reply } })
    .catch(err =>  { return {"body": err}})
}
