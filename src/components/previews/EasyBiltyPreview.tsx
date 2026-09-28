import { Bar, BrowserFrame, PhoneFrame } from './Frames'

export function EasyBiltyPreview() {
  return (
    <div className="pv pv-easybilty">
      <BrowserFrame url="easybilty — dashboard" className="pv-main">
        <div className="eb-layout">
          <aside className="eb-side">
            <span className="eb-logo" />
            {Array.from({ length: 5 }, (_, i) => (
              <span key={i} className="eb-side-item" data-active={i === 1} />
            ))}
          </aside>
          <div className="eb-content">
            <div className="eb-top">
              <Bar w="34%" tone="strong" />
              <span className="eb-btn" />
            </div>
            <div className="eb-stats">
              {Array.from({ length: 3 }, (_, i) => (
                <span key={i} className="eb-stat">
                  <Bar w="50%" />
                  <Bar w="70%" tone="strong" />
                </span>
              ))}
            </div>
            <div className="eb-main">
              <div className="eb-map">
                <svg viewBox="0 0 200 120" preserveAspectRatio="none" aria-hidden>
                  <path className="eb-road" d="M0 90 C40 80 50 40 90 44 S150 90 200 30" />
                  <path className="eb-road" d="M20 0 C40 40 70 70 60 120" />
                  <path className="eb-route" d="M18 96 C50 84 58 44 94 46 S146 86 184 38" />
                  <circle cx="18" cy="96" r="4" className="eb-pin" />
                  <circle cx="184" cy="38" r="5" className="eb-pin eb-pin-end" />
                  <circle cx="110" cy="58" r="3.5" className="eb-truck" />
                </svg>
              </div>
              <div className="eb-list">
                {Array.from({ length: 4 }, (_, i) => (
                  <span key={i} className="eb-row">
                    <span className="eb-dot" data-state={i % 3} />
                    <span className="eb-row-lines">
                      <Bar w="80%" tone="strong" />
                      <Bar w="55%" />
                    </span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </BrowserFrame>

      <PhoneFrame className="pv-phone">
        <div className="eb-phone">
          <Bar w="50%" tone="strong" />
          <div className="eb-phone-map">
            <svg viewBox="0 0 100 80" aria-hidden>
              <path className="eb-route" d="M10 70 C30 50 60 60 90 12" />
              <circle cx="90" cy="12" r="4" className="eb-pin eb-pin-end" />
              <circle cx="46" cy="56" r="3" className="eb-truck" />
            </svg>
          </div>
          <div className="eb-steps">
            {Array.from({ length: 3 }, (_, i) => (
              <span key={i} className="eb-step" data-done={i < 2}>
                <i />
                <Bar w={`${70 - i * 12}%`} />
              </span>
            ))}
          </div>
          <span className="eb-phone-cta" />
        </div>
      </PhoneFrame>
    </div>
  )
}
