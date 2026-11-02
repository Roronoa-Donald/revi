'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const { test } = require('node:test');
const assert = require('node:assert/strict');
const { existsSync } = require('node:fs');
const { spawnSync } = require('node:child_process');
const { getExercise } = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const execution = require('../server/services/execution');

const exerciseIds = ['lan3-c4-e1', 'fw3-c6-e1', 'ib2-c5-e3', 'cc-c2-e3', 'cc-c5-e1'];
const firewallError = 'ERREUR: proto=ANY incompatible avec dport precis';
const gherkinError = 'ERREUR: Mot-cle non pris en charge par ce parseur';

function getRequiredExercise(id) {
  const exercise = getExercise(id);
  assert.ok(exercise, `Exercice introuvable : ${id}`);
  assert.equal(exercise.language, 'analyse');
  return exercise;
}

function gridCases(exercise) {
  const cases = new Map();
  let current = null;
  for (const line of exercise.starter.split('\n')) {
    const heading = /^\[Cas (\d+) — (.+)\]$/.exec(line);
    if (heading) {
      const number = Number(heading[1]);
      assert.equal(cases.has(number), false, `${exercise.id} : cas ${number} dupliqué`);
      current = { label: heading[2], inputs: [], placeholders: 0 };
      cases.set(number, current);
    } else if (current && line.startsWith('# Données : ')) {
      current.inputs.push(line.slice('# Données : '.length));
    } else if (current && line === 'A_COMPLETER') {
      current.placeholders++;
    }
  }
  return cases;
}

function fixtures(exercise) {
  const cases = gridCases(exercise);
  return [
    ...exercise.examples.map(example => ({ input: example.stdin, expected: example.expected })),
    ...exercise.tests.map(entry => {
      const selector = /^cas:(\d+)$/.exec(entry.stdin);
      assert.ok(selector, `${exercise.id} : sélecteur inconnu ${entry.stdin}`);
      const section = cases.get(Number(selector[1]));
      assert.ok(section, `${exercise.id} : données absentes pour ${entry.stdin}`);
      return { input: section.inputs.join('\n'), expected: entry.expected };
    })
  ];
}

function ospfAnswer(input) {
  const lines = input.split('\n');
  const config = /^OSPF_CONFIG ref_bw=(\d+)$/.exec(lines.shift());
  assert.ok(config, `Configuration OSPF invalide : ${input}`);
  const reference = Number(config[1]);
  assert.ok(reference > 0);
  const paths = lines.map(line => {
    const parsed = /^PATH id=(\S+) hops=(\d+(?:,\d+)*)$/.exec(line);
    assert.ok(parsed, `Chemin OSPF invalide : ${line}`);
    const hops = parsed[2].split(',').map(Number);
    assert.ok(hops.every(bandwidth => bandwidth > 0));
    return {
      id: parsed[1],
      hops,
      cost: hops.reduce((total, bandwidth) => total + Math.max(1, Math.floor(reference / bandwidth)), 0)
    };
  });
  assert.ok(paths.length > 0);
  paths.sort((left, right) => left.id < right.id ? -1 : left.id > right.id ? 1 : 0);
  const minimum = Math.min(...paths.map(path => path.cost));
  const winner = paths.find(path => path.cost === minimum);
  return [
    ...paths.map(path => `OSPF_PATH id=${path.id} total_cost=${path.cost} hops_count=${path.hops.length} status=${path === winner ? 'BEST_PATH' : 'BACKUP_PATH'}`),
    `OSPF_ROUTE best_path=${winner.id} metric=${minimum}`
  ].join('\n');
}

