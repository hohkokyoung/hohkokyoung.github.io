import { useEffect, useRef } from 'react'
import { axisVector, slabOf, solidSvg } from '../lib/iso-kit.mjs'
import '../lib/iso.css'
import './keyboard.css'
import { KEYBOARD, KEYBOARD_SVG } from './keyboardFigure'

// The wheel's keyboard. Every step of the project wheel forward presses a random key and
// types it; every step back presses Backspace. Clicking a drawn key, or pressing a key on a
// real keyboard, presses that key. A switch fires at 2 mm of its 4 mm travel. When the
// wheel jumps several projects, the presses come faster to catch up.
const { P, MM, TRAVEL, ACTUATE, HOUSE_TOP, CAP_Z, CHARS, CODES, BACKSPACE, STEMS } = KEYBOARD
const RESET = ACTUATE - 0.2
const ON_OLED = 12
const DOWN = axisVector(P, [0, 0, -1])
const LETTERS = CHARS.flatMap((c, i) => (c && c !== ' ' ? [i] : []))
const SPACE = CHARS.indexOf(' ')
const pad = (n) => String(n).padStart(2, '0')

// A real key (KeyboardEvent.code) to the drawn key it matches on this 60% layout.
const NAMED = {
  Space: 'space', Backspace: 'backspace', Enter: 'enter', Tab: 'tab', CapsLock: 'caps',
  ShiftLeft: 'shift', ShiftRight: 'rshift', ControlLeft: 'ctrl', ControlRight: 'rctrl',
  AltLeft: 'alt', AltRight: 'ralt', MetaLeft: 'win', MetaRight: 'menu', ContextMenu: 'menu',
  Backquote: '`', Minus: '-', Equal: '=', BracketLeft: '[', BracketRight: ']', Backslash: '\\',
  Semicolon: ';', Quote: "'", Comma: ',', Period: '.', Slash: '/',
}
function keyOf(code) {
  const name = NAMED[code] ?? (/^Key[A-Z]$/.test(code) ? code[3].toLowerCase() : /^Digit\d$/.test(code) ? code[5] : null)
  const i = name == null ? -1 : CODES.indexOf(name)
  return i < 0 ? null : i
}

function randomKey(previous) {
  if (Math.random() < 0.16 && previous !== SPACE) return SPACE
  let i
  do i = LETTERS[Math.floor(Math.random() * LETTERS.length)]
  while (i === previous)
  return i
}

