import { useState, useEffect } from 'react'

const links = ['About', 'Experience', 'Skills', 'Projects', 'Education', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()))
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) }),
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sections.forEach(s => s && obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav__inner">
        <a href="#" className="nav__logo">ky<span className="nav__dot">.</span></a>
        <ul className={`nav__links${menuOpen ? ' nav__links--open' : ''}`}>
          {links.map(l => (
            <li key={l}>
              <a
                href={`#${l.toLowerCase()}`}
                className={`nav__link${active === l.toLowerCase() ? ' nav__link--active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {l}
              </a>
            </li>
          ))}
        </ul>
        <a href="mailto:kokyoung1520@gmail.com" className="btn btn--sm btn--primary nav__cta">Hire me</a>
        <button className="nav__burger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
