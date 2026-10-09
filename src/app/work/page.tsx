import type { Metadata } from 'next';
import { projects } from '@/lib/projects';
import { WorkIndex } from '@/components/work-index';
export const metadata: Metadata = { alternates: { canonical: '/work' },  title: 'Work', description: `${projects.length} projects by Vincent Leguide: AI products, agent prototypes and independent writing, each with a Verification Ledger.` };
export default function Work() {
  return <div className="work-page section-pad"><div className="page-intro"><p className="eyebrow">WORK INDEX</p><h1>Ideas become<br/><em>things you can use.</em></h1><p>AI products and agents that act with context, respect constraints and leave evidence behind — and the publication that documents the ecosystem they come from.</p></div><WorkIndex/></div>;
}
