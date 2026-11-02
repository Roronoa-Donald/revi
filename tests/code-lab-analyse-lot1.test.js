'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const project = path.join(__dirname, '..');
assert.deepEqual(fs.readdirSync(project).filter(name => /^\.env(?:\.|$)/.test(name)), []);
for (const name of ['JWT_SECRET', 'DATABASE_URL', 'PISTON_URL', 'PISTON_API_KEY', 'OANOR_BASE_URL', 'OANOR_API_KEY', 'OPENROUTER_API_KEY', 'PREPARATION_PASSWORD']) {
  assert.equal(process.env[name], undefined, `${name} ne doit pas être transmis au test isolé`);
}
assert.equal(fs.readFileSync('/proc/net/route', 'utf8').trim().split('\n').length, 1, 'aucune route réseau dans le confinement');

const { chromium } = require('playwright-core');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const catalogue = require('../server/exercises');
const budget = require('../server/services/execution/budget');
const execution = require('../server/services/execution');

const origin = 'http://code-lab-lot1.invalid';
const chapter = '/b3-pfsense/chapitres/chapitre2.html';
const secret = 'code-lab-analyse-test-secret';
const userId = 'code-lab-analyse-test';
const controlPage = `<!doctype html><html lang="fr"><meta charset="utf-8"><body>
  <div id="analyse-libre" data-lab data-language="analyse">
    <script type="text/plain" data-lab-starter>[Cas 1 — Brouillon]\nA_COMPLETER</script>
  </div>
  <div id="analyse-suspendue" data-lab data-exercise="pf3-c2-e1" data-language="analyse" data-grading-suspended="1">
    <script type="text/plain" data-lab-starter>[Cas 1 — Test]\nréponse</script>
  </div>
  <div id="executable-suspendu" data-lab data-exercise="sq-c1-e1" data-language="sql" data-grading-suspended="1">
    <script type="text/plain" data-lab-starter>SELECT 1;</script>
  </div>
  <div id="executable-actif" data-lab data-exercise="pf3-c2-e1" data-language="python">
    <script type="text/plain" data-lab-starter>print(1)</script>
  </div>
  <div id="executable-reel" data-lab data-exercise="lx-c1-e2" data-language="shell">
    <script type="text/plain" data-lab-starter>echo 1</script>
  </div>
  <script src="/assets/js/code-lab.js"></script>
</body></html>`;

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

