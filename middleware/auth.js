<!-- middleware/auth.js -->
<script type="module">
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization
  if (!authHeader) return res.status(401).json({ message: '認証トークンがない' })

  const token = authHeader.split(' ')[1]
  if (!token) return res.status(401).json({ message: '認証トークンが不正' })

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.userId = decoded.id
    next()
  } catch (err) {
    return res.status(401).json({ message: 'トークンが無効または期限切れ' })
  }
}
</script>
