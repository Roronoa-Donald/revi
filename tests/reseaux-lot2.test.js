'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const parse5 = require('parse5');
const networksEarly = require('../server/content/b1-reseaux/chapitres-1-3');
const networksLate = require('../server/content/b1-reseaux/chapitres-4-6');
const ccnaEarly = require('../server/content/b1-ccna1/chapitres-4-6');
const ccnaAdvanced = require('../server/content/ccna/chapitre2');
const exercises = require('../server/exercises/b1-reseaux');
const ccnaExercises = require('../server/exercises/b1-ccna1');

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

function checksum(bytes) {
  let sum = 0;
  for (let index = 0; index < bytes.length; index += 2) {
    sum += bytes.readUInt16BE(index);
    while (sum > 0xffff) sum = (sum & 0xffff) + (sum >>> 16);
  }
  return (~sum) & 0xffff;
}

test('F122 : le chiffrement existe aussi hors de la présentation OSI', () => {
  const chapter = networksEarly[2];
  const lesson = section(chapter, /sept couches/i);
  const item = question(chapter, /chiffrement.*(?:IPsec|présentation)/i);
  assert.match(lesson, /IPsec.{0,80}(?:réseau|IP)/i);
  assert.match(lesson, /(?:pas exclusif|autres couches|pas limité)/i);
  assert.match(item.opts[item.correct], /(?:IPsec|réseau)/i);
  assert.match(card(chapter, /couche 6/i), /IPsec/i);
  assert.doesNotMatch(page('b1-reseaux/chapitres/formules.html'), /il se fait en couche 6/i);
});

test('F123 : CSMA/CD concerne Ethernet half-duplex, pas full-duplex', () => {
  const chapter = networksLate[0];
  const lesson = section(chapter, /quatre couches/i);
  const item = question(chapter, /Ethernet.*full-duplex/i);
  assert.match(lesson, /half-duplex.{0,100}CSMA\/CD/is);
  assert.match(lesson, /full-duplex.{0,100}(?:sans|désactiv)/is);
  assert.match(item.opts[item.correct], /(?:sans.{0,40}(?:CSMA\/CD|collision)|collision.{0,40}désactiv)/i);
  assert.match(card(chapter, /CSMA\/CD/i), /full-duplex.{0,80}(?:sans|désactiv)/i);
});

test('F125 : /31 utilise les deux adresses sur une liaison IPv4 point-à-point', () => {
  const chapter = networksLate[2];
  const lesson = section(chapter, /VLSM et CIDR/i);
  const item = question(chapter, /\/31/i);
  const exercise = exercises.find(candidate => candidate.id === 're-c6-e1');
  assert.match(lesson, /\/31.{0,100}(?:point-à-point|point à point)/i);
  assert.match(lesson, /(?:deux|2).{0,35}adresses.{0,60}utilis/i);
  assert.match(item.opts[item.correct], /(?:deux|2).{0,35}adresses/i);
  assert.match(card(chapter, /Pourquoi 2\^k/i), /\/31/i);
  assert.match(exercise.brief, /(?:simulation|exercice).{0,130}\/31/is);
  assert.match(page('b1-reseaux/chapitres/formules.html'), /\/31.{0,100}(?:point-à-point|point à point)/i);
  const probe = spawnSync('python3', ['-c', 'import ipaddress; print(",".join(map(str, ipaddress.ip_network("192.0.2.0/31").hosts())))'], { encoding: 'utf8', timeout: 5000 });
  assert.equal(probe.status, 0, probe.stderr);
  assert.equal(probe.stdout.trim(), '192.0.2.0,192.0.2.1');
});

test('F126 : quatre bureaux de 30 hôtes peuvent partager un /24', () => {
  const chapter = networksLate[2];
  assert.match(chapter.situation, /(?:120|quatre fois 30).{0,100}254/i);
  assert.match(chapter.situation, /(?:isoler|isolation|séparer)/i);
  assert.equal(4 * 30 <= 254, true);
});

test('F12 : la carte CCNA distingue la formule usuelle de l’exception /31', () => {
  const answer = card(ccnaAdvanced, /nombre d’hôtes utiles/i);
  const item = question(ccnaAdvanced, /point-à-point.*RFC 3021/i);
  assert.match(answer, /\/31.{0,100}(?:point-à-point|point à point)/i);
  assert.match(item.opts[item.correct], /\/31/);
  assert.match(page('ccna/chapitres/cartes.html'), /\/31.{0,100}(?:point-à-point|point à point)/i);
});

