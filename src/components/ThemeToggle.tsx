import { m, AnimatePresence } from 'framer-motion'
import type { Theme } from '../hooks/useTheme'
import { MoonIcon, SunIcon } from './Icons'

type Props = { theme: Theme; onToggle: (origin: { x: number; y: number }) => void }

export function ThemeToggle({ theme, onToggle }: Props) {
  const isDay = theme === 'day'
  return (
    <button
      type="button"
      className="theme-toggle"
      aria-label={isDay ? 'Switch to night mode' : 'Switch to day mode'}
      title={isDay ? 'Night mode' : 'Day mode'}
      onClick={(event) => {
        const rect = event.currentTarget.getBoundingClientRect()
        onToggle({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 })
      }}
    >
      <span className="theme-toggle-track" data-day={isDay}>
        <span className="theme-toggle-thumb">
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={theme}
              className="theme-toggle-icon"
              initial={{ rotate: -60, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 60, opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.25 }}
            >
              {isDay ? <SunIcon size={14} /> : <MoonIcon size={14} />}
            </m.span>
          </AnimatePresence>
        </span>
      </span>
      <span className="theme-toggle-label">{isDay ? 'Day' : 'Night'}</span>
    </button>
  )
}
