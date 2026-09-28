import { m, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { heroSignals, profile } from '../data/content'
import { usePointerParallax } from '../hooks/usePointerParallax'
import type { Theme } from '../hooks/useTheme'
import { ArrowRightIcon, GitHubIcon, LinkedInIcon } from './Icons'
import { NeuralCore } from './NeuralCore'

const ease = [0.22, 1, 0.36, 1] as const

const enter = (delay: number) => ({
  initial: { opacity: 0, y: 22 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease },
})

const headlineParts: { text: string; signal?: number }[] = [
  { text: 'I ' },
  { text: 'design digital experiences', signal: 0 },
  { text: ', ' },
  { text: 'build software', signal: 1 },
  { text: ', and ' },
  { text: 'explore AI', signal: 2 },
  { text: '.' },
]

export function Hero({ theme }: { theme: Theme }) {
  const reduced = useReducedMotion() ?? false
  const pointer = usePointerParallax(!reduced)
  const [active, setActive] = useState(0)
  const [hovering, setHovering] = useState<number | null>(null)
  const current = hovering ?? active

  useEffect(() => {
    if (hovering !== null) return
    const id = window.setInterval(() => setActive((value) => (value + 1) % 3), reduced ? 6000 : 3600)
    return () => window.clearInterval(id)
  }, [hovering, reduced])

  const lensX = useTransform(pointer.x, (v) => v * -26)
  const lensY = useTransform(pointer.y, (v) => v * -20)
  const coreX = useTransform(pointer.x, (v) => v * 14)
  const coreY = useTransform(pointer.y, (v) => v * 12)
  const chipX = useTransform(pointer.x, (v) => v * 28)
  const chipY = useTransform(pointer.y, (v) => v * 22)
  const bgX = useTransform(pointer.x, (v) => v * -10)
  const bgY = useTransform(pointer.y, (v) => v * -8)

  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <m.div className="hero-grid-bg" style={{ x: bgX, y: bgY }} aria-hidden />

      <div className="container hero-inner">
        <div className="hero-copy">
          <m.p className="hero-kicker" {...enter(0.05)}>
            <span className="status-dot" aria-hidden />
            Design · Engineering · AI
          </m.p>

          <h1 id="hero-title" className="hero-title">
            <m.span className="hero-name" {...enter(0.12)}>
              {profile.name}
            </m.span>
            <m.span className="hero-headline" {...enter(0.22)}>
              {headlineParts.map((part, index) =>
                part.signal === undefined ? (
                  <span key={index}>{part.text}</span>
                ) : (
                  <span key={index} className="hero-highlight" data-dim={part.signal} data-active={current === part.signal}>
                    {part.text}
                  </span>
                ),
              )}
            </m.span>
          </h1>

          <m.p className="hero-roles" {...enter(0.34)}>
            {profile.roles.map((role, index) => (
              <span key={role} className="hero-role" data-dim={index}>
                {role}
              </span>
            ))}
          </m.p>

          <m.p className="hero-lede" {...enter(0.42)}>
            {profile.intro}
          </m.p>

          <m.div className="hero-actions" {...enter(0.5)}>
            <a href="#projects" className="btn btn-primary btn-large">
              View My Work
              <ArrowRightIcon size={16} />
            </a>
            <a href="#contact" className="btn btn-glass btn-large">
              Let&apos;s Connect
            </a>
            <span className="hero-socials">
              <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={17} />
              </a>
              <a className="icon-btn" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon size={17} />
              </a>
            </span>
          </m.div>
        </div>

        <m.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.1, ease }}
        >
          <m.div className="hero-lens" style={{ x: lensX, y: lensY }} aria-hidden />
          <m.div className="hero-core" style={{ x: coreX, y: coreY }}>
            <NeuralCore className="hero-canvas" theme={theme} active={current} pointer={pointer} reducedMotion={reduced} />
          </m.div>

          <m.ul className="hero-signals" style={{ x: chipX, y: chipY }} aria-label="What I do">
            {heroSignals.map((signal, index) => (
              <li
                key={signal.kicker}
                className="signal glass"
                data-dim={index}
                data-active={current === index}
                onMouseEnter={() => setHovering(index)}
                onMouseLeave={() => setHovering(null)}
                onFocus={() => setHovering(index)}
                onBlur={() => setHovering(null)}
                tabIndex={0}
              >
                <span className="signal-meter" aria-hidden>
                  <i />
                  <i />
                  <i />
                </span>
                <span className="signal-text">
                  <span className="signal-kicker">{signal.kicker}</span>
                  <span className="signal-label">{signal.label}</span>
                </span>
              </li>
            ))}
          </m.ul>

          <div className="hero-readout mono" aria-hidden>
            <span>core.status</span>
            <span className="hero-readout-value" data-dim={current}>
              {heroSignals[current].kicker.toLowerCase()} · {heroSignals[current].label.toLowerCase()}
            </span>
          </div>
        </m.div>
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to About">
        <span className="scroll-cue-line" aria-hidden />
        <span className="mono">Scroll</span>
      </a>
    </section>
  )
}
