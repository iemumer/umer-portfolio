import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
})

export const LinkedInIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props} fill="currentColor" stroke="none">
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.83v1.5h.06c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.13v5.93h-4v-5.26c0-1.25-.02-2.87-1.75-2.87-1.75 0-2.02 1.37-2.02 2.78v5.35h-4v-11.5Z" />
  </svg>
)

export const GitHubIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props} fill="currentColor" stroke="none">
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
  </svg>
)

export const SunIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" />
  </svg>
)

export const MoonIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5Z" />
  </svg>
)

export const ArrowRightIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

export const ArrowUpRightIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export const ArrowUpIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M12 19V5M6 11l6-6 6 6" />
  </svg>
)

export const MailIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="3" y="5" width="18" height="14" rx="3" />
    <path d="m4 7 8 6 8-6" />
  </svg>
)

export const FileIcon = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" />
    <path d="M14 3v5h5M9 13h6M9 17h4" />
  </svg>
)

export const MenuIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M4 8h16M4 16h16" />
  </svg>
)

export const CloseIcon = ({ size = 20, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M6 6l12 12M18 6 6 18" />
  </svg>
)

export const CopyIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <rect x="9" y="9" width="11" height="11" rx="2.5" />
    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
  </svg>
)

export const CheckIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
)

export const SendIcon = ({ size = 16, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
)

/** Small three-node glyph used for the AI assistant. */
export const CoreGlyph = ({ size = 18, ...props }: IconProps) => (
  <svg {...base(size)} {...props}>
    <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    <circle cx="12" cy="4.5" r="1.6" />
    <circle cx="18.5" cy="16" r="1.6" />
    <circle cx="5.5" cy="16" r="1.6" />
    <path d="M12 6.1v3.5M17.1 15.2l-3 -1.8M6.9 15.2l3-1.8" opacity=".7" />
  </svg>
)

export const DimensionGlyph = ({ dimension, size = 20 }: { dimension: 'design' | 'engineering' | 'ai'; size?: number }) => {
  if (dimension === 'design')
    return (
      <svg {...base(size)}>
        <rect x="4" y="4" width="16" height="16" rx="3" />
        <path d="M4 9.5h16M9.5 9.5V20" opacity=".6" />
      </svg>
    )
  if (dimension === 'engineering')
    return (
      <svg {...base(size)}>
        <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 5l-3 14" />
      </svg>
    )
  return <CoreGlyph size={size} />
}