function solutionAnswers(exercise) {
  const answers = exercise.solution.split(/(?=^\[Cas \d+ — )/m).slice(1)
    .map(section => section.slice(section.indexOf('\n') + 1).trim());
  const placeholders = exercise.starter.match(/A_COMPLETER/g) || [];
  assert.equal(answers.length, exercise.tests.length, exercise.id);
  assert.equal(placeholders.length, answers.length, exercise.id);
  return answers;
}

function studentAnswer(exercise) {
  const answers = solutionAnswers(exercise);
  let index = 0;
  return exercise.starter.replace(/A_COMPLETER/g, () => answers[index++]);
}

async function harness(testContext, url = chapter) {
  const previousSecret = process.env.JWT_SECRET;
  process.env.JWT_SECRET = secret;
  budget.reset();
  const app = buildApp({ logger: false });
  let browser;
  const state = { posts: [], blocked: [], errors: [], gate: null };
  testContext.after(async () => {
    if (state.gate) state.gate.release.resolve();
    if (browser) await browser.close();
    await app.close();
    budget.reset();
    if (previousSecret === undefined) delete process.env.JWT_SECRET;
    else process.env.JWT_SECRET = previousSecret;
  });

  browser = await chromium.launch({
    executablePath: process.env.CHROME_BIN || '/usr/bin/chromium',
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  const context = await browser.newContext({ serviceWorkers: 'block' });
  const token = jwt.sign({ userId }, secret);
  await context.addCookies([{ name: 'auth_token', value: token, url: origin, httpOnly: true, sameSite: 'Lax' }]);
  const page = await context.newPage();
  page.on('pageerror', error => state.errors.push(error.message));
  await page.route('**/*', async route => {
    const request = route.request();
    const address = new URL(request.url());
    if (address.origin !== origin) {
      state.blocked.push(address.origin);
      return route.abort();
    }
    if (address.pathname === '/api/exercise/submit') {
      const payload = request.postDataJSON();
      const headers = await request.allHeaders();
      const entry = { exerciseId: payload.exerciseId, code: payload.code, authenticated: Boolean(headers.cookie) };
      state.posts.push(entry);
      const gate = state.gate;
      if (gate) {
        gate.arrived.resolve();
        await gate.release.promise;
      }
      const response = await app.inject({
        method: request.method(),
        url: address.pathname,
        headers: { 'content-type': 'application/json', cookie: headers.cookie || '' },
        payload: request.postData()
      });
      entry.status = response.statusCode;
      entry.body = response.json();
      return route.fulfill({ status: response.statusCode, contentType: 'application/json', body: response.body });
    }
    if (address.pathname === '/controls.html') {
      return route.fulfill({ contentType: 'text/html; charset=utf-8', body: controlPage });
    }
    if (address.pathname === chapter && process.env.CODE_LAB_TEST_PAGE) {
      return route.fulfill({ contentType: 'text/html; charset=utf-8', body: fs.readFileSync(process.env.CODE_LAB_TEST_PAGE) });
    }
    if (address.pathname === '/assets/js/code-lab.js') {
      const asset = process.env.CODE_LAB_TEST_ASSET || path.join(project, 'assets/js/code-lab.js');
      return route.fulfill({ contentType: 'text/javascript; charset=utf-8', body: fs.readFileSync(asset) });
    }
    if (address.pathname.startsWith('/assets/vendor/monaco/')) return route.abort();
    const relative = address.pathname.replace(/^\/+/, '');
    if (relative === chapter.slice(1) || relative.startsWith('assets/') || relative.startsWith('b3-pfsense/assets/')) {
      const file = path.resolve(project, relative);
      if (file.startsWith(project + path.sep) && fs.existsSync(file) && fs.statSync(file).isFile()) {
        const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml' };
        return route.fulfill({ contentType: types[path.extname(file)] || 'application/octet-stream', body: fs.readFileSync(file) });
      }
    }
    return route.fulfill({ status: 404, body: '' });
  });
  await page.goto(origin + url, { waitUntil: 'load' });
  return { app, browser, context, page, state, token };
}

async function fillAnalysis(lab, answer) {
  await lab.locator('[data-lab-mode]').click();
  await lab.locator('.lab__raw-textarea').fill(answer);
  await lab.locator('[data-lab-mode]').click();
}

async function submitAnalysis(environment, lab, exerciseId, activate) {
  const gate = { arrived: deferred(), release: deferred() };
  const before = environment.state.posts.length;
  environment.state.gate = gate;
  const pageError = environment.page.waitForEvent('pageerror', { timeout: 10000 })
    .then(error => ({ kind: 'error', message: error.message }))
    .catch(error => ({ kind: 'timeout', message: error.message }));
  try {
    const outcomePromise = Promise.race([
      gate.arrived.promise.then(() => ({ kind: 'request' })),
      pageError
    ]);
    if (activate) await activate();
    else await lab.locator('[data-lab-submit]').click();
    const outcome = await outcomePromise;
    assert.equal(outcome.kind, 'request',
      `${exerciseId} : ${outcome.message || outcome.kind} ; ${environment.state.posts.length - before} requête(s) de correction`);
    assert.equal(await lab.locator('[data-lab-run]').count(), 0);
    assert.equal(await lab.locator('[data-lab-stop]').count(), 0);
    assert.equal(await lab.locator('[data-lab-submit]').isDisabled(), true);
    assert.equal(await lab.locator('[data-lab-reset]').isDisabled(), true);
    await lab.evaluate(root => root.__lab.submit());
    await environment.page.waitForTimeout(30);
    assert.equal(environment.state.posts.length, before + 1, 'pas de seconde soumission pendant la correction');
  } finally {
    environment.state.gate = null;
    gate.release.resolve();
  }
  const handle = await lab.elementHandle();
  await environment.page.waitForFunction(root => !root.__lab.running, handle, { timeout: 10000 });
  assert.equal(await lab.locator('[data-lab-submit]').isDisabled(), false);
  assert.equal(await lab.locator('[data-lab-reset]').isDisabled(), false);
  return environment.state.posts[before];
}

test('Chromium : la grille libre est un brouillon sans vérification automatique', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext, '/controls.html');
  const lab = environment.page.locator('#analyse-libre');
  await lab.locator('[data-lab-mode]').waitFor();
  assert.equal(await lab.locator('[data-lab-run]').count(), 0);
  assert.equal(await lab.locator('[data-lab-submit]').count(), 0);
  assert.match(await lab.locator('[data-lab-status]').innerText(), /brouillon.*sans vérification automatique/i);
  assert.match(await lab.locator('.lab__formative-notice').innerText(), /ni exécuté ni corrigé/i);
  await lab.locator('.lab__case-input').fill('Moyenne : 4');
  await environment.page.waitForFunction(() => Object.keys(localStorage).some(key =>
    key.includes('libre:analyse') && localStorage.getItem(key).includes('Moyenne : 4')));
  await environment.page.reload();
  assert.equal(await lab.locator('.lab__case-input').inputValue(), 'Moyenne : 4');
  assert.deepEqual(environment.state.errors, []);
});

for (const exerciseId of ['pf3-c2-e1', 'pf3-c2-e3']) {
  test(`Chromium : ${exerciseId} vérifie les réponses avec la route réelle`, { timeout: 60000 }, async testContext => {
    const environment = await harness(testContext);
    const exercise = catalogue.getExercise(exerciseId);
    assert.equal(exercise.language, 'analyse');
    assert.equal(exercise.tests.length, 3);
    const lab = environment.page.locator(`[data-exercise="${exerciseId}"]`);
    await lab.locator('[data-lab-mode]').waitFor();
    const answer = studentAnswer(exercise);
    await fillAnalysis(lab, answer);
    assert.equal(await lab.locator('.lab__case').count(), 3);
    const result = await submitAnalysis(environment, lab, exerciseId);
    assert.equal(result.authenticated, true);
    assert.equal(result.status, 200);
    assert.equal(result.body.passed, 3);
    assert.equal(result.body.total, 3);
    assert.equal(result.body.stop, null);
    assert.equal(await lab.locator('.lab__case--ok').count(), 3);
    const status = await lab.locator('[data-lab-status]').innerText();
    assert.match(status, /Vérification formative/);
    assert.match(status, /Ce retour ne donne pas de note/);
    testContext.diagnostic(`${exerciseId} : HTTP ${result.status}, ${result.body.passed}/${result.body.total}, 3 cas affichés validés`);

    if (exerciseId === 'pf3-c2-e3') {
      const wrong = answer.replace(
        'STATE_DIAG id=41 proto=tcp state=SYN_SENT alert=HEALTHY_SESSION',
        'STATE_DIAG id=41 proto=tcp state=SYN_SENT alert=HALF_OPEN_ATTACK_SUSPECT'
      );
      assert.notEqual(wrong, answer);
      await fillAnalysis(lab, wrong);
      const rejected = await submitAnalysis(environment, lab, exerciseId);
      assert.equal(rejected.status, 200);
      assert.equal(rejected.body.passed, 1);
      assert.equal(rejected.body.total, 3);
      assert.equal(rejected.body.stop.reason, 'wrong_output');
      assert.equal(await lab.locator('.lab__case--ko').count(), 1);
      const rejectedStatus = await lab.locator('[data-lab-status]').innerText();
      assert.match(rejectedStatus, /Vérification formative : une réponse est à revoir/);
      assert.match(rejectedStatus, /Ce retour ne donne pas de note/);
      testContext.diagnostic(`${exerciseId}, seuil erroné : HTTP ${rejected.status}, ${rejected.body.passed}/${rejected.body.total}, ${rejected.body.stop.reason}`);
    } else {
      const used = budget.snapshot(`u:${userId}`).used;
      await environment.context.clearCookies();
      const denied = await submitAnalysis(environment, lab, exerciseId);
      assert.equal(denied.authenticated, false);
      assert.equal(denied.status, 401);
      assert.equal(budget.snapshot(`u:${userId}`).used, used);
      assert.match(await lab.locator('[data-lab-status]').innerText(), /Authentification requise/);
      testContext.diagnostic(`${exerciseId}, sans compte : HTTP ${denied.status}, quota inchangé`);
    }
    assert.deepEqual(environment.state.errors, []);
  });
}

test('Formulaire multiligne pf3-c2-e1 : validation sans Mode texte', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext);
  const exercise = catalogue.getExercise('pf3-c2-e1');
  const answers = solutionAnswers(exercise);
  const lab = environment.page.locator('[data-exercise="pf3-c2-e1"]');
  const inputs = lab.locator('.lab__case-input');
  await inputs.first().waitFor();
  for (const [index, answer] of answers.entries()) await inputs.nth(index).fill(answer);
  const values = await inputs.evaluateAll(elements => elements.map(element => element.value));
  const result = await submitAnalysis(environment, lab, exercise.id);
  testContext.diagnostic(`pf3-c2-e1, première réponse : ${JSON.stringify(values[0])} ; HTTP ${result.status}, ${result.body.passed}/${result.body.total}, ${result.body.stop ? result.body.stop.reason : 'validé'}`);
  assert.equal(result.status, 200);
  assert.equal(result.body.passed, 3);
  assert.equal(result.body.total, 3);
  assert.equal(result.body.stop, null);
  assert.deepEqual(values, answers);
  assert.ok(result.code.includes(answers[0]), 'les retours à la ligne sont transmis à la route');
  assert.equal(await lab.locator('.lab__case--ok').count(), 3);
  assert.deepEqual(environment.state.errors, []);
});

