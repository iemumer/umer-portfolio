import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

type Props = { index: string; eyebrow: string; title: ReactNode; lede?: ReactNode; id?: string }

export function SectionHeader({ index, eyebrow, title, lede, id }: Props) {
  return (
    <Reveal className="section-header">
      <p className="eyebrow">
        <span className="eyebrow-index">{index}</span>
        <span className="eyebrow-line" aria-hidden />
        {eyebrow}
      </p>
      <h2 id={id} className="section-title">
        {title}
      </h2>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  )
}
