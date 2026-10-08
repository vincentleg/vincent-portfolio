// Deterministic privacy derivatives: no AI regeneration, no invented interface content.
import sharp from 'sharp';
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
const input = path.resolve('portfolio-starter/assets-originals');
const files = (await readdir(input)).filter(p => p.endsWith('.png')).sort();
if (files.length !== 8) throw new Error('Expected the eight reviewed original captures.');
await mkdir('public/media', { recursive: true });
const dimensions = {};
const names = [null, 'orqo-agents', 'steward-world', 'steward-connections', 'intent-overview', 'intent-decision', 'handshake-overview', 'handshake-loops'];
for (let i = 0; i < files.length; i++) {
  if (!names[i]) continue; // Full dashboard withheld: real business relationship details.
  let asset = sharp(path.join(input, files[i]));
  const {width, height} = await asset.metadata();
  if (!width || !height) throw new Error('Invalid image metadata');
  if (i === 1) {
    // Remove account sidebar; the remaining catalog contains only product descriptions.
    const left = Math.ceil(width * .255);
    asset = asset.extract({left, top:0, width:width-left, height});
  }
  if (i === 6 || i === 7) {
    // Irreversible opaque mask over provider receipt identifier, retaining the status message.
    const x = Math.floor(width * (i === 6 ? .045 : .036));
    const y = Math.floor(height * (i === 6 ? .949 : .596));
    const w = Math.ceil(width * .18), h = Math.ceil(height * .046);
    const mask = Buffer.from(`<svg width="${w}" height="${h}"><rect width="100%" height="100%" fill="#f7f7f0"/><text x="8" y="${Math.round(h*.65)}" fill="#52654e" font-family="sans-serif" font-size="${Math.max(10,Math.round(height*.01))}">Provider identifier removed</text></svg>`);
    asset = asset.composite([{input:mask,left:x,top:y}]);
  }
  const sanitized = await asset.toBuffer();
  await sharp(sanitized).resize({width:1800,withoutEnlargement:true}).webp({quality:88}).toFile(`public/media/${names[i]}.webp`);
  const out = await sharp(`public/media/${names[i]}.webp`).metadata();
  dimensions[`/media/${names[i]}.webp`] = { width: out.width, height: out.height };
}
await writeFile('src/lib/media-dimensions.json', JSON.stringify(dimensions, null, 2) + '\n');
console.log('Published 7 reviewed derivatives; sensitive ORQO dashboard withheld.');
