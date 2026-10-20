/**
 * tests/pedagogical-ro-chapitre1.test.js — Validation de la remédiation didactique
 * et des tolérances d'évaluation pour le Chapitre 1 de Recherche Opérationnelle B2.
 */
'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');

const exercises = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const localRunner = require('../server/services/execution/local-runner');
const ch1Content = require('../server/content/RD-RO/chapitre1');

const executionDep = {
  execute: async ({ language, code, stdin }) => {
    if (language === 'analyse') {
      const res = await localRunner.runAnalyse(code, stdin);
      return {
        ok: res.ok,
        status: 'success',
        stdout: res.data.stdout,
        stderr: res.data.stderr,
        exitCode: res.data.exit_code
      };
    }
    throw new Error(`Unsupported test language: ${language}`);
  }
};

test('RD-RO Chapitre 1 : catalogue complet à 5 exercices gradués', () => {
  const roExos = exercises.listExercises().filter(e => e.course === 'RD-RO' && e.chapter === 1);
  assert.strictEqual(roExos.length, 5, '5 exercices attendus pour couvrir l’ensemble des objectifs didactiques');

  const ids = roExos.map(e => e.id);
  assert.deepStrictEqual(ids, ['ro2-c1-e1', 'ro2-c1-e2', 'ro2-c1-e3', 'ro2-c1-e4', 'ro2-c1-e5']);

  for (const ex of roExos) {
    assert.strictEqual(ex.language, 'analyse', `${ex.id} doit utiliser le mode interactif 'analyse'`);
    assert.ok(Array.isArray(ex.hints) && ex.hints.length >= 2, `${ex.id} doit posséder au moins 2 indices distincts`);
    assert.ok(ex.brief && ex.brief.includes('<p>'), `${ex.id} doit comporter un brief pédagogique rédigé`);
    assert.ok(ex.starter && ex.starter.includes('[Cas 1'), `${ex.id} doit comporter une grille structurée`);
    assert.ok(ex.tests.length === 3, `${ex.id} doit évaluer 3 cas tests distincts`);
  }
});

test('RD-RO Ex 1 (ro2-c1-e1) : Tolérances entiers/décimaux et ponctuation sur Z', async () => {
  const ex = exercises.getExercise('ro2-c1-e1');

  // Solution avec entiers simples
  const codeEntiers = `
[Cas 1 — Maximisation valide]
VALIDE Z=140

[Cas 2 — Minimisation avec variable nulle]
VALIDE Z=56

[Cas 3 — Violation de non-négativité sur x1]
NON_VALIDE VIOLATION_SIGNE
`;
  const rep1 = await runTests(ex, codeEntiers, executionDep);
  assert.strictEqual(rep1.passed, 3, 'Les entiers bruts doivent être acceptés sans forcer .0');

  // Solution avec décimaux et espaces autour de =
  const codeDecimauxEspaces = `
[Cas 1 — Maximisation valide]
Valide : Z = 140.0

[Cas 2 — Minimisation avec variable nulle]
VALIDE Z = 56.0

[Cas 3 — Violation de non-négativité sur x1]
non_valide violation_signe
`;
  const rep2 = await runTests(ex, codeDecimauxEspaces, executionDep);
  assert.strictEqual(rep2.passed, 3, 'Les notations avec .0, espaces et colons doivent être tolérées');
});

test('RD-RO Ex 2 (ro2-c1-e2) : Faisabilité, marges d’inactivité (slacks) et saturation', async () => {
  const ex = exercises.getExercise('ro2-c1-e2');

  const codeValide = `
[Cas 1 — Plan réalisable avec marge inemployée]
REALISABLE s1=4 s2=4

[Cas 2 — Saturation exacte des deux ressources]
REALISABLE s1=0 s2=0

[Cas 3 — Dépassement de capacité sur la ressource R1]
IRREALISABLE VIOLATION_R1
`;
  const rep = await runTests(ex, codeValide, executionDep);
  assert.strictEqual(rep.passed, 3, 'Faisabilité avec slacks entiers acceptée');

  // Tolérance décimaux
  const codeDecimaux = `
[Cas 1 — Plan réalisable avec marge inemployée]
REALISABLE s1=4.0 s2=4.0

[Cas 2 — Saturation exacte des deux ressources]
REALISABLE s1=0.0 s2=0.0

[Cas 3 — Dépassement de capacité sur la ressource R1]
irrealisable violation_r1
`;
  const rep2 = await runTests(ex, codeDecimaux, executionDep);
  assert.strictEqual(rep2.passed, 3, 'Faisabilité avec slacks en .0 et casse insensible acceptée');
});

