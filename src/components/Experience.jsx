import { useState } from 'react'
import useInView from '../hooks/useInView'
import { experiences } from '../data'

export default function Experience() {
  const [ref, inView] = useInView()
  const [active, setActive] = useState(0)
  const exp = experiences[active]

  return (
    <section className="section section--alt" id="experience" ref={ref}>
      <div className="container">
        <div className={`fade-up ${inView ? 'in-view' : ''}`}>
          <div className="section-label">Where I've worked</div>
          <h2 className="section-title">Work <span className="gradient-text">experience</span></h2>
        </div>

        <div className={`exp__layout fade-up fade-up--delay-1 ${inView ? 'in-view' : ''}`}>
          {/* Sidebar tabs */}
          <div className="exp__tabs-wrap">
          <div className="exp__tabs">
            {experiences.map((e, i) => (
              <button
                key={i}
                className={`exp__tab ${active === i ? 'exp__tab--active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp__tab-company">{e.company.split('(')[0].trim()}</span>
                <span className="exp__tab-role">{e.role}</span>
                <span className="exp__tab-period">{e.period}</span>
              </button>
            ))}
          </div>
          </div>

          {/* Content panel */}
          <div className="exp__panel" key={active}>
            <div className="exp__panel-header">
              <div>
                <h3 className="exp__role">{exp.role}</h3>
                <div className="exp__meta">
                  <span className="exp__company">{exp.company}</span>
                  <span className="exp__sep">·</span>
                  <span className="exp__location">{exp.location}</span>
                </div>
              </div>
              <div className="exp__badge-group">
                <span className="exp__period">
                  {exp.current
                    ? exp.period.replace('Present', '')
                    : exp.period}
                  {exp.current && <span className="badge badge--current">Present</span>}
                </span>
              </div>
            </div>

            <ul className="exp__highlights">
              {exp.highlights.map((h, i) => (
                <li key={i} className="exp__highlight" style={{ animationDelay: `${i * 60}ms` }}>
                  <span className="exp__bullet" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
