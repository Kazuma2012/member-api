import express from 'express'
import {
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)

router.get('/users/:id', verifyToken, getUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)

export default router
