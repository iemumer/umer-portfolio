import { AnimatePresence, m } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { CloseIcon, CoreGlyph } from './Icons'

const AssistantPanel = lazy(() => import('./AssistantPanel'))

export function AskAI() {
  const [open, setOpen] = useState(false)
  return (
    <div className="ask-ai">
      <Suspense fallback={null}>
        <AnimatePresence>{open && <AssistantPanel onClose={() => setOpen(false)} />}</AnimatePresence>
      </Suspense>
      <m.button
        type="button"
        className="ask-ai-fab glass"
        aria-expanded={open}
        aria-controls="assistant-panel"
        onClick={() => setOpen((value) => !value)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span className="ask-ai-orb" aria-hidden>
          {open ? <CloseIcon size={16} /> : <CoreGlyph size={16} />}
        </span>
        <span className="ask-ai-label">{open ? 'Close' : 'Ask Umer’s AI'}</span>
      </m.button>
    </div>
  )
}
