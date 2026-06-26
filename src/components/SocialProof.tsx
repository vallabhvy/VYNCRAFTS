import { memo, useEffect, useState } from 'react'
import { testimonials } from '../data/content'
import { FadeIn } from './FadeIn'

function getCompanyName(business: string) {
  return business.split(' - ')[0]
}

const accents = ['#5B4EFE', '#C8FF3E', '#F56B4A']

const TestimonialCard = memo(function TestimonialCard({
  testimonial,
  accent,
}: {
  testimonial: (typeof testimonials)[number]
  accent: string
}) {
  return (
    <blockquote
      className="group relative h-full overflow-hidden rounded-xl border border-border bg-white/[0.045] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)] hover:bg-white/[0.065] sm:p-6"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent opacity-70" />
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt=""
          className="h-12 w-12 rounded-full border border-white/10 object-cover shadow-[0_0_30px_rgba(91,79,255,0.18)]"
          aria-hidden="true"
        />
        <cite className="not-italic">
          <p className="font-body text-base font-semibold text-text">{testimonial.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-wider text-muted">
            {getCompanyName(testimonial.business)}
          </p>
        </cite>
      </div>
      <p className="mt-7 font-body text-[15px] leading-7 text-text/78">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </blockquote>
  )
})

export function SocialProof() {
  const items = testimonials.slice(0, 3)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 640px)')
    if (mq.matches) return

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % items.length)
    }, 5000)

    return () => window.clearInterval(timer)
  }, [items.length])

  return (
    <section
      className="section-pad relative overflow-hidden border-y border-border/80"
      aria-labelledby="testimonials-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,79,255,0.14),transparent_34%)]" />
      <div className="shell relative">
        <FadeIn>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-indigo">
            Testimonials
          </p>
          <h2 id="testimonials-heading" className="section-title mt-4 lg:text-[3.25rem]">
            Clients trust us to make digital feel effortless.
          </h2>
        </FadeIn>

        <div className="mt-10 hidden gap-5 sm:mt-14 sm:grid sm:grid-cols-2 lg:grid-cols-3">
          {items.map((testimonial, i) => (
            <FadeIn key={testimonial.name} delay={i * 90}>
              <TestimonialCard testimonial={testimonial} accent={accents[i]} />
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 sm:hidden">
          <TestimonialCard testimonial={items[activeIndex]} accent={accents[activeIndex]} />
          <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                role="tab"
                aria-selected={activeIndex === i}
                aria-label={`Show testimonial from ${item.name}`}
                onClick={() => setActiveIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeIndex === i ? 'w-6 bg-indigo' : 'w-2 bg-border'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
