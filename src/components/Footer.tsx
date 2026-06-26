import { IconBrandGithub, IconBrandInstagram, IconBrandLinkedin } from '@tabler/icons-react'
import { BrandMark } from './BrandMark'
import { BrandWordmark } from './BrandWordmark'

const quickLinks = [
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: IconBrandLinkedin },
  { label: 'GitHub', href: 'https://github.com', icon: IconBrandGithub },
  { label: 'Instagram', href: 'https://instagram.com', icon: IconBrandInstagram },
]

export function Footer() {
  return (
    <footer className="safe-bottom relative overflow-hidden border-t border-border bg-footer">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="font-display text-[88px] font-bold leading-none text-text opacity-[0.035] sm:text-[120px] lg:text-[180px]">
          VC
        </span>
      </div>

      <div className="shell relative grid gap-8 py-14 sm:grid-cols-2 sm:gap-10 lg:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <BrandMark size={28} />
            <BrandWordmark className="text-lg" />
          </div>
          <p className="mt-4 font-display text-2xl leading-tight text-text sm:text-3xl">
            Crafting Digital Experiences.
          </p>
          <p className="mt-4 font-body text-sm leading-7 text-muted">
            Premium websites, AI systems and digital products for businesses ready to grow online.
          </p>
        </div>
        <nav className="flex flex-col gap-3" aria-label="Footer quick links">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-text/80">
            Quick Links
          </p>
          {quickLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="w-fit font-body text-sm text-muted transition-colors hover:text-indigo"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-3">
          <p className="font-mono text-xs font-bold uppercase tracking-widest text-text/80">
            Social Links
          </p>
          {socialLinks.map((link) => {
            const Icon = link.icon

            return (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit VynCrafts on ${link.label}`}
                className="flex w-fit items-center gap-3 font-body text-sm text-muted transition-colors hover:text-lime"
              >
                <Icon size={18} stroke={1.5} aria-hidden="true" />
                {link.label}
              </a>
            )
          })}
        </div>
      </div>
      <div className="relative border-t border-border/80">
        <div className="shell flex flex-col gap-2 py-6 font-body text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 VynCrafts.</p>
          <p>Crafting Digital Experiences.</p>
        </div>
      </div>
    </footer>
  )
}
