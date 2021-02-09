// Redis  get/set/del/keys
await rd.getAsync("k")
# null
rd.set("k","v")
await rd.getAsync("k")
# v
await rd.keysAsync("*")
# ['k']
rd.del("k")
await rd.getAsync("k")
# null
