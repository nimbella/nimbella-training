def main(args):
    name = args.get("name", "world")
    print("name:", name)
    return {
        "hello": name
    }
