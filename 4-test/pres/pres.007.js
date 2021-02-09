// Redis lists
rd.lpush("l", 1)
await rd.llenAsync("l")
# 1
rd.rpush("l", 2)
await rd.lrangeAsync("l", 0,-1)
# [ '1', '2' ]
rd.linsert("l",  "AFTER", 1, 3)
await rd.lrangeAsync("l", 0,-1)
# [ '1', '3', '2' ]
rd.lpop("l")
await rd.lrangeAsync("l", 0,-1)
# [ '3', '2' ]
