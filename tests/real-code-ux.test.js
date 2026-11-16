'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');
const read = relative => fs.readFileSync(path.join(root, relative), 'utf8');
const EMOJI = /\p{Extended_Pictographic}|\p{Emoji_Presentation}/u;

const sim = require('../assets/js/engines/asm-simulator.js');

function sectionsOf(modulePath) {
  const loaded = require(path.join(root, modulePath));
  const chapters = Array.isArray(loaded) ? loaded : [loaded];
  return chapters.flatMap(chapter => chapter.sections.map(section => ({ chapter, section })));
}

function laboSections(modulePath) {
  return sectionsOf(modulePath).filter(({ section }) => /^Labo Python appliqué/.test(section.title));
}

const python = spawnSync('python3', ['--version']);
const hasPython = python.status === 0;

test('analyse : badge de mode, libellés et bouton de trame dans code-lab.js', () => {
  const js = read('assets/js/code-lab.js');
  assert.match(js, /lab__mode-badge/);
  assert.match(js, /Étude de cas structurée · Réponses par question/);
  assert.match(js, /'Tester mes réponses'/);
  assert.match(js, /Valider l'étude de cas/);
  assert.match(js, /lab__insert-template/);
  assert.match(js, /data-lab-insert-template/);
  assert.match(js, /Pré-remplir la trame \[Question N\]/);
  assert.match(js, /lab__submit/, 'le hook .lab__submit est conservé');
  assert.match(js, /Lab\.prototype\.insertTemplate/);
});

test('analyse : styles du badge et du bouton de trame', () => {
  const css = read('assets/css/code-lab.css');
  assert.match(css, /\.lab__mode-badge\s*\{/);
  assert.match(css, /\.lab__insert-template\s*\{/);
});

test('simulateur x86 : registres 16 bits, moitiés 8 bits, drapeaux et mémoire', () => {
  const r = sim.run('MOV AX, 0x1234\nMOV BL, 0xFF\nADD BL, 1\nHLT');
  assert.equal(r.registers.AX, 0x1234);
  assert.equal(r.registers.AH, 0x12);
  assert.equal(r.registers.AL, 0x34);
  assert.equal(r.registers.BL, 0);
  assert.equal(r.flags.ZF, 1);
  assert.equal(r.flags.CF, 1);
  assert.ok(r.halted);
  for (const name of ['AX', 'BX', 'CX', 'DX', 'SI', 'DI', 'SP', 'BP', 'IP']) assert.ok(name in r.registers, name);
  for (const flag of ['ZF', 'SF', 'CF', 'OF']) assert.ok(flag in r.flags, flag);
  assert.equal(Object.keys(r.memory).length, 256);

  const overflow = sim.run('MOV AX, 0x7FFF\nADD AX, 1\nHLT');
  assert.equal(overflow.registers.AX, 0x8000);
  assert.equal(overflow.flags.OF, 1);
  assert.equal(overflow.flags.SF, 1);
});

test('simulateur x86 : logique, décalages, pile, mémoire et sauts', () => {
  const logic = sim.run('MOV AL, 0xD6\nAND AL, 0x0F\nSHL AL, 1\nOR AL, 0x80\nXOR AX, AX\nHLT');
  assert.equal(logic.registers.AX, 0);
  assert.equal(logic.flags.ZF, 1);

  const bits = sim.run('MOV AL, 0xD6\nAND AL, 0x0F\nSHL AL, 1\nOR AL, 0x80\nHLT');
  assert.equal(bits.registers.AL, 0x8C);

  const stack = sim.run('MOV AX, 5\nPUSH AX\nPOP BX\nMOV [10], BX\nHLT');
  assert.equal(stack.registers.BX, 5);
  assert.equal(stack.memory[10], 5);

  const loop = sim.run('MOV CX, 3\nMOV AX, 0\nboucle: ADD AX, 2\nDEC CX\nJNZ boucle\nHLT');
  assert.equal(loop.registers.AX, 6);
  assert.equal(loop.registers.CX, 0);

  const branch = sim.run('MOV AX, 1\nCMP AX, 1\nJE fin\nMOV BX, 9\nfin: HLT');
  assert.equal(branch.registers.BX, 0);

  const neg = sim.run('MOV AX, 5\nNOT AX\nINC AX\nHLT');
  assert.equal(neg.registers.AX, 0xFFFB);
});

test('simulateur x86 : pas à pas, instantanés par étape et garde-fou de cycles', () => {
  const machine = sim.create();
  machine.load('MOV AX, 1\nINC AX\nHLT');
  machine.step();
  assert.equal(machine.getRegister('AX'), 1);
  machine.step();
  assert.equal(machine.getRegister('AX'), 2);

  const full = sim.run('MOV AX, 1\nINC AX\nHLT');
  assert.ok(Array.isArray(full.steps));
  assert.equal(full.steps.length, 3);
  assert.equal(full.steps[0].registers.AX, 1);
  assert.equal(full.steps[1].registers.AX, 2);

  const infinite = sim.run('boucle: JMP boucle');
  assert.ok(infinite.cycleLimitReached);
  assert.match(infinite.error, /cycles/i);
  assert.ok(infinite.steps.length <= 1024);

  assert.throws(() => sim.run('FOO AX'), /non support/);
});

test('simulateur x86 : UMD, montage automatique et aucun emoji', () => {
  const source = read('assets/js/engines/asm-simulator.js');
  assert.match(source, /window/);
  assert.match(source, /module\.exports/);
  assert.match(source, /data-asm-simulator/);
  assert.doesNotMatch(source, EMOJI);
  assert.equal(typeof sim.mountAll, 'function');
});

test('assembleur : chaque chapitre porte un simulateur et un tableau de trace', () => {
  for (let n = 1; n <= 6; n += 1) {
    const chapter = require(`../server/content/assembleur/chapitre${n}`);
    const html = chapter.sections.map(section => section.html).join('\n');
    assert.match(html, /data-asm-simulator/, `chapitre ${n} : simulateur`);
    assert.match(html, /\/assets\/js\/engines\/asm-simulator\.js/, `chapitre ${n} : script`);
    assert.match(html, /<table/, `chapitre ${n} : tableau de trace`);
    assert.ok(chapter.questions.length >= 8, `chapitre ${n} : QCM`);
    for (const question of chapter.questions) {
      const opts = question.opts || question.options;
      assert.ok(opts.length >= 3 && question.correct >= 0 && question.correct < opts.length, `chapitre ${n} : option correcte`);
    }
  }
});

test('assembleur : chaque programme embarqué s’exécute sans erreur dans le simulateur', () => {
  for (let n = 1; n <= 6; n += 1) {
    const chapter = require(`../server/content/assembleur/chapitre${n}`);
    const html = chapter.sections.map(section => section.html).join('\n');
    for (const match of html.matchAll(/data-asm-code="([^"]*)"/g)) {
      const code = match[1].replace(/&#10;|&#13;/g, '\n').replace(/\\n/g, '\n').replace(/&quot;/g, '"');
      const result = sim.run(code);
      assert.equal(result.error, null, `chapitre ${n} : ${code}`);
      assert.ok(result.halted, `chapitre ${n} : arrêt propre`);
    }
  }
});

test('api-rest-flask : routes, JSON, codes HTTP, Blueprint, JWT et tests client', () => {
  const html = [1, 2, 3, 4, 5, 6].map(n => {
    const chapter = require(`../server/content/api-rest-flask/chapitre${n}`);
    return chapter.sections.map(section => section.html).join('\n');
  }).join('\n');
  for (const token of ['@app.route', 'request.get_json', 'jsonify', 'Blueprint', 'url_prefix', 'test_client', 'Authorization', '201', '404', '422']) {
    assert.ok(html.includes(token), `api-rest-flask doit contenir ${token}`);
  }
  assert.match(html, /JWT/);
});

test('Labo Python appliqué : algèbre, statistiques et probabilités', () => {
  assert.equal(laboSections('server/content/b1-algebre/chapitres-4-6.js').length, 3);
  assert.equal(laboSections('server/content/b1-stats/chapitres-4-6.js').length, 3);
  for (const n of [3, 5, 6]) {
    assert.equal(laboSections(`server/content/probabilites/chapitre${n}.js`).length, 1, `probabilites chapitre ${n}`);
  }
  const algebra = laboSections('server/content/b1-algebre/chapitres-4-6.js').map(({ section }) => section.html).join('\n');
  assert.match(algebra, /Gauss/);
  assert.match(algebra, /det/);
  const stats = laboSections('server/content/b1-stats/chapitres-4-6.js').map(({ section }) => section.html).join('\n');
  assert.match(stats, /pvariance/);
  assert.match(stats, /quantiles/);
  assert.match(stats, /régression/);
  const probabilities = [3, 5, 6].map(n => laboSections(`server/content/probabilites/chapitre${n}.js`)[0].section.html).join('\n');
  assert.match(probabilities, /comb/);
  assert.match(probabilities, /erf/);
  assert.match(probabilities, /Monte-Carlo/);
});

test('Labo Python appliqué : chaque programme produit la sortie annoncée', { skip: !hasPython }, () => {
  const files = [
    'server/content/b1-algebre/chapitres-4-6.js',
    'server/content/b1-stats/chapitres-4-6.js',
    'server/content/probabilites/chapitre3.js',
    'server/content/probabilites/chapitre5.js',
    'server/content/probabilites/chapitre6.js'
  ];
  const decode = text => text.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
  let checked = 0;
  for (const file of files) {
    for (const { section } of laboSections(file)) {
      const code = /<pre><code class="language-python">([\s\S]*?)<\/code><\/pre>/.exec(section.html);
      const expected = /Sortie attendue[\s\S]*?<pre><code>([\s\S]*?)<\/code><\/pre>/.exec(section.html);
      assert.ok(code && expected, `${file} : ${section.title}`);
      const run = spawnSync('python3', ['-c', decode(code[1])], { encoding: 'utf8' });
      assert.equal(run.status, 0, `${file} : ${run.stderr}`);
      if (!/random/.test(code[1])) {
        assert.equal(run.stdout.trim(), decode(expected[1]).trim(), file);
      } else {
        assert.equal(run.stdout.trim(), decode(expected[1]).trim(), `${file} : graine fixée, sortie reproductible`);
      }
      checked += 1;
    }
  }
  assert.equal(checked, 9);
});

test('b1-projet : cahier des charges, MCD/MLD, SQL, séparation MVC, Git et soutenance', () => {
  const html = [
    ...sectionsOf('server/content/b1-projet/chapitres-1-3.js'),
    ...sectionsOf('server/content/b1-projet/chapitres-4-6.js')
  ].map(({ section }) => `${section.title}\n${section.html}`).join('\n');
  for (const token of [/cahier des charges/i, /MCD/, /MLD/, /CREATE TABLE/, /MVC/, /git commit/, /git init/, /soutenance/i, /psycopg2/, /%s/]) {
    assert.match(html, token);
  }
});

test('aucun emoji dans les fichiers du lot', () => {
  const files = [
    'assets/js/code-lab.js',
    'assets/css/code-lab.css',
    'assets/js/engines/asm-simulator.js',
    'server/content/b1-algebre/chapitres-4-6.js',
    'server/content/b1-stats/chapitres-4-6.js',
    'server/content/probabilites/chapitre3.js',
    'server/content/probabilites/chapitre5.js',
    'server/content/probabilites/chapitre6.js',
    'server/content/b1-projet/chapitres-1-3.js',
    'server/content/b1-projet/chapitres-4-6.js',
    ...[1, 2, 3, 4, 5, 6].flatMap(n => [`server/content/assembleur/chapitre${n}.js`, `server/content/api-rest-flask/chapitre${n}.js`])
  ];
  for (const file of files) {
    const match = EMOJI.exec(read(file));
    assert.equal(match, null, `${file} : emoji ${match && match[0]}`);
  }
});
