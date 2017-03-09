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

      <p v-if="someoneTyping">Someone is typing...</p>
    </section>

    <section class="section">
      <h4 class="title is-4">Reply</h4>

      <p v-if="$store.state.user.name == ''" class="control">
        <input v-model="draftUsername"
          class="input"
          type="text"
          placeholder="Your Name">
      </p>

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
  import socket from '~plugins/socket'

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

            draftMessage: '',
            someoneTyping: false
          }
        })
    },
    watch: {
      'draftMessage': 'updateTypingState'
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

          socket.emit('new-reply', res.data)
        })
      },

      updateTypingState () {
        if (this.draftMessage === '') {
          socket.emit('stopped-typing', this.id)
        } else {
          socket.emit('started-typing', this.id)
        }
      }
    },
    beforeMount () {
      socket.on('new-reply', (reply) => {
        if (parseInt(reply.Thread) === parseInt(this.id)) {
          this.posts.push(reply)
        }
      })
      socket.on('someone-started-typing', (thread) => {
        if (thread === this.id) {
          this.someoneTyping = true
        }
      })
      socket.on('someone-stopped-typing', (thread) => {
        if (thread === this.id) {
          this.someoneTyping = false
        }
      })
    }
  }
</script>
