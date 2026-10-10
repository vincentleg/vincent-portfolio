import { test, expect } from '@playwright/test';

test('V7 galaxy: spatial zoom, previews, LinkedIn and scrolling', async ({ page, context, isMobile }) => {
  const errors: string[] = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  await page.goto('/');
  await expect(page.locator('.galaxy-canvas canvas')).toBeVisible();
  await page.getByRole('button', { name: 'Pause orbit' }).click();
  const area = page.locator('.galaxy-viewport');
  await area.scrollIntoViewIfNeeded();
  const nodes = page.locator('.galaxy-project');
  await expect(nodes).toHaveCount(6);
  await expect(page.locator('.future-planet')).toHaveCount(15);
  await expect(page.locator('.project-chapter')).toHaveCount(6);
  await expect(page.locator('.future-planet a, .future-planet img')).toHaveCount(0);
  const slider = page.getByRole('slider', { name: 'Galaxy zoom' });
  await expect(slider).toHaveValue('100');
  const realPositions = await nodes.evaluateAll(elements => elements.map(e => { const r = e.getBoundingClientRect(); return [r.x, r.y]; }));
  for (let i = 0; i < 6; i++) {
    const node = nodes.nth(i);
    if (isMobile) await node.tap(); else await node.hover();
    const preview = page.locator('.galaxy-preview');
    await page.waitForTimeout(300);
    await expect(preview).toBeVisible();
    await expect(preview.locator('img')).toBeVisible();
    await expect(preview).toContainText(await node.getAttribute('aria-label') || '');
    await expect.poll(() => preview.evaluate(e => { const r = e.getBoundingClientRect(); const hit = document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2); return !!hit && e.contains(hit); })).toBeTruthy();
    const box = (await preview.boundingBox())!, viewport = (await area.boundingBox())!;
    expect(box.x).toBeGreaterThanOrEqual(Math.max(0, viewport.x));
    expect(box.x + box.width).toBeLessThanOrEqual(Math.min(page.viewportSize()!.width, viewport.x + viewport.width) + 1);
    expect(box.y + box.height).toBeLessThanOrEqual(viewport.y + viewport.height + 1);
    if (i === 1) await page.screenshot({ path: `/tmp/galaxy-v7-${isMobile ? 'mobile' : 'desktop'}-preview.png` });
    await page.keyboard.press('Escape');
    await expect(preview).toHaveCount(0);
  }
  // Keyboard-only preview and direct project activation remain available.
  await nodes.first().focus();
  await expect(page.locator('.galaxy-preview')).toBeVisible();
  await page.keyboard.press('Escape');
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#project-escape-room/);
  await slider.scrollIntoViewIfNeeded();
  await slider.focus();
  await page.keyboard.press('Home');
  await expect(slider).toHaveValue('25');
  await expect(page.locator('.galaxy-controls output')).toHaveText('25%');
  const allInside = await area.evaluate(e => {
    const r = e.getBoundingClientRect();
    return [...e.querySelectorAll('.galaxy-project .planet, .future-planet .planet')].every(n => {
      const b = n.getBoundingClientRect(); return b.left >= r.left && b.right <= r.right && b.top >= r.top && b.bottom <= r.bottom;
    });
  });
  expect(allInside).toBeTruthy();
  expect(await nodes.evaluateAll(elements => elements.map(e => { const r = e.getBoundingClientRect(); return [r.x, r.y]; }))).not.toEqual(realPositions);
  await page.locator('.galaxy-field').evaluate(e => e.scrollIntoView({ block: 'center' }));
  await page.screenshot({ path: `/tmp/galaxy-v7-${isMobile ? 'mobile' : 'desktop'}-overview.png` });
  await page.keyboard.press('End');
  await expect(slider).toHaveValue('150');
  await page.keyboard.press('ArrowLeft');
  await expect(slider).toHaveValue('149');
  await expect(page.locator('.galaxy-zoom')).toHaveCSS('transform', /matrix\(1\.49/);
  await page.getByRole('button', { name: 'Reset galaxy zoom to 100 percent' }).click();
  await expect(slider).toHaveValue('100');
  // The original photo stays natural, and its actual link still opens a new tab.
  const portrait = page.locator('.portrait-mask');
  await expect(portrait.locator('img')).toHaveCSS('filter', 'none');
  await expect(portrait.locator('img')).toHaveCSS('mask-image', 'none');
  await expect(portrait).toHaveAttribute('rel', 'noopener noreferrer');
  await context.route('https://www.linkedin.com/**', route => route.fulfill({ body: 'Verified LinkedIn destination' }));
  const popupPromise = context.waitForEvent('page');
  if (isMobile) await portrait.tap(); else await portrait.click();
  const popup = await popupPromise; await popup.waitForLoadState();
  expect(popup.url()).toBe('https://www.linkedin.com/in/vincent-leguide-640b29194/');
  await popup.close();
  const bounds = (await area.boundingBox())!;
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2);
  const before = await page.evaluate(() => scrollY);
  await page.mouse.wheel(0, 400);
  await expect.poll(() => page.evaluate(() => scrollY)).toBeGreaterThan(before);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.future-planet').first()).toHaveCSS('animation-name', 'none');
  await expect(nodes.first()).toHaveCSS('animation-name', 'none');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBeTruthy();
  expect(errors).toEqual([]);
});
