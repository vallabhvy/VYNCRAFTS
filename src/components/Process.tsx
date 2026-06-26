import { processSteps } from '../data/content'
import { FadeIn } from './FadeIn'

export function Process() {
  return (
    <section id="process" className="section-pad scroll-mt-24 bg-indigo">
      <div className="shell">
        <FadeIn>
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-lime">
            Process
          </p>
          <h2 className="section-title mt-4">
            From idea to launch in weeks, not months.
          </h2>
          <p className="mt-5 max-w-2xl font-body text-lg leading-relaxed text-text/82">
            Six focused stages keep the work structured, transparent and easy to move through.
          </p>
        </FadeIn>

        <div className="relative mt-10 sm:mt-16">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-lime via-white/40 to-coral md:block" />

          <div className="grid gap-4 sm:gap-5">
            {processSteps.map((step, i) => (
              <FadeIn key={step.title} delay={i * 80}>
                <article className="group relative grid gap-3 rounded-xl border border-white/10 bg-white/[0.06] p-4 backdrop-blur transition-all duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.1] sm:gap-5 sm:p-5 md:grid-cols-[120px_1fr] md:p-6 md:pl-16">
                  <div className="absolute left-0 top-6 hidden -translate-x-1/2 md:block">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-bg/80 font-mono text-[11px] font-bold text-lime shadow-[0_0_30px_rgba(200,255,62,0.2)]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 md:block">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 bg-bg/80 font-mono text-[10px] font-bold text-lime md:hidden">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <p className="hidden font-mono text-sm font-bold text-lime/80 md:block">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-display text-xl text-text sm:text-2xl">{step.title}</h3>
                    <p className="mt-3 max-w-3xl font-body text-sm leading-7 text-text/70">
                      {step.description}
                    </p>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
