import { useEffect, useRef } from 'react'
import { Close } from './Icons'

// Mobile detail view: slides up over the wheel, scrolls on its own.
export default function Sheet({ label, onClose, children }) {
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    return () => prev?.focus?.({ preventScroll: true })
  }, [])

  return (
    <div className="fixed inset-0 z-40" role="dialog" aria-modal="true" aria-label={label}>
      <button type="button" className="sheet-backdrop absolute inset-0 bg-black/25" aria-label="Close" tabIndex={-1} onClick={onClose} />
      <div data-scroll className="sheet-panel absolute inset-x-0 bottom-0 top-[5dvh] overflow-y-auto rounded-t-[1.75rem] bg-bg px-5 pb-[max(2rem,env(safe-area-inset-bottom))] pt-3 shadow-[0_-20px_60px_-30px_oklch(0_0_0/0.4)]">
        <div className="sticky top-0 z-10 -mx-5 flex items-center justify-between bg-bg/90 px-5 pb-2 pt-1 backdrop-blur">
          <span className="mx-auto h-1 w-10 rounded-full bg-line" aria-hidden="true" />
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="absolute right-3 top-0 flex h-10 w-10 items-center justify-center rounded-full text-ink-2 hover:text-ink"
          >
            <Close width={18} height={18} />
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
