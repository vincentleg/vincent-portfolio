'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import portrait from '../../public/media/vincent-portrait.png';
import { Component, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { orbitProjects } from '@/lib/projects';
import { ProjectVisual } from './project-visual';
const OrbitalScene = dynamic(() => import('./orbital-scene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function StaticGalaxy({ highlighted }: { highlighted: number | null }) {
  return <svg className="static-orbit" viewBox="0 0 800 700" aria-hidden="true"><defs><radialGradient id="galaxy-haze"><stop stopColor="#78b8ff" stopOpacity=".24"/><stop offset=".5" stopColor="#334ebc" stopOpacity=".09"/><stop offset="1" stopColor="#080d21" stopOpacity="0"/></radialGradient><filter id="galaxy-soft"><feGaussianBlur stdDeviation="4"/></filter></defs><ellipse cx="400" cy="350" rx="385" ry="275" fill="url(#galaxy-haze)"/>
    <g transform="translate(400 350) rotate(-22)">{Array.from({ length: 5 }, (_, arm) => <path key={arm} d={Array.from({ length: 130 }, (_, i) => { const r = 20 + i * 2.5, a = i * .028 + arm * Math.PI * .4; return `${i ? 'L' : 'M'}${Math.cos(a) * r},${Math.sin(a) * r * .65}`; }).join(' ')} fill="none" stroke={arm % 2 ? '#677ad3' : '#639adf'} strokeWidth="10" opacity=".15" filter="url(#galaxy-soft)"/>)}</g>
    {Array.from({ length: 180 }, (_, i) => <circle key={i} className={i % 23 === 0 ? "star-twinkle" : undefined} style={{ animationDelay: `${-i * .37}s`, animationDuration: `${5 + i % 9}s` }} cx={((Math.sin(i * 127.1) + 1) / 2) * 790 + 5} cy={((Math.cos(i * 73.7) + 1) / 2) * 690 + 5} r={i % 11 === 0 ? 1.4 : .65} fill={i % 7 ? '#b7d5ff' : '#e9cbaa'} opacity={.2 + (i % 5) * .12}/>)}
    {[0,1,2].map(i => <ellipse key={i} cx="400" cy="350" rx={260 + i * 35} ry={160 + i * 35} fill="none" stroke={highlighted === null ? '#779ce0' : orbitProjects[highlighted].accent} strokeWidth=".7" opacity={i === 2 && highlighted !== null ? .7 : .15}/>)}</svg>;
}
export function Hero() {
  const ref = useRef<HTMLElement>(null); const field = useRef<HTMLDivElement>(null);
  const zoomLayer = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const pan = useRef({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1), [sector, setSector] = useState(0), [mobile, setMobile] = useState(false);
  const [meteor, setMeteor] = useState({ id: 0, left: 20, top: 12 });
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [paused, setPaused] = useState(false), [visible, setVisible] = useState(true), [compact, setCompact] = useState(false), [reduced, setReduced] = useState(false), [highlighted, setHighlighted] = useState<number | null>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)'), small = matchMedia('(max-width: 760px)');
    const sync = () => { setReduced(media.matches); setMobile(small.matches); setCompact(small.matches || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)); }; sync();
    media.addEventListener('change', sync); small.addEventListener('change', sync);
    const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2'); const supported = !!gl; gl?.getExtension('WEBGL_lose_context')?.loseContext();
    const timer = setTimeout(() => setReady(supported), 900);
    let intersecting = true;
    const update = () => setVisible(intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => { intersecting = entry.isIntersecting; update(); }); if (ref.current) observer.observe(ref.current);
    document.addEventListener('visibilitychange', update);
    return () => { clearTimeout(timer); observer.disconnect(); media.removeEventListener('change', sync); small.removeEventListener('change', sync); document.removeEventListener('visibilitychange', update); };
  }, []);
  const live = ready && !failed && !reduced;
  const frozen = paused || reduced || !visible;
  const capacity = mobile ? 5 : 6;
  const pages = Math.ceil(orbitProjects.length / capacity);
  const page = Math.min(sector, pages - 1);
  const visibleProjects = orbitProjects.slice(page * capacity, (page + 1) * capacity);
  useEffect(() => {
    if (frozen) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => { timer = setTimeout(() => { setMeteor(m => ({ id: m.id + 1, left: 12 + Math.random() * 48, top: 7 + Math.random() * 12 })); schedule(); }, 10000 + Math.random() * 10000); };
    schedule(); return () => clearTimeout(timer);
  }, [frozen]);
  useEffect(() => { pan.current = { x: 0, y: 0 }; zoomLayer.current?.style.setProperty('--pan-x', '0px'); zoomLayer.current?.style.setProperty('--pan-y', '0px'); }, [zoom, sector]);
  const moveView = (x: number, y: number) => {
    const bounds = field.current?.getBoundingClientRect();
    const limitX = (bounds?.width || 0) * Math.max(0, zoom - 1) / 2;
    const limitY = (bounds?.height || 0) * Math.max(0, zoom - 1) / 2;
    pan.current = { x: Math.max(-limitX, Math.min(limitX, x)), y: Math.max(-limitY, Math.min(limitY, y)) };
    zoomLayer.current?.style.setProperty('--pan-x', `${pan.current.x}px`);
    zoomLayer.current?.style.setProperty('--pan-y', `${pan.current.y}px`);
  };
  const changeSector = (next: number) => { setSector(next); setHighlighted(null); setZoom(1); };
  return <section className={`hero universe-hero ${frozen ? 'is-paused' : ''}`} ref={ref} aria-labelledby="hero-title">
    <div className="hero-topline"><span className="eyebrow hero-place-top"><i/> A FRENCH PERSPECTIVE. A SILICON VALLEY CHAPTER.</span><span className="coordinates" title="Golden Gate Bridge · San Francisco">37°49′ N · 122°29′ W</span></div>
    <div className="hero-copy"><p className="hero-pretitle">VINCENT LEGUIDE <span/> 26 · FRENCH · SAN FRANCISCO BAY AREA</p><h1 id="hero-title"><span>Vincent Leguide’s</span>Portfolio<em>Galaxy.</em></h1><p className="galaxy-roles">AI Builder · Business Developer · Writer</p><p className="hero-description">I build AI products, connect people and ideas, and write from inside Silicon Valley.</p><p className="hero-context">After five years in sustainable AI infrastructure, I moved to California in August 2025. Today, I represent INFODIP in the US, develop technology partnerships, and build my own experiments in what’s next.</p><a className="universe-cta" href="#work">Explore what I’m building <span aria-hidden="true">↘</span></a></div>
    <div className="galaxy-field" ref={field} onPointerMove={e => { if (reduced || paused || e.pointerType !== 'mouse' || !field.current) return; const r = e.currentTarget.getBoundingClientRect(); field.current.style.setProperty('--px', `${(e.clientX - r.left - r.width / 2) * .018}px`); field.current.style.setProperty('--py', `${(e.clientY - r.top - r.height / 2) * .018}px`); }} onPointerLeave={() => { field.current?.style.setProperty('--px', '0px'); field.current?.style.setProperty('--py', '0px'); }}>
      <div className="galaxy-viewport" tabIndex={zoom > 1 ? 0 : -1} aria-label="Galaxy view. When zoomed, drag or use arrow keys to explore."
        onPointerDown={e => { if (zoom <= 1 || (e.target as HTMLElement).closest('a')) return; drag.current = { x: e.clientX, y: e.clientY, left: pan.current.x, top: pan.current.y }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (drag.current) moveView(drag.current.left + e.clientX - drag.current.x, drag.current.top + e.clientY - drag.current.y); }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
        onKeyDown={e => { if (e.target !== e.currentTarget || zoom <= 1) return; const direction = { ArrowLeft: [30, 0], ArrowRight: [-30, 0], ArrowUp: [0, 30], ArrowDown: [0, -30] }[e.key]; if (direction) { e.preventDefault(); moveView(pan.current.x + direction[0], pan.current.y + direction[1]); } }}>
        <div className="galaxy-zoom" ref={zoomLayer} style={{ transform: `translate(var(--pan-x, 0px), var(--pan-y, 0px)) scale(${zoom})` }}>
      <div className="galaxy-depth"><div className="galaxy-atmosphere" aria-hidden="true"/><div className="galaxy-travel"><StaticGalaxy highlighted={highlighted}/>{live && <div className="galaxy-canvas" aria-hidden="true"><SceneBoundary onFailure={() => setFailed(true)}><OrbitalScene active={!frozen} compact={compact} onFailure={() => setFailed(true)}/></SceneBoundary></div>}</div></div>
      {meteor.id > 0 && <span key={meteor.id} className="shooting-star" aria-hidden="true" style={{ left: `${meteor.left}%`, top: `${meteor.top}%` }}/>}
      <div className="galaxy-core"><div className="portrait-halo"/><a className="portrait-mask" href="https://www.linkedin.com/in/vincent-leguide-640b29194/" target="_blank" rel="noopener noreferrer" aria-label="View Vincent Leguide on LinkedIn (opens in a new tab)"><Image src={portrait} alt="Vincent Leguide" fill priority sizes="(max-width: 760px) 155px, 210px"/><span className="portrait-link-hint" aria-hidden="true">View LinkedIn ↗</span></a><span className="core-name">VINCENT LEGUIDE</span></div>
      <nav style={{ '--orbit-accent': highlighted === null ? '#8ebcff' : orbitProjects[highlighted].accent } as CSSProperties} className="galaxy-projects" aria-label="Explore my projects" onMouseLeave={() => setHighlighted(null)}>{visibleProjects.map((p, i) => <a key={p.slug} href={`#project-${p.slug}`} className="galaxy-project" style={{ '--project-accent': p.accent, '--phase': `${(i * 100 / visibleProjects.length + 6) % 100}%` } as CSSProperties} onPointerDown={() => setHighlighted(page * capacity + i)} onMouseEnter={() => setHighlighted(page * capacity + i)} onFocus={() => setHighlighted(page * capacity + i)} onBlur={() => setHighlighted(null)}><span className="planet" aria-hidden="true"/><span className="planet-label"><small>{p.number} / {p.kind === 'media' ? 'WRITING' : 'BUILDING'}</small>{p.name}</span><span className="planet-preview" aria-hidden="true"><ProjectVisual project={p} sizes="220px"/><span>{p.status} ↗</span></span></a>)}</nav>
      </div></div>
      <div className="galaxy-controls" role="group" aria-label="Galaxy controls"><button aria-label="Zoom out" disabled={zoom <= .85} onClick={() => setZoom(z => Math.max(.85, +(z - .15).toFixed(2)))}>−</button><button aria-label="Reset galaxy zoom" onClick={() => setZoom(1)}>{Math.round(zoom * 100)}%</button><button aria-label="Zoom in" disabled={zoom >= 1.45} onClick={() => setZoom(z => Math.min(1.45, +(z + .15).toFixed(2)))}>+</button>{pages > 1 && <><button aria-label="Previous project group" disabled={page === 0} onClick={() => changeSector(page - 1)}>←</button><span role="status">{page + 1} / {pages}</span><button aria-label="Next project group" disabled={page === pages - 1} onClick={() => changeSector(page + 1)}>→</button></>}</div>
      <p className="galaxy-caption">ONE PERSON. A UNIVERSE OF POSSIBILITIES.</p>
    </div>
    <div className="hero-bottom"><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>{!reduced && <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? '↻ Resume orbit' : 'Ⅱ Pause orbit'}</button>}</div>
  </section>;
}
