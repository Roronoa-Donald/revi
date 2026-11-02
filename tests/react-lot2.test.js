'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const chapter1 = require('../server/content/react/chapitre1');
const chapter6 = require('../server/content/react/chapitre6');
const questions = require('../scripts/questions-react');
const { getExercise, toClient } = require('../server/exercises');

const ROOT = path.resolve(__dirname, '..');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node)
    .filter(item => item.nodeName === '#text')
    .map(item => item.value)
    .join('')
    .replace(/\s+/g, ' ')
    .trim();
}

function attr(node, name) {
  return (node.attrs || []).find(attribute => attribute.name === name)?.value;
}

function hasClass(node, name) {
  return (attr(node, 'class') || '').split(/\s+/).includes(name);
}

function section(chapter, title) {
  const result = chapter.sections.find(item => title.test(item.title));
  assert.ok(result, `Section introuvable : ${title}`);
  return parse5.parseFragment(result.html);
}

function readPage(filename) {
  return parse5.parse(fs.readFileSync(path.join(ROOT, 'react', filename), 'utf8'));
}

function question(chapter, pattern) {
  const result = chapter.questions.find(item => pattern.test(item.stem));
  assert.ok(result, `Question introuvable : ${pattern}`);
  return result;
}

function displayedQuestion(page, pattern) {
  const result = descendants(page).find(node => {
    if (!hasClass(node, 'q')) return false;
    const stem = descendants(node).find(child => hasClass(child, 'q__stem'));
    return stem && pattern.test(text(stem));
  });
  assert.ok(result, `Question affichée introuvable : ${pattern}`);
  const options = descendants(result).filter(node => node.tagName === 'button' && hasClass(node, 'opt'));
  const correct = options.filter(option => attr(option, 'data-correct') === '1');
  assert.equal(correct.length, 1);
  return text(correct[0]);
}

