'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { groups, projects, relations, relationsOf } from '@/lib/projects';

// Scales to any project count: nodes cluster by group around two rings, edges come only from
// declared relationships, and names are shown for every node only while the map is small.
const LABEL_ALL_LIMIT = 8;

function layout() {
  const ordered = groups.flatMap(g => projects.filter(p => p.group === g));
  const gap = groups.length > 1 ? 0.6 : 0; // empty slots between group clusters
  const slots = ordered.length + gap * groups.length;
  const twoRings = ordered.length > LABEL_ALL_LIMIT;
  let cursor = 0; let lastGroup = ordered[0]?.group;
  return new Map(ordered.map((p, i) => {
    if (p.group !== lastGroup) { cursor += gap; lastGroup = p.group; }
    const angle = -Math.PI / 2 + (cursor / slots) * Math.PI * 2; cursor += 1;
    const r = twoRings ? (i % 2 ? 29 : 41) : 36;
    return [p.slug, { x: 50 + Math.cos(angle) * r, y: 50 + Math.sin(angle) * r, angle }];
  }));
}

export function Constellation() {
  const pos = useMemo(layout, []);
  const [active, setActive] = useState(projects[0].slug);
  const [filter, setFilter] = useState<string>('all');
  const labelAll = projects.length <= LABEL_ALL_LIMIT;
  const current = projects.find(p => p.slug === active)!;
  const links = relationsOf(active);
  const linked = new Set([active, ...links.map(l => l.slug)]);
  const visible = (g: string) => filter === 'all' || filter === g;
  const curve = (a: { x: number; y: number }, b: { x: number; y: number }) => { const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2; return `M${a.x} ${a.y} Q${50 + (mx - 50) * .35} ${50 + (my - 50) * .35} ${b.x} ${b.y}`; };

  return <section className="constellation section-pad" aria-labelledby="constellation-title">
    <div className="constellation-layout">
      <div className="constellation-copy">
        <h2 id="constellation-title">How the work<br/><em>connects.</em></h2>
        <p>Lines show real relationships between projects. Select a project to trace its connections.</p>
        {groups.length > 1 && <div className="chips" role="group" aria-label="Filter by category">
          {['all', ...groups].map(g => <button key={g} type="button" aria-pressed={filter === g} onClick={() => setFilter(g)}>{g === 'all' ? 'All' : g}<span>{g === 'all' ? projects.length : projects.filter(p => p.group === g).length}</span></button>)}
        </div>}
        <div className="constellation-detail" aria-live="polite">
          <span className="eyebrow" style={{ color: current.accent }}>{current.number} / {current.category}</span>
          <h3><Link href={`/work/${current.slug}`}>{current.name} <span aria-hidden="true">↗</span></Link></h3>
          <p>{current.hook}</p>
          {links.length > 0 && <ul className="relations">{links.map(l => { const q = projects.find(p => p.slug === l.slug)!; return <li key={l.slug}><button type="button" onClick={() => setActive(q.slug)}>{q.name}</button><span>{l.reason}</span></li>; })}</ul>}
        </div>
      </div>
      <div className={`star-map ${labelAll ? '' : 'dense'}`}>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="41"/><circle cx="50" cy="50" r="29"/><circle cx="50" cy="50" r="48"/>
          {relations.map(r => { const a = pos.get(r.a)!, b = pos.get(r.b)!; const on = r.a === active || r.b === active; const shown = visible(projects.find(p => p.slug === r.a)!.group) && visible(projects.find(p => p.slug === r.b)!.group); return <path key={r.a + r.b} className={`edge ${on ? 'on' : ''} ${shown ? '' : 'off'}`} d={curve(a, b)}/>; })}
        </svg>
        <div className="map-core" aria-hidden="true">VL</div>
        {projects.map(p => { const at = pos.get(p.slug)!; const shown = visible(p.group); const side = Math.cos(at.angle) < -0.2 ? 'left' : Math.cos(at.angle) > 0.2 ? 'right' : Math.sin(at.angle) < 0 ? 'top' : 'bottom';
          return <Link href={`/work/${p.slug}`} key={p.slug} tabIndex={shown ? 0 : -1} aria-hidden={shown ? undefined : true} aria-label={`${p.name}, ${p.category}`}
            className={`star-node ${p.kind === 'media' ? 'star-media' : ''} ${p.slug === active ? 'active' : ''} ${linked.has(p.slug) ? 'linked' : ''} ${shown ? '' : 'off'} side-${side}`}
            style={{ left: `${at.x}%`, top: `${at.y}%`, '--node-accent': p.accent } as React.CSSProperties}
            onMouseEnter={() => setActive(p.slug)} onFocus={() => setActive(p.slug)}>
            <span className="star-dot">{!labelAll && <i>{p.number}</i>}</span>
            {(labelAll || p.slug === active) && <span className="node-name">{p.name}</span>}
          </Link>; })}
      </div>
      <ol className="constellation-list" aria-label="Projects by category">
        {groups.filter(visible).map(g => <li key={g}><span className="eyebrow">{g}</span><ul>{projects.filter(p => p.group === g).map(p => <li key={p.slug} style={{ '--node-accent': p.accent } as React.CSSProperties}><Link href={`/work/${p.slug}`}><i/>{p.name}{relationsOf(p.slug).length > 0 && <small>{relationsOf(p.slug).length} connection{relationsOf(p.slug).length > 1 ? 's' : ''}</small>}</Link></li>)}</ul></li>)}
      </ol>
    </div>
  </section>;
}
