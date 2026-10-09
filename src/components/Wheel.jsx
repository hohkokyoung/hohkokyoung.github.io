import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import CardVisual from './CardVisual'
import { prefersReducedMotion } from '../lib/motion'

const TILT = 12 // degrees a neighbour tips back

// Where card i sits when the wheel is at offset d from it. Neighbours peek in
// above and below, smaller and faded; anything further out fades away.
function place(d, Y1) {
  const a = Math.abs(d)
  const s = Math.sign(d)
  const t = Math.min(a, 1)
  const beyond = Math.max(0, a - 1)
  return {
    y: s * (t * Y1 + beyond * Y1 * 0.3),
    rot: -s * t * TILT,
    scale: 1 - t * 0.2 - beyond * 0.06,
    wash: t * 0.55,
    opacity: Math.max(0, 1 - beyond * 1.8),
    z: 100 - Math.round(a * 10),
  }
}

// Edge-to-edge 16:9 media plus a title row.
const titleHeight = (card) => Math.max(48, Math.round(card * 0.11))
function cardHeight(card) {
  return (card * 9) / 16 + titleHeight(card)
}

function Media({ item, live, open }) {
  const m = item.media
  if (m.type === 'video') {
    return (
      <VideoPlayer
        src={m.src}
        poster={m.poster}
        label={`${item.title} demo video`}
        audio={m.audio}
        playing={live}
        controls={open}
        className="h-full w-full"
      />
    )
  }
  if (m.type === 'image') {
    return <img src={m.src} alt={m.alt} className="h-full w-full object-cover object-left-top" loading="lazy" decoding="async" />
  }
  return <CardVisual name={m.visual} />
}

