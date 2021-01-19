// tick.js
const axios = require('axios').default;

function main(args) {
    let text = new Date().toISOString()
    return axios.post(args.notifications, {
        text: text
    }).then(r => {
        return {
            "body": r.data
        }
    })
}
