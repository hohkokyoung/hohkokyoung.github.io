import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import Projects from './components/Projects'
import Craft from './components/Craft'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Work />
        <Projects />
        <Craft />
        <Education />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
