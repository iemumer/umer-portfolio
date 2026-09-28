import { useCallback, useEffect, useState } from 'react'
import { flushSync } from 'react-dom'

export type Theme = 'day' | 'night'

const STORAGE_KEY = 'umer-theme'

const readStored = (): Theme | null => {
  try {
    const value = localStorage.getItem(STORAGE_KEY)
    return value === 'day' || value === 'night' ? value : null
  } catch {
    return null
  }
}

const systemTheme = (): Theme =>
  window.matchMedia('(prefers-color-scheme: light)').matches ? 'day' : 'night'

const applyTheme = (theme: Theme) => {
  const root = document.documentElement
  root.dataset.theme = theme
  root.style.colorScheme = theme === 'day' ? 'light' : 'dark'
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(
    () => (document.documentElement.dataset.theme as Theme | undefined) ?? readStored() ?? systemTheme(),
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: light)')
    const onChange = () => {
      if (!readStored()) setTheme(media.matches ? 'day' : 'night')
    }
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  const toggleTheme = useCallback(
    (origin?: { x: number; y: number }) => {
      const next: Theme = theme === 'day' ? 'night' : 'day'
      try {
        localStorage.setItem(STORAGE_KEY, next)
      } catch {
        /* storage unavailable */
      }

      const commit = () => {
        flushSync(() => setTheme(next))
        applyTheme(next)
      }

      if (!document.startViewTransition || prefersReducedMotion()) {
        const root = document.documentElement
        root.classList.add('theme-transition')
        commit()
        window.setTimeout(() => root.classList.remove('theme-transition'), 600)
        return
      }

      const x = origin?.x ?? window.innerWidth - 60
      const y = origin?.y ?? 40
      const radius = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y))
      const transition = document.startViewTransition(commit)
      transition.ready
        .then(() => {
          document.documentElement.animate(
            { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
            { duration: 650, easing: 'cubic-bezier(0.22, 1, 0.36, 1)', pseudoElement: '::view-transition-new(root)' },
          )
        })
        .catch(() => undefined)
    },
    [theme],
  )

  return { theme, toggleTheme }
}
