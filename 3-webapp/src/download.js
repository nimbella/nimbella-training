const nimbella = require('@nimbella/sdk')
const notFound = "https://via.placeholder.com/200x50.png/FF0000/FFFFFF?text=Image+not+found"

function main(args) {
    let filename = args.filename || "upload.png"
    let mime = args.mime || "image.png"
    return nimbella.storage()
        .then(bucket => {
            const file = bucket.file(filename)
            return file.exists()
                .then(found => {
                    if (found[0])
                        return file.getSignedUrl({
                            version: 'v4',
                            action: 'read',
                            responseType: mime,
                            expires: Date.now() + 60 * 1000
                        })
                    return [notFound]
                })
        }).then(url => {
            console.log(url)
            return {
                "statusCode": 307,
                "headers": {
                    "Location": url[0]
                }
            }
        })
}


