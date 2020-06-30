<template>
  <div class="navbar sticky-top navbar-expand-md navbar-dark shadow-sm" role="navigation">
    <a class="navbar-brand">TakeTurns</a>
    <button
      class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
  components: {
  },
  data () {
    return { }
  }
}
</script>

<style scoped lang="scss">
.navbar {
    background-color: #44749D;
}
</style>
