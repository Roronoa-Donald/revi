'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const chapter = require('../server/content/ccna/chapitre4');
const exercises = require('../server/exercises/ccna');

test('F13 : les types Cisco faibles et recommandés sont distingués', () => {
  const lesson = chapter.sections.find(section => /Durcissement/.test(section.title)).html;
  assert.match(lesson, /type 5[^.]*MD5[^.]*faible/i);
  assert.match(lesson, /type 7[^.]*réversible[^.]*faible/i);
  assert.match(lesson, /type 8[^.]*PBKDF2[^.]*SHA-256/i);
  assert.match(lesson, /type 9[^.]*scrypt/i);
  assert.match(lesson, /version[^.]*compatib/i);
  assert.doesNotMatch(lesson, /hachage cryptographique fort \(MD5/i);
});

test('F13 : carte et QCM ne présentent pas MD5 comme une protection forte', () => {
  const card = chapter.flashcards.find(item => /enable password/.test(item.q));
  assert.match(card.a, /type 5[^.]*faible/i);
  assert.match(card.a, /type 8[^.]*type 9/i);
  const question = chapter.questions.find(item => /enable secret/.test(item.stem));
  assert.match(question.opts[question.correct], /type 8[^.]*type 9/i);
  assert.match(question.exp, /MD5[^.]*faible/i);
  assert.doesNotMatch(fs.readFileSync('ccna/chapitres/cartes.html', 'utf8'), /hachage cryptographique fort à sens unique \(MD5\/SHA\)/i);
});

test('F13 : la grille de présence ne certifie ni le type de secret ni la sécurité globale', () => {
  const exercise = exercises.find(item => item.id === 'na2-c4-e2');
  assert.match(exercise.brief, /modèle[^.]*présence/i);
  assert.match(exercise.brief, /ne permet pas[^.]*sécurité globale/i);
  assert.match(exercise.hints.join(' '), /type 7[^.]*faible/i);
  for (const sample of [...exercise.examples, ...exercise.tests]) {
    assert.doesNotMatch(sample.expected, /Mot de passe privilegie hache|Banniere legale|VULNERABLE|5\/5 -> CONFORME/);
  }
  assert.doesNotMatch(exercise.solution, /Mot de passe privilegie hache|Banniere legale|VULNERABLE|5\/5 -> CONFORME/);
});

test('F13 : les cinq critères du modèle concordent avec chaque cas fourni', () => {
  const exercise = exercises.find(item => item.id === 'na2-c4-e2');
  const cases = exercise.starter.split(/(?=^\[Cas \d+ — )/m).slice(1);
  const inputs = [exercise.examples[0].stdin, ...cases.map(block => block.split('\n')
    .filter(line => line.startsWith('# Données : '))
    .map(line => line.slice('# Données : '.length)).join('\n'))];
  const expected = [exercise.examples[0].expected, ...exercise.tests.map(item => item.expected)];
  assert.equal(inputs.length, expected.length);
  inputs.forEach((input, index) => {
    const lines = input.split('\n');
    let section = '';
    let ssh = false;
    let login = false;
    for (const line of lines) {
      if (!/^\s/.test(line)) section = /^line (?:vty|con(?:sole)?)\b/.test(line) ? line : '';
      if (/^line vty\b/.test(section) && line.trim() === 'transport input ssh') ssh = true;
      if (section && line.trim() === 'login local') login = true;
    }
    const checks = [
      ['PASSWORD_ENCRYPTION', lines.includes('service password-encryption')],
      ['ENABLE_SECRET', lines.some(line => /^enable secret\s+\S+/.test(line))],
      ['SSH_ONLY', ssh],
      ['BANNER_MOTD', lines.some(line => /^banner motd\s+/.test(line))],
      ['LOGIN_LOCAL', login]
    ];
    const score = checks.filter(([, present]) => present).length;
    const report = checks.map(([label, present]) =>
      `[${present ? 'VALIDE' : 'ECHEC'}] ${label} : Commande ${present ? 'presente' : 'absente'}`);
    report.push(`SCORE DE PRESENCE: ${score}/5 -> ${score === 5 ? 'CRITERES_REUNIS' : 'CRITERES_INCOMPLETS'}`);
    assert.equal(expected[index], report.join('\n'), `cas ${index}`);
    assert.ok(exercise.solution.includes(expected[index]), `corrigé du cas ${index}`);
  });
});
