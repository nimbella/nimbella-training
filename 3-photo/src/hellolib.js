const fs = require("fs")
const path = require('path')
const sharp = require("sharp")

function main(args) {
    let file = path.join(__dirname, "hello.png")
    let body = fs.readFileSync(file)
    let width = parseInt(args.width) || 200
    return sharp(body)
        .resize({ width: width }).toBuffer()
        .then(data => {
            return {
                "body": data.toString("base64"),
                "headers": {
                    "Content-Type": "image/png"
                }
            }
        })
}
exports.main = main 