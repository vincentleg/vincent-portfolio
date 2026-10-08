export type Project = {
  slug: string; name: string; number: string; category: string; status: string; accent: string;
  hook: string; summary: string; image: string; imageAlt: string; caption: string;
  gallery: { src: string; alt: string; caption: string }[];
  links: { label: string; href: string }[]; stack: string[];
  problem: string; decision: string; approach: string; next: string;
  flow: { title: string; text: string }[];
  ledger: { capability: string; status: string; evidence: string; href?: string }[];
};
const github = 'https://github.com/vincentleg';
export const projects: Project[] = [
  {
    slug: 'orqo', name: 'ORQO', number: '01', category: 'Business intelligence', status: 'In development', accent: '#dba887',
    hook: 'You meet the person. ORQO finds the business.',
    summary: 'A business-development system that researches companies, tests opportunities from both sides, and keeps evidence at the center of the conversation.',
    image: '/media/orqo-agents.webp', imageAlt: 'Authentic ORQO agent catalog showing management agents, specialists and planned capabilities in French.',
    caption: 'Agent catalog · Original product screenshot, cropped to remove account information. Availability labels describe the product UI, not independently verified integrations.',
    gallery: [], links: [{ label: 'Explore the repository', href: `${github}/ORQO` }],
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
    slug: 'intent-firewall', name: 'Intent Firewall', number: '02', category: 'Agent guardrails', status: 'Live demo · prototype', accent: '#b4cda3',
    hook: 'Same change. Different intent.',
    summary: 'A decision layer for agentic commerce: adapt a harmless order change, ask when intent is at risk, or hold when evidence is missing.',
    image: '/media/intent-overview.webp', imageAlt: 'Intent Firewall demo with a client meeting lunch order and merchant fulfillment workflow.', caption: 'Live-demo interface · Order facts are simulated; the project uses live model decisions when its provider is configured.',
    gallery: [{ src: '/media/intent-decision.webp', alt: 'Intent Firewall merchant console evaluates a fifteen-minute delivery delay for a client meeting.', caption: 'The same delay is judged against purpose, hard deadlines, budget and physical verification.' }],
    links: [{ label: 'Open live demo', href: 'https://intent-firewall-hackathon.vercel.app' }, { label: 'Explore the repository', href: `${github}/intent-firewall-hackathon` }],
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
    slug: 'handshake', name: 'Handshake', number: '03', category: 'Relationships & consent', status: 'Product prototype', accent: '#c9b8de',
    hook: 'The conversation ends. The promise stays.',
    summary: 'A relationship agent exploring how to capture open loops, ask for consent, and distinguish an attempted action from a verified outcome.',
    image: '/media/handshake-overview.webp', imageAlt: 'Handshake product preview organizes conversation follow-ups into Needs You, Handshake, Them and Time.', caption: 'Product preview · Demo conversation with Alex at Acme. Provider identifiers have been removed.',
    gallery: [{ src: '/media/handshake-loops.webp', alt: 'Handshake open-loop view showing an unverified meeting outcome and an introduction in the kept section.', caption: 'The interface distinguishes pending actions from claimed completion. Provider identifiers have been removed; screenshots alone do not prove external delivery.' }],
    links: [{ label: 'Open product preview', href: 'https://handshake-six-murex.vercel.app' }], stack: ['Web prototype', 'Consent workflow', 'Outcome receipts'],
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
    slug: 'steward', name: 'Steward', number: '04', category: 'Personal autonomy', status: 'Sandbox prototype', accent: '#9cbcca',
    hook: 'When plans break, protect what matters.',
    summary: 'A personal outcome-recovery prototype that compares alternatives, requests human approval, and checks whether the intended result was restored.',
    image: '/media/steward-world.webp', imageAlt: 'Steward synthetic-world interface showing decisions, resources and commitments.', caption: 'Synthetic world · Travel, money and commitments shown here are seeded scenario data.',
    gallery: [{ src: '/media/steward-connections.webp', alt: 'Steward connection center explicitly labels integrations as planned and unavailable.', caption: 'Connection center · A preview of planned capabilities. No public integrations are available through this screen.' }],
    links: [{ label: 'Explore the repository', href: `${github}/steward` }], stack: ['Node.js', 'JavaScript', 'Signed approvals', 'AgentMail adapter'],
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
  }
];
export const projectBySlug = (slug: string) => projects.find(project => project.slug === slug);
export const siteOrigin = process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000');
