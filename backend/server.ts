import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { processContactSubmission, validatePayload, type ContactPayload } from './contact.ts'

const backendDir = path.dirname(fileURLToPath(import.meta.url))

function loadEnv() {
  const envPath = path.join(backendDir, '.env')
  if (!fs.existsSync(envPath)) return

  for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue

    const separatorIndex = trimmed.indexOf('=')
    if (separatorIndex === -1) continue

    const key = trimmed.slice(0, separatorIndex).trim()
    const value = trimmed
      .slice(separatorIndex + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '')

    if (key && !process.env[key]) {
      process.env[key] = value
    }
  }

  if (process.env.RESEND_SKIP_TLS_VERIFY === 'true') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  }
}

loadEnv()

if (process.env.RESEND_SKIP_TLS_VERIFY === 'true') {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'
  console.warn('RESEND_SKIP_TLS_VERIFY is enabled. Use only for local development.')
}

const app = express()
const PORT = Number(process.env.PORT) || 5000
const submissionsPath = path.join(backendDir, 'submissions.json')
const resendApiKey = process.env.RESEND_API_KEY
const distPath = path.resolve(backendDir, '..', 'dist')
const distIndex = path.join(distPath, 'index.html')
const shouldServeStatic =
  process.env.SERVE_STATIC === 'true' && fs.existsSync(distIndex)
const allowedOrigins =
  process.env.ALLOWED_ORIGIN?.split(',').map((origin) => origin.trim()).filter(Boolean) ?? []

app.set('trust proxy', 1)

if (allowedOrigins.length > 0) {
  app.use(cors({ origin: allowedOrigins, methods: ['GET', 'POST'] }))
} else if (!shouldServeStatic) {
  app.use(cors())
}

app.use(express.json({ limit: '32kb' }))

const contactRateLimit = new Map<string, { count: number; resetAt: number }>()
const CONTACT_RATE_LIMIT = 5
const CONTACT_RATE_WINDOW_MS = 60 * 60 * 1000

function isContactRateLimited(ip: string) {
  const now = Date.now()
  const entry = contactRateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    contactRateLimit.set(ip, { count: 1, resetAt: now + CONTACT_RATE_WINDOW_MS })
    return false
  }

  entry.count += 1
  return entry.count > CONTACT_RATE_LIMIT
}

function saveSubmissionLocally(submission: ContactPayload & { submittedAt: string }) {
  try {
    const existing = fs.existsSync(submissionsPath)
      ? JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'))
      : []
    existing.push(submission)
    fs.writeFileSync(submissionsPath, JSON.stringify(existing, null, 2))
  } catch {
    console.log('New contact submission:', submission)
  }
}

app.post('/api/contact', async (req, res) => {
  const clientIp = req.ip || 'unknown'

  if (isContactRateLimited(clientIp)) {
    return res.status(429).json({
      error: 'Too many submissions. Please try again later or contact us on WhatsApp.',
    })
  }

  const body = req.body as ContactPayload
  const errors = validatePayload(body)

  if (errors.length === 0) {
    saveSubmissionLocally({
      name: body.name!.trim(),
      email: body.email!.trim(),
      business: body.business!,
      description: body.description!.trim(),
      budget: body.budget!,
      submittedAt: new Date().toISOString(),
    })
  }

  const result = await processContactSubmission(body)
  return res.status(result.status).json(result.body)
})

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    emailConfigured: Boolean(resendApiKey),
    staticEnabled: shouldServeStatic,
  })
})

if (shouldServeStatic) {
  app.use(express.static(distPath, { index: false, maxAge: '1y', immutable: true }))
  app.get(/^(?!\/api).*/, (_req, res) => {
    res.sendFile(distIndex)
  })
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  if (shouldServeStatic) {
    console.log('Serving production build from dist/')
  }
  if (!resendApiKey) {
    console.warn('Set RESEND_API_KEY in backend/.env to email team@vyncrafts.com on new submissions.')
  }
})
