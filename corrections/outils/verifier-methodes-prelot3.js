'use strict';

const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../../server/app');
const catalogue = require('../../server/exercises');
const policy = require('../../server/exercises/grading-policy');
const { checkMethod } = require('../../server/exercises/method-check');
const execution = require('../../server/services/execution');
const budget = require('../../server/services/execution/budget');

const root = path.resolve(__dirname, '../..');
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const source = name => sha(fs.readFileSync(path.join(root, name)));
const seed = '1234567890abcdef1234567890abcdef';
const cases = {
  'algo-c6-e3': {
    inputs: ['6\n12\n-7\n4\n-7\n0\n9', '4\n8\n3\n-2\n3'],
    mutations: [
      ['dernier passage omis', 'for debut in range(n - 1):', 'for debut in range(n - 2):'],
      ['minimum mal suivi', 'if tableau[i] < tableau[indice_min]:', 'if tableau[i] < tableau[debut]:']
    ]
  },
  'algo-c9-e1': {
    inputs: ['6\n4\n1\n3\n2\n5\n6', '4\n6\n1\n5\n2'],
    mutations: [
      ['arrêt prématuré', '            a_trier = True', '            a_trier = False'],
      ['passage sans échange omis', 'passages += 1', 'passages += 1 if a_trier else 0']
    ]
  },
  'algo-c9-e3': {
    inputs: ['-3\n4\n12345\n315', '7\n5\n144\n40'],
    mutations: [
      ['puissance zéro faussée', 'if exposant == 0:\n        return 1', 'if exposant == 0:\n        return 0 if base == 0 else 1'],
      ['signe du PGCD ignoré', 'return abs(a)', 'return a']
    ]
  },
  'algo-c10-e3': {
    inputs: ['4\n3\n12\n0\n7', '3\n8\n2\n1'],
    mutations: [
      ['moyenne singleton faussée', '    return attente_totale(durees) / len(durees)', '    if len(durees) == 1:\n        return 1.0\n    return attente_totale(durees) / len(durees)'],
      ['moyenne faussée', 'return attente_totale(durees) / len(durees)', 'return attente_totale(durees) / (len(durees) + 1)']
    ]
  }
};

function oracle(id, input) {
  const values = input.split('\n').map(Number);
  if (id === 'algo-c6-e3') return values.slice(1).sort((left, right) => left - right).join(' ');
  if (id === 'algo-c9-e1') {
    const data = values.slice(1);
    let end = data.length;
    let passes = 0;
    let changed = true;
    while (changed && end > 1) {
      changed = false;
      for (let index = 0; index < end - 1; index++) {
        if (data[index] > data[index + 1]) {
          [data[index], data[index + 1]] = [data[index + 1], data[index]];
          changed = true;
        }
      }
      end--;
      passes++;
    }
    return `${data.join(' ')}\n${passes}`;
  }
  if (id === 'algo-c9-e3') {
    let first = Math.abs(values[2]);
    let second = Math.abs(values[3]);
    while (second) [first, second] = [second, first % second];
    return `${BigInt(values[0]) ** BigInt(values[1])}\n${first}`;
  }
  const durations = values.slice(1);
  const total = durations.reduce((sum, value, index) => sum + value * (durations.length - index - 1), 0);
  return `${total}\n${(total / durations.length).toFixed(2)}`;
}

async function isolatedProvider(payload) {
  assert.equal(payload.language, 'python');
  const args = [
    '--die-with-parent', '--unshare-all', '--new-session', '--clearenv', '--cap-drop', 'ALL',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin', '--symlink', 'usr/lib', '/lib',
    '--symlink', 'usr/lib', '/lib64', '--dir', '/etc', '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
    '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
    '/usr/bin/python3', '-I', '-B', '-c', payload.code
  ];
  const child = spawnSync('/usr/bin/bwrap', args, {
    input: payload.stdin, encoding: 'utf8', timeout: 10000, maxBuffer: 1024 * 1024
  });
  if (child.error) throw child.error;
  return { ok: child.status === 0, status: child.status === 0 ? 'success' : 'runtime_error',
    stdout: child.stdout || '', stderr: child.stderr || '', exitCode: child.status };
}

