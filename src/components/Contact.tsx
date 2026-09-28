import { useState, type FormEvent } from 'react'
import { profile } from '../data/content'
import { CheckIcon, CopyIcon, FileIcon, GitHubIcon, LinkedInIcon, MailIcon, SendIcon } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

export function Contact() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const from = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = encodeURIComponent(`Hello from ${name || 'your portfolio'}`)
    const body = encodeURIComponent(`${message}\n\n— ${name}${from ? ` (${from})` : ''}`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" className="section section-contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeader
          id="contact-title"
          index="05"
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something <span className="text-muted">thoughtful.</span>
            </>
          }
          lede="Open to conversations about product design, frontend and software roles, and AI-powered product ideas."
        />

        <div className="contact-grid">
          <Reveal className="contact-card glass">
            <p className="card-kicker mono">Reach me directly</p>
            <div className="contact-email">
              <a href={`mailto:${profile.email}`} className="contact-email-link">
                <MailIcon size={18} />
                {profile.email}
              </a>
              <button type="button" className="icon-btn" onClick={copyEmail} aria-label="Copy email address">
                {copied ? <CheckIcon /> : <CopyIcon />}
              </button>
              <span className="sr-only" aria-live="polite">
                {copied ? 'Email copied' : ''}
              </span>
            </div>
            <ul className="contact-links">
              <li>
                <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="contact-link">
                  <LinkedInIcon /> LinkedIn <span className="contact-link-arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.links.github} target="_blank" rel="noreferrer" className="contact-link">
                  <GitHubIcon /> GitHub <span className="contact-link-arrow">↗</span>
                </a>
              </li>
              <li>
                <a href={profile.links.resume} target="_blank" rel="noreferrer" className="contact-link">
                  <FileIcon /> Resume / CV <span className="contact-link-arrow">↗</span>
                </a>
              </li>
            </ul>
          </Reveal>

          <Reveal className="contact-form glass" delay={0.08}>
            <form onSubmit={onSubmit}>
              <p className="card-kicker mono">Send a message</p>
              <div className="field-row">
                <label className="field">
                  <span>Name</span>
                  <input name="name" autoComplete="name" required placeholder="Your name" />
                </label>
                <label className="field">
                  <span>Email</span>
                  <input name="email" type="email" autoComplete="email" required placeholder="you@company.com" />
                </label>
              </div>
              <label className="field">
                <span>Message</span>
                <textarea name="message" rows={4} required placeholder="What would you like to work on?" />
              </label>
              <div className="form-foot">
                <span className="form-note">Opens your email app with the message ready to send.</span>
                <button type="submit" className="btn btn-primary">
                  Send message <SendIcon />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