test('RD-RO Ex 3 (ro2-c1-e3) : Arbitrage de mélange et filtrage des exigences', async () => {
  const ex = exercises.getExercise('ro2-c1-e3');

  const codeValide = `
[Cas 1 — Trois candidats avec un vainqueur économique net]
MEILLEUR: x1=12 x2=4 COUT=92

[Cas 2 — Candidats dont certains violent les seuils minimaux]
MEILLEUR: x1=4 x2=3 COUT=18

[Cas 3 — Aucun candidat ne satisfait l'ensemble des exigences]
AUCUN_REALISABLE
`;
  const rep = await runTests(ex, codeValide, executionDep);
  assert.strictEqual(rep.passed, 3, 'Sélection et filtrage de candidats validés');
});

test('RD-RO Ex 4 (ro2-c1-e4) : Modélisation formelle et contrainte d’égalité contractuelle', async () => {
  const ex = exercises.getExercise('ro2-c1-e4');

  // Test avec écriture standard
  const codeStandard = `
[Cas 1 — Définition de la fonction objectif]
MAX Z = 40*x1 + 70*x2

[Cas 2 — Contrainte de ressource en cellules]
4*x1 + 8*x2 <= 800

[Cas 3 — Contrainte d'engagement contractuel strict]
x1 = 50
`;
  const rep1 = await runTests(ex, codeStandard, executionDep);
  assert.strictEqual(rep1.passed, 3, 'Formulation canonique standard acceptée');

  // Test avec multiplication implicite (4x1 au lieu de 4*x1)
  const codeImplicite = `
[Cas 1 — Définition de la fonction objectif]
max z = 40x1 + 70x2

[Cas 2 — Contrainte de ressource en cellules]
4x1 + 8x2 <= 800

[Cas 3 — Contrainte d'engagement contractuel strict]
x1=50
`;
  const rep2 = await runTests(ex, codeImplicite, executionDep);
  assert.strictEqual(rep2.passed, 3, 'Formulation avec multiplication implicite et casse minuscule tolérée');
});

test('RD-RO Ex 5 (ro2-c1-e5) : Validation des 4 hypothèses et modèle PLNE', async () => {
  const ex = exercises.getExercise('ro2-c1-e5');

  const codeValide = `
[Cas 1 — Remise sur volume chez le fournisseur de bois]
PROPORTIONNALITE

[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]
PLNE

[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]
CERTITUDE
`;
  const rep1 = await runTests(ex, codeValide, executionDep);
  assert.strictEqual(rep1.passed, 3, 'Termes conceptuels reconnus');

  // Tolérance sur les accents et la casse
  const codeAccents = `
[Cas 1 — Remise sur volume chez le fournisseur de bois]
Proportionnalité

[Cas 2 — Choix d'ouverture d'un nouvel entrepôt logistique]
plne

[Cas 3 — Fluctuations imprévisibles du coût de l'électricité sur le marché spot]
certitude
`;
  const rep2 = await runTests(ex, codeAccents, executionDep);
  assert.strictEqual(rep2.passed, 3, 'Tolérance accentuelle et casse sur les hypothèses');
});

test('RD-RO Chapitre 1 : QCM à 10 questions avec explications complètes des distracteurs', () => {
  assert.strictEqual(ch1Content.questions.length, 10, 'Le QCM doit comporter 10 questions complètes');

  for (let i = 0; i < ch1Content.questions.length; i++) {
    const q = ch1Content.questions[i];
    assert.ok(q.q && q.q.length > 15, `Q${i + 1} : énoncé trop court`);
    assert.strictEqual(q.opts.length, 4, `Q${i + 1} : 4 options requises`);
    assert.strictEqual(q.correct, 0, `Q${i + 1} : indice canonique 0 requis`);
    assert.ok(q.exp && q.exp.length > 50, `Q${i + 1} : explication pédagogique détaillée requise`);
  }

  // Vérifier la présence des notions clés dans les explications
  const allExp = ch1Content.questions.map(q => q.exp).join(' ');
  assert.ok(allExp.includes('Dantzig'), 'QCM doit mentionner George Dantzig');
  assert.ok(allExp.includes('non-négativité'), 'QCM doit expliciter la non-négativité');
  assert.ok(allExp.includes('bilinéaire') || allExp.includes('quadratique'), 'QCM doit expliciter la non-linéarité');
  assert.ok(allExp.includes('marge'), 'QCM doit expliciter la marge et les écarts');
  assert.ok(allExp.includes('Branch & Bound') || allExp.includes('PLNE'), 'QCM doit expliquer l’impact des variables binaires');
  assert.ok(allExp.includes('égalité'), 'QCM doit expliquer le rôle des contraintes d’égalité');

  // Paliers de maîtrise
  assert.ok(ch1Content.mastery.some(m => m.cls === 'top' && m.text.includes('≥ 95 %')), 'Palier top ≥ 95 % requis');
  assert.ok(ch1Content.mastery.some(m => m.cls === 'good'), 'Palier intermédiaire requis');
});
