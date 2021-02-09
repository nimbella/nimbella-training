// Redis hashes
rd.hset("h", "a", 1)
await rd.hgetAsync("h", "a")
# '1'
await rd.hgetAsync("h", "b")
# null
rd.hset("h", "b", 2)
await rd.hgetallAsync("h")
# { a: '1', b: '2' }
rd.hdel('h', 'b')
await rd.hgetallAsync("h")
# { a: '1' }
rd.del('h')
await rd.hgetallAsync("h")
# null
