import useInView from '../hooks/useInView'
import { education, certifications } from '../data'

export default function Education() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="education" ref={ref}>
      <div className="container">
        <div className={`fade-up ${inView ? 'in-view' : ''}`}>
          <div className="section-label">Background</div>
          <h2 className="section-title">Education & <span className="gradient-text">certifications</span></h2>
        </div>

        <div className="edu__layout">
          {/* Education */}
          <div className={`edu__col fade-left ${inView ? 'in-view' : ''}`}>
            <h3 className="edu__col-title">🎓 Education</h3>
            <div className="edu__list">
              {education.map((e, i) => (
                <div className="edu-card" key={i}>
                  <div className="edu-card__school">{e.school}</div>
                  <div className="edu-card__degree">{e.degree}</div>
                  <div className="edu-card__major">Major: {e.major}</div>
                  <div className="edu-card__footer">
                    <div className="edu-card__meta">
                      <span className="edu-card__gpa">GPA {e.gpa}</span>
                      <span className="edu-card__period">{e.period}</span>
                    </div>
                    {e.honors.length > 0 && (
                      <div className="edu-card__honors">
                        {e.honors.map(h => (
                          <span className="badge badge--gold" key={h}>🏆 {h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className={`edu__col fade-right ${inView ? 'in-view' : ''}`}>
            <h3 className="edu__col-title">📜 Certifications</h3>
            <div className="cert__list">
              {certifications.map((c, i) => (
                <div className="cert-card" key={i}>
                  <div className="cert-card__icon" style={{ background: `${c.color}18`, color: c.color }}>
                    {c.icon}
                  </div>
                  <div className="cert-card__body">
                    <div className="cert-card__name">{c.name}</div>
                    <div className="cert-card__level">{c.level}</div>
                  </div>
                  <div className="cert-card__year">{c.year}</div>
                </div>
              ))}
            </div>

            <div className="interests-card">
              <h4 className="interests-card__title">Outside of work</h4>
              <div className="interests-card__items">
                {[['📚', 'Reading'], ['💪', 'Workout'], ['🏊', 'Swimming'], ['🎮', 'Gaming']].map(([e, l]) => (
                  <div className="interest-item" key={l}>
                    <span>{e}</span>
                    <span>{l}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
