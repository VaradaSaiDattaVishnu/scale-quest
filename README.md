# Scale Quest

An interactive, visual, game-like way to learn system design — 60 hands-on levels covering load balancers, caching, databases, sharding, queues, and large-scale architectures.

**Live:** https://varadasaidattavishnu.github.io/scale-quest/

## Tech

React 18 · Vite · Tailwind CSS · Framer Motion · Zustand

## Local development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build to dist/
```

## Deployment

Pushing to `main` triggers a GitHub Actions workflow that builds the app and publishes `dist/` to GitHub Pages. The app is fully client-side (progress is stored in the browser), so no backend is required for the deployed site.
