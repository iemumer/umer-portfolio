import { useState } from 'react'
import { dimensionLabels, intersections, skillGroups, type Dimension } from '../data/content'
import { DimensionGlyph } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'

const dimIndex: Record<Dimension, number> = { design: 0, engineering: 1, ai: 2 }

export function Skills() {
  const [focus, setFocus] = useState<Dimension | null>(null)

  return (
    <section id="skills" className="section" aria-labelledby="skills-title">
      <div className="container">
        <SectionHeader
          id="skills-title"
          index="04"
          eyebrow="Skills & technology"
          title={
            <>
              A toolkit that spans <span className="text-muted">the whole stack of a product.</span>
            </>
          }
          lede="Grouped by what they help me do — no made-up percentages."
        />

        <div className="skills-grid" data-focus={focus ?? undefined}>
          {skillGroups.map((group, index) => (
            <Reveal key={group.id} delay={index * 0.08} className="skill-col-wrap">
              <div
                className="skill-col glass"
                data-dim={dimIndex[group.id]}
                data-dimmed={focus !== null && focus !== group.id}
                onMouseEnter={() => setFocus(group.id)}
                onMouseLeave={() => setFocus(null)}
              >
                <header className="skill-head">
                  <span className="dim-icon">
                    <DimensionGlyph dimension={group.id} />
                  </span>
                  <div>
                    <h3 className="skill-title">{group.title}</h3>
                    <p className="skill-caption">{group.caption}</p>
                  </div>
                  <span className="mono skill-count">{String(group.skills.length).padStart(2, '0')}</span>
                </header>
                <ul className="skill-list">
                  {group.skills.map((skill, i) => (
                    <li key={skill} className="skill-item">
                      <span className="skill-node" aria-hidden />
                      <span className="skill-name">{skill}</span>
                      <span className="mono skill-idx">{String(i + 1).padStart(2, '0')}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="intersections" delay={0.1}>
          <p className="card-kicker mono">Where the skills meet</p>
          <ul className="intersection-list">
            {intersections.map((item) => (
              <li
                key={item.label}
                className="intersection glass"
                onMouseEnter={() => setFocus(item.pair[0])}
                onMouseLeave={() => setFocus(null)}
              >
                <span className="intersection-pair">
                  {item.pair.map((dim) => (
                    <span key={dim} className="chip" data-dim={dimIndex[dim]}>
                      {dimensionLabels[dim]}
                    </span>
                  ))}
                </span>
                <span className="intersection-label">{item.label}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