export default function Wheel({ items, index, onIndex, open, onOpen, paused = false }) {
  const stageRef = useRef(null)
  const cardRefs = useRef([])
  const pos = useRef(index)
  const target = useRef(index)
  const raf = useRef(0)
  const lastDir = useRef(1)
  const snapTimer = useRef(0)
  const drag = useRef(null)
  const suppressClick = useRef(false)
  const [size, setSize] = useState({ w: 0, h: 0, card: 0 })
  const [settled, setSettled] = useState(true)

  const n = items.length
  const mod = (x) => ((x % n) + n) % n
  // The wheel loops: the nearest position showing card i from wherever we are.
  const nearest = (i) => {
    const base = Math.round(target.current)
    let delta = i - mod(base)
    if (delta > n / 2) delta -= n
    if (delta < -n / 2) delta += n
    return base + delta
  }

  // Size the cards from the stage, not the viewport, so desktop and mobile share one model.
  useLayoutEffect(() => {
    const el = stageRef.current
    const measure = () => {
      const { width, height } = el.getBoundingClientRect()
      // Card height is ~0.68 of its width (16:9 media plus a title row); keep it under 60% of the stage.
      const card = Math.min(width * (width < 640 ? 0.8 : 0.86), 560, (height * 0.6) / 0.68)
      setSize({ w: width, h: height, card })
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const paint = useCallback(() => {
    // Half the active card + half the scaled (0.8) neighbour = 0.9 of a card, plus a generous gap.
    const gap = Math.min(200, Math.max(80, size.h * 0.16))
    const Y1 = cardHeight(size.card) * 0.9 + gap
    cardRefs.current.forEach((el, i) => {
      if (!el) return
      let d = i - pos.current
      d -= n * Math.round(d / n)
      const p = place(d, Y1)
      el.style.transform = `translate3d(0, ${p.y.toFixed(2)}px, 0) rotateX(${p.rot.toFixed(2)}deg) scale(${p.scale.toFixed(4)})`
      el.style.opacity = p.opacity
      el.style.zIndex = p.z
      el.style.setProperty('--wash', p.wash.toFixed(3))
      el.style.visibility = p.opacity <= 0.01 ? 'hidden' : 'visible'
    })
  }, [size.h, n])

  const tick = useCallback(
    (now, last = now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      const diff = target.current - pos.current
      if (Math.abs(diff) < 0.0008) {
        pos.current = target.current
        paint()
        raf.current = 0
        setSettled(Number.isInteger(target.current))
        return
      }
      pos.current += diff * (1 - Math.exp(-dt * 11))
      paint()
      raf.current = requestAnimationFrame((t) => tick(t, now))
    },
    [paint],
  )

  const goTo = useCallback(
    (t, { report = true } = {}) => {
      target.current = t
      if (report) {
        const i = mod(Math.round(t))
        if (i !== index) onIndex(i)
      }
      setSettled(false)
      if (prefersReducedMotion()) {
        pos.current = t
        paint()
        setSettled(Number.isInteger(t))
        return
      }
      if (!raf.current) raf.current = requestAnimationFrame((now) => tick(now))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [index, onIndex, paint, tick],
  )

  // Parent-driven changes (dots, keyboard, deep links).
  useEffect(() => {
    if (mod(Math.round(target.current)) !== index) goTo(nearest(index), { report: false })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, goTo])

  useLayoutEffect(paint, [paint])
  useEffect(() => () => cancelAnimationFrame(raf.current), [])

  const snap = useCallback(() => {
    const t = target.current
    const i = lastDir.current > 0 ? Math.ceil(t - 0.08) : Math.floor(t + 0.08)
    goTo(i)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [goTo])

  // Wheel and trackpad turn the wheel only over its own side of the screen,
  // so scrolling the details panel never spills over into changing project.
  useEffect(() => {
    const zone = stageRef.current.closest('[data-wheel-zone]') || stageRef.current
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return
      const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? size.h : 1
      const d = e.deltaY * unit
      if (!d) return
      lastDir.current = Math.sign(d)
      goTo(target.current + d / (size.h * 0.55))
      clearTimeout(snapTimer.current)
      snapTimer.current = setTimeout(snap, 110)
    }
    zone.addEventListener('wheel', onWheel, { passive: true })
    return () => zone.removeEventListener('wheel', onWheel)
  }, [goTo, snap, n, size.h])

  // Touch and pen drag on the wheel itself.
  const onPointerDown = (e) => {
    if (e.pointerType === 'mouse') return
    drag.current = { y: e.clientY, start: target.current, moved: false, t: performance.now() }
  }
  const onPointerMove = (e) => {
    const g = drag.current
    if (!g) return
    const dy = e.clientY - g.y
    if (Math.abs(dy) > 8) g.moved = true
    if (!g.moved) return
    lastDir.current = dy < 0 ? 1 : -1
    goTo(g.start - dy / (size.card * 0.8))
  }
  const onPointerUp = () => {
    const g = drag.current
    drag.current = null
    if (!g) return
    if (g.moved) {
      suppressClick.current = true
      setTimeout(() => (suppressClick.current = false), 0)
      snap()
    }
  }

  const cardH = cardHeight(size.card)
  const pad = Math.round(size.card * 0.045)

  return (
    <div
      ref={stageRef}
      className="relative h-full w-full touch-none select-none [perspective:1100px]"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      <ol className="contents" aria-label="Work">
        {items.map((item, i) => {
          const isActive = i === index
          const live = isActive && settled && !paused
          return (
            <li
              key={item.id}
              ref={(el) => (cardRefs.current[i] = el)}
              className="absolute left-1/2 top-1/2 will-change-transform [backface-visibility:hidden]"
              style={{ width: size.card, height: cardH, marginLeft: -size.card / 2, marginTop: -cardH / 2 }}
              aria-current={isActive ? 'true' : undefined}
            >
              <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[clamp(1rem,1.8vw,1.4rem)] bg-surface shadow-[0_1px_2px_oklch(0_0_0/0.04),0_12px_32px_-18px_oklch(0_0_0/0.18)] ring-1 ring-black/[0.05]">
                <div className="relative aspect-video w-full shrink-0 overflow-hidden border-b border-black/[0.05] bg-[#fafafa]">
                  <Media item={item} live={live} open={isActive && open} />
                </div>
                <div className="flex flex-1 items-center justify-between gap-3" style={{ paddingInline: pad }}>
                  <span className="truncate text-[clamp(0.95rem,1.25vw,1.0625rem)] font-medium text-ink">{item.title}</span>
                  <span className="shrink-0 whitespace-nowrap text-[0.8125rem] tabular-nums text-ink-2">
                    <span className="hidden sm:inline">{item.kind.split(',')[0]} · </span>
                    {item.year}
                  </span>
                </div>
                {/* Neighbours fade towards the page colour, so they read as a preview. */}
                <div
                  className="pointer-events-none absolute inset-0 bg-bg"
                  style={{ opacity: 'var(--wash, 0)' }}
                  aria-hidden="true"
                />
                {!(isActive && open) && (
                  <button
                    type="button"
                    className="absolute inset-0 cursor-pointer rounded-[inherit] focus-visible:outline-offset-[-3px]"
                    aria-label={isActive ? `Open ${item.title}: ${item.tagline}` : `Show ${item.title}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => {
                      if (suppressClick.current) return
                      if (isActive) onOpen()
                      else goTo(nearest(i))
                    }}
                  />
                )}
              </div>
            </li>
          )
        })}
      </ol>
    </div>
  )
}
