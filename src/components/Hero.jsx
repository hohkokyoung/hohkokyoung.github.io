import { Suspense, useEffect, useState } from 'react'
import { motion } from 'motion/react'
import HeroScene from './HeroScene'
import useIsMobile from '../hooks/useIsMobile'

const COMMAND_HINT = '> hire kokyoung --role "SWE" --based "SG"'

export default function Hero() {
  const [typed, setTyped] = useState('')
  const isMobile = useIsMobile()

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(COMMAND_HINT.slice(0, i))
      if (i >= COMMAND_HINT.length) clearInterval(id)
    }, 32)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-dvh overflow-hidden">
      <div className="absolute inset-0 atmosphere-blue pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 md:opacity-40 pointer-events-none" />

      <div className="absolute inset-0 z-0">
        <Suspense fallback={null}>
          <HeroScene reduced={isMobile} />
        </Suspense>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 md:px-6 pt-28 md:pt-32 pb-24 min-h-dvh flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="inline-flex items-center gap-2 self-start mb-6 md:mb-8 px-3 py-1.5 rounded-full glass"
        >
          <span className="dot bg-mint dot-pulse" />
          <span className="text-mono text-[10px] md:text-[11px] text-slate-200 tracking-wide">
            AVAILABLE FOR NEW ROLES · SG
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
          className="text-display max-w-5xl"
        >
          Software Engineer<br />
          building <span className="text-slate-300">agentic</span> systems<br />
          <span className="text-ember">for the real world.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.23, 1, 0.32, 1] }}
          className="mt-6 md:mt-8 max-w-2xl text-[15px] md:text-[17px] leading-relaxed text-slate-200"
        >
          Hoh Kok Young — 4 years engineering enterprise web, AI pipelines, and
          developer tooling. Currently at The Software Practice, Singapore.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
          className="mt-8 md:mt-10 glass w-full max-w-2xl p-2 ring-highlight"
        >
          <div className="surface-3 rounded-md px-3 md:px-4 py-2.5 md:py-3 flex items-center gap-2 md:gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-ember/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f5a623]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-mint/80" />
            </div>
            <span className="text-mono text-[11px] md:text-[12px] text-slate-200 truncate">~/portfolio</span>
            <span className="ml-auto kbd hidden sm:inline-flex">⌘ + SCROLL</span>
          </div>
          <div className="px-3 md:px-4 py-4 md:py-5 text-mono text-[11.5px] md:text-[13px] text-snow break-all">
            <span className="text-mint">$</span> {typed}
            <span className="cursor text-snow">▋</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-eyebrow"
        >
          <span>SCROLL TO EXPLORE</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-slate-300 to-transparent"
          />
        </motion.div>
      </div>
    </section>
  )
}
