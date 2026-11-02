'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const parse5 = require('parse5');
const chapter = require('../server/content/b3-pfsense/chapitre5');
const { getExercise, toClient } = require('../server/exercises');
const { runTests, MAX_TESTS } = require('../server/exercises/runner');
const execution = require('../server/services/execution');

const courseDir = path.join(__dirname, '../b3-pfsense/chapitres');

function documentFor(name) {
  return parse5.parse(fs.readFileSync(path.join(courseDir, name), 'utf8'));
}

function walk(node) {
  return [node, ...(node.childNodes || []).flatMap(walk)];
}

function text(node) {
  return node.nodeName === '#text' ? node.value : (node.childNodes || []).map(text).join('');
}

function attr(node, name) {
  return (node.attrs || []).find(attribute => attribute.name === name)?.value;
}

function classHas(node, name) {
  return (attr(node, 'class') || '').split(/\s+/).includes(name);
}

function getLab(document, id) {
  const lab = walk(document).find(node => node.tagName === 'div' && attr(node, 'id') === id);
  assert.ok(lab, `${id} : atelier absent de la page`);
  return lab;
}

function gridCases(exercise) {
  const cases = [];
  let current = null;
  for (const line of exercise.starter.split('\n')) {
    const header = /^\[Cas (\d+) — (.+)\]$/.exec(line);
    if (header) {
      current = { number: Number(header[1]), label: header[2], lines: [], placeholders: 0 };
      cases.push(current);
    } else if (current && line.startsWith('# Données : ')) {
      current.lines.push(line.slice('# Données : '.length));
    } else if (current && line === 'A_COMPLETER') {
      current.placeholders++;
    }
  }
  for (const [index, entry] of cases.entries()) {
    assert.equal(entry.number, index + 1, `${exercise.id} : numéro de cas incohérent`);
    assert.ok(entry.lines.length, `${exercise.id} : données absentes`);
    assert.equal(entry.placeholders, 1, `${exercise.id} : zone de réponse incohérente`);
  }
  return cases;
}

function fixtures(exercise) {
  const cases = gridCases(exercise);
  assert.equal(cases.length, exercise.tests.length);
  assert.ok(cases.length <= MAX_TESTS);
  const tests = exercise.tests.map((entry, index) => {
    assert.equal(entry.stdin, `cas:${index + 1}`);
    assert.equal(entry.label, cases[index].label);
    return { input: cases[index].lines.join('\n'), expected: entry.expected };
  });
  return [...exercise.examples.map(example => ({ input: example.stdin, expected: example.expected })), ...tests];
}

function record(line) {
  const [type, ...pairs] = line.split(' ');
  const fields = {};
  for (const pair of pairs) {
    const match = /^([^=]+)=(\S+)$/.exec(pair);
    assert.ok(match, `Champ non reconnu : ${pair}`);
    assert.equal(fields[match[1]], undefined, `Champ répété : ${match[1]}`);
    fields[match[1]] = match[2];
  }
  return { type, ...fields };
}

