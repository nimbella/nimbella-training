// chained tests
const get = require("./get.js").main
const set = require("./set.js").main

test("setget", () =>
    set({ "key": "hello", "value": "world" })
        .then(() => get({ "key": "hello" }))
        .then(x =>
            expect(x).toEqual({ "result": "world" })
        )
)
