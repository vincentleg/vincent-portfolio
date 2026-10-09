# Vincent Leguide — The Builder’s Universe

A complete Next.js App Router portfolio with a React Three Fiber spiral galaxy, GSAP scroll transitions, reviewed real product media, and five evidence-led project presentations.

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

The browser suite starts the production server on port 3100. It covers desktop/mobile routes, image loading, overflow, keyboard workflows, galaxy anchor navigation and preserved card hover effects, reduced motion, WebGL fallback, axe accessibility checks, social images and 404 behavior.

## Routes

- `/` — complete one-page galaxy, selected projects, journey, and contact
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

## Vercel deployment

The repository is linked to the existing `vincent-portfolio` Vercel project. `vercel deploy` creates a preview; `vercel deploy --prod` publishes production when authorized. Set `NEXT_PUBLIC_SITE_URL` only when the canonical domain is known. Otherwise the preview's `VERCEL_URL` supplies metadata origins. There are no product API credentials and no backend integrations in this portfolio.

## Updating projects

Add a record to `projects`, including a screenshot, evidence, honest status and workflow. Work index, routes and constellation update from this source.

## Adding a project

Projects are fully data-driven. To add one:

1. Append an entry to `entries` in `src/lib/projects.ts`. Required: `slug`, `name`, `category`, `group`, `date` (YYYY-MM), `status`, `accent`, `hook`, `summary`, case-study copy and a `ledger`. Optional: `featured` (homepage index, max 8), `related` (`[{ slug, reason }]` — the only edges the constellation draws), `image`/`imageAlt`/`caption`, `gallery`, `links` (`kind: 'demo' | 'repo' | 'publication'`).
2. Put screenshots in `public/media/` and add their dimensions to `src/lib/media-dimensions.json`. Without an image, the project's signature diagram is used (a generic one unless a bespoke diagram exists in `src/components/signature.tsx`).
3. Nothing else: numbering, routes, sitemap, social images, work filters, the homepage chapters and project navigation all derive from the data.

Scale testing: `NEXT_PUBLIC_PORTFOLIO_FIXTURES=20 npm run build && NEXT_PUBLIC_PORTFOLIO_FIXTURES=20 npx playwright test e2e/scale.spec.ts`. Never set this variable in a deployed environment; rebuild without it before deploying.

## Galaxy and portrait

Add Vincent’s unmodified real photo at `public/media/vincent-portrait.png`, then rebuild and deploy. The homepage checks for this file at build time. Until it exists, it displays an explicitly labeled VL monogram, with no missing image request or substitute face. The image uses a circular `object-fit: cover` crop; adjust `object-position` in `.portrait-mask img` if needed for the supplied photo.

The hero shows the first five featured projects to keep orbital labels readable. Every project still receives a full homepage chapter and a compatibility route from `src/lib/projects.ts`. Hover or keyboard focus previews a project; activation navigates to its same-page chapter. Existing index transitions and screenshot-card transforms are reused. Each chapter includes links and expandable evidence and galleries.

The WebGL galaxy uses one seeded points draw call (6,500 stars on desktop, 2,600 on mobile), capped pixel density, and no postprocessing or image dependencies. A code-native SVG spiral and DOM project navigation remain available without WebGL. Reduced motion disables the canvas, parallax, smooth scrolling, and orbital animation. Mobile uses fixed orbital positions. Pause and offscreen visibility stop continuous motion.

`node scripts/verify-project-links.mjs` checks the existing external project links without executing product actions. `node scripts/visual-review.mjs` captures the local production server on port 3100; use `REVIEW_URL` to inspect an explicitly chosen deployment instead.
