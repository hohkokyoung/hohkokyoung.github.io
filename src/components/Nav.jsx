import { useState, useEffect } from 'react'

const links = ['Work', 'Projects', 'Skills', 'Education', 'Contact']
const ID_MAP = { Work: 'experience', Projects: 'projects', Skills: 'skills', Education: 'education', Contact: 'contact' }

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const sections = Object.values(ID_MAP).map(id => document.getElementById(id))
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
        <a href="#home" className="nav__mark">hky.</a>
        <ul className="nav__links">
          {links.map((l, i) => {
            const id = ID_MAP[l]
            return (
              <li key={l}>
                <a href={`#${id}`} className={`nav__link${active === id ? ' nav__link--active' : ''}`}>
                  <span className="nav__link-n">{String(i + 1).padStart(2, '0')}</span>
                  {l}
                </a>
              </li>
            )
          })}
        </ul>
        <a href="mailto:kokyoung1520@gmail.com" className="nav__contact">Hire me</a>
      </div>
    </nav>
  )
}