test('Formulaire : saisie au clavier, raccourcis et étiquettes accessibles', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext);
  const exercise = catalogue.getExercise('pf3-c2-e1');
  const lab = environment.page.locator('[data-exercise="pf3-c2-e1"]');
  const inputs = lab.locator('.lab__case-input');
  const first = inputs.first();
  await first.waitFor();
  assert.equal(await lab.getByRole('textbox', { name: 'Votre réponse pour le Cas 1' }).count(), 1);
  assert.equal(await first.evaluate(element => element.tagName), 'TEXTAREA');
  const descriptionId = await first.getAttribute('aria-describedby');
  assert.ok(descriptionId);
  const description = await environment.page.locator(`[id="${descriptionId}"]`).innerText();
  assert.match(description, /Entrée.*ligne/);
  assert.match(description, /Ctrl.*Entrée/);
  await first.focus();
  assert.notEqual(await first.evaluate(element => getComputedStyle(element).boxShadow), 'none');
  await environment.page.keyboard.press('Tab');
  assert.equal(await inputs.nth(1).evaluate(element => document.activeElement === element), true);

  await first.fill('premiere');
  const compositionNotCancelled = await first.evaluate(element => element.dispatchEvent(new KeyboardEvent('keydown', {
    key: 'Enter', ctrlKey: true, isComposing: true, bubbles: true, cancelable: true
  })));
  assert.equal(compositionNotCancelled, true);
  await first.press('Enter');
  await first.pressSequentially('deuxieme');
  await first.press('Shift+Enter');
  await first.pressSequentially('troisieme');
  assert.equal(await first.inputValue(), 'premiere\ndeuxieme\ntroisieme');
  assert.equal(environment.state.posts.length, 0, 'Entrée ne doit pas soumettre pendant la saisie');

  const mode = lab.locator('[data-lab-mode]');
  await mode.focus();
  await environment.page.keyboard.press('Enter');
  assert.equal(await mode.evaluate(element => document.activeElement === element), true);
  const raw = lab.getByRole('textbox', { name: 'Grille d’analyse brute' });
  assert.ok((await raw.inputValue()).includes('premiere\ndeuxieme\ntroisieme'));
  await environment.page.keyboard.press('Space');
  assert.equal(await mode.evaluate(element => document.activeElement === element), true);
  assert.equal(await first.inputValue(), 'premiere\ndeuxieme\ntroisieme');

  const answers = solutionAnswers(exercise);
  for (const [index, answer] of answers.entries()) await inputs.nth(index).fill(answer);
  const controlResult = await submitAnalysis(environment, lab, exercise.id, () => first.press('Control+Enter'));
  assert.equal(controlResult.status, 200);
  assert.equal(controlResult.body.passed, 3);
  const metaResult = await submitAnalysis(environment, lab, exercise.id, () => first.press('Meta+Enter'));
  assert.equal(metaResult.status, 200);
  assert.equal(metaResult.body.passed, 3);

  const singleExercise = catalogue.getExercise('pf3-c2-e3');
  const singleLab = environment.page.locator('[data-exercise="pf3-c2-e3"]');
  const singleInputs = singleLab.locator('.lab__case-input');
  const singleAnswers = solutionAnswers(singleExercise);
  assert.equal(singleAnswers[0].includes('\n'), false);
  assert.equal(singleAnswers[2].includes('\n'), false);
  for (const [index, answer] of singleAnswers.entries()) await singleInputs.nth(index).fill(answer);
  const buttonResult = await submitAnalysis(environment, singleLab, singleExercise.id,
    () => singleLab.locator('[data-lab-submit]').press('Enter'));
  assert.equal(buttonResult.status, 200);
  assert.equal(buttonResult.body.passed, 3);
  assert.deepEqual(environment.state.errors, []);
  testContext.diagnostic('Entrée et Maj+Entrée : lignes conservées ; modes au clavier avec focus conservé ; Ctrl/Cmd+Entrée et bouton : 3/3');
});

