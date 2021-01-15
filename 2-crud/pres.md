---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
---

![bg left:40% 80%](img/nimbella.png)

# **Lesson 2**

A simple CRUD application

https://www.nimbella.com

---
# Plan

- create a nimbella project
  - sample: "secret" message encoder
- web project with framework
  - use redis for storage
  - use svelte for front-end
  - sample: a "crud"

---
# A Nimbella project
- Collection of
  - actions (backend)
  - web assets (front-end)
  - redis (storage)
  - bucket (uploads)
  - more... 
- Managed with `nim`

---
# Deploy-by-convention

- Actions are in `packages` folder
- Subfolders are packages
- Use "default" for "no-prefix" actions
- A single file with extension determine the actions
- Deploy with `nim project deploy <project-dir>`

---
# An example: 'secret' message encoder

- backend action encoding a messages 
- front end action 
- using jquery

---
```js
// convert binary
function main(args) {
    let text = args.text || ""
    let res =  text.split("").map(function (x) {
        return x.charCodeAt(0).toString(2)
    })
    return { 
        "body": res.join("\n")
    }
}
/*
mkdir -p encoder/packages/default
micro encoder/packages/default/binary.js
*/
```

---
# Testing locally

- Recommended practice before publishing
- With node.js:
    - start `node`
    - `eval(require("fs").readFileSync(<file?>, 'utf-8'))`
    - invoke `main(<args>)`

- Recommended: write "unit tests"
  - for example with `jest`

---
```sh
# testing locally
node
eval(require("fs").readFileSync("encoder/packages/default/binary.js", 'utf-8'))
main({"text":"hello"})
```

---
```sh
mkdir -p project/packages/default
cp src/binary.js project/packages/default
nim project deploy project
nim action invoke binary -p text hello
```

---
# Web Content

- placed under `<project>/web`
- uploaded when deploying
- actions accessible with `/api` prefix

---
```html
<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
    <script src="https://code.jquery.com/jquery-3.3.1.min.js" ></script>
</head>
<body>
    <h1>Binary Encoder</h1>
    <input type="text" id="input">
    <pre id="output"></pre>
    <script src="index.js" ></script>
</body>
</html>
<!-- 
mkdir -p encoder/web
micro encoder/web/index.html
-->
```

---
```js
$("#input").keyup(function () {
    $.post("/api/default/binary", 
      {
        text: $("#input").val()
      }, 
      function(data) {
        $("#output").text(data)
      }
    )
})
/*
micro encoder/web/index.js
*/
```
---
```sh
find encoder
nim project deploy encoder
```

---
# Local Development

# Problems:
- Not everything works opening a page
- CORS! Requests require same origin

# Solution
- use a local web server
- setup a proxy to Nimbella API

---
```sh
npm install -g http-server
http-server encoder/web --proxy https://$(nim auth current)-apigcp.nimbella.io
# open new tab
micro encoder/web/index.html
```

---
```html
  <script src="https://code.jquery.com/jquery-3.3.1.min.js" ></script>
  </head>
  <body>
+ <div class="container">
    <h1>Binary Encoder</h1>
    <input type="text" id="input">
    <pre id="output"></pre>
+ </div>
  <script src="index.js" ></script>
  </body>
  </html>
```

---
# `project deploy` Options

- use `--incremental` to deploy only changes
- use `--exclude=<path>` to exclude directories (or files)

```
nim project deploy --incremental encoder
nim project deploy --exclude=web encoder
```

---
# Using Redis

- A "in-memory" key-value store
- Data is persisted on disk and backed up
  - can be used as data store
- Very fast 
  - can be also used as cache
- Works as shared state
  - multiple actions can read and write

---
```js
// set.js v1
function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = args.key
    let value = args.value
    return db.setAsync(key, value)
    .then(reply => { return {"body": reply}})
    .catch(err =>  { return {"body": err}})
}
```

---
```js
// get.js v1
function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = args.key
    return db.getAsync(key)
    .then(reply => { return {"body": reply } })
    .catch(err =>  { return {"body": err}})
}
```

---
```sh
# setup address project
mkdir -p address/packages/addr
cp src/set1.js address/packages/addr/set.js
cp src/get1.js address/packages/addr/get.js
nim auth current
nim project deploy address
```

---
```sh
# testing
## set then get
nim action invoke addr/set -p key hello -p value world
nim action invoke addr/get -p key hello
nim action invoke addr/get -p key hi
# change value
nim action invoke addr/set -p key hello -p value earth
nim action invoke addr/get -p key hello
```

