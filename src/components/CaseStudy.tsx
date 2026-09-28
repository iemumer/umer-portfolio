import { m } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { dimensionLabels, isPlaceholder, type Project } from '../data/content'
import { ArrowUpRightIcon, CloseIcon } from './Icons'
import { ProjectPreview } from './previews/ProjectPreview'
import { Text } from './Text'

export default function CaseStudy({ project, onClose }: { project: Project; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null
    closeRef.current?.focus()
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
      previous?.focus()
    }
  }, [onClose])

  return (
    <m.div
      className="dialog-backdrop"
      onClick={onClose}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <m.div
        className="dialog glass"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-title"
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <button ref={closeRef} type="button" className="icon-btn dialog-close" onClick={onClose} aria-label="Close case study">
          <CloseIcon size={18} />
        </button>
        <div className="dialog-preview">
          <ProjectPreview project={project} />
        </div>
        <div className="dialog-content">
          <p className="mono project-category">
            {project.dimensions.map((d) => dimensionLabels[d]).join(' · ')} — {project.category}
          </p>
          <h3 id="case-title" className="dialog-title">
            {project.name}
          </h3>
          <p className="dialog-summary">
            <Text value={project.summary} />
          </p>
          <div className="dialog-sections">
            {project.caseStudy.map((section) => (
              <section key={section.heading} className="dialog-section">
                <h4>{section.heading}</h4>
                <p>
                  <Text value={section.body} />
                </p>
              </section>
            ))}
          </div>
          {project.link && (
            <div className="dialog-foot">
              {isPlaceholder(project.link) ? (
                <Text value={project.link} />
              ) : (
                <a className="btn btn-primary" href={project.link} target="_blank" rel="noreferrer">
                  Open project <ArrowUpRightIcon size={16} />
                </a>
              )}
            </div>
          )}
        </div>
      </m.div>
    </m.div>
  )
}
