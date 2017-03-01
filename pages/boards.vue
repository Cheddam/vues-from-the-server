<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h1 class="title is-1">Boards</h1>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <section class="column is-three-quarters">
          <table class="table is-bordered">
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="board in boards">
                <td>
                  <h3 class="title is-4"><nuxt-link :to="`/board/${board.ID}`">{{ board.Name }}</nuxt-link></h3>
                  <p class="subtitle is-6"><em>{{ board.Description }}</em></p>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
        <aside class="column">
          (other)
        </aside>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '~plugins/api'

  export default {
    computed: {
      boards () { return this.$store.state.cache.boards }
    },

    methods: {
      refreshBoards () {
        return api.get('/api/v1/board')
          .then((res) => {
            this.$store.commit('cache/refreshBoards', res.data)
          })
      }
    },

    created () {
      this.refreshBoards()
    }
  }
</script>
