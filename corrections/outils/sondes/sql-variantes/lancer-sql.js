'use strict';

const fs = require('node:fs');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const bankRoot = '/project/corrections/outils/sondes/sql-variantes';

function assertIsolation() {
  const parent = fs.readFileSync('/proc/1/comm', 'utf8').trim();
  const network = fs.readlinkSync('/proc/self/ns/net');
  if (parent !== 'bwrap' || !process.env.REVI_AUDIT_NET_NS_HOTE || network === process.env.REVI_AUDIT_NET_NS_HOTE ||
      process.env.HOME !== '/tmp' || fs.existsSync('/home')) {
    throw new Error('Exécution refusée hors bubblewrap isolé sans réseau');
  }
}

function fingerprint(filename) {
  return crypto.createHash('sha256').update(fs.readFileSync(filename)).digest('hex');
}

function fingerprints(filenames) {
  return Object.fromEntries(filenames.map(filename => [filename, fingerprint(filename)]));
}

function graderState(report) {
  if (!report || report.ok !== true || report.error || !Number.isInteger(report.total) || report.total < 1) return 'non_evaluee';
  if (report.stop && report.stop.reason === 'wrong_output' && report.passed < report.total) return 'rejetee';
  if (!report.stop && report.passed === report.total) return 'acceptee';
  return 'non_evaluee';
}

