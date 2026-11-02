'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const chapter1 = require('../server/content/b3-voip/chapitre1');
const chapter5 = require('../server/content/b3-voip/chapitre5');
const exercises = require('../server/exercises/b3-voip');
const legacyExercises = require('../server/exercises/b3-voip/b3-voip');
const { toClient } = require('../server/exercises');

test('F62 : les surcharges IPv4 et IPv6 et leurs hypothèses sont explicites', () => {
  const section = chapter1.sections.find(item => /Codecs Vocaux/.test(item.title)).html;
  assert.match(section, /IPv4 sans options/i);
  assert.match(section, /IPv6[^.]*60 octets/i);
  assert.match(section, /extensions RTP/i);
  assert.match(section, /couche liaison/i);
  const card = chapter1.flashcards.find(item => /en-têtes réseau IP, UDP et RTP/.test(item.q));
  assert.match(card.a, /IPv4 sans options/i);
  assert.match(card.a, /IPv6[^.]*60/i);
  assert.equal((160 + 20 + 8 + 12) * 8 * 50 / 1000, 80);
  assert.equal((160 + 40 + 8 + 12) * 8 * 50 / 1000, 88);
});

test('F62 : exercice, QCM, mémento et examen annoncent le modèle IPv4', () => {
  const exercise = exercises.find(item => item.id === 'vo3-c1-e1');
  assert.match(exercise.brief, /IPv4 sans options/i);
  assert.match(exercise.hints.join(' '), /IPv4/i);
  const questions = chapter1.questions.filter(item => /en-têtes réseau|G\.711/.test(item.stem));
  assert.ok(questions.some(item => /IPv4 sans options/i.test(item.stem)));
  assert.ok(questions.some(item => /G\.711/.test(item.stem) && /IPv4 sans options/i.test(item.stem)));
  for (const file of ['b3-voip/chapitres/formules.html', 'b3-voip/chapitres/examens.html']) {
    assert.match(fs.readFileSync(file, 'utf8'), /IPv4 sans options/i);
  }
});

test('F180 : STUN découvre une adresse observée sans garantir un passage direct', () => {
  const section = chapter5.sections.find(item => /Traversée \(STUN/.test(item.title)).html;
  assert.match(section, /RFC 8489/);
  assert.match(section, /RFC 8445/);
  assert.match(section, /filtrage/i);
  assert.match(section, /vérifications? de connectivité/i);
  assert.doesNotMatch(section, /STUN fonctionne parfaitement|STUN échoue|doit alors relayer/i);
  const card = chapter5.flashcards.find(item => /différence entre STUN et TURN/i.test(item.q));
  assert.match(card.a, /ne garantit pas/i);
  assert.match(card.a, /relais/i);
});

test('F180 : le modèle rapporte les mappages observés sans prédire la topologie', () => {
  const exercise = exercises.find(item => item.id === 'vo3-c5-e3');
  assert.match(exercise.brief, /ne permet[^.]*filtrage/i);
  assert.match(exercise.brief, /vérifications? de connectivité/i);
  assert.doesNotMatch(exercise.brief, /STUN suffit|PAS_DE_NAT|NAT_CONE|NAT_SYMETRIQUE/);
  for (const sample of [...exercise.examples, ...exercise.tests]) {
    assert.doesNotMatch(sample.expected, /STUN_DIRECT|ROUTAGE_DIRECT|NAT_CONE|NAT_SYMETRIQUE|PAS_DE_NAT/);
    assert.match(sample.expected, /VERIFIER_ICE/);
  }
  assert.doesNotMatch(exercise.solution, /STUN_DIRECT|ROUTAGE_DIRECT|NAT_CONE|NAT_SYMETRIQUE|PAS_DE_NAT/);
});

test('F180 : les observations du modèle correspondent indépendamment aux données', () => {
  const exercise = exercises.find(item => item.id === 'vo3-c5-e3');
  const scenarios = exercise.starter.split(/\[Cas \d+ — [^\]]+\]/).slice(1);
  const cases = [exercise.examples[0].stdin, ...scenarios.map(value => [...value.matchAll(/# Données : (.+)/g)].map(match => match[1]).join('\n'))];
  const expected = [exercise.examples[0].expected, ...exercise.tests.map(item => item.expected)];
  for (let index = 0; index < cases.length; index += 1) {
    const lines = cases[index].trim().split('\n');
    const outputs = expected[index].trim().split('\n');
    assert.equal(lines.length, outputs.length);
    lines.forEach((line, lineIndex) => {
      const fields = Object.fromEntries(line.split(' ').map(field => field.split('=')));
      const observation = fields.STUN1_MAPPED === fields.STUN2_MAPPED ? 'MAPPAGES_IDENTIQUES' : 'MAPPAGES_DIFFERENTS';
      assert.equal(outputs[lineIndex], `LOCAL:${fields.CLIENT_LOCAL} | MAPPED_S1:${fields.STUN1_MAPPED} | MAPPED_S2:${fields.STUN2_MAPPED} | OBSERVATION:${observation} | SUITE:VERIFIER_ICE`);
    });
  }
});

test('Les deux fiches modifiées sont synchronisées avec leur copie et ne projettent pas les attendus', () => {
  for (const id of ['vo3-c1-e1', 'vo3-c5-e3']) {
    const exercise = exercises.find(item => item.id === id);
    assert.deepEqual(legacyExercises.find(item => item.id === id), exercise);
    const client = toClient(exercise);
    assert.equal('tests' in client, false);
    assert.equal('solution' in client, false);
  }
});
