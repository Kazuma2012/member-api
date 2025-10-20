<!-- routes/userRoutes.js -->
<script type="module">
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

// 認証が必要なルートは verifyToken ミドルウェアを通す
router.get('/users/:id', verifyToken, getUser)
router.put('/users/:id', verifyToken, updateUser)
router.delete('/users/:id', verifyToken, deleteUser)

export default router
</script>
