import { m } from 'framer-motion'
import { useEffect, useRef, useState, type FormEvent } from 'react'
import { assistantSuggestions } from '../data/content'
import { askAssistant, assistantConnected, type ChatMessage, type SiteGuide } from '../lib/assistant'
import { ArrowRightIcon, CoreGlyph, SendIcon } from './Icons'

type Entry =
  | { kind: 'message'; message: ChatMessage }
  | { kind: 'guide'; question: string; guide: SiteGuide }
  | { kind: 'error'; text: string }

export default function AssistantPanel({ onClose }: { onClose: () => void }) {
  const [entries, setEntries] = useState<Entry[]>([])
  const [input, setInput] = useState('')
  const [pending, setPending] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const logRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      abortRef.current?.abort()
    }
  }, [onClose])

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: 'smooth' })
  }, [entries, pending])

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || pending) return
    setInput('')
    const history: ChatMessage[] = [
      ...entries.flatMap((entry) => (entry.kind === 'message' ? [entry.message] : [])),
      { role: 'user', content: question },
    ]
    setEntries((current) => [...current, { kind: 'message', message: { role: 'user', content: question } }])
    setPending(true)
    abortRef.current = new AbortController()
    try {
      const reply = await askAssistant(history, abortRef.current.signal)
      setEntries((current) => [
        ...current,
        reply.kind === 'reply'
          ? { kind: 'message', message: { role: 'assistant', content: reply.content } }
          : reply.kind === 'offline'
            ? { kind: 'guide', question, guide: reply.guide }
            : { kind: 'error', text: reply.message },
      ])
    } catch {
      /* aborted */
    } finally {
      setPending(false)
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    void send(input)
  }

  return (
    <m.div
      id="assistant-panel"
      className="assistant glass"
      role="dialog"
      aria-label="Ask Umer’s AI"
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 12, scale: 0.97 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      <header className="assistant-head">
        <span className="assistant-orb" aria-hidden>
          <CoreGlyph size={16} />
        </span>
        <div>
          <p className="assistant-title">Ask Umer’s AI</p>
          <p className="assistant-status mono" data-online={assistantConnected}>
            <span className="status-dot" aria-hidden />
            {assistantConnected ? 'Connected' : 'Not connected yet'}
          </p>
        </div>
      </header>

      <div className="assistant-log" ref={logRef} aria-live="polite">
        {!assistantConnected && entries.length === 0 && (
          <p className="assistant-note">
            The AI backend for this assistant isn’t connected yet, so it won’t generate answers. You can still ask — I’ll
            point you to the part of the site that covers it.
          </p>
        )}
        {entries.map((entry, index) => {
          if (entry.kind === 'message')
            return (
              <p key={index} className="bubble" data-role={entry.message.role}>
                {entry.message.content}
              </p>
            )
          if (entry.kind === 'error')
            return (
              <p key={index} className="bubble bubble-error">
                {entry.text}
              </p>
            )
          return (
            <div key={index} className="bubble bubble-guide">
              <span className="mono bubble-tag">Site guide · not AI</span>
              <span>The assistant is offline. The {entry.guide.label} section should answer this.</span>
              <a href={`#${entry.guide.section}`} className="guide-link" onClick={onClose}>
                Go to {entry.guide.label} <ArrowRightIcon size={14} />
              </a>
            </div>
          )
        })}
        {pending && (
          <p className="bubble bubble-pending" data-role="assistant">
            <i />
            <i />
            <i />
          </p>
        )}
      </div>

      {entries.length === 0 && (
        <div className="assistant-suggestions">
          {assistantSuggestions.map((suggestion) => (
            <button key={suggestion} type="button" className="suggestion" onClick={() => void send(suggestion)}>
              {suggestion}
            </button>
          ))}
        </div>
      )}

      <form className="assistant-form" onSubmit={onSubmit}>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about projects, skills, contact…"
          aria-label="Your question"
        />
        <button type="submit" className="icon-btn assistant-send" disabled={!input.trim() || pending} aria-label="Send">
          <SendIcon />
        </button>
      </form>
    </m.div>
  )
}
