import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'motion/react'
import { projects } from '../data'

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.proj-card').forEach((card, i) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          rotateX: -10,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 atmosphere-ember opacity-50 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="mb-10 md:mb-16 flex items-end justify-between flex-wrap gap-6">
          <div>
            <p className="text-eyebrow mb-3">/ PROJECTS</p>
            <h2 className="text-h1 max-w-3xl">
              Side quests<br />
              <span className="text-slate-300">that taught me the most.</span>
            </h2>
          </div>
          <p className="text-mono text-[12px] text-slate-300">
            {projects.length.toString().padStart(2, '0')} selected
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-5" style={{ perspective: '1200px' }}>
          {projects.map((p, i) => (
            <motion.article
              key={i}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className={`proj-card glass ring-highlight p-5 md:p-7 flex flex-col ${
                p.featured ? 'lg:col-span-2' : ''
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-md surface-3 flex items-center justify-center text-[22px] ring-highlight">
                    {p.emoji}
                  </div>
                  {p.featured && (
                    <span className="badge text-ember bg-ember-dark">
                      <span className="dot bg-ember" style={{ width: 6, height: 6 }} />
                      FEATURED
                    </span>
                  )}
                </div>
                <span className="text-mono text-[11px] text-slate-300">{p.tag}</span>
              </div>

              <h3 className="text-[20px] md:text-h2 leading-tight mb-3 text-snow">{p.title}</h3>
              <p className="text-[13px] md:text-[14px] text-slate-200 leading-relaxed mb-5">{p.desc}</p>

              <div className="flex flex-wrap gap-2 mb-5 mt-auto">
                {p.tech.map((t, j) => (
                  <span key={j} className="badge text-slate-200">
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-graphite-600">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mono text-[12px] text-slate-200 hover:text-snow flex items-center gap-1.5 transition-colors"
                  >
                    → github
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-mono text-[12px] text-snow flex items-center gap-1.5 hover:text-ember transition-colors"
                  >
                    → live
                  </a>
                )}
                {!p.github && !p.live && (
                  <span className="text-mono text-[12px] text-slate-300">// private</span>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
