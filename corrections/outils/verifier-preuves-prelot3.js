'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const catalogue = require('../../server/exercises');
const policy = require('../../server/exercises/grading-policy');
const approved = require('../../server/exercises/grading-evidence.json');
const sqlEngine = require('../../assets/js/engines/sql-wasm-engine');
const { witnessVisibleInProjection } = require('./sondes/couverture/stimuli');

const root = path.resolve(__dirname, '../..');
const results = path.join(root, 'corrections/resultats');
const read = name => fs.readFileSync(path.join(results, name), 'utf8');
const json = name => JSON.parse(read(name));
const digest = value => crypto.createHash('sha256').update(value).digest('hex');
const sourceDigest = names => digest([...new Set(names)].sort().map(name => {
  const resolved = path.resolve(root, 'server/exercises', name);
  assert.ok(resolved.startsWith(path.join(root, 'server/exercises') + path.sep));
  return fs.readFileSync(resolved, 'utf8');
}).join('\n'));
const fileDigest = name => digest(fs.readFileSync(path.join(root, name)));

function decimal(value) {
  const match = /^([+-]?)(\d*)(?:\.(\d*))?(?:[eE]([+-]?\d+))?$/.exec(value);
  assert.ok(match && (match[2] || match[3]), 'Nombre non canonisable');
  const digits = ((match[2] || '') + (match[3] || '')).replace(/^0+/, '');
  if (!digits) return '0';
  const significant = digits.replace(/0+$/, '');
  const exponent = BigInt(match[4] || '0') - BigInt((match[3] || '').length) + BigInt(digits.length - significant.length);
  return `${match[1] === '-' ? '-' : ''}${significant}e${exponent}`;
}

function canonical(input, codec) {
  const value = String(input || '').replace(/\r\n?/g, '\n');
  if (codec === 'nombres') return JSON.stringify(value.trim().split(/\s+/).map(decimal));
  if (codec === 'lignes') return JSON.stringify(value.replace(/\n$/, '').split('\n').map(line => line.trimEnd()));
  if (codec === 'lignes_casse_ignoree') return JSON.stringify(value.split('\n').map(line => line.trim().toLowerCase()).filter(Boolean));
  throw new Error(`Codec non contrôlé : ${codec}`);
}

const lines = read('etat-exercices-lot2.tsv').trimEnd().split('\n');
const headings = lines.shift().split('\t');
const initial = lines.map(line => {
  const fields = line.split('\t');
  return Object.fromEntries(headings.map((heading, index) => [heading, fields[index] || '']));
}).filter(row => row.langage !== 'analyse' && row.suspension === 'non suspendue');
assert.equal(initial.length, 289);

const audit = json('lot2-finale-v13-generalisation.json');
assert.equal(audit.programmes.isolation.pid1, 'bwrap');
assert.equal(audit.programmes.isolation.reseau_separe, true);
assert.equal(audit.programmes.isolation.catalogue_absent, true);
const generalisation = new Map(audit.programmes.exercices.map(item => [item.id, item]));
const linux = json('lot2-apres-oracle-linux-variantes.json');
const linuxDefinitions = require('./sondes/b1-linux-variantes-partie3');
assert.equal(linux.sources_stables, true);
for (const [filename, expected] of Object.entries(linux.empreintes_sources)) assert.equal(fileDigest(filename), expected, filename);
const reports = {
  'b1-git': ['b1-git-integre-lot1-partie3.json', json('b1-git-integre-lot1-partie3.json')],
  'b1-linux': ['lot2-apres-oracle-linux-variantes.json', linux],
  rd_winserver: ['rd_winserver-lot1-partie3-integre.json', json('rd_winserver-lot1-partie3-integre.json')],
  react: ['react-b2-lot1-partie3.json', json('react-b2-lot1-partie3.json')]
};
assert.equal(fileDigest('server/exercises/runner.js'), reports.rd_winserver[1].versions.runner_sha256);
const windowsManifestPath = 'corrections/outils/sondes/generalisation/cas_rd_winserver.json';
const windowsOraclePath = 'corrections/outils/sondes/generalisation/rd_winserver.py';
const windowsManifest = JSON.parse(fs.readFileSync(path.join(root, windowsManifestPath), 'utf8'));
assert.equal(fileDigest(windowsManifestPath), reports.rd_winserver[1].versions.manifeste_sha256);
assert.equal(fileDigest(windowsOraclePath), reports.rd_winserver[1].versions.oracle_sha256);

