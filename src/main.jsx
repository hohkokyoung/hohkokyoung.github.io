import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import Lenis from 'lenis'
import App from './App.jsx'
import './index.css'

// Run synchronously before React mounts — prevents browser scroll restoration
// from fighting Lenis on page load
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual'
  window.scrollTo(0, 0)
}

function Root() {
  useEffect(() => {
    // Ensure we're at top after mount too
    window.scrollTo(0, 0)

    const lenis = new Lenis({ lerp: 0.075, smoothWheel: true })
    // Immediately snap to top before any smooth scroll kicks in
    lenis.scrollTo(0, { immediate: true })

    let raf
    const loop = (t) => { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <React.StrictMode>
      <App />
    </React.StrictMode>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(<Root />)