function firewallAnswer(input) {
  const [keyword, ...tokens] = input.split(' ');
  assert.equal(keyword, 'RULE');
  const rule = Object.fromEntries(tokens.map(token => {
    const parsed = /^([a-z]+)=(\S+)$/.exec(token);
    assert.ok(parsed, `Champ de règle invalide : ${token}`);
    return [parsed[1], parsed[2]];
  }));
  assert.deepEqual(Object.keys(rule).sort(), ['chain', 'dport', 'dst', 'proto', 'src', 'target']);
  if (rule.proto === 'ANY' && rule.dport !== 'ANY') return firewallError;

  const iptables = ['iptables', '-A', rule.chain];
  if (rule.proto !== 'ANY') iptables.push('-p', rule.proto);
  if (rule.src !== 'ANY') iptables.push('-s', rule.src);
  if (rule.dst !== 'ANY') iptables.push('-d', rule.dst);
  if (rule.dport !== 'ANY') iptables.push('--dport', rule.dport);
  iptables.push('-j', rule.target);

  const nftables = ['nft', 'add', 'rule', 'ip', 'filter', rule.chain.toLowerCase()];
  if (rule.src !== 'ANY') nftables.push('ip', 'saddr', rule.src);
  if (rule.dst !== 'ANY') nftables.push('ip', 'daddr', rule.dst);
  if (rule.proto !== 'ANY' && rule.dport !== 'ANY') nftables.push(rule.proto, 'dport', rule.dport);
  if (rule.proto !== 'ANY' && rule.dport === 'ANY') nftables.push('ip', 'protocol', rule.proto);
  nftables.push('counter', rule.target.toLowerCase());
  return `IPTABLES: ${iptables.join(' ')}\nNFTABLES: ${nftables.join(' ')}`;
}

function gherkinAnswer(input) {
  const lines = input.split('\n');
  assert.equal(lines.length, 3);
  const clauses = [
    /^(?:Etant donne|Étant donné)\s+(.+)$/i,
    /^Quand\s+(.+)$/i,
    /^Alors\s+(.+)$/i
  ];
  const matches = lines.map((line, index) => clauses[index].exec(line));
  if (matches.some(match => !match)) return gherkinError;
  return {
    contexte: matches[0][1].replace(/\.$/, ''),
    evenement: matches[1][1].replace(/\.$/, ''),
    resultat_attendu: matches[2][1].replace(/\.$/, '')
  };
}

async function accepted(exercise, entry, answer) {
  const selector = /^cas:(\d+)$/.exec(entry.stdin);
  assert.ok(selector);
  const submission = `[Cas ${selector[1]}]\n${answer}`;
  const report = await runTests({ ...exercise, tests: [entry] }, submission, {
    execute: payload => execution.execute(payload)
  });
  assert.equal(report.ok, true);
  assert.equal(report.total, 1);
  return report.passed === 1;
}

test('Les grilles réelles, les exemples, les tests et les corrigés correspondent', async () => {
  for (const id of exerciseIds) {
    const exercise = getRequiredExercise(id);
    const cases = gridCases(exercise);
    assert.equal(exercise.examples.length, 1, id);
    assert.equal(cases.size, exercise.tests.length, id);
    assert.ok(exercise.tests.length <= MAX_TESTS, id);
    const solutionHeadings = [...exercise.solution.matchAll(/^\[Cas (\d+) — (.+)\]$/gm)]
      .map(match => [Number(match[1]), match[2]]);
    assert.deepEqual(solutionHeadings, [...cases].map(([number, section]) => [number, section.label]), id);
    for (const [index, entry] of exercise.tests.entries()) {
      const number = index + 1;
      const section = cases.get(number);
      assert.ok(section, `${id} : cas ${number} manquant`);
      assert.equal(section.label, entry.label, `${id} : libellé du cas ${number}`);
      assert.ok(section.inputs.length > 0, `${id} : données du cas ${number}`);
      assert.equal(section.placeholders, 1, `${id} : réponse à compléter du cas ${number}`);
      assert.equal(entry.stdin, `cas:${number}`);
      const result = await execution.execute({ language: exercise.language, code: exercise.solution, stdin: entry.stdin });
      assert.equal(result.ok, true, id);
      assert.equal(result.stdout, entry.expected, `${id} : corrigé du cas ${number}`);
    }
    const example = exercise.examples[0];
    const result = await execution.execute({ language: exercise.language, code: exercise.solution, stdin: example.stdin });
    assert.equal(result.ok, true, id);
    assert.equal(result.stdout, example.expected, `${id} : corrigé de l'exemple`);
    const report = await runTests(exercise, exercise.solution, { execute: payload => execution.execute(payload) });
    assert.equal(report.ok, true, id);
    assert.equal(report.total, exercise.tests.length, id);
    assert.equal(report.passed, exercise.tests.length, `${id} : ${JSON.stringify(report.stop)}`);
  }
});

