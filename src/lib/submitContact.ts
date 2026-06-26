export type ContactSubmission = {
  name: string
  email: string
  business: string
  description: string
  budget: string
}

export async function submitContact(values: ContactSubmission) {
  const apiUrl = import.meta.env.VITE_CONTACT_API_URL ?? '/api/contact'

  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  })

  if (!response.ok) {
    const data = (await response.json().catch(() => null)) as { error?: string } | null
    throw new Error(data?.error ?? 'Something went wrong. Please try again.')
  }
}
