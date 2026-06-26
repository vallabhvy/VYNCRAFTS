import { useEffect, useState } from 'react'
import { getFastContactLink } from '../data/content'

const whatsappLink = getFastContactLink()

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 480)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 p-3 backdrop-blur-xl transition-transform duration-300 md:hidden ${
        visible ? 'translate-y-0' : 'translate-y-full'
      }`}
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full rounded-full bg-indigo py-3.5 text-center font-body text-sm font-semibold text-text shadow-[0_0_32px_rgba(91,79,255,0.36)] active:scale-[0.98]"
      >
        Chat on WhatsApp
      </a>
    </div>
  )
}
