import useInView from '../hooks/useInView'
import { projects } from '../data'

function IconGithub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  )
}

function IconExternal() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section className="section section--alt" id="projects" ref={ref}>
      <div className="container">
        <div className={`fade-up ${inView ? 'in-view' : ''}`} style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>What I've built</div>
          <h2 className="section-title">Featured <span className="gradient-text">projects</span></h2>
          <p className="section-desc">A selection of things I'm proud of — from government systems to FYP research.</p>
        </div>

        <div className="projects__grid">
          {projects.map((p, i) => (
            <div
              key={p.title}
              className={`project-card ${p.featured ? 'project-card--featured' : ''} fade-up ${inView ? 'in-view' : ''}`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="project-card__header">
                <span className="project-card__tag">{p.tag}</span>
                <div className="project-card__links">
                  {p.github && <a href={p.github} target="_blank" rel="noreferrer" className="icon-btn" title="Source code"><IconGithub /></a>}
                  {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="icon-btn" title="Live site"><IconExternal /></a>}
                </div>
              </div>
              <div className="project-card__emoji">{p.emoji}</div>
              <h3 className="project-card__title">{p.title}</h3>
              <p className="project-card__desc">{p.desc}</p>
              <div className="project-card__tech">
                {p.tech.map(t => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
