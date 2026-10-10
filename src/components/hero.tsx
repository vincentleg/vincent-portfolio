'use client';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import portrait from '../../public/media/vincent-portrait.png';
import { Component, useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { orbitProjects } from '@/lib/projects';
import { futurePlanetSlots, outerOrbits, projectOrbit } from '@/lib/galaxy-layout';
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
  const [zoom, setZoom] = useState(1);
  const viewport = useRef<HTMLDivElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const projectLinks = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchInput = useRef(false);
  const [touchPreview, setTouchPreview] = useState<number | null>(null);
  const [previewPosition, setPreviewPosition] = useState({ x: 0, y: 0, width: 220 });
  const remainingSlots = futurePlanetSlots.slice(Math.max(0, orbitProjects.length - 6));
  const [meteor, setMeteor] = useState({ id: 0, left: 20, top: 12 });
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
  const keepPreview = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const closePreview = () => { keepPreview(); setHighlighted(null); setTouchPreview(null); };
  const scheduleClose = () => { keepPreview(); closeTimer.current = setTimeout(() => { setHighlighted(null); setTouchPreview(null); }, 160); };
  const showPreview = (index: number) => { keepPreview(); setHighlighted(index); };
  useEffect(() => () => { if (closeTimer.current) clearTimeout(closeTimer.current); }, []);
  useEffect(() => {
    if (highlighted === null) return;
    let frame = 0;
    const positionPreview = () => {
      const node = projectLinks.current[highlighted]?.getBoundingClientRect();
      const area = viewport.current?.getBoundingClientRect();
      const parent = field.current?.getBoundingClientRect();
      if (node && area && parent) {
        const left = Math.max(area.left + 8, 8), right = Math.min(area.right - 8, innerWidth - 8);
        const width = Math.min(220, right - left);
        const height = preview.current?.offsetHeight || 200;
        const top = Math.max(area.top + 8, 88), bottom = Math.min(area.bottom - 8, innerHeight - 8);
        const x = Math.max(left, Math.min(right - width, node.left + node.width / 2 - width / 2));
        const above = node.top - height - 12;
        const y = Math.max(top, Math.min(bottom - height, above >= top ? above : node.bottom + 12));
        setPreviewPosition(old => old.x === x - parent.left && old.y === y - parent.top && old.width === width ? old : { x: x - parent.left, y: y - parent.top, width });
      }
      frame = requestAnimationFrame(positionPreview);
    };
    positionPreview();
    const dismiss = (event: PointerEvent) => { if (!field.current?.contains(event.target as Node)) { setHighlighted(null); setTouchPreview(null); } };
    const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setHighlighted(null); setTouchPreview(null); } };
    document.addEventListener('pointerdown', dismiss);
    document.addEventListener('keydown', escape);
    return () => { cancelAnimationFrame(frame); document.removeEventListener('pointerdown', dismiss); document.removeEventListener('keydown', escape); };
  }, [highlighted]);
  useEffect(() => {
    if (frozen) return;
    let timer: ReturnType<typeof setTimeout>;
    const schedule = () => { timer = setTimeout(() => { setMeteor(m => ({ id: m.id + 1, left: 12 + Math.random() * 48, top: 7 + Math.random() * 12 })); schedule(); }, 10000 + Math.random() * 10000); };
    schedule(); return () => clearTimeout(timer);
  }, [frozen]);
  useEffect(() => { pan.current = { x: 0, y: 0 }; zoomLayer.current?.style.setProperty('--pan-x', '0px'); zoomLayer.current?.style.setProperty('--pan-y', '0px'); }, [zoom]);
  const moveView = (x: number, y: number) => {
    const bounds = field.current?.getBoundingClientRect();
    const limitX = (bounds?.width || 0) * Math.max(0, zoom - 1) / 2;
    const limitY = (bounds?.height || 0) * Math.max(0, zoom - 1) / 2;
    pan.current = { x: Math.max(-limitX, Math.min(limitX, x)), y: Math.max(-limitY, Math.min(limitY, y)) };
    zoomLayer.current?.style.setProperty('--pan-x', `${pan.current.x}px`);
    zoomLayer.current?.style.setProperty('--pan-y', `${pan.current.y}px`);
  };
  const changeZoom = (value: number) => { closePreview(); setZoom(value); };
  return <section className={`hero universe-hero ${frozen ? 'is-paused' : ''}`} ref={ref} aria-labelledby="hero-title">
    <div className="hero-topline"><span className="eyebrow hero-place-top"><i/> A FRENCH PERSPECTIVE. A SILICON VALLEY CHAPTER.</span><span className="coordinates" title="Golden Gate Bridge · San Francisco">37°49′ N · 122°29′ W</span></div>
    <div className="hero-copy"><p className="hero-pretitle">VINCENT LEGUIDE <span/> 26 · FRENCH · SAN FRANCISCO BAY AREA</p><h1 id="hero-title"><span>Vincent Leguide’s</span>Portfolio<em>Galaxy.</em></h1><p className="galaxy-roles">AI Builder · Business Developer · Writer</p><p className="hero-description">I build AI products, connect people and ideas, and write from inside Silicon Valley.</p><p className="hero-context">After five years in sustainable AI infrastructure, I moved to California in August 2025. Today, I represent INFODIP in the US, develop technology partnerships, and build my own experiments in what’s next.</p><a className="universe-cta" href="#work">Explore what I’m building <span aria-hidden="true">↘</span></a></div>
    <div className="galaxy-field" ref={field} onKeyDown={e => { if (e.key === 'Escape') closePreview(); }} onPointerMove={e => { if (reduced || paused || e.pointerType !== 'mouse' || !field.current) return; const r = e.currentTarget.getBoundingClientRect(); field.current.style.setProperty('--px', `${(e.clientX - r.left - r.width / 2) * .018}px`); field.current.style.setProperty('--py', `${(e.clientY - r.top - r.height / 2) * .018}px`); }} onPointerLeave={() => { field.current?.style.setProperty('--px', '0px'); field.current?.style.setProperty('--py', '0px'); }}>
      <div className="galaxy-viewport" ref={viewport} tabIndex={zoom > 1 ? 0 : -1} aria-label="Galaxy view. When zoomed, drag or use arrow keys to explore."
        onPointerDown={e => { if ((e.target as HTMLElement).closest('a, button')) return; closePreview(); if (zoom <= 1) return; drag.current = { x: e.clientX, y: e.clientY, left: pan.current.x, top: pan.current.y }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { if (drag.current) moveView(drag.current.left + e.clientX - drag.current.x, drag.current.top + e.clientY - drag.current.y); }}
        onPointerUp={() => { drag.current = null; }} onPointerCancel={() => { drag.current = null; }}
        onKeyDown={e => { if (e.target !== e.currentTarget || zoom <= 1) return; const direction = { ArrowLeft: [30, 0], ArrowRight: [-30, 0], ArrowUp: [0, 30], ArrowDown: [0, -30] }[e.key]; if (direction) { e.preventDefault(); moveView(pan.current.x + direction[0], pan.current.y + direction[1]); } }}>
        <div className="galaxy-zoom" ref={zoomLayer} data-overview={zoom < .6} style={{ '--node-scale': Math.min(1.2, 1 / zoom), '--future-scale': 1 / zoom, transform: `translate(var(--pan-x, 0px), var(--pan-y, 0px)) scale(${zoom})` } as CSSProperties}>
      <div className="galaxy-depth"><div className="galaxy-atmosphere" aria-hidden="true"/><div className="galaxy-travel"><StaticGalaxy highlighted={highlighted}/>{live && <div className="galaxy-canvas" aria-hidden="true"><SceneBoundary onFailure={() => setFailed(true)}><OrbitalScene active={!frozen} compact={compact} onFailure={() => setFailed(true)}/></SceneBoundary></div>}</div></div>
      {meteor.id > 0 && <span key={meteor.id} className="shooting-star" aria-hidden="true" style={{ left: `${meteor.left}%`, top: `${meteor.top}%` }}/>}
      <div className="galaxy-core"><div className="portrait-halo"/><a onMouseEnter={closePreview} onFocus={closePreview} className="portrait-mask" href="https://www.linkedin.com/in/vincent-leguide-640b29194/" target="_blank" rel="noopener noreferrer" aria-label="View Vincent Leguide on LinkedIn (opens in a new tab)"><Image src={portrait} alt="Vincent Leguide" fill priority sizes="(max-width: 760px) 155px, 210px"/><span className="portrait-link-hint" aria-hidden="true">View LinkedIn ↗</span></a><span className="core-name">VINCENT LEGUIDE</span></div>
      <div className="future-orbits" aria-hidden="true">{outerOrbits.map((ring, index) => <span key={index} style={{ width: `${ring.x * 2}%`, height: `${ring.y * 2}%`, opacity: .22 - index * .025 }}/>)}</div>
      <div className={`future-planets ${frozen ? 'orbits-frozen' : ''}`} role="group" aria-label="Unexplored planetary orbits">{remainingSlots.map(slot => <button key={slot.id} type="button" className="future-planet" aria-label="Future project — unexplored" title="Future project — unexplored" style={{ '--project-accent': slot.color, '--phase': `${slot.phase}%`, '--orbit-x': `${slot.x}%`, '--orbit-y': `${slot.y}%`, '--orbit-duration': `${slot.seconds}s`, '--planet-size': `${slot.size}px` } as CSSProperties}><span className="planet" aria-hidden="true"/><span className="future-hint">Unexplored</span></button>)}</div>
      <nav style={{ '--orbit-accent': highlighted === null ? '#8ebcff' : orbitProjects[highlighted].accent } as CSSProperties} className={`galaxy-projects ${highlighted !== null || frozen ? 'orbits-frozen' : ''}`} aria-label="Explore my projects">{orbitProjects.map((p, i) => {
        const slot = projectOrbit(i);
        return <a key={p.slug} ref={element => { projectLinks.current[i] = element; }} href={`#project-${p.slug}`} className="galaxy-project" aria-label={p.name} aria-describedby={highlighted === i ? 'galaxy-project-preview' : undefined} style={{ '--project-accent': p.accent, '--phase': `${slot.phase}%`, ...('x' in slot ? { '--orbit-x': `${slot.x}%`, '--orbit-y': `${slot.y}%` } : {}), '--orbit-duration': `${slot.seconds}s` } as CSSProperties}
          onPointerDown={e => { touchInput.current = e.pointerType !== 'mouse'; }}
          onClick={e => { if (e.detail > 0 && touchInput.current && touchPreview !== i) { e.preventDefault(); setTouchPreview(i); showPreview(i); } else closePreview(); }}
          onMouseEnter={() => { if (!touchInput.current) showPreview(i); }} onMouseLeave={() => { if (!touchInput.current) scheduleClose(); }}
          onFocus={() => showPreview(i)} onBlur={e => { if (!preview.current?.contains(e.relatedTarget as Node)) scheduleClose(); }}>
          <span className="planet" aria-hidden="true"/><span className="planet-label"><small>{p.number} / {p.kind === 'media' ? 'WRITING' : 'BUILDING'}</small>{p.name}</span>
        </a>;
      })}</nav>
      </div></div>
      {highlighted !== null && <div ref={preview} id="galaxy-project-preview" className="planet-preview galaxy-preview" style={{ left: previewPosition.x, top: previewPosition.y, width: previewPosition.width, '--project-accent': orbitProjects[highlighted].accent } as CSSProperties} onMouseEnter={keepPreview} onMouseLeave={() => { if (!touchInput.current) scheduleClose(); }} onFocus={keepPreview} onBlur={e => { if (!e.currentTarget.contains(e.relatedTarget as Node)) scheduleClose(); }}>
        <ProjectVisual project={orbitProjects[highlighted]} sizes="220px"/>
        <span>{orbitProjects[highlighted].name} · {orbitProjects[highlighted].status}</span>
        <div className="preview-actions"><a href={`#project-${orbitProjects[highlighted].slug}`} onClick={closePreview}>View project ↗</a><button type="button" aria-label="Close project preview" onClick={closePreview}>×</button></div>
      </div>}
      <div className="galaxy-controls" role="group" aria-label="Galaxy controls"><span aria-hidden="true">−</span><input type="range" min="25" max="150" step="1" value={Math.round(zoom * 100)} aria-label="Galaxy zoom" aria-valuetext={`${Math.round(zoom * 100)} percent`} onChange={e => changeZoom(Number(e.target.value) / 100)}/><span aria-hidden="true">+</span><output>{Math.round(zoom * 100)}%</output><button type="button" aria-label="Reset galaxy zoom to 100 percent" onClick={() => changeZoom(1)}>↺</button></div>
      <p className="galaxy-caption">ONE PERSON. A UNIVERSE OF POSSIBILITIES.</p>
    </div>
    <div className="hero-bottom"><span>SCROLL TO EXPLORE <span aria-hidden="true">↓</span></span>{!reduced && <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? '↻ Resume orbit' : 'Ⅱ Pause orbit'}</button>}</div>
  </section>;
}
