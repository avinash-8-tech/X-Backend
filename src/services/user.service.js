import { prisma } from '../config/db.js'
import uploadToCloudinary from '../utils/uploadToCloudinary.js'
import cloudinary from '../config/cloudinary.js'

const getUserProfile = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatar: true,
      coverImage: true,
      location: true,
      website: true,
      isVerified: true,
      createdAt: true,
      _count: {
        select: {
          tweets: true,
          followers: true,
          following: true
        }
      }
    }
  })
  return user
}

const updateUserProfile = async (userId, data) => {
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      username: data.username,
      bio: data.bio,
      location: data.location,
      website: data.website
    },
    select: {
      id: true,
      name: true,
      username: true,
      bio: true,
      avatar: true,
      coverImage: true,
      location: true,
      website: true
    }
  })
  return user
}

const updateAvatar = async (userId, file) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (user.avatar) {
    const urlParts = user.avatar.split('/')
    const filename = urlParts[urlParts.length - 1]
    const publicId = `x-backend/avatars/${filename.split('.')[0]}`
    await cloudinary.uploader.destroy(publicId)
  }

  const result = await uploadToCloudinary(
    file.buffer,
    'x-backend/avatars'
  )

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { avatar: result.secure_url },
    select: {
      id: true,
      name: true,
      username: true,
      avatar: true
    }
  })
  return updatedUser
}

const updateCoverImage = async (userId, file) => {
  const user = await prisma.user.findUnique({
    where: { id: userId }
  })

  if (user.coverImage) {
    const urlParts = user.coverImage.split('/')
    const filename = urlParts[urlParts.length - 1]
    const publicId = `x-backend/covers/${filename.split('.')[0]}`
    await cloudinary.uploader.destroy(publicId)
  }

  const result = await uploadToCloudinary(
    file.buffer,
    'x-backend/covers'
  )

  const updatedUser = await prisma.user.update({
    where: { id: userId },
    data: { coverImage: result.secure_url },
    select: {
      id: true,
      name: true,
      username: true,
      coverImage: true
    }
  })
  return updatedUser
}

const getUserTweets = async (username) => {
  const user = await prisma.user.findUnique({
    where: { username }
  })

  if (!user) throw new Error('User not found')

  const tweets = await prisma.tweet.findMany({
    where: {
      authorId: user.id,
      isRetweet: false
    },
    orderBy: { createdAt: 'desc' },
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
          comments: true,
          replies: true
        }
      }
    }
  })
  return tweets
}

export {
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  updateCoverImage,
  getUserTweets
}