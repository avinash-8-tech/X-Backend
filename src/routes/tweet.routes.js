import { Router } from 'express'
import {
  createTweetController,
  getTweetController,
  getHomeFeedController,
  deleteTweetController,
  retweetController
} from '../controllers/tweet.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'

const router = Router()

router.get('/feed/home', verifyToken, getHomeFeedController)
router.get('/:id', getTweetController)
router.post('/', verifyToken, upload.single('media'), createTweetController)
router.delete('/:id', verifyToken, deleteTweetController)
router.post('/:id/retweet', verifyToken, retweetController)

export default router