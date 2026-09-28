import { about, dimensionLabels } from '../data/content'
import { DimensionGlyph } from './Icons'
import { Reveal } from './Reveal'
import { SectionHeader } from './SectionHeader'
import { Text } from './Text'

function DimensionVisual({ id }: { id: 'design' | 'engineering' | 'ai' }) {
  if (id === 'design')
    return (
      <svg className="dim-visual" viewBox="0 0 160 90" aria-hidden>
        <rect x="8" y="10" width="144" height="70" rx="10" className="dv-frame" />
        <path d="M8 30h144M52 30v50" className="dv-guide" />
        <rect x="62" y="40" width="48" height="8" rx="4" className="dv-fill" />
        <rect x="62" y="54" width="76" height="6" rx="3" className="dv-soft" />
        <rect x="62" y="64" width="58" height="6" rx="3" className="dv-soft" />
        <circle cx="30" cy="52" r="10" className="dv-accent" />
        <circle cx="140" cy="20" r="3" className="dv-accent" />
      </svg>
    )
  if (id === 'engineering')
    return (
      <svg className="dim-visual" viewBox="0 0 160 90" aria-hidden>
        <rect x="8" y="10" width="144" height="70" rx="10" className="dv-frame" />
        <rect x="20" y="24" width="30" height="5" rx="2.5" className="dv-accent-fill" />
        <rect x="56" y="24" width="50" height="5" rx="2.5" className="dv-soft" />
        <rect x="32" y="36" width="64" height="5" rx="2.5" className="dv-fill" />
        <rect x="32" y="48" width="40" height="5" rx="2.5" className="dv-soft" />
        <rect x="78" y="48" width="36" height="5" rx="2.5" className="dv-accent-fill" />
        <rect x="20" y="60" width="18" height="5" rx="2.5" className="dv-soft" />
        <rect x="120" y="60" width="4" height="10" className="dv-caret" />
      </svg>
    )
  return (
    <svg className="dim-visual" viewBox="0 0 160 90" aria-hidden>
      <g className="dv-net">
        <path d="M30 45 70 22M30 45l40 23M70 22l40 23M70 68l40-23M110 45h24M70 22v46" />
      </g>
      <circle cx="30" cy="45" r="5" className="dv-node" />
      <circle cx="70" cy="22" r="5" className="dv-node" />
      <circle cx="70" cy="68" r="5" className="dv-node" />
      <circle cx="110" cy="45" r="7" className="dv-accent" />
      <circle cx="134" cy="45" r="4" className="dv-node" />
    </svg>
  )
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title">
      <div className="container">
        <SectionHeader
          id="about-title"
          index="01"
          eyebrow="About"
          title={
            <>
              Designer. Engineer. <span className="text-muted">AI explorer.</span>
            </>
          }
          lede="Three disciplines, one way of working: understand the problem, design it well, and make sure it can actually be built."
        />

        <div className="bento">
          <Reveal className="bento-card bento-intro glass">
            <p className="card-kicker mono">Profile</p>
            <h3 className="bento-title">{about.title}</h3>
            {about.body.map((paragraph) => (
              <p key={paragraph} className="bento-text">
                {paragraph}
              </p>
            ))}
            <p className="bento-text">
              <Text value={about.personalNote} />
            </p>
          </Reveal>

          <Reveal className="bento-card bento-venn glass" delay={0.08}>
            <p className="card-kicker mono">Where it overlaps</p>
            <svg className="venn" viewBox="0 0 240 200" role="img" aria-label="Design, Engineering and AI overlap">
              <circle cx="92" cy="80" r="56" className="venn-c" data-dim="0" />
              <circle cx="148" cy="80" r="56" className="venn-c" data-dim="1" />
              <circle cx="120" cy="128" r="56" className="venn-c" data-dim="2" />
              <text x="62" y="62" className="venn-label">Design</text>
              <text x="146" y="62" className="venn-label">Engineering</text>
              <text x="120" y="168" textAnchor="middle" className="venn-label">AI</text>
              <circle cx="120" cy="96" r="4" className="venn-dot" />
              <text x="120" y="114" textAnchor="middle" className="venn-center">Umer</text>
            </svg>
            <div className="exploring">
              <span className="mono exploring-label">Currently exploring</span>
              <span className="chip-row">
                {about.exploring.map((item) => (
                  <span key={item} className="chip" data-dim="2">
                    {item}
                  </span>
                ))}
              </span>
            </div>
          </Reveal>

          {about.dimensions.map((dimension, index) => (
            <Reveal key={dimension.id} className="bento-card dim-card glass" delay={0.06 * index} as="article">
              <div className="dim-card-inner" data-dim={index}>
                <div className="dim-card-head">
                  <span className="dim-icon">
                    <DimensionGlyph dimension={dimension.id} />
                  </span>
                  <span className="mono dim-index">{dimension.kicker}</span>
                </div>
                <DimensionVisual id={dimension.id} />
                <h3 className="dim-title">{dimensionLabels[dimension.id]}</h3>
                <p className="dim-summary">{dimension.summary}</p>
                <ul className="dim-list">
                  {dimension.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
