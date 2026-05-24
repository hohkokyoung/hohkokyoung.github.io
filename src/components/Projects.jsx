import useInView from '../hooks/useInView'
import { projects } from '../data'

export default function Projects() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="projects" ref={ref}>
      <div className="container">
        <header className={`section__head fade-up ${inView ? 'in-view' : ''}`}>
          <span className="section-num">¶ 03</span>
          <h2 className="section-title">Selected projects.</h2>
        </header>

        <ol className={`work fade-up fade-up--d1 ${inView ? 'in-view' : ''}`}>
          {projects.map((p, i) => (
            <li key={p.title} className={`work__item${p.featured ? ' work__item--lead' : ''}`}>
              <span className="work__n">{String(i + 1).padStart(2, '0')}</span>

              <div className="work__body">
                <div className="work__topline">
                  <span className="work__tag">{p.tag}</span>
                  {p.featured && <span className="work__featured">Featured</span>}
                </div>
                <h3 className="work__title">{p.title}</h3>
                <p className="work__desc">{p.desc}</p>
                <ul className="work__tech">
                  {p.tech.map(t => <li key={t}>{t}</li>)}
                </ul>
              </div>

              <div className="work__links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noreferrer" className="btn-text">
                    Source <span>↗</span>
                  </a>
                )}
                {p.live && (
                  <a href={p.live} target="_blank" rel="noreferrer" className="btn-text">
                    Live <span>↗</span>
                  </a>
                )}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
