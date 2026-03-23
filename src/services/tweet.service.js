import { prisma } from '../config/db.js'
import uploadToCloudinary from '../utils/uploadToCloudinary.js'
import cloudinary from '../config/cloudinary.js'

const createTweet = async ({ content, file, authorId }) => {
  let mediaUrl = null

  if (file) {
    const result = await uploadToCloudinary(
      file.buffer,
      'x-backend/tweets'
    )
    mediaUrl = result.secure_url
  }

  const tweet = await prisma.tweet.create({
    data: {
      content,
      image: mediaUrl,
      authorId
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
      likes: true,
      comments: true
    }
  })
  return tweet
}

const getTweetById = async (tweetId) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
      likes: true,
      comments: {
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
      },
      replies: {
        include: {
          author: {
            select: {
              id: true,
              name: true,
              username: true,
              avatar: true
            }
          }
        }
      }
    }
  })
  return tweet
}

// Home Feed
const getHomeFeed = async (userId) => {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true }
  })

  const followingIds = following.map(f => f.followingId)

  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: {
        in: [...followingIds, userId]
      },
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
      likes: true,
      comments: true,
      _count: {
        select: {
          likes: true,
          comments: true,
          replies: true
        }
      }
    }
  })
  return tweets
}

const deleteTweet = async (tweetId, userId) => {
  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId }
  })

  if (!tweet) throw new Error('Tweet not found')
  if (tweet.authorId !== userId) throw new Error('Unauthorized')

  if (tweet.image) {
    const urlParts = tweet.image.split('/')
    const filename = urlParts[urlParts.length - 1]
    const publicId = `x-backend/tweets/${filename.split('.')[0]}`
    await cloudinary.uploader.destroy(publicId)
  }

  await prisma.tweet.delete({
    where: { id: tweetId }
  })

  return { message: 'Tweet deleted successfully' }
}

// Retweet
const retweetTweet = async (tweetId, userId) => {
  const existing = await prisma.tweet.findFirst({
    where: {
      retweetOfId: tweetId,
      authorId: userId
    }
  })

  if (existing) {
    await prisma.tweet.delete({ where: { id: existing.id } })
    return { message: 'Retweet removed', retweeted: false }
  }

  const retweet = await prisma.tweet.create({
    data: {
      content: '',
      authorId: userId,
      isRetweet: true,
      retweetOfId: tweetId
    }
  })

  return { message: 'Retweeted successfully', retweeted: true, retweet }
}

export {
  createTweet,
  getTweetById,
  getHomeFeed,
  deleteTweet,
  retweetTweet
}