import { Router } from 'express'
import {
  getNotificationsController,
  markAsReadController,
  getUnreadCountController
} from '../controllers/notification.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', verifyToken, getNotificationsController)
router.put('/read', verifyToken, markAsReadController)
router.get('/unread', verifyToken, getUnreadCountController)

export default router