function runCases(exercise) {
  for (const example of [...exercise.examples, ...exercise.tests]) {
    const result = spawnSync(process.execPath, ['-e', exercise.solution], {
      input: example.stdin,
      encoding: 'utf8',
      timeout: 5000
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal(result.stdout.trimEnd(), example.expected.trimEnd(), example.label || example.stdin);
  }
}

test('F42 : Vite, générateur, prérequis et commandes sont explicitement versionnés', () => {
  const lesson = section(chapter1, /outillage moderne avec Vite/i);
  const lessonText = text(lesson);
  const code = descendants(lesson).find(node => node.tagName === 'pre');
  assert.match(lessonText, /Vite 8\.3\.5/);
  assert.match(lessonText, /Rolldown.{0,50}bundling/i);
  assert.match(lessonText, /Oxc.{0,50}transformations/i);
  assert.match(lessonText, /Node\.js 20\.19\.0.{0,80}22\.12\.0/i);
  assert.match(lessonText, /9\.3\.3.{0,50}create-vite.{0,30}pas celle de Vite/i);
  assert.match(lessonText, /autres dépendances.{0,130}package-lock\.json.{0,50}npm ci/i);
  assert.ok(descendants(lesson).some(node => attr(node, 'href') === 'https://vite.dev/blog/announcing-vite8'));
  assert.ok(descendants(lesson).some(node => attr(node, 'href') === 'https://vite.dev/guide/'));
  assert.equal(text(code), 'npm create vite@9.3.3 mon-app -- --template react cd mon-app npm install --save-dev --save-exact vite@8.3.5 npm run dev');
  assert.doesNotMatch(lessonText, /vite@latest/i);

  const viteQuestion = question(chapter1, /outils.*Vite 8\.3\.5/i);
  assert.match(viteQuestion.opts[viteQuestion.correct], /Rolldown et Oxc/);
  const page = readPage('chapitres/chapitre1.html');
  assert.match(text(page), /npm install --save-dev --save-exact vite@8\.3\.5/);
  assert.match(displayedQuestion(page, /outils.*Vite 8\.3\.5/i), /Rolldown et Oxc/);

  const nodeQuestion = questions.find(item => item.id === 7);
  assert.match(nodeQuestion.q, /Vite 8\.3\.5/);
  assert.match(nodeQuestion.o[nodeQuestion.a], /20\.19\.0.{0,80}22\.12\.0/);
  assert.match(nodeQuestion.e, /\^20\.19\.0 ou >=22\.12\.0/);
  assert.match(nodeQuestion.e, /Node\.js 21/);
});

test('F43 : les deux transformations JSX décrivent le même bouton sans les confondre', () => {
  const lesson = section(chapter1, /syntaxe JSX/i);
  const lessonText = text(lesson);
  const snippets = descendants(lesson)
    .filter(node => node.tagName === 'pre')
    .map(node => descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join(''));
  assert.equal(snippets.length, 3);
  assert.match(snippets[0], /<button className="btn">Valider<\/button>/);
  assert.match(snippets[1], /import React from 'react'/);
  assert.match(snippets[1], /React\.createElement\('button'/);
  assert.match(snippets[2], /import \{ jsx as _jsx \} from 'react\/jsx-runtime'/);
  assert.match(snippets[2], /children: 'Valider'/);
  assert.match(lessonText, /react\/jsx-dev-runtime.{0,100}développement/i);
  assert.match(lessonText, /évite d’importer React uniquement pour le JSX/i);
  assert.match(lessonText, /create-vite 9\.3\.3.{0,80}transformation automatique/i);
  assert.match(lessonText, /React 19 requiert cette transformation moderne/i);
  assert.ok(descendants(lesson).some(node => attr(node, 'href') === 'https://legacy.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html'));
  assert.ok(descendants(lesson).some(node => attr(node, 'href') === 'https://react.dev/blog/2024/04/25/react-19-upgrade-guide'));

  const createElement = (type, props, children) => ({ type, props: { ...props, children } });
  const jsx = (type, props) => ({ type, props });
  const classicCode = snippets[1].replace(/^import[^\n]+\n/, '') + '\nbouton;';
  const automaticCode = snippets[2].replace(/^import[^\n]+\n/, '') + '\nbouton;';
  const classic = vm.runInNewContext(classicCode, { React: { createElement } });
  const automatic = vm.runInNewContext(automaticCode, { _jsx: jsx });
  assert.deepEqual(JSON.parse(JSON.stringify(classic)), JSON.parse(JSON.stringify(automatic)));
  assert.deepEqual(JSON.parse(JSON.stringify(classic)), {
    type: 'button',
    props: { className: 'btn', children: 'Valider' }
  });

  const jsxQuestion = question(chapter1, /compilateur transforme le JSX/i);
  assert.match(jsxQuestion.opts[jsxQuestion.correct], /createElement.*classique.*jsx-runtime.*automatique/i);
  assert.match(displayedQuestion(readPage('chapitres/chapitre1.html'), /compilateur transforme le JSX/i), /createElement.*jsx-runtime/i);
  const card = chapter1.flashcards.find(item => /En quoi JSX est-il compilé/i.test(item.q));
  assert.match(card.a, /createElement.*classique.*jsx-runtime.*automatique/i);
  assert.match(text(readPage('chapitres/cartes.html')), /createElement.*classique.*jsx-runtime.*automatique/i);

  const exercise = getExercise('rx2-c1-e1');
  assert.match(exercise.brief, /classique.*createElement.*automatique.*jsx-runtime/i);
  assert.match(exercise.brief, /modèle pédagogique simplifié.*non l'objet React complet/i);
  assert.match(text(readPage('chapitres/chapitre1.html')), /modèle pédagogique simplifié.*non l'objet React complet/i);
  runCases(exercise);
});

test('F146 : la garde client ne remplace jamais les autorisations du serveur', () => {
  const lessonSection = section(chapter6, /garde d’interface et autorisation serveur/i);
  const lesson = text(lessonSection);
  assert.match(lesson, /PrivateRoute.{0,180}navigateur.{0,120}contournée/i);
  assert.match(lesson, /chaque requête.{0,180}serveur authentifie.{0,100}droits.{0,80}ressource/i);
  assert.match(lesson, /requête directe ou un fichier sensible/i);
  assert.match(lesson, /rôle ou un identifiant.{0,100}client/i);
  assert.match(lesson, /refuse l’accès par défaut/i);
  assert.match(lesson, /authentification valide.{0,40}401/i);
  assert.match(lesson, /identité valide mais sans droit.{0,40}403.{0,30}404/i);
  assert.ok(descendants(lessonSection).some(node => attr(node, 'href') === 'https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html'));
  assert.match(chapter6.method.join(' '), /côté serveur, à chaque requête sensible.*droits.*ressource/i);
  assert.match(chapter6.checklist.join(' '), /redirection côté client.*droits côté serveur/i);

  const accessQuestion = question(chapter6, /contrôle protège les données/i);
  assert.match(accessQuestion.opts[accessQuestion.correct], /serveur.*droits.*ressource.*chaque requête/i);
  assert.match(accessQuestion.exp, /garde client.*contournable.*serveur.*chaque requête/i);
  const page = readPage('chapitres/chapitre6.html');
  assert.match(text(page), /chaque requête.{0,180}serveur authentifie/i);
  assert.match(displayedQuestion(page, /contrôle protège les données/i), /serveur.*droits.*chaque requête/i);
  assert.match(text(readPage('chapitres/cartes.html')), /Navigate to="\/login" replace \/> côté client.*serveur.*droits à chaque requête/i);

  const exercise = getExercise('rx2-c6-e2');
  assert.match(exercise.brief, /simulation de navigation côté client, pas une protection des données/i);
  assert.match(exercise.brief, /serveur.*droits sur la ressource à chaque requête sensible/i);
  assert.match(exercise.examples[0].note, /aucun droit serveur n'est démontré/i);
  assert.match(text(page), /simulation de navigation côté client, pas une protection des données/i);
  runCases(exercise);
});

test('QCM et exercices React restent synchronisés et les corrigés restent privés', () => {
  assert.equal(questions.length, 100);
  assert.equal(new Set(questions.map(item => item.id)).size, 100);
  for (const item of questions) {
    assert.ok(item.q && item.e && item.o.length >= 2);
    assert.ok(Number.isInteger(item.a) && item.a >= 0 && item.a < item.o.length);
  }
  assert.equal(
    fs.readFileSync(path.join(ROOT, 'react/qcm-100.js'), 'utf8'),
    `window.COURSE_QCM = ${JSON.stringify(questions, null, 2)};\n`
  );
  const fallback = questions.find(item => item.id === 86);
  assert.match(fallback.o[fallback.a], /routes de navigation.*sans intercepter les API/i);
  assert.match(fallback.e, /API et fichiers sensibles.*contrôles d'autorisation côté serveur/i);

  for (const id of ['rx2-c1-e1', 'rx2-c6-e2']) {
    const exercise = getExercise(id);
    const client = toClient(exercise);
    assert.equal(client.brief, exercise.brief);
    assert.ok(!Object.hasOwn(client, 'tests'));
    assert.ok(!Object.hasOwn(client, 'solution'));
    const page = readPage(`chapitres/chapitre${exercise.chapter}.html`);
    const lab = descendants(page).find(node => attr(node, 'data-exercise') === id);
    assert.ok(lab, `Atelier absent : ${id}`);
    assert.equal(attr(lab, 'data-stdin'), exercise.examples[0].stdin);
    const starter = descendants(lab).find(node => node.tagName === 'script' && attr(node, 'data-lab-starter') !== undefined);
    assert.ok(starter, `Code de départ absent : ${id}`);
    const starterCode = descendants(starter).filter(node => node.nodeName === '#text').map(node => node.value).join('');
    assert.equal(starterCode.trim(), exercise.starter.trim());
    assert.ok(!text(lab).includes(exercise.solution.replace(/\s+/g, ' ').trim()));
    for (const hidden of exercise.tests) {
      assert.notEqual(attr(lab, 'data-stdin'), hidden.stdin, `${id} : entrée cachée divulguée`);
    }
  }
});
