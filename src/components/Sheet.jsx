import { useEffect, useRef } from 'react'
import { Close } from './Icons'

// Mobile detail view: slides up over the wheel, scrolls on its own.
// Drag the top bar down to dismiss it.
export default function Sheet({ label, onClose, children }) {
  const closeRef = useRef(null)
  const panelRef = useRef(null)
  const drag = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    return () => prev?.focus?.({ preventScroll: true })
  }, [])

  const onPointerDown = (e) => {
    if (e.target.closest('button')) return
    drag.current = { y: e.clientY, t: performance.now(), dy: 0 }
    e.currentTarget.setPointerCapture(e.pointerId)
    panelRef.current.style.transition = 'none'
  }
  const onPointerMove = (e) => {
    if (!drag.current) return
    const dy = Math.max(0, e.clientY - drag.current.y)
    drag.current.dy = dy
    panelRef.current.style.transform = `translateY(${dy}px)`
  }
  const onPointerUp = () => {
    if (!drag.current) return
    const { dy, t } = drag.current
    drag.current = null
    const fast = dy / Math.max(1, performance.now() - t) > 0.6
    const el = panelRef.current
    el.style.transition = 'transform 0.3s var(--ease-out)'
    if (dy > 120 || (fast && dy > 30)) {
      el.style.transform = 'translateY(100%)'
      setTimeout(onClose, 200)
    } else {
      el.style.transform = ''
    }
  }

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" className="sheet-backdrop absolute inset-0 bg-black/25" aria-label="Close" tabIndex={-1} onClick={onClose} />
      <div
        ref={panelRef}
        data-scroll
        className="sheet-panel absolute inset-x-0 bottom-0 top-[5dvh] overflow-y-auto rounded-t-[1.75rem] bg-bg px-5 pb-[max(2rem,env(safe-area-inset-bottom))] shadow-[0_-20px_60px_-30px_oklch(0_0_0/0.4)]"
      >
        <div
          className="sticky top-0 z-10 -mx-5 mb-2 flex h-12 touch-none items-center justify-center bg-bg/95 backdrop-blur"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <span className="h-1 w-10 rounded-full bg-line" aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-2 top-1 flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:text-ink"
          >
            <Close width={18} height={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
