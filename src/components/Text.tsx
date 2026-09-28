import { isPlaceholder } from '../data/content'

/** Renders copy; "TODO:" placeholders get a dashed, clearly-marked style. */
export function Text({ value, className }: { value: string; className?: string }) {
  if (!isPlaceholder(value)) return <span className={className}>{value}</span>
  return (
    <span className={`placeholder ${className ?? ''}`} title="Placeholder — replace in src/data/content.ts">
      {value.replace(/^TODO:\s*/, '')}
    </span>
  )
}
