function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = "address:"+args.name
    return db.getAsync(key)
    .then(reply => { return JSON.parse(reply||"")})
    .catch(err =>  { return {"body": err}})
}
