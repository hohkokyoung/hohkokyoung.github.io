import useInView from '../hooks/useInView'

const cards = [
  { icon: '🏢', title: 'Current Role', desc: 'Software Engineer at The Software Practice, building Singapore government systems for 3+ years.', color: 'blue' },
  { icon: '🤖', title: 'AI & Agents', desc: 'Building multi-agent pipelines and RAG systems — pushing dev efficiency with LLMs in real workflows.', color: 'white' },
  { icon: '🌏', title: 'Location', desc: 'Based in Choa Chu Kang, Singapore. Open to new opportunities locally and regionally.', color: 'white' },
  { icon: '🚀', title: 'Passion', desc: 'Shipping clean, secure, and scalable software — and exploring what AI-assisted development can become.', color: 'accent' },
]

export default function About() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="about" ref={ref}>
      <div className="container">
        <div className={`about__grid ${inView ? 'in-view' : ''}`}>
          <div className="about__text fade-left">
            <div className="section-label">About me</div>
            <h2 className="section-title">Turning complex <span className="gradient-text">problems</span> into elegant solutions</h2>
            <p>
              I'm a software engineer with 5+ years of experience across full-stack development, cloud infrastructure, and AI systems. I've shipped production software used by Singapore government agencies — handling payments, compliance, and thousands of users.
            </p>
            <p style={{ marginTop: '16px' }}>
              Lately I've been deep in AI — building multi-agent pipelines and RAG systems that solve real problems. When I'm not at the keyboard, I'm reading, at the gym, swimming, or gaming.
            </p>

            <div className="chip-group">
              {['Security-minded', 'Detail-oriented', 'Team mentor', 'Fast learner', 'Agile practitioner'].map(c => (
                <span className="chip" key={c}>{c}</span>
              ))}
            </div>

            <div className="about__langs">
              <span className="about__lang-label">Languages spoken:</span>
              <span className="chip chip--sm">English (Proficient)</span>
              <span className="chip chip--sm">Mandarin (Fluent)</span>
            </div>

            <a href="mailto:kokyoung1520@gmail.com" className="btn btn--primary" style={{ marginTop: '8px' }}>
              Let's talk
            </a>
          </div>

          <div className="about__cards fade-right">
            {cards.map(c => (
              <div className={`about-card about-card--${c.color}`} key={c.title}>
                <div className="about-card__icon">{c.icon}</div>
                <div className="about-card__title">{c.title}</div>
                <div className="about-card__desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
