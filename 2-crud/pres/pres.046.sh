let select
function remove() {
  fetch("/api/addr/del?name="+select)
  .then(all)
}
