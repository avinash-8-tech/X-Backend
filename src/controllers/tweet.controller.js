import asyncHandler from '../utils/asyncHandler.js'
import Apiresponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import {
  createTweet,
  getTweetById,
  getHomeFeed,
  deleteTweet,
  retweetTweet
} from '../services/tweet.service.js'

const createTweetController = asyncHandler(async (req, res) => {
  const { content } = req.body
  const authorId = req.user.id
  const file = req.file 

  if (!content) throw ApiError(400, 'Content is required')

  const tweet = await createTweet({ content, file, authorId })

  res.status(201).json(Apiresponse(201, tweet, 'Tweet created successfully'))
})

const getTweetController = asyncHandler(async (req, res) => {
  const { id } = req.params

  const tweet = await getTweetById(id)
  if (!tweet) throw ApiError(404, 'Tweet not found')

  res.json(Apiresponse(200, tweet, 'Tweet fetched successfully'))
})

const getHomeFeedController = asyncHandler(async (req, res) => {
  const userId = req.user.id

  const tweets = await getHomeFeed(userId)

  res.json(Apiresponse(200, tweets, 'Feed fetched successfully'))
})

const deleteTweetController = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const result = await deleteTweet(id, userId)

  res.json(Apiresponse(200, result, 'Tweet deleted successfully'))
})

const retweetController = asyncHandler(async (req, res) => {
  const { id } = req.params
  const userId = req.user.id

  const result = await retweetTweet(id, userId)

  res.json(Apiresponse(200, result, 'Retweet successful'))
})

export {
  createTweetController,
  getTweetController,
  getHomeFeedController,
  deleteTweetController,
  retweetController
}