---
marp: true
theme: gaia
_class: lead
paginate: true
backgroundColor: #fff
backgroundImage: url('https://marp.app/assets/hero-background.jpg')
---

![bg left:40% 80%](img/nimbella.png)

# **Lesson 6**

Using Typescript with Nimbella

https://www.nimbella.com

---
# Plan

- sample: a "crud" application
  - use redis for storage
  - use svelte for front-end
- use typescript
  - share code
  
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
# Conventions over configurations

- Actions are in `packages` folder
  - Subfolders are packages
  - Use "default" for "no package" actions
- A single file with extension determine the actions
  - It can also be a directory
- Deploy with `nim project deploy <project-dir>`

---
# Login

- `nim auth login`
open the browser and log into your github account

- `nim auth current`
show your namespace

- `nim namespace get`
show what you have in the namespace

- `nim namespace clean`
cleaning your namespace

---
# <!--!--> Authentication
```sh
# authentication
nim auth login
nim auth list
nim auth current
nim namespace get
nim namespace clean
```

---
# Inspecting Actions

- `nim action list` 
list actions
- `nim action get <name>` 
get informations about an action
- `nim action get <name> --url` 
get the public url of an action

---
# <!--!--> Inspecting the action
```sh
# Inspecting the action
nim action list
nim action get Jedi
nim action get Jedi --url 
```

---
# Action invocation with nim

##  with `action invoke`: 
- `nim action invoke <action-name> <parameters>`

## `<parameters>`:
- `-p <name> <value> ...`
can be repeated multiple times
- `-P <file>.json`
you need a file in json format

---
# <!--!--> Invoking an action with parameters
```sh
# Invoking an action with parameters
nim action invoke Jedi -p event idle
nim action invoke Jedi -p event hit
nim action invoke Jedi -p event enemy-spot
nim action invoke Jedi -p event wall-collide

# invoking an action with json
echo '{ "event": "idle"}' >args.json
nim action invoke Jedi -P args.json
```

---
# Action invocation with `curl` 

## only for web actions!

- `--web true`  
  - web public it is the default with `nim`
  - **not** all the actions are web public

## use url-encoded parameters

- `curl -X GET <url>?event=hit`
- `curl -X POST -d  event=hit <url>`

---
# <!--!--> Using `curl` for web actions
```sh
# Using Curl  for web actions

URL=$(nim action get Jedi --url)
echo $URL

# use GET and url parameters

curl "$URL?event=hit"

## use POST and form data (url-encoded)

curl -X POST -d event=enemy-spot "$URL"
```

---
# Updating an Action

- `nim action update <name> <file>`
   - works also if the action does not exists
   - some people only uses `update`

---
# <!--!--> Simple Action
```js
function main(args) {
    console.log(args.event)
    return { body: [
        {"turn_turret_left": 15, 
         "shoot": true}
    ]}
}
/*
nim action update Jedi jedi.js
nim action invoke Jedi
*/
```

---
# Checking Activations

- `nim activation list [--limit <n>]`
list actions, you can limit them

- `nim activation logs [<id>]`
show logs of an activation

- `nim activation result [<id>]`
show logs of an activation

---
# <!--!--> Activations
```sh
# Activations
nim activation list
nim action invoke Jedi -p event idle
nim activation list --limit 3

nim activation logs
nim activation result
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
# <!--!--> Using `nim kv`
```sh
# nim kv support
nim kv
nim kv list
nim kv get hello
nim kv clean
nim kv list
```

---
# <!--!--> Set in Redis
```js
// set2.js
function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = "address:"+args.name
    let value = JSON.stringify({
            "name": args.name || "",
            "company":  args.company  || "",
            "phone": args.phone || ""
    })
    return db.setAsync(key, value)
    .then(reply => { return {"body": reply}})
    .catch(err =>  { return {"body": err}})
}
```

---
# <!--!--> Get in Redis
```js
// get.js
function main(args) {
    let db = require("@nimbella/sdk").redis()
    let key = "address:"+args.name
    return db.getAsync(key)
    .then(reply => { return JSON.parse(reply||"")})
    .catch(err =>  { return {"body": err}})
}
```

---
# <!--!--> `del.js`
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
# <!--!--> Deploy record actions
```sh
# Deploy fixed actions
mkdir -p address/packages/addr
cp src/set.js address/packages/addr/set.js
cp src/get.js address/packages/addr/get.js
cp src/del.js address/packages/addr/del.js
find address
nim project deploy address
```

---
# <!--!--> Test record actions
```sh
# Test the actions
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/get -p name Michele
nim action invoke addr/del -p name Michele
nim action invoke addr/get -p name Michele
```

---
# <!--!--> List all records
```js
// loading all the records
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
# Dissecting `all.js`:

