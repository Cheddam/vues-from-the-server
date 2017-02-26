<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h6 class="subtitle is-6">
          <nuxt-link to="/boards">Boards</nuxt-link> &mdash;
          <nuxt-link :to="`/boards/${board.ID}`">{{ board.Name }}</nuxt-link> &mdash;
        </h6>
        <h1 class="title is-1">{{ name }}</h1>
      </div>
    </section>

    <section class="section">
      <div v-for="post in posts" class="box">
        <p>{{ post.Content }}</p>
        <p><em>&mdash;{{ post.Author }}</em></p>
      </div>
    </section>
  </div>
</template>

<script>
  import api from '~plugins/api'

  export default {
    data ({ params }) {
      return api.get(`/api/v1/thread/${params.id}`)
        .then((res) => {
          return {
            id: params.id,
            name: res.data.Name,
            board: res.data.Board,
            posts: res.data.Posts
          }
        })
    },
    methods: {
      refreshPosts () {
        return api.get(`/api/v1/thread/${this.id}`)
          .then((res) => {
            this.posts = res.data.Posts
          })
      }
    }
  }
</script>
