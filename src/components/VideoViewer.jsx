import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Close } from './Icons'

// The full-resolution video, large, over everything. Only loaded when opened.
// Starts where the small player was and hands the position back on close.
export default function VideoViewer({ src, poster, label, start = 0, muted = true, onClose }) {
  const videoRef = useRef(null)
  const closeRef = useRef(null)

  useEffect(() => {
    const prev = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    return () => prev?.focus?.({ preventScroll: true })
  }, [])

  const close = () => onClose(videoRef.current?.currentTime ?? start)
  const stop = (e) => e.stopPropagation()

  // Captured on window so the page's own keys (Escape closes the panel,
  // arrows turn the wheel) don't fire while the viewer is open.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      else if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'j', 'k'].includes(e.key)) return
      e.preventDefault()
      e.stopImmediatePropagation()
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  })

  return createPortal(
    // React events bubble out of portals to the player's parents (the wheel
    // drags on pointer events), so stop them at the viewer's edge.
    <div
      className="lightbox fixed inset-0 z-50 flex flex-col bg-[oklch(0.14_0_0)] text-white"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={stop}
      onPointerDown={stop}
      onPointerMove={stop}
      onPointerUp={stop}
      onWheel={stop}
    >
      <div className="flex items-center justify-end px-4 py-3">
        <button
          ref={closeRef}
          type="button"
          onClick={close}
          aria-label="Close"
          className="flex h-10 w-10 items-center justify-center rounded-full text-white/80 hover:text-white"
        >
          <Close width={18} height={18} />
        </button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center px-4 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-10" onClick={close}>
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          aria-label={label}
          autoPlay
          controls
          playsInline
          loop
          muted={muted}
          onLoadedMetadata={(e) => {
            if (start) e.currentTarget.currentTime = start
          }}
          onClick={(e) => e.stopPropagation()}
          className="lightbox-img max-h-full max-w-full rounded-lg bg-black"
        />
      </div>
    </div>,
    document.body,
  )
}
