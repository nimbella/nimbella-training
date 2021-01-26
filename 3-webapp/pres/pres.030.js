// upload.js
const nimbella = require('@nimbella/sdk')

function main(args) {
    let filename = args.filename || "upload.png"
    let ttl = parseInt(args.ttl) || 15 * 60 * 1000
    let mime = args.mime | 'image/png'

    return nimbella.storage().then(bucket => {
        const file = bucket.file(filename)
        return file.getSignedUrl({
            version: 'v4',
            action: 'write',
            expires: Date.now() + ttl,
            contentType: mime,
            responseType: mime
        }).then(url => {
            return {
                "body": url[0]
            }
        })
    })
}
