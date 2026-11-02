'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const architectureFirst = require('../server/content/b1-architecture/chapitres-1-3');
const architectureSecond = require('../server/content/b1-architecture/chapitres-4-6');
const assemblerFirst = require('../server/content/assembleur/chapitre1');
const assemblerFifth = require('../server/content/assembleur/chapitre5');

const root = path.resolve(__dirname, '..');
const assemblerAvailable = ['/usr/bin/as', '/usr/bin/objcopy'].every(name => fs.existsSync(name));

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text').map(child => child.value).join('');
}

function pageText(name) {
  return text(parse5.parse(fs.readFileSync(path.join(root, name), 'utf8')));
}

function sectionText(chapter, title) {
  const section = chapter.sections.find(item => item.title.includes(title));
  assert.ok(section, `Section absente : ${title}`);
  return text(parse5.parseFragment(section.html));
}

function matchingQuestion(chapter, expression) {
  const question = chapter.questions.find(item => expression.test(item.q || item.stem));
  assert.ok(question, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(question.correct));
  assert.ok(question.correct >= 0 && question.correct < question.opts.length);
  return question;
}

function matchingCard(chapter, expression) {
  const card = chapter.flashcards.find(item => expression.test(item.q));
  assert.ok(card, `Carte absente : ${expression}`);
  return card;
}

