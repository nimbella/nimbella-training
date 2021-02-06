const get = require("./support/get.js").main
const set = require("./support/set.js").main

test("setget", () =>
    set({ "key": "hello", "value": "world" })
        .then(() => get({ "key": "hello" }))
        .then(x =>
            expect(x).toEqual({ "result": "world" })
        )
)