import { domAnimation, LazyMotion, MotionConfig } from 'framer-motion'
import { About } from './components/About'
import { AskAI } from './components/AskAI'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { useTheme } from './hooks/useTheme'

export default function App() {
  const { theme, toggleTheme } = useTheme()
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div className="atmosphere" aria-hidden>
          <span className="orb orb-a" />
          <span className="orb orb-b" />
          <span className="orb orb-c" />
          <span className="grain" />
        </div>
        <Nav theme={theme} onToggleTheme={toggleTheme} />
        <main id="main">
          <Hero theme={theme} />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />
        <AskAI />
      </MotionConfig>
    </LazyMotion>
  )
}
