import type { Metadata } from 'next';
import Link from 'next/link';
import { projects } from '@/lib/projects';
import { ProjectMedia } from '@/components/media';
export const metadata: Metadata = { title: 'Selected work', description: 'Four explorations in accountable autonomy: ORQO, Intent Firewall, Handshake, and Steward.' };
export default function Work() {
  return <div className="work-page section-pad"><div className="page-intro"><p className="eyebrow">THE BUILDER’S UNIVERSE / WORK INDEX</p><h1>Ideas become<br/><em>things you can use.</em></h1><p>Four projects. A shared interest in agents that act with context, respect constraints, and leave evidence behind.</p></div><div className="work-index-meta"><span>SELECTED WORK / 01—04</span><span>2026</span></div>{projects.map(p => <article className="work-entry" key={p.slug} style={{'--project-accent':p.accent} as React.CSSProperties}><div className="work-entry-header"><span className="eyebrow">{p.number} / {p.category}</span><span className="project-status">{p.status}</span></div><Link href={`/work/${p.slug}`} className="work-entry-title"><h2>{p.name}</h2><span aria-hidden="true">↗</span></Link><div className="work-entry-summary"><p>{p.summary}</p><Link className="text-link" href={`/work/${p.slug}`}>Explore case study <span>↗</span></Link></div><ProjectMedia src={p.image} alt={p.imageAlt} caption={p.caption}/></article>)}</div>;
}
