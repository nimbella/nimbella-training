  let select: string;
  function remove() {
    fetch("/api/addr/crud?op=del&name=" + select)
    .then(all);
  }
