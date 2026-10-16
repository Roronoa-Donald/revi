/**
 * tests/pedagogical-alignment.test.js
 *
 * Vérification stricte de l'alignement pédagogique (PED-001, PED-002, TYPO-001) :
 * Élimination totale du code Bash/Python forcé dans les 14 cours non-informatiques.
 */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..');
const exercises = require('../server/exercises');

const NON_PROGRAMMING_COURSES = [
  'b1-droit',
  'b1-anglais',
  'b1-fr-pro',
  'b1-bureautique',
  'droit',
  'masterclass-apprendre',
  'uiux',
  'ingenierie-besoin',
  'erp-si',
  'b3-anglais',
  'b3-agile',
  'b3-document-technique',
  'b3-etude-quantitative',
  'b3-veille'
];

test('PED-001 : Les 14 cours non-informatiques utilisent exclusivement le mode étude de cas (language: "analyse")', () => {
  const allExercises = exercises.listExercises();

  for (const courseId of NON_PROGRAMMING_COURSES) {
    const courseExercises = allExercises.filter(e => e.course === courseId);
    assert.strictEqual(
      courseExercises.length,
      18,
      `${courseId} doit comporter exactement 18 exercices (actuel: ${courseExercises.length})`
    );

    for (const ex of courseExercises) {
      assert.strictEqual(
        ex.language,
        'analyse',
        `${courseId} / ${ex.id} doit utiliser language: 'analyse' (trouvé: ${ex.language})`
      );

      // Aucun code Bash ou Python forcé
      const forbiddenPatterns = [
        /\bread\s+-r\b/i,
        /for\s*\(\([^)]*\)\)/i,
        /\bimport\s+sys\b/i,
        /\bsys\.stdin\b/i,
        /\bdeclare\s+-A\b/i,
        /\b#!\/bin\/bash\b/i
      ];

      for (const pattern of forbiddenPatterns) {
        assert.ok(
          !pattern.test(ex.starter),
          `${courseId} / ${ex.id} : starter contient du code banni (${pattern})`
        );
        assert.ok(
          !pattern.test(ex.solution),
          `${courseId} / ${ex.id} : solution contient du code banni (${pattern})`
        );
        assert.ok(
          !pattern.test(ex.brief),
          `${courseId} / ${ex.id} : brief contient des références de script (${pattern})`
        );
      }

      // Structure de grille d'analyse
      assert.match(
        ex.starter,
        /^# Grille d'analyse \([a-z0-9-]+\) —/m,
        `${courseId} / ${ex.id} : starter doit débuter par l'entête # Grille d'analyse (id) — titre`
      );
      assert.match(
        ex.starter,
        /\[Cas 1\b/i,
        `${courseId} / ${ex.id} : starter doit contenir au moins la section [Cas 1]`
      );
      assert.match(
        ex.starter,
        /\bA_COMPLETER\b/,
        `${courseId} / ${ex.id} : starter doit comporter des marqueurs A_COMPLETER`
      );

      // Tests ciblent cas:1..N
      for (let i = 0; i < ex.tests.length; i++) {
        assert.strictEqual(
          ex.tests[i].stdin,
          `cas:${i + 1}`,
          `${courseId} / ${ex.id} : test ${i} doit avoir stdin: 'cas:${i + 1}'`
        );
        assert.ok(
          ex.tests[i].expected && ex.tests[i].expected.trim().length > 0,
          `${courseId} / ${ex.id} : test ${i} doit avoir une sortie attendue non vide`
        );
      }
    }
  }
});

test('PED-001 : server/content/ et pages HTML des 14 cours ne contiennent plus de script Bash/Python', () => {
  for (const courseId of NON_PROGRAMMING_COURSES) {
    const courseDir = path.join(ROOT, courseId);
    if (!fs.existsSync(courseDir)) continue;

    const htmlFiles = fs.readdirSync(courseDir, { recursive: true })
      .filter(f => typeof f === 'string' && f.endsWith('.html'));

    for (const rel of htmlFiles) {
      const fullPath = path.join(courseDir, rel);
      const content = fs.readFileSync(fullPath, 'utf8');

      assert.ok(
        !content.includes('data-language="shell"'),
        `${courseId}/${rel} ne doit pas contenir data-language="shell"`
      );
      assert.ok(
        !content.includes('data-language="python"'),
        `${courseId}/${rel} ne doit pas contenir data-language="python"`
      );
      assert.ok(
        !content.includes('#!/bin/bash'),
        `${courseId}/${rel} ne doit pas contenir #!/bin/bash`
      );
      assert.ok(
        !content.includes('import sys; sys.stdin'),
        `${courseId}/${rel} ne doit pas contenir d'import sys`
      );
    }
  }
});
