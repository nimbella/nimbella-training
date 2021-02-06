const main = require("./index.js").main

test("world", () => {
    expect(main({}))
        .toEqual({ hello: 'world' })
})

test("name", () => {
    expect(main({"name": "Mike"}))
        .toEqual({ hello: 'Mike' })
})
