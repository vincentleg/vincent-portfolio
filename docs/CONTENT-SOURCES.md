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

## Notebook from the Valley (added October 8, 2026)

- Official URL verified: https://notebookfromthevalley.com (HTTP 200; WordPress author account belongs to Vincent Leguide; founding essay written in the first person).
- `src/lib/notebook.ts`: 25 article titles, dates and opening lines copied verbatim from the site's public WordPress feed and checked programmatically against it. One post containing placeholder (lorem ipsum) text is excluded.
- `public/media/notebook-home.webp`, `notebook-essay.webp`: unedited screenshots of the live publication, captured with `scripts/capture-notebook.mjs`.
- Article feature images are not reused: several depict third parties or may be third-party photography.
- Not claimed: readership, subscriber counts, awards, press credentials, partnerships.

## Project signature diagrams (added October 8, 2026)

`src/components/signature.tsx` draws one conceptual SVG per project from that project's documented workflow (the `flow` steps and ledger in `src/lib/projects.ts`). Each is captioned "Conceptual diagram · documented workflow". They are illustrations, not product screenshots, and imply no additional runtime capability.
