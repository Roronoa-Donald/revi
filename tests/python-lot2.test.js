'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const exercises = require('../server/exercises/b1-python');

const root = path.resolve(__dirname, '..');
const alreadyIsolated = process.env.REVI_ISOLE === '1';
const sandboxAvailable = fs.existsSync('/usr/bin/python3') && (alreadyIsolated ||
  ['/usr/bin/bwrap', '/etc/ld.so.cache'].every(file => fs.existsSync(file)));
const testOptions = { skip: sandboxAvailable ? false : 'bubblewrap et Python système requis' };

function page(name) {
  return parse5.parse(fs.readFileSync(path.join(root, 'b1-python/chapitres', name), 'utf8'));
}

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join('');
}

function hasClass(node, name) {
  return (node.attrs || []).some(attribute => attribute.name === 'class' && attribute.value.split(/\s+/).includes(name));
}

function findNode(document, predicate, description) {
  const node = descendants(document).find(predicate);
  assert.ok(node, description);
  return node;
}

function findByClassAndText(document, className, content) {
  return findNode(document, node => hasClass(node, className) && text(node).includes(content), `${className}: ${content}`);
}

function python(source) {
  const args = alreadyIsolated ? ['-I', '-c', source] : [
    '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
    '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
    '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache',
    '--proc', '/proc', '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp',
    '--setenv', 'LANG', 'C.UTF-8', '/usr/bin/python3', '-I', '-c', source
  ];
  const result = spawnSync(alreadyIsolated ? '/usr/bin/python3' : '/usr/bin/bwrap', args, { encoding: 'utf8', timeout: 5000 });
  assert.equal(result.status, 0, `${result.error || ''}\n${result.stderr}`);
  return result.stdout.trimEnd();
}

function codeIn(node) {
  const pre = findNode(node, child => child.tagName === 'pre', 'Bloc de code absent');
  return text(findNode(pre, child => child.tagName === 'code', 'Élément code absent'));
}

function correctAnswer(question) {
  const answers = descendants(question).filter(node => node.tagName === 'button' &&
    (node.attrs || []).some(attribute => attribute.name === 'data-correct' && attribute.value === '1'));
  assert.equal(answers.length, 1, 'Le QCM doit comporter une seule réponse correcte');
  return text(answers[0]);
}

function exercise(id) {
  const item = exercises.find(candidate => candidate.id === id);
  assert.ok(item, `Exercice ${id} absent`);
  return item;
}

test('F85 : le programme des voyelles produit bien la sortie et les explications affichées', testOptions, () => {
  const item = findByClassAndText(page('chapitre2.html'), 'item', 'Compter les voyelles');
  const output = text(findNode(item, node => hasClass(node, 'out'), 'Sortie de l’exemple absente')).trim();
  const program = codeIn(item);
  assert.equal(python(program), output);
  assert.equal(output, '5');
  assert.match(text(item), /[Yy].{0,100}5|5.{0,100}[Yy]/s);
  assert.match(text(item), /non accentuées/i);
  assert.ok(program.includes('phrase = "Bonjour Python"'));
  assert.equal(python(program.replace('phrase = "Bonjour Python"', 'phrase = "Été"')), '0');
  assert.equal(python(program.replace('phrase = "Bonjour Python"', 'phrase = "BONJOUR"')), '3');
});

test('F86 : int accepte espaces et saut de ligne, et le cours ne le contredit pas', testOptions, () => {
  const document = page('chapitre5.html');
  const item = findByClassAndText(document, 'item', 'int("Jean, 15\\n".split(",")[1])');
  assert.equal(python('print(int("Jean, 15\\n".split(",")[1]))'), '15');
  assert.match(text(item), /15/);
  assert.doesNotMatch(text(item), /échoue-t-il|pas le.*combiné/s);
  const completeText = text(document);
  assert.doesNotMatch(completeText, /int\(" 15\\n"\).{0,20}échoue/s);
  assert.doesNotMatch(completeText, /Chaque ligne lue contient son caractère de fin de ligne/i);
  const cleaning = findByClassAndText(document, 'box', 'Nettoyer les extrémités');
  assert.match(text(cleaning), /dernière ligne.*(?:sans|ne pas)/is);
  assert.match(text(cleaning), /rstrip/);
  const question = findByClassAndText(document, 'q', 'Lire un fichier ligne');
  assert.equal(python(`ligne = "Jean, 15\\n"\nprint(${correctAnswer(question)})`), '15');
  const readLines = findByClassAndText(document, 'q', 'for ligne in f:');
  assert.match(correctAnswer(readLines), /si.*présent/i);
  const card = findByClassAndText(page('cartes.html'), 'fc', 'strip() avant int()');
  assert.match(text(card), /pas nécessaire/i);
  assert.match(exercise('py-c5-e1').hints[1], /peut.*saut de ligne/i);
  assert.equal(python('import io\nprint(list(io.StringIO("Jean, 15")))'), "['Jean, 15']");
});

test('F86 : le résumé préserve les blancs significatifs au lieu d’imposer strip', testOptions, () => {
  const revision = findByClassAndText(page('chapitre5.html'), 'box--revision', 'Résumé essentiel');
  const content = text(revision);
  assert.doesNotMatch(content, /Toujours\s*\.strip\(\)/i);
  assert.match(content, /strip\(\).{0,100}(?:si|lorsque).{0,100}blancs/i);
  const source = 'ligne = "  Jean, 15\\n"\nprint(repr(ligne.split(",")[0]))\nprint(repr(ligne.strip().split(",")[0]))\nprint(int(ligne.split(",")[1]))';
  assert.equal(python(source), "'  Jean'\n'Jean'\n15");
});

