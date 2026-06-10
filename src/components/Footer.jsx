export default function Footer() {
  return (
    <footer className="surface-1 border-t border-graphite-600/60 py-10">
      <div className="max-w-[1200px] mx-auto px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="dot bg-mint dot-pulse" />
          <span className="text-mono text-[12px] text-slate-200">
            kokyoung.dev · v1.0 · built with R3F + GSAP
          </span>
        </div>
        <p className="text-mono text-[11px] text-slate-300">
          © {new Date().getFullYear()} Hoh Kok Young — all rights reserved
        </p>
      </div>
    </footer>
  )
}
