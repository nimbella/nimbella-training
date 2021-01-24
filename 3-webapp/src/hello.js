function main(args) {
    let name = args.name || "World"
    console.log(args)
    return {
        "hello": name
    }
}