test('Formulaire : brouillons historiques, lignes vides et passage entre modes', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext);
  const exercise = catalogue.getExercise('pf3-c2-e1');
  const lab = environment.page.locator('[data-exercise="pf3-c2-e1"]');
  await lab.locator('.lab__case-input').first().waitFor();
  const key = await lab.evaluate(root => root.__lab.storageKey());
  const legacyValues = ['\\=ancienne réponse < & >', 'première ligne\ndeuxième ligne', 'réponse unique'];
  let index = 0;
  const legacyDraft = exercise.starter.replace(/A_COMPLETER/g, () => legacyValues[index++]);
  await environment.page.evaluate(({ storageKey, draft }) => localStorage.setItem(storageKey, draft), { storageKey: key, draft: legacyDraft });
  await environment.page.reload({ waitUntil: 'load' });
  const inputs = lab.locator('.lab__case-input');
  await inputs.first().waitFor();
  assert.deepEqual(await inputs.evaluateAll(elements => elements.map(element => element.value)), legacyValues);

  const multiline = '\npremière ligne\n\n  \ndeuxième ligne\n\n';
  const lastMultiline = 'réponse unique\n';
  const blankOnly = '\n  \n';
  await inputs.nth(0).fill(blankOnly);
  await inputs.nth(1).fill(multiline);
  await inputs.nth(2).fill(lastMultiline);
  await environment.page.reload({ waitUntil: 'load' });
  await inputs.first().waitFor();
  assert.equal(await inputs.nth(1).inputValue(), multiline);
  assert.equal(await inputs.nth(0).inputValue(), blankOnly);
  assert.equal(await inputs.nth(2).inputValue(), lastMultiline);
  await lab.locator('[data-lab-mode]').click();
  const raw = lab.locator('.lab__raw-textarea');
  const rawText = await raw.inputValue();
  assert.ok(rawText.includes(multiline));
  const edited = multiline + 'troisième ligne\n';
  await raw.fill(rawText.replace(multiline, edited));
  await lab.locator('[data-lab-mode]').click();
  assert.equal(await inputs.nth(0).inputValue(), blankOnly);
  assert.equal(await inputs.nth(1).inputValue(), edited);
  assert.equal(await inputs.nth(2).inputValue(), lastMultiline);
  await environment.page.reload({ waitUntil: 'load' });
  await inputs.first().waitFor();
  assert.equal(await inputs.nth(1).inputValue(), edited);
  await lab.locator('[data-lab-reset]').click();
  assert.deepEqual(await inputs.evaluateAll(elements => elements.map(element => element.value)), ['', '', '']);
  assert.equal(await environment.page.evaluate(storageKey => localStorage.getItem(storageKey), key), null);
  assert.deepEqual(environment.state.errors, []);
  testContext.diagnostic('brouillon ancien restauré ; lignes initiales, finales et vides conservées au rechargement et entre modes ; réinitialisation vérifiée');
});

