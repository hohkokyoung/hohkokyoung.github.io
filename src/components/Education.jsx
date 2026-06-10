import { motion } from 'framer-motion'
import { education, certifications } from '../data'
import { fadeUp, stagger, vp } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

export default function Education() {
  const isMobile = useIsMobile()

  return (
    <section id="education" style={{ padding: isMobile ? '80px 0' : '128px 0', backgroundColor: 'var(--color-sage-mist)' }}>
      <div className="section-inner">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={vp} style={{ marginBottom: isMobile ? '48px' : '72px' }}>
          <motion.p variants={fadeUp} className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '12px' }}>Background</motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: isMobile ? '36px' : 'clamp(36px, 5vw, 53px)' }}>Education</motion.h2>
        </motion.div>

        <div>
          {education.map((e, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={vp}
              style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
                gap: isMobile ? '12px' : '48px',
                padding: isMobile ? '28px 0' : '40px 0',
                borderTop: '1px solid var(--color-lichen)',
                ...(i === education.length - 1 ? { borderBottom: '1px solid var(--color-lichen)' } : {}),
              }}
            >
              <div>
                <p className="mono" style={{ color: 'var(--color-bark-brown)', marginBottom: '4px' }}>{e.period}</p>
                <p style={{ fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--color-eucalyptus)', lineHeight: 1.4 }}>{e.school}</p>
              </div>
              <div>
                <h3 style={{ fontSize: isMobile ? '18px' : '20px', fontWeight: 400, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', marginBottom: '6px' }}>{e.major}</h3>
                <p style={{ fontSize: '14px', letterSpacing: '-0.02em', color: 'var(--color-bark-brown)', marginBottom: '14px', lineHeight: 1.5 }}>{e.degree}</p>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <span className="mono" style={{ color: 'var(--color-forest-floor)', background: 'var(--color-moss-veil)', borderRadius: '9999px', padding: '3px 10px' }}>GPA {e.gpa}</span>
                  {e.honors.map((h) => (
                    <span key={h} style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.02em', color: 'var(--color-bark-brown)', border: '1px solid var(--color-lichen)', borderRadius: '9999px', padding: '3px 10px' }}>{h}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={vp}
            style={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '220px 1fr',
              gap: isMobile ? '12px' : '48px',
              padding: isMobile ? '28px 0' : '40px 0',
              borderTop: '1px solid var(--color-lichen)',
              borderBottom: '1px solid var(--color-lichen)',
            }}
          >
            <span className="mono" style={{ color: 'var(--color-bark-brown)' }}>Certifications</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {certifications.map((c) => (
                <div key={c.name} style={{ display: 'flex', gap: '20px', alignItems: 'baseline', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '16px', letterSpacing: '-0.02em', color: 'var(--color-botanical-ink)' }}>{c.name}</span>
                  <span className="mono" style={{ color: 'var(--color-bark-brown)' }}>{c.level}</span>
                  <span className="mono" style={{ color: 'var(--color-eucalyptus)' }}>{c.year}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
