const express = require('express')
const http = require('http')
const socketIo = require('socket.io')
const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173/'],
    methods: ['GET', 'POST'],
  },
})

io.on('connection', (socket) => {
  console.log('New client connected')

  socket.on('disconnect', () => {
    console.log('Client disconnected')
  })
})

// Start the server
server.listen(8080, () => {
  console.log('WebSocket server running on http://localhost:5173')
})