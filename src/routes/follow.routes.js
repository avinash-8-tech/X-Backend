import { Router } from 'express'
import {
  toggleFollowController,
  getFollowersController,
  getFollowingController
} from '../controllers/follow.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.post('/:id/toggle', verifyToken, toggleFollowController)
router.get('/:id/followers', getFollowersController)
router.get('/:id/following', getFollowingController)

export default router