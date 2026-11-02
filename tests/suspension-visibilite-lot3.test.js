'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { chromium } = require('playwright-core');
const labs = require('../scripts/generate-code-labs');

const root = path.resolve(__dirname, '..');
const browserPath = process.env.CHROME_BIN || '/usr/bin/chromium';

test('le libellé non noté est visible sur mobile et ordinateur', { skip: !fs.existsSync(browserPath) }, async () => {
  const browser = await chromium.launch({ executablePath: browserPath, headless: true, args: ['--no-sandbox'] });
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.abort());
    const css = fs.readFileSync(path.join(root, 'assets/css/code-lab.css'), 'utf8');
    const content = ['b1-python', 'b1-linux', 'sql'].map(course => labs.renderSection(course, 1)).join('\n');
    await page.setContent('<!doctype html><html lang="fr"><head><meta charset="utf-8"><style>' + css +
      '</style></head><body>' + content + '</body></html>');
    for (const width of [320, 1280]) {
      await page.setViewportSize({ width, height: 800 });
      for (const id of ['py-c1-e1', 'lx-c1-e1', 'sql2-c1-e1']) {
        const badge = page.locator(`[data-exercise="${id}"] .lab__training`);
        assert.equal(await badge.count(), 1, id);
        assert.equal(await badge.isVisible(), true, id);
        assert.equal(await badge.innerText(), 'Entraînement, non noté', id);
      }
      assert.equal(await page.locator('[data-exercise="lx-c1-e2"] .lab__training').count(), 0);
    }
  } finally {
    await browser.close();
  }
});
