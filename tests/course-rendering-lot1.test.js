'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const katex = require('../assets/vendor/katex/katex.min.js');
const kit = require('../scripts/course-kit');
const labs = require('../scripts/generate-code-labs');

function elements(node, tag) {
  return [
    ...(node.tagName === tag ? [node] : []),
    ...(node.childNodes || []).flatMap(child => elements(child, tag))
  ];
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
}

test('F29 : les deux impératifs du conseil B1 Linux utilisent le vouvoiement', () => {
  const file = path.join(__dirname, '..', 'b1-linux/chapitres/chapitre1.html');
  const document = parse5.parse(fs.readFileSync(file, 'utf8'));
  assert.match(text(document), /dessinez l’architecture en couches et nommez chaque couche/);
  assert.doesNotMatch(text(document), /dessinez l’architecture en couches et nomme chaque couche/);
});

test('les balises littérales restent visibles sans casser les cartes et le QCM', () => {
  const cards = kit.cards([{ title: 'RSS', items: [
    { q: 'Première carte ?', a: '<title>, <link>, <script> et <button>' },
    { q: 'Deuxième carte ?', a: 'Conserver <code>code</code> et <strong>fort</strong>.' }
  ] }]);
  const quiz = kit.qcm([
    { stem: 'Choisissez <title> ou <link>.', opts: ['<title>', '<link>', '<script>', '<button>'], correct: 0, exp: 'Une valeur < 5 et <code>x</code>.' },
    { stem: 'Question suivante ?', opts: ['oui', 'non'], correct: 0 }
  ]);
  const document = parse5.parseFragment(cards + quiz);
  const buttons = elements(document, 'button');
  assert.equal(elements(document, 'title').length, 0);
  assert.equal(elements(document, 'link').length, 0);
  assert.equal(elements(document, 'script').length, 0);
  assert.equal(elements(document, 'div').filter(node => (node.attrs || []).some(attr => attr.name === 'class' && attr.value === 'fc')).length, 2);
  assert.equal(buttons.length, 6);
  assert.equal(text(buttons[0]), '<title>');
  assert.equal(text(buttons[3]), '<button>');
  assert.match(text(document), /<title>, <link>, <script> et <button>/);
  assert.match(text(document), /Une valeur < 5 et x/);
  assert.equal(elements(document, 'code').length, 2);
});

test('aucune carte source ni fin de réponse ne disparaît', () => {
  const longAnswer = 'Première phrase. ' + 'Élément essentiel '.repeat(12) + 'sans ponctuation finale';
  const source = [
    { q: 'Qu’est-ce que « X » ?', a: 'X' },
    { q: 'Question répétée ?', a: longAnswer },
    { q: 'Question répétée ?', a: 'Deuxième réponse.' }
  ];
  const document = parse5.parseFragment(kit.cards([{ title: 'Module', items: source }]));
  const cards = elements(document, 'div').filter(node => (node.attrs || []).some(attr => attr.name === 'class' && attr.value === 'fc'));
  assert.equal(cards.length, source.length);
  assert.match(text(cards[1]), /sans ponctuation finale/);
  assert.match(text(cards[2]), /Deuxième réponse/);
});

test('le premier palier est échappé et affiché une seule fois', () => {
  const html = kit.bands([
    { text: '&lt; 50 % — Reprenez le cours.' },
    { text: '50–69 % — Progressez.' },
    { text: '70–94 % — Consolidez.' },
    { text: '≥ 95 % — Continuez.' }
  ]);
  const errors = [];
  const document = parse5.parseFragment(html, { onParseError: error => errors.push(error) });
  assert.deepEqual(errors, []);
  assert.equal(text(document).match(/< 50 %/g).length, 1);
});

test('un énoncé garde les chevrons littéraux tout en conservant sa structure', () => {
  const document = parse5.parseFragment(kit.richHtml('<p>Résultat : <bandwidth_per_call_kbps:.1f>, <button> et <code>flux=<nom></code>.</p>'));
  assert.equal(elements(document, 'p').length, 1);
  assert.equal(elements(document, 'button').length, 0);
  assert.equal(elements(document, 'code').length, 1);
  assert.match(text(document), /<bandwidth_per_call_kbps:\.1f>, <button> et flux=<nom>/);
});

test('les ateliers exposent la cible des liens et les paramètres VoIP', () => {
  const document = parse5.parseFragment(labs.renderSection('b3-voip', 1));
  const container = elements(document, 'div').find(node => (node.attrs || []).some(attr => attr.name === 'id' && attr.value === 'exercices'));
  assert.ok(container);
  assert.match(text(container), /PER_CALL:<debit à une décimale>kbps/);
  assert.match(text(container), /TOTAL:<total à une décimale>kbps/);
});

