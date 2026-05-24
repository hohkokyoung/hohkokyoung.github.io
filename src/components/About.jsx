import useInView from '../hooks/useInView'

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={`about fade-up ${inView ? 'in-view' : ''}`}>
          <header className="about__head">
            <span className="section-num">¶ 01</span>
            <h2 className="about__title">A short introduction.</h2>
          </header>

          <div className="about__body">
            <p className="about__lede">
              I turn <em>complex problems</em> into <em>clean systems</em> — the government
              portals, payment rails, and AI pipelines that don't get blog posts written
              about them but have to work every single day.
            </p>
            <p>
              Five years across full-stack, cloud, and AI. Shipped production software used
              by Singapore government agencies — payments, compliance, thousands of users.
              Currently deep in multi-agent pipelines and RAG systems solving real problems,
              not toy demos.
            </p>
            <p className="about__dim">
              Reads broadly, trains regularly, games when the work is done.
            </p>

            <dl className="about__traits">
              {[
                ['Disposition', 'security-minded, detail-oriented'],
                ['Strength',    'fast learner, agile practitioner'],
                ['Role',        'team mentor, code reviewer'],
              ].map(([k, v]) => (
                <div key={k} className="about__trait">
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}
