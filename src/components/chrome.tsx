'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { projects } from '@/lib/projects';

export function Mark() { return <svg viewBox="0 0 40 40" fill="none" aria-hidden="true"><ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(-35 20 20)"/><ellipse cx="20" cy="20" rx="18" ry="7" transform="rotate(35 20 20)"/><circle cx="20" cy="20" r="3" fill="currentColor" stroke="none"/></svg>; }
export function Header() {
  const pathname = usePathname();
  return <header className="site-header"><Link className="brand" href="/" aria-label="Vincent Leguide, homepage"><Mark/><span>Vincent Leguide<span className="brand-sub">THE BUILDER’S UNIVERSE</span></span></Link><nav aria-label="Main navigation"><Link href="/work" aria-current={pathname.startsWith('/work') ? 'page' : undefined}>Work <span className="nav-count">{String(projects.length).padStart(2, '0')}</span></Link><Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>About</Link><a href="#contact" className="nav-contact">Let’s connect <span aria-hidden="true">↗</span></a></nav></header>;
}
export function Footer() {
  return <footer id="contact" className="contact section-pad"><div className="section-kicker"><span>07 / NEXT CHAPTER</span><span className="location"><i/> SAN FRANCISCO BAY AREA</span></div><div className="contact-main"><div><p className="eyebrow">GOOD THINGS START WITH A CONVERSATION.</p><h2>What can we<br/>build <em>together?</em></h2></div><a className="contact-orbit" href="https://github.com/vincentleg" target="_blank" rel="noopener noreferrer" aria-label="Connect with Vincent on GitHub"><span aria-hidden="true">↗</span><small>FIND ME ON GITHUB</small></a></div><div className="footer-bottom"><Link href="/" className="footer-name">Vincent Leguide</Link><span>From infrastructure to intelligence — and the notes in between.</span><a href="https://github.com/vincentleg" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="#top">Back to top ↑</a><span>© {new Date().getFullYear()}</span></div></footer>;
}
