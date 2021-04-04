// hello.ts
export function main(args: {name:string})
: {body:string} {
    let name: string = args.name || 'world'
    let greeting = 'Hello ' + name + '!'
    console.log(greeting)
    return { body: greeting }
}
