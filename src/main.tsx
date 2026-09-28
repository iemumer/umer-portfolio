import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/tokens.css'
import './styles/base.css'
import './styles/components.css'
import './styles/nav.css'
import './styles/hero.css'
import './styles/sections.css'
import './styles/projects.css'
import './styles/previews.css'
import './styles/assistant.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
