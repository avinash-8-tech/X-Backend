import { prisma } from '../config/db.js'
import { createNotification } from './notification.service.js'

const toggleFollow = async (followerId, followingId) => {
  if (followerId === followingId) {
    throw new Error('You cannot follow yourself')
  }

  const existing = await prisma.follow.findUnique({
    where: {
      followerId_followingId: { followerId, followingId }
    }
  })

  if (existing) {
    await prisma.follow.delete({
      where: {
        followerId_followingId: { followerId, followingId }
      }
    })
    return { following: false, message: 'Unfollowed successfully' }
  }

  await prisma.follow.create({
    data: { followerId, followingId }
  })

  await createNotification('FOLLOW', followerId, followingId)

  return { following: true, message: 'Followed successfully' }
}

const getFollowers = async (userId) => {
  const followers = await prisma.follow.findMany({
    where: { followingId: userId },
    include: {
      follower: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })
  return followers.map(f => f.follower)
}

const getFollowing = async (userId) => {
  const following = await prisma.follow.findMany({
    where: { followerId: userId },
    include: {
      following: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })
  return following.map(f => f.following)
}

export { toggleFollow, getFollowers, getFollowing }