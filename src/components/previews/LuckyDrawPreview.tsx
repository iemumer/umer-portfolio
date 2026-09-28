import { Bar, PhoneFrame } from './Frames'

export function LuckyDrawPreview() {
  return (
    <div className="pv pv-lucky">
      <PhoneFrame className="ld-phone ld-phone-back">
        <div className="ld-screen">
          <Bar w="46%" tone="strong" />
          {Array.from({ length: 3 }, (_, i) => (
            <span key={i} className="ld-ticket">
              <span className="ld-ticket-stub" />
              <span className="ld-ticket-lines">
                <Bar w="70%" tone="strong" />
                <Bar w="45%" />
              </span>
            </span>
          ))}
        </div>
      </PhoneFrame>
      <PhoneFrame className="ld-phone ld-phone-front">
        <div className="ld-screen ld-center">
          <Bar w="52%" tone="strong" />
          <div className="ld-wheel" aria-hidden>
            <svg viewBox="0 0 100 100">
              {Array.from({ length: 8 }, (_, i) => (
                <path
                  key={i}
                  className="ld-seg"
                  data-alt={i % 2 === 0}
                  d={`M50 50 L${50 + 46 * Math.cos((i * Math.PI) / 4)} ${50 + 46 * Math.sin((i * Math.PI) / 4)} A46 46 0 0 1 ${50 + 46 * Math.cos(((i + 1) * Math.PI) / 4)} ${50 + 46 * Math.sin(((i + 1) * Math.PI) / 4)} Z`}
                />
              ))}
              <circle cx="50" cy="50" r="9" className="ld-hub" />
            </svg>
            <span className="ld-pointer" />
          </div>
          <span className="ld-cta" />
        </div>
      </PhoneFrame>
    </div>
  )
}
