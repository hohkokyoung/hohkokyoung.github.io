import { motion } from 'motion/react'

const channels = [
  { label: 'Email', value: 'kokyoung1520@gmail.com', href: 'mailto:kokyoung1520@gmail.com', kbd: 'E' },
  { label: 'GitHub', value: 'github.com/hohkokyoung', href: 'https://github.com/hohkokyoung', kbd: 'G' },
  { label: 'LinkedIn', value: 'linkedin.com/in/kokyoung', href: 'https://www.linkedin.com/in/kokyoung', kbd: 'L' },
]

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-40 overflow-hidden">
      <div className="absolute inset-0 atmosphere-ember opacity-80 pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-eyebrow mb-6"
        >
          / OUTBOUND
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
          className="text-display max-w-4xl mx-auto"
        >
          Let's build<br />
          <span className="text-ember">something fast.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-[17px] text-slate-200 max-w-xl mx-auto"
        >
          Open to senior engineering, AI tooling, and platform roles. Reply within 24 hours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
          className="mt-10 md:mt-14 max-w-2xl mx-auto glass ring-highlight p-2 md:p-3"
        >
          {channels.map((c, i) => (
            <a
              key={i}
              href={c.href}
              target={c.href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-center gap-3 md:gap-4 px-4 md:px-5 py-3 md:py-4 rounded-md hover:bg-graphite-700/60 transition-colors text-left"
            >
              <span className="text-mono text-[10px] md:text-[11px] text-slate-300 tracking-wide w-12 md:w-16 uppercase shrink-0">
                {c.label}
              </span>
              <span className="text-snow text-[13px] md:text-[15px] flex-1 group-hover:text-ember transition-colors break-all">
                {c.value}
              </span>
              <span className="kbd hidden sm:inline-flex">⌘ {c.kbd}</span>
            </a>
          ))}
        </motion.div>

        <motion.a
          href="mailto:kokyoung1520@gmail.com"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 inline-flex items-center gap-2 bg-ash text-graphite-700 text-[14px] font-medium px-5 py-3 rounded-lg hover:bg-snow transition-colors"
        >
          → Open mail composer
        </motion.a>
      </div>
    </section>
  )
}
