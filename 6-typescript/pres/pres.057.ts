let form = <Record>{};

function add() {
    let args: Args = form
    args.op = "set"
    fetch("/api/addr/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(args),
    }).then(all);
}
