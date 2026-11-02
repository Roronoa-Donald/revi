'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('playwright-core');
const course = require('../server/content/b1-sql');
const kit = require('../scripts/course-kit');
const labs = require('../scripts/generate-code-labs');
const exercises = require('../server/exercises/b1-sql');
const { MISSIONS } = require('../b1-sql/assets/js/sql-simulator');

test('simulateur réel : requêtes, contraintes, missions et réinitialisation', { timeout: 60000 }, async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const unexpectedRequests = [];
    const atelier = course.render(kit)['atelier.html'];
    const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body>' +
      atelier.body + '<script src="/b1-sql/assets/vendor/sqljs/sql-wasm.js"></script>' +
      '<script src="/b1-sql/assets/js/sql-simulator.js"></script></body></html>';
    const resources = new Map([
      ['/b1-sql/assets/vendor/sqljs/sql-wasm.js', ['b1-sql/assets/vendor/sqljs/sql-wasm.js', 'text/javascript']],
      ['/b1-sql/assets/vendor/sqljs/sql-wasm.wasm', ['b1-sql/assets/vendor/sqljs/sql-wasm.wasm', 'application/wasm']],
      ['/b1-sql/assets/js/sql-simulator.js', ['b1-sql/assets/js/sql-simulator.js', 'text/javascript']],
      ['/b1-sql/assets/js/sql-simulator-worker.js', ['b1-sql/assets/js/sql-simulator-worker.js', 'text/javascript']],
      ['/assets/img/ui-icons.svg', ['assets/img/ui-icons.svg', 'image/svg+xml']]
    ]);
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin !== 'http://sql-lot1.invalid') {
        unexpectedRequests.push(route.request().url());
        return route.abort();
      }
      if (url.pathname === '/b1-sql/atelier.html') {
        return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html });
      }
      const resource = resources.get(url.pathname);
      if (!resource) {
        unexpectedRequests.push(url.pathname);
        return route.abort();
      }
      return route.fulfill({ status: 200, contentType: resource[1], body: fs.readFileSync(path.join(__dirname, '..', resource[0])) });
    });
    await page.goto('http://sql-lot1.invalid/b1-sql/atelier.html');
    await page.waitForFunction(() => document.getElementById('sqlsim-state').textContent.includes('prête'));
    const states = page.locator('.sqlsim__mission-state');
    for (let index = 0; index < MISSIONS.length; index++) {
      assert.equal((await states.nth(index).textContent()).trim(), 'à faire');
    }

    await page.locator('#sqlsim-run').click();
    await page.waitForFunction(() => document.getElementById('sqlsim-state').textContent.includes('Exécution réussie'));
    assert.equal(await page.locator('#sqlsim-table tbody tr').count(), 23);
    assert.match(await page.locator('#sqlsim-table thead').textContent(), /immat/i);

    async function execute(sql) {
      await page.locator('#sqlsim-query').fill(sql);
      await page.locator('#sqlsim-run').click();
      await page.waitForFunction(() => /Exécution réussie|Erreur/.test(document.getElementById('sqlsim-state').textContent));
    }

    await execute('SELECT * FROM Voiture LIMIT 1;');
    assert.equal((await states.nth(0).textContent()).trim(), 'à faire');
    for (const [index, mission] of MISSIONS.entries()) {
      await execute(mission.sql);
      assert.equal((await states.nth(index).textContent()).trim(), 'résultat conforme', mission.id);
      if (mission.id === 'm6') assert.match(await page.locator('#sqlsim-table').textContent(), /Aucune ligne/);
    }

    await execute('SELECT hex(zeroblob(600000));');
    assert.match(await page.locator('#sqlsim-state').textContent(), /Erreur/);
    assert.match(await page.locator('#sqlsim-table').textContent(), /limite.*résultat/i);
    await execute('SELECT zeroblob(600000);');
    assert.match(await page.locator('#sqlsim-table').textContent(), /limite.*résultat/i);
    await execute('SELECT hex(zeroblob(200000)); SELECT hex(zeroblob(200000));');
    assert.match(await page.locator('#sqlsim-table').textContent(), /limite.*résultat/i);
    await execute("WITH RECURSIVE c(x) AS (VALUES(1) UNION ALL SELECT x+1 FROM c WHERE x<1500) SELECT printf('%01000d', x) FROM c;");
    assert.match(await page.locator('#sqlsim-table').textContent(), /limite.*résultat/i);
    for (const limit of ['0', '1000000000']) {
      await execute(`PRAGMA hard_heap_limit = ${limit};`);
      assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '33554432');
    }
    await execute('SELECT hex(zeroblob(50000000));');
    assert.match(await page.locator('#sqlsim-table').textContent(), /out of memory/i);
    await execute('SELECT 42;');
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '42');
    await execute('CREATE TABLE "essai;nom" ("col;nom" INTEGER); INSERT INTO "essai;nom" VALUES (7); SELECT "col;nom" FROM "essai;nom";');
    assert.match(await page.locator('#sqlsim-state').textContent(), /Exécution réussie/);
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '7');
    await execute('SELECT-- commentaire entre deux éléments\n1 AS nb;');
    assert.match(await page.locator('#sqlsim-state').textContent(), /Exécution réussie/);
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '1');
    await execute("CREATE TABLE journal_evenements (valeur INTEGER); CREATE TRIGGER journal_km AFTER UPDATE OF km ON Voiture BEGIN INSERT INTO journal_evenements VALUES (NEW.km); END; UPDATE Voiture SET km = km + 1 WHERE immat = 'TG-7854-Z'; SELECT valeur FROM journal_evenements;");
    assert.match(await page.locator('#sqlsim-state').textContent(), /Exécution réussie/);
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '501');

    await execute("INSERT INTO Voiture (immat, marque, codemarque, moteur, km, pxachat, nbreplace) VALUES ('TEST', 'TOYOTA', 'BMW', 'DIESEL', 0, 1, 5);");
    assert.match(await page.locator('#sqlsim-table').textContent(), /FOREIGN KEY constraint failed/);
    await execute("INSERT INTO Voiture (immat, marque, codemarque, moteur, km, pxachat, nbreplace) VALUES (NULL, 'TOYOTA', 'TOY', 'DIESEL', 0, 1, 5);");
    assert.match(await page.locator('#sqlsim-table').textContent(), /NOT NULL constraint failed/);
    await execute("UPDATE Voiture SET moteur = 'DIESEL'; SELECT COUNT(*) AS nb FROM Voiture WHERE moteur = 'DIESEL';");
    assert.match(await page.locator('#sqlsim-table').textContent(), /23/);
    await page.locator('#sqlsim-reset').click();
    await page.waitForFunction(() => document.getElementById('sqlsim-state').textContent.includes('Base réinitialisée'));
    assert.equal((await states.nth(0).textContent()).trim(), 'à faire');
    await execute("SELECT COUNT(*) AS nb FROM Voiture WHERE moteur = 'DIESEL';");
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '6');
    assert.deepEqual(unexpectedRequests, []);
    await context.close();
  } finally {
    await browser.close();
  }
});

