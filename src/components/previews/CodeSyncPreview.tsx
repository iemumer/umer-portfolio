const diff: { type: ' ' | '+' | '-'; code: string }[] = [
  { type: ' ', code: 'export async function sync(repo) {' },
  { type: '-', code: '  const changes = await repo.diff()' },
  { type: '+', code: '  const changes = await repo.diff({ staged: true })' },
  { type: '+', code: '  const files = groupByFile(changes)' },
  { type: ' ', code: '' },
  { type: '-', code: '  return render(changes)' },
  { type: '+', code: '  return summarize(files)' },
  { type: ' ', code: '}' },
]

export function CodeSyncPreview() {
  return (
    <div className="pv pv-codesync">
      <div className="cs-editor">
        <div className="cs-tabs mono">
          <span data-active>sync.ts</span>
          <span>diff</span>
          <span className="cs-branch">⎇ feature</span>
        </div>
        <pre className="cs-code mono" aria-hidden>
          {diff.map((line, i) => (
            <span key={i} className="cs-line" data-type={line.type}>
              <span className="cs-ln">{i + 12}</span>
              <span className="cs-sign">{line.type === ' ' ? '' : line.type}</span>
              <span className="cs-text">{line.code}</span>
            </span>
          ))}
        </pre>
      </div>

      <div className="cs-summary">
        <div className="cs-summary-head">
          <span className="cs-core" aria-hidden>
            <i />
          </span>
          <span className="mono">AI change summary</span>
          <span className="cs-status mono">generating</span>
        </div>
        <div className="cs-summary-body" aria-hidden>
          <span className="sk sk-strong" style={{ width: '82%' }} />
          <span className="sk sk-soft" style={{ width: '94%' }} />
          <span className="sk sk-soft" style={{ width: '68%' }} />
          <span className="cs-tags">
            <span className="cs-tag">+3</span>
            <span className="cs-tag cs-tag-del">−2</span>
            <span className="cs-tag">1 file</span>
          </span>
        </div>
        <svg className="cs-graph" viewBox="0 0 200 40" preserveAspectRatio="none" aria-hidden>
          <path d="M0 30 L30 26 L60 28 L90 14 L120 18 L150 8 L200 12" />
        </svg>
      </div>
    </div>
  )
}