test('Formulaire : les lignes réservées restent des réponses au rechargement et à la correction', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext);
  const lab = environment.page.locator('[data-exercise="pf3-c2-e1"]');
  const inputs = lab.locator('.lab__case-input');
  await inputs.first().waitFor();
  const answer = 'avant\n# détail\nA_COMPLETER\n[Cas 9 — contenu]\n\\=littéral\naprès';
  await inputs.first().fill(answer);
  await environment.page.reload({ waitUntil: 'load' });
  await inputs.first().waitFor();
  assert.equal(await inputs.first().inputValue(), answer);

  await lab.locator('[data-lab-mode]').click();
  const raw = lab.getByRole('textbox', { name: 'Grille d’analyse brute' });
  const text = await raw.inputValue();
  assert.match(text, /^# Format REVI-ANALYSE:1\n/);
  assert.ok(text.includes('\\=# détail'));
  assert.ok(text.includes('\\=[Cas 9 — contenu]'));
  await raw.fill(text.replace('# Format REVI-ANALYSE:1\n', ''));
  await lab.locator('[data-lab-mode]').click();
  assert.equal(await raw.count(), 1);
  assert.match(await lab.locator('[data-lab-status]').innerText(), /format/i);
  await raw.fill(text.replace('après', 'après modification'));
  await lab.locator('[data-lab-mode]').click();
  const editedAnswer = answer.replace('après', 'après modification');
  assert.equal(await inputs.first().inputValue(), editedAnswer);
  const result = await submitAnalysis(environment, lab, 'pf3-c2-e1');
  assert.equal(result.status, 200);
  assert.equal(result.body.stop.reason, 'wrong_output');
  assert.equal(result.body.stop.actual, editedAnswer);
  assert.equal(Object.hasOwn(result.body.stop, 'expected'), false);
  const report = await lab.getByRole('region', { name: 'Résultat de la correction' }).innerText();
  assert.match(report, /vérifiez/i);
  assert.doesNotMatch(report, /Sortie attendue/i);
  assert.deepEqual(environment.state.errors, []);
});

