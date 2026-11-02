'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');
const { chromium } = require('playwright-core');

const root = path.resolve(__dirname, '../..');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
  } catch {
    response.writeHead(400).end();
    return;
  }
  if (!['/assets/', '/b1-stats/', '/b3-etude-quantitative/'].some(prefix => pathname.startsWith(prefix))) {
    response.writeHead(404).end();
    return;
  }
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep)) {
    response.writeHead(403).end();
    return;
  }
  fs.readFile(file, (error, content) => {
    if (error) {
      response.writeHead(404).end();
      return;
    }
    response.writeHead(200, { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' });
    response.end(content);
  });
});

async function choose(page, stem, answer, correct) {
  const question = page.locator('.q').filter({ hasText: stem });
  assert.equal(await question.count(), 1, stem);
  const choice = question.getByRole('button', { name: answer, exact: true });
  await choice.click();
  assert.equal(await choice.evaluate((element, className) => element.classList.contains(className), correct ? 'is-correct' : 'is-wrong'), true, stem);
  assert.equal(await question.locator('.q__exp').evaluate(element => element.classList.contains('is-shown')), true, stem);
  assert.equal(await question.locator('.opt[data-correct="1"]').evaluate(element => element.classList.contains('is-correct')), true, stem);
}

async function flip(page, prompt, answer) {
  const card = page.locator('.fc').filter({ hasText: prompt });
  assert.equal(await card.count(), 1, prompt);
  await card.click();
  assert.equal(await card.getAttribute('aria-pressed'), 'true', prompt);
  assert.match(await card.locator('.fc__back').innerText(), answer);
}

async function main() {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  let browser;
  try {
    browser = await chromium.launch({ executablePath: process.env.CHROME_BIN || '/usr/bin/chromium', headless: true, args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.route('**/*', route => route.request().url().startsWith(base + '/') ? route.continue() : route.abort());

    await page.goto(base + '/b1-stats/chapitres/chapitre1.html', { waitUntil: 'domcontentloaded' });
    assert.ok((await page.locator('main').innerText()).includes('[180 ; 190]'));
    console.log('F160 : borne finale visible dans le chapitre.');

    await page.goto(base + '/b1-stats/chapitres/chapitre2.html', { waitUntil: 'domcontentloaded' });
    const frequencies = page.locator('[data-exercise="st-c2-e2"]');
    await frequencies.locator('.lab__analyse-grid').waitFor();
    assert.equal(await frequencies.locator('.lab__case').count(), 3);
    assert.match(await frequencies.locator('.lab__case').first().innerText(), /Cinq valeurs, trois modalités/);
    console.log('F175 : libellé correct présent dans l’atelier.');

    await page.goto(base + '/b1-stats/chapitres/chapitre3.html', { waitUntil: 'domcontentloaded' });
    await choose(page, 'Si des modalités se détachent', 'Toutes les modalités d’effectif maximal, même en cas d’égalité', true);
    await choose(page, 'Pour une série en classes, la moyenne utilise', 'les centres de classe pondérés par les effectifs', true);
    console.log('F08 et F162 : bonnes réponses acceptées et explications affichées.');

    await page.goto(base + '/b1-stats/chapitres/cartes.html', { waitUntil: 'domcontentloaded' });
    await flip(page, 'Une moyenne égale à la médiane prouve-t-elle la symétrie', /0, 1, 2, 2, 5/);
    console.log('F161 : carte retournée et contre-exemple visible.');

    await page.goto(base + '/b3-etude-quantitative/chapitres/chapitre2.html', { waitUntil: 'domcontentloaded' });
    const stratification = page.locator('[data-exercise="eq3-c2-e2"]');
    const quotas = page.locator('[data-exercise="eq3-c2-e3"]');
    await stratification.locator('.lab__analyse-grid').waitFor();
    await quotas.locator('.lab__analyse-grid').waitFor();
    assert.equal(await stratification.locator('.lab__case').count(), 6);
    assert.match(await stratification.locator('[data-case-index="4"]').innerText(), /minima=A:1,B:0,C:1/);
    assert.equal(await quotas.locator('.lab__case').count(), 3);
    assert.match(await quotas.locator('[data-case-index="3"]').innerText(), /20 personnes sur 100.*revenu élevé/);
    await choose(page, 'Pour n = 1 et trois strates', '0, 0, 0', false);
    await choose(page, 'Des quotas A/B sont parfaitement respectés', 'Les proportions A/B sont conformes, mais d’autres biais peuvent subsister', true);
    console.log('F177 et F178 : limites des quotas et mauvaise répartition correctement évaluées.');

    await page.goto(base + '/b3-etude-quantitative/chapitres/chapitre4.html', { waitUntil: 'domcontentloaded' });
    const agreement = page.locator('[data-exercise="eq3-c4-e3"]');
    await agreement.locator('.lab__analyse-grid').waitFor();
    assert.equal(await agreement.locator('.lab__case').count(), 3);
    assert.match(await agreement.locator('[data-case-index="2"]').innerText(), /OO=90 ON=5 NO=5 NN=0/);
    await choose(page, 'Que peut-on conclure d’un accord brut de 90%', 'Il faut aussi examiner les marges, les désaccords et, si défini, le kappa', true);
    console.log('F176 : QCM sur l’accord brut correctement évalué.');

    await page.goto(base + '/b3-etude-quantitative/chapitres/chapitre5.html', { waitUntil: 'domcontentloaded' });
    await choose(page, 'qu’indique formellement une « p-valeur »', 'Que, sous H0 et les hypothèses du modèle, la probabilité d’obtenir une statistique au moins aussi extrême que celle observée est inférieure à 5%', true);
    await page.goto(base + '/b3-etude-quantitative/chapitres/cartes.html', { waitUntil: 'domcontentloaded' });
    await flip(page, 'Que signifie une p-valeur', /hypothèses du modèle/);
    console.log('F09 : QCM et carte sur la p-valeur fonctionnels.');
  } finally {
    if (browser) await browser.close();
    await new Promise(resolve => server.close(resolve));
  }
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
