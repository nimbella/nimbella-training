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
