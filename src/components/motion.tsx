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
        if (document.querySelector('.galaxy-field')) gsap.to('.galaxy-travel', { yPercent: 10, scale: 1.14, opacity: .55, ease: 'none', scrollTrigger: { trigger: '.universe-hero', start: 'top top', end: 'bottom 15%', scrub: .8 } });
        if (document.querySelector('.journey-track')) {
          gsap.fromTo('.journey-track', { '--journey-progress': 0 }, { '--journey-progress': 1, ease: 'none', scrollTrigger: { trigger: '.journey-track', start: 'top 75%', end: 'bottom 70%', scrub: .5 } });
          gsap.utils.toArray<HTMLElement>('.journey-track li').forEach(el => gsap.fromTo(el, { '--node-light': .35 }, { '--node-light': 1, duration: .7, scrollTrigger: { trigger: el, start: 'top 75%', toggleActions: 'play none none reverse' } }));
        }
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el => gsap.from(el, { y: 30, opacity: .25, duration: .85, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 94%', once: true } }));
        if (window.innerWidth >= 900 && document.querySelector('.flagship-stage')) {
          gsap.fromTo('.flagship-stage', { rotateX: 12, scale: .86, y: 70 }, { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: '.flagship', start: 'top 75%', end: 'center 48%', scrub: .8 } });
          gsap.to('.flagship-watermark', { xPercent: -12, ease: 'none', scrollTrigger: { trigger: '.flagship', start: 'top bottom', end: 'bottom top', scrub: 1 } });
        }
        if (window.innerWidth >= 700) gsap.utils.toArray<HTMLElement>('[data-tilt]').forEach(el => gsap.fromTo(el, { rotateX: 14, scale: .9, y: 60, transformPerspective: 1600 }, { rotateX: 0, scale: 1, y: 0, ease: 'none', scrollTrigger: { trigger: el, start: 'top 95%', end: 'top 35%', scrub: .8 } }));
        gsap.utils.toArray<HTMLElement>('.section-kicker').forEach(el => gsap.fromTo(el, { '--kicker': 0 }, { '--kicker': 1, duration: 1.4, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true } }));
        if (document.querySelector('.notebook-plane')) {
          const wide = window.innerWidth >= 700;
          if (wide) gsap.fromTo('.notebook-plane', { rotateX: 30, rotateZ: -4, y: 90 }, { rotateX: 12, rotateZ: 0, y: 0, ease: 'none', scrollTrigger: { trigger: '.notebook', start: 'top 80%', end: 'center 50%', scrub: .8 } });
          gsap.utils.toArray<HTMLElement>('.note-slot').forEach((el, i) => { const depth = Number(el.dataset.depth || .5); gsap.from(el, { opacity: 0, scale: .94, duration: .9, delay: i * .08, ease: 'power2.out', scrollTrigger: { trigger: '.notebook-stage', start: 'top 85%', once: true } }); if (wide) gsap.fromTo(el, { y: 110 * depth, z: -140 * depth }, { y: -45 * depth, z: 0, ease: 'none', scrollTrigger: { trigger: '.notebook-stage', start: 'top bottom', end: 'bottom 25%', scrub: 1 } }); });
          gsap.fromTo('.notebook-masthead', { xPercent: 2.5, opacity: .4 }, { xPercent: -2.5, opacity: 1, ease: 'none', scrollTrigger: { trigger: '.notebook', start: 'top bottom', end: 'center top', scrub: 1 } });
        }
      }); cleanup = () => mm.revert();
    });
    return () => { cancelled = true; cleanup?.(); };
  }, [path]); return null;
}
