/**
 * tests/native-exercise-component.test.js
 *
 * Vérification du composant natif d'exercices légers (sans Monaco) :
 * - Découpage et reconstruction canonique des cas
 * - Tolérances mathématiques et disciplinaires (fractions, décimaux avec virgule, casse)
 * - Isolation de Monaco (Monaco réservé aux 10 cours de programmation)
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const exercises = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const localRunner = require('../server/services/execution/local-runner');
const courseConfig = require('../server/exercises/course-config');

const ROOT = path.resolve(__dirname, '..');

// Extraction de la fonction de parsing identique à code-lab.js
function parseAnalyseStarter(starter) {
  const lines = String(starter || '').replace(/\r\n?/g, '\n').split('\n');
  const headerRe = /^\[(?:cas\s*(\d+)|exemple)\b\s*(?:[—–-]\s*(.*?))?\]$/i;
  const cases = [];
  let currentCase = null;
  const preamble = [];

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const trimmed = raw.trim();
    const match = headerRe.exec(trimmed);
    if (match) {
      currentCase = {
        index: match[1] ? parseInt(match[1], 10) : (cases.length + 1),
        label: (match[2] || '').trim(),
        dataLines: [],
        value: ''
      };
      cases.push(currentCase);
      continue;
    }
    if (!currentCase) {
      preamble.push(raw);
      continue;
    }
    if (trimmed.startsWith('#')) {
      const d = trimmed.replace(/^#\s*(?:donn[eé]es?\s*:\s*)?/i, '').trim();
      if (d && !d.toLowerCase().startsWith('complétez') && !d.toLowerCase().startsWith('grille')) {
        currentCase.dataLines.push(d);
      }
    } else if (trimmed && trimmed !== 'A_COMPLETER') {
      currentCase.value += (currentCase.value ? '\n' : '') + raw;
    }
  }
  return { preamble, cases };
}

function formatAnalyseCode(parsed) {
  let out = '';
  if (parsed.preamble && parsed.preamble.length > 0) {
    out += parsed.preamble.join('\n') + '\n\n';
  }
  for (let i = 0; i < parsed.cases.length; i++) {
    const c = parsed.cases[i];
    out += '[Cas ' + c.index + (c.label ? ' — ' + c.label : '') + ']\n';
    for (let d = 0; d < c.dataLines.length; d++) {
      out += '# Données : ' + c.dataLines[d] + '\n';
    }
    const val = (c.value || '').trim();
    out += (val ? val : 'A_COMPLETER') + '\n\n';
  }
  return out.trim() + '\n';
}

test('Composant natif : parsing et reconstruction canonique des grilles de cas', () => {
  const ex = exercises.getExercise('pb2-c1-e1');
  assert.ok(ex, 'pb2-c1-e1 doit exister');

  const parsed = parseAnalyseStarter(ex.starter);
  assert.strictEqual(parsed.cases.length, 3, 'Doit contenir exactement 3 cas');
  assert.strictEqual(parsed.cases[0].index, 1);
  assert.strictEqual(parsed.cases[0].label, 'Deux sur huit');
  assert.deepStrictEqual(parsed.cases[0].dataLines, ['8', '2']);
  assert.strictEqual(parsed.cases[0].value, '');

  // Simulation saisie élève
  parsed.cases[0].value = '1/4';
  parsed.cases[1].value = '7/10';
  parsed.cases[2].value = '1/2';

  const reconstructed = formatAnalyseCode(parsed);
  assert.ok(reconstructed.includes('[Cas 1 — Deux sur huit]'));
  assert.ok(reconstructed.includes('1/4'));
  assert.ok(reconstructed.includes('[Cas 2 — Sept sur dix]'));
  assert.ok(reconstructed.includes('7/10'));
  assert.ok(reconstructed.includes('[Cas 3 — Deux sur quatre]'));
  assert.ok(reconstructed.includes('1/2'));
});

test('Moteur de correction : tolérance mathématique robuste (fractions et décimaux avec virgule)', async () => {
  const ex = exercises.getExercise('pb2-c1-e1');

  // Test avec fraction 1/4, décimal avec virgule 0,7 et décimal 0.50
  const submission = `
[Cas 1 — Deux sur huit]
0.25

[Cas 2 — Sept sur dix]
0,7

[Cas 3 — Deux sur quatre]
0.50
`;

  const report = await runTests(ex, submission, {
    execute: async ({ code, stdin }) => {
      const res = await localRunner.runAnalyse(code, stdin);
      return { ok: true, status: 'success', stdout: res.data.stdout, stderr: '' };
    }
  });

  assert.strictEqual(report.ok, true);
  assert.strictEqual(report.passed, 3);
  assert.strictEqual(report.total, 3);
  assert.strictEqual(report.stop, null);
});

test('Moteur de correction : tolérance disciplinaire (insensibilité à la casse)', async () => {
  const ex = exercises.getExercise('dr-c1-e1');
  assert.ok(ex, 'dr-c1-e1 doit exister');

  // Soumission avec majuscules
  const submission = `
[Cas 1 — Une seule prérogative]
droit de vote : PREROGATIVE
bilan : 0 regles / 1 prerogatives

[Cas 2 — Deux règles]
loi : REGLE
decret : REGLE
bilan : 2 regles / 0 prerogatives

[Cas 3 — Cinq éléments mixtes]
code penal : REGLE
droit a l image : PREROGATIVE
coutume : REGLE
droit de propriete : PREROGATIVE
arrrete : REGLE
bilan : 3 regles / 2 prerogatives
`;

  const report = await runTests(ex, submission, {
    execute: async ({ code, stdin }) => {
      const res = await localRunner.runAnalyse(code, stdin);
      return { ok: true, status: 'success', stdout: res.data.stdout, stderr: '' };
    }
  });

  assert.strictEqual(report.ok, true);
  assert.strictEqual(report.passed, 3);
  assert.strictEqual(report.total, 3);
});

test('Architecture : Cloisonnement strict de Monaco Editor (10 programmation vs 52 natifs)', () => {
  const PROGRAMMING_COURSES = new Set([
    'b1-python',
    'b1-algo',
    'b1-c-cpp',
    'b1-php',
    'php',
    'rd_java',
    'b1-prog-web',
    'react',
    'api-rest-flask',
    'b3-algo',
    'csharp',
    'b1-sql',
    'sql',
    'b3-sql'
  ]);

  const SHELL_COURSES = new Set([
    'b1-linux',
    'linux',
    'b1-git',
    'rd_winserver',
    'admin-vm',
    'docker',
    'b3-linux',
    'b3-github'
  ]);

  const allExercises = exercises.listExercises();

  for (const [courseId, cfg] of Object.entries(courseConfig)) {
    const courseExs = allExercises.filter(e => e.course === courseId);
    if (!courseExs.length) continue;

    const lang = courseExs[0].language;

    if (PROGRAMMING_COURSES.has(courseId)) {
      assert.ok(
        ['python', 'c', 'php', 'javascript', 'java', 'csharp', 'sql'].includes(lang),
        `${courseId} doit être un cours de programmation (actuel: ${lang})`
      );
    } else if (SHELL_COURSES.has(courseId)) {
      assert.ok(
        ['shell', 'powershell'].includes(lang),
        `${courseId} doit être un cours shell/terminal (actuel: ${lang})`
      );
    } else {
      assert.strictEqual(
        lang,
        'analyse',
        `${courseId} doit utiliser le mode interactif natif 'analyse' sans Monaco (actuel: ${lang})`
      );
    }
  }
});

test('Frontend : code-lab.js n’appelle pas loadMonaco pour les cours en mode analyse', () => {
  const codeLabSrc = fs.readFileSync(path.join(ROOT, 'assets/js/code-lab.js'), 'utf8');

  // Vérifier la présence des méthodes du composant natif
  assert.ok(codeLabSrc.includes('Lab.prototype.initAnalyseForm'), 'initAnalyseForm doit être présent');
  assert.ok(codeLabSrc.includes('Lab.prototype.renderAnalyseCases'), 'renderAnalyseCases doit être présent');
  assert.ok(codeLabSrc.includes('Lab.prototype.toggleMode'), 'toggleMode doit être présent');
  assert.ok(codeLabSrc.includes('Lab.prototype.formatAnalyseCode'), 'formatAnalyseCode doit être présent');
  assert.ok(codeLabSrc.includes('Lab.prototype.updateAnalyseFeedback'), 'updateAnalyseFeedback doit être présent');

  // Vérifier le court-circuit de loadMonaco dans initEditor
  const initEditorMatch = /Lab\.prototype\.initEditor\s*=\s*function\s*\(\)\s*\{([\s\S]*?loadMonaco\(\))/m.exec(codeLabSrc);
  assert.ok(initEditorMatch, 'initEditor doit être trouvé');
  assert.ok(
    initEditorMatch[1].includes('if (this.isAnalyse)'),
    'initEditor doit court-circuiter et retourner avant tout appel à loadMonaco() pour les cours analyse'
  );
});