test('F183 : les coûts des chemins et le départage correspondent aux données réelles', () => {
  const exercise = getRequiredExercise('lan3-c4-e1');
  for (const fixture of fixtures(exercise)) assert.equal(ospfAnswer(fixture.input), fixture.expected);
  assert.deepEqual(gridCases(exercise).get(1).inputs, [
    'OSPF_CONFIG ref_bw=100',
    'PATH id=P1 hops=100,100',
    'PATH id=P2 hops=1000,1000'
  ]);
  assert.equal(exercise.tests[0].expected, [
    'OSPF_PATH id=P1 total_cost=2 hops_count=2 status=BEST_PATH',
    'OSPF_PATH id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH',
    'OSPF_ROUTE best_path=P1 metric=2'
  ].join('\n'));
  assert.match(exercise.brief, /ECMP/);
  assert.match(exercise.brief, /départage alphabétique est propre à cet exercice/);
  assert.match(exercise.brief, /même à coût égal/);
  assert.match(exercise.hints.join(' '), /même à coût égal/);
});

test('F183 : le barème accepte le départage demandé et refuse deux gagnants', async () => {
  const exercise = getRequiredExercise('lan3-c4-e1');
  const entry = exercise.tests[0];
  const multipleWinners = entry.expected.replace(
    'id=P2 total_cost=2 hops_count=2 status=BACKUP_PATH',
    'id=P2 total_cost=2 hops_count=2 status=BEST_PATH'
  );
  assert.notEqual(multipleWinners, entry.expected);
  assert.equal(await accepted(exercise, entry, entry.expected), true);
  assert.equal(await accepted(exercise, entry, multipleWinners), false);
});

test('F192 : chaque conversion utilise les données réelles et la famille IPv4', () => {
  const exercise = getRequiredExercise('fw3-c6-e1');
  for (const fixture of fixtures(exercise)) assert.equal(firewallAnswer(fixture.input), fixture.expected);
  assert.deepEqual([exercise.examples[0].expected, ...exercise.tests.slice(0, 3).map(entry => entry.expected)], [
    'IPTABLES: iptables -A INPUT -p tcp -d 10.0.0.1 --dport 22 -j ACCEPT\nNFTABLES: nft add rule ip filter input ip daddr 10.0.0.1 tcp dport 22 counter accept',
    'IPTABLES: iptables -A FORWARD -p udp -s 192.168.1.50 --dport 53 -j DROP\nNFTABLES: nft add rule ip filter forward ip saddr 192.168.1.50 udp dport 53 counter drop',
    'IPTABLES: iptables -A OUTPUT -p tcp -d 198.51.100.2 -j ACCEPT\nNFTABLES: nft add rule ip filter output ip daddr 198.51.100.2 ip protocol tcp counter accept',
    'IPTABLES: iptables -A INPUT -j DROP\nNFTABLES: nft add rule ip filter input counter drop'
  ]);
  assert.match(exercise.brief, /restriction est propre au mini-format/);
  assert.match(exercise.hints.join(' '), /proto=ANY avec un port précis/);
});

