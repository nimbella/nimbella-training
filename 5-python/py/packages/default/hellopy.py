def main(args):
    """ Test main
    >>> main({})
    name: world
    {'hello': 'world'}
    >>> main({"name":"Mike"})
    name: Mike
    {'hello': 'Mike'}
    """
    name = args.get("name", "world")
    print("name:", name)
    return {
        "hello": name
    }

if __name__ == "__main__":
    import doctest
    doctest.testmod()
