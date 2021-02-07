const get = require("./support/get.js").main
const del = require("./support/del.js").main

beforeAll( () => del({"key":"hello"}))

test("get", () => 
    get({"key":"hello"}).then(x => expect(x).toEqual({"result": null})
))