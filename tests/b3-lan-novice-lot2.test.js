'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const chapter = require('../server/content/b3-reseau-lan/chapitre5');
const course = require('../server/content/b3-reseau-lan');
const kit = require('../scripts/course-kit');

const section = chapter.sections.find(item => /Saturation CAM/i.test(item.title));
const floodingCard = section.html.match(/<h4>1\. Saturation de Table CAM[\s\S]*?<\/div>/i)[0];
const question = chapter.questions.find(item => /saturation de table CAM/i.test(item.stem));
const flashcard = chapter.flashcards.find(item => /MAC Address Flooding/i.test(item.q));
const summary = chapter.summary.find(item => /MAC Flooding/i.test(item));
const checklist = chapter.checklist.find(item => /MAC Flooding/i.test(item));

test('La saturation et la perte des associations ne sont pas immédiates ou systématiques', () => {
  assert.match(floodingCard, /peut atteindre sa capacité/i);
  assert.match(floodingCard, /délai dépend/i);
  assert.match(floodingCard, /ne peut plus apprendre de nouvelles adresses/i);
  assert.match(floodingCard, /nouvelles adresses sources[^.]*destinations correspondantes restent inconnues/i);
  assert.match(floodingCard, /expir/i);
  assert.match(floodingCard, /destinations?[^.]*inconnues/i);
  assert.match(floodingCard, /destinations?[^.]*connues[^.]*port/i);
});

test('La diffusion des destinations inconnues dépend du VLAN et des protections', () => {
  assert.match(floodingCard, /selon le matériel et sa configuration/i);
  assert.match(floodingCard, /ports autorisés du même VLAN/i);
  assert.match(floodingCard, /sauf le port d’entrée/i);
  assert.match(floodingCard, /Port Security/i);
  assert.match(floodingCard, /bloquer[^.]*désactiver le port/i);
});

test('Capturer des trames ne donne pas automatiquement accès à leur contenu en clair', () => {
  assert.match(floodingCard, /ne garantit ni l’accès à tous les flux ni leur lecture en clair/i);
  assert.match(floodingCard, /chiffrement[^.]*TLS[^.]*contenu applicatif/i);
  assert.match(floodingCard, /métadonnées[^.]*visibles/i);
});

test('La situation, le résumé et la checklist évitent la comparaison absolue avec un hub', () => {
  assert.match(chapter.situation, /(?:tenter|peut)[^.]*certaines trames/i);
  assert.match(summary, /destinations?[^.]*inconnues/i);
  assert.match(summary, /(?:chiffr|lecture en clair)/i);
  assert.match(checklist, /(?:ne rend pas|ne donne pas)[^.]*tout le trafic/i);
  for (const text of [chapter.situation, summary, checklist]) {
    assert.doesNotMatch(text, /transform(?:er|e)[^.]*\b(?:hub|concentrateur)\b/i);
    assert.doesNotMatch(text, /diffus(?:er|e)[^.]*toutes les trames en clair/i);
  }
});

test('Le QCM conserve une réponse juste et expose les conditions de diffusion', () => {
  assert.equal(chapter.questions.length, 8);
  assert.equal(question.opts.length, 4);
  assert.equal(question.correct, 1);
  assert.match(question.opts[question.correct], /tenter[^.]*certaines trames[^.]*destinations? inconnues/i);
  assert.equal(question.opts.filter(option => /destinations? inconnues/i.test(option)).length, 1);
  assert.match(question.exp, /apprentissage/i);
  assert.match(question.exp, /nouvelles destinations restent[^.]*inconnues/i);
  assert.match(question.exp, /expir/i);
  assert.match(question.exp, /VLAN/i);
  assert.match(question.exp, /chiffr/i);
});

test('La carte de révision conserve les limites techniques et de confidentialité', () => {
  assert.match(flashcard.a, /expir/i);
  assert.match(flashcard.a, /destinations?[^.]*inconnues/i);
  assert.match(flashcard.a, /certaines trames unicast/i);
  assert.match(flashcard.a, /VLAN/i);
  assert.match(flashcard.a, /protections/i);
  assert.match(flashcard.a, /chiffr/i);
});

test('Les autres protections et le scénario DHCP ne garantissent pas interception ou blocage universels', () => {
  const protection = chapter.sections.find(item => /DHCP Snooping.*Dynamic ARP/i.test(item.title)).html;
  assert.doesNotMatch(chapter.situation, /neutraliser toute tentative/i);
  assert.doesNotMatch(section.html, /Tout le trafic sortant[^.]*intercepté, analysé et modifié/i);
  assert.match(section.html, /trafic[^.]*peut[^.]*intercept/i);
  assert.match(section.html, /chiffrement[^.]*protège/i);
  assert.doesNotMatch(protection, /neutralisant totalement|Filtre tous les paquets IP/i);
  assert.match(protection, /ACL ARP[^.]*statiques/i);
  assert.match(protection, /liaisons[^.]*statiques[^.]*configurées/i);
});

test('Le rendu en mémoire répercute le cours, le QCM et la carte sans modifier les pages', () => {
  const pages = course.render(kit);
  const chapterBody = pages['chapitres/chapitre5.html'].body;
  const cardsBody = pages['chapitres/cartes.html'].body;
  assert.ok(chapterBody.includes(floodingCard));
  assert.ok(chapterBody.includes('<button class="opt" data-correct="1">' + question.opts[question.correct] + '</button>'));
  assert.ok(chapterBody.includes(question.exp));
  assert.ok(cardsBody.includes(flashcard.a));
});

test('Les chapitres protégés annoncent le bon niveau B3', () => {
  const pages = course.render(kit);
  for (let chapter = 2; chapter <= 6; chapter += 1) {
    assert.match(pages[`chapitres/chapitre${chapter}.html`].body, /Réservé B3 et plus/);
  }
});
