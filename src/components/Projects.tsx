import { AnimatePresence, m } from 'framer-motion'
import { lazy, Suspense, useState } from 'react'
import { dimensionLabels, projects, type Dimension, type Project } from '../data/content'
import { ArrowUpRightIcon } from './Icons'
import { ProjectPreview } from './previews/ProjectPreview'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { Text } from './Text'

const CaseStudy = lazy(() => import('./CaseStudy'))

const filters: { id: Dimension | 'all'; label: string }[] = [
  { id: 'all', label: 'All work' },
  { id: 'design', label: 'Design' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'ai', label: 'AI' },
]

const dimIndex: Record<Dimension, number> = { design: 0, engineering: 1, ai: 2 }

function ProjectCard({ project, onOpen }: { project: Project; onOpen: (project: Project) => void }) {
  const tone = project.dimensions.includes('ai') ? 'engineering' : 'design'
  return (
    <article className="project-card glass" data-featured={project.featured ?? false} data-tone={tone}>
      <button type="button" className="project-preview" onClick={() => onOpen(project)} aria-label={`${project.cta}: ${project.name}`}>
        <ProjectPreview project={project} />
      </button>
      <div className="project-body">
        <div className="project-labels">
          {project.dimensions.map((dim) => (
            <span key={dim} className="dim-label" data-dim={dimIndex[dim]}>
              {dimensionLabels[dim]}
            </span>
          ))}
          {project.featured && <span className="mono project-flag">Featured</span>}
        </div>
        <h3 className="project-name">{project.name}</h3>
        <p className="project-category mono">{project.category}</p>
        <p className="project-summary">
          <Text value={project.summary} />
        </p>
        <dl className="project-meta">
          <div>
            <dt>Role</dt>
            <dd>
              <Text value={project.role} />
            </dd>
          </div>
          <div>
            <dt>Tools</dt>
            <dd className="chip-row">
              {project.tools.map((tool) => (
                <span key={tool} className="chip">
                  <Text value={tool} />
                </span>
              ))}
            </dd>
          </div>
        </dl>
        <button type="button" className="btn btn-glass project-cta" onClick={() => onOpen(project)}>
          {project.cta}
          <ArrowUpRightIcon size={16} />
        </button>
      </div>
    </article>
  )
}

export function Projects() {
  const [filter, setFilter] = useState<Dimension | 'all'>('all')
  const [open, setOpen] = useState<Project | null>(null)
  const visible = projects.filter((project) => filter === 'all' || project.dimensions.includes(filter))

  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeader
          id="projects-title"
          index="03"
          eyebrow="Selected work"
          title={
            <>
              Projects across design, <span className="text-muted">engineering and AI.</span>
            </>
          }
          lede="Each project represents a different side of how I work — from product design to AI-assisted software."
        />

        <Reveal className="filters" y={10}>
          <div className="segmented glass" role="tablist" aria-label="Filter projects">
            {filters.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={filter === item.id}
                className="segmented-btn"
                onClick={() => setFilter(item.id)}
              >
                {item.label}
                <span className="mono segmented-count">
                  {projects.filter((p) => item.id === 'all' || p.dimensions.includes(item.id)).length}
                </span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="projects-grid">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((project) => (
              <m.div
                key={project.id}
                className="project-slot"
                data-featured={project.featured ?? false}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -8% 0px' }}
                exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.2 } }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard project={project} onOpen={setOpen} />
              </m.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <Suspense fallback={null}>
        <AnimatePresence>{open && <CaseStudy project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
      </Suspense>
    </section>
  )
}
