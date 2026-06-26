import { useEffect, useState } from 'react'
import { IconX } from '@tabler/icons-react'
import { BrandMark } from './BrandMark'
import { BrandWordmark } from './BrandWordmark'
import { MagneticButton } from './MagneticButton'
import { getWhatsAppLink } from '../data/content'

const whatsappLink = getWhatsAppLink()!

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Team', href: '#team' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const

const sectionIds = links.map((link) => link.href.slice(1))
const SCROLL_SPY_OFFSET = 140

function getActiveSectionFromScroll() {
  let current = sectionIds[0]

  for (const id of sectionIds) {
    const section = document.getElementById(id)
    if (!section) continue

    if (section.getBoundingClientRect().top <= SCROLL_SPY_OFFSET) {
      current = id
    }
  }

  return current
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    let ticking = false

    const updateActiveSection = () => {
      setActiveSection(getActiveSectionFromScroll())
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        requestAnimationFrame(updateActiveSection)
      }
    }

    updateActiveSection()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    const main = document.querySelector('main')
    const mutationObserver = main ? new MutationObserver(updateActiveSection) : null
    mutationObserver?.observe(main!, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      mutationObserver?.disconnect()
    }
  }, [])

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId)
    setMenuOpen(false)
  }

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`sticky inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'glass shadow-[0_16px_50px_rgba(0,0,0,0.28)]'
            : 'border-b border-transparent bg-transparent'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)' }}
      >
        <nav className="shell flex items-center justify-between py-4 lg:py-5">
          <a href="#home" className="group flex min-w-0 items-center gap-3" onClick={() => setMenuOpen(false)}>
            <BrandMark
              size={28}
              className="shrink-0 transition-transform duration-300 group-hover:scale-110 sm:hidden"
            />
            <BrandMark
              size={32}
              className="hidden shrink-0 transition-transform duration-300 group-hover:scale-110 sm:block"
            />
            <BrandWordmark className="text-[1.4rem] sm:text-[1.6rem] lg:text-[1.85rem]" />
          </a>

          <div className="glass hidden items-center gap-1.5 rounded-full px-2.5 py-2 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href.slice(1))}
                className={`relative rounded-full px-5 py-2.5 font-body text-sm transition-all duration-300 ${
                  activeSection === link.href.slice(1)
                    ? 'bg-text text-bg shadow-[0_0_28px_rgba(238,238,242,0.18)]'
                    : 'text-text/70 hover:bg-white/5 hover:text-text'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <MagneticButton
              href={whatsappLink}
              external
              ariaLabel="Chat with VynCrafts on WhatsApp"
              className="group relative overflow-hidden rounded-full bg-indigo px-6 py-3 font-body text-sm font-semibold text-text shadow-[0_0_30px_rgba(91,79,255,0.36)] transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_46px_rgba(91,79,255,0.52)]"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Chat on WhatsApp</span>
            </MagneticButton>
          </div>

          <button
            type="button"
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full border border-border bg-surface/70 md:hidden"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setMenuOpen((o) => !o)}
          >
            <span className={`block h-px w-6 bg-text transition-transform duration-300 ${menuOpen ? 'translate-y-[5px] rotate-45' : ''}`} />
            <span className={`block h-px w-6 bg-text transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block h-px w-6 bg-text transition-transform duration-300 ${menuOpen ? '-translate-y-[5px] -rotate-45' : ''}`} />
          </button>
        </nav>
      </header>

      <div
        className={`fixed inset-0 z-40 flex flex-col bg-bg/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          menuOpen ? 'pointer-events-auto translate-y-0 opacity-100' : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
        style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center gap-2.5 px-5 pt-16 sm:gap-3 sm:px-6 sm:pt-20">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`rounded-xl border px-5 py-3.5 font-display text-2xl transition-all active:scale-[0.98] sm:py-4 sm:text-3xl ${
                activeSection === link.href.slice(1)
                  ? 'border-indigo bg-indigo/15 text-text'
                  : 'border-border bg-surface/50 text-text/80'
              }`}
              onClick={() => handleNavClick(link.href.slice(1))}
            >
              {link.label}
            </a>
          ))}
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 rounded-full bg-indigo px-8 py-4 text-center font-body text-sm font-semibold text-text shadow-[0_0_32px_rgba(91,79,255,0.36)] active:scale-[0.98] sm:mt-5"
            onClick={() => setMenuOpen(false)}
          >
            Chat on WhatsApp
          </a>
        </div>
        {menuOpen && (
          <button
            type="button"
            className="absolute right-5 top-[max(1.25rem,env(safe-area-inset-top))] flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface/70 text-text/60 sm:right-6"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          >
            <IconX size={28} stroke={1.5} />
          </button>
        )}
      </div>
    </>
  )
}
