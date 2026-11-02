'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const windowsB1 = require('../server/content/b1-admin-windows/chapitres-1-3');
const virtualisationIntroB1 = require('../server/content/b1-virtualisation/chapitres-1-3');
const virtualisationB1 = require('../server/content/b1-virtualisation/chapitres-4-6');
const windowsB2 = require('../server/content/rd_winserver/chapitre6');
const vmAllocation = require('../server/content/admin-vm/chapitre3');
const vmStockage = require('../server/content/admin-vm/chapitre4');
const vmMigration = require('../server/content/admin-vm/chapitre6');

const root = path.resolve(__dirname, '..');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join('').replace(/\s+/g, ' ');
}

function page(filename) {
  return text(parse5.parse(fs.readFileSync(path.join(root, filename), 'utf8')));
}

function section(chapter, expression) {
  const item = chapter.sections.find(candidate => expression.test(candidate.title));
  assert.ok(item, `Section absente : ${expression}`);
  return text(parse5.parseFragment(item.html));
}

function question(chapter, expression) {
  const item = chapter.questions.find(candidate => expression.test(candidate.stem || candidate.q));
  assert.ok(item, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.opts.length);
  return item;
}

function card(chapter, expression) {
  const item = chapter.flashcards.find(candidate => expression.test(candidate.q));
  assert.ok(item, `Carte absente : ${expression}`);
  return item.a;
}

test('F18 : Windows Server 2012 R2 est historique après la fin des ESU', () => {
  const lesson = section(windowsB1[1], /cycle de vie/i);
  const introductoryLesson = section(windowsB1[0], /outils d’administration Windows/i);
  assert.match(lesson, /10 octobre 2023/);
  assert.match(lesson, /13 octobre 2026/);
  assert.match(lesson, /(?:laboratoire|TP).{0,80}isol[ée]/i);
  assert.doesNotMatch(lesson, /sans souscription ESU|strictement identiques/i);
  assert.doesNotMatch(introductoryLesson, /strictement identiques|universelles à travers toutes/i);
  assert.match(page('b1-admin-windows/chapitres/chapitre2.html'), /13 octobre 2026/);
  assert.match(windowsB1[1].sections.find(item => /cycle de vie/i.test(item.title)).html,
    /https:\/\/learn\.microsoft\.com\/en-us\/windows-server\/get-started\/extended-security-updates-overview/);
});

test('F57 : les checkpoints Hyper-V de production ne capturent pas la mémoire', () => {
  const lesson = section(windowsB2, /Le snapshot/i);
  const item = question(windowsB2, /checkpoint.*production/i);
  const answer = card(windowsB2, /checkpoint.*production/i);
  assert.match(lesson, /standard.{0,100}mémoire/is);
  assert.match(lesson, /production.{0,100}(?:sans|pas de).{0,30}mémoire/is);
  assert.match(item.opts[item.correct], /(?:sans|pas de).{0,30}mémoire/i);
  assert.match(answer, /(?:sans|pas de).{0,30}mémoire/i);
  assert.match(lesson, /(?:ne remplace|n’est pas).{0,50}sauvegarde/i);
  assert.match(page('rd_winserver/chapitres/cartes.html'), /production.{0,100}(?:sans|pas de).{0,30}mémoire/i);
  assert.match(page('rd_winserver/chapitres/formules.html'), /production.{0,80}(?:sans|pas de).{0,30}mémoire/i);
  assert.doesNotMatch(page('rd_winserver/chapitres/formules.html'), /snapshot\s*:\s*mémoire \+ CPU \+ disques/i);
});

test('F67 : une capacité réservée entièrement ne prouve pas une utilisation réelle à 100 %', () => {
  const chapter = virtualisationB1[0];
  const lesson = section(chapter, /plan de consolidation/i);
  const item = question(chapter, /capacité restante vaut 0/i);
  const answer = card(chapter, /capacité restante 0/i);
  assert.match(lesson, /(?:allouée|réservée).{0,100}(?:mesur|utilisation réelle)/i);
  assert.match(item.opts[item.correct], /(?:alloué|réservé)e?/i);
  assert.match(item.exp, /(?:mesur|utilisation réelle)/i);
  assert.match(answer, /(?:allouée|réservée).{0,100}(?:mesur|utilisation réelle)/i);
  assert.doesNotMatch(page('b1-virtualisation/chapitres/formules.html'), /hote a 0 restant = rentabilise a 100%/i);
  const introductoryLesson = section(virtualisationIntroB1[0], /problème historique/i);
  const costQuestion = question(virtualisationIntroB1[0], /inactivité mesurée de 80 %/i);
  assert.match(introductoryLesson, /hypothèse.{0,50}(?:récit|statistique)/i);
  assert.match(costQuestion.opts[costQuestion.correct], /ne se déduit pas/i);
  assert.match(section(chapter, /serveurs économisés/i), /ne permet pas de déduire.{0,80}nécessaires/i);
  const capacity = 100;
  const reserved = 100;
  const measuredLoad = 20;
  assert.equal(capacity - reserved, 0);
  assert.notEqual(measuredLoad / capacity, 1);
});

test('F220 : thin et thick distinguent blocs alloués, fichiers visibles et performances', () => {
  const lesson = section(vmStockage, /allocation des disques virtuels/i);
  const allocation = section(vmAllocation, /allocation de ressources/i);
  assert.match(lesson, /15 Go.{0,120}(?:pas|ne correspond|n’est)/i);
  assert.match(lesson, /(?:mesur|surveill).{0,120}(?:allocation|stockage|blocs)/i);
  assert.match(lesson, /(?:ne garantit pas|sans garantir).{0,100}performances/i);
  assert.doesNotMatch(allocation, /performance garantie/i);
  assert.match(page('admin-vm/chapitres/chapitre4.html'), /(?:ne garantit pas|sans garantir).{0,100}performances/i);
});

test('F221 : la migration à chaud minimise la pause sans promettre zéro impact', () => {
  const lesson = section(vmMigration, /continuité de service/i);
  const windowsLesson = section(windowsB2, /templates et vMotion/i);
  const item = question(windowsB2, /Que fait vMotion/i);
  const answer = card(windowsB2, /À quoi sert vMotion/i);
  assert.match(lesson, /(?:pause|suspension).{0,100}(?:bascule|brève|courte)/i);
  assert.match(lesson, /(?:impact|perturb)/i);
  assert.match(windowsLesson, /(?:pause|suspension)/i);
  assert.doesNotMatch(item.opts[item.correct], /sans interruption/i);
  assert.doesNotMatch(answer, /sans interruption/i);
  assert.doesNotMatch(page('rd_winserver/chapitres/formules.html'), /vMotion.{0,60}sans interruption/i);
  assert.doesNotMatch(page('b1-virtualisation/exercices/exercices.html'), /vMotion \/ Live Migration sans interruption/i);
});