async function main() {
  assertIsolation();
  const files = [
    '/project/server/exercises/index.js', '/project/server/exercises/runner.js',
    '/project/server/exercises/grading-policy.js', '/project/server/exercises/sql.js',
    '/project/server/exercises/b3-sql.js', '/project/server/services/execution/index.js',
    '/project/assets/js/engines/sql-wasm-engine.js', '/project/assets/js/engines/engine-interface.js',
    '/project/b1-sql/assets/vendor/sqljs/sql-wasm.js', '/project/b1-sql/assets/vendor/sqljs/sql-wasm.wasm',
    '/project/corrections/outils/sondes/couverture/stimuli.js',
    `${bankRoot}/cas_sql.py`, `${bankRoot}/oracle_sql.py`, `${bankRoot}/lancer-sql.js`
  ];
  const before = fingerprints(files);
  const { getExercise, listExercises, toClient } = require('/project/server/exercises');
  const { isGradingSuspended } = require('/project/server/exercises/grading-policy');
  const { runTests, MAX_TESTS } = require('/project/server/exercises/runner');
  const sql = require('/project/assets/js/engines/sql-wasm-engine');
  const { comparableStimulus, witnessVisibleInProjection } = require('/project/corrections/outils/sondes/couverture/stimuli');
  if (JSON.stringify(before) !== JSON.stringify(fingerprints(files))) throw new Error('Sources modifiées pendant le chargement');

  if (process.argv[2] === '--inspecter') {
    const ids = listExercises().filter(exercise => ['sql', 'b3-sql'].includes(exercise.course));
    const python = spawnSync('/usr/bin/python3', ['-c', 'import sqlite3'], { timeout: 10000 });
    if (ids.length !== 36 || ids.some(exercise => !isGradingSuspended(exercise.course)) ||
        python.status !== 0 || typeof sql.splitSql !== 'function' || typeof runTests !== 'function') {
      throw new Error('Prérequis incomplets');
    }
    console.log('Confinement et dépendances accessibles ; aucun programme ou test exécuté.');
    return;
  }
  if (process.argv.length !== 2) throw new Error('Option inconnue');

  const child = spawnSync('/usr/bin/python3', [`${bankRoot}/oracle_sql.py`], {
    encoding: 'utf8', timeout: 180000, maxBuffer: 8 * 1024 * 1024
  });
  if (child.error || child.status !== 0) throw new Error('Oracle indépendant indisponible');
  const candidates = JSON.parse(child.stdout);
  if (!Array.isArray(candidates) || candidates.length !== 36) throw new Error('Catalogue du banc incomplet');
  const unique = new Set();
  const results = [];
  const privateFingerprints = {};
  const execute = async ({ code, stdin }) => {
    const result = await sql.execute(code, stdin, { timeoutMs: 10000 });
    return { ...result, ok: result.status === 'success' };
  };

  for (const item of candidates) {
    const exercise = getExercise(item.id);
    if (!exercise || !['sql', 'b3-sql'].includes(exercise.course) || !isGradingSuspended(exercise.course) ||
        unique.has(item.id) || !Array.isArray(item.variants) || item.variants.length !== 2 ||
        item.variants.some(variant => typeof variant.code !== 'string') ||
        item.variants[0].code === item.variants[1].code) throw new Error('Entrée invalide dans le banc');
    unique.add(item.id);
    privateFingerprints[item.id] = crypto.createHash('sha256')
      .update(JSON.stringify({ tests: exercise.tests, solution: exercise.solution })).digest('hex');
    let reference = 'non_evaluee';
    try {
      reference = graderState(await runTests(exercise, exercise.solution, { execute }));
    } catch (_) {
      reference = 'non_evaluee';
    }
    const variants = [];
    for (const variant of item.variants) {
      let grade = 'non_evaluee';
      try {
        grade = graderState(await runTests(exercise, variant.code, { execute }));
      } catch (_) {
        grade = 'non_evaluee';
      }
      const hiddenCases = [];
      for (const [caseIndex, hiddenCase] of exercise.tests.slice(0, MAX_TESTS).entries()) {
        const isolated = { ...exercise, tests: [hiddenCase], verifyFirstExample: false };
        let caseGrade = 'non_evaluee';
        try {
          caseGrade = graderState(await runTests(isolated, variant.code, { execute }));
        } catch (_) {
          caseGrade = 'non_evaluee';
        }
        hiddenCases.push({ numero: caseIndex + 1, etat: caseGrade });
      }
      variants.push({
        oracle: item.reference_independante === 'conforme' ? variant.oracle : 'non_evaluee',
        correcteur: grade,
        cas_caches: hiddenCases,
        preuve: item.reference_independante === 'conforme' && reference === 'acceptee' &&
          variant.oracle === 'rejetee' && grade === 'rejetee'
      });
    }
    const firstExclusive = variants[0].cas_caches.filter((entry, index) =>
      entry.etat === 'rejetee' && variants[1].cas_caches[index].etat === 'acceptee');
    const secondExclusive = variants[1].cas_caches.filter((entry, index) =>
      entry.etat === 'rejetee' && variants[0].cas_caches[index].etat === 'acceptee');
    const witnesses = firstExclusive.flatMap(first => secondExclusive.map(second => [first.numero, second.numero]))
      .find(pair => {
        const inputs = pair.map(index => exercise.tests[index - 1].stdin);
        return comparableStimulus(sql, exercise, inputs[0]) !== comparableStimulus(sql, exercise, inputs[1]) &&
          inputs.every(input => !witnessVisibleInProjection(sql, toClient, exercise, input));
      });
    results.push({
      id: item.id,
      cours: exercise.course,
      reference_independante: item.reference_independante,
      reference_correcteur: reference,
      temoins_exclusifs: witnesses || [],
      variantes: variants
    });
  }

  const stable = JSON.stringify(before) === JSON.stringify(fingerprints(files));
  if (!stable) {
    for (const result of results) for (const variant of result.variantes) variant.preuve = false;
  }
  const covered = results.filter(result => result.variantes.filter(variant => variant.preuve).length === 2).length;
  const exclusive = results.filter(result => result.temoins_exclusifs.length === 2).length;
  const report = {
    date: new Date().toISOString(),
    sources_stables: stable,
    exercices_evalues: results.length,
    deux_variantes_rejetees: covered,
    deux_temoins_exclusifs: exclusive,
    empreintes_sources: before,
    empreintes_exercices: privateFingerprints,
    provenance: ['server/exercises/sql.js', 'server/exercises/b3-sql.js', 'server/exercises/runner.js',
      'assets/js/engines/sql-wasm-engine.js', 'cas_sql.py', 'oracle_sql.py'],
    limites: [
      'Les deux mutations ont été jugées incorrectes sur une base témoin indépendante ; elles ne représentent pas toutes les erreurs possibles.',
      'Deux témoins exclusifs montrent que deux cas notés distinguent ces deux erreurs ; leur absence ne prouve pas que les cas sont dépendants.',
      'Le contrôle de visibilité cherche les stimuli complets dans la projection et les exemples ; il ne démontre ni secret cryptographique ni imprévisibilité.',
      'Le contrôle d’index partiel vérifie des plans et des colonnes sur les conditions sondées, pas une équivalence générale de tous les prédicats SQL.',
      'Les moteurs sql.js et SQLite natif sont locaux ; le fournisseur distant et la notation suspendue ne sont pas validés.'
    ],
    exercices: results
  };
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
  if (!stable || covered !== results.length || exclusive !== results.length) process.exitCode = 1;
}

main().catch(() => {
  console.error('Banc interrompu : confinement, oracle ou sources indisponibles.');
  process.exitCode = 2;
});