function pkiAnswer(input, bypass = '') {
  let authority;
  let revocationList;
  let currentTime;
  const certificates = [];
  for (const line of input.split('\n')) {
    const item = record(line);
    if (item.type === 'CA') authority = item;
    else if (item.type === 'CRL') revocationList = item;
    else if (item.type === 'TIMESTAMP') currentTime = Number(item.current);
    else if (item.type === 'CERT') certificates.push(item);
    else assert.fail(`Entrée non reconnue : ${line}`);
  }
  assert.ok(authority && revocationList && Number.isFinite(currentTime));
  assert.ok(['YES', 'NO'].includes(revocationList.selected));
  assert.ok(['CURRENT', 'STALE', 'MISSING'].includes(revocationList.state));
  const revoked = revocationList.revoked === 'NONE' ? [] : revocationList.revoked.split(',');
  return certificates.map(certificate => {
    let status = 'REJECTED';
    let reason;
    const ignoredSelection = bypass === 'selection' && revocationList.selected === 'NO';
    if (certificate.issuer !== authority.cn) reason = 'UNTRUSTED_ISSUER';
    else if (currentTime < Number(certificate.valid_from)) reason = 'NOT_YET_VALID';
    else if (currentTime > Number(certificate.valid_to)) reason = 'EXPIRED_CERTIFICATE';
    else if (certificate.algo === 'DSA') reason = 'INSECURE_ALGORITHM';
    else if (certificate.algo === 'RSA' && Number(certificate.key_len) < 2048) reason = 'WEAK_KEY_LENGTH';
    else if (revocationList.selected === 'NO' && !ignoredSelection) {
      status = 'INDETERMINATE';
      reason = 'CRL_NOT_CONFIGURED';
    } else if (revocationList.state === 'MISSING' && !ignoredSelection && bypass !== 'missing') {
      status = 'INDETERMINATE';
      reason = 'CRL_UNAVAILABLE';
    } else if (revocationList.state === 'STALE' && bypass !== 'stale') {
      status = 'INDETERMINATE';
      reason = 'CRL_STALE';
    } else if (revoked.includes(certificate.serial)) reason = 'REVOKED_CERTIFICATE';
    else {
      status = 'ACCEPTED';
      reason = 'VALID_CREDENTIALS';
    }
    return `OPENVPN_PKI id=${certificate.id} status=${status} reason=${reason} client=${certificate.cn} serial=${certificate.serial}`;
  }).join('\n');
}

function ikeAnswer(input, policy = 'explicit') {
  return input.split('\n').map(line => {
    const proposal = record(line);
    assert.equal(proposal.type, 'IKE_PROPOSAL');
    assert.ok(['1', '2'].includes(proposal.phase));
    const group = Number(proposal.dh_group);
    const keyLength = Number(proposal.key_len);
    let status = 'REJECTED';
    let reason;
    let level = 'NONE';
    if (['DES', '3DES', 'RC4'].includes(proposal.enc)) reason = 'INSECURE_CIPHER';
    else if (['MD5', 'SHA1'].includes(proposal.hash)) reason = 'WEAK_HASH';
    else if (policy === 'numeric' ? group < 14 : [1, 2, 5, 22, 23, 24].includes(group)) reason = 'WEAK_DH_GROUP';
    else if (policy === 'explicit' && ![14, 19, 20].includes(group)) reason = 'NOT_IN_POLICY_GROUP';
    else if (['AES-CBC', 'AES-GCM'].includes(proposal.enc) && keyLength < 128) reason = 'WEAK_KEY_LENGTH';
    else {
      status = 'APPROVED';
      reason = 'NONE';
      level = (policy === 'numeric' ? group >= 19 : [19, 20].includes(group)) && keyLength >= 256
        ? 'HIGH' : 'STANDARD';
    }
    return `IPSEC_AUDIT id=${proposal.id} phase=${proposal.phase} status=${status} reason=${reason} level=${level}`;
  }).join('\n');
}

function submission(exercise, answer) {
  return [
    '[Exemple]',
    exercise.examples[0].expected,
    ...gridCases(exercise).flatMap(entry => [
      `[Cas ${entry.number} — ${entry.label}]`,
      answer(entry.lines.join('\n'))
    ])
  ].join('\n');
}

async function evaluate(exercise, answer) {
  return runTests(exercise, answer, { execute: payload => execution.execute(payload) });
}

function renderedQuestion(document, stem) {
  const question = walk(document).find(node => classHas(node, 'q') &&
    walk(node).some(child => classHas(child, 'q__stem') && text(child) === stem));
  assert.ok(question, `Question absente : ${stem}`);
  const correct = walk(question).filter(node => node.tagName === 'button' && attr(node, 'data-correct') === '1');
  assert.equal(correct.length, 1, `Nombre de bonnes réponses incohérent : ${stem}`);
  return text(correct[0]);
}

