// Cards for projects without a demo video show a real artifact from the repo:
// an excerpt of the actual code or agent definition, a diagram of the core
// mechanism, or the app's own map data.
// Sized in container units so they scale with the card.

const K = ({ children }) => <span className="font-semibold text-ink">{children}</span>
const Dim = ({ children }) => <span className="text-ink-3">{children}</span>

function Code({ file, children }) {
  return (
    <div className="flex h-full flex-col bg-[#fafafa] px-[5cqw] pt-[4cqw] text-ink-2">
      <p className="mb-[3cqw] flex items-center justify-between font-sans text-[2.5cqw] text-ink-3">
        <span>{file}</span>
        <span>excerpt</span>
      </p>
      <pre className="m-0 overflow-hidden font-[ui-monospace,SFMono-Regular,Menlo,monospace] text-[2.3cqw] leading-[1.55]">
        {children}
      </pre>
    </div>
  )
}

// Hybrid retrieval: two ranked lists fused with Reciprocal Rank Fusion (k = 60).
// Ticket ids are illustrative; scores are the real RRF arithmetic for these ranks.
const DENSE = ['18204', '20931', '11872', '27765', '09341']
const BM25 = ['20931', '31408', '18204', '09341', '14450']
const RRF_K = 60

const fused = (() => {
  const scores = {}
  for (const list of [DENSE, BM25]) {
    list.forEach((id, i) => { scores[id] = (scores[id] ?? 0) + 1 / (RRF_K + i + 1) })
  }
  return Object.entries(scores).sort((a, b) => b[1] - a[1]).slice(0, DENSE.length)
})()
const fusedIds = fused.map(([id]) => id)
const inBoth = (id) => DENSE.includes(id) && BM25.includes(id)

const ROW = 'h-[5.4cqw] py-[0.55cqw]'
const MONO = 'font-[ui-monospace,SFMono-Regular,Menlo,monospace]'

function RankList({ label, ids }) {
  return (
    <div>
      <p className="mb-[1.4cqw] text-[2.1cqw] text-ink-3">{label}</p>
      {ids.map((id, i) => (
        <div key={id} className={ROW}>
          <div
            className={`flex h-full items-center gap-[1.4cqw] rounded-[1.2cqw] border px-[1.6cqw] ${MONO} text-[2cqw] ${
              fusedIds.includes(id) ? 'border-black/[0.08] bg-white text-ink' : 'border-transparent text-ink-3'
            }`}
          >
            <span className="text-ink-3">{i + 1}</span>
            <span>#{id}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

function Links({ from, side }) {
  const n = from.length
  return (
    <div className="flex flex-col">
      <p className="mb-[1.4cqw] text-[2.1cqw]">&nbsp;</p>
      <svg viewBox={`0 0 100 ${n * 100}`} preserveAspectRatio="none" className="w-full" style={{ height: `${n * 5.4}cqw` }}>
        {from.map((id, i) => {
          const j = fusedIds.indexOf(id)
          if (j < 0) return null
          const [y1, y2] = side === 'left' ? [i * 100 + 50, j * 100 + 50] : [j * 100 + 50, i * 100 + 50]
          return (
            <path
              key={id}
              d={`M0 ${y1} C50 ${y1} 50 ${y2} 100 ${y2}`}
              fill="none"
              stroke={inBoth(id) ? 'var(--ink-2)' : 'var(--ink-3)'}
              strokeOpacity={inBoth(id) ? 0.7 : 0.35}
              strokeWidth="1.25"
              vectorEffect="non-scaling-stroke"
            />
          )
        })}
      </svg>
    </div>
  )
}

function RrfFusion() {
  const max = fused[0][1]
  return (
    <div className="flex h-full flex-col bg-[#fafafa] px-[5cqw] pt-[4cqw] font-sans text-ink-2">
      <p className="mb-[2.6cqw] flex items-center justify-between text-[2.5cqw] text-ink-3">
        <span>Hybrid retrieval, fused with RRF</span>
        <span>Illustrative</span>
      </p>
      <div className="mb-[3cqw] flex items-center gap-[1.6cqw] rounded-[1.4cqw] border border-black/[0.08] bg-white px-[2cqw] py-[1.5cqw] text-[2.3cqw]">
        <span className="text-ink-3">New ticket</span>
        <span className="text-ink">“Login fails after password reset on the mobile app”</span>
      </div>
      <div className="grid grid-cols-[1fr_7cqw_1.5fr_7cqw_1fr]">
        <RankList label="Dense · embeddings" ids={DENSE} />
        <Links from={DENSE} side="left" />
        <div>
          <p className="mb-[1.4cqw] flex justify-between text-[2.1cqw] text-ink-3">
            <span>Fused</span>
            <span className={MONO}>Σ 1 / (60 + rank)</span>
          </p>
          {fused.map(([id, score], i) => (
            <div key={id} className={ROW}>
              <div className="relative flex h-full items-center gap-[1.4cqw] overflow-hidden rounded-[1.2cqw] border border-black/[0.1] bg-white px-[1.6cqw] text-[2cqw] text-ink">
                <span
                  className="absolute inset-y-0 left-0 bg-black/[0.05]"
                  style={{ width: `${(score / max) * 100}%` }}
                />
                <span className={`relative text-ink-3 ${MONO}`}>{i + 1}</span>
                <span className={`relative ${MONO} ${inBoth(id) ? 'font-semibold' : ''}`}>#{id}</span>
                <span className={`relative ml-auto text-ink-3 ${MONO}`}>{score.toFixed(4)}</span>
              </div>
            </div>
          ))}
        </div>
        <Links from={BM25} side="right" />
        <RankList label="BM25 · keywords" ids={BM25} />
      </div>
    </div>
  )
}

function PlannerAgent() {
  return (
    <Code file=".claude/agents/planner.md">
      <Dim>---</Dim>{'\n'}
      <K>name</K>: planner{'\n'}
      <K>description</K>: Decomposes a user goal into 3–8 small,{'\n'}
      {'  '}well-scoped task files. Never designs architecture.{'\n'}
      <K>tools</K>: Read, Glob, Grep, Write{'\n'}
      <Dim>---</Dim>{'\n'}
      {'\n'}
      <K>### What your output MUST NOT contain</K>{'\n'}
      - File names{'\n'}
      - Class names{'\n'}
      - Function names
    </Code>
  )
}

function StateMap() {
  return (
    <div className="relative h-full bg-[#fafafa]">
      <img src="media/msia-map.svg" alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <p className="absolute inset-x-[5cqw] top-[4cqw] flex justify-between font-sans text-[2.5cqw] text-ink-3">
        <span>Incident severity by state</span>
        <span>Illustrative</span>
      </p>
      <div className="absolute bottom-[4cqw] left-[5cqw] flex items-center gap-[1.5cqw] font-sans text-[2.2cqw] text-ink-3">
        <span>Low</span>
        <span className="flex overflow-hidden rounded-full">
          {['#ebe5e2', '#efcbc0', '#e4a18e', '#d2705a', '#b04130'].map((c) => (
            <span key={c} className="h-[1.4cqw] w-[4cqw]" style={{ background: c }} />
          ))}
        </span>
        <span>High</span>
      </div>
    </div>
  )
}

const visuals = { rrf: RrfFusion, planner: PlannerAgent, map: StateMap }

export default function CardVisual({ name }) {
  const V = visuals[name]
  return (
    <div className="h-full w-full [container-type:inline-size]" aria-hidden="true">
      <V />
    </div>
  )
}
