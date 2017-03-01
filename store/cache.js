import Vue from 'vue'

export const state = {
  boards: [],
  threads: {},
  posts: {}
}

export const mutations = {

  refreshBoard (state, board) {
    state.boards = state.boards.filter((b) => {
      return b.ID !== board.ID
    })

    state.boards.push(board)
  },

  refreshBoards (state, boards) {
    state.boards = boards
  },

  refreshThreads (state, { board, threads }) {
    Vue.set(state.threads, board, threads)
  },

  refreshPosts (state, { thread, posts }) {
    Vue.set(state.posts, thread, posts)
  }
}
