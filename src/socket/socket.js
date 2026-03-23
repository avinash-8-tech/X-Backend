import { Server } from 'socket.io'

let io

const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  })

  const onlineUsers = new Map()

  io.on('connection', (socket) => {
    console.log('User connected:', socket.id)

    socket.on('user:online', (userId) => {
      onlineUsers.set(userId, socket.id)
      io.emit('users:online', Array.from(onlineUsers.keys()))
      console.log(`${userId} is online`)
    })

    socket.on('message:send', async ({ senderId, receiverId, content }) => {
      const receiverSocketId = onlineUsers.get(receiverId)

      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message:receive', {
          senderId,
          receiverId,
          content,
          createdAt: new Date()
        })
      }
    })

    socket.on('notification:send', ({ receiverId, notification }) => {
      const receiverSocketId = onlineUsers.get(receiverId)
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('notification:receive', notification)
      }
    })

    socket.on('disconnect', () => {
      onlineUsers.forEach((socketId, userId) => {
        if (socketId === socket.id) {
          onlineUsers.delete(userId)
          io.emit('users:online', Array.from(onlineUsers.keys()))
          console.log(`${userId} is offline`)
        }
      })
    })
  })

  return io
}

const getIO = () => {
  if (!io) throw new Error('Socket.io not initialized')
  return io
}

export { initSocket, getIO }