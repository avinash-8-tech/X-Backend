import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import { toggleFollow, getFollowers, getFollowing } from '../services/follow.service.js'

const toggleFollowController = asyncHandler(async (req, res) => {
  const followerId = req.user.id
  const { id: followingId } = req.params

  if (followerId === followingId) throw ApiError(400, 'You cannot follow yourself')

  const result = await toggleFollow(followerId, followingId)

  res.json(ApiResponse(200, result, result.message))
})

const getFollowersController = asyncHandler(async (req, res) => {
  const { id } = req.params

  const followers = await getFollowers(id)

  res.json(ApiResponse(200, followers, 'Followers fetched successfully'))
})

const getFollowingController = asyncHandler(async (req, res) => {
  const { id } = req.params

  const following = await getFollowing(id)

  res.json(ApiResponse(200, following, 'Following fetched successfully'))
})

export { toggleFollowController, getFollowersController, getFollowingController }