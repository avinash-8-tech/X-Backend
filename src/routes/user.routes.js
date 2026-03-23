import { Router } from 'express'
import {
  getUserProfileController,
  updateUserProfileController,
  updateAvatarController,
  updateCoverImageController,
  getUserTweetsController
} from '../controllers/user.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'
import upload from '../middlewares/upload.middleware.js'

const router = Router()

// Public routes
router.get('/:username', getUserProfileController)
router.get('/:username/tweets', getUserTweetsController)

// Protected routes
router.put('/profile/update', verifyToken, updateUserProfileController)
router.put('/profile/avatar', verifyToken, upload.single('avatar'), updateAvatarController)
router.put('/profile/cover', verifyToken, upload.single('cover'), updateCoverImageController)

export default router