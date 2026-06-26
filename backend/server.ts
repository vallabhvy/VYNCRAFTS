import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

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
const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL ?? 'team@vyncrafts.com'
const fromEmail = process.env.CONTACT_FROM_EMAIL ?? 'VynCrafts <onboarding@resend.dev>'
const resendApiKey = process.env.RESEND_API_KEY

app.use(cors())
app.use(express.json())

type ContactPayload = {
  name?: string
  email?: string
  business?: string
  description?: string
  budget?: string
}

const businessLabels: Record<string, string> = {
  restaurant: 'Restaurant',
  retail: 'Retail',
  services: 'Services',
  technology: 'Technology',
  other: 'Other',
}

const budgetLabels: Record<string, string> = {
  'under-2k': 'Under $2,000',
  '2k-5k': '$2,000 - $5,000',
  '5k-10k': '$5,000 - $10,000',
  '10k-plus': '$10,000+',
}

function validatePayload(body: ContactPayload) {
  const errors: string[] = []

  if (!body.name?.trim()) errors.push('Name is required.')
  if (!body.email?.trim()) errors.push('Email is required.')
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email)) errors.push('Email is invalid.')
  if (!body.business) errors.push('Business type is required.')
  if (!body.description?.trim() || body.description.trim().length < 12) {
    errors.push('Please provide a longer project description.')
  }
  if (!body.budget) errors.push('Budget range is required.')

  return errors
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function buildEmailHtml(submission: Required<ContactPayload> & { submittedAt: string }) {
  const business = businessLabels[submission.business] ?? submission.business
  const budget = budgetLabels[submission.budget] ?? submission.budget
  const name = escapeHtml(submission.name)
  const email = escapeHtml(submission.email)
  const businessLabel = escapeHtml(business)
  const budgetLabel = escapeHtml(budget)
  const submittedAt = escapeHtml(submission.submittedAt)
  const description = escapeHtml(submission.description).replace(/\n/g, '<br>')

  return `
    <h2>New project inquiry</h2>
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
    <p><strong>Business type:</strong> ${businessLabel}</p>
    <p><strong>Budget:</strong> ${budgetLabel}</p>
    <p><strong>Submitted:</strong> ${submittedAt}</p>
    <h3>Project description</h3>
    <p>${description}</p>
  `
}

async function notifyTeam(submission: Required<ContactPayload> & { submittedAt: string }) {
  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not set. Submission saved locally only.')
    return
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [notifyEmail],
      reply_to: submission.email,
      subject: `New inquiry from ${submission.name.replace(/[\r\n]+/g, ' ').trim()}`,
      html: buildEmailHtml(submission),
    }),
  })

  if (!response.ok) {
    const raw = await response.text()
    const data = (() => {
      try {
        return JSON.parse(raw) as { message?: string }
      } catch {
        return null
      }
    })()
    const message = data?.message ?? (raw || 'Failed to send notification email.')
    console.error('Resend API error:', response.status, message)
    throw new Error(message)
  }
}

app.post('/api/contact', async (req, res) => {
  const errors = validatePayload(req.body)

  if (errors.length > 0) {
    return res.status(400).json({ error: errors[0] })
  }

  const submission = {
    name: req.body.name.trim(),
    email: req.body.email.trim(),
    business: req.body.business,
    description: req.body.description.trim(),
    budget: req.body.budget,
    submittedAt: new Date().toISOString(),
  }

  try {
    const existing = fs.existsSync(submissionsPath)
      ? JSON.parse(fs.readFileSync(submissionsPath, 'utf-8'))
      : []
    existing.push(submission)
    fs.writeFileSync(submissionsPath, JSON.stringify(existing, null, 2))
  } catch {
    console.log('New contact submission:', submission)
  }

  try {
    await notifyTeam(submission)
  } catch (error) {
    console.error('Failed to send notification email:', error)
    const details = error instanceof Error ? error.message : 'Unknown error'
    return res.status(502).json({
      error: 'Your message was received, but we could not send the notification email. Please try WhatsApp or email us directly.',
      details: process.env.NODE_ENV === 'production' ? undefined : details,
    })
  }

  return res.json({ ok: true })
})

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', emailConfigured: Boolean(resendApiKey) })
})

const distPath = path.resolve(backendDir, '..', 'dist')
const distIndex = path.join(distPath, 'index.html')
const shouldServeStatic =
  process.env.SERVE_STATIC === 'true' && fs.existsSync(distIndex)

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
