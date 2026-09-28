import { about, experience, profile, projects, skillGroups, type SectionId } from '../data/content'

export type ChatMessage = { role: 'user' | 'assistant'; content: string }

export type AssistantReply =
  | { kind: 'reply'; content: string }
  | { kind: 'offline'; guide: SiteGuide }
  | { kind: 'error'; message: string }

export type SiteGuide = { section: SectionId; label: string }

const endpoint = import.meta.env.VITE_ASSISTANT_API_URL

export const assistantConnected = Boolean(endpoint)

/**
 * Plain-text summary of the portfolio content. A backend can use this as
 * grounding context (e.g. in a system prompt) so answers stay factual.
 */
export function buildAssistantContext(): string {
  const lines = [
    `Name: ${profile.name} (${profile.shortName})`,
    `Headline: ${profile.headline}`,
    `Roles: ${profile.roles.join(', ')}`,
    `Intro: ${profile.intro}`,
    `Contact: ${profile.email} · GitHub ${profile.links.github} · LinkedIn ${profile.links.linkedin}`,
    '',
    'Focus areas:',
    ...about.dimensions.map((d) => `- ${d.title}: ${d.items.join(', ')}`),
    '',
    'Experience:',
    ...experience.map((e) => `- ${e.role} at ${e.company}: ${e.summary}`),
    '',
    'Projects:',
    ...projects.map((p) => `- ${p.name} (${p.category}): ${p.summary}`),
    '',
    'Skills:',
    ...skillGroups.map((g) => `- ${g.title}: ${g.skills.join(', ')}`),
  ]
  return lines.filter((line) => !line.includes('TODO:')).join('\n')
}

const guideRules: { test: RegExp; guide: SiteGuide }[] = [
  { test: /contact|email|reach|hire|linkedin|connect/i, guide: { section: 'contact', label: 'Contact' } },
  { test: /skill|stack|tech|tool|figma|react|python|rag|llm|ai\b/i, guide: { section: 'skills', label: 'Skills' } },
  { test: /project|easybilty|codesync|lucky|kasb|work|case/i, guide: { section: 'projects', label: 'Projects' } },
  { test: /experience|pentavio|job|role|career/i, guide: { section: 'experience', label: 'Experience' } },
]

export function guideFor(question: string): SiteGuide {
  return guideRules.find((rule) => rule.test.test(question))?.guide ?? { section: 'about', label: 'About' }
}

/**
 * Sends the conversation to the configured backend.
 *
 * Contract: POST `VITE_ASSISTANT_API_URL` with JSON
 *   { messages: ChatMessage[], context: string }
 * and respond with JSON { reply: string }.
 *
 * Without an endpoint, nothing is generated: the UI says the assistant is
 * offline and links to the relevant section instead.
 */
export async function askAssistant(messages: ChatMessage[], signal?: AbortSignal): Promise<AssistantReply> {
  const last = messages[messages.length - 1]?.content ?? ''
  if (!endpoint) return { kind: 'offline', guide: guideFor(last) }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages, context: buildAssistantContext() }),
      signal,
    })
    if (!response.ok) return { kind: 'error', message: `The assistant returned ${response.status}.` }
    const data: unknown = await response.json()
    if (data && typeof data === 'object' && 'reply' in data && typeof data.reply === 'string') {
      return { kind: 'reply', content: data.reply }
    }
    return { kind: 'error', message: 'The assistant sent an unexpected response.' }
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    return { kind: 'error', message: 'Couldn’t reach the assistant. Please try again.' }
  }
}
