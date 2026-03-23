import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import { toNodeHandler } from 'better-auth/node'
import { auth } from './config/auth.js'
import tweetRoutes from './routes/tweet.routes.js'
import followRoutes from './routes/follow.routes.js'
import likeRoutes from './routes/like.routes.js'
import commentRoutes from './routes/comment.routes.js'
import userRoutes from './routes/user.routes.js'
import searchRoutes from './routes/search.routes.js'
import notificationRoutes from './routes/notification.routes.js'
import messageRoutes from './routes/message.routes.js'
import errorMiddleware from './middlewares/error.middleware.js'

const app = express()

// Better Auth
app.use('/api/auth', toNodeHandler(auth))

// Middlewares
app.use(helmet())
app.use(morgan('dev'))
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Routes
app.use('/api/tweets', tweetRoutes)
app.use('/api/follow', followRoutes)
app.use('/api/likes', likeRoutes)
app.use('/api/comments', commentRoutes)
app.use('/api/users', userRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/messages', messageRoutes)

// Error Middleware
app.use(errorMiddleware)

export default app