'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { exploiter } = require('../corrections/outils/sondes/nouvelles-fixtures-suspendus/exploiter');

function exampleReport() {
  const catalogue = [];
  const exercises = {};
  for (const course of ['csharp', 'docker', 'b3-linux', 'b3-github']) {
    for (let index = 1; index <= 18; index++) {
      const id = `${course}-${index}`;
      catalogue.push({ id, course });
      exercises[id] = { cours: course, temoin: { nombre: 1 }, nouveaute: { valide: true },
        resultat: { etat: 'conforme', execute: true } };
    }
  }
  return { catalogue, report: {
    schema: 'revi-vraies-nouvelles-fixtures-suspendus-v1', etat: 'complet_sur_copie',
    sources_stables_pendant_copie: true, rejeu_necessaire: false,
    sources_modifiees_apres_copie: [], banc_modifie_apres_copie: [], exercices: exercises,
    totaux: { exercices: 72, fixtures_creees: 72, nouveaux_litteralement: 72, etats: { conforme: 72 } }
  } };
}

test('les 72 témoins manuels sont comptés sans devenir des oracles paramétriques', () => {
  const { catalogue, report } = exampleReport();
  const result = exploiter(report, 0, catalogue);
  assert.equal(result.counts.conforme, 72);
  assert.equal(result.rows['csharp-1'].etat, 'réussi');
  assert.match(result.rows['csharp-1'].attendu, /sans oracle paramétrique/);
});

test('un rapport instable ou une nouveauté non établie ne passe pas pour une réussite', () => {
  const { catalogue, report } = exampleReport();
  report.rejeu_necessaire = true;
  assert.throws(() => exploiter(report, 0, catalogue), /incomplet ou instable/);
  report.rejeu_necessaire = false;
  report.exercices['docker-1'].nouveaute.valide = false;
  assert.throws(() => exploiter(report, 0, catalogue), /État manuel incohérent/);
});

test('un rejet réel et un défaut d’exécution restent distingués', () => {
  const { catalogue, report } = exampleReport();
  report.etat = 'partiel_sur_copie';
  report.exercices['csharp-1'].resultat.etat = 'sortie_incorrecte';
  report.exercices['docker-1'].resultat = { etat: 'non_evalue', execute: false };
  report.totaux.etats = { conforme: 70, sortie_incorrecte: 1, non_evalue: 1 };
  const result = exploiter(report, 1, catalogue);
  assert.equal(result.rows['csharp-1'].etat, 'échoué');
  assert.equal(result.rows['docker-1'].etat, 'non évalué');
  assert.throws(() => exploiter(report, 0, catalogue), /incomplet ou instable/);
});
