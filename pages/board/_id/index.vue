<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h6 class="subtitle is-6">
          <nuxt-link to="/boards">Boards</nuxt-link> &mdash;
        </h6>
        <h1 class="title is-1">{{ board ? board.Name : '' }}</h1>
      </div>
    </section>

    <section class="section">
      <table class="table is-bordered">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="thread in threads">
            <td><nuxt-link :to="`/board/${id}/thread/${thread.ID}`">{{ thread.Name }}</nuxt-link></td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script>
  import api from '~plugins/api'

  export default {
    data ({ params }) {
      return {
        id: params.id
      }
    },

    computed: {
      board () {
        return this.$store.state.cache.boards.find((b) => {
          return b.ID === parseInt(this.id)
        })
      },
      threads () { return this.$store.state.cache.threads[this.id] }
    },

    methods: {
      refreshThreads () {
        return api.get(`/api/v1/board/${this.id}`)
          .then((res) => {
            this.$store.commit('cache/refreshBoard', res.data)

            this.$store.commit('cache/refreshThreads', {
              board: this.id,
              threads: res.data.Threads
            })
          })
      }
    },

    fetch ({ store, params }) {
      return api.get(`/api/v1/board/${params.id}`)
        .then((res) => {
          store.commit('cache/refreshBoard', res.data)

          store.commit('cache/refreshThreads', {
            board: params.id,
            threads: res.data.Threads
          })
        })
    }
  }
</script>
