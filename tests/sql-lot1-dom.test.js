'use strict';

if (require('./lot1-sandbox').runInsideIsolatedOrRegister(__filename)) {

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const course = require('../server/content/b1-sql');
const kit = require('../scripts/course-kit');
const labs = require('../scripts/generate-code-labs');
const exercises = require('../server/exercises/b1-sql');
const { EXAMEN_QCM } = require('../server/content/b1-sql/pages');
const extraCardsByChapter = require('../scripts/notions-cards-extra.json')['b1-sql'];
const chapters = [
  ...require('../server/content/b1-sql/chapitres-1-3'),
  ...require('../server/content/b1-sql/chapitres-4-6')
];

function nodes(root, predicate) {
  return (predicate(root) ? [root] : []).concat(
    ...(root.childNodes || []).map(child => nodes(child, predicate))
  );
}

function hasClass(node, name) {
  return (node.attrs || []).some(attribute =>
    attribute.name === 'class' && attribute.value.split(/\s+/).includes(name)
  );
}

function attribute(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

function text(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(text).join('');
}

function normalized(value) {
  return value.replace(/\s+/g, ' ').trim();
}

function sourceText(value) {
  return normalized(text(parse5.parseFragment(value)));
}

function assertQuestion(question, expected) {
  const stem = nodes(question, node => hasClass(node, 'q__stem'));
  const options = nodes(question, node => hasClass(node, 'opt'));
  const explanation = nodes(question, node => hasClass(node, 'q__exp'));
  assert.equal(stem.length, 1);
  assert.equal(explanation.length, 1);
  assert.equal(normalized(text(stem[0])), sourceText(expected.stem));
  assert.deepEqual(options.map(option => normalized(text(option))), expected.opts.map(sourceText));
  assert.equal(options.filter(option => attribute(option, 'data-correct') === '1').length, 1);
  assert.equal(attribute(options[expected.correct], 'data-correct'), '1');
  assert.equal(normalized(text(explanation[0])), sourceText(expected.exp));
}

test('QCM et cartes du cours restent fidèles aux sources dans le DOM', diagnostic => {
  const rendered = course.render(kit);
  function generated(name) {
    let html = kit.page(course, name, rendered[name]);
    const match = /^chapitres\/chapitre(\d+)\.html$/.exec(name);
    html = match
      ? labs.finalizeChapter(html, course.id, Number(match[1]))
      : labs.finalizePage(html, kit.prefix(name) + 'atelier.html');
    return parse5.parse(kit.escapeUnknownTags(html));
  }
  let questionCount = 0;
  let exerciseCount = 0;
  for (const chapter of chapters) {
    const root = generated(`chapitres/chapitre${chapter.n}.html`);
    const questions = nodes(root, node => hasClass(node, 'q'));
    assert.equal(questions.length, chapter.questions.length, `chapitre ${chapter.n}`);
    for (const [index, expected] of chapter.questions.entries()) {
      assertQuestion(questions[index], expected);
      questionCount++;
    }
    const expectedLabs = exercises.filter(exercise => exercise.chapter === chapter.n);
    const chapterLabs = nodes(root, node => attribute(node, 'data-exercise') !== undefined);
    assert.equal(chapterLabs.length, expectedLabs.length);
    for (const [index, exercise] of expectedLabs.entries()) {
      const lab = chapterLabs[index];
      assert.equal(attribute(lab, 'data-exercise'), exercise.id);
      assert.equal(attribute(lab, 'data-stdin'), exercise.examples[0].stdin);
      const starter = nodes(lab, node => attribute(node, 'data-lab-starter') !== undefined);
      assert.equal(starter.length, 1);
      assert.equal(text(starter[0]), exercise.starter);
      exerciseCount++;
    }
  }

  const cardsRoot = generated('chapitres/cartes.html');
  const cards = nodes(cardsRoot, node => hasClass(node, 'fc')).map(card => {
    const faces = nodes(card, node => hasClass(node, 'fc__face'));
    assert.equal(faces.length, 2);
    return {
      question: normalized(text(faces[0])).replace(/^Question\s*/, ''),
      answer: normalized(text(faces[1])).replace(/^Réponse\s*/, '')
    };
  });
  let sourceCards = 0;
  const sourceQuestions = new Set();
  for (const chapter of chapters) {
    for (const expected of chapter.flashcards) {
      const question = sourceText(expected.q);
      const matches = cards.filter(card => card.question === question);
      assert.equal(matches.length, 1, expected.q);
      assert.equal(matches[0].answer, sourceText(expected.a), expected.q);
      sourceQuestions.add(question);
      sourceCards++;
    }
  }
  const extraCards = Object.values(extraCardsByChapter).flat();
  for (const card of cards.filter(item => !sourceQuestions.has(item.question))) {
    const matches = extraCards.filter(item => sourceText(item.q) === card.question);
    assert.equal(matches.length, 1, card.question);
    assert.equal(card.answer, sourceText(matches[0].a), card.question);
  }

  const examRoot = generated('chapitres/simulateur-examen.html');
  const examQuestions = nodes(examRoot, node => hasClass(node, 'q'));
  assert.equal(examQuestions.length, EXAMEN_QCM.length);
  for (const [index, expected] of EXAMEN_QCM.entries()) {
    assertQuestion(examQuestions[index], expected);
    questionCount++;
  }
  diagnostic.diagnostic(`${questionCount} questions, ${cards.length} cartes et ${exerciseCount} ateliers fidèles au DOM ; ${sourceCards} cartes de chapitre et ${cards.length - sourceCards} cartes complémentaires.`);
});

test('liens locaux des 13 pages SQL et ancres des pages rendues', diagnostic => {
  const rendered = course.render(kit);
  const pages = new Map();
  for (const [name, definition] of Object.entries(rendered)) {
    let html = kit.page(course, name, definition);
    const match = /^chapitres\/chapitre(\d+)\.html$/.exec(name);
    html = match
      ? labs.finalizeChapter(html, course.id, Number(match[1]))
      : labs.finalizePage(html, kit.prefix(name) + 'atelier.html');
    pages.set('/b1-sql/' + name, parse5.parse(kit.escapeUnknownTags(html)));
  }
  const broken = [];
  let checked = 0;
  let excluded = 0;
  for (const [name, document] of pages) {
    for (const link of nodes(document, node => node.tagName === 'a')) {
      const href = attribute(link, 'href');
      if (!href || /^(?:javascript:|mailto:|tel:)/i.test(href)) continue;
      let url;
      try { url = new URL(href, 'https://sql-lot1.invalid' + name); }
      catch { broken.push(`${name}: URL invalide ${href}`); continue; }
      if (url.origin !== 'https://sql-lot1.invalid' ||
          url.pathname.startsWith('/_auth/') || url.pathname.startsWith('/api/')) {
        excluded++;
        continue;
      }
      let target = decodeURIComponent(url.pathname);
      if (target.endsWith('/')) target += 'index.html';
      const targetPage = pages.get(target);
      if (!targetPage && !fs.existsSync(path.join(__dirname, '..', target))) {
        broken.push(`${name}: fichier absent ${href}`);
        continue;
      }
      if (url.hash && targetPage) {
        const fragment = decodeURIComponent(url.hash.slice(1));
        const anchors = nodes(targetPage, node => attribute(node, 'id') === fragment || attribute(node, 'name') === fragment);
        if (!anchors.length) broken.push(`${name}: ancre absente ${href}`);
      }
      checked++;
    }
  }
  assert.equal(pages.size, 13);
  assert.ok(checked >= 250);
  assert.deepEqual(broken, []);
  diagnostic.diagnostic(`${checked} liens locaux contrôlés ; ${excluded} liens externes ou dynamiques exclus.`);
});

}