test('zone libre et exemple d’atelier SQL fonctionnent dans le navigateur', { timeout: 60000 }, async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    const context = await browser.newContext();
    const page = await context.newPage();
    const unexpectedRequests = [];
    const atelier = course.render(kit)['atelier.html'];
    const shell = body => '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body>' +
      body + '<script src="/assets/js/code-lab.js"></script></body></html>';
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin !== 'http://sql-lot1.invalid') {
        unexpectedRequests.push(url.href);
        return route.abort();
      }
      if (url.pathname === '/b1-sql/atelier.html') {
        return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: shell(atelier.body) });
      }
      if (url.pathname === '/b1-sql/chapitres/chapitre1.html') {
        return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: shell(labs.renderSection('b1-sql', 1)) });
      }
      if (url.pathname === '/api/execute/languages') {
        return route.fulfill({ status: 200, contentType: 'application/json', body: '{"languages":[{"id":"sql","label":"SQL"}]}' });
      }
      if (url.pathname === '/assets/vendor/monaco/vs/loader.js') return route.abort();
      if (url.pathname.startsWith('/assets/js/') || url.pathname.startsWith('/b1-sql/assets/vendor/sqljs/') ||
        url.pathname === '/assets/img/ui-icons.svg') {
        const file = path.join(__dirname, '..', url.pathname);
        if (fs.existsSync(file) && fs.statSync(file).isFile()) {
          const type = url.pathname.endsWith('.wasm') ? 'application/wasm' :
            url.pathname.endsWith('.svg') ? 'image/svg+xml' : 'text/javascript';
          return route.fulfill({ status: 200, contentType: type, body: fs.readFileSync(file) });
        }
      }
      unexpectedRequests.push(url.pathname);
      return route.abort();
    });

    async function runLab(lab, sql) {
      if (sql !== null) await lab.locator('.lab__fallback').fill(sql);
      await lab.locator('[data-lab-run]').click();
      const handle = await lab.elementHandle();
      await page.waitForFunction(root => root.__lab && !root.__lab.running && root.__lab.lastOutcome, handle);
      return handle.evaluate(root => root.__lab.lastOutcome);
    }

    await page.goto('http://sql-lot1.invalid/b1-sql/atelier.html');
    const freeLab = page.locator('[data-lab]').first();
    await freeLab.locator('.lab__fallback').waitFor();
    assert.match(await freeLab.locator('.lab__fallback').inputValue(), /SELECT COUNT\(\*\) AS nb FROM Voiture/);
    const first = await runLab(freeLab, null);
    assert.equal(first.status, 'success');
    assert.match(await freeLab.locator('[data-lab-pane="out"]').textContent(), /nb[\s\S]*\| 23\s*\|/);
    const brands = await runLab(freeLab, 'SELECT COUNT(*) AS nb FROM Marque;');
    assert.equal(brands.status, 'success');
    assert.match(brands.stdout, /\| 12\s*\|/);
    const emptied = await runLab(freeLab, 'DELETE FROM Voiture; SELECT COUNT(*) AS nb FROM Voiture;');
    assert.equal(emptied.status, 'success');
    assert.match(emptied.stdout, /\| 0\s*\|/);
    const restored = await runLab(freeLab, 'SELECT COUNT(*) AS nb FROM Voiture;');
    assert.equal(restored.status, 'success');
    assert.match(restored.stdout, /\| 23\s*\|/);
    await freeLab.locator('[data-lab-stdin]').fill('');
    const blank = await runLab(freeLab, 'CREATE TABLE Exemple (id INTEGER); INSERT INTO Exemple VALUES (1); SELECT COUNT(*) AS nb FROM Exemple;');
    assert.equal(blank.status, 'success');
    assert.match(blank.stdout, /\| 1\s*\|/);

    await page.goto('http://sql-lot1.invalid/b1-sql/chapitres/chapitre1.html');
    const exercise = exercises.find(item => item.id === 'sq-c1-e1');
    const chapterLab = page.locator('[data-exercise="sq-c1-e1"]');
    await chapterLab.locator('.lab__fallback').waitFor();
    const example = await runLab(chapterLab, exercise.solution);
    assert.equal(example.status, 'success');
    assert.equal(example.stdout.trim(), exercise.examples[0].expected.trim());
    const sampleCount = await runLab(chapterLab, 'SELECT COUNT(*) AS nb FROM Voiture;');
    assert.equal(sampleCount.status, 'success');
    assert.match(sampleCount.stdout, /\| 6\s*\|/);
    assert.deepEqual(unexpectedRequests, []);
    await context.close();
  } finally {
    await browser.close();
  }
});

