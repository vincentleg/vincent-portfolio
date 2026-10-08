import { socialImage } from '@/lib/social-image';
import { projectBySlug } from '@/lib/projects';
export const alt = 'A project from Vincent Leguide’s Builder’s Universe';
export const size = {width:1200,height:630};
export const contentType = 'image/png';
export default async function Image({params}:{params:Promise<{slug:string}>}) { const p = projectBySlug((await params).slug); return socialImage(p?.name || 'Selected work', p?.hook || 'The Builder’s Universe'); }
