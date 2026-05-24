import useInView from '../hooks/useInView'

const channels = [
  { label: 'Email',    val: 'kokyoung1520@gmail.com',      href: 'mailto:kokyoung1520@gmail.com' },
  { label: 'Phone',    val: '+65 9468 4462',               href: 'tel:+6594684462' },
  { label: 'LinkedIn', val: 'linkedin.com/in/hohkokyoung', href: 'https://www.linkedin.com/in/hohkokyoung/' },
  { label: 'GitHub',   val: 'github.com/hohkokyoung',      href: 'https://github.com/hohkokyoung' },
]

export default function Contact() {
  const [ref, inView] = useInView()

  return (
    <section className="section section--contact" id="contact" ref={ref}>
      <div className="container">
        <div className={`contact fade-up ${inView ? 'in-view' : ''}`}>
          <span className="section-num">¶ 06</span>
          <h2 className="contact__heading">
            Let's work<br /><em>together.</em>
          </h2>

          <dl className="contact__list">
            {channels.map(c => (
              <div key={c.label} className={`contact__row${c.primary ? ' contact__row--primary' : ''}`}>
                <dt>{c.label}</dt>
                <dd>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                  >
                    {c.val} <span className="contact__arrow">→</span>
                  </a>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
