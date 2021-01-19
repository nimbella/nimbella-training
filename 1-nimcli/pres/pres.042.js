// notify2.js
// prefixed message, parameters from trigger
const axios = require('axios').default;

function main(args) {
    let prefix = args.prefix || ""
    let text = args.parameters[0].value
    return axios.post(args.notifications, {
        text: prefix + text
    }).then(r => {
        return {
            "body": r.data
        }
    })
}
