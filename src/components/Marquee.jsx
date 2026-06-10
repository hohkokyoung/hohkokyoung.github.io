import { skills } from '../data'

const FLAT = skills.flatMap((s) => s.items)

export default function Marquee() {
  const doubled = [...FLAT, ...FLAT, ...FLAT]
  return (
    <section className="relative py-10 border-y border-graphite-600/60 overflow-hidden surface-1">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-void to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-void to-transparent z-10 pointer-events-none" />
      <div className="flex gap-3 animate-[marquee_45s_linear_infinite] whitespace-nowrap">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="text-mono text-[13px] text-slate-200 px-4 py-2 surface-3 rounded-md border-faint"
          >
            <span className="text-ember mr-2">/</span>
            {item}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.33%); }
        }
      `}</style>
    </section>
  )
}
