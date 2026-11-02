'use strict';

const assert = require('node:assert/strict');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const test = require('node:test');
const { getExercise } = require('../server/exercises');
const variants = require('../corrections/outils/sondes/b1-linux-variantes-partie3');
const definitions = require('../corrections/outils/sondes/generalisation/cas_b1_linux.json').exercices;

test('l’oracle indépendant suit le contrat des champs shadow, y compris les zéros initiaux', () => {
  const cases = [
    ['3\nbeta:!hash\ngamma:*\npaul:*NP*\n', 'total : 3\nmdp_bloques : 2\nchamps_vides : 0\naucun'],
    ['3\nlea:\nmoussa:$6$hash\njo:\n', 'total : 3\nmdp_bloques : 0\nchamps_vides : 2\nlea\njo'],
    ['0\n', 'total : 0\nmdp_bloques : 0\nchamps_vides : 0\naucun'],
    ['04\na:!\nb:!$6$sel\nc:\nd:hash\n', 'total : 4\nmdp_bloques : 2\nchamps_vides : 1\nc']
  ];
  const script = [
    'import importlib.util,json,sys',
    'spec=importlib.util.spec_from_file_location("oracle",sys.argv[1])',
    'module=importlib.util.module_from_spec(spec)',
    'spec.loader.exec_module(module)',
    'print(json.dumps([module.calculer("lx-c5-e3",case) for case in json.load(sys.stdin)],ensure_ascii=False))'
  ].join('\n');
  const result = spawnSync('/usr/bin/python3', ['-I', '-B', '-c', script,
    path.join(__dirname, '../corrections/outils/sondes/generalisation/b1_linux.py')], {
    input: JSON.stringify(cases.map(item => item[0])), encoding: 'utf8', timeout: 30000
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), cases.map(item => item[1]));
});

test('les deux mutations du banc correspondent au corrigé actuel et aux deux nouveaux témoins', () => {
  const exercise = getExercise('lx-c5-e3');
  const definition = definitions.find(item => item.id === exercise.id);
  const known = new Set([...exercise.examples, ...exercise.tests].map(item => item.stdin));
  assert.equal(definition.cas.length, 2);
  for (const witness of definition.cas) assert.equal(known.has(witness.entree), false);
  assert.equal(variants[exercise.id].length, 2);
  for (const [label, before, after] of variants[exercise.id]) {
    assert.equal(exercise.solution.split(before).length, 2, label);
    assert.notEqual(before, after, label);
  }
});