function assemble(source) {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-architecture-lot2-'));
  try {
    const object = path.join(directory, 'probe.o');
    const binary = path.join(directory, 'probe.bin');
    const result = spawnSync('/usr/bin/as', ['--64', '-o', object, '-'], {
      input: `.intel_syntax noprefix\n.text\n${source}\n`, encoding: 'utf8', timeout: 5000,
      env: { ...process.env, LC_ALL: 'C' }
    });
    if (result.status !== 0) return { status: result.status, stderr: result.stderr };
    const copy = spawnSync('/usr/bin/objcopy', ['-O', 'binary', '--only-section=.text', object, binary], {
      encoding: 'utf8', timeout: 5000
    });
    assert.equal(copy.status, 0, copy.stderr);
    return { status: result.status, bytes: fs.readFileSync(binary).toString('hex') };
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
}

function signedFourBits(word) {
  return word < 8 ? word : word - 16;
}

test('F19 et F138 : unités décimales, binaires et débits cohérents dans les supports', () => {
  const chapter = architectureFirst[0];
  const lesson = sectionText(chapter, 'unités de mesure');
  const cards = pageText('b1-architecture/chapitres/cartes.html');
  const generated = pageText('b1-architecture/chapitres/chapitre1.html');
  const memoryCard = matchingCard(chapter, /1 Mio/);
  const speedCard = matchingCard(chapter, /Mo\/s et Mbps/);
  assert.match(lesson, /1 Kio = 1024 octets/);
  assert.match(lesson, /1 ko = 1000 octets/);
  assert.match(lesson, /1 Mo = 1000 ko/);
  assert.match(lesson, /1 Mo\/s = 8 Mbps/);
  assert.match(memoryCard.a, /1 Mio = 1024 Kio/);
  assert.match(memoryCard.a, /Mo, Go et To sont décimales/);
  assert.match(speedCard.a, /1 Mo\/s = 8 Mbps/);
  assert.ok(cards.includes(memoryCard.a));
  assert.ok(cards.includes(speedCard.a));
  assert.ok(generated.includes('1 Mo/s = 8 Mbps'));
  assert.equal(matchingQuestion(chapter, /1 Mio vaut/).opts[1], '1024 Kio');
  const speedQuestion = matchingQuestion(chapter, /80 Mbps/);
  assert.equal(speedQuestion.opts[speedQuestion.correct], '10 Mo/s');
  assert.equal(80 * 1000 * 1000 / 8, 10 * 1000 * 1000);
});

test('F141 : la retenue ne détermine ni le signe ni le débordement signé', () => {
  const chapter = architectureFirst[2];
  const lesson = sectionText(chapter, 'Opérations arithmétiques');
  const generated = pageText('b1-architecture/chapitres/chapitre3.html');
  const formulas = pageText('b1-architecture/chapitres/formules.html');
  const question = matchingQuestion(chapter, /addition déborde.*signés/i);
  assert.match(lesson, /1111\s*\+\s*1111\s*=\s*1\s+1110/);
  assert.match(lesson, /retenue.{0,80}(?:pas|sans) de débordement signé/is);
  assert.match(lesson, /0111\s*\+\s*0001\s*=\s*1000/);
  assert.match(lesson, /7\s*\+\s*1.{0,120}débordement signé/is);
  assert.match(generated, /1111\s*\+\s*1111\s*=\s*1\s+1110/);
  assert.match(formulas, /débordement signé/i);
  assert.match(question.opts[question.correct], /7\s*\+\s*1/);
  for (let first = 0; first < 16; first += 1) {
    for (let second = 0; second < 16; second += 1) {
      const result = (first + second) & 15;
      const mathematical = signedFourBits(first) + signedFourBits(second);
      const signsMatch = (first & 8) === (second & 8);
      const signChanged = (first & 8) !== (result & 8);
      assert.equal(signsMatch && signChanged, mathematical < -8 || mathematical > 7);
    }
  }
  assert.equal(signedFourBits((15 + 15) & 15), -2);
  assert.equal((15 + 15) >> 4, 1);
  assert.equal((7 + 1) >> 4, 0);
  assert.equal(signedFourBits((7 + 1) & 15), -8);
});

test('F144 : état séquentiel et horloge ne sont pas confondus', () => {
  const chapter = architectureSecond[1];
  const lesson = sectionText(chapter, 'bascules RS et D');
  const generated = pageText('b1-architecture/chapitres/chapitre5.html');
  const card = matchingCard(chapter, /Différence combinatoire/);
  const question = matchingQuestion(chapter, /Un circuit séquentiel dépend/);
  assert.match(lesson, /verrou RS.{0,150}sans horloge/is);
  assert.match(lesson, /bascule D.{0,200}front d'horloge/is);
  assert.match(card.a, /(?:peut|peuvent) être (?:synchrone|asynchrone)/i);
  assert.match(question.opts[question.correct], /état antérieur/);
  assert.match(question.exp, /(?:peut|peuvent) être (?:synchrone|asynchrone)/i);
  assert.match(generated, /verrou RS.{0,150}sans horloge/is);
});

test('F69 : les tailles et les effets des exemples XOR restent contextualisés', () => {
  const lesson = sectionText(assemblerFirst, 'Opérations logiques');
  const question = matchingQuestion(assemblerFirst, /XOR EAX, EAX/);
  const card = matchingCard(assemblerFirst, /XOR reg, reg/);
  const cards = pageText('assembleur/chapitres/cartes.html');
  assert.match(lesson, /XOR EAX, EAX.{0,100}2 octets/is);
  assert.match(lesson, /XOR RAX, RAX.{0,100}3 octets/is);
  assert.match(lesson, /drapeaux/i);
  assert.match(question.exp, /XOR EAX, EAX.{0,50}2 octets/i);
  assert.match(card.a, /taille.{0,80}registre/i);
  assert.ok(cards.includes(card.a));
  assert.doesNotMatch(JSON.stringify(assemblerFirst), /XOR reg, reg n’occupe que 2 octets|coût nul|moyen le plus rapide et compact/i);
});

test('F69 : encodages x86-64 assemblés localement', { skip: assemblerAvailable ? false : 'GNU as et objcopy requis' }, () => {
  assert.equal(assemble('xor eax, eax').bytes, '31c0');
  assert.equal(assemble('xor rax, rax').bytes, '4831c0');
  assert.equal(assemble('xor r8d, r8d').bytes, '4531c0');
  assert.equal(assemble('mov eax, 0').bytes, 'b800000000');
});

test('F74 : la restriction mémoire concerne MOV explicite et non toutes les instructions', () => {
  const lesson = sectionText(assemblerFifth, 'règle d’or');
  const question = matchingQuestion(assemblerFifth, /MOV \[eax\], \[ebx\]/);
  const card = matchingCard(assemblerFifth, /MOV \[eax\], \[ebx\]/);
  const generated = pageText('assembleur/chapitres/chapitre5.html');
  assert.match(lesson, /MOVSB.{0,150}(?:mémoire|octet)/is);
  assert.match(lesson, /MOV.{0,100}(?:deux opérandes mémoire explicites|mémoire à mémoire explicite)/is);
  assert.match(question.opts[question.correct], /MOV.{0,100}(?:deux|forme)/i);
  assert.match(question.exp, /MOVSB/i);
  assert.match(card.a, /MOVSB/i);
  assert.match(generated, /MOVSB/);
  assert.doesNotMatch(JSON.stringify(assemblerFifth), /au maximum un seul opérande mémoire par instruction|une instruction peut avoir au plus un seul opérande|jamais deux accès mémoire simultanés/i);
});

test('F74 : MOV mémoire-mémoire rejeté et MOVSB assemblé', { skip: assemblerAvailable ? false : 'GNU as et objcopy requis' }, () => {
  const direct = assemble('mov DWORD PTR [rax], DWORD PTR [rbx]');
  assert.notEqual(direct.status, 0);
  assert.match(direct.stderr, /operand type mismatch/i);
  assert.equal(assemble('movsb').bytes, 'a4');
});
