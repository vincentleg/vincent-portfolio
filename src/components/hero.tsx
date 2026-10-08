'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Component, useEffect, useRef, useState, type ReactNode } from 'react';
const OrbitalScene = dynamic(() => import('./orbital-scene'), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onFailure: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onFailure(); }
  render() { return this.state.failed ? null : this.props.children; }
}
function StaticOrbit() { return <svg className="static-orbit" viewBox="0 0 700 600" aria-hidden="true"><defs><radialGradient id="core"><stop stopColor="#c79776"/><stop offset=".4" stopColor="#665043"/><stop offset="1" stopColor="#191a1b"/></radialGradient></defs><g fill="none" stroke="#a78970" strokeWidth=".8" transform="translate(350 300) rotate(-25)">{[100,155,220,270].map(r => <ellipse key={r} rx={r} ry={r * .42}/>)}<ellipse rx="230" ry="85" transform="rotate(65)"/><circle r="49" fill="url(#core)"/><circle cx="203" cy="-39" r="7" fill="#dba887"/><circle cx="-125" cy="38" r="5" fill="#b4cda3"/><circle cx="20" cy="113" r="5" fill="#c9b8de"/><circle cx="-238" cy="-60" r="4" fill="#9cbcca"/><rect x="150" y="96" width="9" height="9" fill="#e6cf9a" transform="rotate(45 154 100)"/></g></svg>; }
export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false); const [failed, setFailed] = useState(false); const [paused, setPaused] = useState(false); const [visible, setVisible] = useState(true); const [compact, setCompact] = useState(false); const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)'); const small = window.matchMedia('(max-width: 760px)');
    const sync = () => { setReduced(media.matches); setCompact(small.matches); };
    sync(); media.addEventListener('change', sync); small.addEventListener('change', sync);
    const canvas = document.createElement('canvas'); const gl = canvas.getContext('webgl2'); if (gl) { setReady(true); gl.getExtension('WEBGL_lose_context')?.loseContext(); }
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting && !document.hidden)); if (ref.current) observer.observe(ref.current);
    const visibility = () => setVisible(!document.hidden && (ref.current?.getBoundingClientRect().bottom ?? 0) > 0); document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.removeEventListener('change', sync); small.removeEventListener('change', sync); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const live = ready && !failed && !reduced;
  return <section className="hero" ref={ref} aria-labelledby="hero-title"><div className="hero-topline"><span className="eyebrow">INDEPENDENT BUILDER / SILICON VALLEY</span><span className="coordinates">37°46′ N &nbsp; 122°25′ W</span></div><div className="hero-art" role="img" aria-label="An orbital system connecting four builds and an independent publication around a shared core of accountable autonomy.">{!live && <StaticOrbit/>}{live && <SceneBoundary onFailure={() => setFailed(true)}><OrbitalScene active={!paused && visible} compact={compact} onFailure={() => setFailed(true)}/></SceneBoundary>}<div className="orbit-label label-top"><i/> INTELLIGENCE, CONNECTED</div><div className="orbit-label label-bottom"><span>FIG. 01</span> THE BUILDER’S UNIVERSE</div><div className="orbit-cross cross-one">+</div><div className="orbit-cross cross-two">+</div></div><div className="hero-copy"><p className="hero-pretitle"><span/> VINCENT LEGUIDE</p><h1 id="hero-title">Building<br/>what comes<br/><em>next.</em></h1><p className="hero-description">From sustainable AI infrastructure to autonomous agents. Building technology products, and writing about Silicon Valley from the inside.</p><Link className="button button-light" href="#orqo">Explore my universe <span aria-hidden="true">↘</span></Link></div><div className="hero-bottom"><a href="#orqo" className="scroll-cue"><span aria-hidden="true">↓</span> SCROLL TO EXPLORE</a><span className="hero-place"><i/> SAN FRANCISCO BAY AREA</span>{live ? <button className="motion-toggle" onClick={() => setPaused(v => !v)} aria-pressed={paused}>{paused ? '↻ Resume orbit' : 'Ⅱ Pause orbit'}</button> : <span className="motion-toggle">Static orbital view</span>}</div></section>;
}
