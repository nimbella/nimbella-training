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
</script>
