# Vincent Leguide — The Builder’s Universe

A complete Next.js App Router portfolio with a React Three Fiber orbital hero, GSAP scroll storytelling, reviewed real product media, and four evidence-led case studies.

## Run

Node.js 22 or newer:

```sh
npm ci
npm run dev
```

Production and browser checks:

```sh
npm run build
npm run typecheck
npx playwright install chromium
npm run test:e2e
```

The browser suite starts the production server on port 3100. It covers desktop/mobile routes, image loading, overflow, keyboard workflows, constellation navigation, reduced motion, WebGL fallback, axe accessibility checks, social images and 404 behavior.

## Routes

- `/` — six-scene immersive homepage
- `/work` — project index
- `/work/orqo`, `/work/intent-firewall`, `/work/handshake`, `/work/steward`
- `/about` — infrastructure background and product principles
- Site-wide contact footer with the verified GitHub profile

## Architecture

`src/lib/projects.ts` is the strict TypeScript content source. All project routes are statically generated. Heavy Three.js code is dynamically loaded only on the homepage and only when WebGL is available and reduced motion is not requested. Mobile geometry and pixel density are reduced; the renderer stops when offscreen or paused. Native scrolling is retained. GSAP media-query cleanup respects reduced motion and route changes. Fonts are packaged locally; no third-party font fetch is needed at build or runtime.

The orbital illustration and infrastructure drawing are original code-native graphics, not product UI mockups. Product captures are optimized with Next Image and include full-resolution links. Social cards use `next/og`, with one card for each case study. Metadata, sitemap, robots and Person JSON-LD are included.

## Content and privacy

Read [content sources](docs/CONTENT-SOURCES.md) and [asset review](docs/ASSET-REVIEW.md). The sensitive ORQO dashboard is withheld. The other ORQO image is cropped; Handshake receipt identifiers are irreversibly masked. Originals under `portfolio-starter/` are ignored by Git and Vercel. Only reviewed derivatives in `public/media` are publishable. Do not run source product actions as part of portfolio testing.

No email or LinkedIn URL is guessed. Add verified public contact details to `src/components/chrome.tsx` when provided.

## Vercel preview

Use a new Vercel project for this repository. `vercel deploy` creates a preview; do not use `--prod` or bind a custom domain without approval. Set `NEXT_PUBLIC_SITE_URL` only when the canonical domain is known. Otherwise the preview's `VERCEL_URL` supplies metadata origins. There are no product API credentials and no backend integrations in this portfolio.

## Updating projects

Add a record to `projects`, including a screenshot, evidence, honest status and workflow. Work index, routes and constellation update from this source.
