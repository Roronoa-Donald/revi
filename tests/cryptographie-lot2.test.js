'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const parse5 = require('parse5');
const chapters = [1, 5, 6].map(number => require(`../server/content/b3-cryptographie/chapitre${number}`));
const [foundations, certificates, protocols] = chapters;
const course = require('../server/content/b3-cryptographie');
const exercises = require('../server/exercises/b3-cryptographie');
const { getExercise, toClient } = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');
const root = path.resolve(__dirname, '..');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(node) {
  return descendants(node).filter(child => child.nodeName === '#text')
    .map(child => child.value).join(' ').replace(/\s+/g, ' ').trim();
}

function page(name) {
  return text(parse5.parse(fs.readFileSync(path.join(root, 'b3-cryptographie', name), 'utf8')));
}

function lesson(chapter, expression) {
  const section = chapter.sections.find(item => expression.test(item.title));
  assert.ok(section, `Section absente : ${expression}`);
  return text(parse5.parseFragment(section.html));
}

function card(chapter, expression) {
  const item = chapter.flashcards.find(candidate => expression.test(candidate.q));
  assert.ok(item, `Carte absente : ${expression}`);
  return item.a;
}

function question(chapter, expression) {
  const item = chapter.questions.find(candidate => expression.test(candidate.stem));
  assert.ok(item, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(item.correct) && item.correct >= 0 && item.correct < item.opts.length);
  return item;
}

function exercise(id) {
  const item = exercises.find(candidate => candidate.id === id);
  assert.ok(item, `Exercice absent : ${id}`);
  return item;
}

function cases(item) {
  const entries = [...item.starter.matchAll(/^\[Cas (\d+) — [^\n]+\]\n# Données : ([^\n]+)$/gm)];
  return new Map(entries.map(match => [`cas:${match[1]}`, match[2]]));
}

function fields(line) {
  return Object.fromEntries([...line.matchAll(/\b([a-z_]+)=([^\s]+)/g)].map(match => [match[1], match[2]]));
}

function checkOracle(item, oracle) {
  const inputs = cases(item);
  assert.equal(inputs.size, item.tests.length, `${item.id} : cas et tests divergent`);
  for (const entry of item.tests) {
    assert.ok(inputs.has(entry.stdin), `${item.id} : entrée absente pour ${entry.stdin}`);
    assert.equal(entry.expected, oracle(inputs.get(entry.stdin)), `${item.id} : ${entry.label}`);
  }
  for (const example of item.examples) {
    assert.equal(example.expected, oracle(example.stdin), `${item.id} : exemple`);
  }
}

async function grade(item, answer) {
  return runTests(item, answer, {
    maxTests: MAX_TESTS,
    execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout, stderr: result.data.stderr };
    }
  });
}

async function assertGrade(item, caseNumber, wrongAnswer) {
  assert.ok(item.tests.length <= MAX_TESTS, `${item.id} : cas hors limite de correction`);
  const accepted = await grade(item, item.solution);
  assert.equal(accepted.passed, item.tests.length, `${item.id} : corrigé incomplet`);
  assert.equal(accepted.stop, null);
  const altered = item.tests.map((entry, index) =>
    `[Cas ${index + 1}]\n${index + 1 === caseNumber ? wrongAnswer : entry.expected}`).join('\n\n');
  const rejected = await grade(item, altered);
  assert.equal(rejected.stop && rejected.stop.reason, 'wrong_output', `${item.id} : réponse incorrecte acceptée`);
  assert.equal(rejected.stop.testIndex, caseNumber - 1);
}

function dnsMatches(host, names) {
  const labels = host.toLowerCase().split('.');
  return names.toLowerCase().split(',').some(name => {
    const parts = name.split('.');
    if (parts[0] !== '*') return host.toLowerCase() === name;
    return labels.length === parts.length && labels[0].length > 0 && labels.slice(1).join('.') === parts.slice(1).join('.');
  });
}

function certificateOracle(line) {
  const value = fields(line);
  if (value.date < value.not_before) return 'STATUS=INVALID reason=NOT_YET_VALID';
  if (value.date > value.not_after) return 'STATUS=INVALID reason=CERTIFICATE_EXPIRED';
  if (!dnsMatches(value.fqdn, value.san)) return 'STATUS=INVALID reason=HOSTNAME_MISMATCH';
  return `STATUS=PARTIAL fqdn=${value.fqdn} valid_until=${value.not_after} ca=${value.is_ca} chain=NOT_CHECKED`;
}

