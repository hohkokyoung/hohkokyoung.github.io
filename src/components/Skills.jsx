import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { skills } from '../data'

export default function Skills() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.skill-card')

      gsap.from(cards, {
        y: 80,
        opacity: 0,
        scale: 0.85,
        stagger: { each: 0.08, from: 'start' },
        ease: 'power3.out',
        duration: 0.9,
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
          end: 'top 20%',
          scrub: 1,
        },
      })

      gsap.to('.skill-headline', {
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          pin: '.skill-headline',
          pinSpacing: false,
          scrub: false,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      <div className="absolute inset-0 atmosphere-blue opacity-70 pointer-events-none" />

      <div className="relative max-w-[1200px] mx-auto px-5 md:px-6">
        <div className="mb-10 md:mb-16">
          <p className="text-eyebrow mb-3">/ STACK</p>
          <h2 className="text-h1 max-w-3xl">
            Tools I reach for<br />
            <span className="text-slate-300">when something needs to ship.</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
          {skills.map((cat, i) => (
            <div
              key={i}
              className="skill-card glass p-5 md:p-6 ring-highlight group hover:bg-graphite-700/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <span className="text-[22px]">{cat.icon}</span>
                  <h3 className="text-snow text-[15px] font-medium">{cat.category}</h3>
                </div>
                <span className="text-mono text-[11px] text-slate-300">
                  {String(cat.items.length).padStart(2, '0')}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item, j) => (
                  <span
                    key={j}
                    className="badge surface-3 text-slate-200 hover:text-snow hover:bg-graphite-500 transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
