import Image from 'next/image';
import dimensions from '@/lib/media-dimensions.json';
import type { Project } from '@/lib/projects';
import { Signature } from './signature';
// A project's preview: its authentic screenshot when one exists, otherwise its signature diagram.
export function ProjectVisual({ project, sizes = '(max-width: 700px) 90vw, 45vw', priority = false }: { project: Project; sizes?: string; priority?: boolean }) {
  if (!project.image) return <div className="pv pv-sig"><Signature slug={project.slug} caption={false} fallbackLabel={project.group}/></div>;
  const size = dimensions[project.image as keyof typeof dimensions] || { width: 1800, height: 1013 };
  return <div className="pv pv-img"><Image src={project.image} alt={project.imageAlt ?? ''} width={size.width} height={size.height} sizes={sizes} priority={priority}/><Signature slug={project.slug} caption={false} fallbackLabel={project.group} className="pv-mark"/></div>;
}
