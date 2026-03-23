import { Router } from 'express'
import {
  toggleLikeController,
  getTweetLikesController
} from '../controllers/like.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/:id/toggle', verifyToken, toggleLikeController)
router.get('/:id/likes', getTweetLikesController)

export default router