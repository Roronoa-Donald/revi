'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const catalogue = require('../../server/exercises/b1-algo');
const { finalizeChapter } = require('../../scripts/generate-code-labs');

const root = path.resolve(__dirname, '../..');
const python = process.env.PYTHON_BIN || 'python3';
const sandboxAvailable = process.env.REVI_ISOLE !== '1' && ['/usr/bin/bwrap', '/usr/bin/python3', '/etc/ld.so.cache']
  .every(file => fs.existsSync(file));

function read(relative) {
  return fs.readFileSync(path.join(root, relative), 'utf8');
}

function document(relative) {
  return parse5.parse(read(relative), { sourceCodeLocationInfo: true });
}

function all(node, predicate, result = []) {
  if (predicate(node)) result.push(node);
  for (const child of node.childNodes || []) all(child, predicate, result);
  return result;
}

function attribute(node, name) {
  return (node.attrs || []).find(item => item.name === name)?.value;
}

function hasClass(node, name) {
  return (attribute(node, 'class') || '').split(/\s+/).includes(name);
}

function text(node) {
  if (node.nodeName === '#text') return node.value;
  return (node.childNodes || []).map(text).join('');
}

function normalized(node) {
  return text(node).replace(/\s+/g, ' ').trim();
}

function unique(nodes, description) {
  assert.equal(nodes.length, 1, `${description} : ${nodes.length} éléments trouvés`);
  return nodes[0];
}

function codeContaining(doc, marker) {
  return text(unique(all(doc, node => node.tagName === 'code' && text(node).includes(marker)), `code ${marker}`));
}

function cardContaining(doc, marker) {
  return unique(all(doc, node => hasClass(node, 'fc') && normalized(node).includes(marker)), `carte ${marker}`);
}

function questionContaining(doc, marker) {
  return unique(all(doc, node => hasClass(node, 'q') && normalized(node).includes(marker)), `QCM ${marker}`);
}

function correctAnswer(question) {
  return normalized(unique(all(question, node => node.tagName === 'button' && attribute(node, 'data-correct') === '1'), 'réponse correcte'));
}

function exercise(id) {
  return unique(catalogue.filter(item => item.id === id), `exercice ${id}`);
}

function execute(code, stdin = '') {
  const args = sandboxAvailable ? [
    '--die-with-parent', '--unshare-net', '--unshare-pid', '--clearenv',
    '--ro-bind', '/usr', '/usr', '--symlink', 'usr/bin', '/bin',
    '--symlink', 'usr/lib', '/lib', '--symlink', 'usr/lib', '/lib64',
    '--ro-bind', '/etc/ld.so.cache', '/etc/ld.so.cache', '--proc', '/proc',
    '--dev', '/dev', '--tmpfs', '/tmp', '--chdir', '/tmp', '--setenv', 'LANG', 'C.UTF-8',
    '/usr/bin/python3', '-I', '-B', '-c', code
  ] : ['-I', '-B', '-c', code];
  const result = spawnSync(sandboxAvailable ? '/usr/bin/bwrap' : python, args, {
    input: stdin,
    encoding: 'utf8',
    timeout: 1500,
    maxBuffer: 1024 * 1024
  });
  return { status: result.status, stdout: result.stdout || '', stderr: result.stderr || '', error: result.error };
}

function expectOutput(code, stdin, expected) {
  const result = execute(code, stdin);
  assert.equal(result.status, 0, `exécution Python échouée : ${result.error || result.stderr}`);
  assert.equal(result.stdout.trim(), expected.trim());
}

function checkExercise(item) {
  for (const sample of [...item.examples, ...item.tests]) {
    expectOutput(item.solution, sample.stdin, sample.expected);
  }
}

function wrongOnAtLeastOneTest(item, variant) {
  assert.notEqual(variant, item.solution, 'la variante doit modifier la solution');
  assert.ok(item.tests.some(sample => {
    const result = execute(variant, sample.stdin);
    return result.status !== 0 || result.stdout.trim() !== sample.expected.trim();
  }), 'aucun test caché ne rejette la variante');
}

