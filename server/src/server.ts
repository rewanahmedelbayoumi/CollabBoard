import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(
  cors({
    origin: 'http://localhost:5180',
  }),
)

app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    message: 'CollabBoard API is running',
  })
})

app.use('/auth', authRoutes)

app.listen(PORT, () => {
  console.log(
    `CollabBoard API running on http://localhost:${PORT}`,
  )
})