test('le format historique ne décode pas les préfixes littéraux', async () => {
  const result = await execution.execute({
    language: 'analyse', code: '[Cas 1]\n\\=littéral\n', stdin: 'cas:1'
  });
  assert.equal(result.ok, true);
  assert.equal(result.stdout, '\\=littéral');
});

test('une grille brute mal formée reste récupérable et ne peut pas être envoyée', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext);
  const lab = environment.page.locator('[data-exercise="pf3-c2-e1"]');
  const mode = lab.locator('[data-lab-mode]');
  await lab.locator('.lab__case-input').first().waitFor();
  await mode.click();
  const raw = lab.getByRole('textbox', { name: 'Grille d’analyse brute' });
  const original = await raw.inputValue();
  const damaged = original.replace(/\[Cas 2[^\n]*\]/, '[En-tête modifié]');
  assert.notEqual(damaged, original);
  await raw.fill(damaged);
  await mode.click();
  assert.equal(await raw.count(), 1);
  assert.equal(await raw.inputValue(), damaged);
  assert.match(await lab.locator('[data-lab-status]').innerText(), /en-têtes des cas/i);
  await lab.locator('[data-lab-submit]').click();
  assert.equal(environment.state.posts.length, 0);

  await environment.page.reload({ waitUntil: 'load' });
  await raw.waitFor();
  assert.equal(await raw.inputValue(), damaged);
  assert.match(await lab.locator('[data-lab-status]').innerText(), /brouillon/i);
  await raw.fill(original);
  await mode.click();
  assert.equal(await lab.locator('.lab__case-input').count(), 3);
  assert.deepEqual(environment.state.errors, []);
});

