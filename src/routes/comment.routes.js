import { Router } from 'express'
import {
  createCommentController,
  getTweetCommentsController,
  deleteCommentController
} from '../controllers/comment.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/:id/comment', verifyToken, createCommentController)

router.get('/:id/comments', getTweetCommentsController)

router.delete('/comment/:id', verifyToken, deleteCommentController)

export default router