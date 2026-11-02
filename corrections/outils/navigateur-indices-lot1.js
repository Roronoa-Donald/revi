'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const { chromium } = require('playwright-core');
const { getExercise } = require('../../server/exercises');
const configs = require('../../server/exercises/course-config');
const ids = require('../fixtures/indices-code-lot1.json');

const root = path.resolve(__dirname, '../..');
const referenceIndex = process.argv.indexOf('--reference');
const reference = referenceIndex < 0 ? null : process.argv[referenceIndex + 1];
if (referenceIndex >= 0 && !/^[0-9a-f]{7,40}$/i.test(reference || '')) throw new Error('Une empreinte Git est requise après --reference.');

const exercises = ids.map(id => {
  const exercise = getExercise(id);
  assert.ok(exercise, id);
  const config = configs[exercise.course];
  assert.ok(config, exercise.course);
  return { exercise, file: `${config.dir}/${config.chapterDir}/chapitre${exercise.chapter}.html` };
});
const courseDirs = new Set(exercises.map(item => item.file.split('/')[0]));
const html = new Map([...new Set(exercises.map(item => item.file))].map(file => [file, reference
  ? execFileSync('git', ['show', `${reference}:${file}`], { cwd: root })
  : fs.readFileSync(path.join(root, file))]));
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.wasm': 'application/wasm' };
const server = http.createServer((request, response) => {
  let name;
  try { name = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\/+/, ''); }
  catch { response.writeHead(400).end(); return; }
  const target = path.resolve(root, name);
  const relative = path.relative(root, target).split(path.sep).join('/');
  const parts = relative.split('/');
  if (!target.startsWith(root + path.sep) || /(^|\/)\./.test(relative)) { response.writeHead(404).end(); return; }
  if (html.has(relative)) { response.writeHead(200, { 'content-type': mime['.html'] }).end(html.get(relative)); return; }
  const publicAsset = parts[0] === 'assets' || (courseDirs.has(parts[0]) && parts[1] === 'assets');
  if (!publicAsset || !/\.(?:js|css|svg|wasm|woff2?|ttf|png|jpe?g|webp|ico)$/i.test(relative)) {
    response.writeHead(404).end();
    return;
  }
  fs.readFile(target, (error, body) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'content-type': mime[path.extname(target)] || 'application/octet-stream' }).end(body);
  });
});

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking'] });
  try {
    const context = await browser.newContext();
    await context.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
    const page = await context.newPage();
    assert.equal((await page.request.get(origin + '/assets/%2e%2e%2fserver.js')).status(), 404);
    const damaged = [];
    let checked = 0;
    for (const file of html.keys()) {
      const response = await page.goto(origin + '/' + file.split('/').map(encodeURIComponent).join('/'), { waitUntil: 'load', timeout: 20000 });
      assert.equal(response.status(), 200, file);
      for (const { exercise } of exercises.filter(item => item.file === file)) {
        const hints = page.locator(`#${exercise.id} .lab__hints li`);
        assert.equal(await hints.count(), exercise.hints.length, exercise.id);
        for (const [index, hint] of exercise.hints.entries()) {
          const element = hints.nth(index);
          if (await element.textContent() !== hint.split('`').join('') || await element.locator('.katex').count()) {
            damaged.push({ file, exercise: exercise.id, hint: index + 1 });
          }
          checked++;
        }
      }
    }
    await context.close();
    console.log(JSON.stringify({
      reference: reference || 'dossier local',
      pages: html.size,
      exercices: ids.length,
      indices: checked,
      indicesAlteres: damaged,
      limites: [
        'Les pages de la référence sont comparées aux textes actuels sans balises ; toute réécriture volontaire doit être qualifiée séparément.',
        'Les ressources JavaScript et CSS utilisées pour le rendu sont celles du dossier local.',
        'Le résultat couvre uniquement les exercices listés dans la fixture.'
      ]
    }, null, 2));
    if (damaged.length) process.exitCode = 1;
  } finally {
    await browser.close();
    server.close();
  }
}

main().catch(error => { console.error(error.stack || error.message); server.close(); process.exitCode = 1; });
