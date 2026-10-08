'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
export function ScrollMotion() {
  const path = usePathname();
  useEffect(() => {
    let cleanup: (() => void) | undefined; let cancelled = false;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ gsap }, { ScrollTrigger }]) => {
      if (cancelled) return; gsap.registerPlugin(ScrollTrigger);
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 30, opacity: .25, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
        if (window.innerWidth >= 900 && document.querySelector('.flagship-stage')) {
          gsap.fromTo('.flagship-stage', { rotateX: 12, scale: .86, y: 70 }, { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '.flagship', start: 'top 75%', end: 'center 48%', scrub: .8 } });
          gsap.to('.flagship-watermark', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.flagship', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
      }); cleanup = () => mm.revert();
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [path]); return null;
}
