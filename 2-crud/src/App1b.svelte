function remove() {
    console.log(select)
    fetch(base+"/addr/del?name="+select)
    .then(all)
    .catch(console.log)
}