- `db.keysAsync("address:*").then(reply => ...)`:
reply= `[ 'address:Mirella', 'address:Michele' ]`

- ` db.mgetAsync(reply).then(reply => ... )`:
reply = `[ '{"name":"Mirella","company":"Sciabarra","phone":328}',
'{"name":"Michele","company":"Nimbella","phone":392}' ]`

- `reply.map(['{}', '{"a":1}])` 
= `[{},{"a":1}]`

---
# <!--!--> Deploy and test `all.js`
```sh
# add all
cp src/all.js address/packages/addr/all.js
nim project deploy address
nim action invoke addr/all
nim action invoke addr/set -p name Michele -p company Nimbella -p phone 392 
nim action invoke addr/set -p name Mirella -p company Sciabarra -p phone 328 
nim action invoke addr/all
curl $(nim action get addr/all --url)
```

---
# <!--!--> hello.ts
```ts
export function main(args: {name:string}): {body:string} {
    let name: string = args.name || 'stranger'
    let greeting = 'Hi ' + name + '!'
    console.log(greeting)
    return { body: greeting }
  }
```

---
# Typescript: Folders and Files

- `address`: project  folder
- `packages`: backend folder
- `addr`: package folder
- `hello`: action folder
- `src`: sources folder
  - `index.ts`: the typescript action
  - `packages.json`: configuration file
  - `tsconfig.ts`: compiler file
  - `.include`: list of included files

---
# Create a typescript
```sh
# prepare environment
mkdir -p address/packages/addr/hello/src
cp src/hello.ts address/packages/addr/hello/src/index.ts
# initializing 
cd address/packages/addr/hello
echo "index.js" >.include
npm -y init
tsc --init
# build and deploy
ls -la
tsc --outDir .
ls -la
cd ../../../..
nim project deploy address
nim action invoke addr/hello
```

---
# Integrating with `nim`
- `nim` invokes automatically builds 
  - `npm run build` if exists `package.json`
- We need:
  - to add `tsc` in `package.json`
  - to configure `tsc` in `tsconfig.json`


---
# `package.json`:
```js
{ 
 ...
 "scripts": {
    "build": "tsc" 
  },
  ...
}
```
- add a build script

---
# `tsconfig.js`:
```js
{
  "include": ["src/*.ts"],
  "exclude": [],
  "compilerOptions": {
    "outDir": "./",
    "target": "es2015",
    "module": "commonjs",
    ...
  }
}
```
- include and exclude folders
- set output directory to root of the action

---
# <!--!--> Testing the integration
```sh
# copying configuration and files
cp src/hi.ts address/packages/addr/hello/src/index.ts
cp src/package.json address/packages/addr/hello/package.json
cp src/tsconfig.json address/packages/addr/hello/tsconfig.json
# test and deploy
nim project deploy address
nim action invoke addr/hello
# expect `hi`
```

---
# From Javascript to TypeScript

- adding types to the previous example
   - declare types for input and output
   - declare types for used libraries




---
# `index1.ts.ts`:


---
# <!--!--> Test crud entry point
```sh
# prepare crud typescript
mkdir -p address/packages/addr/crud/src
cp src/package.json  address/packages/addr/crud/package.json
cp src/tsconfig.json address/packages/addr/crud/tsconfig.json
cp src/index1.ts     address/packages/addr/crud/src/index.ts
echo "index.js"    > address/packages/addr/crud/.include

# test and deploy
ls -la address/packages/addr/crud
nim project deploy address
# note the index.js has been generated
ls -la address/packages/addr/crud
nim action invoke addr/crud -p op hello
nim action invoke addr/crud -p op get -p name Mike -p company Nimbella -p phone 392
```

