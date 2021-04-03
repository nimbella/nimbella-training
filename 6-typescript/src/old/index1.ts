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
        error?: string
    }
}

export function main(args: Args): Result {
    if(args.op=='get') {
        delete args.op
        return { body: {record: args}}
    }
    return { body: {error: "unknown op"} }
}