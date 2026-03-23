import { prisma } from '../config/db.js'

// Users search
const searchUsers = async (query, currentUserId) => {
  const users = await prisma.user.findMany({
    where: {
      AND: [
        {
          OR: [
            { username: { contains: query, mode: 'insensitive' } },
            { name: { contains: query, mode: 'insensitive' } }
          ]
        },
        {
          id: { not: currentUserId }
        }
      ]
    },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true,
      isVerified: true,
      _count: {
        select: { followers: true }
      }
    },
    take: 10
  })
  return users
}

// Tweets search
const searchTweets = async (query) => {
  const tweets = await prisma.tweet.findMany({
    where: {
      content: { contains: query, mode: 'insensitive' },
      isRetweet: false
    },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
      _count: {
        select: {
          likes: true,
          comments: true
        }
      }
    }
  })
  return tweets
}

export { searchUsers, searchTweets }