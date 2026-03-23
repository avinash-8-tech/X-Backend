import { prisma } from '../config/db.js'

const sendMessage = async (senderId, receiverId, content) => {
  const message = await prisma.message.create({
    data: {
      content,
      senderId,
      receiverId
    },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })
  return message
}

const getConversation = async (userId, otherUserId) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId, receiverId: otherUserId },
        { senderId: otherUserId, receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'asc' },
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

  await prisma.message.updateMany({
    where: {
      senderId: otherUserId,
      receiverId: userId,
      read: false
    },
    data: { read: true }
  })

  return messages
}

const getConversationList = async (userId) => {
  const messages = await prisma.message.findMany({
    where: {
      OR: [
        { senderId: userId },
        { receiverId: userId }
      ]
    },
    orderBy: { createdAt: 'desc' },
    include: {
      sender: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      },
      receiver: {
        select: {
          id: true,
          name: true,
          username: true,
          avatar: true
        }
      }
    }
  })

  const conversations = {}
  messages.forEach(msg => {
    const otherUser = msg.senderId === userId ? msg.receiver : msg.sender
    if (!conversations[otherUser.id]) {
      conversations[otherUser.id] = {
        user: otherUser,
        lastMessage: msg,
        unreadCount: 0
      }
    }
    if (!msg.read && msg.receiverId === userId) {
      conversations[otherUser.id].unreadCount++
    }
  })

  return Object.values(conversations)
}

export { sendMessage, getConversation, getConversationList }