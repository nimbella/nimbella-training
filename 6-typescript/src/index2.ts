/// <reference path="index.d.ts" />
import { redis } from "@nimbella/sdk"

interface Record {
    name: string
    company: string
    phone: number
}

interface Args extends Record {
    op?: string
}

interface Result {
    body: {
        record?: Record
        status?: string
        error?: string
    }
}

export function main(args: Args): Promise<Result> {
    let db = redis()
    let key = "address:"+args.name
    switch (args.op) {
        case "set":
            delete args.op
            return db.setAsync(key, JSON.stringify(args))
                .then(reply => ({ body: { status: reply.toString() } }))
                .catch(err => ({ body: { error: err } }))
            break
        default:
            return Promise.resolve({ body: { error: "unknown op" } })
    }
}