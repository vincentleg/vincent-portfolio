import type { MetadataRoute } from 'next';
import { projects, siteOrigin } from '@/lib/projects';
export default function sitemap(): MetadataRoute.Sitemap { return ['', '/work', '/about', ...projects.map(p => `/work/${p.slug}`)].map(path => ({url:`${siteOrigin}${path}`,lastModified:new Date('2026-10-08'),changeFrequency:'monthly',priority:path === '' ? 1 : .8})); }
