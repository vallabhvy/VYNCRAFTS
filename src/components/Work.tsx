import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { IconArrowUpRight, IconFileText } from '@tabler/icons-react'
import { projects, teamMembers, teamStats } from '../data/content'
import { FadeIn } from './FadeIn'
import { BrandMark } from './BrandMark'

const filters = ['All', ...teamMembers.map((m) => m.name)] as const
type Filter = (typeof filters)[number]

type Project = (typeof projects)[number]

function ProjectCard({ project }: { project: Project }) {
  const accent = project.accent

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.97 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      id={`project-${project.id}`}
      className="group relative scroll-mt-28 rounded-[24px] bg-gradient-to-br from-white/[0.14] via-white/[0.04] to-transparent p-px shadow-[0_18px_50px_rgba(0,0,0,0.28)] transition-shadow duration-500 hover:shadow-[0_28px_80px_color-mix(in_srgb,var(--accent)_28%,transparent)]"
      style={{ '--accent': accent } as React.CSSProperties}
    >
      {/* Gradient border highlight on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-[24px] bg-gradient-to-br from-[var(--accent)]/55 via-[var(--accent)]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[23px] bg-surface/70 backdrop-blur-xl">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface/85 via-transparent to-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full border border-white/10 bg-bg/55 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest backdrop-blur"
            style={{ color: accent }}
          >
            {project.type}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-xl font-semibold leading-tight text-text">{project.name}</h3>
          <p className="mt-2 font-body text-sm leading-6 text-muted">{project.description}</p>

          <p className="mt-3 font-mono text-[11px] leading-relaxed text-text/55">
            {project.type} • {project.technologies.join(' • ')}
          </p>

          <div className="mt-4 flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
              <BrandMark size={16} className="shrink-0" />
            </span>
            <span className="font-body text-[13px] text-text/70">
              Built by <span className="font-semibold text-text">Team VynCrafts</span>
            </span>
          </div>

          <div className="mt-5 flex items-center gap-3 border-t border-border pt-4">
            <a
              href={project.demoHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full px-4 py-2 font-body text-[13px] font-semibold text-bg transition-transform duration-300 hover:scale-[1.04]"
              style={{ backgroundColor: accent }}
            >
              Live Demo
              <IconArrowUpRight size={15} stroke={2.2} />
            </a>
            <a
              href={project.caseStudyHref}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 font-body text-[13px] font-medium text-text/85 transition-all duration-300 hover:border-white/30 hover:bg-white/5"
            >
              <IconFileText size={15} stroke={1.8} />
              Case Study
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export function Work() {
  const [activeFilter, setActiveFilter] = useState<Filter>('All')

  const visibleProjects = useMemo(
    () => (activeFilter === 'All' ? projects : projects.filter((p) => p.member === activeFilter)),
    [activeFilter],
  )

  return (
    <section id="work" className="section-pad relative scroll-mt-24 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(91,79,255,0.12),transparent_55%)]" />

      <div className="shell relative">
        {/* Header */}
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-indigo">
              Selected Work
            </p>
            <h2 className="section-title mt-4">Work crafted by our team</h2>
            <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted">
              Explore our projects across web development, AI solutions, dashboards, and digital
              products — filter by contributor to see individual portfolios.
            </p>
          </div>
        </FadeIn>

        {/* Team stats */}
        <FadeIn delay={60}>
          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 sm:gap-5">
            {teamStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/[0.12] bg-surface/50 px-3 py-5 text-center backdrop-blur sm:px-5 sm:py-6"
              >
                <p className="font-mono text-3xl font-bold text-text sm:text-4xl">{stat.value}</p>
                <p className="mt-2 font-body text-xs text-muted sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Filter pills */}
        <FadeIn delay={140}>
          <div
            className="mt-10 flex flex-wrap justify-center gap-2.5"
            role="tablist"
            aria-label="Filter projects by team member"
          >
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                role="tab"
                aria-selected={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full border px-5 py-2.5 font-body text-sm transition-all duration-300 active:scale-95 ${
                  activeFilter === filter
                    ? 'border-indigo bg-indigo text-text shadow-[0_0_28px_rgba(91,79,255,0.4)]'
                    : 'border-white/12 bg-surface/50 text-muted hover:border-indigo/40 hover:text-text'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Project grid */}
        <motion.div
          layout
          className="mt-10 grid grid-cols-1 gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
