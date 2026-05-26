import { useState } from 'react'

export default function Hero() {
  const [imgError, setImgError] = useState(false)

  return (
    <section className="hero" id="home">
      <div className="container hero__inner">
        <div className="hero__text">
          <p className="hero__eyebrow">
            <span>HOH KOK YOUNG</span>
            <span className="hero__eyebrow-rule" />
            <span>SINGAPORE · 2026</span>
          </p>

          <h1 className="hero__headline">
            Real systems.<br />
            Real users.<br />
            <em>Real stakes.</em>
          </h1>

          <p className="hero__sub">
            Singapore government portals managing land sales across the island.
            Payment systems processing hundreds of thousands. Multi-agent AI
            pipelines built from scratch. None of it a prototype.
          </p>

          <dl className="hero__meta">
            <div><dt>Now</dt><dd>The Software Practice · Singapore</dd></div>
            <div><dt>Focus</dt><dd>Full-stack · Cloud · Multi-agent AI</dd></div>
            <div><dt>Stack</dt><dd>React · C# · Python · AWS</dd></div>
          </dl>

          <div className="hero__cta">
            <a href="#projects" className="btn-text">View the work <span>→</span></a>
            <a href="mailto:kokyoung1520@gmail.com" className="btn-text btn-text--ghost">Say hello <span>→</span></a>
          </div>
        </div>

        <div className="hero__portrait">
          <figure className="portrait">
            {!imgError ? (
              <img
                src={`${import.meta.env.BASE_URL}DSCF1352.JPG`}
                alt="Hoh Kok Young"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="portrait__fallback">HKY</div>
            )}
            <figcaption>The author, Singapore.</figcaption>
          </figure>
        </div>
      </div>

      <div className="container">
        <div className="hero__stats">
          {[
            ['5+', 'years shipping production software'],
            ['100K+', 'records migrated, zero loss'],
            ['60%', 'dev efficiency lift with agentic workflow'],
            ['2', 'AWS certifications · Solutions Architect + Cloud Practitioner'],
          ].map(([n, l]) => (
            <div className="hstat" key={n}>
              <span className="hstat__n">{n}</span>
              <span className="hstat__l">{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