test('F181/F217 : sources datées, limites et supports générés cohérents', () => {
  const document = documentFor('chapitre5.html');
  const body = text(document).replace(/\s+/g, ' ');
  const links = walk(document).filter(node => node.tagName === 'a').map(node => attr(node, 'href'));
  for (const url of [
    'https://www.iana.org/assignments/ikev2-parameters/ikev2-parameters.xhtml',
    'https://www.rfc-editor.org/rfc/rfc8247.html#section-2.4',
    'https://www.rfc-editor.org/rfc/rfc9395.html',
    'https://www.rfc-editor.org/rfc/rfc5280.html#section-3.3',
    'https://docs.netgate.com/pfsense/en/latest/vpn/ipsec/configure-p1.html',
    'https://docs.netgate.com/pfsense/en/latest/vpn/openvpn/configure-server-crypto.html',
    'https://docs.netgate.com/pfsense/en/latest/certificates/crl.html',
    'https://openvpn.net/community-docs/community-articles/openvpn-2-6-manual/'
  ]) assert.ok(links.includes(url), `Source absente : ${url}`);
  assert.match(body, /30 octobre 2026/);
  assert.match(body, /28 octobre 2026/);
  assert.match(body, /groupe 22 est un groupe MODP 1024 bits déprécié/i);
  assert.match(body, /identifiants IANA ne sont pas ordonnés par force/i);
  assert.match(body, /premier Child SA utilise le groupe de la phase 1/i);
  assert.match(body, /Peer Certificate Revocation List.*facultatif/i);
  assert.match(body, /CRL pertinente manquante.*connexion se poursuivre/i);
  assert.match(body, /session déjà établie.*déconnecter séparément/i);
  assert.match(body, /certificat de test révoqué.*certificat non révoqué/i);
  assert.doesNotMatch(body, /invalider immédiatement un certificat|révoquer instantanément|groupes DH supérieurs ou égaux à 14/i);

  const formula = text(documentFor('formules.html')).replace(/\s+/g, ' ');
  assert.match(formula, /22 \(MODP 1024 bits déprécié\)/i);
  assert.match(formula, /numéros IANA ne classent pas la force/i);
  const exam = text(documentFor('examens.html')).replace(/\s+/g, ' ');
  assert.match(exam, /CRL est facultative/i);
  assert.match(exam, /session compromise déjà établie/i);
  assert.match(exam, /certificat révoqué et un témoin non révoqué/i);
});

test('F181/F217 : QCM et bonnes réponses rendus sans ambiguïté', () => {
  const document = documentFor('chapitre5.html');
  const groupQuestion = chapter.questions.find(item => item.stem.includes('association d’identifiants IKEv2'));
  const crlQuestion = chapter.questions.find(item => item.stem.includes('CRL peut-elle bloquer'));
  assert.ok(groupQuestion && crlQuestion);
  assert.match(groupQuestion.opts[groupQuestion.correct], /14.*MODP 2048.*19.*P-256.*22.*MODP 1024.*déprécié/i);
  assert.match(crlQuestion.opts[crlQuestion.correct], /à jour et sélectionnée.*effectivement lue.*numéro/i);
  assert.match(crlQuestion.exp, /facultative.*publication peut prendre du temps/i);
  assert.equal(renderedQuestion(document, groupQuestion.stem), groupQuestion.opts[groupQuestion.correct]);
  assert.equal(renderedQuestion(document, crlQuestion.stem), crlQuestion.opts[crlQuestion.correct]);
});