test('F131 : TTL et somme de contrôle IPv4 changent lors du routage', () => {
  const chapter = ccnaEarly[0];
  const lesson = section(chapter, /sous-réseaux.*en-tête IP/i);
  const item = question(chapter, /Pendant le routage/i);
  assert.match(lesson, /TTL.{0,90}(?:diminu|décrément)/i);
  assert.match(lesson, /somme de contrôle.{0,80}(?:actualis|recalcul)/i);
  assert.match(item.opts[item.correct], /TTL.{0,80}(?:diminu|décrément)/i);
  assert.match(card(chapter, /change à chaque saut/i), /TTL/i);
  const before = Buffer.from('450000540001000040060000c0000201c6336402', 'hex');
  before.writeUInt16BE(checksum(before), 10);
  assert.equal(checksum(before), 0);
  const after = Buffer.from(before);
  after[8] -= 1;
  after.writeUInt16BE(0, 10);
  after.writeUInt16BE(checksum(after), 10);
  assert.equal(checksum(after), 0);
  assert.notEqual(before.readUInt16BE(10), after.readUInt16BE(10));
  assert.equal(after[8], 63);
});

test('F132 : l’en-tête IPv4 fait de 20 à 60 octets selon ses options', () => {
  const chapter = ccnaEarly[0];
  const lesson = section(chapter, /sous-réseaux.*en-tête IP/i);
  const item = question(chapter, /en-tête IPv4/i);
  assert.match(lesson, /20 octets.{0,60}(?:minimum|minimal)/i);
  assert.match(lesson, /60 octets/i);
  assert.match(item.opts[item.correct], /20.{0,15}60 octets/i);
});

test('F133 : partager un segment physique ne prouve pas le même sous-réseau IP', () => {
  const chapter = ccnaEarly[0];
  const lesson = section(chapter, /sous-réseaux.*en-tête IP/i);
  const item = question(chapter, /(?:même segment|sans routeur)/i);
  assert.match(lesson, /même segment.{0,120}(?:préfix|masque|sous-réseaux)/i);
  assert.match(lesson, /192\.0\.2\.1.{0,80}192\.0\.3\.1/i);
  assert.match(item.opts[item.correct], /(?:masque|préfix)/i);
  assert.match(card(chapter, /sous-réseaux/i), /(?:masque|préfix)/i);
  assert.doesNotMatch(page('b1-ccna1/chapitres/formules.html'), /PAS de routeur entre 2 adresses -> meme groupe/i);
});

test('F133 : les trois grilles calculent les réseaux selon ipaddress', () => {
  const exercise = ccnaExercises.find(candidate => candidate.id === 'cc-c4-e1');
  assert.ok(exercise);
  const blocks = exercise.starter.split(/\[Cas \d+ — [^\]]+\]/).slice(1);
  assert.equal(blocks.length, exercise.tests.length);
  const program = [
    'import ipaddress, json, sys',
    'records = json.load(sys.stdin)',
    'lines = []',
    'identical = 0',
    'for record in records:',
    '    name, first, second, prefix = record.split()',
    '    first_network = ipaddress.ip_network(first + prefix, strict=False)',
    '    second_network = ipaddress.ip_network(second + prefix, strict=False)',
    '    equal = first_network == second_network',
    '    identical += int(equal)',
    '    lines.append(name + (" : meme reseau" if equal else " : reseaux differents"))',
    'lines.append("identiques : " + str(identical) + "/" + str(len(records)))',
    'print("\\n".join(lines))'
  ].join('\n');
  const inputs = blocks.map(block => block.split('\n')
    .filter(line => line.startsWith('# Données : '))
    .map(line => line.slice('# Données : '.length)).slice(1));
  inputs.push(exercise.examples[0].stdin.trim().split('\n').slice(1));
  for (const [index, records] of inputs.entries()) {
    const result = spawnSync('python3', ['-c', program], {
      encoding: 'utf8', input: JSON.stringify(records), timeout: 5000
    });
    assert.equal(result.status, 0, result.stderr);
    const expected = index < exercise.tests.length ? exercise.tests[index].expected : exercise.examples[0].expected;
    assert.equal(result.stdout.trim(), expected);
  }
});
