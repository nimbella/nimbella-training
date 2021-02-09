// get.test.js
const get = require("./support/get.js").main

test("get", () => 
    get({"key":"hello"}).then(x => expect(x).toEqual({"result": null})
))
