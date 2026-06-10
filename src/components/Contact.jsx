import { motion } from 'framer-motion'
import { fadeUp, stagger, vp } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

const links = [
  { label: 'kokyoung1520@gmail.com', href: 'mailto:kokyoung1520@gmail.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/hohkokyoung' },
  { label: 'GitHub', href: 'https://github.com/hohkokyoung' },
]

export default function Contact() {
  const isMobile = useIsMobile()

  return (
    <section id="contact" style={{ padding: isMobile ? '80px 0 72px' : '128px 0 100px', backgroundColor: 'var(--color-cream-paper)' }}>
      <div className="section-inner">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ maxWidth: '600px', marginBottom: isMobile ? '48px' : '64px' }}>
          <motion.p variants={fadeUp} className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '12px' }}>Get in touch</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 53px)', marginBottom: '24px' }}>
            Let's work together.
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: isMobile ? '16px' : '18px', lineHeight: 1.6, letterSpacing: '-0.04em', color: 'var(--color-bark-brown)', maxWidth: '400px' }}>
            Open to senior engineering roles, technical partnerships, and problems worth solving.
          </motion.p>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
          {links.map((l, i) => (
            <motion.a
              key={l.label}
              variants={fadeUp}
              href={l.href}
              target={l.href.startsWith('http') ? '_blank' : undefined}
              rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: isMobile ? '20px 0' : '24px 0',
                borderTop: '1px solid var(--color-lichen)',
                fontSize: isMobile ? '17px' : '20px',
                fontWeight: 400, letterSpacing: '-0.04em',
                color: 'var(--color-botanical-ink)',
                transition: 'color 0.2s ease',
                ...(i === links.length - 1 ? { borderBottom: '1px solid var(--color-lichen)' } : {}),
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-warm-loam)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-botanical-ink)')}
            >
              <span>{l.label}</span>
              <span style={{ fontSize: '16px', opacity: 0.35 }}>↗</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