function proofEntry(report, id) {
  return Array.isArray(report.exercices) ? report.exercices.find(entry => entry.id === id) : report.exercices[id];
}

function acceptedVariants(exercise, report) {
  const entry = proofEntry(report, exercise.id);
  assert.ok(entry, exercise.id);
  if (exercise.course === 'b1-linux') {
    assert.equal(entry.corrigé_temoins_inedits.etat, 'acceptee');
    assert.equal(entry.corrigé_temoins_inedits.nombre, 2);
    return entry.variantes.filter(variant => variant.tests_actifs.etat === 'rejetee' &&
      variant.temoins_inedits.etat === 'rejetee').map(variant => {
      const definition = linuxDefinitions[exercise.id].find(item => item[0] === variant.libelle);
      assert.ok(definition && exercise.solution.split(definition[1]).length === 2, exercise.id);
      const source = exercise.solution.replace(definition[1], () => definition[2]);
      assert.equal(digest(source), variant.sha256, exercise.id);
      return { hash: variant.sha256, label: variant.libelle, test: variant.tests_actifs.index + 1 };
    });
  }
  if (exercise.course === 'rd_winserver') {
    assert.equal(sourceDigest(entry.origines || [entry.source]), entry.source_sha256, exercise.id);
    assert.equal(digest(exercise.solution), entry.solution_sha256, exercise.id);
    const definition = [...windowsManifest.exercices, ...windowsManifest.domaines_finis]
      .find(item => item.id === exercise.id);
    assert.ok(definition, exercise.id);
    return entry.candidats.filter(candidate => candidate.actifs?.etat === 'rejeté : mauvaise sortie' ||
      (candidate.nature === 'variante' && candidate.actifs?.etat === 'rejeté' && candidate.actifs.stop?.reason === 'wrong_output'))
      .map(candidate => {
        assert.equal(candidate.actifs.stop.reason, 'wrong_output', exercise.id);
        const mutation = definition.mutants.find(item => item.nom === candidate.nom);
        assert.ok(mutation && exercise.solution.split(mutation.ancien).length === 2, exercise.id);
        const code = exercise.solution.replace(mutation.ancien, () => mutation.nouveau);
        assert.equal(digest(code), candidate.code_sha256, exercise.id);
        return { hash: candidate.code_sha256, label: candidate.nom, test: candidate.actifs.stop.testIndex + 1 };
      });
  }
  assert.equal(sourceDigest(entry.generalisation.modules_source), entry.generalisation.empreinte_source, exercise.id);
  assert.equal(entry.generalisation.empreinte_corrige, digest(exercise.solution), exercise.id);
  return entry.variantes.filter(variant => variant.correcteur?.etat === 'rejeté' &&
    (variant.erreur_etablie === true || variant.temoins.some(witness => witness.etat_comparaison === 'incorrect')))
    .map(variant => {
      const fingerprint = variant.sha256 || variant.empreinte_sha256;
      assert.equal(digest(variant.source), fingerprint, exercise.id);
      assert.equal(variant.correcteur.rapport.stop.reason, 'wrong_output', exercise.id);
      return { hash: fingerprint, label: variant.nom, test: variant.correcteur.rapport.stop.testIndex + 1 };
    });
}

