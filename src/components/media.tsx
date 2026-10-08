import Image from 'next/image';
import dimensions from '@/lib/media-dimensions.json';
export function ProjectMedia({ src, alt, caption, priority = false, className = '' }: { src: string; alt: string; caption?: string; priority?: boolean; className?: string }) {
  const size = dimensions[src as keyof typeof dimensions] || { width: 1800, height: 1013 };
  return <figure className={`project-media ${className}`}><div className="media-shell"><div className="media-bar" aria-hidden="true"><span/><span/><span/><i>PRODUCT CAPTURE / 2026</i></div><a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Open full-size screenshot: ${alt}`}><Image src={src} alt={alt} width={size.width} height={size.height} sizes="(max-width: 700px) 92vw, 85vw" priority={priority}/><span className="image-expand" aria-hidden="true">↗</span></a></div>{caption && <figcaption><span>SCREENSHOT</span>{caption}</figcaption>}</figure>;
}
