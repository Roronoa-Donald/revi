'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');

test('l’analyseur accepte un inventaire local sans appeler Git', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-manifeste-'));
  try {
    const manifest = path.join(temporary, 'pages');
    fs.writeFileSync(manifest, 'b3-cloud-aws/atelier.html\0');
    const result = spawnSync(process.execPath, [path.join(__dirname, '../corrections/outils/analyser-pages.js'), '--strict'], {
      env: { ...process.env, PATH: '', REVI_AUDIT_MANIFEST: manifest }, encoding: 'utf8', timeout: 30000
    });
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.reference, 'dossier local, inventaire fourni');
    assert.equal(report.population.pages, 1);
    assert.deepEqual(report.html.parseErrors, []);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('l’analyseur refuse les chemins extérieurs à la racine', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-manifeste-'));
  try {
    const manifest = path.join(temporary, 'pages');
    fs.writeFileSync(manifest, '../externe.html\0');
    const result = spawnSync(process.execPath, [path.join(__dirname, '../corrections/outils/analyser-pages.js')], {
      env: { ...process.env, PATH: '', REVI_AUDIT_MANIFEST: manifest }, encoding: 'utf8', timeout: 30000
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /chemin hors du projet/i);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('le contrôle de langue accepte un inventaire sans Git ni référence inventée', { skip: !fs.existsSync('/usr/bin/hunspell') }, () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-langue-sans-git-'));
  try {
    const manifest = path.join(temporary, 'pages');
    fs.writeFileSync(manifest, 'b3-cloud-aws/atelier.html\0');
    fs.symlinkSync('/usr/bin/hunspell', path.join(temporary, 'hunspell'));
    const result = spawnSync(process.execPath, [path.join(__dirname, '../corrections/outils/verifier-langue.js')], {
      env: { ...process.env, PATH: temporary, REVI_AUDIT_MANIFEST: manifest, REVI_AUDIT_SANS_BASELINE: '1' },
      encoding: 'utf8', timeout: 30000
    });
    assert.equal(result.status, 1, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.population.pagesAnalysees, 1);
    assert.equal(report.baseline, null);
    assert.equal(report.nouveauxMots, null);
    assert.ok(report.inconnus.every(entry => entry.nouveauDepuisMain === null));
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});

test('le contrôle de langue refuse un chemin hors du projet', () => {
  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-langue-chemin-'));
  try {
    const manifest = path.join(temporary, 'pages');
    fs.writeFileSync(manifest, '../externe.html\0');
    const result = spawnSync(process.execPath, [path.join(__dirname, '../corrections/outils/verifier-langue.js')], {
      env: { ...process.env, PATH: '', REVI_AUDIT_MANIFEST: manifest, REVI_AUDIT_SANS_BASELINE: '1' },
      encoding: 'utf8', timeout: 30000
    });
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /chemin hors du projet/i);
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