test('simulateur : une requête récursive bloquante est interrompue sans figer la page', { timeout: 30000 }, async () => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    const page = await browser.newPage();
    const atelier = course.render(kit)['atelier.html'];
    const html = '<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body>' +
      atelier.body + '<script src="/b1-sql/assets/vendor/sqljs/sql-wasm.js"></script>' +
      '<script src="/b1-sql/assets/js/sql-simulator.js"></script></body></html>';
    const resources = new Map([
      ['/b1-sql/assets/vendor/sqljs/sql-wasm.js', ['b1-sql/assets/vendor/sqljs/sql-wasm.js', 'text/javascript']],
      ['/b1-sql/assets/vendor/sqljs/sql-wasm.wasm', ['b1-sql/assets/vendor/sqljs/sql-wasm.wasm', 'application/wasm']],
      ['/b1-sql/assets/js/sql-simulator.js', ['b1-sql/assets/js/sql-simulator.js', 'text/javascript']],
      ['/b1-sql/assets/js/sql-simulator-worker.js', ['b1-sql/assets/js/sql-simulator-worker.js', 'text/javascript']],
      ['/assets/img/ui-icons.svg', ['assets/img/ui-icons.svg', 'image/svg+xml']]
    ]);
    await page.route('**/*', async route => {
      const url = new URL(route.request().url());
      if (url.origin !== 'http://sql-lot1.invalid') return route.abort();
      if (url.pathname === '/b1-sql/atelier.html') {
        return route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body: html });
      }
      const resource = resources.get(url.pathname);
      if (!resource || !fs.existsSync(path.join(__dirname, '..', resource[0]))) return route.abort();
      return route.fulfill({ status: 200, contentType: resource[1], body: fs.readFileSync(path.join(__dirname, '..', resource[0])) });
    });
    await page.goto('http://sql-lot1.invalid/b1-sql/atelier.html');
    await page.waitForFunction(() => document.getElementById('sqlsim-state').textContent.includes('prête'));
    assert.match(await page.locator('body').textContent(), /quatre secondes.*modifications précédentes sont perdues/i);
    async function run(sql) {
      await page.locator('#sqlsim-query').fill(sql);
      await page.locator('#sqlsim-run').click();
      await page.waitForFunction(() => /Exécution réussie|Erreur/.test(document.getElementById('sqlsim-state').textContent));
    }
    await run("BEGIN; UPDATE Voiture SET km = 4321 WHERE immat = 'TG-7854-Z';");
    await run("ROLLBACK; SELECT km FROM Voiture WHERE immat = 'TG-7854-Z';");
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '500');
    await run("UPDATE Voiture SET km = 7777 WHERE immat = 'TG-7854-Z'; SELECT km FROM Voiture WHERE immat = 'TG-7854-Z';");
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '7777');
    await page.locator('#sqlsim-query').fill('WITH RECURSIVE suite(n) AS (SELECT 1 UNION ALL SELECT n + 1 FROM suite) SELECT SUM(n) FROM suite;');
    page.locator('#sqlsim-run').click({ timeout: 2000 }).catch(() => {});
    let watchdog;
    const interrupted = await Promise.race([
      page.waitForFunction(() => /délai dépassé/i.test(document.getElementById('sqlsim-state').textContent), null, { timeout: 9000 }).then(() => true, () => false),
      new Promise(resolve => { watchdog = setTimeout(() => resolve(false), 10000); })
    ]);
    clearTimeout(watchdog);
    assert.equal(interrupted, true, 'Le navigateur doit rester réactif et signaler le délai dépassé.');
    assert.equal(await page.evaluate(() => document.querySelector('#sqlsim-query') !== null), true);
    await run("SELECT km FROM Voiture WHERE immat = 'TG-7854-Z';");
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '500');
    await run('PRAGMA foreign_keys;');
    assert.equal((await page.locator('#sqlsim-table tbody td').textContent()).trim(), '1');
  } finally {
    await Promise.race([browser.close(), new Promise(resolve => setTimeout(resolve, 2000))]);
  }
});

