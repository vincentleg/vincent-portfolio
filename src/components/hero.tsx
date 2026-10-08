'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
import { featuredProjects } from '@/lib/projects';
const bodies = featuredProjects.map(p => ({ color: p.accent, page: p.kind === 'media' }));
const OrbitalScene = dynamic(() => import('./orbital-scene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function StaticOrbit() { return <svg className="static-orbit" viewBox="0 0 700 600" aria-hidden="true"><defs><radialGradient id="core"><stop stopColor="#c79776"/><stop offset=".4" stopColor="#665043"/><stop offset="1" stopColor="#191a1b"/></radialGradient></defs><g fill="none" stroke="#a78970" strokeWidth=".8" transform="translate(350 300) rotate(-25)">{[100,155,220,270].map(r => <ellipse key={r} rx={r} ry={r * .42}/>)}<ellipse rx="230" ry="85" transform="rotate(65)"/><circle r="49" fill="url(#core)"/>{bodies.map((b, i) => { const a = i * 2.4 + .5, r = [100, 155, 220, 270][i % 4]; const x = Math.cos(a) * r, y = Math.sin(a) * r * .42; return b.page ? <rect key={i} x={x - 4} y={y - 4} width="9" height="9" fill={b.color} transform={`rotate(45 ${x} ${y})`}/> : <circle key={i} cx={x} cy={y} r={i ? 5 : 7} fill={b.color}/>; })}</g></svg>; }
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false); const [failed, setFailed] = useState(false); const [paused, setPaused] = useState(false); const [visible, setVisible] = useState(true); const [compact, setCompact] = useState(false); const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const small = window.matchMedia('(max-width: 760px)');
    const sync = () => { setReduced(media.matches); setCompact(small.matches); };
    sync(); media.addEventListener('change', sync); small.addEventListener('change', sync);
    // Mount WebGL only once the page is idle: the static orbit paints first, so 3D never delays first render.
    const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2'); const supported = !!gl; gl?.getExtension('WEBGL_lose_context')?.loseContext();
    const idle = (cb: () => void) => typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(cb, { timeout: 2500 }) : setTimeout(cb, 1200);
    let started = false; const start = () => { if (!started && supported) { started = true; idle(() => setReady(true)); } };
    if (document.readyState === 'complete') start(); else window.addEventListener('load', start, { once: true });
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden)); if (ref.current) observer.observe(ref.current);
    const visibility = () => setVisible(!document.hidden && (ref.current?.getBoundingClientRect().bottom ?? 0) > 0); document.addEventListener('visibilitychange', visibility);
    return () => { window.removeEventListener('load', start); observer.disconnect(); media.removeEventListener('change', sync); small.removeEventListener('change', sync); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const live = ready && !failed && !reduced;
  return <section className="hero" ref={ref} aria-labelledby="hero-title"><div className="hero-topline"><span className="eyebrow hero-place-top"><i/> SAN FRANCISCO BAY AREA · SILICON VALLEY</span><span className="coordinates">37°46′ N &nbsp; 122°25′ W</span></div><div className="hero-art" role="img" aria-label="An orbital system: each body is one of Vincent Leguide’s projects.">{!live && <StaticOrbit/>}{live && <SceneBoundary onFailure={() => setFailed(true)}><OrbitalScene active={!paused && visible} compact={compact} bodies={bodies} onFailure={() => setFailed(true)}/></SceneBoundary>}<div className="orbit-label label-top"><i/> INTELLIGENCE, CONNECTED</div><div className="orbit-label label-bottom"><span>FIG. 01</span> THE BUILDER’S UNIVERSE</div><div className="orbit-cross cross-one">+</div><div className="orbit-cross cross-two">+</div></div><div className="hero-copy"><p className="hero-pretitle"><span/> VINCENT LEGUIDE</p><p className="hero-roles">AI Builder <i>·</i> Business Developer <i>·</i> Writer</p><h1 id="hero-title">Building<br/>what comes<br/><em>next.</em></h1><p className="hero-description">Based in Silicon Valley. Building AI products, developing technology partnerships, and documenting the ecosystem in <em>Notebook from the Valley</em> — grounded in five years of sustainable AI infrastructure.</p><Link className="button button-light" href="#work">Explore the work <span aria-hidden="true">↘</span></Link></div><div className="hero-bottom"><span/>{live ? <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? '↻ Resume orbit' : 'Ⅱ Pause orbit'}</button> : <span className="motion-toggle">Static orbital view</span>}</div></section>;
}
