# Content and verification policy

Reviewed October 8, 2026. Project descriptions were checked against these primary sources:

- ORQO: https://github.com/vincentleg/ORQO — README, architecture, integration status and simulation disclosures.
- Intent Firewall: https://github.com/vincentleg/intent-firewall-hackathon — README, architecture and scope. Public demo: https://intent-firewall-hackathon.vercel.app.
- Steward: https://github.com/vincentleg/steward — README, real versus sandboxed behavior, signed approvals and AgentMail configuration.
- Handshake: https://handshake-six-murex.vercel.app — public page reachable. Supplied screenshots support interface claims. No public repository supplied; no authenticated actions performed.
- Supplied creative-strategy document: used for context, never as proof of production integrations. Its older visual direction is superseded by the user's cinematic brief.
- Personal background: user-provided five years in sustainable AI infrastructure and current business-development role at INFODIP. No employer endorsement, awards, client outcomes or numerical impact claimed.

The product repositories' test suites were not run. “Reported working” and “documented implementation” deliberately distinguish source statements from independent runtime verification. No emails, provider writes, restaurant orders, real bookings or money movements were performed for this portfolio review.

Each case study has a Verification Ledger in `src/lib/projects.ts`; preserve these evidence distinctions when updating copy. Project names, status, media, links, workflow and ledgers are data-driven. The constellation computes its node positions from that same array, so adding a project does not require adding a hard-coded node.

## CORE (added October 17, 2026)

- Read-only review of the public `vincentleg/core` main branch: `README.md`, `PROJECT_STATE.md`, `ROADMAP.md`, `docs/CONSTITUTION_V1.md`, `docs/PRODUCT_VISION.md`, `docs/ARCHITECTURE.md` and `docs/product/CORE_AVATAR_VISION.md`. The architecture document describes historical layers; the current state and README establish the later laboratory and investigation capabilities.
- The founder's supplied wider vision defines the World / Civilization, Intelligence / Knowledge, Business and Genesis presentation. These layers are explicitly presented as the wider vision. Genesis is a future organizational concept, not a deployed company.
- Public agent activity is recorded replay. Some local workflows use model-assisted agents. The presentation claims neither live autonomous public execution nor scientifically validated field impact. Independent validation and human authorization remain prerequisites for real-world infrastructure changes.
- `https://creationofrebornearth.com` was inspected in an isolated browser and visually verified as CORE, with its branding, interactive Earth, cinematic interface and local-prototype disclosure. It was used directly for the screenshot and live actions. No fallback deployment or generated interface was needed.
- No CORE repository files were changed, no private datasets were copied and no CORE workflows or infrastructure actions were executed.
- The checkout already contained Wines Horizon, in addition to the eight projects listed in the V9 brief. It is preserved after those projects: CORE is first, then the requested eight, then Wines Horizon. This yields 10 real planets and 11 future placeholders, retaining 21 total. The original eight keep their inner-ring positions; CORE has its own visible orbit. Wines Horizon's pre-existing URLs returned HTTP 401 (site) and 404 (public GitHub); they were preserved rather than substituted.

## Notebook from the Valley (added October 8, 2026)

- Official URL verified: https://notebookfromthevalley.com (HTTP 200; WordPress author account belongs to Vincent Leguide; founding essay written in the first person).
- `src/lib/notebook.ts`: 25 article titles, dates and opening lines copied verbatim from the site's public WordPress feed and checked programmatically against it. One post containing placeholder (lorem ipsum) text is excluded.
- `public/media/notebook-home.webp`, `notebook-essay.webp`: unedited screenshots of the live publication, captured with `scripts/capture-notebook.mjs`.
- Article feature images are not reused: several depict third parties or may be third-party photography.
- Not claimed: readership, subscriber counts, awards, press credentials, partnerships.

## Project signature diagrams (added October 8, 2026)

`src/components/signature.tsx` draws one conceptual SVG per project from that project's documented workflow (the `flow` steps and ledger in `src/lib/projects.ts`). Each is captioned "Conceptual diagram · documented workflow". They are illustrations, not product screenshots, and imply no additional runtime capability.
