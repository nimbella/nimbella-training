function main() {
    let db = require("@nimbella/sdk").redis()
    return db.keysAsync("address:*")
    .then(reply =>  
      reply.length == 0 ? [] : db.mgetAsync(reply))
    .then(reply => ({ 
        "body": reply.map(JSON.parse) 
      }))
    .catch(err => ({ "body": err}))
}
