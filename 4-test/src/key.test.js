const main = require("./index.js").main

test("no args", () =>
    expect(main({})).toMatchSnapshot()
)

test("get", () =>
    main({ "op": "get", "key": "hello" })
        .then(x => expect(x).toMatchSnapshot()))

test("set", () =>
    main({ "op": "set", "key": "hello", "value": "world" })
        .then(x => expect(x).toMatchSnapshot()))

test("get2", () =>
    main({ "op": "get", "key": "hello" })
        .then(x => expect(x).toMatchSnapshot()))

test("del", () =>
    main({ "op": "del", "key": "hello" })
        .then(x => expect(x).toMatchSnapshot()))

test("get3", () =>
    main({ "op": "get", "key": "hello" })
        .then(x => expect(x).toMatchSnapshot()))


