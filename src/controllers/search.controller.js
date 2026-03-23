import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { searchUsers, searchTweets } from '../services/search.service.js'

const searchUsersController = asyncHandler(async (req, res) => {
  const { q } = req.query
  const currentUserId = req.user?.id

  if (!q) throw ApiError(400, 'Search query is required')

  const users = await searchUsers(q, currentUserId)

  res.json(ApiResponse(200, users, 'Users fetched successfully'))
})

const searchTweetsController = asyncHandler(async (req, res) => {
  const { q } = req.query

  if (!q) throw ApiError(400, 'Search query is required')

  const tweets = await searchTweets(q)

  res.json(ApiResponse(200, tweets, 'Tweets fetched successfully'))
})

export { searchUsersController, searchTweetsController }