async function main() {
  for (const filename of ['/usr/bin/bwrap', '/usr/bin/python3', '/etc/ld.so.cache']) assert.ok(fs.existsSync(filename), filename);
  const previous = Object.fromEntries(['JWT_SECRET', 'EXEC_DAILY_LIMIT_PER_USER', 'EXEC_DAILY_LIMIT_GLOBAL']
    .map(name => [name, process.env[name]]));
  const original = execution.execute;
  process.env.JWT_SECRET = 'session-synthetique-prelot3';
  process.env.EXEC_DAILY_LIMIT_PER_USER = '1000';
  process.env.EXEC_DAILY_LIMIT_GLOBAL = '2000';
  execution.execute = isolatedProvider;
  budget.reset();
  const app = buildApp({ logger: false });
  const token = jwt.sign({ userId: 'verification-methodes-locale' }, process.env.JWT_SECRET);
  const rows = [];
  try {
    let request = 0;
    for (const [id, definition] of Object.entries(cases)) {
      const item = catalogue.getExercise(id);
      assert.ok(item && !policy.isGradingSuspended(item.course, id), id);
      assert.equal(definition.inputs.length, 2);
      const known = new Set([...item.tests, ...item.examples].map(entry => entry.stdin.trim()));
      const fresh = [];
      for (const input of definition.inputs) {
        assert.ok(!known.has(input.trim()), id);
        assert.ok(!item.solution.includes(input.trim()) && !item.brief.includes(input.trim()), id);
        known.add(input.trim());
        const expected = oracle(id, input);
        const response = await checkMethod(id, item.solution, isolatedProvider, input, seed);
        assert.equal(response.status, 'verified', `${id} : ${response.reason || ''}`);
        assert.equal(response.output.trim(), expected, id);
        fresh.push({ entree_sha256: sha(input), attendu_oracle_sha256: sha(expected),
          sortie_sha256: sha(response.output.trim()), etat: 'conforme', compteurs: response.actual_counts });
      }
      const mutations = [];
      for (const [label, before, after] of definition.mutations) {
        assert.equal(item.solution.split(before).length, 2, `${id} : ${label}`);
        const variant = item.solution.replace(before, () => after);
        assert.notEqual(variant, item.solution);
        const response = await app.inject({
          method: 'POST', url: '/api/exercise/submit', remoteAddress: `10.42.0.${++request}`,
          cookies: { auth_token: token }, payload: { exerciseId: id, code: variant }
        });
        const body = response.json();
        const rejected = response.statusCode === 200 && body.stop?.reason === 'wrong_output' && body.passed < body.total;
        const unevaluable = response.statusCode === 422 && body.status === 'method_not_evaluable' && body.passed === undefined;
        assert.ok(rejected || unevaluable, `${id} : ${label}, HTTP ${response.statusCode}`);
        mutations.push({ nom: label, code_sha256: sha(variant), http: response.statusCode,
          verdict: rejected ? 'rejet_mauvaise_sortie' : 'refus_sans_note_methode_non_etablie' });
      }
      assert.notEqual(mutations[0].code_sha256, mutations[1].code_sha256, id);
      rows.push({ id, empreinte_fiche: policy.exerciseFingerprint(item), corrige_sha256: sha(item.solution),
        cas_inedits: fresh, variantes: mutations });
    }
    const files = [
      'server/exercises/b1-algo.js', 'server/exercises/runner.js', 'server/exercises/method-check.js',
      'server/exercises/method-probe.py', 'server/exercises/grading-policy.js',
      'server/exercises/grading-evidence.json', 'server/exercises/grading-runtime-evidence.json',
      'server/routes/exercises.js', 'server/services/execution/index.js',
      'corrections/outils/verifier-methodes-prelot3.js'
    ];
    const python = spawnSync('/usr/bin/python3', ['--version'], { encoding: 'utf8', timeout: 5000 });
    assert.equal(python.status, 0);
    process.stdout.write(JSON.stringify({
      date_utc: new Date().toISOString(), schema: 'revi-prelot3-methodes-v1',
      isolation: 'bubblewrap, namespaces séparés, aucune capacité, catalogue et réseau absents',
      node: process.version, python: python.stdout.trim(), graine_reproductible: seed,
      fournisseurs_distants_testes: false,
      sources_sha256: Object.fromEntries(files.map(file => [file, source(file)])),
      exercices: rows,
      limites: ['Les cas et mutations sont finis et ne prouvent pas le comportement général.',
        'Une méthode valide hors du sous-ensemble contrôlé est non évaluable et ne reçoit pas de note.',
        'Le fournisseur distant et son confinement n’ont pas été testés.']
    }, null, 2) + '\n');
  } finally {
    execution.execute = original;
    budget.reset();
    await app.close();
    for (const [name, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[name];
      else process.env[name] = value;
    }
  }
}

main().catch(error => { console.error(error.stack || String(error)); process.exitCode = 1; });
