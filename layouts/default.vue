<template>
  <div>
    <app-header />
    <nuxt />
    <app-footer />
  </div>
</template>

<script>
import AppHeader from '~components/Header.vue'
import AppFooter from '~components/Footer.vue'

export default {
  components: {
    AppHeader,
    AppFooter
  }
}
</script>