function chainOracle(input) {
  const lines = input.split('\n');
  const header = fields(lines[0]);
  const chain = lines.slice(1).map(fields);
  const revoked = header.crl_revoked.split(',');
  for (const certificate of chain) {
    if (revoked.includes(certificate.serial)) {
      return `CHAIN: INVALID reason=REVOKED_CERTIFICATE serial=${certificate.serial} subject=${certificate.subject}`;
    }
  }
  for (let index = 0; index < chain.length - 1; index++) {
    if (chain[index].issuer !== chain[index + 1].subject) {
      return `CHAIN: INVALID reason=BROKEN_ISSUER_CHAIN at_cert=${chain[index].subject}`;
    }
    if (chain[index + 1].is_ca !== 'true') {
      return `CHAIN: INVALID reason=INTERMEDIATE_NOT_CA subject=${chain[index + 1].subject}`;
    }
  }
  const last = chain[chain.length - 1];
  if (last.issuer !== last.subject || last.subject !== header.trust_root) {
    return `CHAIN: INVALID reason=UNTRUSTED_ROOT root=${last.subject}`;
  }
  return `CHAIN: PARTIAL depth=${chain.length} root=${last.subject} leaf=${chain[0].subject} signatures=NOT_CHECKED`;
}

function vigenere(textValue, key, decrypt) {
  let index = 0;
  return [...textValue].map(character => {
    if (!/[A-Z]/.test(character)) return character;
    const plain = character.charCodeAt(0) - 65;
    const offset = key.charCodeAt(index++ % key.length) - 65;
    return String.fromCharCode(65 + (plain + (decrypt ? -offset : offset) + 26) % 26);
  }).join('');
}

function otpOracle(line) {
  const value = fields(line);
  if (line.startsWith('VIGENERE ')) {
    const input = line.split(' text=')[1];
    return `OUT: ${vigenere(input, value.key, line.startsWith('VIGENERE DEC '))}`;
  }
  if (Number(value.key_len) < Number(value.text_len)) return 'OTP: INVALID (key shorter than message)';
  if (value.reuse === 'true') return 'OTP: INVALID (key reused, vulnerable to two-time pad attack)';
  return 'OTP: CONDITIONS_NECESSAIRES_OK (perfect secrecy not verified)';
}

function hash(textValue) {
  return crypto.createHash('sha256').update(textValue, 'utf8').digest('hex');
}

function modPow(base, exponent, modulus) {
  let result = 1n;
  let factor = base % modulus;
  let remaining = exponent;
  while (remaining > 0n) {
    if (remaining % 2n === 1n) result = result * factor % modulus;
    factor = factor * factor % modulus;
    remaining /= 2n;
  }
  return result;
}

function rsaOracle(line) {
  const value = fields(line);
  const modulus = BigInt(value.n);
  const digest = BigInt(`0x${hash(value.text)}`) % modulus;
  if (line.startsWith('SIGN ')) {
    return `SIGN: n=${value.n} digest_mod=${digest} sig=${modPow(digest, BigInt(value.d), modulus)}`;
  }
  const signature = BigInt(value.sig);
  if (signature < 0n || signature >= modulus) return 'VERIFY: status=SIGNATURE_OUT_OF_RANGE';
  if (modPow(signature, BigInt(value.e), modulus) === digest) {
    return 'VERIFY: status=TOY_MATCH (no_security_guarantee)';
  }
  return 'VERIFY: status=TOY_MISMATCH';
}

