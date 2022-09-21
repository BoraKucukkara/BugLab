<template>
  <div id="app">
    <buglab></buglab>
    <bug-archive></bug-archive>
  </div>
</template>

<script>
import buglab from './components/buglab'
import bugArchive from './components/archive.vue'

export default {
  name: 'App',
  components: {
    buglab,
    bugArchive
  }
}
</script>
