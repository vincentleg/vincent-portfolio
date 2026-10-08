import { test, expect, type Page } from '@playwright/test';
// Runs against whatever the build contains: 5 real projects by default, or N with NEXT_PUBLIC_PORTFOLIO_FIXTURES=N.
const total = Math.max(5, Number(process.env.NEXT_PUBLIC_PORTFOLIO_FIXTURES || 5));
const fixtures = total > 5;
type Box = { x: number; y: number; width: number; height: number };
const overlap = (a: Box, b: Box) => a.x < b.x + b.width && b.x < a.x + a.width && a.y < b.y + b.height && b.y < a.y + a.height;
const noOverflow = (page: Page) => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1);

test(`scale: ${total} projects render without overlap or overflow`, async ({ page, isMobile }) => {
  for (const route of ['/', '/work']) { await page.goto(route); expect(await noOverflow(page)).toBeTruthy(); }
  await page.goto('/work'); await expect(page.locator('.work-tile')).toHaveCount(total);
  await page.goto('/'); await page.locator('.constellation').scrollIntoViewIfNeeded();
  if (isMobile) { await expect(page.locator('.constellation-list a')).toHaveCount(total); return; }
  const nodes = page.locator('.star-node'); await expect(nodes).toHaveCount(total);
  const dots = await page.locator('.star-dot').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
  for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) expect(overlap(dots[i], dots[j]), `nodes ${i} and ${j} overlap`).toBeFalsy();
  for (const i of [0, Math.floor(total / 2), total - 1]) {
    await nodes.nth(i).hover();
    const labels = await page.locator('.node-name').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; }));
    for (let a = 0; a < labels.length; a++) { for (let b = a + 1; b < labels.length; b++) expect(overlap(labels[a], labels[b]), 'labels overlap').toBeFalsy(); }
    const map = await page.locator('.star-map').boundingBox(); for (const l of labels) expect(l.x >= map!.x - 140 && l.x + l.width <= map!.x + map!.width + 140).toBeTruthy();
  }
});

test('keyboard: index rows drive the preview stage; filters narrow the work grid', async ({ page, isMobile }) => {
  await page.goto('/');
  const rows = page.locator('.pindex-row'); await rows.first().focus(); await page.keyboard.press('Tab');
  await expect(rows.nth(1)).toBeFocused();
  if (!isMobile) await expect(rows.nth(1)).toHaveClass(/on/);
  await page.goto('/work');
  const chips = page.locator('.work-tools .chips button'); const n = await chips.count();
  for (let i = 1; i < n; i++) { await chips.nth(i).focus(); await page.keyboard.press('Enter'); await expect(chips.nth(i)).toHaveAttribute('aria-pressed', 'true'); const count = Number(await chips.nth(i).locator('span').innerText()); await expect(page.locator('.work-tile')).toHaveCount(count); }
  await page.locator('.work-order select').selectOption('oldest'); await expect(page.locator('.work-tile').first()).toBeVisible();
});

test('fixtures are present only when explicitly enabled', async ({ page }) => {
  for (const route of ['/', '/work']) { await page.goto(route); await expect(page.getByText(/Fixture Project/).first()).toHaveCount(fixtures ? 1 : 0); }
  if (fixtures) { const r = await page.goto(`/work/fixture-project-${total}`); expect(r?.status()).toBe(200); await expect(page.locator('.case-hero .signature svg')).toBeVisible(); }
});
