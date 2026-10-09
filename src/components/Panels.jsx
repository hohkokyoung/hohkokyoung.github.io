import { useState } from 'react'
import { education, experiences, profile, skills } from '../data'
import { diagrams } from './Diagrams'
import Gallery from './Gallery'
import { ArrowLeft, ArrowUpRight, Check, Copy, GitHub, LinkedIn, Mail, User } from './Icons'

function Back({ onClick, label = 'All work' }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group -ml-2 inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
    >
      <ArrowLeft width={15} height={15} className="transition-transform group-hover:-translate-x-0.5" />
      {label}
    </button>
  )
}

export function IntroPanel({ onAbout, onContact, panel, hint }) {
  return (
    <div>
      <h1 className="text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.015em]">
        {profile.name}
        <span className="block text-ink-3">{profile.role}</span>
      </h1>
      <p className="mt-6 max-w-[25rem] text-[1.0625rem] text-ink-2">
        I build AI that cites its sources, mobile apps with their rules in the database, and government systems
        that take real payments. Based in {profile.location}.
      </p>
      <div className="mt-8 flex gap-2">
        <button type="button" className="icon-btn" aria-label="About me" aria-pressed={panel === 'about'} onClick={onAbout}>
          <User width={19} height={19} />
        </button>
        <button type="button" className="icon-btn" aria-label="Contact" aria-pressed={panel === 'contact'} onClick={onContact}>
          <Mail width={19} height={19} />
        </button>
        <a className="icon-btn" href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub (opens in a new tab)">
          <GitHub width={19} height={19} />
        </a>
      </div>
      {hint && <p className="mt-10 hidden text-[0.875rem] text-ink-3 lg:block">{hint}</p>}
    </div>
  )
}

export function ProjectPanel({ item, onClose, onNext, nextTitle }) {
  const [showBuild, setShowBuild] = useState(false)
  const Diagram = item.diagram ? diagrams[item.diagram] : null

  return (
    <div className="swap-in" key={item.id}>
      <div style={{ '--i': 0 }}>
        <Back onClick={onClose} />
      </div>
      <p className="mt-6 text-[0.875rem] text-ink-2" style={{ '--i': 1 }}>
        {item.kind} · {item.year}
      </p>
      <h2 className="mt-1 text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.015em]" style={{ '--i': 1 }}>
        {item.title}
      </h2>
      <p className="mt-2 text-[1.125rem] leading-snug text-ink-2" style={{ '--i': 2 }}>
        {item.tagline}
      </p>
      <p className="mt-6 text-ink-2" style={{ '--i': 3 }}>
        {item.summary}
      </p>

      <dl className="mt-7 space-y-4" style={{ '--i': 4 }}>
        {item.highlights.map((h) => (
          <div key={h.title}>
            <dt className="font-medium text-ink">{h.title}</dt>
            <dd className="mt-0.5 text-[0.9375rem] text-ink-2">{h.body}</dd>
          </div>
        ))}
      </dl>

      {item.gallery && (
        <div className="mt-7" style={{ '--i': 5 }}>
          <Gallery title={item.title} gallery={item.gallery} />
        </div>
      )}

      <p className="mt-7 text-[0.875rem] text-ink-2" style={{ '--i': 5 }}>
        {item.stack.join(' · ')}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2" style={{ '--i': 6 }}>
        {item.links.map((l) => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-1">
            {l.label}
            <ArrowUpRight width={14} height={14} />
          </a>
        ))}
        {item.note && <p className="text-[0.9375rem] text-ink-2">{item.note}</p>}
      </div>

      {Diagram && (
        <div className="mt-7 border-t border-line pt-5" style={{ '--i': 7 }}>
          <button
            type="button"
            aria-expanded={showBuild}
            onClick={() => setShowBuild((s) => !s)}
            className="inline-flex items-center gap-2 font-medium text-ink"
          >
            <span className={`inline-block transition-transform duration-300 ${showBuild ? 'rotate-45' : ''}`} aria-hidden="true">
              +
            </span>
            How it’s built
          </button>
          {showBuild && (
            <div className="swap-in mt-5">
              <Diagram />
            </div>
          )}
        </div>
      )}

      {nextTitle && (
        <button
          type="button"
          onClick={onNext}
          className="mt-8 inline-flex items-center gap-1.5 text-[0.9375rem] text-ink-2 transition-colors hover:text-ink"
          style={{ '--i': 8 }}
        >
          Next: {nextTitle} <span aria-hidden="true">↓</span>
        </button>
      )}
    </div>
  )
}

