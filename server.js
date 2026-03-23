import dotenv from 'dotenv'
dotenv.config()

import http from 'http'
import app from './src/app.js'
import { connectDB } from './src/config/db.js'
import { initSocket } from './src/socket/socket.js'

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

initSocket(server)

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
})