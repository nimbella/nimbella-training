//...
    return collect(rd, [], 0, match, count)
        .then(x => ({ result: x }))
//...

function collect(rd, res, cursor, match, count) {
    return rd.scanAsync(cursor, "MATCH", match, "COUNT", count)
    .then(r => {
        res = res.concat(r[1])
        if(r[0] == 0)
          return Promise.resolve(res) 
        return collect(rd, res, r[0], match, count)
    })
}
