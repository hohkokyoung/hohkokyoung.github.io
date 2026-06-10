import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useIsMobile } from '../hooks/useIsMobile'

const links = [
  { label: 'Work', href: '#work' },
  { label: 'Projects', href: '#projects' },
  { label: 'Craft', href: '#craft' },
  { label: 'Education', href: '#education' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const isMobile = useIsMobile()

  useEffect(() => {
    const fn = () => { setScrolled(window.scrollY > 40); if (window.scrollY > 40) setOpen(false) }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const navBg = scrolled || open ? 'rgba(17,16,16,0.95)' : 'transparent'
  const navBorder = scrolled || open ? '1px solid var(--color-lichen)' : '1px solid transparent'

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          padding: '0 24px', height: '56px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          backgroundColor: navBg,
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: navBorder,
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        <a href="#" style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 700, color: 'var(--color-botanical-ink)', letterSpacing: '-0.04em' }}>
          HKY
        </a>

        {isMobile ? (
          <button
            onClick={() => setOpen((v) => !v)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', display: 'flex', flexDirection: 'column', gap: '5px' }}
            aria-label="Toggle menu"
          >
            <motion.span animate={{ rotate: open ? 45 : 0, y: open ? 7 : 0 }} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--color-botanical-ink)', transformOrigin: 'center' }} />
            <motion.span animate={{ opacity: open ? 0 : 1 }} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--color-botanical-ink)' }} />
            <motion.span animate={{ rotate: open ? -45 : 0, y: open ? -7 : 0 }} style={{ display: 'block', width: '22px', height: '1.5px', background: 'var(--color-botanical-ink)', transformOrigin: 'center' }} />
          </button>
        ) : (
          <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
            {links.map((l) => (
              <a key={l.href} href={l.href} className="mono"
                style={{ color: 'var(--color-bark-brown)', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--color-botanical-ink)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--color-bark-brown)')}
              >{l.label}</a>
            ))}
            <a href="#contact" style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-cream-paper)', background: 'var(--color-warm-loam)', borderRadius: '20px', padding: '8px 20px', transition: 'background 0.2s ease' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-forest-floor)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-warm-loam)')}
            >Contact</a>
          </div>
        )}
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {isMobile && open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed', top: '56px', left: 0, right: 0, zIndex: 99,
              backgroundColor: 'rgba(17,16,16,0.97)',
              backdropFilter: 'blur(12px)',
              borderBottom: '1px solid var(--color-lichen)',
              padding: '8px 0 20px',
            }}
          >
            {[...links, { label: 'Contact', href: '#contact' }].map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)}
                style={{ display: 'block', fontFamily: 'var(--font-primary)', fontSize: '17px', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', padding: '14px 24px', borderBottom: '1px solid var(--color-lichen)' }}
              >{l.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
