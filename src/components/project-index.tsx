'use client';
import Link from 'next/link';
import { useState } from 'react';
import type { NumberedProject } from '@/lib/projects';
import { ProjectVisual } from './project-visual';

// Homepage overview: every featured project visible at once, one preview stage, one link per project.
export function ProjectIndex({ items, total }: { items: NumberedProject[]; total: number }) {
  const [active, setActive] = useState(0);
  const current = items[active];
  return <section id="work" className="pindex section-pad" aria-labelledby="pindex-title" style={{ '--project-accent': current.accent } as React.CSSProperties}>
    <div className="pindex-head">
      <h2 id="pindex-title">Selected <em>work.</em></h2>
      <p>AI products, agent prototypes and independent writing — each documented with what is live, prototyped, or planned.</p>
    </div>
    <div className="pindex-layout">
      <ol className="pindex-list">
        {items.map((p, i) => <li key={p.slug} style={{ '--project-accent': p.accent } as React.CSSProperties}>
          <Link href={`#project-${p.slug}`} className={`pindex-row ${i === active ? 'on' : ''}`} onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)}>
            <span className="pindex-num">{p.number}</span>
            <span className="pindex-main"><span className="pindex-name">{p.name}</span><span className="pindex-hook">{p.hook}</span></span>
            <span className="pindex-cat">{p.category}<small>{p.status}</small></span>
            <span className="pindex-thumb" aria-hidden="true"><ProjectVisual project={p} sizes="90vw"/></span>
            <span className="pindex-go" aria-hidden="true">↗</span>
          </Link>
        </li>)}
      </ol>
      <div className="pindex-stage" aria-hidden="true">
        {items.map((p, i) => <div key={p.slug} className={`pindex-slide ${i === active ? 'on' : ''}`} style={{ '--project-accent': p.accent } as React.CSSProperties}>
          <ProjectVisual project={p} priority={i === 0}/>
        </div>)}
        <div className="pindex-caption"><span>{current.number} / {current.category}</span><span>{current.image ? 'AUTHENTIC CAPTURE' : 'CONCEPTUAL DIAGRAM'}</span></div>
      </div>
    </div>
    {total > items.length && <Link className="pindex-all" href="/work">All {total} projects <span aria-hidden="true">→</span></Link>}
  </section>;
}
