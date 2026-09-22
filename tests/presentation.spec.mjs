import { test, expect } from '@playwright/test';
import { mkdir } from 'node:fs/promises';
import { pathToFileURL, fileURLToPath } from 'node:url';

test('todos os slides renderizam equações, imagens e conteúdo dentro da área útil', async ({ page }) => {
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('.slide')).toHaveCount(24);
  await expect(page.locator('.katex')).toHaveCount(45);
  await expect(page.locator('.katex-error')).toHaveCount(0);
  await expect(page.locator('#previous-button')).toBeDisabled();
  await mkdir('.cache/screenshots', { recursive: true });
  for (let number = 1; number <= 24; number += 1) {
    await page.goto(`/#/${number}`);
    const slide = page.locator('.slide:visible');
    await expect(slide).toHaveAttribute('id', `slide-${number}`);
    await page.waitForFunction(() => [...document.querySelectorAll('.slide:not([hidden]) img')].every((img) => img.complete && img.naturalWidth > 0));
    const overflow = await slide.evaluate((element) => {
      const body = element.querySelector('.slide-body').getBoundingClientRect();
      const footer = element.querySelector('.slide-footer').getBoundingClientRect();
      return [...element.querySelectorAll('.slide-body p, .slide-body li, .slide-body h1, .slide-body h2, .slide-body h3, .slide-body table, .slide-body .katex-display, .slide-body .figure, .slide-body .gif-viewport')]
        .filter((node) => {
          const rect = node.getBoundingClientRect();
          return rect.bottom > footer.top + 1 || rect.left < body.left - 2 || rect.right > body.right + 2;
        }).map((node) => node.textContent.slice(0, 100));
    });
    expect(overflow, `Conteúdo fora da área útil no slide ${number}`).toEqual([]);
    if ([1, 6, 9, 11, 12, 18, 19, 23].includes(number)) {
      await page.screenshot({ path: `.cache/screenshots/slide-${number}.png` });
    }
  }
  await expect(page.locator('#next-button')).toBeDisabled();
  expect(errors).toEqual([]);
});

test('navegação, links diretos, índice e notas isolam os atalhos', async ({ page }) => {
  await page.goto('/#/7');
  await expect(page.locator('#counter')).toHaveText('7 / 24');
  await page.keyboard.press('ArrowRight');
  await expect(page).toHaveURL(/#\/8$/);
  await page.goBack();
  await expect(page.locator('#counter')).toHaveText('7 / 24');
  await page.keyboard.press('n');
  await expect(page.locator('#notes-dialog')).toBeVisible();
  await expect(page.locator('#notes-text')).toContainText('instantes discretizados');
  await page.keyboard.press('ArrowRight');
  await expect(page.locator('#counter')).toHaveText('7 / 24');
  await page.keyboard.press('Escape');
  await page.keyboard.press('o');
  await page.locator('#overview-list button').nth(22).click();
  await expect(page.locator('#counter')).toHaveText('23 / 24');
  await expect(page.locator('#overview-dialog')).not.toBeVisible();
  await page.keyboard.press('Home');
  await expect(page.locator('#counter')).toHaveText('1 / 24');
  await page.keyboard.press('End');
  await expect(page.locator('#counter')).toHaveText('24 / 24');
  await page.goto('/#/999');
  await expect(page).toHaveURL(/#\/24$/);
  await page.goto('/#/invalido');
  await expect(page).toHaveURL(/#\/1$/);
  await page.getByRole('button', { name: 'Tela cheia F' }).click();
  await expect(page.locator('body')).toHaveClass(/presentation-fullscreen/);
  await page.keyboard.press('f');
  await expect(page.locator('body')).not.toHaveClass(/presentation-fullscreen/);
});

test('GIFs iniciam sob demanda, pausam e respeitam movimento reduzido', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/#/23');
  const slide = page.locator('#slide-23');
  const img = slide.locator('img');
  await expect(img).toHaveAttribute('src', /-poster\.png$/);
  await slide.getByRole('button', { name: 'Reproduzir animação desde o início' }).click();
  await expect(img).toHaveAttribute('src', /routes\.gif$/);
  await page.waitForFunction(() => document.querySelector('#slide-23 img').complete);
  await slide.getByRole('button', { name: 'Pausar animação' }).click();
  await expect(slide.locator('canvas')).toBeVisible();
  await expect(img).toHaveAttribute('src', /-poster\.png$/);
  await slide.getByRole('button', { name: 'Reiniciar' }).click();
  await expect(slide.locator('canvas')).not.toBeVisible();
  await page.keyboard.press('ArrowRight');
  await expect(img).toHaveAttribute('src', /-poster\.png$/);
  await expect(page.locator('#slide-24 img')).toHaveAttribute('src', /-poster\.png$/);
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.keyboard.press('ArrowLeft');
  await expect(img).toHaveAttribute('src', /routes\.gif$/);
});

test('recursos funcionam sob o caminho de projeto do GitHub Pages', async ({ page }) => {
  const failures = [];
  const requests = [];
  page.on('requestfailed', (request) => failures.push(request.url()));
  page.on('request', (request) => requests.push(new URL(request.url()).pathname));
  await page.route('**/sbpo-2026-presentation/**', async (route) => {
    const url = new URL(route.request().url());
    url.pathname = url.pathname.replace('/sbpo-2026-presentation', '');
    await route.fulfill({ response: await route.fetch({ url: url.href }) });
  });
  await page.goto('/sbpo-2026-presentation/#/24');
  await expect(page.locator('#counter')).toHaveText('24 / 24');
  await page.waitForFunction(() => [...document.images].every((img) => img.complete && img.naturalWidth > 0));
  expect(requests.every((url) => url.startsWith('/sbpo-2026-presentation/'))).toBe(true);
  expect(failures).toEqual([]);
});

test('a pasta gerada abre offline e mantém os slides na impressão', async ({ page, context }) => {
  await context.setOffline(true);
  const entry = pathToFileURL(fileURLToPath(new URL('../dist/index.html', import.meta.url)));
  await page.goto(`${entry.href}#/23`);
  await expect(page.locator('.katex')).toHaveCount(45);
  await expect(page.locator('#counter')).toHaveText('23 / 24');
  await page.waitForFunction(() => document.querySelector('#slide-23 img').naturalWidth > 0);
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('.slide:visible')).toHaveCount(24);
  await expect(page.locator('.toolbar')).not.toBeVisible();
});

test('layout cabe em telas pequenas e em projetor 16:9', async ({ page }) => {
  await page.goto('/#/23');
  for (const viewport of [{ width: 390, height: 844 }, { width: 844, height: 390 }, { width: 1920, height: 1080 }]) {
    await page.setViewportSize(viewport);
    await expect.poll(() => page.locator('#deck').evaluate((deck) => {
      const rect = deck.getBoundingClientRect();
      const stage = document.querySelector('#stage').getBoundingClientRect();
      return rect.left >= 0 && rect.right <= innerWidth + 1 && rect.top >= stage.top - 1 && rect.bottom <= stage.bottom + 1;
    })).toBe(true);
  }
});
