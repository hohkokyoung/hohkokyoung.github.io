import { useEffect, useState } from 'react'

const phrases = ['Software Development Engineer', 'Full-Stack Developer', 'Cloud & DevOps Enthusiast', 'Problem Solver']

export default function Hero() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const [imgError, setImgError] = useState(false)

  useEffect(() => {
    const current = phrases[phraseIdx]
    const delay = deleting ? 45 : 95

    const timer = setTimeout(() => {
      if (!deleting) {
        setText(current.slice(0, charIdx + 1))
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), 2000)
        } else {
          setCharIdx(i => i + 1)
        }
      } else {
        setText(current.slice(0, charIdx - 1))
        if (charIdx - 1 === 0) {
          setDeleting(false)
          setPhraseIdx(i => (i + 1) % phrases.length)
          setCharIdx(0)
        } else {
          setCharIdx(i => i - 1)
        }
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [charIdx, deleting, phraseIdx])

  return (
    <section className="hero" id="home">
      <div className="hero__blobs">
        <div className="blob blob--1" />
        <div className="blob blob--2" />
        <div className="blob blob--3" />
      </div>

      <div className="container hero__inner">
        {/* TEXT */}
        <div className="hero__text hero__text--enter">
          <div className="badge badge--available">
            <span className="badge__dot" />
            Open to opportunities
          </div>

          <h1 className="hero__name">
            Hi, I'm <span className="gradient-text">Kok Young</span>
          </h1>

          <p className="hero__role">
            {text}<span className="cursor">|</span>
          </p>

          <p className="hero__desc">
            I build clean, scalable software — from government-grade portals to AI-powered systems.
            Based in <strong>Singapore</strong>, open to new opportunities.
          </p>

          <div className="hero__actions">
            <a href="#projects" className="btn btn--primary">View my work</a>
            <a href="#contact" className="btn btn--ghost">Get in touch</a>
          </div>

          <div className="hero__stats">
            <div className="stat">
              <span className="stat__num">5+</span>
              <span className="stat__label">Years exp.</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__num">100K+</span>
              <span className="stat__label">Records migrated</span>
            </div>
            <div className="stat__divider" />
            <div className="stat">
              <span className="stat__num">60%</span>
              <span className="stat__label">Dev efficiency↑</span>
            </div>
          </div>
        </div>

        {/* IMAGE */}
        <div className="hero__image hero__image--enter">
          <div className="image-rings">
            <div className="ring ring--3" />
            <div className="ring ring--2" />
            <div className="ring ring--1" />
          </div>
          <div className="image-frame">
            {!imgError ? (
              <img
                src={`${import.meta.env.BASE_URL}DSCF1352.jpg`}
                alt="Hoh Kok Young"
                className="profile-img"
                onError={() => setImgError(true)}
              />
            ) : (
              <div className="profile-placeholder">
                <span>KY</span>
              </div>
            )}
          </div>

          <div className="float-badge float-badge--tl">
            <span>☁️</span> AWS Certified
          </div>
          <div className="float-badge float-badge--br">
            <span>📦</span> 100K+ records migrated
          </div>
        </div>
      </div>

      <div className="scroll-hint">
        <div className="scroll-hint__line" />
        <span>Scroll</span>
      </div>
    </section>
  )
}