export function AboutPanel({ onClose }) {
  return (
    <div className="swap-in">
      <div style={{ '--i': 0 }}>
        <Back onClick={onClose} label="Back" />
      </div>
      <div className="mt-6 flex items-center gap-4" style={{ '--i': 1 }}>
        <img src="media/portrait.jpg" alt="" width="64" height="80" className="h-16 w-16 rounded-2xl object-cover object-top" />
        <div>
          <h2 className="text-[1.5rem] font-medium leading-tight">About</h2>
          <p className="text-[0.9375rem] text-ink-2">
            {profile.role}, {profile.company}
          </p>
        </div>
      </div>
      <p className="mt-6 text-ink-2" style={{ '--i': 2 }}>
        I co-lead the Singapore Land Authority’s land portal at {profile.company}. Outside work I build to learn the hard
        parts properly: retrieval that has to prove its answers, a mobile app whose security lives in Postgres, and agent
        pipelines that turn a spec into tested code.
      </p>

      <h3 className="mt-8 font-medium" style={{ '--i': 3 }}>
        Experience
      </h3>
      <ol className="mt-3 space-y-5" style={{ '--i': 3 }}>
        {experiences.map((e) => (
          <li key={e.role + e.period}>
            <p className="flex flex-wrap items-baseline justify-between gap-x-3">
              <span className="font-medium text-ink">
                {e.role}, {e.company}
              </span>
              <span className="text-[0.875rem] tabular-nums text-ink-2">{e.period}</span>
            </p>
            <ul className="mt-1 space-y-1">
              {e.points.map((p) => (
                <li
                  key={p}
                  className="bullet text-[0.9375rem] text-ink-2"
                >
                  {p}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>

      <h3 className="mt-8 font-medium" style={{ '--i': 4 }}>
        Toolkit
      </h3>
      <dl className="mt-3 space-y-1.5" style={{ '--i': 4 }}>
        {skills.map((s) => (
          <div key={s.group} className="grid grid-cols-[7.5rem_1fr] gap-3 text-[0.9375rem]">
            <dt className="text-ink-2">{s.group}</dt>
            <dd className="text-ink">{s.items}</dd>
          </div>
        ))}
      </dl>

      <h3 className="mt-8 font-medium" style={{ '--i': 5 }}>
        Education and certification
      </h3>
      <ul className="mt-3 space-y-2" style={{ '--i': 5 }}>
        {education.map((e) => (
          <li key={e.degree} className="bullet text-[0.9375rem]">
            <span className="text-ink">{e.degree}</span>
            <span className="text-ink-2">
              , {e.school}
              {e.note ? `, ${e.note}` : ''}, {e.year}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ContactPanel({ onClose }) {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <div className="swap-in">
      <div style={{ '--i': 0 }}>
        <Back onClick={onClose} label="Back" />
      </div>
      <h2 className="mt-6 text-[clamp(1.75rem,2.6vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.015em]" style={{ '--i': 1 }}>
        Let’s talk
      </h2>
      <p className="mt-3 max-w-[26rem] text-ink-2" style={{ '--i': 2 }}>
        I’m open to senior engineering, AI tooling and platform roles. Email is the quickest way to reach me.
      </p>
      <div className="mt-7 flex flex-wrap items-center gap-3" style={{ '--i': 3 }}>
        <a href={`mailto:${profile.email}`} className="text-link text-[1.25rem] font-medium">
          {profile.email}
        </a>
        <button
          type="button"
          onClick={copy}
          className="inline-flex items-center gap-1.5 rounded-full bg-surface px-3 py-1.5 text-[0.875rem] text-ink-2 transition-colors hover:text-ink"
        >
          {copied ? <Check width={14} height={14} /> : <Copy width={14} height={14} />}
          <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <ul className="mt-6 space-y-2" style={{ '--i': 4 }}>
        <li>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
            <LinkedIn width={15} height={15} /> LinkedIn
          </a>
        </li>
        <li>
          <a href={profile.github} target="_blank" rel="noopener noreferrer" className="text-link inline-flex items-center gap-2">
            <GitHub width={15} height={15} /> GitHub
          </a>
        </li>
      </ul>
    </div>
  )
}
