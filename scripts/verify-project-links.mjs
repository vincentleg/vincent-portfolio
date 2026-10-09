import { readFile } from 'node:fs/promises';
const source = await readFile(new URL('../src/lib/projects.ts', import.meta.url), 'utf8');
const links = [...new Set([...source.matchAll(/links: \[(.*?)\],/gs)].flatMap(match => [...match[1].matchAll(/href: (?:'([^']+)'|`([^`]+)`)/g)].map(m => (m[1] || m[2]).replace('${github}', 'https://github.com/vincentleg'))))];
let failed = false;
await Promise.all(links.map(async url => {
  try { const response = await fetch(url, {signal:AbortSignal.timeout(20000), redirect:'follow'}); console.log(`${response.status} ${url}`); if(!response.ok) failed = true; await response.body?.cancel(); }
  catch(error) { failed = true; console.error(`${url}: ${error.message}`); }
}));
if(failed) process.exitCode = 1;
