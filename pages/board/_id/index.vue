<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h6 class="subtitle is-6">
          <nuxt-link to="/boards">Boards</nuxt-link> &mdash;
        </h6>
        <h1 class="title is-1">{{ name }}</h1>
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
      return api.get(`/api/v1/board/${params.id}`)
        .then((res) => {
          return {
            id: params.id,
            name: res.data.Name,
            threads: res.data.Threads
          }
        })
    },
    methods: {
      refreshThreads () {
        return api.get(`/api/v1/board/${this.id}/threads`)
          .then((res) => {
            this.boards = res.data
          })
      }
    }
  }
</script>
