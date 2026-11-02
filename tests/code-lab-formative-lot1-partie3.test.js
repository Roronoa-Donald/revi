'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const { chromium } = require('playwright-core');
const catalogue = require('../server/exercises');
const courseConfig = require('../server/exercises/course-config');
const { renderSection } = require('../scripts/generate-code-labs');

const root = path.resolve(__dirname, '..');
const origin = 'http://formation.invalid';
const browserPath = process.env.CHROME_BIN || '/usr/bin/chromium';

function attribute(node, name) {
  const entry = (node.attrs || []).find(item => item.name === name);
  return entry && entry.value;
}

function descendants(node, predicate) {
  const matches = [];
  function visit(current) {
    if (predicate(current)) matches.push(current);
    for (const child of current.childNodes || []) visit(child);
  }
  visit(node);
  return matches;
}

function hasClass(node, name) {
  return String(attribute(node, 'class') || '').split(/\s+/).includes(name);
}

function text(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(text).join('');
}

function labs(document, exerciseId) {
  return descendants(document, node => attribute(node, 'data-exercise') === exerciseId);
}

function nextElement(node) {
  const siblings = node.parentNode.childNodes;
  return siblings.slice(siblings.indexOf(node) + 1).find(sibling => sibling.tagName);
}

function fixture(markup) {
  return '<!doctype html><html lang="fr"><head><meta charset="utf-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1">' +
    '<link rel="stylesheet" href="/assets/css/tokens.css">' +
    '<link rel="stylesheet" href="/assets/css/code-lab.css">' +
    '</head><body><main>' + markup + '</main><script src="/assets/js/code-lab.js"></script></body></html>';
}

function deferred() {
  let resolve;
  const promise = new Promise(done => { resolve = done; });
  return { promise, resolve };
}

async function browserHarness(testContext, options = {}) {
  const browser = await chromium.launch({
    executablePath: browserPath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--disable-background-networking']
  });
  testContext.after(() => browser.close());
  const context = await browser.newContext({
    serviceWorkers: 'block',
    javaScriptEnabled: options.javaScriptEnabled !== false,
    viewport: { width: 1280, height: 900 }
  });
  await context.addInitScript(() => {
    window.ExecutionRouter = function () {
      this.getProvenanceInfo = function () {
        return { mode: 'server', label: 'Serveur', title: 'Serveur', icon: 'cloud' };
      };
    };
  });
  const page = await context.newPage();
  const state = { responses: [], requests: [], errors: [] };
  page.on('pageerror', error => state.errors.push(error.message));
  const analysis = renderSection('b3-pfsense', 2);
  const code = renderSection('b1-linux', 1);
  const suspended = '<div class="lab" data-lab data-exercise="suspendu" data-language="analyse" data-grading-suspended="1">' +
    '<script type="text/plain" data-lab-starter>[Cas 1 — Exemple]\nA_COMPLETER</script>' +
    '<p id="suspendu-grading-notice">Correction temporairement suspendue.</p></div>';
  const pages = {
    '/analyse.html': fixture(analysis),
    '/code.html': fixture(code),
    '/suspendu.html': fixture(suspended),
    '/ancienne.html': fs.readFileSync(path.join(root, 'b3-pfsense/chapitres/chapitre2.html'), 'utf8')
  };
  const assets = {
    '/assets/css/tokens.css': ['assets/css/tokens.css', 'text/css'],
    '/assets/css/code-lab.css': ['assets/css/code-lab.css', 'text/css'],
    '/assets/js/code-lab.js': ['assets/js/code-lab.js', 'text/javascript']
  };
  await page.route('**/*', async route => {
    const request = route.request();
    const address = new URL(request.url());
    if (address.origin !== origin) return route.abort();
    if (address.pathname === '/api/exercise/submit') {
      state.requests.push(request.postDataJSON());
      const response = state.responses.shift();
      if (!response) return route.fulfill({ status: 500, body: '{}' });
      if (response.gate) {
        response.gate.arrived.resolve();
        await response.gate.release.promise;
      }
      return route.fulfill({
        status: response.status || 200,
        contentType: 'application/json',
        body: JSON.stringify(response.body)
      });
    }
    if (pages[address.pathname]) {
      return route.fulfill({ contentType: 'text/html; charset=utf-8', body: pages[address.pathname] });
    }
    const asset = assets[address.pathname];
    if (asset) {
      return route.fulfill({ contentType: asset[1], body: fs.readFileSync(path.join(root, asset[0])) });
    }
    return route.abort();
  });
  return { browser, context, page, state };
}

