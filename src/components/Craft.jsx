import { motion } from 'framer-motion'
import { skills } from '../data'
import { fadeUp, stagger, vp } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Craft() {
  const isMobile = useIsMobile()

  return (
    <section id="craft" style={{ padding: isMobile ? '80px 0' : '128px 0', backgroundColor: 'var(--color-cream-paper)' }}>
      <div className="section-inner">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ marginBottom: isMobile ? '48px' : '72px' }}>
          <motion.p variants={fadeUp} className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '12px' }}>Skills</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 53px)' }}>Craft</motion.h2>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp}>
          {skills.map((s, i) => (
            <motion.div
              key={s.category}
              variants={fadeUp}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '200px 1fr',
                gap: isMobile ? '10px' : '48px',
                padding: isMobile ? '20px 0' : '24px 0',
                borderTop: '1px solid var(--color-lichen)',
                alignItems: 'start',
                ...(i === skills.length - 1 ? { borderBottom: '1px solid var(--color-lichen)' } : {}),
              }}
            >
              <span className="mono" style={{ color: 'var(--color-bark-brown)' }}>{s.category}</span>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: isMobile ? '6px' : '8px' }}>
                {s.items.map((item) => (
                  <span key={item} style={{ fontFamily: 'var(--font-primary)', fontSize: isMobile ? '15px' : '16px', letterSpacing: '-0.02em', color: 'var(--color-botanical-ink)' }}>
                    {item}<span style={{ color: 'var(--color-lichen)', marginLeft: '8px' }}>·</span>
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