test('F107 : distinguer continuation TantQue et arrêt Répéter', () => {
  const chapter = document('b1-algo/chapitres/chapitre1.html');
  const row = unique(all(chapter, node => node.tagName === 'tr' && /Boucle/.test(normalized(node))), 'ligne Boucle');
  assert.match(normalized(row), /TantQue.*vraie.*Répéter.*arrête.*vraie/i);
  const example = codeContaining(document('b1-algo/chapitres/chapitre5.html'), 'choix = int(input(');
  expectOutput(example, '3\n1\n', 'Entrez 1 pour continuer : Entrez 1 pour continuer :');
  expectOutput(example, '1\n', 'Entrez 1 pour continuer :');
});

test('F108 : conventions des signes et cartes de division', () => {
  const chapter = document('b1-algo/chapitres/chapitre2.html');
  const content = normalized(chapter);
  assert.match(content, /-7 div 3\s*=\s*-2/);
  assert.match(content, /-7 mod 3\s*=\s*-1/);
  assert.match(content, /vers zéro/i);
  assert.match(content, /moins l'infini/i);
  expectOutput(codeContaining(chapter, 'print(-7 // 3, -7 % 3)'), '', '-3 2\n-3 -2');
  const cards = document('b1-algo/chapitres/cartes.html');
  assert.match(normalized(cardContaining(cards, 'Différence entre div et mod')), /négatif/i);
  const equality = normalized(cardContaining(cards, 'Quelle égalité relie dividende'));
  assert.match(equality, /a ≥ 0/);
  assert.match(equality, /b > 0/);
  assert.match(normalized(document('b1-algo/chapitres/formules.html')), /-7 mod 3.*-1/);
});

test('F110 : zéro ou une branche selon la présence de Sinon', () => {
  const chapter = document('b1-algo/chapitres/chapitre3.html');
  const question = questionContaining(chapter, 'Au maximum, combien de branches');
  assert.match(correctAnswer(question), /Une seule/i);
  assert.match(normalized(question), /aucune.*Sinon/i);
  const code = codeContaining(chapter, 'elif note >= 8');
  for (const [score, output] of [[12, 'Admis'], [9, 'Rattrapage'], [4, 'Ajourné']]) {
    expectOutput(`note = ${score}\n${code}`, '', output);
  }
  const simulation = questionContaining(document('b1-algo/chapitres/simulateur-examen.html'), 'si aucune condition');
  assert.match(correctAnswer(simulation), /Aucune branche/i);
  expectOutput('x = 0\nif x > 2:\n    print("première")\nelif x > 1:\n    print("seconde")\nprint("fin")', '', 'fin');
});

test('F111 : Syracuse positive, entrées invalides et conjecture', () => {
  const chapter = document('b1-algo/chapitres/chapitre5.html');
  const content = normalized(chapter);
  assert.match(content, /entier strictement positif/i);
  assert.match(content, /pas démontr[ée].*tous les entiers positifs/i);
  const code = codeContaining(chapter, 'etapes = 0');
  for (const [input, output] of [['1\n', '0'], ['6\n', '8'], ['0\n', 'La valeur doit être strictement positive.'], ['-3\n', 'La valeur doit être strictement positive.']]) {
    expectOutput(code, input, output);
  }
  const card = normalized(cardContaining(document('b1-algo/chapitres/cartes.html'), 'Syracuse : que fait-on'));
  assert.match(card, /strictement positif/i);
  assert.match(card, /conjecture/i);
});

test('F113 : réaffectation locale et mutation de liste partagée', () => {
  const chapter = document('b1-algo/chapitres/chapitre7.html');
  const code = codeContaining(chapter, 'def remplacer(liste):');
  expectOutput(code, '', '[1]\n[1, 2]');
  assert.match(normalized(chapter), /réaffectation.*locale/i);
  assert.match(normalized(chapter), /liste partagée/i);
  const question = questionContaining(chapter, 'Une fonction reçoit une liste');
  assert.match(correctAnswer(question), /visible.*appelant/i);
  const cards = document('b1-algo/chapitres/cartes.html');
  assert.match(normalized(cardContaining(cards, "Portée d'une variable locale")), /boucle.*ne crée pas/i);
  assert.match(normalized(cardContaining(cards, 'variable globale')), /liste.*modifi/i);
});

test('F114 : initialisation de la matrice dans le bloc autonome', () => {
  const code = codeContaining(document('b1-algo/chapitres/chapitre8.html'), 'matrice.append(ligne)');
  expectOutput(code, '1 2 3 4\n5 6 7 8\n9 10 11 12\n', '7');
});

test('F115 : schéma classique à deux boucles et contre-exemple à une boucle', () => {
  const chapter = document('b1-algo/chapitres/chapitre8.html');
  const question = questionContaining(chapter, 'méthode à deux boucles étudiée');
  assert.match(correctAnswer(question), /Deux.*imbriquées/i);
  assert.match(normalized(question), /seule boucle/i);
  const code = codeContaining(chapter, 'for indice in range(lignes * colonnes):');
  expectOutput(code, '', '1\n2\n3\n4\n5\n6');
  const astCheck = `import ast\nimport sys\nsource = sys.stdin.read()\ntree = ast.parse(source)\nprint(sum(isinstance(node, (ast.For, ast.While)) for node in ast.walk(tree)))`;
  expectOutput(astCheck, code, '1');
  const card = normalized(cardContaining(document('b1-algo/chapitres/cartes.html'), 'Quelle est la méthode classique pour parcourir une matrice'));
  assert.match(card, /une seule boucle/i);
});

test('F116 : PGCD non négatif, zéro et entiers négatifs', () => {
  const chapter = document('b1-algo/chapitres/chapitre9.html');
  const code = codeContaining(chapter, 'def pgcd(a, b):');
  const verification = `${code}\nimport math\nfor a in range(-12, 13):\n    for b in range(-12, 13):\n        assert pgcd(a, b) == math.gcd(a, b), (a, b, pgcd(a, b))\nprint("625 couples")`;
  expectOutput(verification, '', '625 couples');
  const question = questionContaining(chapter, 'Que renvoie pgcd(a, 0)');
  assert.match(correctAnswer(question), /(?:abs\(a\)|\|a\|)/);
  assert.match(normalized(chapter), /pgcd\(0, 0\)\s*=\s*0/i);
  const item = exercise('algo-c9-e3');
  checkExercise(item);
  for (const [input, output] of [['2\n3\n-8\n0\n', '8\n8'], ['2\n3\n0\n-8\n', '8\n8'], ['2\n3\n0\n0\n', '8\n0']]) {
    expectOutput(item.solution, input, output);
  }
  wrongOnAtLeastOneTest(item, item.solution.replace('return abs(a)', 'return a'));
  wrongOnAtLeastOneTest(item, item.solution.replace('return abs(a)', 'return abs(b)'));
});

test('F117 : trace à quatre passages et exercice borné', () => {
  const chapter = document('b1-algo/chapitres/chapitre9.html');
  assert.match(normalized(chapter), /vérification.*pas obligatoire/i);
  const trace = unique(all(chapter, node => node.tagName === 'table' && normalized(node).includes('Tableau avant') && normalized(node).includes('Échanges')), 'table de trace');
  const rows = all(trace, node => node.tagName === 'tr').slice(1).map(row => all(row, node => node.tagName === 'td').map(normalized));
  assert.equal(rows.length, 4);
  const traceCode = `values = [5, 2, 8, 1]\nwhile True:\n    before = " ".join(map(str, values))\n    swaps = []\n    for index in range(len(values) - 1):\n        if values[index] > values[index + 1]:\n            swaps.append(f"({values[index]},{values[index + 1]})")\n            values[index], values[index + 1] = values[index + 1], values[index]\n    print(before + "|" + (", ".join(swaps) or "aucun") + "|" + " ".join(map(str, values)))\n    if not swaps:\n        break`;
  const observed = execute(traceCode);
  assert.equal(observed.status, 0, observed.stderr);
  const lines = observed.stdout.trim().split('\n').map(line => line.split('|'));
  for (let index = 0; index < rows.length; index++) {
    assert.equal(rows[index][1], lines[index][0]);
    assert.equal(rows[index][2], lines[index][1]);
    if (index < 3) assert.equal(rows[index][3], lines[index][2]);
  }
  const item = exercise('algo-c9-e1');
  assert.match(item.brief, /réduisez d’une case/i);
  checkExercise(item);
  expectOutput(item.solution, '4\n5\n2\n8\n1\n', '1 2 5 8\n3');
});

test('F118 : lecture autorisée dans le programme principal, calculs en fonctions', () => {
  const item = exercise('algo-c10-e3');
  assert.match(item.brief, /lecture.*compréhension.*programme principal/i);
  assert.match(item.brief, /boucles de calcul.*fonctions/i);
  const chapter = document('b1-algo/chapitres/chapitre10.html');
  const lab = unique(all(chapter, node => attribute(node, 'data-exercise') === item.id), 'bloc F118');
  assert.match(normalized(lab), /lecture.*compréhension.*programme principal/i);
  const astCheck = `import ast\nimport sys\ntree = ast.parse(sys.stdin.read())\nprint(sum(isinstance(node, (ast.For, ast.While)) for node in tree.body))\nprint(sum(isinstance(node.value, ast.ListComp) for node in tree.body if isinstance(node, ast.Assign)))`;
  expectOutput(astCheck, item.starter, '0\n1');
  expectOutput(astCheck, item.solution, '0\n1');
  checkExercise(item);
});

test('F119 : progression entière bornée, contre-exemple et récursion', () => {
  const chapter = document('b1-algo/chapitres/chapitre5.html');
  assert.match(normalized(chapter), /entier.*diminue.*strictement/i);
  assert.match(normalized(chapter), /divis.*par deux.*sans jamais atteindre zéro/i);
  const code = codeContaining(chapter, 'compteur = 3');
  expectOutput(code, '', '0');
  const rational = 'from fractions import Fraction\nx = Fraction(1)\nfor step in range(100):\n    x /= 2\nassert x > 0\nprint("positif après 100 divisions exactes")';
  expectOutput(rational, '', 'positif après 100 divisions exactes');
  const question = questionContaining(chapter, "garantit l'arrêt de la boucle");
  assert.match(correctAnswer(question), /diminuer.*1/i);
  const simulator = document('b1-algo/chapitres/simulateur-examen.html');
  const recursion = questionContaining(simulator, "garantit l'arrêt d'une fonction récursive");
  assert.match(correctAnswer(recursion), /cas de base.*diminue/i);
  assert.match(normalized(cardContaining(document('b1-algo/chapitres/cartes.html'), "progression vers l'arrêt")), /entier.*diminue/i);
});

test('F109 : format et première égalité préservés', () => {
  const item = exercise('algo-c3-e2');
  assert.match(item.brief, /Max : 9 \(position 2\).*première position/s);
  checkExercise(item);
  expectOutput(item.solution, '-5\n-5\n-8\n', 'Max : -5 (position 1)');
  wrongOnAtLeastOneTest(item, item.solution.replaceAll('> maximum:', '>= maximum:'));
});

test('F112 : tableau non vide et valeur négative préservés', () => {
  const item = exercise('algo-c6-e1');
  assert.match(item.brief, /n ≥ 1.*au moins une valeur/s);
  checkExercise(item);
  expectOutput(item.solution, '1\n-9\n', '-9\n-9');
  wrongOnAtLeastOneTest(item, item.solution.replace('maximum = tableau[0]', 'maximum = 0'));
});

test('F205 : tri par sélection et dernier échange préservés', () => {
  const item = exercise('algo-c6-e3');
  checkExercise(item);
  expectOutput(item.solution, '2\n5\n1\n', '1 5');
  wrongOnAtLeastOneTest(item, item.solution.replace('range(n - 1)', 'range(n - 2)'));
});

test('F206 : frontières strictes de facturation préservées', () => {
  const item = exercise('algo-c10-e1');
  checkExercise(item);
  for (const [quantity, expected] of [[10, 1000], [11, 1045], [50, 4750], [51, 4590]]) {
    expectOutput(item.solution, `100\n${quantity}\n`, String(expected));
  }
  wrongOnAtLeastOneTest(item, item.solution.replace('quantite > 10', 'quantite >= 10'));
  wrongOnAtLeastOneTest(item, item.solution.replace('quantite > 50', 'quantite >= 50'));
});

test('Blocs générés : les dix chapitres B1 algorithmique restent synchronisés', () => {
  for (let chapter = 1; chapter <= 10; chapter++) {
    const content = read(`b1-algo/chapitres/chapitre${chapter}.html`);
    assert.equal(finalizeChapter(content, 'b1-algo', chapter), content, `chapitre ${chapter} désynchronisé`);
  }
});
