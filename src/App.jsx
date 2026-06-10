import { useEffect, Component } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

gsap.registerPlugin(ScrollTrigger)

class ErrorBoundary extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('App crashed:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: 40, color: '#ff6363', fontFamily: 'monospace', background: '#040506', minHeight: '100vh' }}>
          <h1>Render error — {this.props.name || 'app'}</h1>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#e6e6e6' }}>{String(this.state.error?.stack || this.state.error)}</pre>
        </div>
      )
    }
    return this.props.children
  }
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })
    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Anchor to hash AFTER ScrollTrigger pins compute (they shift layout below them)
    const hash = window.location.hash
    if (hash) {
      if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
      window.scrollTo({ top: 0 })
      const id = hash.slice(1)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ScrollTrigger.refresh()
          const target = document.getElementById(id)
          if (target) lenis.scrollTo(target, { offset: -80, immediate: true })
        })
      })
    }

    return () => lenis.destroy()
  }, [])

  return (
    <ErrorBoundary>
      <main className="bg-void text-snow">
        <Nav />
        <Hero />
        <Marquee />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
        <Footer />
      </main>
    </ErrorBoundary>
  )
}
