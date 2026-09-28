import { experience, workflow } from '../data/content'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { Text } from './Text'

export function Experience() {
  return (
    <section id="experience" className="section" aria-labelledby="experience-title">
      <div className="container">
        <SectionHeader
          id="experience-title"
          index="02"
          eyebrow="Experience"
          title={
            <>
              Designing inside a real product team, <span className="text-muted">next to the people who build it.</span>
            </>
          }
          lede="My design work is shaped by implementation — I design with development constraints in mind and collaborate with engineers throughout."
        />

        <div className="exp-layout">
          <ol className="timeline">
            {experience.map((entry, index) => (
              <Reveal key={`${entry.company}-${index}`} as="li" className="timeline-item" delay={index * 0.08}>
                <span className="timeline-node" data-current={entry.current} aria-hidden />
                <article className="exp-card glass" data-muted={!entry.current}>
                  <header className="exp-head">
                    <div>
                      <h3 className="exp-role">
                        <Text value={entry.role} />
                      </h3>
                      <p className="exp-company">
                        <Text value={entry.company} />
                      </p>
                    </div>
                    <div className="exp-meta">
                      {entry.current && <span className="badge-live">Current</span>}
                      <span className="mono exp-period">
                        <Text value={entry.period} />
                      </span>
                    </div>
                  </header>
                  <p className="exp-summary">
                    <Text value={entry.summary} />
                  </p>
                  {entry.points.length > 0 && (
                    <ul className="exp-points">
                      {entry.points.map((point) => (
                        <li key={point}>
                          <Text value={point} />
                        </li>
                      ))}
                    </ul>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="chip-row">
                      {entry.tags.map((tag) => (
                        <span key={tag} className="chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </article>
              </Reveal>
            ))}
          </ol>

          <Reveal className="workflow glass" delay={0.1}>
            <p className="card-kicker mono">How I work with developers</p>
            <ol className="workflow-steps">
              {workflow.map((item, index) => (
                <li key={item.step} className="workflow-step">
                  <span className="workflow-index mono">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h4 className="workflow-title">{item.step}</h4>
                    <p className="workflow-text">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
            <div className="handoff" aria-hidden>
              <span className="handoff-node">Design</span>
              <span className="handoff-line">
                <i />
              </span>
              <span className="handoff-node">Build</span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
