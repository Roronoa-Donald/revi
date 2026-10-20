/**
 * tests/access-control.test.js — filet de sécurité minimal (node --test, zéro dépendance)
 * Vérifie isProtected/getCourseFromUrl sur les cours canoniques, la cohérence
 * des listes dupliquées (Edge middleware, build, auth-check) et le registre à niveaux.
 */
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('node:fs');
const path = require('node:path');
const {
  isProtected,
  getCourseFromUrl,
  COURSES,
  COURSE_DIRS,
  LEVELS,
  getCourseLevel
} = require('../server/middleware/access-control');

// Compte attendu : 24 cours B2 historiques + 24 B1 + 23 B3 = 71
const EXPECTED_TOTAL = 71;

test('registre canonique : 71 cours uniques, nom + niveau valides', () => {
  assert.strictEqual(COURSE_DIRS.length, EXPECTED_TOTAL, `${EXPECTED_TOTAL} cours attendus`);
  assert.strictEqual(new Set(COURSE_DIRS).size, EXPECTED_TOTAL, 'aucun doublon');
  for (const c of COURSE_DIRS) {
    assert.strictEqual(typeof COURSES[c].name, 'string', `nom manquant pour ${c}`);
    assert.ok(LEVELS.includes(COURSES[c].level), `niveau invalide pour ${c} (${COURSES[c].level})`);
  }
});

test('répartition par niveau : 24 B1, 24 B2, 23 B3', () => {
  const byLevel = { b1: 0, b2: 0, b3: 0 };
  for (const c of COURSE_DIRS) byLevel[getCourseLevel(c)]++;
  assert.strictEqual(byLevel.b1, 24, '24 cours B1');
  assert.strictEqual(byLevel.b2, 24, '24 cours B2');
  assert.strictEqual(byLevel.b3, 23, '23 cours B3');
});

test('epreuves : index et tout le dossier sont protégés', () => {
  assert.strictEqual(isProtected('/epreuves/index.html'), true);
  assert.strictEqual(isProtected('/epreuves/Recueil_Epreuves_2024_2025.pdf'), true);
});

test('preparation-web : protégé sauf assets/', () => {
  assert.strictEqual(isProtected('/preparation-web/index.html'), true);
  assert.strictEqual(isProtected('/preparation-web/assets/css/style.css'), false);
  assert.strictEqual(isProtected('/preparation-web/assets/data/preparation-quiz.json'), false);
});

test('cours standards : index et chapitre1 gratuits, chapitres 2+ protégés, assets libres sauf PDF', () => {
  for (const c of ['linux', 'react', 'probabilites', 'Cyber securite B2', 'b1-python', 'b3-cryptographie']) {
    assert.strictEqual(isProtected(`/${c}/index.html`), false, `${c}/index.html doit être libre`);
    assert.strictEqual(isProtected(`/${c}/sommaire.html`), false, `${c}/sommaire.html doit être libre`);
    assert.strictEqual(isProtected(`/${c}/chapitres/chapitre1.html`), false, `${c}/chapitre1 doit être libre`);
    assert.strictEqual(isProtected(`/${c}/chapitres/chapitre2.html`), true, `${c}/chapitre2 doit être protégé`);
    assert.strictEqual(isProtected(`/${c}/assets/js/main.js`), false, `${c}/assets/js libre`);
    assert.strictEqual(isProtected(`/${c}/assets/pdf/cours.pdf`), true, `${c}/assets/*.pdf protégé`);
  }
});

test('données QCM toujours protégées', () => {
  assert.strictEqual(isProtected('/react/qcm-100.js'), true);
  assert.strictEqual(isProtected('/linux/assets/data/qcm.json'), true);
});

test('hors cours → libre, getCourseFromUrl cohérent', () => {
  assert.strictEqual(isProtected('/index.html'), false);
  assert.strictEqual(isProtected('/b1/whatever.html'), false);
  assert.strictEqual(getCourseFromUrl('/linux/chapitres/chapitre2.html'), 'linux');
  assert.strictEqual(getCourseFromUrl('/index.html'), null);
});

test('middleware Edge (middleware.js) : même liste + mêmes niveaux que le registre', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'middleware.js'), 'utf8');
  const m = src.match(/const COURSE_DIRS = \[([\s\S]*?)\];/);
  assert.ok(m, 'COURSE_DIRS introuvable dans middleware.js');
  const edge = m[1].match(/["']([^"']+)["']/g).map(s => s.slice(1, -1)).sort();
  assert.deepStrictEqual(edge, [...COURSE_DIRS].sort(), 'les listes Node et Edge doivent être identiques');

  const lm = src.match(/const COURSE_LEVELS = \{([\s\S]*?)\};/);
  assert.ok(lm, 'COURSE_LEVELS introuvable dans middleware.js');
  const edgeLevels = {};
  for (const pair of lm[1].match(/["']([^"']+)["']\s*:\s*["']([^"']+)["']/g) || []) {
    const [id, lvl] = pair.match(/["']([^"']+)["']/g).map(s => s.slice(1, -1));
    edgeLevels[id] = lvl;
  }
  for (const c of COURSE_DIRS) {
    assert.strictEqual(edgeLevels[c], getCourseLevel(c), `niveau Edge divergent pour ${c}`);
  }
});

test('client auth-check.js : même liste de cours que le registre', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'public', 'js', 'auth-check.js'), 'utf8');
  const m = src.match(/var COURSE_DIRS = \[([\s\S]*?)\];/);
  assert.ok(m, 'COURSE_DIRS introuvable dans auth-check.js');
  const client = m[1].match(/["']([^"']+)["']/g).map(s => s.slice(1, -1)).sort();
  assert.deepStrictEqual(client, [...COURSE_DIRS].sort(), 'les listes Node et client doivent être identiques');
});

test('scripts/build.js : dérive du registre canonique (aucune liste inline)', () => {
  const src = fs.readFileSync(path.join(__dirname, '..', 'scripts', 'build.js'), 'utf8');
  assert.match(src, /require\(['"]\.\.\/server\/courses['"]\)/, 'build.js doit require le registre');
  assert.doesNotMatch(src, /const COURSE_DIRS = \[/, 'plus de liste inline dans build.js');
  assert.match(src, /COURSE_DIRS\)?\.COURSE_DIRS|COURSE_DIRS = require/, 'COURSE_DIRS must come from require');
});

test('scripts/check-course-sync.js equivalent : sync-courses --check passe', () => {
  const { execFileSync } = require('node:child_process');
  const out = execFileSync(process.execPath, [path.join(__dirname, '..', 'scripts', 'sync-courses.js'), '--check'], { encoding: 'utf8' });
  assert.match(out, /synchronisées/);
});
