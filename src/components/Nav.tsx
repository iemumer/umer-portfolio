import { AnimatePresence, m } from 'framer-motion'
import { useEffect, useState } from 'react'
import { navItems, profile } from '../data/content'
import { useActiveSection } from '../hooks/useActiveSection'
import { useScrolled } from '../hooks/useScrolled'
import type { Theme } from '../hooks/useTheme'
import { CloseIcon, FileIcon, GitHubIcon, LinkedInIcon, MenuIcon } from './Icons'
import { ThemeToggle } from './ThemeToggle'

const sectionIds = navItems.map((item) => item.id)

type Props = { theme: Theme; onToggleTheme: (origin: { x: number; y: number }) => void }

export function Nav({ theme, onToggleTheme }: Props) {
  const scrolled = useScrolled()
  const active = useActiveSection(sectionIds)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    const onResize = () => window.innerWidth > 960 && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', onResize)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onResize)
    }
  }, [open])

  return (
    <header className="nav-wrap" data-scrolled={scrolled || open}>
      <div className="nav glass">
        <a href="#home" className="brand" aria-label={`${profile.name} — home`}>
          <span className="brand-mark" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span className="brand-name">
            Umer<span className="brand-muted"> Farooq</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="nav-link"
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a className="icon-btn hide-sm" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon size={16} />
          </a>
          <a className="icon-btn hide-sm" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon size={16} />
          </a>
          <a className="btn btn-small btn-primary hide-md" href={profile.links.resume} target="_blank" rel="noreferrer">
            <FileIcon size={15} />
            Resume
          </a>
          <button
            type="button"
            className="icon-btn menu-btn"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-menu"
            className="mobile-menu glass"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav aria-label="Mobile">
              {navItems.map((item, index) => (
                <m.a
                  key={item.id}
                  href={`#${item.id}`}
                  className="mobile-link"
                  aria-current={active === item.id ? 'true' : undefined}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * index + 0.05 }}
                >
                  <span className="mobile-link-index">0{index + 1}</span>
                  {item.label}
                </m.a>
              ))}
            </nav>
            <div className="mobile-menu-footer">
              <a className="btn btn-primary" href={profile.links.resume} target="_blank" rel="noreferrer">
                <FileIcon size={15} /> Resume / CV
              </a>
              <a className="icon-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <LinkedInIcon size={16} />
              </a>
              <a className="icon-btn" href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <GitHubIcon size={16} />
              </a>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  )
}
