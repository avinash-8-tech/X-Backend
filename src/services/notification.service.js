import { prisma } from '../config/db.js'

const createNotification = async (type, senderId, receiverId, tweetId = null) => {
  if (senderId === receiverId) return

  await prisma.notification.create({
    data: {
      type,
      senderId,
      receiverId,
      tweetId
    }
  })
}

const getNotifications = async (userId) => {
  const notifications = await prisma.notification.findMany({
    where: { receiverId: userId },
    orderBy: { createdAt: 'desc' },
    take: 20,
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })
  return notifications
}

const markAsRead = async (userId) => {
  await prisma.notification.updateMany({
    where: {
      receiverId: userId,
      read: false
    },
    data: { read: true }
  })
  return { message: 'All notifications marked as read' }
}

const getUnreadCount = async (userId) => {
  const count = await prisma.notification.count({
    where: {
      receiverId: userId,
      read: false
    }
  })
  return { count }
}

export {
  createNotification,
  getNotifications,
  markAsRead,
  getUnreadCount
}