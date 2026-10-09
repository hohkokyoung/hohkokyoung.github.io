import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { ArrowLeft, ArrowRight, Close } from './Icons'

// A row of screenshots in the project panel. Click one to view it full size.
export default function Gallery({ title, gallery }) {
  const [open, setOpen] = useState(null)
  const phone = gallery.device === 'phone'

  return (
    <div>
      <ul className="-mx-1 flex snap-x gap-3 overflow-x-auto px-1 pb-2">
        {gallery.shots.map((s, i) => (
          <li key={s.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`View screenshot: ${s.caption}`}
              className="block overflow-hidden rounded-xl bg-surface ring-1 ring-line transition-opacity hover:opacity-85"
            >
              <img
                src={s.src}
                alt=""
                loading="lazy"
                className={phone ? 'h-48 w-auto' : 'h-32 w-auto'}
              />
            </button>
          </li>
        ))}
      </ul>
      {open !== null && (
        <Lightbox title={title} shots={gallery.shots} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </div>
  )
}

function Lightbox({ title, shots, index, onIndex, onClose }) {
  const closeRef = useRef(null)
  const shot = shots[index]
  const go = (d) => onIndex((index + d + shots.length) % shots.length)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    return () => prev?.focus?.({ preventScroll: true })
  }, [])

  // Captured on window so the page's own keys (Escape closes the panel,
  // arrows turn the wheel) don't fire while the viewer is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowRight') onIndex((i) => (i + 1) % shots.length)
      else if (e.key === 'ArrowLeft') onIndex((i) => (i - 1 + shots.length) % shots.length)
      else if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'j', 'k'].includes(e.key)) return
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [onClose, onIndex, shots.length])

  return createPortal(
    <div
      className="lightbox fixed inset-0 z-50 flex flex-col bg-[oklch(0.16_0_0/0.92)] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
    >
      <div className="flex items-center justify-between px-4 py-3 text-[0.9375rem]">
        <span className="tabular-nums text-white/70">
          {index + 1} / {shots.length}
        </span>
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white"
        >
          <Close width={18} height={18} />
        </button>
      </div>
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-16" onClick={onClose}>
        <img
          key={shot.src}
          src={shot.src}
          alt={shot.caption}
          className="lightbox-img max-h-full max-w-full rounded-lg object-contain"
          onClick={(e) => e.stopPropagation()}
        />
        {shots.length > 1 && (
          <>
            <button
              type="button"
              onClick={(e) => (e.stopPropagation(), go(-1))}
              aria-label="Previous screenshot"
              className="absolute left-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            >
              <ArrowLeft width={18} height={18} />
            </button>
            <button
              type="button"
              onClick={(e) => (e.stopPropagation(), go(1))}
              aria-label="Next screenshot"
              className="absolute right-2 top-1/2 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:flex"
            >
              <ArrowRight width={18} height={18} />
            </button>
          </>
        )}
      </div>
      <div className="flex items-center justify-between gap-4 px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
        <p className="text-[0.9375rem] text-white/85">{shot.caption}</p>
        {shots.length > 1 && (
          <div className="flex gap-2 sm:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous screenshot" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <ArrowLeft width={16} height={16} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next screenshot" className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
              <ArrowRight width={16} height={16} />
            </button>
          </div>
        )}
      </div>
    </div>,
    document.body,
  )
}
