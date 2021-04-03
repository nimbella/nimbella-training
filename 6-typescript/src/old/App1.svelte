<script lang="ts">
  interface Record {
    name: string
    company: string
    phone: number
  }
  let data: Record[] = []
  function all()  {
      fetch("/api/addr/all")
      .then(r => r.json())
      .then(d => data = d)
  }
  // init
  import { onMount } from 'svelte'
  onMount(all)
</script>
