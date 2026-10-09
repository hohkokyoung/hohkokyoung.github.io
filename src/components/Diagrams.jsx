// "How it's built" flows, drawn from each project's README. Vertical so they
// fit the narrow detail panel.

function Step({ title, children, accent = false }) {
  return (
    <li className="relative pl-7">
      <span
        className={`absolute left-0 top-[0.45em] h-2.5 w-2.5 rounded-full ${accent ? 'bg-ink' : 'bg-surface ring-[1.5px] ring-ink-3'}`}
        aria-hidden="true"
      />
      <p className="font-medium text-ink">{title}</p>
      <div className="mt-0.5 text-[0.9375rem] text-ink-2">{children}</div>
    </li>
  )
}

function Flow({ children, caption }) {
  return (
    <figure className="m-0">
      <ol className="relative space-y-4 before:absolute before:bottom-2 before:left-[0.3rem] before:top-2 before:w-px before:bg-line">
        {children}
      </ol>
      {caption && <figcaption className="mt-4 text-[0.875rem] text-ink-2">{caption}</figcaption>}
    </figure>
  )
}

export function PokeragDiagram() {
  return (
    <Flow caption="One retrieval agent powers Ask, the team coach and the damage-calc coach.">
      <Step title="Question">Checked against the answer and plan caches first.</Step>
      <Step title="Plan">A free keyword planner runs first; an LLM plans only when it isn’t confident. 1–6 typed tool calls.</Step>
      <Step title="Retrieve">SQL filters, learnsets, the type chart, pgvector + full-text merged by RRF, look-alikes. Run concurrently, 8-second timeout each.</Step>
      <Step title="Answer" accent>
        Closed-form questions are written by code with zero LLM calls. Otherwise the LLM answers from numbered chunks and cites them. No key or a timeout falls back to quoting the chunks.
      </Step>
    </Flow>
  )
}

export function SnuggleDiagram() {
  return (
    <Flow caption="The database is the security boundary. A check written only in the API would protect nothing.">
      <Step title="Flutter app">Riverpod state, Drift for offline messages, optimistic sends.</Step>
      <Step title="FastAPI backend (admin key)">Discover ranking, likes, boosts and photo processing, with Redis rate limits.</Step>
      <Step title="Supabase direct (user’s own token)">Chat, typing, presence and photos over Realtime and Storage.</Step>
      <Step title="Postgres 17 with row-level security" accent>
        Premium, incognito and blocks are database rules. Matches are created by the database the moment a like becomes mutual.
      </Step>
    </Flow>
  )
}

export const diagrams = { pokerag: PokeragDiagram, snuggle: SnuggleDiagram }