async function waitForSubmission(page, lab) {
  const element = await lab.elementHandle();
  await page.waitForFunction(current => !current.__lab.running, element, { timeout: 10000 });
}

function contrast(foreground, background, surface) {
  function components(value) {
    const numbers = value.match(/[\d.]+/g).map(Number);
    return [numbers[0], numbers[1], numbers[2], numbers.length > 3 ? numbers[3] : 1];
  }
  function luminance(color) {
    const linear = color.slice(0, 3).map(channel => {
      const value = channel / 255;
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  }
  const front = components(foreground);
  const back = components(background);
  const base = components(surface);
  const composed = back.map((channel, index) => index < 3
    ? channel * back[3] + base[index] * (1 - back[3]) : 1);
  const levels = [luminance(front), luminance(composed)].sort((first, second) => second - first);
  return (levels[0] + 0.05) / (levels[1] + 0.05);
}

test('les 830 analyses utilisent le composant et le nouveau gabarit ne rend que l’entrée d’exemple', testContext => {
  const exercises = catalogue.listExercises().filter(exercise => exercise.language === 'analyse');
  assert.equal(exercises.length, 830);
  const chapters = new Map();
  const repeatedLongAnswers = [];

  for (const exercise of exercises) {
    const config = courseConfig[exercise.course];
    assert.ok(config, exercise.id);
    const filename = path.join(root, config.dir, config.chapterDir, `chapitre${exercise.chapter}.html`);
    if (!chapters.has(filename)) {
      const page = parse5.parse(fs.readFileSync(filename, 'utf8'));
      const generated = parse5.parseFragment(renderSection(exercise.course, exercise.chapter));
      assert.ok(descendants(page, node => node.tagName === 'script' &&
        attribute(node, 'src') === '/assets/js/code-lab.js').length, filename);
      assert.ok(descendants(page, node => node.tagName === 'link' &&
        attribute(node, 'href') === '/assets/css/code-lab.css').length, filename);
      chapters.set(filename, { page, generated });
    }

    const chapter = chapters.get(filename);
    const oldLabs = labs(chapter.page, exercise.id);
    const generatedLabs = labs(chapter.generated, exercise.id);
    assert.equal(oldLabs.length, 1, exercise.id);
    assert.equal(attribute(oldLabs[0], 'data-language'), 'analyse', exercise.id);
    assert.notEqual(attribute(oldLabs[0], 'data-lab-ready'), '1', exercise.id);
    assert.equal(generatedLabs.length, 1, exercise.id);
    const lab = generatedLabs[0];
    const badges = descendants(lab, node => hasClass(node, 'lab__formative'));
    const notices = descendants(lab, node => hasClass(node, 'lab__formative-notice'));
    const samples = descendants(lab, node => hasClass(node, 'lab__sample'));
    const parts = descendants(lab, node => hasClass(node, 'lab__sample-part'));
    assert.equal(badges.length, 1, exercise.id);
    assert.equal(text(badges[0]), 'Formative', exercise.id);
    assert.notEqual(attribute(badges[0], 'aria-hidden'), 'true', exercise.id);
    assert.equal(notices.length, 1, exercise.id);
    assert.match(text(notices[0]), /ne donne pas de note et ne valide pas les acquis/i, exercise.id);
    assert.equal(samples.length, 1, exercise.id);
    assert.equal(parts.length, 1, exercise.id);
    assert.match(text(parts[0]), /^Cas d’exemple/, exercise.id);
    const input = descendants(parts[0], node => node.tagName === 'pre')[0];
    assert.equal(text(input), exercise.examples[0].stdin || '(aucune)', exercise.id);
    assert.ok(hasClass(nextElement(samples[0]), 'lab__hints'), exercise.id);

    const expected = String(exercise.examples[0].expected || '');
    if (expected.length >= 25 && text(lab).includes(expected)) repeatedLongAnswers.push(exercise.id);
  }

  assert.equal(chapters.size, 276);
  assert.equal(new Set(exercises.map(exercise => exercise.course)).size, 46);
  if (repeatedLongAnswers.length) {
    testContext.diagnostic(`${repeatedLongAnswers.length} résolutions d’exemple longues réapparaissent dans d’autres contenus : ${repeatedLongAnswers.join(', ')}`);
  }
});

test('champs d’exemple absents en analyse, exemple et note conservés pour le code', () => {
  const analysis = catalogue.getExercise('pf3-c2-e1');
  const savedExamples = analysis.examples;
  let generated;
  try {
    analysis.examples = [{ stdin: 'Entrée conservée sans résolution' }];
    generated = parse5.parseFragment(renderSection(analysis.course, analysis.chapter));
  } finally {
    analysis.examples = savedExamples;
  }
  const lab = labs(generated, analysis.id)[0];
  const sample = descendants(lab, node => hasClass(node, 'lab__sample'))[0];
  assert.match(text(sample), /Entrée conservée sans résolution/);
  assert.doesNotMatch(text(sample), /undefined|null|Résolution attendue|Sortie attendue/i);
  assert.equal(descendants(sample, node => hasClass(node, 'lab__sample-part')).length, 1);
  assert.ok(hasClass(nextElement(sample), 'lab__hints'));

  const codeExercise = catalogue.listExercises().find(exercise => exercise.language !== 'analyse' &&
    exercise.examples[0] && exercise.examples[0].expected && exercise.examples[0].note);
  assert.ok(codeExercise);
  const codeLab = labs(parse5.parseFragment(renderSection(codeExercise.course, codeExercise.chapter)), codeExercise.id)[0];
  const codeSample = descendants(codeLab, node => hasClass(node, 'lab__sample'))[0];
  const codeParts = descendants(codeSample, node => hasClass(node, 'lab__sample-part'));
  assert.equal(codeParts.length, 2);
  assert.match(text(codeParts[1]), /^Sortie attendue/);
  assert.equal(text(descendants(codeParts[1], node => node.tagName === 'pre')[0]), codeExercise.examples[0].expected);
  assert.equal(text(nextElement(codeSample)), codeExercise.examples[0].note);
  assert.equal(descendants(codeLab, node => hasClass(node, 'lab__formative')).length, 0);
});

test('étiquette statique visible sans JavaScript, contrastée et lisible en clair, sombre et mobile', { timeout: 60000 }, async testContext => {
  const { page } = await browserHarness(testContext, { javaScriptEnabled: false });
  await page.goto(origin + '/analyse.html');
  const lab = page.locator('[data-exercise="pf3-c2-e1"]');
  const badge = lab.locator('.lab__formative');
  assert.equal(await badge.innerText(), 'Formative');
  assert.equal(await badge.isVisible(), true);
  assert.match(await lab.locator('.lab__formative-notice').innerText(), /ne donne pas de note/i);
  assert.equal(await lab.locator('[data-lab-submit]').count(), 0);

  for (const theme of ['light', 'dark']) {
    await page.evaluate(value => document.documentElement.setAttribute('data-theme', value), theme);
    for (const width of [1280, 320]) {
      await page.setViewportSize({ width, height: 900 });
      const metrics = await badge.evaluate(element => {
        const style = getComputedStyle(element);
        const rect = element.getBoundingClientRect();
        return {
          color: style.color,
          background: style.backgroundColor,
          surface: getComputedStyle(element.closest('.lab')).backgroundColor,
          fontSize: parseFloat(style.fontSize),
          left: rect.left,
          right: rect.right,
          width: rect.width,
          height: rect.height
        };
      });
      assert.ok(contrast(metrics.color, metrics.background, metrics.surface) >= 4.5, `${theme}, ${width}px`);
      assert.ok(metrics.fontSize >= 14 && metrics.width > 0 && metrics.height > 0, `${theme}, ${width}px`);
      assert.ok(metrics.left >= 0 && metrics.right <= width, `${theme}, ${width}px`);
    }
  }
});

test('retours formatifs accessibles, incomplets ou modifiés, sans changer les exercices de code', { timeout: 60000 }, async testContext => {
  const { page, state } = await browserHarness(testContext);
  await page.goto(origin + '/analyse.html');
  const lab = page.locator('[data-exercise="pf3-c2-e1"]');
  const inputs = lab.getByRole('textbox', { name: /Votre réponse pour le Cas/ });
  const submit = lab.getByRole('button', { name: 'Vérifier mes réponses' });
  await submit.waitFor();
  assert.equal(await lab.locator('.lab__formative').count(), 1);
  assert.match(await lab.locator('.lab__formative').ariaSnapshot(), /Formative/);
  assert.equal(await lab.locator('[role="status"]').getAttribute('aria-live'), 'polite');
  const describedBy = (await submit.getAttribute('aria-describedby')).split(/\s+/);
  assert.ok(describedBy.includes('pf3-c2-e1-formative-notice'));
  assert.equal(await lab.locator('.lab__sample-part').count(), 1);
  assert.doesNotMatch(await lab.innerText(), /Résolution attendue|undefined/);

  for (let index = 0; index < 3; index++) await inputs.nth(index).fill(`réponse ${index + 1}`);
  await inputs.first().focus();
  assert.notEqual(await inputs.first().evaluate(element => getComputedStyle(element).boxShadow), 'none');
  await page.keyboard.press('Tab');
  assert.equal(await inputs.nth(1).evaluate(element => document.activeElement === element), true);

  state.responses.push({ body: { passed: 3, total: 3, results: [
    { label: 'Cas 1', ok: true }, { label: 'Cas 2', ok: true }, { label: 'Cas 3', ok: true }
  ], stop: null } });
  await submit.focus();
  await page.keyboard.press('Enter');
  await waitForSubmission(page, lab);
  const report = lab.getByRole('region', { name: 'Résultat de la correction' });
  assert.equal(await report.isVisible(), true);
  assert.match(await report.innerText(), /formative.*ne donne pas de note/is);
  assert.match(await report.innerText(), /ne valide pas les acquis/i);
  assert.doesNotMatch(await report.innerText(), /\d+\s*\/\s*\d+|exercice réussi|test\(s\) validé/i);
  assert.match(await lab.locator('[role="status"]').innerText(), /formative.*ne donne pas de note/i);
  assert.doesNotMatch(await lab.locator('[role="status"]').innerText(), /réponses? (?:est|sont) validé|exercice réussi/i);
  assert.equal(await lab.locator('.lab__case--ok').count(), 3);
  assert.match(await inputs.first().evaluate(element => element.getAttribute('aria-describedby')
    .split(/\s+/).map(id => document.getElementById(id).textContent).join(' ')), /Repères reconnus/);

  await inputs.first().fill('réponse modifiée');
  assert.equal(await report.isVisible(), false);
  assert.equal(await lab.locator('.lab__case--ok').count(), 0);
  assert.match(await lab.locator('[role="status"]').innerText(), /modifiées.*vérification formative/i);

  state.responses.push({ body: { passed: 1, total: 3, results: [
    { label: 'Cas 1', ok: true }, { label: 'Cas 2', ok: false }
  ], stop: { reason: 'wrong_output', testIndex: 1, label: 'Cas 2', actual: 'réponse', userMessage: 'Vérifiez votre raisonnement.' } } });
  await submit.click();
  await waitForSubmission(page, lab);
  assert.match(await report.innerText(), /cas restants n’ont pas été vérifiés/i);
  assert.doesNotMatch(await report.innerText(), /\d+\s*\/\s*\d+|exercice réussi|test\(s\) validé/i);
  assert.match(await inputs.nth(1).evaluate(element => element.getAttribute('aria-describedby')
    .split(/\s+/).map(id => document.getElementById(id).textContent).join(' ')), /À revoir.*Vérifiez votre raisonnement/s);
  assert.equal(await lab.locator('[data-case-indicator="2"]').innerText(), '');

  const gate = { arrived: deferred(), release: deferred() };
  testContext.after(() => gate.release.resolve());
  state.responses.push({ gate, body: { passed: 3, total: 3, results: [
    { label: 'Cas 1', ok: true }, { label: 'Cas 2', ok: true }, { label: 'Cas 3', ok: true }
  ], stop: null } });
  await submit.click();
  await gate.arrived.promise;
  await inputs.first().fill('modification pendant la requête');
  gate.release.resolve();
  await waitForSubmission(page, lab);
  assert.equal(await report.isVisible(), false);
  assert.equal(await lab.locator('.lab__case--ok, .lab__case--ko').count(), 0);
  assert.match(await lab.locator('[role="status"]').innerText(), /changé pendant la vérification/i);

  state.responses.push({ body: { passed: 0, total: 3, results: [], stop: {
    reason: 'api_error', testIndex: 0, userMessage: 'Service indisponible. Réessayez.'
  } } });
  await submit.click();
  await waitForSubmission(page, lab);
  assert.match(await report.innerText(), /vérification n’a pas pu être effectuée/i);
  assert.match(await lab.locator('[data-case-indicator="0"]').innerText(), /interrompue/i);
  assert.equal(await lab.locator('.lab__case--ko').count(), 0);
  assert.equal(await lab.locator('[data-lab-report-help]').count(), 0);

  state.responses.push({ status: 401, body: { error: 'Authentification requise.' } });
  await submit.click();
  await waitForSubmission(page, lab);
  assert.match(await lab.locator('[role="status"]').innerText(), /formative indisponible.*Authentification requise/i);
  assert.deepEqual(state.errors, []);

  state.responses.push({ body: { results: [{ label: 'Cas 1', ok: true }], stop: null } });
  await submit.click();
  await waitForSubmission(page, lab);
  assert.match(await lab.locator('[role="status"]').innerText(), /formative incomplète/i);
  assert.doesNotMatch(await report.innerText(), /undefined|exercice réussi|test\(s\) validé/i);

  await page.goto(origin + '/code.html');
  const codeLab = page.locator('[data-exercise="lx-c1-e2"]');
  await codeLab.locator('.lab__fallback').waitFor();
  assert.equal(await codeLab.locator('.lab__formative').count(), 0);
  assert.match(await codeLab.locator('.lab__sample').innerText(), /Sortie attendue/);
  state.responses.push({ body: { passed: 3, total: 3, results: [
    { label: 'Test caché 1', ok: true }, { label: 'Test caché 2', ok: true }, { label: 'Test caché 3', ok: true }
  ], stop: null } });
  await codeLab.locator('[data-lab-submit]').click();
  await waitForSubmission(page, codeLab);
  assert.equal(await codeLab.locator('[role="status"]').innerText(), 'Exercice validé');
  assert.match(await codeLab.getByRole('region', { name: 'Résultat de la correction' }).innerText(), /3 \/ 3 test\(s\) validé\(s\) — exercice réussi/);
  assert.deepEqual(state.errors, []);
});

test('pages anciennes et validation suspendue : étiquette de repli et descriptions conservées', { timeout: 60000 }, async testContext => {
  const { page, state } = await browserHarness(testContext);
  await page.goto(origin + '/ancienne.html');
  const legacy = page.locator('[data-exercise="pf3-c2-e1"]');
  await legacy.locator('[data-lab-mode]').waitFor();
  assert.equal(await legacy.locator('.lab__formative').count(), 1);
  assert.equal(await legacy.locator('.lab__formative').isVisible(), true);
  assert.match(await legacy.locator('.lab__formative-notice').innerText(), /ne donne pas de note/i);
  await legacy.locator('[data-lab-mode]').click();
  assert.equal(await legacy.locator('.lab__formative').isVisible(), true);

  await page.goto(origin + '/suspendu.html');
  const suspended = page.locator('[data-exercise="suspendu"]');
  const submit = suspended.locator('[data-lab-submit]');
  await submit.waitFor();
  assert.equal(await submit.isDisabled(), true);
  assert.equal(await suspended.locator('.lab__formative').isVisible(), true);
  const description = await submit.evaluate(element => element.getAttribute('aria-describedby')
    .split(/\s+/).map(id => document.getElementById(id).textContent).join(' '));
  assert.match(description, /Correction temporairement suspendue/);
  assert.match(description, /ne donne pas de note/);
  await suspended.evaluate(element => element.__lab.submit());
  assert.equal(state.requests.length, 0);
  assert.deepEqual(state.errors, []);
});
