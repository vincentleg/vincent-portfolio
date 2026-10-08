'use client';
import Link from 'next/link';
import { useState } from 'react';
import { byDate, groups, projects } from '@/lib/projects';
import { ProjectVisual } from './project-visual';

// Full catalogue: filter by category, order chronologically. Scales to any number of projects.
export function WorkIndex() {
  const [filter, setFilter] = useState('all');
  const [order, setOrder] = useState<'curated' | 'newest' | 'oldest'>('curated');
  const list = (order === 'curated' ? projects : byDate(order)).filter(p => filter === 'all' || p.group === filter);
  return <>
    <div className="work-tools">
      <div className="chips" role="group" aria-label="Filter by category">
        {['all', ...groups].map(g => <button key={g} type="button" aria-pressed={filter === g} onClick={() => setFilter(g)}>{g === 'all' ? 'All' : g}<span>{g === 'all' ? projects.length : projects.filter(p => p.group === g).length}</span></button>)}
      </div>
      <label className="work-order">Order<select value={order} onChange={e => setOrder(e.target.value as typeof order)}><option value="curated">Curated</option><option value="newest">Newest first</option><option value="oldest">Oldest first</option></select></label>
    </div>
    <p className="sr-only" aria-live="polite">{list.length} projects shown</p>
    <ol className="work-grid">
      {list.map(p => <li key={p.slug} style={{ '--project-accent': p.accent } as React.CSSProperties}>
        <Link href={`/work/${p.slug}`} className="work-tile">
          <span className="work-tile-visual"><ProjectVisual project={p} sizes="(max-width: 700px) 90vw, (max-width: 1100px) 45vw, 30vw"/></span>
          <span className="work-tile-meta"><span>{p.number} / {p.category}</span><span>{p.date.slice(0, 4)}</span></span>
          <span className="work-tile-name">{p.name}<i aria-hidden="true">↗</i></span>
          <span className="work-tile-hook">{p.hook}</span>
          <span className="project-status">{p.status}</span>
        </Link>
      </li>)}
    </ol>
  </>;
}
