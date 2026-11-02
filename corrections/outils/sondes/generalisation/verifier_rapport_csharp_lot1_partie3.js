'use strict';

const assert = require('node:assert/strict');
const { createHash } = require('node:crypto');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(process.argv[3] || process.cwd());
const reportPath = path.resolve(process.argv[2] || path.join(root, 'corrections/resultats/generalisation-csharp-lot1-partie3.json'));
const read = relative => fs.readFileSync(path.join(root, relative));
const readJson = relative => JSON.parse(read(relative).toString('utf8'));
const sha = value => createHash('sha256').update(value).digest('hex');
const normalize = value => value.replace(/\r\n?/g, '\n').replace(/\n+$/, '');
const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
const fixtures = readJson('corrections/outils/sondes/generalisation/cas_csharp_lot1_partie3.json').exercices;
const mutations = readJson('corrections/outils/sondes/generalisation/mutants_csharp_lot1_partie3.json');
const catalogue = require(path.join(root, 'server/exercises/csharp.js'));
const extractionPath = path.join(root, 'corrections/outils/sondes/generalisation/extraire_csharp_lot1_partie3.js');
const extraction = spawnSync(process.execPath, [extractionPath, root], { encoding: 'utf8', timeout: 90000, maxBuffer: 8 * 1024 * 1024 });
assert.equal(extraction.status, 0, extraction.stderr);
const sources = JSON.parse(extraction.stdout);

assert.equal(report.schema, 'revi-csharp-lot1-partie3-v1');
assert.equal(report.notation_csharp_suspendue, true);
assert.equal(sources.notation_csharp_suspendue, true);
assert.equal(report.sources_stables_pendant_copie, true);
assert.deepEqual(report.sources_modifiees_apres_copie, []);
assert.equal(report.outils.empreintes_stables, true);
assert.deepEqual(report.profil_tests_historiques, sources.profil_tests);
assert.deepEqual(report.inventaire, sources.inventaire);
for (const [file, expected] of Object.entries(report.sources_sha256)) assert.equal(sha(read(file)), expected, file);

function verifierSortie(resultat, attendu) {
  assert.equal(resultat.execute, true);
  assert.equal(resultat.code_sortie, 0);
  assert.equal(sha(resultat.sortie), resultat.sortie_sha256);
  const etat = normalize(resultat.sortie) === normalize(attendu) ? 'conforme' : 'sortie_incorrecte';
  assert.equal(resultat.etat, etat);
  return etat;
}

function verifierHistoriques(historique, anciens) {
  assert.equal(historique.nombre, anciens.length);
  assert.equal(historique.preuves.length, anciens.length);
  const etats = {};
  historique.preuves.forEach((preuve, index) => {
    const ancien = anciens[index];
    assert.equal(preuve.origine, ancien.origine);
    assert.equal(preuve.index, ancien.index);
    assert.equal(preuve.execute, true);
    assert.ok(['conforme', 'sortie_incorrecte'].includes(preuve.etat));
    if (preuve.etat === 'conforme') {
      const attendu = normalize(ancien.expected);
      const variantes = [attendu, attendu + '\n', attendu + '\r\n'];
      assert.ok(variantes.some(sortie => sha(sortie) === preuve.sortie_sha256), 'Empreinte historique conforme inexpliquée');
    } else {
      assert.equal(preuve.attendu, ancien.expected);
      assert.equal(sha(preuve.sortie), preuve.sortie_sha256);
      assert.notEqual(normalize(preuve.sortie), normalize(ancien.expected));
    }
    etats[preuve.etat] = (etats[preuve.etat] || 0) + 1;
  });
  assert.deepEqual(historique.etats, etats);
  return etats;
}

const comptes = { exercices: 0, cas: 0, sondes: 0, mutants: 0, mutantsRejetes: 0, survivantsHistoriques: 0,
  executionsHistoriques: 0, corrigesConformes: 0, corrigesIncorrects: 0, sondesIncorrectes: 0 };
