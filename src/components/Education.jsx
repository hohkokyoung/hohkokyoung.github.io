import useInView from '../hooks/useInView'
import { education, certifications } from '../data'

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="education" ref={ref}>
      <div className="container">
        <header className={`section__head fade-up ${inView ? 'in-view' : ''}`}>
          <span className="section-num">¶ 05</span>
          <h2 className="section-title">Education &amp; credentials.</h2>
        </header>

        <div className={`edu fade-up fade-up--d1 ${inView ? 'in-view' : ''}`}>
          <div className="edu__col">
            <h3 className="edu__col-hd">Academic</h3>
            {education.map((e, i) => (
              <article className="edu__entry" key={i}>
                <h4 className="edu__school">{e.school}</h4>
                <p className="edu__deg">{e.degree}</p>
                <p className="edu__major">Major · {e.major}</p>
                <p className="edu__meta">GPA {e.gpa} · {e.period}</p>
                {e.honors.length > 0 && (
                  <ul className="edu__honors">
                    {e.honors.map(h => <li key={h}>{h}</li>)}
                  </ul>
                )}
              </article>
            ))}
          </div>

          <div className="edu__col">
            <h3 className="edu__col-hd">Certifications</h3>
            {certifications.map((c, i) => (
              <article className="cert" key={i}>
                <span className="cert__yr">{c.year}</span>
                <div>
                  <p className="cert__name">{c.name}</p>
                  <p className="cert__lvl">{c.level}</p>
                </div>
              </article>
            ))}

            <h3 className="edu__col-hd edu__col-hd--gap">Outside work</h3>
            <p className="edu__off">Reading · Gym · Swimming · Gaming</p>
          </div>
        </div>
      </div>
    </section>
  )
}
