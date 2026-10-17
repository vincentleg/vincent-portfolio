import type { Project } from '@/lib/projects';

export function ProjectPresentation({ project }: { project: Project }) {
  return <>
    {project.longDescription && <p>{project.longDescription}</p>}
    <div className="chapter-story">{project.presentation?.map(section => <div key={section.title}><h3>{section.title}</h3><p>{section.text}</p></div>)}</div>
    {project.layers && <><h3>The wider architecture · long-term vision</h3><ul className="chapter-ledger">{project.layers.map(layer => <li key={layer.title}><h4>{layer.title}</h4><p>{layer.text}</p></li>)}</ul></>}
  </>;
}
