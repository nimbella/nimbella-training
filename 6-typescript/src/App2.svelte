<script lang="ts">
  import type {Record, Result, Args} from './decl'

  let data: Record[] = []

  function all()  {
      fetch("/api/addr/crud?op=all")
      .then(r => r.json() as Result)
      .then(d => data = d.data ? d.data : [])
  }

  // init
  import { onMount } from 'svelte'
  onMount(all)

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
</script>

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

<form>
  <input placeholder="Name" bind:value={form.name} /><br />
  <input placeholder="Company" bind:value={form.company} /><br />
  <input placeholder="Phone" bind:value={form.phone} /><br />
</form>
<button on:click={add}>Add</button>
