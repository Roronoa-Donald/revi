'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const execute = async ({ code, stdin }) => {
  const result = await runAnalyse(code, stdin);
  return { ok: result.ok, stdout: result.data.stdout };
};

test('la durée par défaut et le comportement de la console sont contextualisés', () => {
  for (const file of [
    'server/content/b1-ccna1/chapitres-4-6.js',
    'b1-ccna1/chapitres/chapitre6.html'
  ]) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.doesNotMatch(text, /5 min par défaut/);
    assert.match(text, /10 minutes par défaut/);
    assert.match(text, /D_through_E\.html/);
    assert.match(text, /ligne séparée/);
  }
});

test('exec-timeout 0 0 ne promet pas une session impossible à déconnecter', () => {
  for (const file of [
    'server/content/b1-ccna1/chapitres-4-6.js',
    'server/content/b1-ccna1/pages.js',
    'b1-ccna1/chapitres/chapitre6.html',
    'b1-ccna1/chapitres/formules.html',
    'b1-ccna1/chapitres/simulateur-examen.html'
  ]) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.doesNotMatch(text, /jamais déconnecté|sessions jamais expirées|0 0 = jamais/i, file);
    assert.match(text, /délai EXEC.{0,25}inactivité.{0,35}désactiv/i, file);
  }
});

test('la carte console précise que le délai EXEC concerne l’inactivité', () => {
  for (const file of [
    'server/content/b1-ccna1/chapitres-4-6.js',
    'b1-ccna1/chapitres/cartes.html'
  ]) {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    assert.match(text, /exec-timeout minutes seconds \(délai EXEC d.{1,2}inactivité\)/i, file);
    assert.doesNotMatch(text, /exec-timeout minutes seconds \(déconnexion\)/i, file);
  }
});

test('la grille annonce ses hypothèses sans les présenter comme des règles universelles', async () => {
  const item = require('../server/exercises/b1-ccna1').find(entry => entry.id === 'cc-c6-e3');
  assert.match(item.brief, /modèle fictif/i);
  assert.match(item.brief, /sans <code>t<\/code>.{0,50}10 minutes/i);
  assert.match(item.brief, /ces durées.{0,80}(?:configuration|plateforme)/i);
  const report = await runTests(item, item.solution, { execute });
  assert.equal(report.passed, 3);
  assert.equal(report.total, 3);
});
