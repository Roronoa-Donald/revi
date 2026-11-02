'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const { listExercises } = require('../server/exercises');

const base = path.resolve(__dirname, '../corrections/outils/sondes/generalisation');
const packages = [
  ['cas_algo_b3_1.json', 'algo_b3_1.py', 'al3-'],
  ['cas_algo_b3_2.json', 'algo_b3_2.py', 'al3-'],
  ['cas_linux_b2.json', 'linux_b2.py', 'lx2-'],
  ['cas_b1_linux.json', 'b1_linux.py', 'lx-'],
  ['cas_b1_git.json', 'b1_git.py', 'gt-'],
  ['cas_docker_b2.json', 'docker_b2.py', 'dk2-'],
  ['cas_b3_linux.json', 'linux_b3.py', 'lx3-'],
  ['cas_b3_github.json', 'b3_github.py', 'gh3-'],
  ['cas_react_b2.json', 'react_b2.py', 'rx2-'],
  ['cas_rd_winserver_complement.json', 'rd_winserver.py', 'ws2-'],
  ['cas_admin_vm_complement.json', 'admin_vm.py', 'vm2-'],
  ['cas_flask_b2.json', 'flask_b2.py', 'fl2-'],
  ['cas_java_b2.json', 'java_b2.py', 'java2-']
];

function readCases(file) {
  return JSON.parse(fs.readFileSync(path.join(base, file), 'utf8')).exercices;
}

test('les paquets de généralisation sont rattachés à des fiches uniques', () => {
  const catalogue = new Map(listExercises().map(exercise => [exercise.id, exercise]));
  const existing = [...readCases('cas.json'), ...readCases('cas_algo.json')];
  const seen = new Set(existing.map(exercise => exercise.id));
  assert.equal(seen.size, existing.length);
  for (const [casesFile, oracleFile, prefix] of packages) {
    assert.ok(fs.statSync(path.join(base, oracleFile)).isFile());
    const exercises = readCases(casesFile);
    assert.ok(Array.isArray(exercises));
    for (const exercise of exercises) {
      assert.ok(exercise.id.startsWith(prefix), exercise.id);
      assert.ok(catalogue.has(exercise.id), exercise.id);
      assert.equal(exercise.oracle, exercise.id);
      assert.ok(!seen.has(exercise.id), `identifiant dupliqué : ${exercise.id}`);
      seen.add(exercise.id);
      assert.ok(['nombres', 'mots', 'ligne', 'lignes', 'lignes_casse_ignoree'].includes(exercise.codec), exercise.id);
      assert.equal(exercise.cas.length, 2, exercise.id);
      assert.notEqual(exercise.cas[0].entree, exercise.cas[1].entree, exercise.id);
      assert.ok(exercise.cas.every(item => typeof item.entree === 'string' && typeof item.attendu === 'string'), exercise.id);
      const sourceRoot = path.resolve(__dirname, '../server/exercises');
      const source = path.resolve(sourceRoot, exercise.source);
      assert.ok(source.startsWith(`${sourceRoot}${path.sep}`) && source.endsWith('.js'), exercise.id);
      assert.ok(fs.readFileSync(source, 'utf8').includes(exercise.id), exercise.id);
    }
  }
});

test('les attendus manuels concordent avec les oracles des paquets', () => {
  const payload = packages.map(([casesFile, oracleFile]) => ({
    path: path.join(base, oracleFile), exercises: readCases(casesFile)
  }));
  const script = [
    'import importlib.util,json,sys',
    'result=[]',
    'for package in json.load(sys.stdin):',
    ' spec=importlib.util.spec_from_file_location("oracle",package["path"])',
    ' module=importlib.util.module_from_spec(spec)',
    ' spec.loader.exec_module(module)',
    ' for exercise in package["exercises"]:',
    '  for case in exercise["cas"]:',
    '   result.append({"id":exercise["id"],"actual":module.calculer(exercise["oracle"],case["entree"]),"expected":case["attendu"]})',
    'print(json.dumps(result,ensure_ascii=False))'
  ].join('\n');
  const result = spawnSync('/usr/bin/python3', ['-I', '-B', '-c', script], {
    input: JSON.stringify(payload), encoding: 'utf8', timeout: 30000, maxBuffer: 4 * 1024 * 1024,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }
  });
  assert.equal(result.status, 0, result.stderr);
  const results = JSON.parse(result.stdout);
  assert.equal(results.length, payload.reduce((total, item) => total + item.exercises.length * 2, 0));
  for (const item of results) assert.equal(item.actual, item.expected, item.id);
});

test('l’oracle Java vérifie des signes et limites indépendamment des deux jeux', () => {
  const cases = [
    ['java2-c2-e1', '-42', 'pair'],
    ['java2-c3-e3', '1', 'non premier'],
    ['java2-c3-e3', '2', 'premier'],
    ['java2-c6-e1', '-5 2', 'resultat : -2'],
    ['java2-c6-e1', '5 -2', 'resultat : -2'],
    ['java2-c6-e2', '2147483647', 'valeur : 2147483647'],
    ['java2-c6-e2', '-2147483649', 'saisie invalide'],
    ['java2-c6-e3', '12 13', 'erreur : solde insuffisant']
  ];
  const script = [
    'import importlib.util,json,sys',
    'spec=importlib.util.spec_from_file_location("oracle",sys.argv[1])',
    'module=importlib.util.module_from_spec(spec)',
    'spec.loader.exec_module(module)',
    'print(json.dumps([module.calculer(identifier,entry) for identifier,entry,_ in json.load(sys.stdin)],ensure_ascii=False))'
  ].join('\n');
  const result = spawnSync('/usr/bin/python3', ['-I', '-B', '-c', script, path.join(base, 'java_b2.py')], {
    input: JSON.stringify(cases), encoding: 'utf8', timeout: 30000, maxBuffer: 1024 * 1024,
    env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), cases.map(item => item[2]));
});

test('le banc respecte les espaces et sauts de ligne en mode exact', () => {
  const script = [
    'import ast,json,sys',
    'source=ast.parse(open(sys.argv[1],encoding="utf-8").read())',
    'functions=[node for node in source.body if isinstance(node,ast.FunctionDef) and node.name in {"normaliser","etat_sortie"}]',
    'namespace={"executer_solution":lambda exercise,entry:{"etat":"exécuté","sortie":entry}}',
    'exec(compile(ast.Module(body=functions,type_ignores=[]),"<banc>","exec"),namespace)',
    'examples=[("alpha \\n","alpha\\n","exact"),("alpha \\n","alpha\\n","normalise"),("alpha \\n","alpha \\n","exact"),("alpha \\n","alpha ","exact")]',
    'print(json.dumps([namespace["etat_sortie"]({}, {"entree":actual,"attendu":expected,"mode":mode})["etat"] for actual,expected,mode in examples]))'
  ].join('\n');
  const result = spawnSync('/usr/bin/python3', ['-I', '-B', '-c', script, path.join(base, 'banc.py')], {
    encoding: 'utf8', timeout: 30000, env: { PATH: '/usr/bin:/bin', LANG: 'C.UTF-8' }
  });
  assert.equal(result.status, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), ['échoué', 'réussi', 'réussi', 'échoué']);
});
