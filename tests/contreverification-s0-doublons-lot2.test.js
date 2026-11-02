'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const acorn = require('acorn');
const kit = require('../scripts/course-kit');
const windows = require('../server/content/rd_winserver/chapitre5');
const virtualisation = require('../server/content/b3-virtualisation');
const virtualisationNetwork = require('../server/content/b3-virtualisation/chapitre4');
const virtualisationMigration = require('../server/content/b3-virtualisation/chapitre5');
const crypto = require('../server/content/b3-cryptographie/chapitre6');
const pfsense = require('../server/content/b3-pfsense/chapitre6');
const pfsenseCourse = require('../server/content/b3-pfsense');

const root = path.join(__dirname, '..');
const htmlWalk = node => [node, ...(node.childNodes || []).flatMap(htmlWalk)];
const htmlText = node => node.nodeName === '#text' ? node.value : (node.childNodes || []).map(htmlText).join(' ');
const plain = html => htmlText(parse5.parseFragment(html)).replace(/\s+/g, ' ');

function astWalk(node, result = []) {
  if (!node || typeof node !== 'object') return result;
  if (node.type) result.push(node);
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) value.forEach(item => astWalk(item, result));
    else if (value && typeof value === 'object') astWalk(value, result);
  }
  return result;
}

function properties(node) {
  return Object.fromEntries(node.properties.filter(property => property.type === 'Property')
    .map(property => [property.key.name || property.key.value, property.value]));
}

function questionInHistoricalPage(filename, id) {
  const document = parse5.parse(fs.readFileSync(path.join(root, filename), 'utf8'));
  const scripts = htmlWalk(document).filter(node => node.tagName === 'script').map(htmlText).filter(Boolean);
  const objects = scripts.flatMap(source => astWalk(acorn.parse(source, { ecmaVersion: 'latest' })))
    .filter(node => node.type === 'ObjectExpression').map(properties)
    .filter(item => item.id?.type === 'Literal' && item.id.value === id && item.q && item.o && item.a);
  assert.equal(objects.length, 1, `${filename} : question ${id}`);
  const item = objects[0];
  return { question: item.q.value, correct: item.o.elements[item.a.value].value, explanation: item.e.value };
}

test('F220 : le cours Windows nuance la réservation thick et les blocs thin', () => {
  const section = windows.sections.find(item => /images disque/i.test(item.title));
  assert.ok(section);
  const text = plain(section.html);
  assert.match(text, /blocs.*demande/i);
  assert.match(text, /(?:récupération|récupérés|libération)/i);
  assert.match(text, /couche/i);
  assert.doesNotMatch(text, /n.alloue que l.espace réellement utilisé|garantit l.espace/i);
});

test('F221 : les deux QCM historiques ne garantissent pas zéro interruption', () => {
  for (const [filename, id] of [['admin-vm/qcm-100.html', 89], ['rd_winserver/chapitres/qcm-100.html', 95]]) {
    const item = questionInHistoricalPage(filename, id);
    const text = [item.question, item.correct, item.explanation].join(' ');
    assert.doesNotMatch(text, /sans interruption/i, filename);
    assert.match(text, /(?:pause|interruption).*(?:possible|brève|limiter|limitée)/i, filename);
  }
});

test('F221 : les supports B3 et les anciennes fiches décrivent une pause possible', () => {
  const introduction = plain(virtualisation.render(kit)['index.html'].body);
  assert.doesNotMatch(introduction, /vMotion.{0,60}sans interruption/i);
  const section = virtualisationNetwork.sections.find(item => /Typologie des Interfaces VMkernel/i.test(item.title));
  assert.ok(section);
  assert.doesNotMatch(plain(section.html), /migrations à chaud sans interruption/i);
  assert.match(plain(section.html), /pause de bascule/i);
  assert.doesNotMatch(virtualisationMigration.mastery.join(' '), /maintenances sans interruption/i);
  for (const filename of ['admin-vm/assets/js/exercises.js', 'rd_winserver/assets/js/exercises.js']) {
    const source = fs.readFileSync(path.join(root, filename), 'utf8');
    const entries = astWalk(acorn.parse(source, { ecmaVersion: 'latest' }))
      .filter(node => node.type === 'ObjectExpression').map(properties)
      .filter(item => /Live Migration/.test(item.q?.value || ''));
    assert.equal(entries.length, 1, filename);
    const text = [entries[0].q.value, entries[0].hint.value, entries[0].a.value].join(' ');
    assert.doesNotMatch(text, /sans interruption/i, filename);
    assert.match(text, /pause.*bascule/i, filename);
  }
});

test('TLS : la question 1-RTT exclut explicitement HelloRetryRequest', () => {
  const item = crypto.questions.find(question => /allers-retours réseau/i.test(question.stem) && /TLS 1\.3/i.test(question.stem));
  assert.ok(item);
  assert.match(item.stem, /sans.*HelloRetryRequest/i);
  assert.match(item.opts[item.correct], /1-RTT/);
  assert.match(item.exp, /HelloRetryRequest.*(?:supplémentaire|2-RTT)/i);
});

test('pfsync : cours, QCM et cartes ne garantissent pas une continuité absolue', () => {
  const section = pfsense.sections.find(item => /pfsync/i.test(item.title));
  assert.ok(section);
  const lesson = plain(section.html);
  assert.doesNotMatch(lesson, /100\s*% transparent|parfaitement identique|aucune coupure de session/i);
  assert.match(lesson, /(?:peuvent|peut).*(?:interromp|perd)/i);
  assert.doesNotMatch(pfsense.situation, /garantir.*99,999\s*%/i);
  assert.doesNotMatch(pfsense.summary.join(' '), /instantanément toutes|pour garantir un basculement sans coupure/i);
  const question = pfsense.questions.find(item => /responsable de répliquer les sessions/i.test(item.stem));
  const card = pfsense.flashcards.find(item => /rôle de pfsync/i.test(item.q));
  assert.ok(question && card);
  assert.doesNotMatch(question.exp + ' ' + card.a, /garantir un basculement sans rupture|éviter toute déconnexion/i);
  assert.match(question.exp + ' ' + card.a, /(?:ne garantit pas|peuvent.*interromp)/i);
});

test('pfsync : le sujet et le corrigé d’examen précisent les limites', () => {
  const page = pfsenseCourse.render(kit)['chapitres/examens.html'];
  const text = plain(page.body);
  assert.doesNotMatch(text, /sans perturber les téléchargements|évitant toute coupure de connexion/i);
  assert.match(text, /(?:peuvent|peut).*(?:interromp|perd)/i);
});
