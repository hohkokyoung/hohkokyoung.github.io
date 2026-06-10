import { motion } from 'motion/react'
import { education, certifications } from '../data'

export default function Education() {
  return (
    <section className="relative py-20 md:py-32 surface-1 overflow-hidden">
      <div className="absolute inset-0 atmosphere-violet opacity-60 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="mb-10 md:mb-16">
          <p className="text-eyebrow mb-3">/ FOUNDATIONS</p>
          <h2 className="text-h1 max-w-3xl">
            Education<br />
            <span className="text-slate-300">& credentials.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
          <div className="lg:col-span-2 space-y-4 md:space-y-5">
            {education.map((e, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.6, delay: i * 0.1, ease: [0.23, 1, 0.32, 1] }}
                className="glass p-5 md:p-7 ring-highlight"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-mono text-[11px] text-slate-300 tracking-wide uppercase">
                    {e.period}
                  </span>
                  {e.gpa && (
                    <span className="badge text-mint bg-graphite-600">
                      <span className="dot bg-mint" style={{ width: 6, height: 6 }} />
                      GPA {e.gpa}
                    </span>
                  )}
                </div>
                <h3 className="text-[20px] md:text-h2 leading-tight text-snow mb-2">{e.school}</h3>
                <p className="text-slate-200 text-[14px] mb-1">{e.degree}</p>
                <p className="text-slate-300 text-[13px] text-mono">/ {e.major}</p>
                {e.honors.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-5">
                    {e.honors.map((h, j) => (
                      <span key={j} className="badge text-ember bg-ember-dark">
                        ★ {h}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="space-y-4">
            <p className="text-eyebrow">/ CERTS</p>
            {certifications.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                className="glass p-5 ring-highlight flex items-center gap-4"
              >
                <div
                  className="w-12 h-12 rounded-md flex items-center justify-center text-[22px] shrink-0"
                  style={{ background: `${c.color}22`, border: `1px solid ${c.color}44` }}
                >
                  {c.icon}
                </div>
                <div className="min-w-0">
                  <p className="text-snow text-[14px] font-medium leading-snug">{c.name}</p>
                  <p className="text-slate-300 text-mono text-[11px] mt-1">
                    {c.level} · {c.year}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
