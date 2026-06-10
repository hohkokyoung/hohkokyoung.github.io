import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { experiences } from '../data'
import useIsMobile from '../hooks/useIsMobile'

function DesktopCard({ exp, i }) {
  return (
    <article className="xp-card glass ring-highlight w-[min(85vw,640px)] shrink-0 p-8 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`dot ${exp.current ? 'bg-mint dot-pulse' : 'bg-slate-300'}`} />
          <span className="text-mono text-[11px] text-slate-200 tracking-wide uppercase truncate">
            {exp.current ? 'Current' : 'Past'} · {exp.period}
          </span>
        </div>
        <span className="badge shrink-0">#{String(i + 1).padStart(2, '0')}</span>
      </div>

      <h3 className="text-h2 leading-tight mb-1 text-snow">{exp.role}</h3>
      <p className="text-slate-200 text-[15px] mb-1">{exp.company}</p>
      <p className="text-mono text-[11px] text-slate-300 mb-6 tracking-wide">{exp.location}</p>

      <div className="border-t border-graphite-600 pt-5 space-y-3 overflow-y-auto scrollbar-hidden max-h-[42vh]">
        {exp.highlights.map((h, j) => (
          <div key={j} className="flex gap-3 text-[13.5px] leading-relaxed text-slate-200">
            <span className="text-ember text-mono shrink-0 mt-0.5">▸</span>
            <span>{h}</span>
          </div>
        ))}
      </div>
    </article>
  )
}

function MobileCard({ exp, i, isLast }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
      className="relative pl-6"
    >
      {/* timeline rail */}
      <div className="absolute left-[7px] top-2 bottom-0 w-px bg-gradient-to-b from-graphite-500 via-graphite-500/60 to-transparent" />
      {/* node */}
      <div
        className={`absolute left-0 top-[6px] w-[15px] h-[15px] rounded-full flex items-center justify-center ${
          exp.current ? 'bg-ember/20' : 'bg-graphite-600'
        }`}
      >
        <span
          className={`w-[7px] h-[7px] rounded-full ${
            exp.current ? 'bg-ember dot-pulse' : 'bg-slate-300'
          }`}
        />
      </div>

      <article
        className={`glass ring-highlight p-5 ${
          exp.current ? 'shadow-[0_0_40px_-12px_rgba(255,99,99,0.35)]' : ''
        } ${isLast ? '' : 'mb-5'}`}
      >
        {/* mini header strip */}
        <div className="flex items-center justify-between gap-2 mb-4 -mx-5 -mt-5 px-5 py-2.5 border-b border-graphite-600/80 surface-3 rounded-t-[11px]">
          <span className="text-mono text-[10px] text-slate-200 tracking-wider uppercase truncate">
            {exp.period}
          </span>
          <div className="flex items-center gap-2 shrink-0">
            {exp.current && (
              <span className="text-mono text-[9px] tracking-[0.18em] text-ember">
                LIVE
              </span>
            )}
            <span className="text-mono text-[10px] text-slate-300">
              {String(i + 1).padStart(2, '0')} / {String(experiences.length).padStart(2, '0')}
            </span>
          </div>
        </div>

        <h3 className="text-[22px] leading-[1.15] tracking-tight text-snow font-semibold">
          {exp.role}
        </h3>
        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
          <p className="text-slate-200 text-[13px]">{exp.company}</p>
          <span className="text-slate-300 text-[11px]">·</span>
          <p className="text-mono text-[10.5px] text-slate-300 tracking-wide">
            {exp.location}
          </p>
        </div>

        <div className="mt-5 pt-5 border-t border-graphite-600 space-y-3">
          {exp.highlights.map((h, j) => (
            <div
              key={j}
              className="flex gap-3 text-[12.5px] leading-relaxed text-slate-200"
            >
              <span className="text-ember text-mono shrink-0 mt-0.5 text-[10px]">
                {String(j + 1).padStart(2, '0')}
              </span>
              <span>{h}</span>
            </div>
          ))}
        </div>
      </article>
    </motion.div>
  )
}

export default function Experience() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const isMobile = useIsMobile(1024)

  useEffect(() => {
    if (isMobile) return
    const section = sectionRef.current
    const track = trackRef.current
    if (!section || !track) return

    const ctx = gsap.context(() => {
      const totalWidth = track.scrollWidth - window.innerWidth + 120
      gsap.to(track, {
        x: () => -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${totalWidth + window.innerHeight * 0.4}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [isMobile])

  if (isMobile) {
    return (
      <section id="experience" className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 atmosphere-violet pointer-events-none" />

        <div className="relative max-w-[1200px] mx-auto px-5">
          <div className="mb-10">
            <p className="text-eyebrow mb-2">/ EXPERIENCE</p>
            <h2 className="text-h2">Where I've shipped.</h2>
            <p className="text-mono text-[11px] text-slate-300 mt-3">
              {experiences.length.toString().padStart(2, '0')} roles · 4 years
            </p>
          </div>

          <div>
            {experiences.map((exp, i) => (
              <MobileCard
                key={i}
                exp={exp}
                i={i}
                isLast={i === experiences.length - 1}
              />
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative h-screen overflow-hidden"
    >
      <div className="absolute inset-0 atmosphere-violet pointer-events-none" />

      <div className="absolute top-0 left-0 right-0 z-10 pt-28 pb-6 px-6">
        <div className="max-w-[1200px] mx-auto flex items-baseline justify-between gap-4">
          <div>
            <p className="text-eyebrow mb-2">/ EXPERIENCE</p>
            <h2 className="text-h2">Where I've shipped.</h2>
          </div>
          <p className="text-mono text-[12px] text-slate-300 shrink-0">← scroll →</p>
        </div>
      </div>

      <div
        ref={trackRef}
        className="absolute top-1/2 -translate-y-1/2 flex gap-6 pl-12 pr-12"
        style={{ willChange: 'transform' }}
      >
        {experiences.map((exp, i) => (
          <DesktopCard key={i} exp={exp} i={i} />
        ))}
      </div>
    </section>
  )
}
