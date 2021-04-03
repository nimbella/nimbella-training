import nim = require("@nimbella/sdk")

interface Record {
    name: string,
    company: string,
    phone: number
}

function set(args: Map<string, string>) {
    let db = nim.redis()
    let key = "address:"+args["name"]
    let value: Record = {
            "name": args["name"] || "",
            "company":  args["company"]  || "",
            "phone": args["phone"] || ""
    }
    return db.setAsync(key, JSON.stringify(value))
    .then(reply => { return {"body": reply}})
    .catch(err =>  { return {"body": err}})
}
