<script>
  // retrieve data
  let data = [];
  function all() {
    fetch("/api/addr/all")
      .then((r) => r.json())
      .then((d) => (data = d));
  }
  // init
  import { onMount } from "svelte";
  onMount(all);

  let form = {};

  function add() {
    fetch("/api/addr/set", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
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
