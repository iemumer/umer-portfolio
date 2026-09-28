/**
 * All portfolio copy lives here.
 *
 * Any string starting with "TODO:" is a placeholder. It renders on the site
 * with a dashed "placeholder" style so it is easy to spot and replace.
 * Search this file for "TODO" to find everything that still needs real content.
 */

export type Dimension = 'design' | 'engineering' | 'ai'

export const dimensionLabels: Record<Dimension, string> = {
  design: 'Design',
  engineering: 'Engineering',
  ai: 'AI',
}

export const isPlaceholder = (value: string) => value.startsWith('TODO:')

export const profile = {
  name: 'Muhammad Umer Farooq',
  shortName: 'Umer',
  headline: 'I design digital experiences, build software, and explore AI.',
  roles: ['UI/UX Designer', 'Software Engineer', 'AI Enthusiast'],
  intro:
    'I work across product design, frontend and software development, and hands-on AI experimentation — shaping how a product looks and feels, helping build it, and exploring where AI can make it more useful.',
  email: 'umerfarooq0414@gmail.com',
  links: {
    linkedin: 'https://www.linkedin.com/in/TODO-your-linkedin-handle',
    github: 'https://github.com/iemumer',
    resume: '/cv/Muhammad-Umer-Farooq-CV.pdf',
  },
}

export const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
] as const

export type SectionId = (typeof navItems)[number]['id']

export const heroSignals: { dimension: Dimension; kicker: string; label: string }[] = [
  { dimension: 'design', kicker: 'Design', label: 'UI/UX' },
  { dimension: 'engineering', kicker: 'Build', label: 'Software' },
  { dimension: 'ai', kicker: 'Explore', label: 'AI' },
]

export const about = {
  title: 'One person across the whole product loop.',
  body: [
    'I’m Umer — a UI/UX designer who is also a software engineer, and who spends a lot of time exploring AI.',
    'That combination shapes how I work: I design with implementation in mind, I can talk to developers in their language, and I’m curious about how AI changes what products can do.',
  ],
  personalNote:
    'TODO: Add a personal line — your background, education, or what drives your work.',
  dimensions: [
    {
      id: 'design' as Dimension,
      kicker: '01',
      title: 'Design',
      summary: 'Interfaces that are clear, usable and considered.',
      items: ['UI/UX Design', 'Product Design', 'Design Systems', 'Figma', 'User-centered design'],
    },
    {
      id: 'engineering' as Dimension,
      kicker: '02',
      title: 'Engineering',
      summary: 'Turning designs into working software.',
      items: [
        'Software Engineering',
        'Frontend Development',
        'React',
        'APIs',
        'Full-stack development',
      ],
    },
    {
      id: 'ai' as Dimension,
      kicker: '03',
      title: 'AI',
      summary: 'Exploring what AI-powered products can be.',
      items: [
        'AI Engineering exploration',
        'RAG',
        'LLMs',
        'AI APIs',
        'AI-powered applications',
        'Agentic AI experimentation',
      ],
    },
  ],
  exploring: ['Agentic AI', 'RAG', 'LLM-powered apps'],
}

export type ExperienceEntry = {
  role: string
  company: string
  period: string
  current: boolean
  summary: string
  points: string[]
  tags: string[]
}

export const experience: ExperienceEntry[] = [
  {
    role: 'UI/UX Designer',
    company: 'Pentavio',
    period: 'TODO: Start date — Present',
    current: true,
    summary:
      'Designing product experiences as part of a real product team, working side by side with developers from concept to implementation.',
    points: [
      'Design user interfaces and flows for products built by the team.',
      'Collaborate closely with developers so designs are practical to implement.',
      'Account for technical and development constraints while designing.',
      'TODO: Add a specific product, responsibility or outcome you can share.',
    ],
    tags: ['Product team', 'Developer collaboration', 'Implementation-aware design'],
  },
  {
    role: 'TODO: Previous role, internship or education',
    company: 'TODO: Organisation',
    period: 'TODO: Dates',
    current: false,
    summary: 'TODO: One or two lines about what you did and learned here.',
    points: [],
    tags: [],
  },
]

export const workflow = [
  { step: 'Understand', text: 'Start from the user problem and the technical constraints.' },
  { step: 'Design', text: 'Shape flows and interfaces that can realistically be built.' },
  { step: 'Hand off', text: 'Share clear, structured designs developers can work from.' },
  { step: 'Build & review', text: 'Stay involved as it’s implemented, and refine together.' },
]

export type Project = {
  id: string
  name: string
  category: string
  dimensions: Dimension[]
  featured?: boolean
  summary: string
  role: string
  tools: string[]
  preview: 'easybilty' | 'codesync' | 'luckydraw' | 'kasbehunar'
  /** Optional real screenshot (e.g. "/projects/easybilty.webp"). Replaces the illustrative preview. */
  image?: string
  cta: string
  /** Optional external link (Behance, Figma, GitHub, live site). */
  link?: string
  caseStudy: { heading: string; body: string }[]
}

