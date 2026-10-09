import { useCallback, useEffect, useState } from 'react'
import { work } from './data'
import Wheel from './components/Wheel'
import Sheet from './components/Sheet'
import VideoPlayer from './components/VideoPlayer'
import CardVisual from './components/CardVisual'
import { AboutPanel, ContactPanel, IntroPanel, ProjectPanel } from './components/Panels'
import useMediaQuery from './lib/useMediaQuery'

function fromHash() {
  const h = window.location.hash.slice(1)
  const i = work.findIndex((w) => w.id === h)
  if (i >= 0) return { index: i, panel: 'project' }
  if (h === 'about' || h === 'contact') return { index: 0, panel: h }
  return { index: 0, panel: 'intro' }
}

function SheetMedia({ item }) {
  const m = item.media
  return (
    <div className="mb-6 overflow-hidden rounded-2xl bg-surface ring-1 ring-black/[0.05]">
      <div className="aspect-video">
        {m.type === 'video' && (
          <VideoPlayer src={m.src} poster={m.poster} label={`${item.title} demo video`} audio={m.audio} playing controls className="h-full w-full" />
        )}
        {m.type === 'image' && <img src={m.src} alt={m.alt} className="h-full w-full object-cover object-left-top" />}
        {m.type === 'visual' && (
          <CardVisual name={m.visual} />
        )}
      </div>
    </div>
  )
}

export default function App() {
  const [{ index, panel }, setState] = useState(fromHash)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const item = work[index]

  const setIndex = useCallback((i) => setState((s) => ({ ...s, index: i })), [])
  const setPanel = useCallback((p) => setState((s) => ({ ...s, panel: p })), [])
  const close = useCallback(() => setPanel('intro'), [setPanel])
  const step = useCallback(
    (dir) => setState((s) => ({ ...s, index: (s.index + dir + work.length) % work.length })),
    [],
  )

  // Keep the URL shareable: #pokerag opens that project, #about and #contact their panels.
  useEffect(() => {
    const hash = panel === 'project' ? `#${item.id}` : panel === 'intro' ? '' : `#${panel}`
    history.replaceState(null, '', window.location.pathname + window.location.search + hash)
  }, [panel, item.id])

  // Links and the back button change the hash without a reload.
  useEffect(() => {
    const onHash = () => setState(fromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  useEffect(() => {
    const onKey = (e) => {
      if (e.target.closest?.('[role="slider"], input, textarea')) return
      if (e.key === 'Escape' && panel !== 'intro') close()
      if (['ArrowDown', 'PageDown', 'j'].includes(e.key)) {
        e.preventDefault()
        step(1)
      }
      if (['ArrowUp', 'PageUp', 'k'].includes(e.key)) {
        e.preventDefault()
        step(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [panel, close, step])

  const toggle = (p) => setPanel(panel === p ? 'intro' : p)
  const next = work[(index + 1) % work.length]
  const projectOpen = panel === 'project'

  const panelContent =
    panel === 'project' ? (
      <ProjectPanel item={item} onClose={close} onNext={() => step(1)} nextTitle={next?.title} />
    ) : panel === 'about' ? (
      <AboutPanel onClose={close} />
    ) : panel === 'contact' ? (
      <ContactPanel onClose={close} />
    ) : null

  return (
    <>
      <main className="flex h-dvh flex-col overflow-hidden lg:grid lg:grid-cols-[minmax(26rem,44%)_1fr]">
        <div
          data-scroll
          className="relative z-10 flex shrink-0 px-5 pb-1 pt-[max(1.5rem,env(safe-area-inset-top))] lg:scroll-fade lg:h-dvh lg:overflow-y-auto lg:px-[clamp(2.5rem,8vw,9rem)] lg:py-0"
        >
          <div className="w-full max-w-[31rem] lg:my-auto lg:py-20">
            {isDesktop && panelContent ? (
              panelContent
            ) : (
              <IntroPanel
                panel={panel}
                onAbout={() => toggle('about')}
                onContact={() => toggle('contact')}
                hint="Scroll over the cards to browse. Click one for the details."
              />
            )}
          </div>
        </div>

        <div data-wheel-zone className="relative min-h-0 flex-1 overflow-hidden lg:h-dvh">
          <div
            className={`h-full transition-transform duration-700 ease-[var(--ease-out-expo)] ${
              isDesktop && projectOpen ? 'scale-[1.1]' : ''
            }`}
          >
            <Wheel
              items={work}
              index={index}
              onIndex={setIndex}
              open={isDesktop && projectOpen}
              paused={!isDesktop && panel !== 'intro'}
              onOpen={() => setPanel('project')}
            />
          </div>

          <nav aria-label="Projects" className="absolute right-3 top-1/2 -translate-y-1/2 lg:right-8">
            <ol className="flex flex-col gap-1">
              {work.map((w, i) => (
                <li key={w.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Show ${w.title}`}
                    aria-current={i === index ? 'true' : undefined}
                    className="group flex h-5 w-5 items-center justify-center"
                  >
                    <span
                      className={`block h-[5px] w-[5px] rounded-full transition-[background-color,transform] duration-300 ${
                        i === index ? 'scale-125 bg-ink' : 'bg-ink-3/50 group-hover:bg-ink-3'
                      }`}
                    />
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </main>

      {!isDesktop && panel !== 'intro' && (
        <Sheet label={panel === 'project' ? item.title : panel === 'about' ? 'About' : 'Contact'} onClose={close}>
          {panel === 'project' && <SheetMedia item={item} />}
          {panelContent}
        </Sheet>
      )}
    </>
  )
}