function suiteOracle(line) {
  const value = fields(line);
  const suite = value.suite;
  if (!suite.includes('_WITH_')) {
    const tail = suite.slice(4);
    const separator = tail.lastIndexOf('_');
    const encryption = tail.slice(0, separator);
    const digest = tail.slice(separator + 1);
    const mode = value.mode || 'UNKNOWN';
    const group = value.group || 'UNKNOWN';
    const phase = value.phase || 'UNKNOWN';
    let pfs = 'UNKNOWN';
    if (mode !== 'UNKNOWN' && group !== 'UNKNOWN' && phase === '0-rtt') pfs = 'NOT_GUARANTEED';
    if (mode === 'psk_ke' && group === 'none' && phase === '1-rtt') pfs = 'NO';
    if (['dhe', 'psk_dhe_ke'].includes(mode) && group !== 'UNKNOWN' && group !== 'none' && phase === '1-rtt') pfs = 'CONDITIONAL';
    const status = pfs === 'UNKNOWN' ? 'PARAMETERS_REQUIRED' : 'PARAMETERS_ONLY';
    return `SUITE: ${suite} ver=TLS1.3 kex=${mode} group=${group} phase=${phase} enc=${encryption} hash=${digest} pfs=${pfs} status=${status}`;
  }
  const [keyExchange, algorithms] = suite.slice(4).split('_WITH_');
  const separator = algorithms.lastIndexOf('_');
  const encryption = algorithms.slice(0, separator);
  const digest = algorithms.slice(separator + 1);
  const pfs = /^(ECDHE|DHE)/.test(keyExchange) ? 'CONDITIONAL' : 'NO';
  const status = /RC4|3DES|DES|NULL|EXPORT/.test(encryption) ? 'INSECURE'
    : pfs === 'NO' ? 'WEAK_NO_PFS' : 'PARAMETERS_ONLY';
  return `SUITE: ${suite} ver=TLS1.2 kex=${keyExchange} enc=${encryption} hash=${digest} pfs=${pfs} status=${status}`;
}

function handshakeOracle(line) {
  const value = fields(line);
  if (value.server_version === 'TLSv1.2') {
    const pfs = value.mode === 'dhe' ? 'CONDITIONAL' : value.mode === 'rsa' ? 'NO' : 'UNKNOWN';
    return `TLS1.2: rtt=2-RTT pfs=${pfs} status=MODEL_ONLY`;
  }
  if (value.server_version !== 'TLSv1.3') return `STATUS=REJECTED (TLS version unsupported: ${value.server_version})`;
  if (value.mode !== 'psk_ke' && !['x25519', 'secp256r1', 'secp384r1'].includes(value.group)) {
    return `STATUS=REJECTED (unsupported elliptic group: ${value.group})`;
  }
  const pfs = value.phase === '0-rtt' ? 'NOT_GUARANTEED' : value.mode === 'psk_ke' ? 'NO' : 'CONDITIONAL';
  const identifier = hash(`${value.client_share}:${value.server_share}:${value.group}`).slice(0, 16);
  return `TLS1.3: phase=${value.phase} mode=${value.mode} group=${value.group} pfs=${pfs} demo_id=${identifier} status=MODEL_ONLY`;
}

test('F53 : les propriétés ESP dépendent de l’association de sécurité', () => {
  const body = lesson(protocols, /SSH.*IPsec/);
  assert.match(body, /ESP.{0,300}confidentialité seule.{0,120}intégrité seule.{0,120}(?:les deux|confidentialité et intégrité)/is);
  assert.match(body, /(?:association de sécurité|SA)/i);
  const answer = card(protocols, /différence fondamentale.*AH et ESP/i);
  assert.match(answer, /(?:selon|configuration)/i);
  assert.match(answer, /confidentialité seule/i);
  assert.match(answer, /intégrité seule/i);
  assert.match(question(protocols, /mode d.encapsulation.*tunnel VPN/i).exp, /ESP.{0,100}(?:selon|configuration)/i);
  assert.match(page('chapitres/cartes.html'), /ESP.{0,150}confidentialité seule.{0,150}intégrité seule/i);
  assert.match(page('chapitres/chapitre6.html'), /ESP.{0,200}confidentialité seule.{0,120}intégrité seule/i);
});

