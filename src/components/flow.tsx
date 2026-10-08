'use client';
import { useState } from 'react';
import type { Project } from '@/lib/projects';
export function Flow({ steps }: { steps: Project['flow'] }) {
  const [current, setCurrent] = useState(0);
  return <div className="flow"><div className="flow-steps" role="tablist" aria-label="Project workflow">{steps.map((step,i) => <button id={`step-${i}`} key={step.title} role="tab" aria-selected={current === i} aria-controls="flow-panel" tabIndex={current === i ? 0 : -1} onClick={() => setCurrent(i)} onKeyDown={event => { let next = current; if(event.key === 'ArrowRight') next = (current + 1) % steps.length; else if(event.key === 'ArrowLeft') next = (current - 1 + steps.length) % steps.length; else if(event.key === 'Home') next = 0; else if(event.key === 'End') next = steps.length - 1; else return; event.preventDefault(); setCurrent(next); document.getElementById(`step-${next}`)?.focus(); }}><span>0{i + 1}</span>{step.title}<i aria-hidden="true">→</i></button>)}</div><div id="flow-panel" role="tabpanel" aria-labelledby={`step-${current}`} tabIndex={0}><span className="flow-number" aria-hidden="true">0{current + 1}</span><div><h3>{steps[current].title}</h3><p>{steps[current].text}</p></div></div><p className="diagram-caption">INTERACTIVE DIAGRAM / Select a step to explore the design.</p></div>;
}
