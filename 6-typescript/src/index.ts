/// <reference path="index.d.ts" />
import { redis } from "@nimbella/sdk"

import type {Record, Result, Args} from './decl'

export function main(args: Args): Promise<{body:Result}> {
    let db = redis()
    let key = "address:" + args.name
    switch (args.op) {
        case "set":
            delete args.op
            return db.setAsync(key, JSON.stringify(args))
                .then(reply => ({ body: { status: reply.toString() } }))
                .catch(err => ({ body: { error: err } }))
            break
        case 'get':
            return db.getAsync(key)
                .then(reply => ({ body: { record: JSON.parse(reply) } }))
                .catch(err => ({ body: { error: err } }))
            break
        case 'del':
            return db.delAsync(key)
                .then(reply => ({ body: { status: reply.toString() } }))
                .catch(err => ({ body: { "error": err } }))
            break
        case 'all':
            return db.keysAsync("address:*")
                .then(reply =>  reply.length == 0 ? [] as string[] : db.mgetAsync(reply))
                .then(reply => ({
                    body: { data: reply.map(JSON.parse as (x:string)=> Record) }
                }))
                .catch(err => ({ body: { error: err } }))
        default:
            return Promise.resolve({ body: { error: "unknown op" } })
    }
}