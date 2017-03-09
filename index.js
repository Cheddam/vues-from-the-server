const Nuxt = require('nuxt')
const app = require('express')()
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const isProd = (process.env.NODE_ENV === 'production')
const port = process.env.PORT || 3000

// We instantiate buxt.js with the options
let config = require('./nuxt.config.js')
config.dev = !isProd
const nuxt = new Nuxt(config)

// Render every route with nuxt.js
app.use(nuxt.render)

// Build only in dev mode with hot-reloading
if (config.dev) {
  nuxt.build()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
}

server.listen(port, '0.0.0.0')

// DOING IT LIIIIVE
io.on('connection', (socket) => {
  socket.on('new-reply', (post) => {
    socket.broadcast.emit('new-reply', post)
  })
  socket.on('started-typing', (thread) => {
    socket.broadcast.emit('someone-started-typing', thread)
  })

  socket.on('stopped-typing', (thread) => {
    socket.broadcast.emit('someone-stopped-typing', thread)
  })
})

// Listen the server
console.log('Server listening on localhost:' + port)
