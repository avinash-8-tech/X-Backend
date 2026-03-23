import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import {
  getUserProfile,
  updateUserProfile,
  updateAvatar,
  updateCoverImage,
  getUserTweets
} from '../services/user.service.js'

const getUserProfileController = asyncHandler(async (req, res) => {
  const { username } = req.params

  const user = await getUserProfile(username)
  if (!user) throw ApiError(404, 'User not found')

  res.json(ApiResponse(200, user, 'Profile fetched successfully'))
})

const updateUserProfileController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { name, username, bio, location, website } = req.body

  const user = await updateUserProfile(userId, {
    name, username, bio, location, website
  })

  res.json(ApiResponse(200, user, 'Profile updated successfully'))
})

const updateAvatarController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const file = req.file

  if (!file) throw ApiError(400, 'Image is required')

  const user = await updateAvatar(userId, file)

  res.json(ApiResponse(200, user, 'Avatar updated successfully'))
})

const updateCoverImageController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const file = req.file

  if (!file) throw ApiError(400, 'Image is required')

  const user = await updateCoverImage(userId, file)

  res.json(ApiResponse(200, user, 'Cover image updated successfully'))
})

const getUserTweetsController = asyncHandler(async (req, res) => {
  const { username } = req.params

  const tweets = await getUserTweets(username)

  res.json(ApiResponse(200, tweets, 'User tweets fetched successfully'))
})

export {
  getUserProfileController,
  updateUserProfileController,
  updateAvatarController,
  updateCoverImageController,
  getUserTweetsController
}