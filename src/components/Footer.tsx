import { profile } from '../data/content'
import { ArrowUpIcon } from './Icons'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>
          © {new Date().getFullYear()} {profile.name}. Designed &amp; built by {profile.shortName}.
        </p>
        <a href="#home" className="footer-top">
          Back to top <ArrowUpIcon size={14} />
        </a>
      </div>
    </footer>
  )
}
