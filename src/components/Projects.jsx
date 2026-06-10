import { useState } from 'react'
import { motion } from 'framer-motion'
import { projects } from '../data'
import { fadeUp, stagger, vp } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

const featured = projects.filter((p) => p.featured)
const secondary = projects.filter((p) => !p.featured)

function Tag({ children }) {
  return (
    <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--color-forest-floor)', background: 'var(--color-moss-veil)', borderRadius: '9999px', padding: '3px 10px', whiteSpace: 'nowrap' }}>
      {children}
    </span>
  )
}

function LinkBtn({ href, children }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--color-botanical-ink)', border: '1px solid var(--color-lichen)', borderRadius: '9999px', padding: '6px 14px', display: 'inline-block', transition: 'border-color 0.2s ease, color 0.2s ease' }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-botanical-ink)' }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-lichen)' }}
    >{children}</a>
  )
}

export default function Projects() {
  const [hovered, setHovered] = useState(null)
  const isMobile = useIsMobile()

  return (
    <section id="projects" style={{ padding: isMobile ? '80px 0' : '128px 0', backgroundColor: 'var(--color-sage-mist)' }}>
      <div className="section-inner">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ marginBottom: isMobile ? '48px' : '72px' }}>
          <motion.p variants={fadeUp} className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '12px' }}>Selected work</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 53px)' }}>Projects</motion.h2>
        </motion.div>

        {featured.map((p) => (
          <motion.div
            key={p.title}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            style={{ background: 'var(--color-cream-paper)', border: '1px solid var(--color-lichen)', borderRadius: '8px', padding: isMobile ? '28px 24px' : '48px', marginBottom: '24px' }}
          >
            <span className="mono" style={{ color: 'var(--color-bark-brown)', display: 'block', marginBottom: '14px' }}>Featured</span>
            <h3 style={{ fontSize: isMobile ? '24px' : 'clamp(24px, 3vw, 36px)', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', marginBottom: '14px' }}>{p.title}</h3>
            <p style={{ fontSize: '15px', lineHeight: 1.65, letterSpacing: '-0.02em', color: 'var(--color-bark-brown)', maxWidth: '520px', marginBottom: '22px' }}>{p.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '24px' }}>
              {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
            </div>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {p.github && <LinkBtn href={p.github}>GitHub ↗</LinkBtn>}
              {p.live && <LinkBtn href={p.live}>Live ↗</LinkBtn>}
            </div>
          </motion.div>
        ))}

        <div>
          {secondary.map((p, i) => (
            <motion.div
              key={p.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
            >
              <div
                onMouseEnter={() => !isMobile && setHovered(i)}
                onMouseLeave={() => !isMobile && setHovered(null)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isMobile ? '1fr' : '1fr auto',
                  alignItems: 'start',
                  gap: isMobile ? '12px' : '32px',
                  padding: isMobile ? '24px 0' : '28px 0',
                  borderTop: '1px solid var(--color-lichen)',
                  ...(i === secondary.length - 1 ? { borderBottom: '1px solid var(--color-lichen)' } : {}),
                  opacity: hovered !== null && hovered !== i ? 0.32 : 1,
                  transition: 'opacity 0.25s ease',
                }}
              >
                <div>
                  <h4 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', marginBottom: '8px' }}>{p.title}</h4>
                  <p style={{ fontSize: '14px', lineHeight: 1.6, letterSpacing: '-0.02em', color: 'var(--color-bark-brown)', maxWidth: '540px', marginBottom: '12px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: (p.github || p.live) ? '14px' : '0' }}>
                    {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
                  </div>
                  {(p.github || p.live) && (
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      {p.github && <LinkBtn href={p.github}>GitHub ↗</LinkBtn>}
                      {p.live && <LinkBtn href={p.live}>Live ↗</LinkBtn>}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
