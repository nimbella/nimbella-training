function main(args) {
    let name = args.name ||  "world"
    return {
        "hello": name
    }
}

exports.main = main