assert.equal(fixtures.length, 17);
assert.equal(Object.keys(report.exercices).length, 17);
for (const definition of fixtures) {
  const id = definition.id;
  const exercice = report.exercices[id];
  const source = sources.exercices.find(item => item.id === id);
  const original = catalogue.find(item => item.id === id);
  assert.ok(exercice && source && original, id);
  assert.equal(exercice.corrige_sha256, sha(original.solution));
  assert.equal(exercice.compilation_corrige.etat, 'reussie');
  assert.equal(exercice.cas.length, 2);
  assert.equal(exercice.mutants.length, 2);
  const cas = definition.cas;
  const sondes = definition.sondes_conditionnelles || [];
  assert.equal(exercice.sondes_conditionnelles.length, sondes.length);
  cas.forEach((sample, index) => {
    const resultat = exercice.cas[index];
    assert.equal(resultat.entree, sample.entree);
    assert.equal(resultat.attendu, sample.attendu);
    assert.equal(resultat.raison, sample.raison);
    assert.deepEqual(resultat.nouveaute, source.nouveaute[index]);
    assert.equal(resultat.nouveaute.valide, true);
    assert.equal(resultat.reference_verifiee, true);
    const etat = verifierSortie(resultat.corrige, sample.attendu);
    comptes.corrigesConformes += Number(etat === 'conforme');
    comptes.corrigesIncorrects += Number(etat === 'sortie_incorrecte');
    comptes.cas++;
  });
  sondes.forEach((sample, index) => {
    const resultat = exercice.sondes_conditionnelles[index];
    assert.equal(resultat.entree, sample.entree);
    assert.equal(resultat.attendu, sample.attendu);
    assert.equal(resultat.hypothese, sample.hypothese);
    assert.deepEqual(resultat.nouveaute, source.sondes_conditionnelles[index].nouveaute);
    assert.equal(resultat.nouveaute.valide, true);
    assert.equal(resultat.reference_verifiee, true);
    comptes.sondesIncorrectes += Number(verifierSortie(resultat.corrige, sample.attendu) === 'sortie_incorrecte');
    comptes.sondes++;
  });
  verifierHistoriques(exercice.historiques_corrige, source.historiques);
  comptes.executionsHistoriques += source.historiques.length;
  exercice.mutants.forEach((mutant, index) => {
    const mutation = mutations[id][index];
    assert.deepEqual(mutant.definition, mutation);
    assert.equal(original.solution.split(mutation.avant).length, 2);
    assert.equal(mutant.code, original.solution.replace(mutation.avant, mutation.apres));
    assert.equal(mutant.code_sha256, sha(mutant.code));
    assert.equal(mutant.execution.compilation.etat, 'reussie');
    const discriminants = [];
    cas.forEach((sample, numero) => {
      const etat = verifierSortie(mutant.execution.nouveaux[numero], sample.attendu);
      if (etat === 'sortie_incorrecte' && exercice.cas[numero].corrige.etat === 'conforme') discriminants.push(numero + 1);
    });
    sondes.forEach((sample, numero) => verifierSortie(mutant.execution.sondes_conditionnelles[numero], sample.attendu));
    assert.deepEqual(mutant.cas_discriminants, discriminants);
    assert.equal(mutant.rejet_attribuable, discriminants.length > 0);
    const historiques = verifierHistoriques(mutant.execution.historiques, source.historiques);
    comptes.survivantsHistoriques += Number((historiques.conforme || 0) === source.historiques.length);
    comptes.executionsHistoriques += source.historiques.length;
    comptes.mutantsRejetes += Number(mutant.rejet_attribuable);
    comptes.mutants++;
  });
  comptes.exercices++;
}
assert.equal(comptes.cas, report.totaux.cas_nouveaux);
assert.equal(comptes.sondes, report.totaux.sondes_conditionnelles);
assert.equal(comptes.mutants, report.totaux.mutants);
assert.equal(comptes.mutantsRejetes, report.totaux.mutants_rejetes_sur_cas_ou_corrige_conforme);
assert.equal(comptes.survivantsHistoriques, report.totaux.mutants_survivant_tous_les_tests_historiques);
assert.equal(comptes.executionsHistoriques, report.totaux.executions_historiques);
assert.equal(comptes.corrigesConformes, report.totaux.etats_corriges.conforme || 0);
assert.equal(comptes.corrigesIncorrects, report.totaux.etats_corriges.sortie_incorrecte || 0);
assert.equal(comptes.sondesIncorrectes, report.totaux.etats_sondes_conditionnelles.sortie_incorrecte || 0);
assert.equal(report.totaux.executions_nouvelles, (comptes.cas + comptes.sondes) * 3);
console.log(JSON.stringify({ verification: 'reussie', ...comptes }));