export const projects: Project[] = [
  {
    id: 'easybilty',
    name: 'EasyBilty',
    category: 'UI/UX · Product Design',
    dimensions: ['design'],
    featured: true,
    summary:
      'Designing a logistics and transport platform — including multiple user experiences within one product.',
    role: 'UI/UX Designer',
    tools: ['TODO: Tools used (e.g. Figma)'],
    preview: 'easybilty',
    cta: 'View Case Study',
    caseStudy: [
      {
        heading: 'Overview',
        body: 'EasyBilty is a logistics / transport platform. I designed the product experience, including multiple user experiences within the platform.',
      },
      { heading: 'The problem', body: 'TODO: What problem did the platform need to solve, and for whom?' },
      { heading: 'User experiences', body: 'TODO: Describe the different users / apps you designed for.' },
      { heading: 'Process', body: 'TODO: Research, flows, wireframes, prototypes, design system.' },
      { heading: 'Outcome', body: 'TODO: What shipped, and what you learned. Only include results you can verify.' },
    ],
  },
  {
    id: 'codesync',
    name: 'CodeSync',
    category: 'Software Engineering + AI',
    dimensions: ['engineering', 'ai'],
    featured: true,
    summary: 'An AI-based code change summary project — turning code changes into readable summaries.',
    role: 'TODO: Your role (e.g. Developer)',
    tools: ['TODO: Stack used (languages, frameworks, AI APIs)'],
    preview: 'codesync',
    cta: 'View Project',
    link: 'TODO: GitHub or live link',
    caseStudy: [
      {
        heading: 'Overview',
        body: 'CodeSync is an AI-based code change summary project: it uses AI to summarise code changes.',
      },
      { heading: 'Why', body: 'TODO: What motivated the project?' },
      { heading: 'How it works', body: 'TODO: Architecture — how changes are captured, processed and summarised.' },
      { heading: 'What I learned', body: 'TODO: Technical lessons from building it.' },
    ],
  },
  {
    id: 'luckydraw',
    name: 'Lucky Draw',
    category: 'UI/UX Design',
    dimensions: ['design'],
    summary: 'TODO: One-line summary of the product and the design challenge.',
    role: 'UI/UX Designer',
    tools: ['TODO: Tools used'],
    preview: 'luckydraw',
    cta: 'View Case Study',
    caseStudy: [
      { heading: 'Overview', body: 'TODO: What is Lucky Draw, and who is it for?' },
      { heading: 'Design approach', body: 'TODO: Key decisions, flows and screens.' },
      { heading: 'Outcome', body: 'TODO: What shipped and what you learned.' },
    ],
  },
  {
    id: 'kasbehunar',
    name: 'Kasb-e-Hunar',
    category: 'UI/UX Design',
    dimensions: ['design'],
    summary: 'TODO: One-line summary of the product and the design challenge.',
    role: 'UI/UX Designer',
    tools: ['TODO: Tools used'],
    preview: 'kasbehunar',
    cta: 'View Case Study',
    caseStudy: [
      { heading: 'Overview', body: 'TODO: What is Kasb-e-Hunar, and who is it for?' },
      { heading: 'Design approach', body: 'TODO: Key decisions, flows and screens.' },
      { heading: 'Outcome', body: 'TODO: What shipped and what you learned.' },
    ],
  },
]

export const skillGroups: { id: Dimension; title: string; caption: string; skills: string[] }[] = [
  {
    id: 'design',
    title: 'Design',
    caption: 'How it looks, feels and flows',
    skills: ['Figma', 'UI/UX', 'Wireframing', 'Prototyping', 'Design Systems', 'Responsive Design'],
  },
  {
    id: 'engineering',
    title: 'Development',
    caption: 'How it gets built',
    skills: ['HTML', 'CSS', 'JavaScript', 'React', 'Python', 'FastAPI', 'REST APIs', 'Git/GitHub'],
  },
  {
    id: 'ai',
    title: 'AI',
    caption: 'What it can become',
    skills: ['LLMs', 'RAG', 'AI APIs', 'Vector Databases', 'AI Agents', 'Prompt Engineering'],
  },
]

export const intersections = [
  { pair: ['design', 'engineering'] as Dimension[], label: 'Interfaces that survive implementation' },
  { pair: ['engineering', 'ai'] as Dimension[], label: 'AI-powered applications' },
  { pair: ['design', 'ai'] as Dimension[], label: 'Usable experiences for AI products' },
]

export const assistantSuggestions = [
  'What projects has Umer worked on?',
  'Tell me about EasyBilty.',
  'What are Umer’s AI skills?',
  'How can I contact Umer?',
]
