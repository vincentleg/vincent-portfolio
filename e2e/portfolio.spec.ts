import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const routes = ['/', '/work', '/work/orqo', '/work/intent-firewall', '/work/handshake', '/work/steward', '/work/notebook-from-the-valley', '/about'];
test('all routes, real media, metadata, and responsive containment', async ({page}) => {
  const errors:string[] = []; page.on('pageerror',error => errors.push(error.message));
  for (const route of routes) {
    const response = await page.goto(route); expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toBeVisible(); await expect(page).toHaveTitle(/Vincent Leguide/);
    await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', new RegExp(`${route === '/' ? '/?' : route}$`));
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1)).toBeTruthy();
    for (const img of await page.locator('main img:visible').all()) { await img.scrollIntoViewIfNeeded(); await expect.poll(() => img.evaluate((el:HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBeTruthy(); }
  }
  expect(errors).toEqual([]);
});
test('one-page navigation, project previews, details and contact', async ({page, isMobile}) => {
  await page.goto('/');
  await page.getByRole('link',{name:'Explore what I’m building'}).click(); await expect(page).toHaveURL(/#work/);
  await page.locator('.pindex-row').filter({hasText:'ORQO'}).click(); await expect(page).toHaveURL(/#project-orqo/);
  await page.locator('#project-orqo summary').click(); await expect(page.locator('#project-orqo .chapter-ledger')).toBeVisible();
  await page.goto('/');
  const node = page.locator('.galaxy-project').filter({hasText:'Handshake'}); await node.focus();
  if (!isMobile) await expect(node.locator('.planet-preview')).toBeVisible();
  await node.press('Enter'); await expect(page).toHaveURL(/#project-handshake/);
  await page.getByRole('link',{name:'Journey',exact:true}).click(); await expect(page).toHaveURL(/#journey/);
  await page.getByRole('link',{name:'Contact',exact:true}).click();
  await expect(page.locator('#contact a[href="https://github.com/vincentleg"]').first()).toBeVisible();
  await page.goto('/work/orqo');
  await page.getByRole('tab',{name:'01 Research'}).focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab',{name:'02 Challenge'})).toHaveAttribute('aria-selected','true');
  await expect(page.getByRole('tabpanel')).toContainText('Reject weak ideas');
});
test('reduced motion is static and accessible', async ({page}) => {
  await page.emulateMedia({reducedMotion:'reduce'}); await page.goto('/');
  await expect(page.locator('.static-orbit')).toBeVisible(); await expect(page.locator('.hero canvas')).toHaveCount(0);
  await expect(page.locator('.star-twinkle').first()).toHaveCSS('animation-name', 'none');
  for(const route of routes) {
    await page.goto(route); const results = await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze(); expect(results.violations).toEqual([]);
  }
});
test('all five projects retain real media, links and honest status on the homepage', async ({page}) => {
  await page.goto('/');
  await expect(page.locator('.project-chapter')).toHaveCount(5);
  for (const chapter of await page.locator('.project-chapter').all()) {
    await expect(chapter.locator('.project-status')).not.toBeEmpty();
    await expect(chapter.locator('.work-tile-visual img')).toHaveCount(1);
    for (const link of await chapter.locator('.chapter-links a').all()) expect(await link.getAttribute('href')).toMatch(/^https:\/\//);
    await chapter.locator('summary').click(); await expect(chapter.locator('.chapter-ledger')).toBeVisible();
  }
  await expect(page.locator('#project-notebook-from-the-valley')).toContainText('Live publication');
  await page.goto('/work/notebook-from-the-valley'); await expect(page.getByRole('heading',{level:1})).toHaveText('Notebook from the Valley');
  await expect(page.locator('.archive-list li')).toHaveCount(25);
  await expect(page.getByRole('link',{name:/Read the publication/})).toHaveAttribute('href','https://notebookfromthevalley.com');
});
test('each case study has its own signature diagram and fact strip', async ({page}) => {
  for (const slug of ['orqo','intent-firewall','handshake','steward','notebook-from-the-valley']) {
    await page.goto(`/work/${slug}`); await expect(page.locator(`.case-hero .sig-${slug} svg`)).toBeVisible();
    await expect(page.locator('.case-spec > div')).toHaveCount(4);
  }
});
test('WebGL scene and pause control', async ({page}) => {
  await page.goto('/'); await expect(page.locator('.hero canvas')).toBeVisible({timeout:20000});
  await expect(page.locator('.galaxy-core img')).toHaveAttribute('alt', 'Vincent Leguide');
  const pause = page.getByRole('button',{name:'Pause orbit'}); await expect(pause).toBeVisible(); await pause.click();
  await expect(page.getByRole('button',{name:'Resume orbit'})).toHaveAttribute('aria-pressed','true');
  await expect(page.locator('.star-twinkle').first()).toHaveCSS('animation-play-state', 'paused');
  await page.getByRole('button',{name:'Resume orbit'}).click(); await expect(page.getByRole('button',{name:'Pause orbit'})).toHaveAttribute('aria-pressed','false');
});
test('WebGL unavailable preserves the hero and navigation', async ({page}) => {
  await page.addInitScript(() => { const original = HTMLCanvasElement.prototype.getContext; HTMLCanvasElement.prototype.getContext = function(this: HTMLCanvasElement, type: string, ...args: unknown[]) { if(type === 'webgl2' || type === 'webgl' || type === 'experimental-webgl') return null; return Reflect.apply(original,this,[type,...args]); } as typeof original; });
  await page.goto('/'); await expect(page.locator('.static-orbit')).toBeVisible(); await expect(page.locator('.hero canvas')).toHaveCount(0);
  await page.getByRole('link',{name:'Explore what I’m building'}).click(); await expect(page).toHaveURL(/#work/);
});
test('social cards, sitemap and missing route', async ({request,page}) => {
  for(const path of ['/opengraph-image','/work/orqo/opengraph-image','/work/notebook-from-the-valley/opengraph-image']) { const r = await request.get(path); expect(r.ok()).toBeTruthy(); expect(r.headers()['content-type']).toContain('image/png'); }
  expect((await request.get('/sitemap.xml')).ok()).toBeTruthy();
  const response = await page.goto('/work/not-a-project'); expect(response?.status()).toBe(404); await expect(page.getByRole('link',{name:'Return to the projects'})).toBeVisible();
});

test('galaxy renders without console errors and compact layouts stay contained', async ({page}) => {
  const errors: string[] = [];
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/'); await expect(page.locator('.galaxy-canvas canvas')).toBeVisible();
  await page.getByRole('button', {name:'Pause orbit'}).click();
  await expect(page.locator('.galaxy-project').first()).toHaveCSS('animation-play-state', 'paused');
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({width, height:800});
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
    await expect(page.locator('.galaxy-project')).toHaveCount(5);
  }
  expect(errors).toEqual([]);
});

test('existing preview transitions and project card depth remain interactive', async ({page, isMobile}) => {
  test.skip(isMobile, 'Hover interaction requires a mouse. Keyboard navigation is covered separately.');
  await page.goto('/');
  await page.locator('.pindex-row').nth(2).hover();
  await expect(page.locator('.pindex-slide').nth(2)).toHaveClass(/on/);
  await expect(page.locator('.pindex-slide').nth(2)).toHaveCSS('opacity', '1');
  const card = page.locator('#project-orqo .work-tile-visual'); await card.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(card.locator('.pv')).toHaveCSS('transform', 'none');
  await card.hover();
  await expect(card.locator('.pv')).not.toHaveCSS('transform', 'none');
  await expect(card).toHaveAttribute('href', '/media/orqo-agents.webp');
});
