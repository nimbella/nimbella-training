// Redis sets
rd.sadd("s", "1")
rd.sadd("s", "3")
await rd.smembersAsync("s")
# ['1', '3']
rd.sadd("s", "2")
rd.sadd("s", "3")
await rd.smembersAsync("s")
#  '1', '2', '3' ]
await rd.sismemberAsync("s", "1")
# 1
await rd.sismemberAsync("s", "4")
# 0
