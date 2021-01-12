// notify.js
const axios = require('axios').default;

function main(args) {
    return axios.post(args.notifications, {
        text: args.text
    }).then(r => {
        return {
            "body": r.data
        }
    })
}