test('F184 : identité SAN et dates ne valident pas la chaîne', async () => {
  const item = exercise('cr3-c5-e2');
  assert.match(item.brief, /RFC 9525/i);
  assert.match(item.brief, /CN.{0,100}(?:ignoré|non utilisé|jamais)/is);
  assert.match(item.brief, /chaîne.{0,100}(?:non vérifi|non contrôl)/is);
  assert.match(item.brief, /san=-.{0,60}(?:absent|absence)/i);
  assert.match(item.starter, /fqdn=api\.cloud\.corp[^\n]*cn=api\.cloud\.corp san=-/);
  assert.ok(item.tests.length >= 7, 'Prévoir CN seul, wildcard multi-niveaux et domaine racine');
  checkOracle(item, certificateOracle);
  assert.equal(dnsMatches('WEB.CLOUD.CORP', '*.cloud.corp'), true);
  assert.equal(dnsMatches('cloud.corp', '*.cloud.corp'), false);
  assert.equal(dnsMatches('a.b.cloud.corp', '*.cloud.corp'), false);
  assert.equal(dnsMatches('cloud.corp.attacker.test', '*.cloud.corp'), false);
  assert.match(page('chapitres/formules.html'), /CN.{0,100}(?:non utilisé|ne sert pas|n.est pas)/i);
  await assertGrade(item, 2, 'STATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED');
  await assertGrade(item, 5, 'STATUS=PARTIAL fqdn=api.cloud.corp valid_until=2027-01-01 ca=false chain=NOT_CHECKED');
});

