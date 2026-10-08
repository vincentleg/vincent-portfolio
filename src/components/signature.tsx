// Conceptual diagrams, one per project, drawn from each project's documented workflow.
// They illustrate the idea; they are not product screenshots and claim no runtime behaviour.
const T = ({ x, y, children, a = 'start' }: { x: number; y: number; children: string; a?: 'start' | 'middle' | 'end' }) => <text x={x} y={y} textAnchor={a}>{children}</text>;

function Orqo() {
  return <svg viewBox="0 0 400 300">
    <g className="sig-grid"><path d="M0 150H400M200 0V300"/></g>
    <circle className="sig-side sig-a" cx="152" cy="150" r="92"/><circle className="sig-side sig-b" cx="248" cy="150" r="92"/>
    <g className="sig-critic"><path d="M200 150 L200 40"/><circle cx="200" cy="40" r="3"/></g>
    <path className="sig-match" d="M200 112 L232 150 L200 188 L168 150Z"/>
    <circle className="sig-core" cx="200" cy="150" r="5"/>
    <g className="sig-dots">{[[110, 110], [95, 175], [135, 210], [290, 105], [305, 180], [262, 215]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r="2.5"/>)}</g>
    <g className="sig-label"><T x={100} y={30}>COMPANY A</T><T x={300} y={30} a="end">COMPANY B</T><T x={200} y={285} a="middle">STRUCTURE THAT SURVIVES THE CRITIC</T></g>
  </svg>;
}

function Intent() {
  return <svg viewBox="0 0 400 300">
    <path className="sig-track" d="M30 150H180"/>
    <rect className="sig-gate" x="180" y="70" width="14" height="160"/>
    <path className="sig-lane l1" d="M194 150 C250 150 250 80 360 80"/><path className="sig-lane l2" d="M194 150H360"/><path className="sig-lane l3" d="M194 150 C250 150 250 220 360 220"/>
    <circle className="sig-packet" cx="30" cy="150" r="7"/>
    <g className="sig-ends"><circle cx="360" cy="80" r="5"/><circle cx="360" cy="150" r="5"/><circle cx="360" cy="220" r="5"/></g>
    <g className="sig-label"><T x={30} y={130}>ORDER CHANGE</T><T x={187} y={58} a="middle">INTENT + POLICY</T><T x={352} y={66} a="end">AUTO-ADAPT</T><T x={352} y={136} a="end">ASK</T><T x={352} y={244} a="end">HOLD</T></g>
  </svg>;
}

function Handshake() {
  const cols = ['YOU', 'HANDSHAKE', 'THEM', 'TIME'];
  return <svg viewBox="0 0 400 300">
    {cols.map((c, i) => <g key={c}><rect className="sig-col" x={22 + i * 92} y="60" width="80" height="170" rx="3"/><g className="sig-label"><T x={62 + i * 92} y={50} a="middle">{c}</T></g></g>)}
    <path className="sig-loop" d="M62 250 C62 290 338 290 338 250"/>
    <circle className="sig-ball" cx="62" cy="145" r="10"/>
    <g className="sig-label"><T x={200} y={22} a="middle">WHO HAS THE NEXT MOVE?</T><T x={200} y={296} a="middle">OPEN UNTIL THE OUTCOME IS VERIFIED</T></g>
  </svg>;
}

function Steward() {
  return <svg viewBox="0 0 400 300">
    <g className="sig-x"><path d="M40 140l20 20M60 140l-20 20"/></g>
    <path className="sig-branch b1" d="M60 150 C120 150 130 70 210 70"/><path className="sig-branch b2" d="M60 150H210"/><path className="sig-branch b3" d="M60 150 C120 150 130 230 210 230"/>
    <path className="sig-chosen" d="M60 150H210 L270 150 H345"/>
    <g className="sig-ends"><circle cx="210" cy="70" r="5"/><circle cx="210" cy="230" r="5"/></g>
    <circle className="sig-approve" cx="270" cy="150" r="14"/><path className="sig-check" d="M263 150l5 5 9-10"/>
    <circle className="sig-core" cx="345" cy="150" r="7"/>
    <g className="sig-label"><T x={50} y={125} a="middle">DISRUPTION</T><T x={210} y={52} a="middle">FUTURE A</T><T x={210} y={135} a="middle">FUTURE B</T><T x={210} y={254} a="middle">FUTURE C</T><T x={270} y={186} a="middle">APPROVE</T><T x={345} y={128} a="middle">RESTORED</T></g>
  </svg>;
}

function Notebook() {
  return <svg viewBox="0 0 400 300">
    <rect className="sig-page" x="90" y="30" width="220" height="240" rx="2"/><path className="sig-margin" d="M120 30V270"/>
    {[0, 1, 2, 3, 4, 5, 6, 7].map(i => <path key={i} className="sig-line" style={{ animationDelay: `${i * .45}s` }} d={`M132 ${76 + i * 24}H${[290, 270, 286, 240, 292, 262, 280, 210][i]}`}/>)}
    <g className="sig-label"><T x={132} y={56}>FIELD NOTES / SILICON VALLEY</T><T x={60} y={100} a="end">ATTEND</T><T x={60} y={150} a="end">LISTEN</T><T x={340} y={130}>CONNECT</T><T x={340} y={210}>PUBLISH</T></g>
    <path className="sig-tick" d="M66 96h16M66 146h16M318 126h16M318 206h16"/>
  </svg>;
}

// Fallback for projects without a bespoke diagram: an orbit around a core, labelled with the project's group.
function Generic({ label }: { label: string }) {
  return <svg viewBox="0 0 400 300">
    <g className="sig-grid"><path d="M0 150H400M200 0V300"/></g>
    <ellipse className="sig-side" cx="200" cy="150" rx="150" ry="62"/><ellipse className="sig-side sig-a" cx="200" cy="150" rx="104" ry="104" opacity=".4"/>
    <g className="sig-critic"><path d="M200 150 L200 46"/><circle cx="200" cy="46" r="4"/></g>
    <circle className="sig-core" cx="200" cy="150" r="9"/>
    <g className="sig-label"><T x={200} y={285} a="middle">{label.toUpperCase()}</T></g>
  </svg>;
}

const map: Record<string, () => React.ReactElement> = { orqo: Orqo, 'intent-firewall': Intent, handshake: Handshake, steward: Steward, 'notebook-from-the-valley': Notebook };

export function Signature({ slug, caption = true, className = '', fallbackLabel = 'Project' }: { slug: string; caption?: boolean; className?: string; fallbackLabel?: string }) {
  const Diagram = map[slug];
  return <figure className={`signature sig-${slug} ${className}`} aria-hidden="true">{Diagram ? <Diagram/> : <Generic label={fallbackLabel}/>}{caption && <figcaption>CONCEPTUAL DIAGRAM · DOCUMENTED WORKFLOW</figcaption>}</figure>;
}
