'use strict';

const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const francaisDebut = require('../server/content/b1-fr-pro/chapitres-1-3');
const francaisFin = require('../server/content/b1-fr-pro/chapitres-4-6');
const anglaisApi = require('../server/content/b3-anglais/chapitre2');
const anglaisSupport = require('../server/content/b3-anglais/chapitre5');
const { getExercise, toClient } = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const root = path.join(__dirname, '..');
const francaisProfession = francaisDebut.find(chapter => chapter.n === 3);
const francaisAuxiliaires = francaisFin.find(chapter => chapter.n === 6);

function readPage(filename) {
  return fs.readFileSync(path.join(root, filename), 'utf8');
}

function nodes(node) {
  return [node, ...(node.childNodes || []).flatMap(nodes)];
}

function attribute(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

function hasClass(node, name) {
  return (attribute(node, 'class') || '').split(/\s+/).includes(name);
}

function text(node) {
  return nodes(node).filter(item => item.nodeName === '#text')
    .map(item => item.value).join(' ').replace(/\s+/g, ' ').trim();
}

function renderedAnswer(filename, stem) {
  const document = parse5.parse(readPage(filename));
  const question = nodes(document).find(node => hasClass(node, 'q') && stem.test(text(node)));
  assert.ok(question, `QCM introuvable dans ${filename}`);
  const answers = nodes(question).filter(node => node.nodeName === 'button' && hasClass(node, 'opt'));
  const correct = answers.filter(node => attribute(node, 'data-correct') === '1');
  assert.equal(correct.length, 1, `Une seule réponse doit être correcte dans ${filename}`);
  return text(correct[0]);
}

async function executeLocally(payload) {
  const result = await runAnalyse(payload.code, payload.stdin);
  return {
    ok: result.ok,
    status: result.ok ? 'success' : 'runtime_error',
    stdout: result.data.stdout,
    stderr: result.data.stderr,
    exitCode: result.data.exit_code
  };
}

async function correctCase(exercise, index, answer) {
  const entry = exercise.tests[index];
  const selector = /^cas:(\d+)$/.exec(entry.stdin);
  assert.ok(selector);
  const submission = `[Cas ${selector[1]}]\n${answer}`;
  const report = await runTests({ ...exercise, tests: [entry] }, submission, { execute: executeLocally });
  assert.equal(report.ok, true);
  assert.equal(report.total, 1);
  return report.passed === 1;
}

test('F197 : le cours et le QCM distinguent métier et caractérisation', () => {
  const section = francaisProfession.sections.find(item => /Profession et article/.test(item.title));
  const question = francaisProfession.questions.find(item => /Que dire de « Je suis chercheur »/.test(item.q));
  assert.ok(section);
  assert.ok(question);
  assert.match(section.html, /Je suis chercheur en économie/);
  assert.match(section.html, /Je suis un chercheur passionné/);
  assert.match(section.html, /Ne corrigez pas automatiquement/);
  assert.match(section.html, /research\.jyu\.fi\/grfle\/article-zero\.html/);
  assert.match(francaisProfession.objectives.join(' '), /selon le contexte/);
  assert.match(question.opts[question.correct], /Les deux sont possibles/);
  assert.equal(renderedAnswer('b1-fr-pro/chapitres/chapitre3.html', /Que dire de « Je suis chercheur »/), question.opts[question.correct]);
  assert.match(readPage('b1-fr-pro/chapitres/formules.html'), /article possible/);
  assert.match(readPage('b1-fr-pro/chapitres/cartes.html'), /un chercheur passionné/);
});

test('F197 : les articles admissibles ne sont pas comptés comme fautes', async () => {
  const exercise = getExercise('fr-c3-e3');
  assert.match(exercise.brief, /les deux sont recevables/i);
  assert.match(exercise.brief, /à contextualiser, pas à compter comme faute/);
  assert.match(exercise.tests[0].expected, /contextes : 2[\s\S]*fautes : 1\/3/);
  assert.match(exercise.tests[1].expected, /p1 : correcte\np2 : correcte/);
  assert.match(exercise.tests[2].expected, /fautes : 4\/6\nrelecture : urgente/);
  assert.equal(await correctCase(exercise, 0, exercise.tests[0].expected), true);
  const blanketCorrection = exercise.tests[0].expected.replace('p1 : a contextualiser', 'p1 : article a enlever');
  assert.equal(await correctCase(exercise, 0, blanketCorrection), false);
});

test('F51 : le mouvement ne détermine pas à lui seul l’auxiliaire', () => {
  const section = francaisAuxiliaires.sections.find(item => item.title === 'Avoir ou être');
  const question = francaisAuxiliaires.questions.find(item => /elle a marché/.test(item.q));
  assert.ok(section);
  assert.ok(question);
  assert.match(section.html, /Elle est partie en vacances/);
  assert.match(section.html, /Elle a marché deux heures/);
  assert.match(section.html, /Elle est sortie du bureau/);
  assert.match(section.html, /Elle a sorti le dossier/);
  assert.match(section.html, /Elle s'est couchée/);
  assert.match(section.html, /Elle a couché l'enfant/);
  assert.match(section.html, /academie-francaise\.fr\/maria-k-allemagne/);
  assert.match(question.opts[question.correct], /Partir prend être ici et marcher prend avoir/);
  assert.equal(renderedAnswer('b1-fr-pro/chapitres/chapitre6.html', /« Elle est partie » et « elle a marché »/), question.opts[question.correct]);
  assert.match(readPage('b1-fr-pro/chapitres/simulateur-examen.html'), /est partie<\/strong> en vacances/);
});

test('F51 : les ateliers distinguent les emplois transitifs et pronominaux', async () => {
  const exercise = getExercise('fr-c6-e1');
  assert.match(exercise.brief, /sortir_bureau[\s\S]*sortir_dossier/);
  assert.match(exercise.brief, /se_coucher[\s\S]*coucher_enfant/);
  assert.match(exercise.tests[0].expected, /marcher : auxiliaire correct/);
  assert.match(exercise.tests[1].expected, /monter_bagages : auxiliaire correct/);
  assert.match(exercise.tests[2].expected, /se_coucher : auxiliaire correct\ncoucher_enfant : auxiliaire correct/);
  assert.equal(await correctCase(exercise, 0, exercise.tests[0].expected), true);
  const movementRule = exercise.tests[0].expected.replace('marcher : auxiliaire correct', 'marcher : auxiliaire fautif');
  assert.equal(await correctCase(exercise, 0, movementRule), false);
});

test('F54 : le QCM fait lire un extrait anglais et distingue effet et réponse', () => {
  const section = anglaisApi.sections[0].html;
  const question = anglaisApi.questions.find(item => /Read the excerpt/.test(item.stem));
  assert.ok(question);
  assert.match(section, /lang="en"/);
  assert.match(section, /intended effect/);
  assert.match(section, /responses may differ/i);
  assert.match(section, /rfc9110\.html#section-9\.2\.2/);
  assert.match(question.opts[question.correct], /same intended effect as sending it once/);
  assert.equal(renderedAnswer('b3-anglais/chapitres/chapitre2.html', /Read the excerpt/), question.opts[question.correct]);
  assert.match(anglaisApi.summary.join(' '), /réponses et les journaux peuvent différer/);
});

test('F196 : le paiement et toute relance restent à vérifier après une 502', async () => {
  const section = anglaisSupport.sections[0].html;
  const question = anglaisSupport.questions.find(item => /paiement.*502/.test(item.stem));
  const exercise = getExercise('an3-c5-e1');
  assert.ok(question);
  assert.match(section, /ne prouve ni l’échec ni la réussite du paiement/);
  assert.match(section, /même clé d’idempotence et les mêmes paramètres/);
  assert.match(section, /fenêtre de validité/);
  assert.match(section, /Une clé ne confirme pas à elle seule le statut/);
  assert.match(section, /docs\.stripe\.com\/error-low-level/);
  assert.match(question.opts[question.correct], /could not confirm your payment status/i);
  assert.equal(renderedAnswer('b3-anglais/chapitres/chapitre5.html', /paiement.*502/), question.opts[question.correct]);
  assert.match(exercise.brief, /<b>B<\/b>[\s\S]*could not confirm your payment status/i);
  assert.match(exercise.brief, /choix fermé n'évalue pas toutes les autres formulations/);
  assert.match(exercise.tests[0].expected, /ERR_PAYMENT_GATEWAY_502\] -> B/);
  assert.equal(await correctCase(exercise, 0, exercise.tests[0].expected), true);
  assert.equal(await correctCase(exercise, 0, exercise.tests[0].expected.replace('-> B', '-> A')), false);
  const pages = readPage('b3-anglais/chapitres/chapitre5.html') + readPage('b3-anglais/chapitres/examens.html');
  assert.match(pages, /could not confirm your payment status/i);
  assert.match(pages, /<b>B<\/b> : <em>We could not confirm your payment status/i);
  assert.doesNotMatch(pages, /&lt;span lang="en"&gt;/);
  assert.doesNotMatch(pages + exercise.brief + exercise.solution, /no money has been charged|no charges have been made/i);
});

test('Les exemples, cas, corrigés et projections des trois ateliers restent cohérents', async () => {
  const ids = ['fr-c3-e3', 'fr-c6-e1', 'an3-c5-e1'];
  for (const id of ids) {
    const exercise = getExercise(id);
    assert.equal(exercise.language, 'analyse', id);
    const headings = [...exercise.starter.matchAll(/^\[Cas (\d+) — (.+)\]$/gm)];
    assert.equal(headings.length, exercise.tests.length, id);
    for (const [index, entry] of exercise.tests.entries()) {
      assert.equal(entry.stdin, `cas:${index + 1}`, id);
      assert.equal(headings[index][2], entry.label, id);
      const result = await runAnalyse(exercise.solution, entry.stdin);
      assert.equal(result.data.stdout, entry.expected, `${id}, ${entry.label}`);
    }
    const example = exercise.examples[0];
    const result = await runAnalyse(exercise.solution, example.stdin);
    assert.equal(result.data.stdout, example.expected, `${id}, exemple`);
    const report = await runTests(exercise, exercise.solution, { execute: executeLocally });
    assert.equal(report.ok, true, id);
    assert.equal(report.passed, exercise.tests.length, id);
    const projection = toClient(exercise);
    assert.equal(Object.hasOwn(projection, 'tests'), false, id);
    assert.equal(Object.hasOwn(projection, 'solution'), false, id);
    assert.equal(Object.hasOwn(projection.examples[0], 'expected'), false, id);
  }
});
