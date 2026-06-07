import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const prisma = new PrismaClient()

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ limit: '50mb', extended: true }))

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' })
})

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, name, password } = req.body
    res.json({ message: 'Register endpoint' })
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body
    res.json({ message: 'Login endpoint' })
  } catch (error) {
    res.status(500).json({ error: 'Login failed' })
  }
})

// Project routes
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await prisma.project.findMany()
    res.json(projects)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' })
  }
})

app.post('/api/projects', async (req, res) => {
  try {
    const { name, userId } = req.body
    const project = await prisma.project.create({
      data: { name, userId }
    })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' })
  }
})

app.get('/api/projects/:id', async (req, res) => {
  try {
    const { id } = req.params
    const project = await prisma.project.findUnique({
      where: { id },
      include: { elements: true, exports: true }
    })
    res.json(project)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' })
  }
})

// Image analysis route
app.post('/api/projects/:id/analyze', async (req, res) => {
  try {
    const { id } = req.params
    res.json({ message: 'Analysis endpoint' })
  } catch (error) {
    res.status(500).json({ error: 'Analysis failed' })
  }
})

// Export routes
app.post('/api/projects/:id/export', async (req, res) => {
  try {
    const { id } = req.params
    const { format } = req.body
    res.json({ message: `Export to ${format}` })
  } catch (error) {
    res.status(500).json({ error: 'Export failed' })
  }
})

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err)
  res.status(500).json({ error: 'Internal server error' })
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
