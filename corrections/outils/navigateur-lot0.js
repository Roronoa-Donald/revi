'use strict';

const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright-core');

const root = path.resolve(__dirname, '../..');
const seed = 20261029;
const allowed = new Set(['assets', 'b1-python', 'b3-veille', 'b3-linux', 'b3-github', 'csharp', 'docker']);
const candidates = ['b3-github', 'b3-linux', 'csharp', 'docker'].flatMap(course =>
  Array.from({ length: 6 }, (_, index) => `${course}/chapitres/chapitre${index + 1}.html`));
let state = seed >>> 0;
function random() {
  state = (Math.imul(1664525, state) + 1013904223) >>> 0;
  return state / 4294967296;
}
for (let index = candidates.length - 1; index > 0; index--) {
  const other = Math.floor(random() * (index + 1));
  [candidates[index], candidates[other]] = [candidates[other], candidates[index]];
}
const selected = candidates.slice(0, 8);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.wasm': 'application/wasm' };

const server = http.createServer((request, response) => {
  let url;
  try { url = new URL(request.url, 'http://127.0.0.1'); } catch { response.writeHead(400).end(); return; }
  let name;
  try { name = decodeURIComponent(url.pathname).replace(/^\/+/, ''); } catch { response.writeHead(400).end(); return; }
  const first = name.split('/')[0];
  const target = path.resolve(root, name);
  if (!allowed.has(first) || !target.startsWith(root + path.sep)) { response.writeHead(404).end(); return; }
  fs.readFile(target, (error, body) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'content-type': mime[path.extname(target)] || 'application/octet-stream' });
    response.end(body);
  });
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    let gradingRequests = 0;
    await context.route('**/*', route => {
      const target = route.request().url();
      if (target.includes('/api/exercise/submit')) gradingRequests++;
      return target.startsWith(origin + '/') ? route.continue() : route.abort();
    });
    const page = await context.newPage();
    const results = [];
    for (const file of selected) {
      const response = await page.goto(origin + '/' + file, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await page.waitForSelector('[data-lab-ready="1"]', { timeout: 15000 });
      const labs = await page.locator('[data-exercise]').evaluateAll(nodes => nodes.map(node => {
        const button = node.querySelector('[data-lab-submit]');
        const descriptionId = button?.getAttribute('aria-describedby');
        const description = descriptionId && document.getElementById(descriptionId);
        return {
          id: node.getAttribute('data-exercise'),
          disabled: Boolean(button?.disabled),
          label: button?.textContent.trim(),
          notice: description?.textContent.trim() || '',
          sourceFlag: node.getAttribute('data-grading-suspended')
        };
      }));
      const remainedDisabled = await page.locator('[data-exercise]').first().evaluate(node => {
        node.__lab.setBusy(true, 'Test');
        node.__lab.setBusy(false);
        node.__lab.submit();
        return node.querySelector('[data-lab-submit]').disabled;
      });
      results.push({ file, http: response.status(), labs, remainedDisabled });
    }
    await page.goto(origin + '/b1-python/chapitres/chapitre1.html', { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('[data-lab-ready="1"]', { timeout: 15000 });
    const controlEnabled = await page.locator('[data-exercise="py-c1-e1"] [data-lab-submit]').isEnabled();
    const browserCounts = [];
    for (const file of ['b3-veille/chapitres/cartes.html', 'b3-veille/chapitres/chapitre3.html']) {
      await page.goto(origin + '/' + file, { waitUntil: 'domcontentloaded', timeout: 20000 });
      browserCounts.push({ file, cards: await page.locator('.fc').count(), questions: await page.locator('.q').count() });
    }
    await context.close();
    const successful = results.every(item => item.http === 200 && item.remainedDisabled && item.labs.length === 3 && item.labs.every(lab => lab.disabled && lab.sourceFlag === '1' && lab.notice.includes('temporairement suspendue'))) && controlEnabled && gradingRequests === 0;
    console.log(JSON.stringify({ seed, population: candidates.length, sampled: selected.length, results, controlEnabled, gradingRequests, browserCounts, successful }, null, 2));
    process.exitCode = successful ? 0 : 1;
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(error => {
  console.error(error.stack || error.message);
  server.close();
  process.exitCode = 1;
});
