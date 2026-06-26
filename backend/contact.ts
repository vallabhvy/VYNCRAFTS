export type ContactPayload = {
  name?: string
  email?: string
  business?: string
  description?: string
  budget?: string
}

export type ContactSubmission = Required<ContactPayload> & { submittedAt: string }

// Dynamic access prevents Netlify's bundler from inlining secrets at build time.
function env(name: string): string | undefined {
  return process.env[name]
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

export function validatePayload(body: ContactPayload) {
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

function buildEmailHtml(submission: ContactSubmission) {
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

async function notifyTeam(submission: ContactSubmission) {
  const resendApiKey = env('RESEND_API_KEY')
  const notifyEmail = env('CONTACT_NOTIFY_EMAIL') ?? 'team@vyncrafts.com'
  const fromEmail = env('CONTACT_FROM_EMAIL') ?? 'VynCrafts <onboarding@resend.dev>'

  if (!resendApiKey) {
    console.warn('RESEND_API_KEY is not set. Submission logged only.')
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

export type ContactResult = {
  status: number
  body: Record<string, unknown>
}

export async function processContactSubmission(body: ContactPayload): Promise<ContactResult> {
  const errors = validatePayload(body)

  if (errors.length > 0) {
    return { status: 400, body: { error: errors[0] } }
  }

  const submission: ContactSubmission = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    business: body.business!,
    description: body.description!.trim(),
    budget: body.budget!,
    submittedAt: new Date().toISOString(),
  }

  console.log('New contact submission:', submission)

  try {
    await notifyTeam(submission)
  } catch (error) {
    console.error('Failed to send notification email:', error)
    const details = error instanceof Error ? error.message : 'Unknown error'
    return {
      status: 502,
      body: {
        error:
          'Your message was received, but we could not send the notification email. Please try WhatsApp or email us directly.',
        details: env('NODE_ENV') === 'production' ? undefined : details,
      },
    }
  }

  return { status: 200, body: { ok: true } }
}
