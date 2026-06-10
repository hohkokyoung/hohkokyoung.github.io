import { useEffect, useState } from 'react'

const links = [
  { label: 'Work', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 md:py-3' : 'py-3 md:py-5'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6 flex items-center justify-between gap-2">
        <div
          className={`flex items-center gap-3 px-3 md:px-4 py-2 rounded-[11px] transition-[background-color,border-color] duration-300 ${
            scrolled
              ? 'bg-graphite-700/55 border border-white/8'
              : 'bg-transparent border border-transparent'
          }`}
          style={{ backdropFilter: scrolled ? 'blur(36px)' : 'none' }}
        >
          <div className="w-2 h-2 rounded-full bg-ember dot-pulse" />
          <span className="text-mono text-[11px] md:text-[12px] text-snow tracking-wide">
            kokyoung<span className="text-slate-300">.dev</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-1 glass px-2 py-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-slate-200 hover:text-snow transition-colors px-3 py-1.5 rounded-md hover:bg-graphite-600"
            >
              {l.label}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 bg-ash text-[13px] font-medium text-graphite-700 px-3.5 py-2 rounded-lg hover:bg-snow transition-colors"
        >
          Get in touch
          <span className="text-mono text-[11px] font-medium text-graphite-700/70 bg-snow/60 border border-graphite-700/20 rounded-md px-1.5 py-0.5">
            ⌘K
          </span>
        </a>

        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden glass p-2.5 rounded-lg"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`h-px bg-snow w-full transition-transform origin-left ${
                open ? 'rotate-45 translate-y-[2px]' : ''
              }`}
            />
            <span
              className={`h-px bg-snow w-3/4 transition-opacity ${open ? 'opacity-0' : ''}`}
            />
            <span
              className={`h-px bg-snow w-full transition-transform origin-left ${
                open ? '-rotate-45 -translate-y-[2px]' : ''
              }`}
            />
          </div>
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="mx-4 mt-2 glass p-3 ring-highlight">
          <div className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-[14px] text-slate-200 hover:text-snow px-3 py-2.5 rounded-md hover:bg-graphite-600 transition-colors"
              >
                <span className="text-ember mr-2 text-mono text-[12px]">/</span>
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 bg-ash text-[13px] font-medium text-graphite-700 px-3.5 py-2.5 rounded-lg text-center"
            >
              Get in touch
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
