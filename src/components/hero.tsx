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
    {Array.from({ length: 180 }, (_, i) => <circle key={i} className={i % 23 === 0 ? "star-twinkle" : undefined} style={{ animationDelay: `${-i * .37}s` }} cx={((Math.sin(i * 127.1) + 1) / 2) * 790 + 5} cy={((Math.cos(i * 73.7) + 1) / 2) * 690 + 5} r={i % 11 === 0 ? 1.4 : .65} fill={i % 7 ? '#b7d5ff' : '#e9cbaa'} opacity={.2 + (i % 5) * .12}/>)}
    {[0,1,2].map(i => <ellipse key={i} cx="400" cy="350" rx={260 + i * 35} ry={160 + i * 35} fill="none" stroke={highlighted === null ? '#779ce0' : orbitProjects[highlighted].accent} strokeWidth=".7" opacity={i === 2 && highlighted !== null ? .7 : .15}/>)}</svg>;
}
export function Hero() {
  const ref = useRef<HTMLElement>(null); const field = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false), [failed, setFailed] = useState(false), [paused, setPaused] = useState(false), [visible, setVisible] = useState(true), [compact, setCompact] = useState(false), [reduced, setReduced] = useState(false), [highlighted, setHighlighted] = useState<number | null>(null);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)'), small = matchMedia('(max-width: 760px)');
    const sync = () => { setReduced(media.matches); setCompact(small.matches || (navigator.hardwareConcurrency > 0 && navigator.hardwareConcurrency <= 4)); }; sync();
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
  return <section className={`hero universe-hero ${frozen ? 'is-paused' : ''}`} ref={ref} aria-labelledby="hero-title">
    <div className="hero-topline"><span className="eyebrow hero-place-top"><i/> A FRENCH PERSPECTIVE. A SILICON VALLEY CHAPTER.</span><span className="coordinates">37°46′ N · 122°25′ W</span></div>
    <div className="hero-copy"><p className="hero-pretitle">VINCENT LEGUIDE <span/> 26 · FRENCH · BAY AREA</p><h1 id="hero-title">Building<br/>what comes<br/><em>next.</em></h1><p className="hero-description">I build AI products, connect people and ideas, and write from inside Silicon Valley.</p><p className="hero-context">After five years in sustainable AI infrastructure, I moved to California in August 2025. Today, I represent INFODIP in the US, develop technology partnerships, and build my own experiments in what’s next.</p><a className="universe-cta" href="#work">Explore what I’m building <span aria-hidden="true">↘</span></a></div>
    <div className="galaxy-field" ref={field} onPointerMove={e => { if (reduced || paused || e.pointerType !== 'mouse' || !field.current) return; const r = e.currentTarget.getBoundingClientRect(); field.current.style.setProperty('--px', `${(e.clientX - r.left - r.width / 2) * .018}px`); field.current.style.setProperty('--py', `${(e.clientY - r.top - r.height / 2) * .018}px`); }} onPointerLeave={() => { field.current?.style.setProperty('--px', '0px'); field.current?.style.setProperty('--py', '0px'); }}>
      <div className="galaxy-depth"><div className="galaxy-atmosphere" aria-hidden="true"/><div className="galaxy-travel"><StaticGalaxy highlighted={highlighted}/>{live && <div className="galaxy-canvas" aria-hidden="true"><SceneBoundary onFailure={() => setFailed(true)}><OrbitalScene active={!frozen} compact={compact} onFailure={() => setFailed(true)}/></SceneBoundary></div>}</div></div>
      <div className="galaxy-core"><div className="portrait-halo"/><div className="portrait-mask"><Image src={portrait} alt="Vincent Leguide" fill priority sizes="(max-width: 760px) 155px, 210px"/></div><span className="core-name">VINCENT LEGUIDE</span></div>
      <nav style={{ '--orbit-accent': highlighted === null ? '#8ebcff' : orbitProjects[highlighted].accent } as CSSProperties} className="galaxy-projects" aria-label="Explore my projects" onMouseLeave={() => setHighlighted(null)}>{orbitProjects.map((p, i) => <a key={p.slug} href={`#project-${p.slug}`} className="galaxy-project" style={{ '--project-accent': p.accent, '--phase': `${(i * 100 / orbitProjects.length + 6) % 100}%` } as CSSProperties} onPointerDown={() => setHighlighted(i)} onMouseEnter={() => setHighlighted(i)} onFocus={() => setHighlighted(i)} onBlur={() => setHighlighted(null)}><span className="planet" aria-hidden="true"/><span className="planet-label"><small>{p.number} / {p.kind === 'media' ? 'WRITING' : 'BUILDING'}</small>{p.name}</span><span className="planet-preview" aria-hidden="true"><ProjectVisual project={p} sizes="220px"/><span>{p.status} ↗</span></span></a>)}</nav>
      <p className="galaxy-caption">ONE PERSON. A UNIVERSE OF POSSIBILITIES.</p>
    </div>
    <div className="hero-bottom"><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>{!reduced && <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? '↻ Resume orbit' : 'Ⅱ Pause orbit'}</button>}</div>
  </section>;
}
