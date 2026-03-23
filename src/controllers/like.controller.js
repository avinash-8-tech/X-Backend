import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { toggleLike, getTweetLikes } from '../services/like.service.js'

const toggleLikeController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { id: tweetId } = req.params

  const result = await toggleLike(userId, tweetId)

  res.json(ApiResponse(200, result, result.message))
})

const getTweetLikesController = asyncHandler(async (req, res) => {
  const { id: tweetId } = req.params

  const likes = await getTweetLikes(tweetId)

  res.json(ApiResponse(200, likes, 'Likes fetched successfully'))
})

export { toggleLikeController, getTweetLikesController }