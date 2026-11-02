'use strict';

const { spawnSync } = require('child_process');
const catalogue = require('/project/server/exercises');

const cases = [
  {
    id: 'algo-c6-e3',
    candidates: [{ input: '2\n5\n1\n', expected: '1 5' }, { input: '2\n7\n2\n', expected: '2 7' }],
    from: 'range(n - 1)', to: 'range(n - 2)',
    reason: 'Une dernière paire peut rester non triée.'
  },
  {
    id: 'algo-c10-e1',
    candidates: [{ input: '137\n50\n', expected: '6508' }, { input: '151\n50\n', expected: '7173' }],
    from: 'quantite > 50', to: 'quantite >= 50',
    reason: 'La remise de 10 % est strictement au-delà de 50.'
  },
  {
    id: 'algo-c10-e1',
    candidates: [{ input: '137\n10\n', expected: '1370' }, { input: '151\n10\n', expected: '1510' }],
    from: 'quantite > 10', to: 'quantite >= 10',
    reason: 'La remise de 5 % est strictement au-delà de 10.'
  },
  {
    id: 'web-c1-e2',
    candidates: [{ input: '1\n451\n', expected: '451 erreur client' }, { input: '1\n499\n', expected: '499 erreur client' }],
    from: 'Math.floor(code / 100)', to: 'Math.round(code / 100)',
    reason: 'Le premier chiffre du code détermine sa famille.'
  },
  {
    id: 'gt-c6-e1',
    candidates: [
      { input: '5\nmodifie\nstash\nmodifie\npop\netat\n', expected: 'copie : 2\nremises : 0' },
      { input: '6\nmodifie\nmodifie\nstash\nmodifie\npop\netat\n', expected: 'copie : 3\nremises : 0' }
    ],
    from: 'copie=$((copie + ${remises[$dernier]}))', to: 'copie=${remises[$dernier]}',
    reason: 'Les modifications restaurées s’ajoutent à la copie.'
  },
  {
    id: 'ws2-c2-e2',
    candidates: [{ input: '3\n1201\n', expected: 'charge : 400 req/s' }, { input: '3\n1202\n', expected: 'charge : 400 req/s' }],
    from: '[math]::Floor', to: '[math]::Ceiling',
    reason: 'La consigne prévoit la division entière.'
  },
  {
    id: 'vm2-c3-e2',
    candidates: [{ input: 'exploitation\n', expected: 'tache : superviser et sauvegarder' }],
    from: '"exploitation" { Write-Output "tache : superviser et sauvegarder" }',
    to: '"exploitation" { Write-Output "tache : definir les besoins" }',
    reason: 'La supervision est attribuée à l’exploitation dans la grille fournie.'
  }
];

const probes = cases.map(item => {
  const exercise = catalogue.getExercise(item.id);
  const selected = item.candidates.find(candidate => !exercise.tests.some(test => String(test.stdin).trimEnd() === candidate.input.trimEnd()));
  if (!selected) throw new Error(`Aucune entrée indépendante pour ${item.id}.`);
  if (exercise.solution.split(item.from).length !== 2) throw new Error(`Mutation non unique pour ${item.id}.`);
  const mutated = exercise.solution.replace(item.from, item.to);
  const command = exercise.language === 'python' ? '/usr/bin/python3' : exercise.language === 'javascript' ? '/usr/bin/node' : exercise.language === 'powershell' ? '/runtimes/powershell/pwsh' : '/bin/bash';
  const args = exercise.language === 'python' ? ['-I', '-c'] : exercise.language === 'javascript' ? ['-e'] : exercise.language === 'powershell' ? ['-NoLogo', '-NoProfile', '-NonInteractive', '-Command'] : ['-c'];
  const run = code => {
    const outcome = spawnSync(command, [...args, code], {
      input: selected.input, encoding: 'utf8', timeout: 5000, maxBuffer: 1024 * 1024,
      cwd: '/tmp', env: { PATH: '/usr/bin:/bin', HOME: '/tmp', LANG: 'C.UTF-8' }
    });
    return { executed: outcome.status === 0 && !outcome.error, output: (outcome.stdout || '').trim() };
  };
  const baseline = run(exercise.solution);
  const variant = run(mutated);
  return {
    id: item.id, input: selected.input.trimEnd(), expected: selected.expected, reason: item.reason,
    independent: true,
    baselineExecuted: baseline.executed, baselineCorrect: baseline.output === selected.expected,
    variantExecuted: variant.executed, variantOutput: variant.output, variantIncorrect: variant.output !== selected.expected
  };
});

process.stdout.write(JSON.stringify({ probes }, null, 2) + '\n');
