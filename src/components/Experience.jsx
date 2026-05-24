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
        <header className={`section__head fade-up ${inView ? 'in-view' : ''}`}>
          <span className="section-num">¶ 02</span>
          <h2 className="section-title">Work history.</h2>
        </header>

        <div className={`exp fade-up fade-up--d1 ${inView ? 'in-view' : ''}`}>
          <nav className="exp__nav">
            {experiences.map((e, i) => (
              <button
                key={i}
                className={`exp__tab ${active === i ? 'is-active' : ''}`}
                onClick={() => setActive(i)}
              >
                <span className="exp__tab-yr">{e.period.split(' ').slice(0, 2).join(' ')}</span>
                <span className="exp__tab-co">{e.role}</span>
              </button>
            ))}
          </nav>

          <article className="exp__detail" key={active}>
            <header className="exp__detail-head">
              <h3 className="exp__role">{exp.role}</h3>
              <p className="exp__co">{exp.company} · {exp.location}</p>
              <p className="exp__period">
                {exp.current ? <>{exp.period.split('–')[0].trim()} – <em>Current</em></> : exp.period}
              </p>
            </header>

            <ol className="exp__list">
              {exp.highlights.map((h, i) => (
                <li key={i}>
                  <span className="exp__list-n">{String(i + 1).padStart(2, '0')}</span>
                  <span>{h}</span>
                </li>
              ))}
            </ol>
          </article>
        </div>
      </div>
    </section>
  )
}
