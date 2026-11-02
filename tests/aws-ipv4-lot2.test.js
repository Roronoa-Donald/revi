'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const chapter = require('../server/content/b3-cloud-aws/chapitre4');
const exercises = require('../server/exercises/b3-cloud-aws');
const { runTests } = require('../server/exercises/runner');
const { execute } = require('../server/services/execution');

function addressNumber(address) {
  return address.split('.').reduce((number, octet) => number * 256 + Number(octet), 0);
}

function addressText(number) {
  return [24, 16, 8, 0].map(shift => Math.floor(number / (2 ** shift)) % 256).join('.');
}

function calculateExpected(cidr) {
  const [address, prefix] = cidr.split('/');
  const total = 2 ** (32 - Number(prefix));
  const first = Math.floor(addressNumber(address) / total) * total;
  return `SUBNET_CALC: total_ips=${total} usable_ips=${total - 5} net_ip=${addressText(first)} router_ip=${addressText(first + 1)} reserved2_ip=${addressText(first + 2)} last_ip=${addressText(first + total - 1)}`;
}

test('F76 : la règle IPv4 est relative au sous-réseau et exclut BYOIP', () => {
  const section = chapter.sections[0].html;
  assert.match(section, /premières adresses/i);
  assert.match(section, /dernière adresse/i);
  assert.match(section, /BYOIP/i);
  assert.match(section, /10\.0\.1\.16\/28/);
  assert.match(section, /10\.0\.1\.31/);
  assert.match(section, /(?:VPC|bloc).*principal/i);
  assert.match(section, /ne prend pas en charge.*diffusion/i);
  assert.doesNotMatch(section + chapter.summary.join(' '), /JAMAIS|5 premières et dernière/i);
});

test('F76 : QCM et grille indiquent le cadre et ne confondent pas les adresses DNS', () => {
  const item = exercises.find(exercise => exercise.id === 'aws3-c4-e1');
  const sizedQuestion = chapter.questions.find(question => /251 adresses/.test(question.opts.join(' ')));
  const reservedQuestion = chapter.questions.find(question => /10\.0\.5\.2/.test(question.opts.join(' ')));
  assert.match(item.brief, /BYOIP/i);
  assert.match(item.brief, /reserved2_ip/);
  assert.match(item.brief, /last_ip/);
  assert.doesNotMatch(item.brief, /dns_ip|broadcast_ip/);
  assert.match(sizedQuestion.stem + sizedQuestion.exp, /(?:hors|sans).*BYOIP/i);
  assert.match(reservedQuestion.exp, /(?:VPC|bloc).*principal/i);
});

test('F76 : exemple et trois CIDR recalculés indépendamment', () => {
  const item = exercises.find(exercise => exercise.id === 'aws3-c4-e1');
  const cidrs = [item.examples[0].stdin.match(/CIDR=([^\s]+)/)[1], ...[...item.starter.matchAll(/CIDR=([^\s]+)/g)].map(match => match[1])];
  const expected = [item.examples[0].expected, ...item.tests.map(entry => entry.expected)];
  assert.equal(cidrs.length, 4);
  for (const [index, cidr] of cidrs.entries()) {
    const independentlyComputed = calculateExpected(cidr);
    assert.equal(expected[index].trim(), independentlyComputed, cidr);
    assert.ok(item.solution.includes(independentlyComputed), cidr);
  }
});

test('F76 : corrigé accepté et deux réponses erronées rejetées', async () => {
  const item = exercises.find(exercise => exercise.id === 'aws3-c4-e1');
  const accepted = await runTests(item, item.solution, { execute });
  assert.equal(accepted.passed, item.tests.length);
  for (const index of [0, 1]) {
    const variant = item.tests.map((entry, caseIndex) => `[Cas ${caseIndex + 1}]\n${caseIndex === index ? 'REPONSE_INCORRECTE' : entry.expected}`).join('\n\n');
    const rejected = await runTests(item, variant, { execute });
    assert.equal(rejected.stop.reason, 'wrong_output');
    assert.equal(rejected.stop.testIndex, index);
  }
});