function createEngine(root, count, startIndex) {
  const svg = root.querySelector('svg')
  const countEl = svg.querySelector('[data-part="count"]')
  const oledEl = svg.querySelector('[data-part="text"]')
  const still = window.matchMedia('(prefers-reduced-motion: reduce)')
  const keys = CHARS.map((_, i) => ({ i, el: svg.querySelector(`[data-key="${i}"]`), stem: svg.querySelector(`[data-stem="${i}"]`), at: 0, drawn: 0 }))

  // `line` counts the wheel steps typed so far and `want` the steps the wheel has taken.
  let index = startIndex
  let line = 0
  let want = 0
  let text = ''
  let lastKey = -1
  let press = null
  const taps = [] // keys clicked or typed, pressed before the wheel's next step
  const finishing = new Set() // keys still rising while the next one goes down
  let frame = 0
  let previous = 0

  function show() {
    const i = (((startIndex + line) % count) + count) % count
    countEl.textContent = `${pad(i + 1)} / ${pad(count)}`
    // Non-breaking spaces, so typed spaces keep their width in SVG text.
    oledEl.textContent = (text.slice(-ON_OLED) + '_').replaceAll(' ', ' ')
  }

  // dir is +1 for a wheel step forward, -1 for a step back and 0 for a key on its own.
  function type(dir, keyIndex, char = CHARS[keyIndex]) {
    line += dir
    if (keyIndex === BACKSPACE) text = text.slice(0, -1)
    else if (char) text += char
  }

  function draw(k) {
    if (Math.abs(k.at - k.drawn) < 0.005) return
    k.drawn = k.at
    const d = k.at * MM
    k.el.setAttribute('transform', d ? `translate(${(DOWN[0] * d).toFixed(2)} ${(DOWN[1] * d).toFixed(2)})` : '')
    k.el.toggleAttribute('data-on', k.at >= ACTUATE)
    const h = CAP_Z - HOUSE_TOP - d
    k.stem.innerHTML = h > 0.05 ? solidSvg(slabOf(STEMS[k.i], HOUSE_TOP, h, P, 2), { tone: 'mid', crease: 'none' }) : ''
  }

  function start() {
    if (taps.length) {
      const [i, char] = taps.shift()
      press = { key: keys[i], char, dir: 0, phase: 'down', actuated: false, hold: 0 }
      return
    }
    const dir = Math.sign(want - line)
    if (!dir) return
    const i = dir > 0 ? randomKey(lastKey) : BACKSPACE
    lastKey = i
    press = { key: keys[i], dir, phase: 'down', actuated: false, hold: 0 }
  }

  function tick(now) {
    const dt = previous ? Math.min((now - previous) / 1000, 1 / 30) : 1 / 60
    previous = now
    if (!press) start()
    if (press) {
      const p = press
      const k = p.key
      // Behind by three or more: type faster to catch up.
      const hurry = Math.abs(want - line) + taps.length >= 3 ? 0.45 : 1
      const target = p.phase === 'up' ? 0 : TRAVEL
      k.at += (target - k.at) * (1 - Math.exp(-dt / ((p.phase === 'up' ? 0.035 : 0.016) * hurry)))
      if (Math.abs(target - k.at) < 0.02) k.at = target
      if (!p.actuated && k.at >= ACTUATE) {
        p.actuated = true
        type(p.dir, k.i, p.char)
      }
      if (p.phase === 'down' && k.at === TRAVEL) p.phase = 'hold'
      if (p.phase === 'hold' && (p.hold += dt) > 0.04 * hurry) p.phase = 'up'
      draw(k)
      // The next key can start once this one has reset, as fingers overlap when typing fast.
      if (p.phase === 'up' && (k.at === 0 || (hurry < 1 && k.at < RESET))) {
        if (k.at !== 0) finishing.add(k)
        press = null
      }
    }
    for (const k of finishing) {
      if (press?.key === k) {
        finishing.delete(k)
        continue
      }
      k.at += (0 - k.at) * (1 - Math.exp(-dt / 0.035))
      if (k.at < 0.02) {
        k.at = 0
        finishing.delete(k)
      }
      draw(k)
    }
    show()
    frame = press || finishing.size || taps.length || want !== line ? requestAnimationFrame(tick) : 0
  }

  function run() {
    if (!frame) {
      previous = 0
      frame = requestAnimationFrame(tick)
    }
  }

  function go(next) {
    // The wheel loops, so take the shortest way round, as the wheel itself does.
    let d = (((next - index) % count) + count) % count
    if (d > count / 2) d -= count
    index = next
    if (!d) return
    want += d
    if (still.matches) {
      while (line !== want) {
        const dir = Math.sign(want - line)
        lastKey = dir > 0 ? randomKey(lastKey) : BACKSPACE
        type(dir, lastKey)
      }
      show()
      return
    }
    run()
  }

  function tap(i, char) {
    if (still.matches) {
      type(0, i, char)
      show()
      return
    }
    taps.push([i, char])
    run()
  }

  show()
  return { go, tap, stop: () => cancelAnimationFrame(frame) }
}

export default function Keyboard({ index, count }) {
  const ref = useRef(null)
  const engine = useRef(null)

  // Start from wherever the wheel is on mount; later changes arrive through go().
  useEffect(() => {
    engine.current = createEngine(ref.current, count, index)
    return () => engine.current.stop()
  }, [count])

  useEffect(() => {
    engine.current?.go(index)
  }, [index])

  // Typing on a real keyboard presses the same key here.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.target.closest?.('[role="slider"], input, textarea')) return
      const i = keyOf(e.code)
      if (i == null) return
      engine.current?.tap(i, e.key.length === 1 ? e.key : undefined)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Any drawn key can be clicked: it goes down and types, without moving the wheel.
  const onClick = (event) => {
    const key = event.target.closest('[data-key]')
    if (key) engine.current?.tap(Number(key.dataset.key))
  }

  return (
    <div
      ref={ref}
      className="iso kb-figure"
      data-theme="light"
      onClick={onClick}
      dangerouslySetInnerHTML={{ __html: KEYBOARD_SVG }}
    />
  )
}
