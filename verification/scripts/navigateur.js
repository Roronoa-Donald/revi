'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require('/navigateur/node_modules/playwright-core');

const root = '/project';
const sample = JSON.parse(fs.readFileSync('/audit/echantillons.json', 'utf8'));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.wasm': 'application/wasm', '.svg': 'image/svg+xml', '.png': 'image/png' };
const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (url.pathname.startsWith('/api/')) {
    response.writeHead(401, { 'content-type': 'application/json' });
    response.end('{}');
    return;
  }
  let requestPath;
  try { requestPath = decodeURIComponent(url.pathname); } catch { response.writeHead(400).end(); return; }
  if (requestPath.startsWith('/_auth/')) requestPath = '/public/' + requestPath.slice(7);
  const target = path.resolve(root, '.' + requestPath);
  if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.stat(target, (error, stats) => {
    if (error || !stats.isFile()) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'content-type': mime[path.extname(target).toLowerCase()] || 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
});

async function inspect(page, file) {
  const errors = [];
  const onError = error => errors.push(error.message);
  page.on('pageerror', onError);
  let result;
  try {
    const address = `http://127.0.0.1:${server.address().port}/` + file.split('/').map(encodeURIComponent).join('/');
    const response = await page.goto(address, { waitUntil: 'load', timeout: 15000 });
    result = await page.evaluate(() => ({
      h1: [...document.querySelectorAll('h1')].map(element => element.textContent.trim()),
      cards: document.querySelectorAll('.fc').length,
      cardsFocusable: [...document.querySelectorAll('.fc')].filter(element => element.tabIndex >= 0).length,
      questions: document.querySelectorAll('.q').length,
      mathErrors: [...document.querySelectorAll('.katex-error')].map(element => ({ text: element.textContent.slice(0, 160), title: element.getAttribute('title') })),
      scripts: [...document.scripts].map(element => element.getAttribute('src')).filter(Boolean),
      overflow: document.documentElement.scrollWidth > innerWidth + 2,
      viewport: innerWidth,
      scrollWidth: document.documentElement.scrollWidth,
      visibleImagesWithoutAlt: [...document.images].filter(image => !image.hasAttribute('alt')).length,
      visibleHeadings: [...document.querySelectorAll('h1,h2,h3')].slice(0, 8).map(element => element.textContent.trim()),
      placeholders: [...document.querySelectorAll('ip,cidr,app,workload')].map(element => ({ tag: element.tagName, text: element.textContent })),
      title: document.title.slice(0, 180)
    }));
    result.httpStatus = response.status();
  } catch (error) { result = { error: error.message }; }
  page.off('pageerror', onError);
  return { file, ...result, errors };
}

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking', '--disable-gpu'] });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 }, deviceScaleFactor: 1 });
  await context.route('**/*', route => {
    const url = new URL(route.request().url());
    return url.hostname === '127.0.0.1' ? route.continue() : route.abort();
  });
  const page = await context.newPage();
  const random = [];
  for (const file of sample.public_pages_60.slice(0, 20)) random.push(await inspect(page, file));
  const targeted = [];
  for (const file of ['b3-veille/chapitres/cartes.html', 'b3-veille/chapitres/chapitre3.html', 'b3-linux/chapitres/chapitre5.html', 'Cyber securite B2/chapitres/exercices.html', 'Cyber securite B2/chapitres/chapitre1.html', 'b1-linux/chapitres/cartes.html', 'b1-algebre/chapitres/chapitre2.html', 'b1-algebre/chapitres/chapitre4.html', 'b1-linux/chapitres/chapitre3.html', 'b1-linux/chapitres/chapitre5.html', 'b1-php/chapitres/chapitre3.html', 'linux/chapitres/chapitre5.html']) targeted.push(await inspect(page, file));
  await page.goto(`http://127.0.0.1:${server.address().port}/b1-linux/chapitres/cartes.html`, { waitUntil: 'load' });
  const keyboard = { firstCard: await page.locator('.fc').count() };
  if (keyboard.firstCard) {
    const card = page.locator('.fc').first();
    keyboard.before = await card.evaluate(element => ({ tabIndex: element.tabIndex, role: element.getAttribute('role'), ariaPressed: element.getAttribute('aria-pressed'), flipped: element.classList.contains('is-flipped') }));
    await card.focus();
    await page.keyboard.press('Enter');
    keyboard.after = await card.evaluate(element => ({ focused: document.activeElement === element, ariaPressed: element.getAttribute('aria-pressed'), flipped: element.classList.contains('is-flipped') }));
  }
  const fragment = await page.goto(`http://127.0.0.1:${server.address().port}/Cyber%20securite%20B2/chapitres/chapitre1.html#exo-1`, { waitUntil: 'load' });
  const anchor = await page.evaluate(() => ({ fragment: location.hash, targetPresent: !!document.getElementById('exo-1'), actualExercisePresent: !!document.getElementById('cs2-c1-e1') }));
  anchor.httpStatus = fragment.status();
  const output = { seed: sample.seed, context: 'navigateur local isolé ; aucun accès au site en ligne', random, targeted, keyboard, anchor };
  fs.writeFileSync('/resultats/navigateur.json', JSON.stringify(output, null, 2));
  console.log(JSON.stringify({ randomPages: random.length, errors: random.filter(item => item.error || item.errors.length), overflow: random.filter(item => item.overflow).map(item => item.file), targeted, keyboard, anchor }, null, 2));
  await browser.close();
  server.close();
}

main().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
