import type { Handler } from '@netlify/functions'
import { processContactSubmission, type ContactPayload } from '../../backend/contact.ts'

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { Allow: 'POST, OPTIONS' },
      body: JSON.stringify({ error: 'Method not allowed.' }),
    }
  }

  let body: ContactPayload

  try {
    body = JSON.parse(event.body ?? '{}') as ContactPayload
  } catch {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body.' }),
    }
  }

  const result = await processContactSubmission(body)

  return {
    statusCode: result.status,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(result.body),
  }
}
