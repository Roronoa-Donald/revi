'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '../../../..');
const sourceRoot = path.join(root, 'server/exercises');
const resultRoot = path.join(root, 'corrections/resultats');
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const sha256 = value => crypto.createHash('sha256').update(value).digest('hex');
const avant = readJson(path.join(resultRoot, 'admin-vm-avant-lot1-partie3.json'));
const apres = readJson(path.join(resultRoot, 'admin-vm-apres-lot1-partie3.json'));
const definitions = readJson(path.join(__dirname, 'cas_admin_vm.json')).exercices;
const historiques = readJson(path.join(root, 'corrections/fixtures/banc-360.json')).exercises;
const originaux = [];
for (let chapitre = 1; chapitre <= 6; chapitre++) {
  originaux.push(...structuredClone(require(path.join(sourceRoot, `admin-vm/chapitre${chapitre}.js`))));
}
const cataloguePath = require.resolve(path.join(sourceRoot, 'admin-vm.js'));
const catalogue = require(cataloguePath);
const { getExercise, toClient, validateCatalogue } = require(sourceRoot);
const { MAX_TESTS } = require(path.join(sourceRoot, 'runner.js'));

assert.equal(avant.exercices.length, 18);
assert.equal(apres.exercices.length, 18);
assert.equal(definitions.length, 18);
assert.equal(catalogue.length, 18);
assert.equal(MAX_TESTS, 7);
assert.deepEqual(avant.runtime, apres.runtime);
assert.deepEqual(avant.versions.fichiers, apres.versions.fichiers);
for (const [nom, empreinte] of Object.entries(apres.versions.fichiers)) {
  assert.equal(sha256(fs.readFileSync(path.join(__dirname, nom))), empreinte, nom);
}

