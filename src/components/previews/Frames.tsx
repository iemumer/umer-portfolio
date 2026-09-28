import type { ReactNode } from 'react'

export function BrowserFrame({ children, url, className }: { children: ReactNode; url: string; className?: string }) {
  return (
    <div className={`browser ${className ?? ''}`}>
      <div className="browser-bar">
        <span className="browser-dots" aria-hidden>
          <i />
          <i />
          <i />
        </span>
        <span className="browser-url mono">{url}</span>
      </div>
      <div className="browser-body">{children}</div>
    </div>
  )
}

export function PhoneFrame({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={`phone ${className ?? ''}`}>
      <span className="phone-notch" aria-hidden />
      <div className="phone-body">{children}</div>
    </div>
  )
}

export const Bar = ({ w, tone = 'soft' }: { w: string; tone?: 'soft' | 'strong' | 'accent' }) => (
  <span className={`sk sk-${tone}`} style={{ width: w }} />
)
