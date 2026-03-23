import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { sendMessage, getConversation, getConversationList } from '../services/message.service.js'

const sendMessageController = asyncHandler(async (req, res) => {
  const senderId = req.user.id
  const { id: receiverId } = req.params
  const { content } = req.body

  if (!content) throw ApiError(400, 'Message content is required')
  if (senderId === receiverId) throw ApiError(400, 'Cannot send message to yourself')

  const message = await sendMessage(senderId, receiverId, content)

  res.status(201).json(ApiResponse(201, message, 'Message sent successfully'))
})

const getConversationController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { id: otherUserId } = req.params

  const messages = await getConversation(userId, otherUserId)

  res.json(ApiResponse(200, messages, 'Conversation fetched successfully'))
})

const getConversationListController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const conversations = await getConversationList(userId)

  res.json(ApiResponse(200, conversations, 'Conversations fetched successfully'))
})

export {
  sendMessageController,
  getConversationController,
  getConversationListController
}