test('F184 : chaîne partielle, sans signature ni ancre vérifiée cryptographiquement', async () => {
  const item = exercise('cr3-c5-e3');
  assert.match(item.goal, /(?:partiel|limité)/i);
  assert.match(item.brief, /signatures.{0,80}(?:non vérifiées|non contrôlées)/is);
  assert.match(item.brief, /auto.émis/i);
  assert.match(item.brief, /diagnostics.{0,120}statut réel/is);
  assert.doesNotMatch(item.brief, /(?:doit être auto-signé|CHAIN: VALID)/i);
  const inputs = new Map([...item.starter.matchAll(/^\[Cas (\d+) — [^\n]+\]\n((?:# Données : [^\n]+\n)+)/gm)]
    .map(match => [`cas:${match[1]}`, match[2].trim().split('\n').map(line => line.slice('# Données : '.length)).join('\n')]));
  assert.equal(inputs.size, item.tests.length);
  assert.ok(item.tests.length >= 5, 'Prévoir une chaîne partielle et une autorité sans droit CA');
  for (const entry of item.tests) assert.equal(entry.expected, chainOracle(inputs.get(entry.stdin)), entry.label);
  for (const example of item.examples) assert.equal(example.expected, chainOracle(example.stdin));
  await assertGrade(item, 4, 'CHAIN: VALID depth=3 root=DigiTrust_Root_CA leaf=api.bank.com');
});

test('F186 : longueur et usage unique ne prouvent pas le secret parfait', async () => {
  const item = exercise('cr3-c1-e2');
  assert.match(item.brief, /uniformément aléatoire/i);
  assert.match(item.brief, /indépendante.{0,40}message/i);
  assert.match(item.brief, /secrète/i);
  assert.match(item.brief, /longueurs.{0,100}déclarées/i);
  assert.match(item.brief, /historique.{0,50}(?:vérifié|contrôlé)/i);
  assert.match(item.brief, /(?:ne vérifie pas|ne permettent pas).{0,120}confidentialité parfaite/is);
  checkOracle(item, otpOracle);
  const clear = Buffer.from('SECRET', 'utf8');
  const zeroKey = Buffer.alloc(clear.length);
  const encrypted = Buffer.from(clear.map((byte, index) => byte ^ zeroKey[index]));
  assert.deepEqual(encrypted, clear);
  const answer = card(foundations, /exigences.*masque jetable/i);
  assert.match(answer, /secrète/i);
  assert.match(answer, /uniformément aléatoire/i);
  assert.match(answer, /indépendante/i);
  const itemQuestion = question(foundations, /propriété supplémentaire.*masque jetable/i);
  assert.match(itemQuestion.opts[itemQuestion.correct], /secrète.{0,60}uniformément.{0,60}indépendante/i);
  assert.match(page('chapitres/formules.html'), /masque jetable.{0,180}indépendante/i);
  await assertGrade(item, 2, 'OTP: VALID (perfect secrecy achieved)');
});

test('F187 : les données 0-RTT et la dérivation TLS sont distinguées du calcul jouet', async () => {
  const item = exercise('cr3-c6-e2');
  assert.match(item.brief, /0-RTT.{0,150}(?:pas garantie|non garantie)/is);
  assert.match(item.brief, /HKDF/i);
  assert.match(item.brief, /(?:ne constitue pas|n.est pas).{0,70}secret/i);
  assert.match(item.title, /illustrati/i);
  assert.match(item.starter, /TLSv1\.2[^\n]+mode=rsa/);
  assert.ok(item.tests.some(entry => /unsupported elliptic group/.test(entry.expected)), 'Prévoir un groupe non pris en charge');
  assert.doesNotMatch(item.brief + item.solution, /master_secret|PERFECT_FORWARD_SECRECY/);
  assert.ok(item.tests.length >= 6, 'Prévoir 0-RTT, PSK seul et PSK avec échange éphémère');
  checkOracle(item, handshakeOracle);
  assert.equal(handshakeOracle('TLS_HANDSHAKE server_version=TLSv1.2 mode=dhe'), 'TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=MODEL_ONLY');
  assert.equal(handshakeOracle('TLS_HANDSHAKE server_version=TLSv1.2 mode=unknown'), 'TLS1.2: rtt=2-RTT pfs=UNKNOWN status=MODEL_ONLY');
  assert.equal(hash('A1B2:C3D4:x25519').slice(0, 16), 'f91a13a53fa8daae');
  assert.equal(hash('none:none:none').slice(0, 16), '882e45d0b744de68');
  assert.match(lesson(protocols, /Protocole TLS 1\.3/i), /0-RTT.{0,180}(?:pas garantie|non garantie)/is);
  assert.match(page('chapitres/chapitre6.html'), /Analyse illustrative des phases TLS 1\.3/i);
  assert.match(page('chapitres/examens.html'), /0-RTT.{0,220}(?:pas garantie|non garantie)/is);
  await assertGrade(item, 1, item.tests[0].expected.replace('pfs=NOT_GUARANTEED', 'pfs=PERFECT_FORWARD_SECRECY'));
  await assertGrade(item, 2, 'TLS1.2: rtt=2-RTT pfs=CONDITIONAL status=MODEL_ONLY');
  await assertGrade(item, 7, 'TLS1.3: phase=1-rtt mode=dhe group=legacy1024 pfs=CONDITIONAL demo_id=b5f4d36e0f1790d7 status=MODEL_ONLY');
});

test('F188 : une suite TLS 1.3 ne détermine ni le mode ni la PFS', async () => {
  const item = exercise('cr3-c6-e1');
  assert.match(item.brief, /n.{0,15}(?:détermine|indique).{0,80}(?:échange|PFS)/is);
  assert.match(item.brief, /psk_ke/i);
  assert.match(item.brief, /psk_dhe_ke/i);
  assert.match(item.brief, /mode=dhe/i);
  assert.match(item.brief, /(?:suppose|supposée).{0,40}TLS 1\.2.{0,100}version/i);
  assert.ok(item.tests.length >= 7, 'Prévoir suite seule, handshake initial, PSK seul et phases 0-RTT / 1-RTT');
  checkOracle(item, suiteOracle);
  assert.match(item.tests[0].expected, /kex=UNKNOWN.*pfs=UNKNOWN/);
  assert.ok(item.tests.some(entry => /kex=dhe group=x25519 phase=1-rtt.*pfs=CONDITIONAL/.test(entry.expected)));
  assert.match(suiteOracle('PARSE_SUITE suite=TLS_AES_256_GCM_SHA384 group=x25519 phase=1-rtt'), /kex=UNKNOWN.*pfs=UNKNOWN status=PARAMETERS_REQUIRED/);
  assert.match(lesson(protocols, /Suites Cryptographiques/i), /négoci.{0,80}(?:séparément|indépendamment)/i);
  assert.doesNotMatch(page('chapitres/examens.html'), /confidentialité persistante obligatoire/i);
  await assertGrade(item, 1, item.tests[0].expected.replace('pfs=UNKNOWN', 'pfs=YES'));
  await assertGrade(item, 7, item.tests[6].expected.replace('pfs=CONDITIONAL', 'pfs=YES'));
});

test('F193 : le RSA jouet ne prouve pas authenticité et intégrité', async () => {
  const item = exercise('cr3-c5-e1');
  assert.match(item.brief, /(?:jouet|pédagogique)/i);
  assert.match(item.brief, /(?:aucune|sans).{0,50}garantie.{0,30}sécurité/i);
  assert.match(item.brief, /RSA-PSS/i);
  assert.ok(item.tests.length >= 4, 'Le cas de collision doit être soumis à la grille');
  checkOracle(item, rsaOracle);
  const official = 'CONTRAT_OFFICIEL';
  const collision = 'CONTRAT_COLLISION_13147';
  assert.notEqual(hash(official), hash(collision));
  assert.equal(BigInt(`0x${hash(official)}`) % 3233n, 566n);
  assert.equal(BigInt(`0x${hash(collision)}`) % 3233n, 566n);
  assert.equal(modPow(566n, 2753n, 3233n), 1706n);
  assert.equal(modPow(1706n, 17n, 3233n), 566n);
  assert.match(lesson(certificates, /Signatures Numériques/i), /(?:jouet|pédagogique).{0,350}RSA-PSS/is);
  await assertGrade(item, 4, 'VERIFY: status=VALID_SIGNATURE (authentic & untampered)');
});

test('F195 : RFC 9846 actuelle et RFC 8446 historique sont datées', () => {
  assert.match(course.sources, /RFC 9846/i);
  const body = lesson(protocols, /Protocole TLS 1\.3/i);
  assert.match(body, /RFC 8446.{0,80}2018/i);
  assert.match(body, /RFC 9846.{0,80}2026/i);
  assert.match(body, /(?:remplace|rend obsolète)/i);
  assert.match(page('chapitres/chapitre6.html'), /RFC 9846/i);
  assert.match(page('chapitres/examens.html'), /RFC 9846/i);
});

test('Le catalogue cryptographie reste identique à ses six chapitres', () => {
  const split = Array.from({ length: 6 }, (_, index) => require(`../server/exercises/b3-cryptographie/chapitre${index + 1}`)).flat();
  assert.deepEqual(exercises, split);
});

test('Les 18 corrigés cryptographie passent tous leurs cas déclarés', async () => {
  assert.equal(exercises.length, 18);
  for (const item of exercises) {
    assert.ok(item.tests.length <= MAX_TESTS, `${item.id} : cas hors limite de correction`);
    const result = await grade(item, item.solution);
    assert.equal(result.passed, item.tests.length, `${item.id} : corrigé incomplet`);
    assert.equal(result.stop, null, `${item.id} : correction interrompue`);
  }
});

test('La projection et les pages cryptographie gardent les corrigés côté serveur', () => {
  for (const item of exercises) {
    const client = toClient(getExercise(item.id));
    assert.equal(client.solution, undefined, `${item.id} : corrigé exposé`);
    assert.equal(client.tests, undefined, `${item.id} : tests exposés`);
    assert.ok(client.examples.every(example => example.expected === undefined), `${item.id} : attendu d’exemple exposé`);
    const html = fs.readFileSync(path.join(root, 'b3-cryptographie', 'chapitres', `chapitre${item.chapter}.html`), 'utf8');
    const lab = descendants(parse5.parse(html)).find(node => (node.attrs || []).some(attribute =>
      attribute.name === 'data-exercise' && attribute.value === item.id));
    assert.ok(lab, `${item.id} : atelier absent`);
    const starter = descendants(lab).find(node => node.tagName === 'script' &&
      (node.attrs || []).some(attribute => attribute.name === 'data-lab-starter'));
    assert.ok(starter, `${item.id} : grille absente`);
    assert.equal((starter.childNodes || []).map(child => child.value || '').join(''), item.starter, `${item.id} : grille désynchronisée`);
    const sample = descendants(lab).find(node => (node.attrs || []).some(attribute =>
      attribute.name === 'class' && attribute.value.split(/\s+/).includes('lab__sample')));
    assert.ok(sample, `${item.id} : exemple absent`);
    assert.doesNotMatch(text(sample), /Sortie attendue/i, `${item.id} : sortie d’exemple exposée`);
    assert.ok(!html.includes(item.solution), `${item.id} : corrigé présent dans la page`);
  }
});