test('pf3-c5-e1/e2 : énoncés, grilles et projection navigateur restent cohérents', () => {
  const document = documentFor('chapitre5.html');
  for (const id of ['pf3-c5-e1', 'pf3-c5-e2']) {
    const exercise = getExercise(id);
    const lab = getLab(document, id);
    const errors = [];
    const source = parse5.parseFragment(exercise.brief, { onParseError: error => errors.push(error) });
    assert.deepEqual(errors, [], `${id} : HTML de l’énoncé invalide`);
    const rendered = walk(lab).find(node => classHas(node, 'lab__brief'));
    assert.ok(rendered);
    assert.equal(text(rendered).replace(/\s+/g, ' ').trim(), text(source).replace(/\s+/g, ' ').trim());
    const starter = walk(lab).find(node => node.tagName === 'script' && attr(node, 'data-lab-starter') !== undefined);
    assert.ok(starter);
    assert.equal(text(starter), exercise.starter);
    assert.equal(toClient(exercise).solution, undefined);
    assert.equal(toClient(exercise).tests, undefined);
    const client = JSON.stringify(toClient(exercise));
    for (const entry of exercise.tests) {
      for (const line of entry.expected.split('\n')) {
        assert.ok(!text(lab).includes(line), `${id} : réponse cachée présente dans la page`);
        assert.ok(!client.includes(line), `${id} : réponse cachée présente dans la projection`);
      }
    }
  }
  assert.match(getExercise('pf3-c5-e1').brief, /INDETERMINATE.*non un refus réel/i);
  assert.match(getExercise('pf3-c5-e1').brief, /ne prouve pas qu'une CRL absente ou obsolète est vide/i);
  assert.match(getExercise('pf3-c5-e2').brief, /politique pédagogique version 2026-10-30/i);
  assert.match(getExercise('pf3-c5-e2').brief, /phase 2 sans PFS est hors de ce modèle/i);
});

test('pf3-c5-e1 : exemples, six cas CRL et corrigé suivent le modèle', async () => {
  const exercise = getExercise('pf3-c5-e1');
  assert.equal(exercise.tests.length, 6);
  for (const fixture of fixtures(exercise)) assert.equal(pkiAnswer(fixture.input), fixture.expected);
  const example = await execution.execute({ language: 'analyse', code: exercise.solution, stdin: exercise.examples[0].stdin });
  assert.equal(example.stdout, exercise.examples[0].expected);
  const report = await evaluate(exercise, exercise.solution);
  assert.equal(report.ok, true);
  assert.equal(report.passed, exercise.tests.length);
  assert.equal(report.stop, null);
});

test('pf3-c5-e1 : traiter une CRL absente ou obsolète comme vide est rejeté', async () => {
  const exercise = getExercise('pf3-c5-e1');
  for (const variant of [
    { bypass: 'selection', case: 'cas:4', id: 'NO_CRL' },
    { bypass: 'stale', case: 'cas:5', id: 'STALE_CRL' },
    { bypass: 'missing', case: 'cas:6', id: 'MISSING_CRL' }
  ]) {
    const answer = submission(exercise, input => pkiAnswer(input, variant.bypass));
    const report = await evaluate(exercise, answer);
    assert.equal(report.ok, true, variant.bypass);
    assert.equal(report.stop?.reason, 'wrong_output', variant.bypass);
    assert.equal(report.stop?.input, variant.case, variant.bypass);
    assert.match(report.stop?.actual || '', new RegExp(`id=${variant.id} status=ACCEPTED`));
  }
});

test('pf3-c5-e2 : groupes, seuils, exemples et corrigé suivent la politique explicite', async () => {
  const exercise = getExercise('pf3-c5-e2');
  assert.equal(exercise.tests.length, 4);
  for (const fixture of fixtures(exercise)) assert.equal(ikeAnswer(fixture.input), fixture.expected);
  const example = await execution.execute({ language: 'analyse', code: exercise.solution, stdin: exercise.examples[0].stdin });
  assert.equal(example.stdout, exercise.examples[0].expected);
  const report = await evaluate(exercise, exercise.solution);
  assert.equal(report.ok, true);
  assert.equal(report.passed, exercise.tests.length);
  assert.equal(report.stop, null);
});

test('pf3-c5-e2 : le classement numérique et les groupes non prévus sont rejetés', async () => {
  const exercise = getExercise('pf3-c5-e2');
  for (const variant of [
    { policy: 'numeric', case: 'cas:1', id: 'WEAK_DH22' },
    { policy: 'unlisted-allowed', case: 'cas:2', id: 'GROUP31' }
  ]) {
    const answer = submission(exercise, input => ikeAnswer(input, variant.policy));
    const report = await evaluate(exercise, answer);
    assert.equal(report.ok, true, variant.policy);
    assert.equal(report.stop?.reason, 'wrong_output', variant.policy);
    assert.equal(report.stop?.input, variant.case, variant.policy);
    assert.match(report.stop?.actual || '', new RegExp(`id=${variant.id}.*status=APPROVED`));
  }
});
