<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h1 class="title is-1">Register</h1>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <form class="column is-half">

          <p v-if="currentName"></p>

          <label for="name" class="label">Name</label>

          <p class="control">
            <input v-model="localNameValue" type="text" class="input is-medium" @keyup.enter.prevent="setName">
          </p>

          <button class="button is-primary is-medium is-outlined" @click.prevent="setName">{{ currentName ? 'Change Name' : 'Register' }}</button>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        localNameValue: ''
      }
    },

    computed: {
      currentName () { return this.$store.state.user.name }
    },

    methods: {
      setName () {
        this.$store.commit('user/setName', this.localNameValue)
      }
    }
  }
</script>