test('F87 : les boucles des QCM sont des blocs Python exécutables', testOptions, () => {
  const document = page('chapitre2.html');
  const loop = findByClassAndText(document, 'q', 'Que fait ce code ?');
  assert.equal(python(`${codeIn(loop)}\nprint(valeur)`), '-2');
  assert.match(correctAnswer(loop), /s'arrête.*≤ 0/i);
  const nested = findByClassAndText(document, 'q', 'Combien de fois');
  assert.equal(python(codeIn(nested)), Array(6).fill('abc').join('\n'));
  assert.equal(correctAnswer(nested).trim(), '6');
  const cards = text(page('cartes.html'));
  assert.ok(!cards.includes('for i in range(2): for j in range(3):'));
});

test('F88 : virgule et point décimal ont des effets distincts', testOptions, () => {
  const item = findByClassAndText(page('chapitre1.html'), 'item', 'prix_ht * 1,18');
  assert.match(text(item), /expression produit un tuple/i);
  assert.doesNotMatch(text(item), /lève\s+TypeError/i);
  assert.match(text(item), /12\.5,\s*18/);
  const expression = findNode(item, node => node.tagName === 'code' && text(node) === 'prix_ht * 1,18', 'Expression à virgule absente');
  assert.equal(python(`prix_ht = 12.5\nprint((${text(expression)}))\nprint(prix_ht * 1, 18, sep="|")\nprint(prix_ht * 1.18)`), '(12.5, 18)\n12.5|18\n14.75');
});

test('F89 : la division plancher et ses types sont nuancés dans le cours et les cartes', testOptions, () => {
  const chapter = text(page('chapitre1.html'));
  const card = findByClassAndText(page('cartes.html'), 'fc', 'Différence // et %');
  assert.ok(chapter.includes('-3 // 2'));
  assert.ok(chapter.includes('7.0 // 2'));
  assert.ok(text(card).includes('7.0 // 2'));
  assert.match(text(card), /int.*float/i);
  assert.doesNotMatch(chapter, /\/\/\s+tronque le résultat/);
  const question = findByClassAndText(page('simulateur-examen.html'), 'q', '10 / 2');
  assert.match(text(question), /types/i);
  assert.match(correctAnswer(question), /5\.0\s*\(float\).*5\s*\(int\)/i);
  assert.equal(python('print(-3 // 2)\nprint(7.0 // 2)\nprint(type(7 // 2).__name__)\nprint(type(7.0 // 2).__name__)'), '-2\n3.0\nint\nfloat');
});

test('F90 : une liste vide fournie est conservée et les défauts ne sont pas partagés', testOptions, () => {
  const box = findByClassAndText(page('chapitre3.html'), 'box', 'Valeur par défaut mutable');
  const program = `${codeIn(box)}\nliste = []\nretour = ajouter("a", liste)\nprint(retour is liste, liste)\nexistante = [9]\nretour = ajouter("x", existante)\nprint(retour is existante, existante)\nprint(ajouter("b"), ajouter("c"), ajouter("d", None))`;
  assert.equal(python(program), "True ['a']\nTrue [9, 'x']\n['b'] ['c'] ['d']");
  assert.match(text(box), /None.*(?:explicitement|explicite)/is);
  const question = findByClassAndText(page('chapitre3.html'), 'q', 'def f(items=[])');
  const signature = findNode(question, node => node.tagName === 'code' && text(node).includes('def f(items=[])'), 'Fonction du QCM absente');
  assert.equal(python(`${text(signature)}\nprint("syntaxe valide")`), 'syntaxe valide');
  assert.match(correctAnswer(question), /partagée entre les appels/i);
});

test('F32 : les cartes définissent les opérateurs et expliquent l’ordre des branches', testOptions, () => {
  const document = page('cartes.html');
  const operators = text(findByClassAndText(document, 'fc', 'and / or / not'));
  const order = text(findByClassAndText(document, 'fc', 'ordre des tests'));
  assert.match(operators, /deux conditions/);
  assert.match(operators, /au moins une/);
  assert.match(operators, /inverse/);
  assert.match(order, /premi[eè]re.*vraie/i);
  assert.match(order, /100/);
  assert.doesNotMatch(exercise('py-c2-e2').hints.join(' '), /toujours.*plus exigeant/i);
  assert.equal(python('print(True and False, True or False, not True)'), 'False True False');
});

test('F222 : un exemple exécutable de fonction et return précède le premier atelier', testOptions, () => {
  const document = page('chapitre1.html');
  const nodes = descendants(document);
  const example = findNode(document, node => node.tagName === 'pre' && text(node).includes('def doubler('), 'Exemple de fonction préalable absent');
  const challenge = findByClassAndText(document, 'item', 'centimes en euros et centimes');
  const lab = findNode(document, node => node.tagName === 'div' && (node.attrs || []).some(attribute => attribute.name === 'id' && attribute.value === 'py-c1-e1'), 'Premier atelier absent');
  assert.ok(nodes.indexOf(example) < nodes.indexOf(challenge));
  assert.ok(nodes.indexOf(challenge) < nodes.indexOf(lab));
  assert.equal(python(text(example)), '8');
  assert.match(codeIn(challenge), /def\s+\w+\(/);
  assert.match(codeIn(challenge), /return/);
  assert.equal(python(codeIn(challenge)), '2 € et 85 centimes');
  assert.doesNotMatch(exercise('py-c1-e1').hints.join(' '), /si None s.affiche.*c.est qu.un print/i);
});
