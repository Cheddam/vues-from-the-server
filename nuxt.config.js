module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'For\'m',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/scss/app.scss', lang: 'scss' }
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    vendor: ['socket.io-client'],
    /*
    ** Run ESLINT on save
    */
    extend (config, { isClient }) {
      if (isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  env: {
    baseApiUrl: process.env.BASE_API_URL || 'http://vfts-api.dev',
    HOST_URL: process.env.HOST_URL || 'http://localhost:3000'
  }
}
