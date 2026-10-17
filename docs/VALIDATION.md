# First-version validation

## CORE V9 integration — October 17, 2026

- `npm run build`, `npm run typecheck` and `git diff --check`: passed.
- `npx playwright test e2e/core.spec.ts e2e/galaxy-v7.spec.ts e2e/portfolio.spec.ts`: 23 passed, 1 intentionally skipped mobile mouse-hover test. Covers all ten project routes and media, responsive containment, CORE first in Selected Work and project navigation, direct new-tab CORE activation, six presentation sections, honest prototype scope, larger visible planet without portrait overlap, layered previews, 25–150% zoom, all 21 planets contained at minimum zoom, portrait/LinkedIn preservation, WebGL/pause/fallback, reduced motion, metadata and axe accessibility.
- Visually reviewed the authentic CORE source capture and desktop/mobile portfolio previews. Corrected the initially clipped mobile CORE orbit. CORE screenshot is 69,168 bytes, with no new dependencies.
- Public URL check: CORE and all eight projects specified in the brief returned HTTP 200 for their existing destinations. Additional pre-existing Wines Horizon URLs returned 401 (site) and 404 (GitHub); preserved as authored. External product workflows were not executed.
- Catalogue discrepancy: the starting checkout already had nine real projects. Preserving Wines Horizon yields 10 real projects + 11 placeholders = 21 planets. CORE is first, followed by the eight requested projects and Wines Horizon.
- CORE repository reviewed read-only. Raw local screenshots remain untracked and are excluded by the existing `.vercelignore` rule.

Historical validation follows.

October 8, 2026.

- Production Next.js build: passed; all seven requested content pages generated.
- Strict TypeScript: passed.
- Playwright: 12 checks across desktop (1440 px) and mobile (iPhone 13 viewport), covering routes, real image loads, metadata, horizontal overflow, navigation, interactive workflow keyboard controls, constellation links, contact destination, WebGL render/pause, no-WebGL fallback, reduced motion, social cards, sitemap and unknown-route 404.
- axe WCAG 2 A/AA and 2.1 AA checks: no violations on home, ORQO case study and About at desktop and mobile sizes with reduced motion.
- Visual review: desktop hero, ORQO reveal, full homepage, mobile homepage and mobile case study. Refined headline wrapping and supplied exact intrinsic media dimensions.
- Dependency audit: zero known npm advisories after updating Sharp to 0.35.5.
- Screenshot privacy: all originals reviewed; one withheld, one cropped, two irreversibly redacted, four published without content changes. Original assets excluded from both Git and Vercel uploads.
- Git whitespace check: passed.

The sandboxed Turbopack build stalled during compilation. Webpack completed reliably; `npm run build` explicitly uses `next build --webpack`.

Limits: automated accessibility checks do not replace human assistive-technology testing. No physical iOS device or Safari test was performed. Product integrations were assessed from primary documentation/screenshots, not by performing external writes. Email and LinkedIn remain omitted pending verified public contact details.

Deployment check found that Vercel initialized the empty project with its “Other” framework preset, serving `public/` instead of Next.js routes. `vercel.json` now explicitly selects `nextjs` and the production build command. The first generated-domain deployment was automatically classified as production by Vercel; subsequent deployments explicitly target preview. No custom domain was configured.