test('Chromium : la route réelle masque un cas caché et propose un exemple pour déboguer', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext, '/controls.html');
  const originalExecute = execution.execute;
  execution.execute = async ({ stdin }) => ({
    ok: true, status: 'success', stdout: `SORTIE_PRIVEE_UNIQUE ${stdin}`, stderr: 'ERREUR_PRIVEE_UNIQUE'
  });
  try {
    const lab = environment.page.locator('#executable-reel');
    await lab.locator('[data-lab-submit]').waitFor();
    await lab.locator('[data-lab-submit]').click();
    await environment.page.waitForFunction(() => {
      const root = document.querySelector('#executable-reel');
      return root && root.__lab && !root.__lab.reportEl.hidden;
    });
    assert.equal(environment.state.posts.length, 1);
    const result = environment.state.posts[0];
    assert.equal(result.status, 200);
    assert.equal(result.body.stop.hidden, true);
    assert.equal(result.body.stop.reason, 'wrong_output');
    assert.doesNotMatch(JSON.stringify(result.body), /SORTIE_PRIVEE_UNIQUE|ERREUR_PRIVEE_UNIQUE/);
    const reportRegion = lab.getByRole('region', { name: 'Résultat de la correction' });
    const report = await reportRegion.innerText();
    assert.match(report, /données.+cachées/i);
    assert.match(report, /exemple/i);
    assert.doesNotMatch(report, /Sortie attendue|Votre sortie|SORTIE_PRIVEE_UNIQUE|ERREUR_PRIVEE_UNIQUE/i);
    await environment.page.route('**/api/code-help', route => route.fulfill({
      status: 200, contentType: 'application/json',
      body: JSON.stringify({ explanation: 'Vérifiez votre raisonnement.' })
    }));
    const helpRequest = environment.page.waitForRequest(request =>
      request.method() === 'POST' && new URL(request.url()).pathname === '/api/code-help');
    await lab.locator('[data-lab-report-help]').click();
    const help = (await helpRequest).postDataJSON();
    assert.equal(help.status, 'wrong_output');
    assert.equal(help.expected, '');
    assert.equal(help.actual, '');
    assert.doesNotMatch(JSON.stringify(help), /SORTIE_PRIVEE_UNIQUE|ERREUR_PRIVEE_UNIQUE/);
    assert.deepEqual(environment.state.errors, []);
  } finally {
    execution.execute = originalExecute;
  }
});

test('le compte rendu explique les tests cachés sans afficher de diagnostic vide', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext, '/controls.html');
  const executable = environment.page.locator('#executable-actif');
  await executable.locator('[data-lab-submit]').waitFor();
  const reports = await executable.evaluate(root => {
    const lab = root.__lab;
    return ['wrong_output', 'compile_error', 'runtime_error'].map(reason => {
      const stop = { reason, testIndex: 0, label: 'Test caché 1', hidden: true };
      lab.renderReport({ total: 2, passed: 0, results: [{ label: 'Test caché 1', ok: false }], stop });
      lab.lastOutcome = { stop, status: reason };
      lab.refreshHelpState();
      return { reason, text: lab.reportEl.innerText, helpEnabled: !lab.controls.help.disabled };
    });
  });
  for (const report of reports) {
    assert.match(report.text, /données.+cachées/i, report.reason);
    assert.match(report.text, /exemple/i, report.reason);
    assert.doesNotMatch(report.text, /Sortie attendue|Votre sortie|\(aucune\)|\(vide\)/i, report.reason);
    assert.equal(report.helpEnabled, true, report.reason);
  }
  assert.deepEqual(environment.state.errors, []);
});

