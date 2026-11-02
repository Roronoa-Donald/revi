'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const engine = require('../assets/js/engines/sql-wasm-engine');
const catalogue = require('../server/exercises');
const { sqlStimulus, witnessVisibleInProjection } = require('../corrections/outils/sondes/couverture/stimuli');

test('une annotation SQL ne rend pas inédit un exemple visible', () => {
  const initial = 'CREATE TABLE objets(id INT); INSERT INTO objets VALUES (1);';
  assert.equal(sqlStimulus(engine, initial), sqlStimulus(engine, `${initial}\n-- exemple`));
  const exercise = catalogue.getExercise('sql2-c1-e2');
  assert.equal(witnessVisibleInProjection(engine, catalogue.toClient, exercise, exercise.tests[0].stdin), true);
});

test('deux vérifications SQL différentes restent distinctes sur une même base initiale', () => {
  const setup = 'CREATE TABLE services(id INT);';
  const first = `${setup}\n-- VERIFY:\nSELECT COUNT(*) FROM projets;`;
  const second = `${setup}\n-- VERIFY:\nSELECT COUNT(*) FROM pragma_foreign_key_list('projets');`;
  assert.notEqual(sqlStimulus(engine, first), sqlStimulus(engine, second));
});

test('le contrôle détecte une ligne publique sans confondre une séquence répétée', () => {
  const exercise = {
    language: 'csharp', starter: '', brief: '', examples: [{ stdin: 'PIPELINE Virement\nPIPELINE Facture' }]
  };
  const toClient = item => item;
  assert.equal(witnessVisibleInProjection(engine, toClient, exercise, 'PIPELINE Virement'), true);
  assert.equal(witnessVisibleInProjection(engine, toClient, exercise, 'PIPELINE Virement\nPIPELINE Virement'), false);
});

test('les exemples courts sont comparés même lorsque la recherche de sous-chaîne est limitée', () => {
  const exercise = { language: 'python', examples: [{ stdin: '3' }] };
  assert.equal(witnessVisibleInProjection(engine, item => item, exercise, '3'), true);
});
