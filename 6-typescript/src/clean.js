function main(args) {
    let db = require("nim").redis()
    return  db.keysAsync("address:")
    .then(reply => { return db.delAsync(reply) })
    .then(reply => { return {"delall":reply}})
    .catch(err =>  { return {"error": err}})
}