test('F192 : iptables-translate confirme la famille et les clauses IPv4', {
  skip: existsSync('/usr/bin/iptables-translate') ? false : 'iptables-translate absent'
}, () => {
  const translations = [
    { args: ['-A', 'INPUT', '-p', 'tcp', '-d', '10.0.0.1', '--dport', '22', '-j', 'ACCEPT'], expected: /add rule ip filter INPUT ip daddr 10\.0\.0\.1 tcp dport 22 counter accept/ },
    { args: ['-A', 'FORWARD', '-p', 'udp', '-s', '192.168.1.50', '--dport', '53', '-j', 'DROP'], expected: /add rule ip filter FORWARD ip saddr 192\.168\.1\.50 udp dport 53 counter drop/ },
    { args: ['-A', 'INPUT', '-j', 'DROP'], expected: /add rule ip filter INPUT counter drop/ }
  ];
  for (const translation of translations) {
    const result = spawnSync('/usr/bin/iptables-translate', translation.args, { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.match(result.stdout, translation.expected);
  }
});

test('F192 : ANY avec un port précis ne produit que l’erreur prévue', async () => {
  const exercise = getRequiredExercise('fw3-c6-e1');
  const entry = exercise.tests[3];
  assert.deepEqual(gridCases(exercise).get(4).inputs, [
    'RULE chain=INPUT proto=ANY src=ANY dst=ANY dport=80 target=ACCEPT'
  ]);
  assert.equal(entry.stdin, 'cas:4');
  assert.equal(entry.expected, firewallError);
  assert.ok(exercise.brief.includes(firewallError));
  assert.equal(await accepted(exercise, entry, firewallError), true);
  const discardedPort = [
    'IPTABLES: iptables -A INPUT --dport 80 -j ACCEPT',
    'NFTABLES: nft add rule ip filter input counter accept'
  ].join('\n');
  assert.equal(await accepted(exercise, entry, discardedPort), false);
  assert.equal(await accepted(exercise, entry, `${firewallError}\n${discardedPort}`), false);
});

test('F202 : les réponses correspondent aux trois clauses réellement fournies', () => {
  const exercise = getRequiredExercise('ib2-c5-e3');
  for (const fixture of fixtures(exercise)) {
    const expected = gherkinAnswer(fixture.input);
    if (typeof expected === 'string') assert.equal(fixture.expected, expected);
    else assert.deepEqual(JSON.parse(fixture.expected), expected);
  }
  assert.equal(gridCases(exercise).get(2).inputs[0], 'Sachant que le serveur tourne');
  assert.equal(exercise.tests[1].expected, gherkinError);
  assert.ok(exercise.brief.includes(gherkinError));
  assert.match(exercise.brief, /valide en Gherkin, mais ce parseur limité ne le prend pas en charge/);
  assert.match(exercise.hints.join(' '), /Sachant que est valide en Gherkin/);
  assert.doesNotMatch(exercise.brief + exercise.solution, /Syntaxe Gherkin non respectee/);
});

test('F202 : le barème refuse une accusation de syntaxe ou un JSON hors du parseur', async () => {
  const exercise = getRequiredExercise('ib2-c5-e3');
  const entry = exercise.tests[1];
  assert.equal(await accepted(exercise, entry, gherkinError), true);
  assert.equal(await accepted(exercise, entry, 'ERREUR: Syntaxe Gherkin non respectee'), false);
  assert.equal(await accepted(exercise, entry, JSON.stringify({
    contexte: 'le serveur tourne',
    evenement: 'une erreur 500 survient',
    resultat_attendu: 'une alerte est envoyee'
  })), false);
});

test('Les références officielles et leur date de consultation sont conservées', () => {
  const sources = [
    ['lan3-c4-e1', 'https://www.rfc-editor.org/rfc/rfc2328.html#section-2.4'],
    ['lan3-c4-e1', 'https://www.cisco.com/c/en/us/support/docs/ip/open-shortest-path-first-ospf/9237-9.html'],
    ['fw3-c6-e1', 'https://netfilter.org/documentation/HOWTO/packet-filtering-HOWTO-7.html'],
    ['fw3-c6-e1', 'https://wiki.nftables.org/wiki-nftables/index.php/Matching_packet_headers'],
    ['ib2-c5-e3', 'https://github.com/cucumber/gherkin/blob/main/gherkin-languages.json']
  ];
  for (const [id, url] of sources) {
    const exercise = getRequiredExercise(id);
    assert.ok(exercise.brief.includes(url), `${id} : ${url}`);
    assert.ok(exercise.brief.includes('2026-10-30'), id);
  }
});

}
