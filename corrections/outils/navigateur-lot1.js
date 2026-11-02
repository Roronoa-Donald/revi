'use strict';

const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright-core');
const { getExercise } = require('../../server/exercises');
const courseConfig = require('../../server/exercises/course-config');

const root = path.resolve(__dirname, '../..');
const base = '595e9cf33364200701e9d7c5e231cd21d35aea38';
const seed = 20261029;
const changed = execFileSync('git', ['diff', '--name-only', '-z', base], { cwd: root }).toString().split('\0').filter(Boolean);
const candidates = changed.filter(file => /^[^/]+\/chapitres\/chapitre[1-6]\.html$/.test(file)).sort();
let state = seed >>> 0;
for (let index = candidates.length - 1; index > 0; index--) {
  state = (Math.imul(1664525, state) + 1013904223) >>> 0;
  const other = Math.floor((state / 4294967296) * (index + 1));
  [candidates[index], candidates[other]] = [candidates[other], candidates[index]];
}
const selected = candidates.slice(0, 5);
const focal = [
  'b3-veille/chapitres/cartes.html',
  'b3-veille/chapitres/chapitre3.html',
  'b1-algebre/chapitres/chapitre2.html',
  'b1-algebre/chapitres/chapitre4.html',
  'react/chapitres/chapitre6.html',
  'b3-linux/chapitres/chapitre5.html',
  'b3-voip/chapitres/chapitre1.html',
  'b3-cryptographie/chapitres/chapitre4.html',
  'linux/chapitres/chapitre5.html'
];
const hintIds = require('../fixtures/indices-code-lot1.json');
const hintExercises = hintIds.map(id => {
  const exercise = getExercise(id);
  assert.ok(exercise, id);
  const config = courseConfig[exercise.course];
  assert.ok(config, exercise.course);
  return { exercise, file: `${config.dir}/${config.chapterDir}/chapitre${exercise.chapter}.html` };
});
const codeFragments = [
  { file: 'Cyber securite B2/chapitres/chapitre6.html', selector: '.code-block', text: 'alert tcp $EXTERNAL_NET any -> $HOME_NET 80' },
  { file: 'b1-bureautique/exercices/exercices.html', selector: 'main .item li', text: 'références relatives (A1), absolues ($A$1) et mixtes ($A1 ou A$1)' },
  { file: 'b1-bureautique/exercices/exercices.html', selector: 'main .item .sol p', text: '$A$1 fige colonne et ligne au déplacement ; $A1 fige la colonne seule ; A$1 fige la ligne seule.' },
  { file: 'b3-github/chapitres/chapitre5.html', selector: 'main li', text: 'Écrire ${{ github.head_ref }} ou ${{ github.event... }} directement dans un script bash' },
  { file: 'b3-sql/chapitres/chapitre5.html', selector: 'main li', text: 'substitution des valeurs ($1, $2)' },
  { file: 'b3-voip/chapitres/chapitre4.html', selector: 'main li', text: 'variables de canaux (${EXTEN}, ${CALLERID(num)})' },
  { file: 'docker/chapitres/chapitre5.html', selector: '#dk2-c5-e3 .lab__goal', text: 'syntaxes d’interpolation ${VAR} et ${VAR:-default}' },
  { file: 'php/chapitres/cartes.html', selector: '.fc', text: '$stmt->execute([":param" => $valeur])' },
  { file: 'php/chapitres/chapitre2.html', selector: '.q__exp', text: 'Renvoyer $this autorise $obj->a()->b()' },
  { file: 'php/chapitres/chapitre6.html', selector: '.opt', text: '$stmt->execute([":nom" => $v])' },
  { file: 'php/chapitres/chapitre6.html', selector: '.opt', text: '$pdo->link($v)' }
];
const allowed = new Set(['assets', ...selected.concat(focal, hintExercises.map(item => item.file), codeFragments.map(item => item.file)).map(file => file.split('/')[0])]);
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.svg': 'image/svg+xml', '.wasm': 'application/wasm' };
const server = http.createServer((request, response) => {
  let name;
  try { name = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname).replace(/^\/+/, ''); } catch { response.writeHead(400).end(); return; }
  const target = path.resolve(root, name);
  const relative = path.relative(root, target).split(path.sep).join('/');
  const publicExtension = /\.(?:html|js|css|svg|wasm|woff2?|ttf|png|jpe?g|webp|ico)$/i.test(relative);
  if (!target.startsWith(root + path.sep) || !allowed.has(relative.split('/')[0]) || /(^|\/)\./.test(relative) || !publicExtension) {
    response.writeHead(404).end();
    return;
  }
  fs.readFile(target, (error, body) => {
    if (error) { response.writeHead(404).end(); return; }
    response.writeHead(200, { 'content-type': mime[path.extname(target)] || 'application/octet-stream' });
    response.end(body);
  });
});