test('le gabarit protège les comparaisons sans modifier les scripts', () => {
  const html = kit.escapeUnknownTags('<p>x<y et 2 < 3 et 5 > 4</p><script>if (x < y) console.log("<");</script>');
  const errors = [];
  const document = parse5.parseFragment(html, { onParseError: error => errors.push(error) });
  assert.deepEqual(errors, []);
  assert.equal(text(elements(document, 'p')[0]), 'x<y et 2 < 3 et 5 > 4');
  assert.equal(text(elements(document, 'script')[0]), 'if (x < y) console.log("<");');
});

test('les perluètes sont échappées sans changer le texte, les entités ni les liens', () => {
  const source = '<p>Q&A, &eacute;, &#65;, &amp; et &inconnue;.</p>' +
    '<a href="/recherche?q=oui&tri=non">R&D</a><script>const text = "Q&A";</script>';
  const original = parse5.parseFragment(source);
  const encoded = kit.escapeUnknownTags(source);
  const errors = [];
  const result = parse5.parseFragment(encoded, { onParseError: error => errors.push(error) });
  assert.deepEqual(errors, []);
  assert.equal(text(elements(result, 'p')[0]), text(elements(original, 'p')[0]));
  assert.equal(elements(result, 'a')[0].attrs[0].value, elements(original, 'a')[0].attrs[0].value);
  assert.equal(text(elements(result, 'script')[0]), 'const text = "Q&A";');
  assert.equal(kit.escapeUnknownTags(encoded), encoded);
});

test('le mémo d’architecture conserve toutes les comparaisons et les lignes suivantes', () => {
  const html = fs.readFileSync(path.join(__dirname, '../b1-architecture/chapitres/formules.html'), 'utf8');
  const document = parse5.parse(html);
  const example = elements(document, 'code').find(node => text(node).includes('comparateur :'));
  assert.ok(example);
  assert.match(text(example), /comparateur : a>b \/ a=b \/ a<b/);
  assert.match(text(example), /decodeur 2->4/);
  assert.match(text(example), /compteur modulo 2\^n/);
});

test('les pourcentages et la comparaison RSA restent des formules KaTeX valides', () => {
  const chapter = fs.readFileSync(path.join(__dirname, '../b1-stats/chapitres/chapitre2.html'), 'utf8');
  assert.match(chapter, /100\\,\\%/);
  assert.doesNotThrow(() => katex.renderToString('100\\,\\%', { throwOnError: true, strict: 'error' }));
  const rsa = require('../server/exercises/cyber-securite-b2/chapitre2').find(exercise => exercise.id === 'cs2-c2-e3');
  assert.match(rsa.brief, /\$m' \\ne m\$/);
  assert.doesNotMatch(rsa.brief, /<br>e m/);
  assert.doesNotThrow(() => katex.renderToString("m' \\ne m", { throwOnError: true, strict: 'error' }));
});

test('les indices Bash et PHP qui contiennent des dollars sont des blocs de code', () => {
  const bash = parse5.parseFragment(labs.renderSection('b1-architecture', 2));
  const php = parse5.parseFragment(labs.renderSection('php', 1));
  assert.ok(elements(bash, 'code').some(node => text(node) === '$((v % 2))'));
  assert.ok(elements(php, 'code').some(node => text(node) === '$this'));
});

test('un objectif d’atelier peut protéger ses expressions de code sans changer son texte', () => {
  const section = parse5.parseFragment(labs.renderSection('docker', 5));
  const goal = elements(section, 'p').find(node => text(node).includes('syntaxes d’interpolation'));
  assert.ok(goal);
  assert.ok(elements(goal, 'code').some(node => text(node) === '${VAR}'));
  assert.ok(elements(goal, 'code').some(node => text(node) === '${VAR:-default}'));
});

test('la protection par paramètres est circonscrite aux valeurs liées', () => {
  const sql = require('../server/content/b3-sql/chapitre5');
  const php = require('../server/content/php/chapitre6');
  const summary = sql.summary.join(' ');
  assert.doesNotMatch(summary, /prévention absolue/i);
  assert.match(summary, /valeurs/i);
  assert.match(summary, /noms de tables ou de colonnes/i);
  assert.match(summary, /liste autorisée/i);
  const question = php.questions.find(item => item.stem === 'Que protège une requête préparée ?');
  assert.match(question.exp, /valeurs liées/i);
  assert.doesNotMatch(question.exp, /empêchant l’injection/i);
});