---
# Support a field in set

- `set.js` v2 diff:
```
<     let key = args.key
<     let value = args.value
---
>     let key = "address:"+args.name
>     let value = JSON.stringify({
>             "name": args.name || "",
>             "company":  args.company  || "",
>             "phone": args.phone || ""
>     })
```

---
# Support a field in get

- `get.js` v2 diff:
```
3c3
<     let key = args.key
---
>     let key = "address:"+args.name
5c5
<     .then(reply => { return {"body": reply } })
---
>     .then(reply => { return JSON.parse(reply || "")})
```


---
```js
// del.js
function main(args) {
    let db = require("nim").redis()
    let key = "address:"+args.name
    return db.delAsync(key)
    .then(reply => { return {"body": reply}})
    .catch(err =>  { return {"body": err}})
}
```

---
```sh
# Deploy fixed actions
cp src/set2.js address/packages/addr/set.js
cp src/get2.js address/packages/addr/get.js
cp src/del.js address/packages/addr/del.js
find address
nim project deploy address
```

---
```js
function main() {
    let db = require("@nimbella/sdk").redis()
    return db.keysAsync("address:*")
    .then(reply => {
        return reply.length == 0 ? []
          : db.mgetAsync(reply)
        })
    .then(reply => {
        return { 
        "body": reply.map(JSON.parse) 
       }
    })
    .catch(err => { return { "body": err}})
}
```

---
# `all.js` step by step:
- `db.keysAsync("address:*").then(reply => ...)`:
reply= [ 'address:Mirella', 'address:Michele' ]

- ` db.mgetAsync(reply).then(reply => ... )`:
reply = [ '{"name":"Mirella","company":"Sciabarra","phone":328}',
          '{"name":"Michele","company":"Nimbella","phone":392}' ]

- `reply.map(['{}', '{"a":1}])` 
= [{},{"a":1}]

---
```sh
# Test the actions
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/get -p name Michele
nim action invoke addr/del -p name Michele
nim action invoke addr/get -p name Michele
```

---
```js
cp src/all.js address/packages/addr/all.js
nim project deploy address
nim action invoke addr/all
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/set -p name Mirella -p company Sciabarra -p phone 328 
nim action invoke addr/all
curl $(nim action get addr/all --url)
```

---
# Create a Svelte app

```
cd address
rm -Rvf web
npx degit sveltejs/template web
echo "public" >web/.include
echo -e "bucket:\n  strip: 1" >project.yml
cd ..
nim project deploy address
```

---
# How to use a subfolder

## pick the subfolder `public`:

- `web/.include`:
```
public
```
# strip one level

- `project.yml`:
```
bucket:
  strip: 1
```

---
```sh
<script>
  // retrieve data
  let data = []
  function all()  {
      fetch("/api/addr/all")
      .then(r => r.json())
      .then(d => data = d)
  }
  // init
  import { onMount } from 'svelte'
  onMount(all)

</script>

<pre>{JSON.stringify(data, null, " ")}</pre>
```

---
```sh
# deploy and test
cp src/App1.svelte address/web/src/App.svelte
nim project deploy address
# show
nim action invoke addr/set -p name Max -p company Gear -p phone 333 
```

---
```html
<table>
  <tr>
    <th>Name</th>
    <th>Company</th>
    <th>Phone</th>
  </tr>
  {#each data as row}
      <tr>
        <td>{row.name}</td>
        <td><tt>{row.company}</tt></td>
        <td><i>{row.phone}</i></td>
      </tr>
  {/each}
</table>
```

---
```js
let form = {}

function add() {
    fetch("/api/addr/set", 
    {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
    })
    .then(all)
    .then(() => { form = {}})
}
```

---
```html
<form>
  <input placeholder="Name" bind:value={form.name}>
  <br>
  <input placeholder="Company" bind:value={form.company}>
  <br>
  <input placeholder="Phone" bind:value={form.phone}>
  <br>
</form>
<button on:click={add}>Add</button>
```

---
```sh
let select
function remove() {
  fetch("/api/addr/del?name="+select).then(all)
}
```

---
```html
<th></th>

<td>
  <input type="radio"
    bind:group={select}
    value={row.name}>
</td>

<button on:click={remove}>Remove</button>
```

---
# Exercise for Certification

Implement the "edit" button to load the form the selected value allowing to edit it


