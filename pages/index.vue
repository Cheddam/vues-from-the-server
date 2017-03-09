<template>
  <div class="container">
    <h1 class="title is-1 has-text-centered">Yo! I loaded {{ isServer ? 'server' : 'client' }}-side</h1>
  </div>
</template>

<script>
  export default {
    data (context) {
      return {
        isServer: context.isServer
      }
    }
  }
</script>

<style scoped>
.title
{
  margin: 50px 0;
}
</style>
