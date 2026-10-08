'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

export function Mark() { return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(-35 20 20)"/><ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(35 20 20)"/><circle cx="20" cy="20" r="3" fill="currentColor" stroke="none"/></svg>; }
export function Header() {
  const pathname = usePathname(); const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => { frame = 0; const el = ref.current; if (!el) return; const max = document.documentElement.scrollHeight - innerHeight; el.style.setProperty('--progress', String(max > 0 ? scrollY / max : 0)); el.classList.toggle('scrolled', scrollY > 40); };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll);
    return () => { removeEventListener('scroll', onScroll); removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
  }, [pathname]);
  return <header className="site-header" ref={ref}><span className="scroll-progress" aria-hidden="true"/><Link className="brand" href="/" aria-label="Vincent Leguide — The Builder’s Universe, homepage"><Mark/><span>Vincent Leguide<span className="brand-sub">THE BUILDER’S UNIVERSE</span></span></Link><nav aria-label="Main navigation"><Link href="/work" aria-current={pathname.startsWith('/work') ? 'page' : undefined}>Work</Link><Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link><a href="#contact" className="nav-contact">Contact</a></nav></header>;
}
const contacts = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/vincent-leguide-640b29194/', note: 'Partnerships & conversations' },
  { label: 'GitHub', href: 'https://github.com/vincentleg', note: 'Code & prototypes' },
  { label: 'Notebook from the Valley', href: 'https://notebookfromthevalley.com', note: 'Writing' }
];
export function Footer() {
  return <footer id="contact" className="contact section-pad"><div className="contact-main"><div><p className="eyebrow">CONTACT · SAN FRANCISCO BAY AREA</p><h2>What can we<br/>build <em>together?</em></h2></div><ul className="contact-links">{contacts.map(c => <li key={c.href}><a href={c.href} target="_blank" rel="noopener noreferrer"><span>{c.label}</span><small>{c.note}</small><i aria-hidden="true">↗</i></a></li>)}</ul></div><div className="footer-bottom"><Link href="/" className="footer-name">Vincent Leguide</Link><span>AI builder · Business developer · Writer</span><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()}</span></div></footer>;
}
