const set = require("./support/set.js").main
const get = require("./support/get.js").main
const del = require("./support/del.js").main
beforeAll( () => del({"key":"hello"}))

test("get", () => get({ "key": "hello" })
    .then(x => expect(x).toMatchSnapshot()))
test("set", () => set({ "key": "hello", "value": "world" })
    .then(x => expect(x).toMatchSnapshot()))
test("get2", () => get({ "key": "hello" })
    .then(x => expect(x).toMatchSnapshot()))
test("del", () => del({ "key": "hello" })
    .then(x => expect(x).toMatchSnapshot()))
test("get3", () => get({ "key": "hello" })
    .then(x => expect(x).toMatchSnapshot()))