async function main() {
  assert.ok(candidates.length >= selected.length && selected.length === 5);
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = 'http://127.0.0.1:' + server.address().port;
  const browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking'] });
  try {
    const context = await browser.newContext({ viewport: { width: 1024, height: 768 } });
    await context.route('**/*', route => route.request().url().startsWith(origin + '/') ? route.continue() : route.abort());
    const page = await context.newPage();
    assert.equal((await page.request.get(origin + '/assets/%2e%2e%2fserver.js')).status(), 404);
    assert.equal((await page.request.get(origin + '/assets/.env')).status(), 404);
    async function visit(file) {
      const url = origin + '/' + file.split('/').map(encodeURIComponent).join('/');
      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
      assert.equal(response.status(), 200, file);
      await page.waitForLoadState('load');
    }

    await visit(focal[0]);
    assert.equal(await page.locator('.fc').count(), 36);
    assert.match(await page.locator('main').innerText(), /<title>.*<link>/s);
    await visit(focal[1]);
    assert.equal(await page.locator('.q').count(), 8);
    assert.equal(await page.locator('main title, main link').count(), 0);

    const math = [];
    for (const file of focal.slice(2, 4)) {
      await visit(file);
      await page.waitForSelector('.katex', { timeout: 10000 });
      const item = {
        file,
        rendered: await page.locator('.katex').count(),
        errors: await page.locator('.katex-error').count(),
        inCode: await page.locator('pre .katex, code .katex').count()
      };
      assert.ok(item.rendered > 0);
      assert.equal(item.errors, 0);
      assert.equal(item.inCode, 0);
      math.push(item);
      if (process.env.RENDER_SHOTS_DIR) await page.locator('.math-block').first().screenshot({ path: path.join(process.env.RENDER_SHOTS_DIR, path.basename(file) + '-formule.png') });
    }

    await visit(focal[4]);
    const question = page.locator('.q').filter({ hasText: 'Une route 404' });
    assert.equal(await question.count(), 1);
    assert.deepEqual(await question.locator('button.opt').allTextContents(), ['path="*"', 'path="404"', 'path="none"']);
    await question.locator('button.opt').nth(1).click();
    assert.equal(await question.locator('button.is-wrong').count(), 1);
    assert.equal(await question.locator('button.is-correct').count(), 1);
    assert.equal(await question.locator('.q__exp.is-shown').count(), 1);

    await visit(focal[5]);
    assert.match(await page.locator('main').textContent(), /ip addr add <IP\/CIDR>/);
    await visit(focal[6]);
    assert.match(await page.locator('main').textContent(), /PER_CALL:<bandwidth_per_call_kbps:\.1f>kbps/);
    await visit(focal[7]);
    await page.waitForSelector('.katex', { timeout: 10000 });
    const definition = page.locator('li').filter({ hasText: 'compte combien d’entiers de' }).first();
    assert.match(await definition.innerText(), /entiers de[\s\S]+à[\s\S]+sont premiers avec/);
    assert.deepEqual((await definition.locator('annotation').allTextContents()).slice(1, 4), ['1', 'n', 'n']);
    assert.equal(await page.locator('.katex-error').count(), 0);

    await visit(focal[8]);
    const shellExplanation = page.locator('.q').filter({ hasText: 'Quel paramètre est le premier argument ?' }).locator('.q__exp');
    assert.equal(await shellExplanation.textContent(), '$1 est le premier argument ; $0 est le nom du script.');
    assert.equal(await shellExplanation.locator('.katex').count(), 0);
    const shellSummary = page.locator('li').filter({ hasText: 'Variables sans espaces autour du = ;' });
    assert.equal(await shellSummary.textContent(), 'Variables sans espaces autour du = ; $1… les arguments, $# leur nombre, $@ la liste.');
    assert.equal(await shellSummary.locator('.katex').count(), 0);

    let checkedHints = 0;
    for (const file of new Set(hintExercises.map(item => item.file))) {
      await visit(file);
      for (const { exercise } of hintExercises.filter(item => item.file === file)) {
        const hints = page.locator(`#${exercise.id} .lab__hints li`);
        assert.equal(await hints.count(), exercise.hints.length, exercise.id);
        for (const [index, hint] of exercise.hints.entries()) {
          assert.equal(await hints.nth(index).textContent(), hint.split('`').join(''), `${exercise.id}, indice ${index + 1}`);
          assert.equal(await hints.nth(index).locator('.katex').count(), 0, `${exercise.id}, indice ${index + 1}`);
          checkedHints++;
        }
      }
    }

    const damagedFragments = [];
    for (const file of new Set(codeFragments.map(item => item.file))) {
      await visit(file);
      for (const fragment of codeFragments.filter(item => item.file === file)) {
        const texts = await page.locator(fragment.selector).allTextContents();
        if (!texts.some(text => text.includes(fragment.text))) damagedFragments.push(`${file} : ${fragment.text}`);
      }
    }
    assert.deepEqual(damagedFragments, []);

    const samples = [];
    for (const file of selected) {
      await visit(file);
      samples.push({ file, title: await page.title(), text: (await page.locator('main').textContent()).trim() });
    }
    await context.close();
    console.log(JSON.stringify({ base, seed, population: candidates.length, selected, focal, math, checkedHints, checkedCodeFragments: codeFragments.length, react: '3 réponses ; mauvaise réponse signalée et explication affichée', samples, successful: true }, null, 2));
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
