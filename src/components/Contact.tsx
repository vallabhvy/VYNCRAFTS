import { FormEvent, memo, useState, type ReactNode } from 'react'
import { contactLinks, getWhatsAppLink } from '../data/content'
import { submitContact } from '../lib/submitContact'
import { useMagnetic } from '../hooks/useMagnetic'
import { FadeIn } from './FadeIn'

const whatsappLink = getWhatsAppLink()

const contactChips = [
  ...(whatsappLink
    ? [{ label: 'Chat on WhatsApp', href: whatsappLink, color: '#F56B4A', external: true as const }]
    : []),
  { label: contactLinks.email, href: `mailto:${contactLinks.email}`, color: '#5B4EFE', external: false as const },
]

type FormValues = {
  name: string
  email: string
  business: string
  description: string
  budget: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>

const initialValues: FormValues = {
  name: '',
  email: '',
  business: '',
  description: '',
  budget: '',
}

function validate(values: FormValues) {
  const errors: FormErrors = {}

  if (!values.name.trim()) errors.name = 'Please enter your name.'
  if (!values.email.trim()) {
    errors.email = 'Please enter your email.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Please enter a valid email address.'
  }
  if (!values.business) errors.business = 'Please choose a business type.'
  if (values.description.trim().length < 12) {
    errors.description = 'Tell us a little more about the project.'
  }
  if (!values.budget) errors.budget = 'Please choose a budget range.'

  return errors
}

const FloatingField = memo(function FloatingField({
  id,
  label,
  value,
  error,
  onChange,
  type = 'text',
  required = true,
  as = 'input',
  children,
}: {
  id: keyof FormValues
  label: string
  value: string
  error?: string
  onChange: (id: keyof FormValues, value: string) => void
  type?: string
  required?: boolean
  as?: 'input' | 'textarea' | 'select'
  children?: ReactNode
}) {
  const [focused, setFocused] = useState(false)
  const isSelect = as === 'select'
  const isActive = focused || value !== '' || isSelect

  const baseClasses =
    'peer w-full rounded-lg border bg-surface/80 px-4 pt-6 pb-2 font-body outline-none transition-all focus:border-indigo focus:ring-2 focus:ring-indigo/35'

  const valueClasses = isSelect && value === '' ? 'text-muted' : 'text-text'
  const selectClasses = isSelect
    ? 'appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-10 [background-image:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2024%2024%22%20fill%3D%22none%22%20stroke%3D%22%2388889A%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22m6%209%206%206%206-6%22/%3E%3C/svg%3E")]'
    : ''

  const labelClasses = `pointer-events-none absolute left-4 transition-all duration-200 font-body ${
    isActive ? 'top-2 text-[10px] text-indigo' : 'top-4 text-sm text-muted'
  }`

  const handlers = {
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      onChange(id, e.target.value)
    },
  }

  return (
    <div className="relative">
      <label htmlFor={id} className={labelClasses}>
        {label}
      </label>
      {as === 'textarea' ? (
        <textarea
          id={id}
          name={id}
          value={value}
          rows={5}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseClasses} text-text resize-none ${error ? 'border-coral' : 'border-border'}`}
          {...handlers}
        />
      ) : as === 'select' ? (
        <select
          id={id}
          name={id}
          value={value}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseClasses} ${valueClasses} ${selectClasses} ${error ? 'border-coral' : 'border-border'}`}
          {...handlers}
        >
          {children}
        </select>
      ) : (
        <input
          id={id}
          name={id}
          value={value}
          type={type}
          required={required}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${baseClasses} text-text ${error ? 'border-coral' : 'border-border'}`}
          {...handlers}
        />
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 font-body text-xs text-coral" role="alert">
          {error}
        </p>
      )}
    </div>
  )
})

export function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const { ref: magneticRef, onMouseMove, onMouseLeave } = useMagnetic(0.22, 1.02)

  function updateField(id: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [id]: value }))
    if (errors[id]) {
      setErrors((current) => ({ ...current, [id]: undefined }))
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    setSubmitError('')

    if (Object.keys(nextErrors).length > 0) return

    setLoading(true)
    try {
      await submitContact(values)
      setSubmitted(true)
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-pad relative scroll-mt-24 overflow-hidden" aria-labelledby="contact-heading">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(91,79,255,0.12),transparent_50%)]" />
      <div className="shell relative grid gap-12 sm:gap-16 lg:grid-cols-2 lg:gap-20">
        <FadeIn>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-indigo">
            Contact
          </p>
          <h2 id="contact-heading" className="section-title mt-4 lg:text-[3.25rem]">
            Let&apos;s build something together.
          </h2>
          <p className="mt-4 max-w-xl font-body text-sm leading-7 text-muted sm:text-base">
            Tell us what you need. We&apos;ll reply to your email with a practical next step, clear scope
            and a build path that respects your timeline.
          </p>
          <div className="mt-8 flex flex-col gap-2.5 sm:mt-10 sm:gap-3">
            {contactChips.map((chip) => (
              <a
                key={chip.label}
                href={chip.href}
                target={chip.external ? '_blank' : undefined}
                rel={chip.external ? 'noopener noreferrer' : undefined}
                className="rounded-lg border border-border bg-surface/45 px-4 py-3 font-body text-sm text-text/90 transition-all duration-300 active:scale-[0.99] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--chip)_8%,transparent)]"
                style={
                  {
                    '--chip': chip.color,
                    borderLeftWidth: '3px',
                    borderLeftColor: chip.color,
                  } as React.CSSProperties
                }
              >
                {chip.label}
              </a>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {submitted ? (
            <div className="rounded-xl border border-indigo/40 bg-surface/80 p-8 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur" role="status">
              <p className="font-display text-2xl text-text">Message received.</p>
              <p className="mt-3 font-body text-sm leading-7 text-muted">
                Thanks, {values.name || 'there'}. We&apos;ll review the details and reply to{' '}
                {values.email || 'your email'} within one business day.
              </p>
              <button
                type="button"
                className="mt-6 rounded-full border border-border px-5 py-3 font-body text-sm text-text transition-all hover:border-lime/50 hover:text-lime"
                onClick={() => {
                  setValues(initialValues)
                  setSubmitted(false)
                }}
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-xl border border-indigo/20 bg-gradient-to-br from-indigo/[0.08] via-white/[0.03] to-transparent p-4 shadow-[0_24px_80px_rgba(0,0,0,0.24)] backdrop-blur sm:p-6"
              noValidate
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <FloatingField
                  id="name"
                  label="Name"
                  value={values.name}
                  error={errors.name}
                  onChange={updateField}
                />
                <FloatingField
                  id="email"
                  label="Email"
                  type="email"
                  value={values.email}
                  error={errors.email}
                  onChange={updateField}
                />
              </div>
              <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-2 sm:gap-5">
                <FloatingField
                  id="business"
                  label="Business Type"
                  as="select"
                  value={values.business}
                  error={errors.business}
                  onChange={updateField}
                >
                  <option value="">Select one</option>
                  <option value="restaurant">Restaurant</option>
                  <option value="retail">Retail</option>
                  <option value="services">Services</option>
                  <option value="technology">Technology</option>
                  <option value="other">Other</option>
                </FloatingField>
                <FloatingField
                  id="budget"
                  label="Budget Range"
                  as="select"
                  value={values.budget}
                  error={errors.budget}
                  onChange={updateField}
                >
                  <option value="">Select range</option>
                  <option value="under-2k">Under $2,000</option>
                  <option value="2k-5k">$2,000 - $5,000</option>
                  <option value="5k-10k">$5,000 - $10,000</option>
                  <option value="10k-plus">$10,000+</option>
                </FloatingField>
              </div>
              <div className="mt-4 sm:mt-5">
                <FloatingField
                  id="description"
                  label="Project Description"
                  as="textarea"
                  value={values.description}
                  error={errors.description}
                  onChange={updateField}
                />
              </div>
              {submitError && (
                <p className="mt-4 font-body text-sm text-coral" role="alert">
                  {submitError}
                </p>
              )}
              <button
                ref={magneticRef as React.RefObject<HTMLButtonElement>}
                type="submit"
                disabled={loading}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="magnetic-btn group relative mt-5 w-full overflow-hidden rounded-full bg-indigo py-3.5 font-body text-sm font-semibold text-text shadow-[0_0_36px_rgba(91,79,255,0.28)] transition-all duration-200 hover:brightness-110 active:scale-[0.99] disabled:translate-y-0 disabled:cursor-wait disabled:opacity-70 sm:mt-6 sm:py-4"
                aria-label="Send project inquiry to VynCrafts"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          )}
        </FadeIn>
      </div>
    </section>
  )
}
