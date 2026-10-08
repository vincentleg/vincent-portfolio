import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/work', '/work/orqo', '/work/intent-firewall', '/work/handshake', '/work/steward', '/about'];
test('all routes, real media, metadata, and responsive containment', async ({page}) => {
  const errors:string[] = []; page.on('pageerror',error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route); expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible(); await expect(page).toHaveTitle(/Vincent Leguide/);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    for (const img of await page.locator('main img').all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate((el:HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy(); }
  }
  expect(errors).toEqual([]);
});
test('navigation, project constellation, contact and keyboard workflow', async ({page}) => {
  await page.goto('/');
  await page.getByRole('link',{name:'Explore my universe'}).click(); await expect(page).toHaveURL(/#orqo/);
  await page.getByRole('link',{name:'Enter the case study'}).click(); await expect(page).toHaveURL(/\/work\/orqo/);
  await expect(page.getByRole('heading',{name:'Verification Ledger.'})).toBeVisible();
  await page.getByRole('tab',{name:'01 Research'}).focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'02 Challenge'})).toHaveAttribute('aria-selected','true');
  await expect(page.getByRole('tabpanel')).toContainText('Reject weak ideas');
  await page.goto('/'); const node = page.locator('.star-node').filter({hasText:'Handshake'}); await node.focus();
  await expect(page.locator('.constellation-detail h3')).toHaveText('Handshake'); await node.press('Enter');
  await expect(page).toHaveURL(/\/work\/handshake/);
  await page.getByRole('link',{name:'About',exact:true}).click(); await expect(page).toHaveURL(/\/about/);
  await expect(page.locator('#contact a[href="https://github.com/vincentleg"]').first()).toBeVisible();
});
test('reduced motion is static and accessible', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/');
  await expect(page.locator('.static-orbit')).toBeVisible(); await expect(page.locator('.hero canvas')).toHaveCount(0);
  for(const route of ['/', '/work/orqo','/about']) {
    await page.goto(route); const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze(); expect(results.violations).toEqual([]);
  }
});
test('WebGL scene and pause control', async ({page}) => {
  await page.goto('/'); await expect(page.locator('.hero canvas')).toBeVisible({timeout:20000});
  const pause = page.getByRole('button',{name:'Pause orbit'}); await expect(pause).toBeVisible(); await pause.click();
  await expect(page.getByRole('button',{name:'Resume orbit'})).toHaveAttribute('aria-pressed','true');
  await page.getByRole('button',{name:'Resume orbit'}).click(); await expect(page.getByRole('button',{name:'Pause orbit'})).toHaveAttribute('aria-pressed','false');
});
test('WebGL unavailable preserves the hero and navigation', async ({page}) => {
  await page.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) { if(type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') return null; return Reflect.apply(original,this,[type,...args]); } as typeof original; });
  await page.goto('/'); await expect(page.locator('.static-orbit')).toBeVisible(); await expect(page.locator('.hero canvas')).toHaveCount(0);
  await page.getByRole('link',{name:'Explore my universe'}).click(); await expect(page).toHaveURL(/#orqo/);
});
test('social cards, sitemap and missing route', async ({request,page}) => {
  for(const path of ['/opengraph-image','/work/orqo/opengraph-image']) { const r = await request.get(path); expect(r.ok()).toBeTruthy(); expect(r.headers()['content-type']).toContain('image/png'); }
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  const response = await page.goto('/work/not-a-project'); expect(response?.status()).toBe(404); await expect(page.getByRole('link',{name:'Return to the projects'})).toBeVisible();
});