test('KaTeX contrôle les 13 pages SQL et ignore les blocs de code', { timeout: 60000 }, async diagnostic => {
  const browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  try {
    const page = await browser.newPage();
    await page.route('**/*', route => route.abort());
    await page.setContent('<!doctype html><html lang="fr"><head><meta charset="utf-8"></head><body></body></html>');
    await page.addScriptTag({ path: path.join(__dirname, '../assets/vendor/katex/katex.min.js') });
    await page.addScriptTag({ path: path.join(__dirname, '../assets/vendor/katex/auto-render.min.js') });
    const rendered = course.render(kit);
    let formulaCount = 0;
    for (const [name, definition] of Object.entries(rendered)) {
      let html = kit.page(course, name, definition);
      const match = /^chapitres\/chapitre(\d+)\.html$/.exec(name);
      html = match
        ? labs.finalizeChapter(html, course.id, Number(match[1]))
        : labs.finalizePage(html, kit.prefix(name) + 'atelier.html');
      const result = await page.evaluate(raw => {
        document.body.innerHTML = new DOMParser().parseFromString(raw, 'text/html').body.innerHTML;
        const codeBlocks = Array.from(document.querySelectorAll('pre, code'));
        const before = codeBlocks.map(element => element.innerHTML);
        renderMathInElement(document.body, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '\\[', right: '\\]', display: true },
            { left: '$', right: '$', display: false },
            { left: '\\(', right: '\\)', display: false }
          ],
          ignoredTags: ['script', 'noscript', 'style', 'textarea', 'pre', 'code'],
          throwOnError: true,
          errorCallback: (_message, error) => { throw error; }
        });
        return {
          formulas: document.querySelectorAll('.katex').length,
          modifiedCode: codeBlocks.some((element, index) => element.innerHTML !== before[index]),
          unknownTags: Array.from(document.querySelectorAll('*'))
            .filter(element => element instanceof HTMLUnknownElement).map(element => element.tagName)
        };
      }, kit.escapeUnknownTags(html));
      assert.equal(result.modifiedCode, false, name);
      assert.deepEqual(result.unknownTags, [], name);
      formulaCount += result.formulas;
    }
    assert.equal(Object.keys(rendered).length, 13);
    const canary = await page.evaluate(() => {
      document.body.innerHTML = '<p id="math">\\(1+2\\)</p><pre><code id="code">\\(1+2\\)</code></pre>';
      renderMathInElement(document.body, {
        delimiters: [{ left: '\\(', right: '\\)', display: false }],
        ignoredTags: ['pre', 'code'],
        throwOnError: true,
        errorCallback: (_message, error) => { throw error; }
      });
      return { formulaRendered: !!document.querySelector('#math .katex'), code: document.querySelector('#code').textContent };
    });
    assert.equal(canary.formulaRendered, true);
    assert.equal(canary.code, '\\(1+2\\)');
    diagnostic.diagnostic(`13 pages : ${formulaCount} expressions rendues ; blocs de code inchangés, témoin fonctionnel.`);
  } finally {
    await browser.close();
  }
});

}
