import { fixtureProjects } from './fixtures';
export type ProjectGroup = 'AI products & agents' | 'Media & writing' | 'Infrastructure';
export type Relation = { slug: string; reason: string };
export type Project = {
  slug: string; name: string; category: string; status: string; accent: string;
  /** Broad family used for filtering and constellation clustering. */
  group: ProjectGroup;
  /** ISO year-month used for chronological ordering. */
  date: string;
  /** Shown in the homepage index. */
  featured?: boolean;
  /** Meaningful connections only; rendered as constellation edges (symmetric). */
  related?: Relation[];
  hook: string; summary: string;
  /** Optional authentic visual. Without one, the project's signature diagram is shown. */
  image?: string; imageAlt?: string; caption?: string;
  gallery: { src: string; alt: string; caption: string }[];
  links: { label: string; href: string; kind?: 'demo' | 'repo' | 'publication' }[]; stack: string[];
  problem: string; decision: string; approach: string; next: string;
  flow: { title: string; text: string }[];
  ledger: { capability: string; status: string; evidence: string; href?: string }[];
  kind?: 'build' | 'media';
  /** Optional copy overrides for case-study headings that assume a software build. */
  copy?: { problemTitle: [string, string]; approachLabel: string; approachTitle: [string, string]; methodTitle: string; stackLabel: string; workflowTitle: string; nextTitle: [string, string] };
};
export type NumberedProject = Project & { number: string };
const github = 'https://github.com/vincentleg';
const entries: Project[] = [
  {
    slug: 'red-queen', name: 'RED QUEEN', group: 'AI products & agents', date: '2026-10', featured: true, related: [{ slug: 'escape-room', reason: 'Recovery that has to prove itself' }],
    category: 'AI Agents / Harness Engineering', status: 'Live demo · hackathon prototype', accent: '#d65468',
    hook: 'Every fix must survive its own attack.',
    summary: 'A counterexample-guided evolution chamber for AI-agent recovery policies. It tests candidate strategies against simulated payment failures, exposes counterexamples, and promotes only policies that pass bounded verification.',
    image: '/media/red-queen-home.webp', imageAlt: 'Authentic RED QUEEN homepage with the headline “The Evolution Chamber”, the tagline “Every fix must survive its own attack.” and a crimson recovery-genome helix.',
    caption: 'Live-site homepage · Harness Engineering & Model Wrangling hackathon, SF Tech Week · October 2026. Payments are simulated.',
    gallery: [], links: [{ label: 'Open live demo', href: 'https://red-queen-ten.vercel.app/', kind: 'demo' }, { label: 'Explore the repository', href: `${github}/red-queen`, kind: 'repo' }],
    stack: ['Next.js', 'MongoDB Atlas', 'Zod policy interpreter', 'Bounded verifier'],
    problem: 'An agent that retries a failed payment can fix one failure and create a worse one: a duplicate charge, a false success, or a loop that never ends. A recovery policy that looks reasonable is not the same as one that survives the failures it will actually meet.',
    decision: 'Attack every candidate fix before trusting it. A verifier searches for counterexamples, each failure guides the next mutation, and a policy is promoted only when it passes the complete bounded suite.',
    approach: 'A simulated payment provider models a ledger, durable idempotency keys, and timeouts before or after a charge commits. A strict Zod-validated interpreter runs each policy without executing generated code. An independent verifier enumerates 54 scenarios per policy and checks ledger safety, truthful success, and bounded termination. A blind-retry baseline fails on duplicate charges; reconciliation exposes stale reads; stable idempotency survives. Runs, policies, counterexamples, events, and lineage persist in MongoDB Atlas. Optional AI mode asks a model to propose policies; without it, a deterministic mutation is used and labeled as such.',
    next: 'Passing the bounded scenarios is not a universal safety guarantee. Concurrent orders, key expiry, provider corruption, and real payment integrations remain outside the model.',
    flow: [{ title: 'Propose', text: 'Start from a candidate recovery policy, beginning with a blind-retry baseline.' }, { title: 'Attack', text: 'Enumerate 54 simulated failure scenarios and search for a counterexample.' }, { title: 'Mutate', text: 'Use the counterexample trace to guide the next generation of the policy.' }, { title: 'Promote', text: 'Promote only a policy that passes the complete bounded suite, and persist the evidence.' }],
    ledger: [
      { capability: 'Interactive Evolution Chamber', status: 'Live demo', evidence: 'The public site serves the chamber; BEGIN EVOLUTION starts a real bounded run.', href: 'https://red-queen-ten.vercel.app/' },
      { capability: 'Bounded verification across 54 scenarios', status: 'Documented implementation', evidence: 'README documents the independent verifier and its bounds: one order, at most three attempts and three injected faults.', href: `${github}/red-queen#the-real-engine` },
      { capability: 'MongoDB Atlas experiment persistence', status: 'Documented implementation', evidence: 'Runs, policies, counterexamples, events, and lineage are stored and restored on reload.', href: `${github}/red-queen#persistence-and-ui` },
      { capability: 'Payment failures', status: 'Simulated', evidence: 'No real charges are made. The provider, ledger, and faults are simulated.', href: `${github}/red-queen#the-real-engine` },
      { capability: 'AI-generated policy proposals', status: 'Optional / configuration dependent', evidence: 'Enabled only with a model key. Otherwise candidates come from a deterministic mutation labeled “DETERMINISTIC FALLBACK · NOT AI”; the captured homepage shows “AI not configured”.', href: `${github}/red-queen#ai-driven-evolution` }
    ]
  },
  {
    slug: 'plot-twist', name: 'PLOT TWIST', group: 'AI products & agents', date: '2026-10', featured: true, related: [{ slug: 'intent-firewall', reason: 'The model proposes; code authorizes' }],
    category: 'AI Trust / Decision Intelligence', status: 'Hackathon prototype · local demo', accent: '#3fd0c0',
    hook: 'AI answers need evidence before they become decisions.',
    summary: 'An evidence-aware AI decision workspace. It turns trust-analysis reports into an interactive 3D environment where an agent maps claims, evidence, risks, and permitted actions. A server-side gateway decides whether the final document can be approved or must remain a qualified draft.',
    image: '/media/plot-twist-home.webp', imageAlt: 'Authentic PLOT TWIST interface showing the 3D Trame environment, the Scout agent on standby, permit states, and the closed final-document gateway.',
    caption: 'Original interface screenshot · Decision-Grade AI hackathon, Stanford · October 2026. Recorded analysis with live permission checks.',
    gallery: [], links: [{ label: 'Explore the repository', href: `${github}/plot-twist`, kind: 'repo' }],
    stack: ['Ezio reports', 'TokenRouter', 'Keenable search', 'Server-side permits'],
    problem: 'A fluent AI answer, or a single global trust score, is not enough to act on. A decision needs to know which claims are supported, which evidence they depend on, and what is still unknown.',
    decision: 'The model proposes; the code authorizes. Every action holds a server permit tied to explicit claims and excerpts, and the final document is released only when the server re-evaluates the exact note.',
    approach: 'An Ezio trust-analysis report is imported with a declared use. The analysis extracts claims, excerpts checked against the original text, issues, and use risk. Scout explores the Trame, a 3D world where each action is ACTIVE, SUSPENDED, BLOCKED, or NEEDS_HUMAN. A research loop uses Keenable search and TokenRouter models, and the server checks that quoted evidence appears in the fetched text. Contradictions escalate to human review. The gateway outputs a final document only when finalization is ACTIVE; otherwise it produces a labeled draft, refusal report, or question for a human.',
    next: 'Server checks bound the model’s work but do not establish factual truth: excerpt provenance is not verification. This is a hackathon prototype run locally as a single process, demonstrated through a guided recorded analysis.',
    flow: [{ title: 'Import', text: 'Load an Ezio trust-analysis report and declare how it will be used.' }, { title: 'Map', text: 'Extract claims, excerpts, issues, and risks into the 3D Trame.' }, { title: 'Permit', text: 'Grant each action an evidence-linked permit: active, suspended, blocked, or needs human.' }, { title: 'Finalize', text: 'The server gateway approves a final document or keeps it a qualified draft.' }],
    ledger: [
      { capability: '3D Trame and Scout agent', status: 'Original screenshot', evidence: 'The supplied capture shows the Trame, Scout on standby, and the four permit states.' },
      { capability: 'Evidence-linked permits and finalization gateway', status: 'Documented implementation', evidence: 'README documents the permit policy and a POST /finalize that re-evaluates the exact note on the server.', href: `${github}/plot-twist#what-the-engine-does` },
      { capability: 'Human review and escalation', status: 'Documented implementation', evidence: 'Contradicting evidence escalates to NEEDS_HUMAN and is never auto-resolved.', href: `${github}/plot-twist#what-the-engine-does` },
      { capability: 'Ezio, TokenRouter, and Keenable', status: 'Integrated', evidence: 'README lists the sponsors used: real Ezio exports as input, TokenRouter analysis calls, and Keenable search.', href: `${github}/plot-twist#sponsors-actually-used` },
      { capability: 'Factual truth and public deployment', status: 'Not claimed', evidence: 'Checks bound the model but do not prove truth. The demo runs locally; there is no public deployment.', href: `${github}/plot-twist#limits` }
    ]
  },
  {
    slug: 'escape-room', name: 'ESCAPE ROOM', group: 'AI products & agents', date: '2026-10', featured: true,
    category: 'AI Security / Cyberdefense', status: 'Hackathon prototype', accent: '#8de9ff',
    hook: 'Before an AI agent escapes, prove you can contain it.',
    summary: 'An interactive cyberdefense experience exploring AI-agent containment, security boundaries, and evidence-based incident response. Built during a San Francisco hackathon.',
    image: '/media/escape-room-home.webp', imageAlt: 'Authentic ESCAPE ROOM homepage with orange highlights and the headline “Before an AI agent escapes, prove you can contain it.”',
    caption: 'Original project screenshot · Cyberdefense Hackathon, AWS Loft, San Francisco · October 8, 2026.',
    gallery: [], links: [], stack: ['AI-agent containment', 'Security boundaries', 'Evidence', 'Human oversight'],
    problem: 'Before trusting an AI agent to act, how can we investigate whether it stays within its security boundaries and respond when those boundaries fail?',
    decision: 'Make containment, evidence, and human oversight the focus of an interactive security scenario.',
    approach: 'Built as a hackathon prototype at the AWS Loft in San Francisco on October 8, 2026. The experience challenges participants to investigate and respond to an AI-agent security scenario, with containment and evidence at the center.',
    next: 'This is an exploratory hackathon prototype, not a commercial production security platform.',
    flow: [{ title: 'Investigate', text: 'Explore the AI-agent security scenario.' }, { title: 'Contain', text: 'Consider the security boundaries and human oversight needed to respond.' }, { title: 'Examine evidence', text: 'Ask what evidence supports the containment outcome.' }],
    ledger: [{ capability: 'Interactive cyberdefense experience', status: 'Hackathon prototype', evidence: 'Built by Vincent at the Cyberdefense Hackathon on October 8, 2026, at the AWS Loft in San Francisco.' }, { capability: 'Homepage and containment scenario', status: 'Original screenshot', evidence: 'The supplied capture shows the project homepage and containment chamber. No production security guarantees are claimed.' }]
  },
  {
    slug: 'orqo', name: 'ORQO', group: 'AI products & agents', date: '2026-10', featured: true, related: [{ slug: 'handshake', reason: 'Turning a conversation into a concrete next step' }, { slug: 'notebook-from-the-valley', reason: 'Researching companies across the ecosystem' }], category: 'Business intelligence', status: 'In development', accent: '#dba887',
    hook: 'You meet the person. ORQO finds the business.',
    summary: 'A business-development system that researches companies, tests opportunities from both sides, and keeps evidence at the center of the conversation.',
    image: '/media/orqo-homepage.webp', imageAlt: 'Authentic ORQO homepage showing the work prompt, suggested actions and opportunities in French.',
    caption: 'ORQO homepage · Original product screenshot.',
    gallery: [], links: [{ label: 'Explore the repository', href: `${github}/ORQO`, kind: 'repo' }],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Deterministic engine'],
    problem: 'A promising conversation often ends with a contact record and no concrete next step. Understanding whether two companies can actually work together takes research, commercial context, and a clear view of what each side needs.',
    decision: 'Evaluate both sides of a relationship. ORQO tests concrete business structures and gives a critic the job of rejecting weak opportunities. A surviving idea carries evidence, assumptions, unknowns, risks, and a next step. Private consent comes before a shared business match.',
    approach: 'The documented architecture separates a pure TypeScript domain engine from the Next.js interface and server integrations. Research, bilateral reasoning, structure discovery, critic checks, orchestration, and re-evaluation are distinct stages. The account-free demo uses fictional companies and deterministic scenarios; the workspace product adds accounts, research, and agent infrastructure.',
    next: 'The next challenge is turning a useful research workflow into a dependable daily product while preserving source provenance, approval boundaries, and a clear distinction between facts and inference.',
    flow: [{ title: 'Research', text: 'Understand each company and retain the sources behind its capabilities and needs.' }, { title: 'Challenge', text: 'Test a business structure from both sides. Reject weak ideas and surface unknowns.' }, { title: 'Connect', text: 'Collect private interest from both parties before creating a shared business match.' }, { title: 'Revisit', text: 'Re-evaluate dormant relationships when a relevant signal changes the context.' }],
    ledger: [
      { capability: 'Bilateral reasoning and critic pipeline', status: 'Documented implementation', evidence: 'Repository describes a deterministic engine and scenario tests; portfolio review did not run the product test suite.', href: `${github}/ORQO#architecture` },
      { capability: 'Accounts, workspaces and official-site research', status: 'Reported working', evidence: 'README reports development-project integration tests and live official-site retrieval.', href: `${github}/ORQO#integrations--status` },
      { capability: 'OpenRouter, Neo4j and Brave adapters', status: 'Partial / configuration dependent', evidence: 'Adapters are implemented. Current configuration or live verification is incomplete according to the README.', href: `${github}/ORQO#integrations--status` },
      { capability: 'Demo companies and future signals', status: 'Simulated', evidence: 'Fictional data and the six-month signal are explicitly labeled simulated.', href: `${github}/ORQO#whats-simulated` },
      { capability: 'Calendar, CRM and external agent messaging', status: 'Not integrated', evidence: 'Meeting scheduling records a lifecycle change; no calendar or CRM integration is claimed.', href: `${github}/ORQO#whats-simulated` }
    ]
  },
  {
    slug: 'intent-firewall', name: 'Intent Firewall', group: 'AI products & agents', date: '2026-10', featured: true, related: [{ slug: 'steward', reason: 'Policy stays authoritative over the model' }], category: 'Agent guardrails', status: 'Live demo · prototype', accent: '#b4cda3',
    hook: 'Same change. Different intent.',
    summary: 'A decision layer for agentic commerce: adapt a harmless order change, ask when intent is at risk, or hold when evidence is missing.',
    image: '/media/intent-overview.webp', imageAlt: 'Intent Firewall demo with a client meeting lunch order and merchant fulfillment workflow.', caption: 'Live-demo interface · Order facts are simulated; the project uses live model decisions when its provider is configured.',
    gallery: [{ src: '/media/intent-decision.webp', alt: 'Intent Firewall merchant console evaluates a fifteen-minute delivery delay for a client meeting.', caption: 'The same delay is judged against purpose, hard deadlines, budget and physical verification.' }],
    links: [{ label: 'Open live demo', href: 'https://intent-firewall-hackathon.vercel.app', kind: 'demo' }, { label: 'Explore the repository', href: `${github}/intent-firewall-hackathon`, kind: 'repo' }],
    stack: ['Next.js', 'TypeScript', 'ZooWork Instinct', 'Policy engine'],
    problem: 'Lunch arriving fifteen minutes late can be harmless for a casual team meal and unacceptable before a client meeting. An order alone does not tell a restaurant which promise matters. Asking about every change is noisy; automatically accepting every change is risky.',
    decision: 'Carry the customer’s purpose with the order. Let a model assess the proposed change, then apply deterministic rules that remain authoritative. Missing verification means hold; a missed hard deadline means ask. Automatic adaptation requires verified state and sufficient confidence.',
    approach: 'A Next.js server endpoint sends a choice question to ZooWork Instinct. The policy layer checks hard constraints and separates the model’s original choice from the final decision in an expandable receipt. The public demo is a decision sandbox: it does not modify restaurant orders or send customer notifications.',
    next: 'Real order execution would need authenticated merchant evidence, durable decision history, and abuse controls. Those production requirements remain outside the prototype.',
    flow: [{ title: 'Capture intent', text: 'Attach purpose, hard constraints and soft preferences to the original order.' }, { title: 'Evaluate change', text: 'Compare the merchant’s proposal with the promise made to the customer.' }, { title: 'Apply policy', text: 'Hard constraints override model preference. Missing physical verification requires HOLD.' }, { title: 'Explain', text: 'Return a decision receipt separating model reasoning from the final policy result.' }],
    ledger: [
      { capability: 'Order and merchant scenario interface', status: 'Observed', evidence: 'Supplied screenshots and the accessible public demo show the scenario controls.', href: 'https://intent-firewall-hackathon.vercel.app' },
      { capability: 'Instinct decisions and constraint policy', status: 'Documented implementation', evidence: 'README documents the direct API path, threshold and deterministic rules; no paid API calls were made during this review.', href: `${github}/intent-firewall-hackathon#architecture` },
      { capability: 'Physical verification and order facts', status: 'Simulated', evidence: 'Scenario facts are caller-supplied and are not authenticated merchant attestations.', href: `${github}/intent-firewall-hackathon#scope` },
      { capability: 'Order execution and notifications', status: 'Not built', evidence: 'The prototype evaluates changes only; it does not modify orders or send notifications.', href: `${github}/intent-firewall-hackathon#scope` }
    ]
  },
  {
    slug: 'handshake', name: 'Handshake', group: 'AI products & agents', date: '2026-10', featured: true, related: [{ slug: 'steward', reason: 'Explicit permission before acting' }], category: 'Relationships & consent', status: 'Product prototype', accent: '#c9b8de',
    hook: 'The conversation ends. The promise stays.',
    summary: 'A relationship agent exploring how to capture open loops, ask for consent, and distinguish an attempted action from a verified outcome.',
    image: '/media/handshake-overview.webp', imageAlt: 'Handshake product preview organizes conversation follow-ups into Needs You, Handshake, Them and Time.', caption: 'Product preview · Demo conversation with Alex at Acme. Provider identifiers have been removed.',
    gallery: [{ src: '/media/handshake-loops.webp', alt: 'Handshake open-loop view showing an unverified meeting outcome and an introduction in the kept section.', caption: 'The interface distinguishes pending actions from claimed completion. Provider identifiers have been removed; screenshots alone do not prove external delivery.' }],
    links: [{ label: 'Open product preview', href: 'https://handshake-six-murex.vercel.app', kind: 'demo' }], stack: ['Web prototype', 'Consent workflow', 'Outcome receipts'],
    problem: '“I’ll send the deck.” “Let me introduce you.” A useful conversation creates obligations that disappear into notes and inboxes. A reminder can tell you to act, but it cannot tell you whether the promise has actually been kept.',
    decision: 'Organize work by who has the next move: you, the agent, the other person, or time. Make permission explicit before an action. Preserve the distinction between sending a request and verifying the intended outcome.',
    approach: 'The supplied interface shows encounter capture, open-loop ownership, action authorization, and evidence-oriented status messages. One screenshot explicitly reports that a meeting outcome was not verified. The public landing page was reachable during review, but no provider writes or private account flows were exercised, and no public source repository was supplied.',
    next: 'Further verification needs a repeatable demonstration of the consent-to-introduction flow and external provider receipts. Calendar completion should remain a partial capability until the resulting event can be verified.',
    flow: [{ title: 'Capture', text: 'Record the promise made in a conversation and the outcome it implies.' }, { title: 'Assign', text: 'Identify who has the next move: you, Handshake, them, or time.' }, { title: 'Authorize', text: 'Ask for permission before acting on a person’s behalf.' }, { title: 'Verify', text: 'Keep an action open until there is evidence that the promised outcome happened.' }],
    ledger: [
      { capability: 'Capture and open-loop ownership UI', status: 'Observed', evidence: 'Supplied product screenshots show encounter input and four ownership columns.', href: 'https://handshake-six-murex.vercel.app' },
      { capability: 'Consent and introduction flow', status: 'Reported demonstration', evidence: 'The supplied creative brief reports a hackathon demonstration. External delivery was not independently re-tested.' },
      { capability: 'Calendar outcome verification', status: 'Partial', evidence: 'Supplied screenshot states that no outcome was verified for the scheduled meeting.' },
      { capability: 'Persistence and provider integration', status: 'Unverified in this review', evidence: 'No public repository was supplied and no authenticated provider actions were performed.' }
    ]
  },
  {
    slug: 'steward', name: 'Steward', group: 'AI products & agents', date: '2026-10', featured: true, category: 'Personal autonomy', status: 'Sandbox prototype', accent: '#86aee0',
    hook: 'When plans break, protect what matters.',
    summary: 'A personal outcome-recovery prototype that compares alternatives, requests human approval, and checks whether the intended result was restored.',
    image: '/media/steward-world.webp', imageAlt: 'Steward synthetic-world interface showing decisions, resources and commitments.', caption: 'Synthetic world · Travel, money and commitments shown here are seeded scenario data.',
    gallery: [{ src: '/media/steward-connections.webp', alt: 'Steward connection center explicitly labels integrations as planned and unavailable.', caption: 'Connection center · A preview of planned capabilities. No public integrations are available through this screen.' }],
    links: [{ label: 'Explore the repository', href: `${github}/steward`, kind: 'repo' }], stack: ['Node.js', 'JavaScript', 'Signed approvals', 'AgentMail adapter'],
    problem: 'A cancelled flight is more than a travel task. It threatens a meeting, a budget, and future plans. Choosing another flight without understanding those constraints can fix the itinerary while damaging the actual outcome.',
    decision: 'Model the outcome first, compare possible futures, and compress the tradeoffs into one human decision. After approval, allow only scoped tools and verify the result through receipts. Keep the agent’s reasoning separate from its authority to act.',
    approach: 'The repository documents an event-driven workflow with persistent runs, signed approval links, an authority policy, and allowlisted sandbox tools. AgentMail provides the configured email path; a local approval path works without it. Airline inventory, bookings, money movement, calendar actions, and counterparty negotiation remain sandboxed.',
    next: 'Production use would require real provider integrations, authenticated access, transactional persistence, and independently verified outcomes. The connection-center screenshot intentionally presents those integrations as planned.',
    flow: [{ title: 'Sense', text: 'Detect a disruption and trace its effects on commitments and resources.' }, { title: 'Compare', text: 'Weigh possible futures against the person’s time, budget and preferences.' }, { title: 'Approve', text: 'Present the tradeoff and require explicit, scoped approval before acting.' }, { title: 'Restore', text: 'Execute allowlisted sandbox actions and verify the intended outcome using receipts.' }],
    ledger: [
      { capability: 'Workflow, signed approvals and event receipts', status: 'Documented implementation', evidence: 'Public README documents the real local workflow and its test commands; not independently executed in this portfolio review.', href: `${github}/steward#what-is-real` },
      { capability: 'AgentMail approval delivery', status: 'Configuration dependent', evidence: 'Requires server credentials and a public origin. A local approval fallback is documented.', href: `${github}/steward#real-phone-approval` },
      { capability: 'Airline booking, money and calendar', status: 'Sandboxed', evidence: 'No real airline purchase, bank transaction or calendar OAuth occurs.', href: `${github}/steward#what-is-real` },
      { capability: 'Connection-center integrations', status: 'Planned', evidence: 'The supplied screenshot says no public integrations are available yet.' }
    ]
  },
  {
    slug: 'notebook-from-the-valley', name: 'Notebook from the Valley', group: 'Media & writing', date: '2026-01', featured: true, category: 'Independent media & writing', status: 'Live publication', accent: '#e6cf9a', kind: 'media',
    hook: 'What sits underneath the announcements.',
    summary: 'An independent technology publication documenting the Silicon Valley ecosystem: AI, infrastructure, companies, startups, conferences, and firsthand experience of living and working in California.',
    image: '/media/notebook-home.webp', imageAlt: 'Notebook from the Valley homepage with the founding article “These are my notes from the Valley.”',
    caption: 'Publication homepage · Unedited capture of notebookfromthevalley.com, October 8, 2026.',
    gallery: [{ src: '/media/notebook-essay.webp', alt: 'The founding essay of Notebook from the Valley, “These are my notes from the Valley.”', caption: 'Founding essay · The publication’s statement of purpose, written by Vincent Leguide.' }],
    links: [{ label: 'Read the publication', href: 'https://notebookfromthevalley.com', kind: 'publication' }, { label: 'Read the founding essay', href: 'https://notebookfromthevalley.com/these-are-my-notes-from-the-valley/' }],
    stack: ['Long-form essays', 'Event coverage', 'Company & people profiles', 'WordPress'],
    problem: 'Technology coverage tends to focus on products, valuations, funding announcements, and personalities. Much of what is shaping the transformation — the infrastructure, the institutions, the conversations after a panel — remains difficult to see from outside Silicon Valley.',
    decision: 'Write from inside the ecosystem, in the first person. Treat conferences, company visits, university talks, and community events as primary sources, and connect them back to the physical constraints behind computing: energy, hardware, and infrastructure.',
    approach: 'Since moving from France to California in 2025, Vincent has published long-form essays that move between company profiles (NVIDIA, Y Combinator, Andreessen Horowitz), people (Fei-Fei Li, Sam Altman), firsthand reporting (Apple Park, Waymo, Garry’s List), and analysis of AI infrastructure, energy, and physical AI. The writing draws on five years in sustainable AI infrastructure.',
    next: 'The notebook continues as an ongoing record of the ecosystem. Readership figures, distribution partners, and editorial credentials are not presented here because they have not been independently verified for this portfolio.',
    flow: [{ title: 'Attend', text: 'Conferences, company events, university talks, startup gatherings and community meetups across the Bay Area and the United States.' }, { title: 'Listen', text: 'The most useful details rarely come from keynote slides. They come from conversations after a panel.' }, { title: 'Connect', text: 'Relate announcements to what sits underneath them: infrastructure, energy, capital, policy and talent.' }, { title: 'Publish', text: 'Long-form, first-person essays that document the ecosystem as it is being built.' }],
    ledger: [
      { capability: 'Independent publication, live', status: 'Observed', evidence: 'notebookfromthevalley.com returned HTTP 200 and was captured on October 8, 2026.', href: 'https://notebookfromthevalley.com' },
      { capability: 'Founded and written by Vincent Leguide', status: 'Observed', evidence: 'The founding essay describes the publication in the first person; the site’s author account belongs to Vincent Leguide.', href: 'https://notebookfromthevalley.com/these-are-my-notes-from-the-valley/' },
      { capability: 'Published archive', status: 'Observed', evidence: '25 articles dated January 3 to June 5, 2026 in the public feed. One additional post containing placeholder text is excluded.' },
      { capability: 'Readership and audience size', status: 'Not disclosed', evidence: 'No subscriber, traffic or readership numbers are claimed in this portfolio.' },
      { capability: 'Awards, press credentials and partnerships', status: 'Not claimed', evidence: 'None are presented here. Articles describe events attended, not formal affiliations.' }
    ],
    copy: { problemTitle: ['The story behind', 'the headlines.'], approachLabel: 'THE EDITORIAL DECISION', approachTitle: ['Report from', 'inside the ecosystem.'], methodTitle: 'Editorial approach', stackLabel: 'FORMAT', workflowTitle: 'From the room to the page.', nextTitle: ['Keep listening.', 'Keep writing.'] }
  }
];
// Test-only scale fixtures. NEXT_PUBLIC_PORTFOLIO_FIXTURES is never set in deployed environments.
const fixtureTarget = Number(process.env.NEXT_PUBLIC_PORTFOLIO_FIXTURES || 0);
const all = fixtureTarget > entries.length ? [...entries, ...fixtureProjects(fixtureTarget - entries.length)] : entries;
/** Display order: as authored. Numbers are derived, never hand-maintained. */
export const projects: NumberedProject[] = all.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }));
// Authored order sets priority. The hero progressively explores the complete catalogue.
export const featuredProjects = projects;
export const orbitProjects = projects;
export const groups = [...new Set(projects.map(p => p.group))];
export const byDate = (order: 'newest' | 'oldest' = 'newest') => [...projects].sort((a, b) => (order === 'newest' ? -1 : 1) * a.date.localeCompare(b.date) || a.number.localeCompare(b.number));
/** Symmetric, de-duplicated relationship edges between existing projects. */
export const relations = (() => { const seen = new Map<string, { a: string; b: string; reason: string }>(); for (const p of projects) for (const r of p.related ?? []) { if (!projects.some(q => q.slug === r.slug)) continue; const key = [p.slug, r.slug].sort().join('|'); if (!seen.has(key)) seen.set(key, { a: p.slug, b: r.slug, reason: r.reason }); } return [...seen.values()]; })();
export const relationsOf = (slug: string) => relations.filter(r => r.a === slug || r.b === slug).map(r => ({ slug: r.a === slug ? r.b : r.a, reason: r.reason }));
export const projectBySlug = (slug: string) => projects.find(project => project.slug === slug);
// Production uses the public project domain; per-deployment URLs sit behind Vercel's deployment protection.
const vercelHost = process.env.VERCEL_ENV === 'production' && process.env.VERCEL_PROJECT_PRODUCTION_URL ? process.env.VERCEL_PROJECT_PRODUCTION_URL : process.env.VERCEL_URL;
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || (vercelHost ? `https://${vercelHost}` : 'http://localhost:3000');