const output = ['cours\tidentifiant\tetat\tcas_inedit_1_sha256\tcas_inedit_2_sha256\tvariante_1_sha256\tvariante_2_sha256\ttest_rejet_1\ttest_rejet_2\tpreuve_cas\tpreuve_variantes\tlimite'];
let verified = 0;
for (const row of initial) {
  const exercise = catalogue.getExercise(row.identifiant);
  assert.ok(exercise && exercise.course === row.cours, row.identifiant);
  if (!Object.hasOwn(approved, exercise.id)) {
    assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), true, exercise.id);
    const missing = [];
    if (row.deux_cas_nouveaux !== 'oui') missing.push('deux entrées inédites non établies selon les preuves retenues');
    if (row.deux_variantes_etablies !== 'oui') missing.push('deux rejets non établis selon les preuves retenues');
    output.push([row.cours, row.identifiant, 'suspendue', '', '', '', '', '', '', row.preuve_cas_nouveaux,
      row.preuves_variantes, missing.join(' ; ') || 'preuve non retenue'].join('\t'));
    continue;
  }
  assert.equal(row.deux_cas_nouveaux, 'oui', exercise.id);
  assert.equal(row.deux_variantes_etablies, 'oui', exercise.id);
  assert.equal(policy.isGradingSuspended(exercise.course, exercise.id), false, exercise.id);
  assert.equal(policy.exerciseFingerprint(exercise), approved[exercise.id], exercise.id);
  const reference = generalisation.get(exercise.id);
  assert.ok(reference && reference.etat === 'réussi' && reference.cas.length === 2, exercise.id);
  assert.equal(sourceDigest(reference.modules_source), reference.empreinte_source, exercise.id);
  assert.equal(digest(exercise.solution), reference.empreinte_corrige, exercise.id);
  const known = new Set([...exercise.tests, ...exercise.examples].map(item => canonical(item.stdin, reference.codec)));
  const fresh = new Set();
  for (const item of reference.cas) {
    assert.equal(item.etat, 'réussi', exercise.id);
    assert.equal(item.oracle_verifie, true, exercise.id);
    const key = canonical(item.entree, reference.codec);
    assert.ok(!known.has(key) && !fresh.has(key), exercise.id);
    assert.equal(witnessVisibleInProjection(sqlEngine, catalogue.toClient, exercise, item.entree), false, exercise.id);
    fresh.add(key);
  }
  const [proofName, report] = reports[exercise.course] || [];
  assert.ok(report, exercise.id);
  const variants = acceptedVariants(exercise, report);
  assert.ok(variants.length >= 2 && variants[0].hash !== variants[1].hash, exercise.id);
  assert.match(variants[0].hash, /^[a-f0-9]{64}$/);
  assert.match(variants[1].hash, /^[a-f0-9]{64}$/);
  output.push([row.cours, row.identifiant, 'active', ...reference.cas.map(item => digest(item.entree)),
    variants[0].hash, variants[1].hash, variants[0].test, variants[1].test,
    'lot2-finale-v13-generalisation.json', proofName,
    'deux essais et deux mutations seulement ; pas une preuve générale'].join('\t'));
  verified++;
}
assert.equal(verified, 62);
assert.equal(Object.keys(approved).length, verified + 4);
const methodProof = json('prelot3-methodes.json');
assert.equal(methodProof.schema, 'revi-prelot3-methodes-v1');
assert.equal(methodProof.fournisseurs_distants_testes, false);
assert.equal(Object.keys(methodProof.sources_sha256).length, 10);
for (const [filename, expected] of Object.entries(methodProof.sources_sha256)) {
  assert.equal(fileDigest(filename), expected, filename);
}
assert.equal(methodProof.exercices.length, 4);
for (const id of ['algo-c6-e3', 'algo-c9-e1', 'algo-c9-e3', 'algo-c10-e3']) {
  const exercise = catalogue.getExercise(id);
  assert.ok(exercise && approved[id] === policy.exerciseFingerprint(exercise), id);
  assert.equal(policy.isGradingSuspended(exercise.course, id), false, id);
  const entries = methodProof.exercices.filter(entry => entry.id === id);
  assert.equal(entries.length, 1, id);
  const entry = entries[0];
  assert.equal(entry.empreinte_fiche, approved[id], id);
  assert.equal(entry.corrige_sha256, digest(exercise.solution), id);
  assert.equal(entry.cas_inedits.length, 2, id);
  const known = new Set([...exercise.tests, ...exercise.examples].map(item => digest(item.stdin.trim())));
  for (const sample of entry.cas_inedits) {
    assert.match(sample.entree_sha256, /^[a-f0-9]{64}$/);
    assert.ok(!known.has(sample.entree_sha256), id);
    known.add(sample.entree_sha256);
    assert.equal(sample.etat, 'conforme', id);
    assert.equal(sample.attendu_oracle_sha256, sample.sortie_sha256, id);
    assert.match(sample.sortie_sha256, /^[a-f0-9]{64}$/);
  }
  assert.equal(entry.variantes.length, 2, id);
  assert.notEqual(entry.variantes[0].code_sha256, entry.variantes[1].code_sha256, id);
  for (const variant of entry.variantes) {
    assert.match(variant.code_sha256, /^[a-f0-9]{64}$/);
    assert.ok((variant.verdict === 'rejet_mauvaise_sortie' && variant.http === 200) ||
      (variant.verdict === 'refus_sans_note_methode_non_etablie' && variant.http === 422), id);
  }
}
process.stdout.write(output.join('\n') + '\n');
