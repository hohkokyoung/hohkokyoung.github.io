import { motion } from 'framer-motion'
import { experiences } from '../data'
import { fadeUp, stagger, vp } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Work() {
  const isMobile = useIsMobile()

  return (
    <section id="work" style={{ padding: isMobile ? '80px 0' : '128px 0', backgroundColor: 'var(--color-cream-paper)' }}>
      <div className="section-inner">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ marginBottom: isMobile ? '48px' : '72px' }}>
          <motion.p variants={fadeUp} className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '12px' }}>Experience</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 53px)' }}>Where I've worked</motion.h2>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
                gap: isMobile ? '16px' : '48px',
                padding: isMobile ? '32px 0' : '48px 0',
                borderTop: '1px solid var(--color-lichen)',
                ...(i === experiences.length - 1 ? { borderBottom: '1px solid var(--color-lichen)' } : {}),
              }}
            >
              <div>
                <p style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', marginBottom: '5px' }}>{exp.company}</p>
                <p className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '4px' }}>{exp.period}</p>
                <p className="mono" style={{ color: 'var(--color-eucalyptus)', marginBottom: exp.current ? '8px' : '0' }}>{exp.location}</p>
                {exp.current && (
                  <span style={{ display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--color-forest-floor)', background: 'var(--color-moss-veil)', borderRadius: '9999px', padding: '3px 10px' }}>
                    Current
                  </span>
                )}
              </div>

              <div>
                <h3 style={{ fontSize: isMobile ? '20px' : '24px', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', marginBottom: '20px' }}>
                  {exp.role}
                </h3>
                <motion.ul variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {exp.highlights.map((h, j) => (
                    <motion.li key={j} variants={fadeUp} style={{ fontSize: '15px', lineHeight: 1.6, letterSpacing: '-0.02em', color: 'var(--color-bark-brown)', paddingLeft: '18px', position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0, top: '9px', width: '5px', height: '5px', borderRadius: '50%', background: 'var(--color-eucalyptus)', display: 'block' }} />
                      {h}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
