# Muhammad Umer Farooq — Portfolio

Personal portfolio for Muhammad Umer Farooq: UI/UX designer, software engineer and AI explorer.

Built with Vite, React, TypeScript and Framer Motion. The hero "AI core" is a lightweight Canvas 2D neural graph (no WebGL/Three.js), and it pauses under `prefers-reduced-motion`.

## Scripts

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to dist/
npm run lint
npm run preview  # serve the production build
```

## Editing content

All copy lives in `src/data/content.ts`. Any string starting with `TODO:` is rendered on the page as a visible dashed "Placeholder" chip, so nothing unverified is presented as fact. Replace them with real details:

- `profile.linkedin` — LinkedIn URL
- `profile.resume` — add your PDF at `public/cv/Muhammad-Umer-Farooq-CV.pdf`
- `experience` — Pentavio start date, previous roles/education
- `projects` — tools, roles, links and case-study sections for EasyBilty, CodeSync, Lucky Draw, Kasb-e-Hunar

### Project screenshots

Each project renders an illustrative CSS/SVG preview. To use a real screenshot, put the image in `public/projects/` and set `image: '/projects/easybilty.png'` on the project.

## Theme

Day/Night mode follows the system preference on first visit, then persists in `localStorage` (`umer-theme`). Tokens for both themes are in `src/styles/tokens.css`.

## Ask Umer's AI

The assistant UI is ready for a backend but does not fake answers. Set `VITE_ASSISTANT_API_URL` (see `.env.example`) to an endpoint that accepts:

```json
POST { "messages": [{ "role": "user", "content": "..." }], "context": "<site content summary>" }
```

and returns `{ "reply": "..." }`. Without it, the panel says it is offline and links visitors to the relevant section. See `src/lib/assistant.ts`.