---
## Declare module
```ts
// index.d.ts
declare module "@nimbella/sdk" {
    export function redis(): RedisClient;
    export interface RedisClient extends NodeJS.EventEmitter {
        setAsync(key:string, value:string): Promise<number>;
        getAsync(key:string): Promise<string>;
        delAsync(key:string): Promise<number>;
        keysAsync(pattern:string): Promise<Array<string>>;
        mgetAsync(keys:Array<string>): Promise<Array<string>>;
    }
}
```
## Use module
```ts
/// <reference path="index.d.ts" />
import { redis } from "@nimbella/sdk"
```

---
# `index2.ts`

---
# <!--!--> Deploying `set` in typescript
```sh
cp src/index.d.ts address/packages/addr/crud/src
cp src/index2.ts address/packages/addr/crud/src/index.ts
cd address/packages/addr/crud
npm install --save @types/node
echo "node_modules">.exclude
cd ../../../..
nim project deploy address
nim action invoke addr/crud -p op set -p name Mike -p company Nimble -p phone 555
nim kv list
```

---
# `index3.ts`

---
# <!--!--> `get/del.ts`:
```sh
cp src/index3.ts address/packages/addr/crud/src/index.ts
nim project deploy address
nim action invoke addr/crud -p op get -p name Mike
nim action invoke addr/crud -p op del -p name Mike
nim action invoke addr/crud -p op get -p name Mike
```

---
index4

---
# <!--!--> `all.ts`:
```sh
cp src/index4.ts address/packages/addr/crud/src/index.ts
nim project deploy address
nim action invoke addr/crud -p op all
nim action invoke addr/crud -p op set -p name Michele -p company Nimbella -p phone 392
nim action invoke addr/crud -p op set -p name Mirella -p company Butterly -p phone 328
nim action invoke addr/crud -p op all
```

---
![bg](img/2-simple-crud.png)

---
# Create a svelte app

- `npx degit sveltejs/template web`
uses a template
- requires some configuration:
  - `project.yml`
  - `web/.include`

---
# <!--!--> Deploy Web Content
```sh
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

- `project.yml` (strip one level):
```
bucket:
  strip: 1
```

- `web/.include` (pick the subfolder `public`):
```
public
```

---
# Svelte is "reactive"
- declare: `let data = ""`
- use: `{data}`
- assign: `data = "hello"` 
  - triggers view update
- `onMount` executed when view ready

---
# <!--!--> Load All data
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
# <!--!--> Deploy and Test v1
```sh
# deploy and test
cp src/App1.svelte address/web/src/App.svelte
nim project deploy address
# show
nim action invoke addr/set -p name Max -p company Gear -p phone 333 
```

---
# Svelte templates
  - reactive
    - just update variable
  - `{#each data as row}`
    - iterates array assigning to row
  - `{row.name}`
    - render value
  - `{/each}`
    - closes block

---
# <!--!--> Adding the table
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
# <!--!--> Deploy v2
```sh
cp src/App2.svelte address/web/src/App.svelte
nim project deploy address
```

---
# <!--!--> Form
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
# Svelte Bindings
 - `<input bind:value={form.name}>`
   - value stored into `form.name`

# Svelte events

 - `<button on:click={add}>Add</button>`
   - event `click` execute function `add`
  

---
# <!--!--> Form HTML
```html
<form>
  <input placeholder="Name" 
   bind:value={form.name}>
  <br>
  <input placeholder="Company" 
   bind:value={form.company}>
  <br>
  <input placeholder="Phone" 
   bind:value={form.phone}>
  <br>
</form>
<button on:click={add}>Add</button>
```

---
# <!--!--> Deploy v3
```sh
# deploy v3
cp src/App3.svelte address/web/src/App.svelte
nim project deploy address
```

---
# <!--!--> Remove
```sh
let select
function remove() {
  fetch("/api/addr/del?name="+select)
  .then(all)
}
```

---
# Remove Changes
```html
 <table>
    <tr>
+     <th></th
      <th>Name</th>
...
      <tr>
+       <td>
+         <input type="radio" 
+          bind:group={select} 
+          value={row.name} />
+       </td>
        <td>{row.name}</td>
...
  <button on:click={add}>Add</button>
+ <button on:click={remove}>Remove</button>
```

---
# <!--!--> Deploy v4
```sh
# deploy v4
cp src/App4.svelte address/web/src/App.svelte
nim project deploy address
```



