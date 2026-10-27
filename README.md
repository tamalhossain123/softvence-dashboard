# Softvence Dashboard

A professional redesign of the Softvence Project Management dashboard,
rebuilt in React. Calm, premium and user-friendly, with the official
Softvence branding (logo green `#00AB0C` + black).

Live preview: https://tamalhossain123.github.io/softvence-dashboard/

## Tech stack

- React 19 + Vite
- Framer Motion (animation)
- Lucide icons
- Plain CSS design system (src/index.css), Plus Jakarta Sans

## Project structure

```
.
├── .github/workflows/deploy.yml   # CI: build + deploy to GitHub Pages
├── index.html                     # Vite entry page
├── package.json
├── vite.config.js
├── public/
│   └── favicon.png
└── src/
    ├── main.jsx                   # app bootstrap
    ├── App.jsx                    # shell + all pages
    ├── index.css                  # design system
    └── assets/                    # Softvence logo files
```

## Run locally

```bash
npm install
npm run dev        # development server
npm run build      # production build into dist/
npm run preview    # preview the production build
```

## Deployment

Every push to `main` runs the GitHub Actions workflow in
`.github/workflows/deploy.yml`, which builds the project and deploys
`dist/` to GitHub Pages automatically.
(Repo setting required once: Settings → Pages → Build and deployment →
Source: **GitHub Actions**.)

## Notes

This is a design prototype: data is realistic mock data modelled on the
live system, and interactions (tasks, concerns, bug reports, messages,
feed posts) run in the browser. Connecting it to the real backend/API is
the implementation step that follows design approval.
