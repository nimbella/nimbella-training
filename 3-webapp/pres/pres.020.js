const fs = require("fs")
const path = require('path')

function main(args) {
    let file = path.join(__dirname, "hello.png")
    let body = fs.readFileSync(file)
    return {
        "body": body.toString("base64"),
        "headers": {
            "Content-Type": "image/png"
        }
    }
}
exports.main = main 