let testsAjoutes = 0;
let fichesRenforcees = 0;
let exemplesConnus = 0;
let testsRetires = 0;
let variantesHistoriques = 0;
let doublonsHistoriques = 0;
const exclusions = {
  'vm2-c2-e3': { stdin: 'inconnu', expected: 'role : inconnu' },
  'vm2-c4-e1': { stdin: 'x', expected: 'x : inconnu' },
  'vm2-c4-e3': { stdin: 'annuel', expected: 'retention : inconnue' }
};
for (const exercice of catalogue) {
  const original = originaux.find(item => item.id === exercice.id);
  const definition = definitions.find(item => item.id === exercice.id);
  const ligneAvant = avant.exercices.find(item => item.id === exercice.id);
  const ligneApres = apres.exercices.find(item => item.id === exercice.id);
  assert.ok(original && definition && ligneAvant && ligneApres, exercice.id);
  assert.ok(exercice.tests.length <= MAX_TESTS, exercice.id);
  const exclusion = exclusions[exercice.id];
  const retires = original.tests.filter(test => exclusion && test.stdin === exclusion.stdin && test.expected === exclusion.expected);
  assert.equal(retires.length, exclusion ? 1 : 0, exercice.id);
  testsRetires += retires.length;
  const conserves = original.tests.filter(test => !retires.includes(test));
  assert.deepEqual(exercice.tests.slice(0, conserves.length), conserves, exercice.id);
  const ajouts = exercice.tests.slice(conserves.length);
  if (ajouts.length) fichesRenforcees++;
  testsAjoutes += ajouts.length;
  exemplesConnus += ajouts.filter(test => original.examples.some(exemple => exemple.stdin === test.stdin)).length;
  assert.ok(ajouts.every((test, index) => ligneApres.oracle_tests_actifs[conserves.length + index].etat === 'conforme'));
  assert.equal(ligneAvant.corrige_accepte_temoins_et_actifs, true);
  assert.equal(ligneApres.corrige_accepte_temoins_et_actifs, true);
  assert.deepEqual(ligneAvant.temoins_differentiels.matrice_variantes_par_temoin, [['rejeté', 'accepté'], ['accepté', 'rejeté']]);
  assert.deepEqual(ligneApres.temoins_differentiels.matrice_variantes_par_temoin, [['rejeté', 'accepté'], ['accepté', 'rejeté']]);
  const contenus = ligneApres.origines.map(origine => fs.readFileSync(path.join(sourceRoot, origine), 'utf8'));
  assert.equal(sha256(contenus.join('\n')), ligneApres.source_sha256, exercice.id);
  const client = toClient(getExercise(exercice.id));
  assert.equal(Object.hasOwn(client, 'tests'), false);
  assert.equal(Object.hasOwn(client, 'solution'), false);
  const precedentes = historiques.find(item => item.id === exercice.id)?.variants || [];
  variantesHistoriques += precedentes.length;
  for (const variante of definition.variantes) {
    assert.equal(exercice.solution.split(variante.avant).length - 1, 1, `${exercice.id}:${variante.nom}`);
    const code = exercice.solution.replace(variante.avant, variante.apres);
    const old = ligneAvant.candidats.find(item => item.nom === variante.nom);
    const current = ligneApres.candidats.find(item => item.nom === variante.nom);
    assert.ok(old && current);
    assert.equal(old.code_sha256, sha256(code));
    assert.equal(current.code_sha256, sha256(code));
    assert.equal(current.actifs.etat, 'rejeté');
    doublonsHistoriques += precedentes.filter(item => item.code === code).length;
  }
  for (const alternative of definition.alternatives_conformes || []) {
    const ancienne = ligneAvant.candidats.find(item => item.nom === alternative.nom && item.nature === 'alternative_conforme');
    const actuelle = ligneApres.candidats.find(item => item.nom === alternative.nom && item.nature === 'alternative_conforme');
    assert.ok(ancienne && actuelle);
    assert.equal(ancienne.actifs.etat, 'rejeté');
    assert.equal(ancienne.actifs.stop.input, exclusion.stdin);
    assert.equal(actuelle.actifs.etat, 'accepté');
    assert.ok(ancienne.cas_domaine.every(cas => cas.etat === 'accepté'));
    assert.ok(actuelle.cas_domaine.every(cas => cas.etat === 'accepté'));
  }
}
assert.equal(testsAjoutes, 20);
assert.equal(testsRetires, 3);
assert.equal(fichesRenforcees, 14);
assert.equal(doublonsHistoriques, 0);
assert.equal(apres.bilan.comparaisons_non_evaluees, 0);
assert.equal(apres.bilan.variantes_rejetees_actifs, 38);
assert.equal(apres.bilan.corriges_acceptes_actifs_et_temoins, 18);
assert.equal(apres.bilan.paires_differentielles_etablies, 18);
assert.equal(apres.bilan.paires_deux_entrees_nouvelles, 13);
assert.equal(apres.bilan.domaines_finis_epuises, 5);
assert.equal(apres.bilan.alternatives_acceptees_actifs, 3);
assert.equal(validateCatalogue().filter(probleme => probleme.startsWith('vm2-')).length, 0);
const comptes = catalogue.map(exercice => exercice.tests.length);
delete require.cache[cataloguePath];
assert.deepEqual(require(cataloguePath).map(exercice => exercice.tests.length), comptes);

process.stdout.write(JSON.stringify({
  etat: 'réussi',
  fiches: catalogue.length,
  tests_ajoutes: testsAjoutes,
  tests_hors_enonce_retires: testsRetires,
  fiches_renforcees: fichesRenforcees,
  tests_issus_exemples_visibles: exemplesConnus,
  plafond_tests: MAX_TESTS,
  projection_sans_tests_ni_solution: true,
  rechargement_idempotent: true,
  variantes_historiques_comparees: variantesHistoriques,
  doublons_exacts_historiques: doublonsHistoriques,
  empreintes_des_bancs_concordantes: true,
  reprise_automatique_dans_banc_commun: false
}, null, 2) + '\n');
