function main(args) {
    let name = args.name || "world"
    console.log(name)
    return { body: "Hello, "+name }
}