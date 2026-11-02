'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');
const { chromium } = require(path.join(process.env.NAVIGATOR_ROOT || '/navigateur', 'node_modules/playwright-core'));

const root = process.env.PROJECT_ROOT || '/project';
const audit = process.env.AUDIT_ROOT || '/audit';
const resultsRoot = process.env.RESULTS_ROOT || '/resultats';
const data = JSON.parse(fs.readFileSync(path.join(audit, 'resultats-automatiques.json'), 'utf8'));
let state = 20261029;
function random() {
  state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
  return state / 4294967296;
}
const candidates = [...data.unknown_tags];
for (let index = candidates.length - 1; index > 0; index--) {
  const target = Math.floor(random() * (index + 1));
  [candidates[index], candidates[target]] = [candidates[target], candidates[index]];
}

const server = http.createServer((request, response) => {
  const url = new URL(request.url, 'http://127.0.0.1');
  if (url.pathname.startsWith('/api/')) { response.writeHead(401).end(); return; }
  let requestPath;
  try { requestPath = decodeURIComponent(url.pathname); } catch { response.writeHead(400).end(); return; }
  const target = path.resolve(root, '.' + requestPath);
  if (target !== root && !target.startsWith(root + path.sep)) { response.writeHead(403).end(); return; }
  fs.stat(target, (error, stats) => {
    if (error || !stats.isFile()) { response.writeHead(404).end(); return; }
    const type = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.css': 'text/css' }[path.extname(target)] || 'application/octet-stream';
    response.writeHead(200, { 'content-type': type });
    fs.createReadStream(target).pipe(response);
  });
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const browser = await chromium.launch({ executablePath: '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking', '--disable-gpu'] });
  const context = await browser.newContext({ viewport: { width: 375, height: 812 } });
  await context.route('**/*', route => new URL(route.request().url()).hostname === '127.0.0.1' ? route.continue() : route.abort());
  const page = await context.newPage();
  const results = [];
  for (const candidate of candidates.slice(0, 30)) {
    const url = `http://127.0.0.1:${server.address().port}/` + candidate.file.split('/').map(encodeURIComponent).join('/');
    try {
      const response = await page.goto(url, { waitUntil: 'load', timeout: 15000 });
      const dom = await page.evaluate(tag => ({
        elements: document.getElementsByTagName(tag).length,
        literalVisible: document.body ? document.body.innerText.includes('<' + tag) : false
      }), candidate.tag);
      results.push({ ...candidate, httpStatus: response.status(), ...dom });
    } catch (error) { results.push({ ...candidate, error: error.message }); }
  }
  const output = { seed: 20261029, algorithm: 'LCG 1664525/1013904223, Fisher-Yates', population: candidates.length, results };
  fs.writeFileSync(path.join(resultsRoot, 'balises-30.json'), JSON.stringify(output, null, 2));
  console.log(JSON.stringify(output, null, 2));
  await browser.close();
  server.close();
}

main().catch(error => { console.error(error); server.close(); process.exitCode = 1; });