test('le compte rendu distingue un exemple affiché d’un test caché', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext, '/controls.html');
  const executable = environment.page.locator('#executable-actif');
  await executable.locator('[data-lab-submit]').waitFor();
  const reports = await executable.evaluate(root => {
    const lab = root.__lab;
    return ['wrong_output', 'compile_error', 'runtime_error'].map(reason => {
      const stop = { reason, testIndex: 2, label: 'Exemple affiché', example: true };
      lab.renderReport({ total: 3, passed: 2, results: [{ label: 'Exemple affiché', ok: false }], stop });
      lab.lastOutcome = { stop, status: reason };
      lab.refreshHelpState();
      return { reason, text: lab.reportEl.innerText, helpEnabled: !lab.controls.help.disabled };
    });
  });
  for (const report of reports) {
    assert.match(report.text, /exemple/i, report.reason);
    assert.doesNotMatch(report.text, /données.+cachées|Sortie attendue|Votre sortie|\(aucune\)|\(vide\)/i, report.reason);
    assert.equal(report.helpEnabled, true, report.reason);
  }
  assert.deepEqual(environment.state.errors, []);
});

test('contrôles occupés et suspension restent fail-closed', { timeout: 60000 }, async testContext => {
  const environment = await harness(testContext, '/controls.html');
  for (const selector of ['#analyse-suspendue', '#executable-suspendu']) {
    const lab = environment.page.locator(selector);
    await lab.locator('[data-lab-submit]').waitFor();
    assert.equal(await lab.locator('[data-lab-submit]').isDisabled(), true);
    const states = await lab.evaluate(root => {
      const instance = root.__lab;
      instance.controls.submit.disabled = false;
      instance.submit();
      const afterSubmit = instance.running;
      instance.setBusy(true, 'Correction…');
      const during = { running: instance.running, submitDisabled: instance.controls.submit.disabled, resetDisabled: instance.controls.reset.disabled };
      instance.setBusy(false);
      const after = { running: instance.running, submitDisabled: instance.controls.submit.disabled, resetDisabled: instance.controls.reset.disabled };
      return { afterSubmit, during, after };
    });
    assert.equal(states.afterSubmit, false, selector);
    assert.deepEqual(states.during, { running: true, submitDisabled: true, resetDisabled: true }, selector);
    assert.deepEqual(states.after, { running: false, submitDisabled: true, resetDisabled: false }, selector);
  }
  await environment.page.locator('#analyse-suspendue .lab__case-input').press('Control+Enter');
  const executable = environment.page.locator('#executable-actif');
  await executable.locator('[data-lab-run]').waitFor();
  const states = await executable.evaluate(root => {
    const instance = root.__lab;
    instance.setBusy(true, 'Exécution…');
    const during = {
      runDisabled: instance.controls.run.disabled,
      runLabel: instance.controls.run.textContent,
      stopHidden: instance.controls.stop.hidden,
      submitDisabled: instance.controls.submit.disabled,
      resetDisabled: instance.controls.reset.disabled
    };
    instance.setBusy(false);
    const after = {
      runDisabled: instance.controls.run.disabled,
      runLabel: instance.controls.run.textContent,
      stopHidden: instance.controls.stop.hidden,
      stopDisabled: instance.controls.stop.disabled,
      submitDisabled: instance.controls.submit.disabled,
      resetDisabled: instance.controls.reset.disabled
    };
    return { during, after };
  });
  assert.deepEqual(states.during, { runDisabled: true, runLabel: 'Exécution…', stopHidden: false, submitDisabled: true, resetDisabled: true });
  assert.deepEqual(states.after, { runDisabled: false, runLabel: 'Exécuter', stopHidden: true, stopDisabled: true, submitDisabled: false, resetDisabled: false });
  await environment.page.waitForTimeout(30);
  assert.equal(environment.state.posts.length, 0);
  assert.deepEqual(environment.state.errors, []);

  const originalExecute = execution.execute;
  let calls = 0;
  execution.execute = async () => { calls++; throw new Error('exécution interdite'); };
  try {
    const response = await environment.app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      cookies: { auth_token: environment.token },
      payload: { exerciseId: 'sq-c1-e1', code: 'SELECT 1;' }
    });
    assert.equal(response.statusCode, 503);
    assert.equal(response.json().status, 'grading_suspended');
    assert.equal(calls, 0);
    assert.equal(budget.snapshot(`u:${userId}`).used, 0);
    testContext.diagnostic('suspension SQL : HTTP 503, aucune exécution ni consommation de quota ; aucun POST depuis les contrôles suspendus');
  } finally {
    execution.execute = originalExecute;
  }
});

}
