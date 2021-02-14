def main(args):
    """ Test main
    >>> main({})
    {'hello': 'world'}
    >>> main({"name":"Mike"})
    {'hello': 'Mike'}
    """
    name = args.get("name", "world")
    return {
        "hello": name
    }

if __name__ == "__main__":
    import doctest
    doctest.testmod()
