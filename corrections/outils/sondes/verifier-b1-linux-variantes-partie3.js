'use strict';

const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const crypto = require('node:crypto');
const { spawnSync } = require('node:child_process');
const catalogue = require('../../../server/exercises');
const { runTests } = require('../../../server/exercises/runner');
const mutations = require('./b1-linux-variantes-partie3');
const definitions = require('./generalisation/cas_b1_linux.json').exercices;

const root = path.resolve(__dirname, '../../..');
const sources = [
  'server/exercises/index.js', 'server/exercises/b1-linux.js', 'server/exercises/runner.js',
  'corrections/outils/sondes/b1-linux-variantes-partie3.js',
  'corrections/outils/sondes/verifier-b1-linux-variantes-partie3.js',
  'corrections/outils/sondes/generalisation/b1_linux.py',
  'corrections/outils/sondes/generalisation/cas_b1_linux.json'
];
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const fingerprint = () => Object.fromEntries(sources.map(file => [file, hash(fs.readFileSync(path.join(root, file)))]));
const initial = fingerprint();
const temporary = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-b1-linux-variantes-'));

function execute({ code, stdin }) {
  const directory = fs.mkdtempSync(path.join(temporary, 'candidat-'));
  const source = path.join(directory, 'programme.sh');
  try {
    fs.writeFileSync(source, code, { mode: 0o600 });
    const result = spawnSync('/usr/bin/bwrap', [
      '--die-with-parent', '--unshare-all', '--clearenv', '--ro-bind', '/usr', '/usr',
      '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
      '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--ro-bind', source, '/programme.sh',
      '--chdir', '/tmp', '--setenv', 'PATH', '/usr/bin:/bin', '--setenv', 'LANG', 'C.UTF-8',
      '/bin/bash', '/programme.sh'
    ], { input: stdin, encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024 });
    if (result.error) throw result.error;
    if (result.status !== 0) {
      throw new Error(`Échec d'exécution du candidat (${result.status}) : ${String(result.stderr).slice(0, 500)}`);
    }
    return { ok: true, status: 'success', stdout: result.stdout, stderr: result.stderr, exitCode: result.status };
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function summary(report) {
  if (!report.ok) return { etat: 'erreur_execution', erreur: report.error };
  if (report.stop?.reason === 'wrong_output') return { etat: 'rejetee', index: report.stop.testIndex };
  if (report.stop) return { etat: 'autre_arret', raison: report.stop.reason };
  return { etat: 'acceptee', nombre: report.passed };
}

async function main() {
  if (definitions.length !== 17 || Object.keys(mutations).length !== 17) throw new Error('Périmètre inattendu');
  const exercises = [];
  for (const definition of definitions) {
    const exercise = catalogue.getExercise(definition.id);
    const specs = mutations[definition.id];
    if (!exercise || exercise.course !== 'b1-linux' || !Array.isArray(specs) || specs.length !== 2) {
      throw new Error(`Fiche ou paire absente : ${definition.id}`);
    }
    const freshExercise = { ...exercise, tests: definition.cas.map((item, index) => ({
      label: `Témoin inédit ${index + 1}`, stdin: item.entree, expected: item.attendu
    })), verifyFirstExample: false };
    const correct = summary(await runTests(freshExercise, exercise.solution, { execute }));
    const variants = [];
    for (const [label, before, after] of specs) {
      if (!before || exercise.solution.split(before).length !== 2) throw new Error(`Mutation ambiguë : ${definition.id} ${label}`);
      const code = exercise.solution.replace(before, () => after);
      if (code === exercise.solution) throw new Error(`Mutation sans effet : ${definition.id} ${label}`);
      const current = summary(await runTests(exercise, code, { execute }));
      const fresh = summary(await runTests(freshExercise, code, { execute }));
      const individual = [];
      for (const testCase of freshExercise.tests) {
        individual.push(summary(await runTests({ ...freshExercise, tests: [testCase] }, code, { execute })));
      }
      variants.push({ libelle: label, sha256: hash(code), tests_actifs: current,
        temoins_inedits: fresh, par_temoin: individual });
    }
    const [first, second] = variants.map(variant => variant.par_temoin.map(item => item.etat));
    const crossed = (first[0] === 'rejetee' && second[0] === 'acceptee' && first[1] === 'acceptee' && second[1] === 'rejetee') ||
      (first[0] === 'acceptee' && second[0] === 'rejetee' && first[1] === 'rejetee' && second[1] === 'acceptee');
    exercises.push({ id: definition.id, corrigé_temoins_inedits: correct, temoins_croises: crossed, variantes: variants });
  }
  const final = fingerprint();
  const stable = JSON.stringify(initial) === JSON.stringify(final);
  const counts = {
    exercices: exercises.length,
    corriges_conformes_aux_deux_temoins: exercises.filter(item => item.corrigé_temoins_inedits.etat === 'acceptee' && item.corrigé_temoins_inedits.nombre === 2).length,
    variantes: exercises.reduce((total, item) => total + item.variantes.length, 0),
    variantes_rejetees_tests_actifs: exercises.flatMap(item => item.variantes).filter(item => item.tests_actifs.etat === 'rejetee').length,
    variantes_rejetees_temoins_inedits: exercises.flatMap(item => item.variantes).filter(item => item.temoins_inedits.etat === 'rejetee').length,
    exercices_temoins_croises: exercises.filter(item => item.temoins_croises).length,
    incidents: exercises.flatMap(item => [item.corrigé_temoins_inedits, ...item.variantes.flatMap(variant => [variant.tests_actifs, variant.temoins_inedits, ...variant.par_temoin])])
      .filter(item => item.etat === 'erreur_execution' || item.etat === 'autre_arret').length
  };
  console.log(JSON.stringify({ schema: 'revi-b1-linux-variantes-partie3-v1', node: process.version,
    isolation: 'candidat seul, sans réseau ni home ni catalogue, par bubblewrap',
    sources_stables: stable, empreintes_sources: initial, totaux: counts, exercices: exercises }, null, 2));
  if (!stable || counts.incidents || counts.corriges_conformes_aux_deux_temoins !== 17 ||
      counts.variantes_rejetees_tests_actifs !== 34 || counts.variantes_rejetees_temoins_inedits !== 34 ||
      counts.exercices_temoins_croises !== 17) process.exitCode = 1;
}

main().catch(error => {
  console.error(error.stack || String(error));
  process.exitCode = 2;
}).finally(() => fs.rmSync(temporary, { recursive: true, force: true }));
