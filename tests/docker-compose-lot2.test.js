'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const compose = require('../server/content/docker/chapitre5');
const containers = require('../server/content/docker/chapitre4');
const active = require('../server/exercises/docker').find(item => item.id === 'dk2-c5-e3');
const chapterCopy = require('../server/exercises/docker/chapitre5').find(item => item.id === 'dk2-c5-e3');

test('F55 : Compose précise les sources, leur priorité et la valeur vide', () => {
  const section = compose.sections.find(item => /Variables d’Environnement/.test(item.title)).html;
  assert.match(section, /shell/i);
  assert.match(section, /--env-file/);
  assert.match(section, /priorit/i);
  const card = compose.flashcards.find(item => /\$\{VAR:-default\}/.test(item.q));
  assert.match(card.a, /vide/i);
  assert.match(card.a, /shell/i);
  assert.match(card.a, /--env-file/);
});

test('F72 : exec crée un processus, attach relie le processus principal', () => {
  const question = containers.questions.find(item => /docker attach/.test(item.opts.join(' ')));
  assert.match(question.stem, /nouveau.*(?:shell|processus)/i);
  assert.match(question.exp, /attach[^.]*processus principal/i);
  assert.match(question.exp, /shell interactif/i);
});

test('F55 : le corrigé limité au modèle traite deux entrées jamais présentes dans la banque', () => {
  assert.deepEqual(chapterCopy, active);
  assert.match(active.brief, /ne reproduit pas les priorités/i);
  const trials = [
    ['CITY=Kpalimé\nEMPTY=\nZERO=0\n---\n${CITY}/${CITY} ${EMPTY:-repli} ${ZERO:-repli}', 'RESOLU: Kpalimé/Kpalimé repli 0\n'],
    ['VALUE=one=two\n---\nclé=${VALUE}; ${ABSENT:-défaut}; ${ABSENT}', 'RESOLU: clé=one=two; défaut; \n']
  ];
  const known = JSON.stringify([active.examples, active.tests]);
  for (const [input, expected] of trials) {
    assert.ok(!known.includes(JSON.stringify(input)), 'entrée déjà connue');
    assert.equal(execFileSync('bash', ['-c', active.solution], { input, encoding: 'utf8' }), expected);
  }
});
