import {
  IconBriefcase,
  IconChartBar,
  IconCode,
  IconLayout,
  IconMessageChatbot,
  IconRobot,
} from '@tabler/icons-react'
import { services } from '../data/content'
import { FadeIn } from './FadeIn'

const iconMap = {
  code: IconCode,
  message: IconMessageChatbot,
  automation: IconRobot,
  chart: IconChartBar,
  layout: IconLayout,
  briefcase: IconBriefcase,
} as const

const accents = ['#5B4EFE', '#C8FF3E', '#F56B4A', '#8579A5', '#5B4EFE', '#C8FF3E']

const cardTints = [
  'bg-surface',
  'bg-[#14141C]',
  'bg-surface',
  'bg-[#121218]',
  'bg-surface',
  'bg-[#14141C]',
]

export function Services() {
  return (
    <section id="services" className="section-pad relative scroll-mt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_50%,rgba(200,255,62,0.05),transparent_50%)]" />
      <div className="shell relative">
        <FadeIn>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-indigo">
            Services
          </p>
          <h2 className="section-title mt-4">What VynCrafts builds.</h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted">
            Modern websites, AI solutions, dashboards and automation systems for businesses that
            need digital work to create real momentum.
          </p>
        </FadeIn>

        <div className="mt-10 grid auto-rows-fr grid-cols-1 gap-4 sm:mt-14 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            const accent = accents[i]
            const spanClass = service.featured
              ? 'sm:col-span-2'
              : service.wide
                ? 'lg:col-span-2'
                : ''

            return (
              <FadeIn key={service.title} delay={i * 70} className={spanClass}>
                <article
                  className="group relative h-full overflow-hidden rounded-xl border border-border p-[1px] transition-all duration-500 hover:-translate-y-1 hover:border-transparent hover:shadow-[0_24px_60px_rgba(0,0,0,0.32)]"
                  style={{ '--accent': accent } as React.CSSProperties}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent)]/45 via-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <div
                    className={`relative flex h-full flex-col rounded-[11px] p-5 sm:p-6 lg:p-7 ${cardTints[i]} ${
                      service.featured ? 'sm:flex-row sm:items-center sm:gap-8' : ''
                    }`}
                  >
                    <div className={service.featured ? 'sm:shrink-0' : ''}>
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] transition-all duration-300 group-hover:scale-105 group-hover:border-[var(--accent)]/60 sm:h-12 sm:w-12">
                        <Icon size={23} stroke={1.5} style={{ color: accent }} />
                      </div>
                      {service.featured && (
                        <span className="mt-4 inline-block rounded-full border border-lime/30 bg-lime/10 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-lime">
                          Most popular
                        </span>
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <h3 className="mt-5 font-display text-xl font-medium leading-tight text-text sm:mt-6 sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-3 flex-1 font-body text-sm leading-7 text-muted">
                        {service.description}
                      </p>
                      <span className="mt-6 h-px w-full bg-gradient-to-r from-[var(--accent)]/70 to-transparent opacity-40 transition-opacity group-hover:opacity-100" />
                    </div>
                  </div>
                </article>
              </FadeIn>
            )
          })}
        </div>
      </div>
    </section>
  )
}
