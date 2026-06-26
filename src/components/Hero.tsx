import { FadeIn } from './FadeIn'
import { HeroStat, useHeroStatsInView } from './HeroStat'
import { HeroGraphic } from './HeroGraphic'
import { MagneticButton } from './MagneticButton'
import { clientMarks, getWhatsAppLink } from '../data/content'

const whatsappLink = getWhatsAppLink()!

const tickerItems = [
  'WEBSITES',
  'AI SOLUTIONS',
  'DASHBOARDS',
  'AUTOMATIONS',
  'LANDING PAGES',
  'DIGITAL PRODUCTS',
]

const stats = [
  { value:25, suffix: '+', label: 'Projects shipped' },
  { value: 100, suffix: '%', label: 'Client satisfaction' },
  { value: 2, suffix: 'x', label: 'Faster launch cycles' },
  { value: 24, suffix: '/7', label: 'Automation ready' },
]

const headlineLines = [
  { text: 'Websites.', accent: 'text-lime' },
  { text: 'AI Solutions.', accent: 'text-indigo' },
  { text: 'Digital Products.', accent: 'text-coral' },
]

export function Hero() {
  const ticker = [...tickerItems, ...tickerItems].join('  •  ') + '  •  '
  const { ref: statsRef, inView: statsInView } = useHeroStatsInView()

  return (
    <section
      id="home"
      className="relative -mt-[84px] flex flex-col justify-between overflow-x-clip pt-[84px] lg:min-h-[94svh] lg:pt-0"
    >
      {/* Gradient glow backdrops */}
      <div className="glow left-[-10%] top-[-8%] h-[clamp(300px,38vw,560px)] w-[clamp(300px,38vw,560px)] bg-indigo/25 animate-glow-pulse" />
      <div className="glow right-[-6%] top-[10%] h-[clamp(260px,30vw,440px)] w-[clamp(260px,30vw,440px)] bg-lime/12 animate-glow-pulse" />
      <div className="glow bottom-[12%] left-[30%] h-[clamp(220px,26vw,380px)] w-[clamp(220px,26vw,380px)] bg-coral/10" />

      <div className="relative z-10 flex flex-1 items-center lg:pt-[84px]">
        <div className="shell grid w-full items-center gap-12 py-10 lg:grid-cols-[55fr_45fr] lg:gap-12 lg:py-8">
          <div>
            <FadeIn eager>
              <p className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-indigo/30 bg-indigo/10 px-4 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-lime">
                <span className="h-1.5 w-1.5 rounded-full bg-lime shadow-[0_0_10px_#C8FF3E]" />
                Crafting Digital Experiences
              </p>

              <h1 className="hero-title">
                {headlineLines.map((line, i) => (
                  <span
                    key={line.text}
                    className={`block translate-y-5 animate-[heroReveal_0.8s_cubic-bezier(0.16,1,0.3,1)_forwards] opacity-0 ${line.accent}`}
                    style={{ animationDelay: `${120 + i * 110}ms` }}
                  >
                    {line.text}
                  </span>
                ))}
                <span className="mt-3 block text-[clamp(1.6rem,0.6rem+3vw,3.25rem)] font-medium leading-[1.05] text-text/70">
                  Crafted to grow your business.
                </span>
              </h1>

              <p className="mt-7 max-w-xl font-body text-lg leading-relaxed text-muted lg:text-xl">
                VynCrafts designs and develops high-performance digital experiences that turn
                visitors into customers.
              </p>

              <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
                <MagneticButton
                  href={whatsappLink}
                  external
                  ariaLabel="Chat with VynCrafts on WhatsApp"
                  className="group relative overflow-hidden rounded-full bg-indigo px-8 py-4 text-center font-body text-base font-semibold text-text shadow-[0_0_40px_rgba(91,79,255,0.4)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_60px_rgba(91,79,255,0.6)]"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">Chat on WhatsApp</span>
                </MagneticButton>
                <a
                  href="#work"
                  className="group rounded-full border border-white/15 px-8 py-4 text-center font-body text-base font-medium text-text transition-all duration-300 hover:scale-[1.03] hover:border-lime/50 hover:bg-lime/10 hover:text-lime"
                >
                  View Our Work
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">-&gt;</span>
                </a>
              </div>

              <div ref={statsRef} className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                {stats.map((stat) => (
                  <HeroStat key={stat.label} {...stat} inView={statsInView} />
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn eager delay={160} className="hidden lg:block">
            <HeroGraphic />
          </FadeIn>
        </div>
      </div>

      {/* Trust logos */}
      <div className="relative z-10 shell pb-8">
        <FadeIn delay={200}>
          <div className="flex flex-col gap-4 border-t border-border pt-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-soft">
              Trusted by growing businesses
            </span>
            <div className="flex flex-wrap items-center gap-3 sm:gap-4">
              {clientMarks.map((client) => (
                <div
                  key={client.name}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-surface/40 px-4 py-2.5 grayscale transition-all duration-300 hover:grayscale-0 hover:border-white/20 hover:bg-surface/70"
                  title={client.name}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-md bg-indigo/15 font-mono text-[11px] font-bold text-indigo transition-colors group-hover:bg-indigo/25">
                    {client.mark}
                  </span>
                  <span className="font-body text-[13px] text-text/55 transition-colors group-hover:text-text/90">
                    {client.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>

      {/* Marquee ticker */}
      <div className="relative z-10 border-y border-indigo/30 bg-indigo py-4">
        <div className="overflow-hidden">
          <p
            className="animate-ticker whitespace-nowrap font-display text-base font-semibold uppercase tracking-[0.16em] text-lime"
            aria-hidden
          >
            {ticker}
          </p>
        </div>
      </div>
    </section>
  )
}
