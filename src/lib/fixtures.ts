// Synthetic projects for scale testing only (5, 12, 20+ entries).
// Loaded exclusively when NEXT_PUBLIC_PORTFOLIO_FIXTURES is set; never set in any deployed environment.
import type { Project, ProjectGroup } from './projects';
const groups: ProjectGroup[] = ['AI products & agents', 'Infrastructure', 'Media & writing'];
const accents = ['#7fa7e0', '#dba887', '#b4cda3', '#c9b8de', '#e6cf9a', '#5b8cff'];
const media = ['/media/intent-overview.webp', '/media/handshake-overview.webp', '/media/steward-world.webp', undefined];
export function fixtureProjects(count: number): Project[] {
  return Array.from({ length: count }, (_, i) => {
    const n = i + 7, slug = `fixture-project-${n}`, image = media[i % media.length];
    return {
      slug, name: `Fixture Project ${n}${i % 3 === 0 ? ' with a Longer Name' : ''}`, category: `Fixture category ${i % 4}`, status: 'Test fixture', accent: accents[i % accents.length],
      group: groups[i % groups.length], date: `2025-${String((i % 12) + 1).padStart(2, '0')}`, featured: i < 2,
      related: i % 2 === 0 ? [{ slug: i % 4 === 0 ? 'orqo' : `fixture-project-${n + 1}`, reason: 'Fixture relationship' }] : undefined,
      hook: 'A synthetic entry used to test layout at scale.', summary: 'Synthetic fixture project used only for layout and scale testing. It is not real work.',
      image, imageAlt: image ? 'Fixture image reused for layout testing.' : undefined, caption: image ? 'Fixture.' : undefined,
      gallery: [], links: [], stack: ['Fixture'], problem: 'Fixture.', decision: 'Fixture.', approach: 'Fixture.', next: 'Fixture.',
      flow: [{ title: 'One', text: 'Fixture.' }, { title: 'Two', text: 'Fixture.' }, { title: 'Three', text: 'Fixture.' }, { title: 'Four', text: 'Fixture.' }],
      ledger: [{ capability: 'Fixture', status: 'Fixture', evidence: 'Fixture.' }]
    };
  });
}
