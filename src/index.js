import { Server } from 'http'
import SocketIO from 'socket.io'
import app from './server'
import socket from './socket'

let server, current, io

const port = process.env.PORT || 3000

const start = (app, socket) => {
  console.log('starting the server')
  server = Server(app)
  current = app

  io = SocketIO(server)
  socket(io)

  server.listen(port, error => {
    if (error) {
      throw error
    }
    console.log(`🚀 started on port ${port}`)
  })
}

const stop = done => {
  if (!server) return done()
  console.log('stopping the server')

  current = null

  io.close(err => {
    if (err) console.error(err.message)

    server = null
    io = null

    return done()
  })
}

const restart = (newApp, newIoHandler) =>
  stop(() => {
    console.log('server stopped')
    start(newApp, newIoHandler)
  })

if (module.hot) {
  module.hot.accept(['./server', './socket'], function() {
    console.log('🔁  HMR Reloading...')

    const newApp = require('./server').default
    const newIoHandler = require('./socket').default

    restart(newApp, newIoHandler)
  })

  console.info('✅  Server-side HMR Enabled!')
}

export default start(app, socket)
