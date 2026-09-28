import type { Project } from '../../data/content'
import { CodeSyncPreview } from './CodeSyncPreview'
import { EasyBiltyPreview } from './EasyBiltyPreview'
import { KasbPreview } from './KasbPreview'
import { LuckyDrawPreview } from './LuckyDrawPreview'

export function ProjectPreview({ project }: { project: Project }) {
  if (project.image) {
    return (
      <div className="pv pv-image">
        <img src={project.image} alt={`${project.name} preview`} loading="lazy" decoding="async" />
      </div>
    )
  }
  switch (project.preview) {
    case 'easybilty':
      return <EasyBiltyPreview />
    case 'codesync':
      return <CodeSyncPreview />
    case 'luckydraw':
      return <LuckyDrawPreview />
    case 'kasbehunar':
      return <KasbPreview />
  }
}
