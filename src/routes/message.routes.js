import { Router } from 'express'
import {
  sendMessageController,
  getConversationController,
  getConversationListController
} from '../controllers/message.controller.js'
import verifyToken from '../middlewares/auth.middleware.js'

const router = Router()

router.get('/', verifyToken, getConversationListController)
router.get('/:id', verifyToken, getConversationController)
router.post('/:id', verifyToken, sendMessageController)

export default router