import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import {
  getNotifications,
  markAsRead,
  getUnreadCount
} from '../services/notification.service.js'

const getNotificationsController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const notifications = await getNotifications(userId)

  res.json(ApiResponse(200, notifications, 'Notifications fetched successfully'))
})

const markAsReadController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const result = await markAsRead(userId)

  res.json(ApiResponse(200, result, 'Notifications marked as read'))
})

const getUnreadCountController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const count = await getUnreadCount(userId)

  res.json(ApiResponse(200, count, 'Unread count fetched'))
})

export {
  getNotificationsController,
  markAsReadController,
  getUnreadCountController
}