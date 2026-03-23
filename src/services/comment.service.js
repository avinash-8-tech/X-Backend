import { prisma } from '../config/db.js'
import { createNotification } from './notification.service.js'

const createComment = async (userId, tweetId, content) => {
  const comment = await prisma.comment.create({
    data: {
      content,
      userId,
      tweetId
    },
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

  const tweet = await prisma.tweet.findUnique({
    where: { id: tweetId }
  })
  await createNotification('COMMENT', userId, tweet.authorId, tweetId)

  return comment
}

const getTweetComments = async (tweetId) => {
  const comments = await prisma.comment.findMany({
    where: { tweetId },
    orderBy: { createdAt: 'desc' },
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
  return comments
}

const deleteComment = async (commentId, userId) => {
  const comment = await prisma.comment.findUnique({
    where: { id: commentId }
  })

  if (!comment) throw new Error('Comment not found')
  if (comment.userId !== userId) throw new Error('Unauthorized')

  await prisma.comment.delete({
    where: { id: commentId }
  })

  return { message: 'Comment deleted successfully' }
}

export { createComment, getTweetComments, deleteComment }