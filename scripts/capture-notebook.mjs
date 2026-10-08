// Captures Vincent's own publication (notebookfromthevalley.com) as authentic, unedited interface screenshots.
import { chromium } from '@playwright/test';
import sharp from 'sharp';
import { readFile, writeFile } from 'node:fs/promises';
const shots = [
  ['notebook-home', 'https://notebookfromthevalley.com/'],
  ['notebook-essay', 'https://notebookfromthevalley.com/these-are-my-notes-from-the-valley/']
];
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1.25 });
const dims = JSON.parse(await readFile('src/lib/media-dimensions.json', 'utf8'));
for (const [name, url] of shots) {
  await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
  await page.waitForTimeout(1500);
  const png = await page.screenshot();
  await sharp(png).resize({ width: 1800, withoutEnlargement: true }).webp({ quality: 86 }).toFile(`public/media/${name}.webp`);
  const out = await sharp(`public/media/${name}.webp`).metadata();
  dims[`/media/${name}.webp`] = { width: out.width, height: out.height };
}
await writeFile('src/lib/media-dimensions.json', JSON.stringify(dims, null, 2) + '\n');
await browser.close();
