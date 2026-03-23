import asyncHandler from '../utils/asyncHandler.js'
import ApiResponse from '../utils/ApiResponse.js'
import ApiError from '../utils/ApiError.js'
import {
  createComment,
  getTweetComments,
  deleteComment
} from '../services/comment.service.js'

const createCommentController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { id: tweetId } = req.params
  const { content } = req.body

  if (!content) throw ApiError(400, 'Content is required')

  const comment = await createComment(userId, tweetId, content)

  res.status(201).json(ApiResponse(201, comment, 'Comment created successfully'))
})

const getTweetCommentsController = asyncHandler(async (req, res) => {
  const { id: tweetId } = req.params

  const comments = await getTweetComments(tweetId)

  res.json(ApiResponse(200, comments, 'Comments fetched successfully'))
})

const deleteCommentController = asyncHandler(async (req, res) => {
  const userId = req.user.id
  const { id: commentId } = req.params

  const result = await deleteComment(commentId, userId)

  res.json(ApiResponse(200, result, 'Comment deleted successfully'))
})

export {
  createCommentController,
  getTweetCommentsController,
  deleteCommentController
}