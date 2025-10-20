<!-- server.js -->
<script type="module">
import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

// static frontend
app.use(express.static('public'))

// api routes
app.use('/api', userRoutes)

// Render や他 PaaS では process.env.PORT が割り当てられる
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`))
</script>
