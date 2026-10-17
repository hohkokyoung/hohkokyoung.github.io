import { useEffect, useRef } from 'react'

// A short scrollbar for a panel: a thin track centred on the panel's right edge,
// much shorter than the panel, with a thumb that follows the scroll. Drag the
// thumb to scroll, or click the track to jump there. It stands in for the native
// scrollbar (hidden by .scroll-fade), which browsers draw full height and some
// ignore styling for. Wheel, touch and keys still scroll the panel itself, so it
// stays out of the accessibility tree.
export default function ScrollIndicator({ target }) {
  const hit = useRef(null)
  const bar = useRef(null)
  const thumb = useRef(null)

  useEffect(() => {
    const el = target.current
    const t = hit.current
    const b = bar.current
    const th = thumb.current
    if (!el || !t || !b || !th) return

    let frame = 0
    let idle = 0
    const update = () => {
      frame = 0
      const { scrollTop, scrollHeight, clientHeight } = el
      const overflow = scrollHeight - clientHeight
      t.toggleAttribute('data-show', overflow > 1)
      // The 5px bar sits 11px in from the panel edge; the hit area adds 8px each side.
      t.style.left = `${el.getBoundingClientRect().right - 19}px`
      const h = b.clientHeight
      const size = Math.max(24, (h * clientHeight) / scrollHeight)
      th.style.height = `${size}px`
      th.style.transform = `translateY(${overflow > 0 ? ((h - size) * scrollTop) / overflow : 0}px)`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    const onScroll = () => {
      schedule()
      t.setAttribute('data-active', '')
      clearTimeout(idle)
      idle = setTimeout(() => t.removeAttribute('data-active'), 800)
    }

    // Map pointer travel along the bar to scroll distance in the panel.
    const onDown = (e) => {
      if (e.button !== 0) return
      e.preventDefault()
      const size = th.offsetHeight
      const ratio = (el.scrollHeight - el.clientHeight) / Math.max(1, b.clientHeight - size)
      if (e.target !== th) {
        // Clicking the track jumps there, centring the thumb on the pointer.
        el.scrollTop = (e.clientY - b.getBoundingClientRect().top - size / 2) * ratio
      }
      const startY = e.clientY
      const start = el.scrollTop
      t.setPointerCapture(e.pointerId)
      t.setAttribute('data-drag', '')
      const onMove = (ev) => {
        el.scrollTop = start + (ev.clientY - startY) * ratio
      }
      const onUp = () => {
        t.removeAttribute('data-drag')
        t.removeEventListener('pointermove', onMove)
        t.removeEventListener('pointerup', onUp)
        t.removeEventListener('pointercancel', onUp)
      }
      t.addEventListener('pointermove', onMove)
      t.addEventListener('pointerup', onUp)
      t.addEventListener('pointercancel', onUp)
    }

    // The panel's content changes height when it switches or images load.
    const ro = new ResizeObserver(schedule)
    ro.observe(el)
    if (el.firstElementChild) ro.observe(el.firstElementChild)
    el.addEventListener('scroll', onScroll, { passive: true })
    t.addEventListener('pointerdown', onDown)
    window.addEventListener('resize', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      clearTimeout(idle)
      ro.disconnect()
      el.removeEventListener('scroll', onScroll)
      t.removeEventListener('pointerdown', onDown)
      window.removeEventListener('resize', schedule)
    }
  }, [target])

  return (
    <div
      ref={hit}
      aria-hidden="true"
      className="group pointer-events-none fixed top-1/2 z-20 -translate-y-1/2 touch-none select-none px-2 py-2 opacity-0 transition-opacity duration-300 data-[show]:pointer-events-auto data-[show]:opacity-100"
    >
      <div
        ref={bar}
        className="h-[clamp(4.5rem,14vh,8rem)] w-[5px] rounded-full bg-black/[0.05] transition-colors duration-300 group-hover:bg-black/[0.08]"
      >
        <div
          ref={thumb}
          className="w-full rounded-full bg-black/[0.18] transition-colors duration-300 group-hover:bg-black/[0.32] group-data-[active]:bg-black/[0.38] group-data-[drag]:bg-black/[0.45]"
        />
      </div>
    </div>
  )
}
