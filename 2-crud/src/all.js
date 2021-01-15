function main() {
    let db = require("@nimbella/sdk").redis()
    return db.keysAsync("address:*")
    .then(reply => {
        return reply.length == 0 ? []
          : db.mgetAsync(reply)
        })
    .then(reply => {
        return { 
        "body": reply.map(JSON.parse) 
       }
    })
    .catch(err => { return { "body": err}})
}

