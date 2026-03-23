import { Router } from 'express'
import {
  searchUsersController,
  searchTweetsController
} from '../controllers/search.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/users', verifyToken, searchUsersController)
router.get('/tweets', searchTweetsController)

export default router