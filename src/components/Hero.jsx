import { useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import ThreeScene from './ThreeScene'
import { scroll } from '../store/scroll'
import { fadeUp, stagger } from '../lib/motion'
import { useIsMobile } from '../hooks/useIsMobile'

const words = ['Hoh', 'Kok', 'Young']

export default function Hero() {
  const sectionRef = useRef(null)
  const isMobile = useIsMobile()

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  useEffect(() => {
    return scrollYProgress.on('change', (v) => { scroll.progress = v })
  }, [scrollYProgress])

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '10%' : '20%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0])

  return (
    <section
      ref={sectionRef}
      className="hero-full"
      style={{
        position: 'relative',
        minHeight: '600px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'flex-end',
        backgroundColor: 'var(--color-cream-paper)',
      }}
    >
      {/* 3D canvas — full bg on mobile, right panel on desktop */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: isMobile ? '100%' : '65%',
          height: '100%',
          opacity: sceneOpacity,
          pointerEvents: 'none',
        }}
      >
        <ThreeScene />
      </motion.div>

      {/* Mobile: gradient overlay so text is readable over the 3D */}
      {isMobile && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'linear-gradient(to right, rgba(17,16,16,0.92) 55%, rgba(17,16,16,0.1) 100%)',
        }} />
      )}

      {/* Decorative ring — desktop only */}
      {!isMobile && (
        <div style={{
          position: 'absolute', top: '10%', right: '10%',
          width: '380px', height: '380px', borderRadius: '50%',
          border: '1px solid var(--color-lichen)', pointerEvents: 'none', opacity: 0.5,
        }} />
      )}

      {/* Hero text */}
      <motion.div
        style={{
          position: 'relative', zIndex: 1,
          padding: isMobile ? '0 24px 64px' : '0 48px 80px',
          maxWidth: isMobile ? '100%' : '640px',
          y: textY,
          opacity: textOpacity,
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="mono"
          style={{ color: 'var(--color-bark-brown)', marginBottom: '20px' }}
        >
          Software Engineer — Singapore
        </motion.p>

        <motion.h1
          variants={stagger}
          initial="hidden"
          animate="visible"
          style={{
            fontSize: isMobile ? 'clamp(52px, 14vw, 72px)' : 'clamp(56px, 7vw, 88px)',
            lineHeight: 0.93,
            letterSpacing: '-0.04em',
            fontWeight: 400,
            marginBottom: '28px',
            color: 'var(--color-botanical-ink)',
          }}
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={fadeUp}
              style={{ display: 'block' }}
            >
              {w}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: isMobile ? '16px' : '18px',
            lineHeight: 1.6,
            letterSpacing: '-0.03em',
            color: 'var(--color-bark-brown)',
            maxWidth: '380px',
            marginBottom: '36px',
          }}
        >
          Full-stack, AI systems, enterprise infrastructure.
          Building things that hold at scale.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}
        >
          <a href="#work"
            style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-cream-paper)', background: 'var(--color-warm-loam)', borderRadius: '20px', padding: '12px 28px', display: 'inline-block', transition: 'background 0.2s ease' }}
            onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-forest-floor)')}
            onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--color-warm-loam)')}
          >View work</a>
          <a href="mailto:kokyoung1520@gmail.com"
            style={{ fontFamily: 'var(--font-primary)', fontSize: '14px', fontWeight: 700, letterSpacing: '-0.04em', color: 'var(--color-botanical-ink)', border: '1px solid var(--color-botanical-ink)', borderRadius: '20px', padding: '12px 28px', display: 'inline-block', transition: 'background 0.2s ease, color 0.2s ease' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--color-botanical-ink)'; e.currentTarget.style.color = 'var(--color-cream-paper)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--color-botanical-ink)' }}
          >Get in touch</a>
        </motion.div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.1 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          right: isMobile ? '24px' : '48px',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px',
        }}
      >
        <span className="mono" style={{ color: 'var(--color-eucalyptus)', fontSize: '11px' }}>scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: '1px', height: '36px', background: 'var(--color-eucalyptus)' }}
        />
      </motion.div>
    </section>
  )
}
