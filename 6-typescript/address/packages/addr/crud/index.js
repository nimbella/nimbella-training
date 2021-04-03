"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = void 0;
/// <reference path="index.d.ts" />
const sdk_1 = require("@nimbella/sdk");
function main(args) {
    let db = sdk_1.redis();
    let key = "address:" + args.name;
    switch (args.op) {
        case "set":
            delete args.op;
            return db.setAsync(key, JSON.stringify(args))
                .then(reply => ({ body: { status: reply.toString() } }))
                .catch(err => ({ body: { error: err } }));
            break;
        case 'get':
            return db.getAsync(key)
                .then(reply => ({ body: { record: JSON.parse(reply) } }))
                .catch(err => ({ body: { error: err } }));
            break;
        case 'del':
            return db.delAsync(key)
                .then(reply => ({ body: { status: reply.toString() } }))
                .catch(err => ({ body: { "error": err } }));
            break;
        case 'all':
            return db.keysAsync("address:*")
                .then(reply => reply.length == 0 ? [] : db.mgetAsync(reply))
                .then(reply => ({
                body: { data: reply.map(JSON.parse) }
            }))
                .catch(err => ({ body: { error: err } }));
        default:
            return Promise.resolve({ body: { error: "unknown op" } });
    }
}
exports.main = main;
