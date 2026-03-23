import { prisma } from '../config/db.js'
import { createNotification } from './notification.service.js'

const toggleLike = async (userId, tweetId) => {
  const existing = await prisma.like.findUnique({
    where: {
      userId_tweetId: { userId, tweetId }
    }
  })

  if (existing) {
    await prisma.like.delete({
      where: {
        userId_tweetId: { userId, tweetId }
      }
    })
    return { liked: false, message: 'Tweet unliked' }
  }

  await prisma.like.create({
    data: { userId, tweetId }
  })

  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId }
  })
  await createNotification('LIKE', userId, tweet.authorId, tweetId)

  return { liked: true, message: 'Tweet liked' }
}

const getTweetLikes = async (tweetId) => {
  const likes = await prisma.like.findMany({
    where: { tweetId },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })
  return likes.map(l => l.user)
}

export { toggleLike, getTweetLikes }