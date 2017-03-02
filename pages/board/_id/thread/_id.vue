<template>
  <div class="container">
    <section class="section">
      <div class="heading">
        <h6 class="subtitle is-6">
          <nuxt-link to="/boards">Boards</nuxt-link> &mdash;
          <nuxt-link :to="`/board/${board.ID}`">{{ board.Name }}</nuxt-link> &mdash;
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

    <section class="section">
      <h4 class="title is-4">Reply</h4>

      <p class="control">
        <textarea v-model="draftMessage"
          class="textarea"
          placeholder="Message">
        </textarea>
      </p>

      <button class="button is-primary" @click.prevent="addComment">Send</button>
    </section>
  </div>
</template>

<script>
  import api from '~plugins/api'

  // TODO: Shift this component to using state properly
  export default {
    data ({ params }) {
      return api.get(`/api/v1/thread/${params.id}`)
        .then((res) => {
          return {
            id: params.id,
            name: res.data.Name,
            board: res.data.Board,
            posts: res.data.Posts,

            draftMessage: ''
          }
        })
    },
    methods: {
      refreshPosts () {
        return api.get(`/api/v1/thread/${this.id}`)
          .then((res) => {
            this.posts = res.data.Posts
          })
      },
      addComment () {
        if (this.draftMessage === '') return

        return api({
          method: 'post',
          url: `/api/v1/thread/${this.id}/reply`,
          data: {
            author: this.$store.state.user.name,
            message: this.draftMessage
          }
        }).then((res) => {
          this.draftMessage = ''

          this.posts.push(res.data)
        })
      }
    }
  }
</script>
