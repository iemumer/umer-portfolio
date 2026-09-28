import { Bar, BrowserFrame } from './Frames'

export function KasbPreview() {
  return (
    <div className="pv pv-kasb">
      <BrowserFrame url="kasb-e-hunar" className="pv-main">
        <div className="kh-page">
          <div className="kh-nav">
            <span className="kh-logo" />
            <span className="kh-links">
              <Bar w="28px" />
              <Bar w="28px" />
              <Bar w="28px" />
            </span>
            <span className="kh-btn" />
          </div>
          <div className="kh-hero">
            <div className="kh-hero-copy">
              <Bar w="86%" tone="strong" />
              <Bar w="64%" tone="strong" />
              <Bar w="74%" />
              <span className="kh-search">
                <Bar w="50%" />
                <span className="kh-search-btn" />
              </span>
            </div>
            <span className="kh-hero-art" />
          </div>
          <div className="kh-cards">
            {Array.from({ length: 4 }, (_, i) => (
              <span key={i} className="kh-card">
                <span className="kh-avatar" data-tone={i % 3} />
                <Bar w="70%" tone="strong" />
                <Bar w="50%" />
              </span>
            ))}
          </div>
        </div>
      </BrowserFrame>
    </div>
  )
}
