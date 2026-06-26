import { teamBySeniority } from '../data/content'
import { FadeIn } from './FadeIn'

type Member = (typeof teamBySeniority)[number]

// Subtle leadership hierarchy — glow strength only, no flashy badges.
const tierGlow: Record<Member['tier'], string> = {
  founder: 'opacity-60 blur-[44px]',
  cofounder: 'opacity-40 blur-[40px]',
  core: 'opacity-20 blur-[36px]',
}

const tierBorder: Record<Member['tier'], string> = {
  founder: 'border-[color-mix(in_srgb,var(--c)_45%,transparent)]',
  cofounder: 'border-[color-mix(in_srgb,var(--c)_28%,transparent)]',
  core: 'border-white/[0.1]',
}

function TeamCard({ member }: { member: Member }) {
  return (
    <div
      className={`group relative flex flex-col items-center overflow-hidden rounded-3xl border bg-surface/50 px-6 py-9 text-center backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-[var(--c)] hover:bg-surface/75 hover:shadow-[0_24px_60px_color-mix(in_srgb,var(--c)_22%,transparent)] ${tierBorder[member.tier]}`}
      style={{ '--c': member.color } as React.CSSProperties}
    >
      {/* Accent glow — strength scales with seniority */}
      <div
        className={`pointer-events-none absolute -top-6 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full transition-opacity duration-300 group-hover:opacity-80 ${tierGlow[member.tier]}`}
        style={{ background: member.color }}
        aria-hidden="true"
      />

      <div className="relative">
        <span
          className="absolute inset-0 -z-10 rounded-full opacity-40 blur-xl"
          style={{ background: member.color }}
          aria-hidden="true"
        />
        <img
          src={member.avatar}
          alt={member.name}
          className="h-24 w-24 rounded-full border border-white/15 transition-transform duration-300 group-hover:scale-105 lg:h-28 lg:w-28"
        />
      </div>

      <h3 className="relative mt-6 font-display text-[1.75rem] font-bold leading-tight text-text">
        {member.name}
      </h3>
      <p className="relative mt-1.5 font-body text-base font-medium text-muted">{member.position}</p>
    </div>
  )
}

export function Team() {
  return (
    <section id="team" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(91,79,255,0.1),transparent_55%)]" />

      <div className="shell relative">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo">
              Our Team
            </p>
            <h2 className="section-title mt-4">Meet The Team</h2>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted">
              A collaborative team building websites, AI solutions, dashboards, automation systems,
              and digital products.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto mt-14 grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {teamBySeniority.map((member, i) => (
            <FadeIn key={member.name} delay={i * 80}>
              <TeamCard member={member} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
