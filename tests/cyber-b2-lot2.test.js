'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const parse5 = require('parse5');
const chapter1 = require('../server/content/cyber-securite-b2/chapitre1');
const chapter2 = require('../server/content/cyber-securite-b2/chapitre2');
const assembledChapters = require('../server/content/cyber-securite-b2/chapitres-1-3');
const assembledExercises = require('../server/exercises/cyber-securite-b2');
const catalogue = require('../server/exercises');
const { runTests } = require('../server/exercises/runner');
const { runAnalyse } = require('../server/services/execution/local-runner');

const root = path.resolve(__dirname, '..');
const courseDirectory = 'Cyber securite B2';
const passwordExercise = require('../server/exercises/cyber-securite-b2/chapitre1')
  .find(exercise => exercise.id === 'cs2-c1-e3');
const hashExercise = require('../server/exercises/cyber-securite-b2/chapitre2')
  .find(exercise => exercise.id === 'cs2-c2-e2');

function descendants(node) {
  return [node, ...(node.childNodes || []).flatMap(descendants)];
}

function text(html) {
  return descendants(parse5.parseFragment(html))
    .filter(node => node.nodeName === '#text')
    .map(node => node.value).join(' ').replace(/\s+/g, ' ');
}

function page(filename) {
  return text(fs.readFileSync(path.join(root, courseDirectory, filename), 'utf8'));
}

function section(chapter, title) {
  const found = chapter.sections.find(item => title.test(item.title));
  assert.ok(found, `Section absente : ${title}`);
  return found;
}

function question(chapter, expression) {
  const found = chapter.questions.find(item => expression.test(item.stem || item.q));
  assert.ok(found, `Question absente : ${expression}`);
  assert.ok(Number.isInteger(found.correct) && found.correct >= 0 && found.correct < found.opts.length);
  return found;
}

function card(chapter, expression) {
  const found = chapter.flashcards.find(item => expression.test(item.q));
  assert.ok(found, `Carte absente : ${expression}`);
  return found;
}

function cases(exercise) {
  return [...exercise.starter.matchAll(/^# Données : (.*)$/gm)].map(match => match[1]);
}

function passwordOracle(input) {
  const [mode, password] = input.split(';');
  assert.ok(mode === 'seul' || mode === 'mfa', `Mode inconnu : ${mode}`);
  assert.equal(typeof password, 'string');
  const minimum = mode === 'seul' ? 15 : 8;
  if ([...password].length < minimum) return 'DECISION: REFUSE | MOTIF: longueur';
  if (['123456789012345', 'motdepassecommun'].includes(password)) return 'DECISION: REFUSE | MOTIF: liste_de_refus';
  return 'DECISION: ADMISSIBLE | MOTIF: aucun';
}

function hashOracle(input) {
  const [reference, message, expectedHash] = input.split(';');
  assert.ok(reference === 'fiable' || reference === 'non_fiable', `Référence inconnue : ${reference}`);
  assert.match(expectedHash, /^[\da-f]{64}$/i);
  const actualHash = crypto.createHash('sha256').update(message, 'utf8').digest('hex');
  const identical = actualHash === expectedHash.toLowerCase();
  const conclusion = reference === 'non_fiable'
    ? 'INTEGRITE_NON_ETABLIE'
    : identical ? 'AUCUNE_MODIFICATION_DETECTEE' : 'DIFFERENCE_DETECTEE';
  return `SHA256=${actualHash} | COMPARAISON=${identical ? 'IDENTIQUE' : 'DIFFERENTE'} | CONCLUSION=${conclusion}`;
}

async function verifyExercise(exercise, oracle) {
  const inputs = cases(exercise);
  assert.equal(inputs.length, exercise.tests.length);
  assert.ok(inputs.length >= 5 && inputs.length <= 7);
  assert.equal(oracle(exercise.examples[0].stdin), exercise.examples[0].expected);
  assert.equal((await runAnalyse(exercise.solution, 'cas:exemple')).data.stdout, exercise.examples[0].expected);
  for (const [index, item] of exercise.tests.entries()) {
    assert.equal(item.stdin, `cas:${index + 1}`);
    assert.equal(item.expected, oracle(inputs[index]), `Cas ${index + 1} : ${inputs[index]}`);
    const result = await runAnalyse(exercise.solution, item.stdin);
    assert.equal(result.data.stdout, item.expected, `Corrigé du cas ${index + 1}`);
  }
  const report = await runTests(exercise, exercise.solution, {
    execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout };
    }
  });
  assert.equal(report.passed, exercise.tests.length);
  assert.equal(report.stop, null);
}

test('F185 : le cours sépare NIST et ANSSI et décrit la politique NIST', () => {
  const lesson = section(chapter1, /Politique de sécurité des mots de passe/i);
  const body = text(lesson.html);
  assert.match(body, /NIST SP 800-63B-4/i);
  assert.match(body, /authentificateurs.{0,60}périmètre/i);
  assert.match(body, /15 caractères.{0,100}(?:seul|facteur unique)/i);
  assert.match(body, /8 caractères.{0,140}MFA/i);
  assert.match(body, /(?:aucune|pas de|sans).{0,40}(?:règle|exigence).{0,50}(?:composition|classes)/i);
  assert.match(body, /(?:liste de refus.{0,100}(?:entier|complet)|(?:entier|complet).{0,100}liste de refus)/i);
  assert.match(body, /(?:point|points) de code Unicode/i);
  assert.match(body, /(?:ANSSI|MonServiceSécurisé).{0,160}(?:distinct|autre|différent)/i);
  assert.match(lesson.html, /https:\/\/pages\.nist\.gov\/800-63-4\/sp800-63b\.html/);
  assert.match(lesson.html, /https:\/\/aide\.monservicesecurise\.cyber\.gouv\.fr\//);
  assert.match(body, /30\/10\/2026/);
});

test('F185 : QCM, cartes et mémento ne confondent pas conformité et robustesse', () => {
  const quiz = question(chapter1, /NIST SP 800-63B-4/i);
  assert.match(quiz.opts[quiz.correct], /15 caractères/i);
  assert.match(quiz.exp, /(?:aucune|sans|pas de).{0,40}(?:composition|classes)/i);
  assert.match(quiz.exp, /(?:ne prouve pas|ne démontre pas|ne garantit pas).{0,40}robustesse/i);
  const policy = card(chapter1, /NIST SP 800-63B-4/i);
  assert.match(policy.a, /15 caractères/i);
  assert.match(policy.a, /8 caractères/i);
  assert.match(policy.a, /(?:sans|pas de|aucune).{0,35}(?:composition|classes)/i);
  const entropy = card(chapter1, /entropie/i);
  assert.match(entropy.a, /indépend(?:ant|amment)/i);
  assert.match(entropy.a, /uniform/i);
  const memo = page('chapitres/formules.html');
  assert.match(memo, /indépend(?:ant|amment).{0,40}uniform/i);
  assert.doesNotMatch(memo, /Recommandation ≥ 80 bits/i);
  assert.match(page('chapitres/cartes.html'), /NIST SP 800-63B-4/);
});

test('F185 : frontières 15/8, Unicode, liste exacte et absence de classes', async () => {
  assert.match(passwordExercise.brief, /liste de refus/i);
  assert.match(passwordExercise.brief, /123456789012345/);
  assert.match(passwordExercise.brief, /motdepassecommun/);
  assert.doesNotMatch(passwordExercise.brief, /ROBUSTE/);
  const inputs = cases(passwordExercise);
  assert.ok(inputs.some(input => input.startsWith('seul;') && [...input.split(';')[1]].length === 14));
  assert.ok(inputs.some(input => input.startsWith('seul;') && [...input.split(';')[1]].length === 15));
  assert.ok(inputs.some(input => input.startsWith('mfa;') && [...input.split(';')[1]].length === 7));
  assert.ok(inputs.some(input => input.startsWith('mfa;') && [...input.split(';')[1]].length === 8));
  assert.ok(inputs.some(input => input.includes('𐐷')));
  assert.ok(inputs.some(input => input.split(';')[1] === '123456789012345'));
  assert.ok(inputs.some(input => input.split(';')[1].includes('123456789012345') && input.split(';')[1] !== '123456789012345'));
  await verifyExercise(passwordExercise, passwordOracle);
  const legacyAnswer = '[Cas 2]\nVULNERABLE (manque: chiffre, special)';
  const legacyReport = await runTests({ ...passwordExercise, tests: [passwordExercise.tests[1]] }, legacyAnswer, {
    execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout };
    }
  });
  assert.equal(legacyReport.passed, 0);
  assert.equal(legacyReport.stop.reason, 'wrong_output');
});

test('F194 : le cours distingue référence fiable, HMAC et signature', () => {
  const lesson = section(chapter2, /Hachage cryptographique.*HMAC/i);
  const body = text(lesson.html);
  assert.match(body, /(?:référence|empreinte).{0,60}(?:fiable|confiance)/i);
  assert.match(body, /(?:modifi|remplac).{0,80}(?:message|fichier).{0,100}(?:empreinte|hach)/i);
  assert.match(body, /HMAC.{0,100}clé secrète/i);
  assert.match(body, /signature.{0,120}clé publique/i);
  assert.match(body, /(?:infaisable|probabilité|risque|pratique)/i);
  assert.match(lesson.html, /https:\/\/csrc\.nist\.gov\/pubs\/fips\/180-4\/upd1\/final/);
  assert.match(lesson.html, /https:\/\/csrc\.nist\.gov\/pubs\/fips\/198-1\/final/);
  assert.match(lesson.html, /https:\/\/csrc\.nist\.gov\/pubs\/fips\/186-5\/final/);
  assert.match(body, /30\/10\/2026/);
  assert.doesNotMatch(body, /hachage.{0,40}garantit l’intégrité/i);
});

test('F194 : QCM, cartes et QCM autonome exigent une référence de confiance', () => {
  const quiz = question(chapter2, /empreinte.*(?:attaquant|adversaire)/i);
  assert.match(quiz.opts[quiz.correct], /(?:signature|HMAC|MAC)/i);
  assert.match(quiz.exp, /(?:référence|empreinte).{0,60}(?:fiable|authentifi|confiance)/i);
  const hashCard = card(chapter2, /Hachage cryptographique \(SHA-256\)/i);
  assert.match(hashCard.a, /(?:fiable|confiance)/i);
  assert.match(hashCard.a, /(?:HMAC|MAC)/i);
  assert.match(hashCard.a, /signature/i);
  const standalone = vm.runInNewContext(fs.readFileSync(path.join(root, courseDirectory, 'qcm-100.js'), 'utf8') + '\nCYB_QUESTIONS;');
  const standaloneHash = standalone.find(item => item.id === 41);
  assert.match(standaloneHash.o[standaloneHash.a], /(?:fiable|confiance|authentifi)/i);
  assert.match(standaloneHash.e, /(?:HMAC|MAC)/i);
  assert.match(standaloneHash.e, /signature/i);
  const standaloneSignature = standalone.find(item => item.id === 42);
  assert.match(standaloneSignature.q, /cle publique authentifiee/i);
  const chapter5 = require('../server/content/cyber-securite-b2/chapitre5');
  assert.match(question(chapter5, /Argon2id.*SHA-256/i).exp, /référence.{0,30}fiable/i);
  const signatureLesson = text(section(chapter2, /Signature numérique.*PKI/i).html);
  assert.match(signatureLesson, /clé publique authentifiée/i);
  assert.match(signatureLesson, /modèle arithmétique simplifié, non sûr/i);
  assert.match(card(chapter2, /certificat numérique X\.509/i).a, /chaîne de confiance/i);
  assert.match(page('chapitres/cartes.html'), /empreinte de confiance/i);
  assert.match(page('chapitres/chapitre5.html'), /empreinte de référence est fiable/i);
  assert.match(page('chapitres/examens.html'), /empreinte de référence authentifiée/i);
  assert.match(page('chapitres/formules.html'), /RSA-PSS/i);
});

test('F194 : comparaison SHA-256 et fiabilité sont évaluées indépendamment', async () => {
  assert.match(hashExercise.brief, /référence.{0,50}(?:fiable|authentifi)/i);
  assert.match(hashExercise.brief, /(?:HMAC|MAC)/i);
  assert.match(hashExercise.brief, /signature/i);
  assert.doesNotMatch(hashExercise.brief, /garantissent l’intégrité/i);
  const inputs = cases(hashExercise);
  assert.ok(inputs.some(input => input.startsWith('fiable;')));
  assert.ok(inputs.some(input => input.startsWith('non_fiable;') && hashOracle(input).includes('COMPARAISON=IDENTIQUE')));
  assert.ok(inputs.some(input => input.startsWith('non_fiable;') && hashOracle(input).includes('COMPARAISON=DIFFERENTE')));
  assert.ok(inputs.some(input => /;[\dA-F]{64}$/.test(input) && /[A-F]/.test(input.split(';')[2])));
  await verifyExercise(hashExercise, hashOracle);
  const falseConclusion = hashExercise.tests[3].expected.replace('INTEGRITE_NON_ETABLIE', 'AUCUNE_MODIFICATION_DETECTEE');
  const falseReport = await runTests({ ...hashExercise, tests: [hashExercise.tests[3]] }, `[Cas 4]\n${falseConclusion}`, {
    execute: async ({ code, stdin }) => {
      const result = await runAnalyse(code, stdin);
      return { ok: result.ok, stdout: result.data.stdout };
    }
  });
  assert.equal(falseReport.passed, 0);
  assert.equal(falseReport.stop.reason, 'wrong_output');
  const toySignature = assembledExercises.find(exercise => exercise.id === 'cs2-c2-e3');
  assert.match(toySignature.brief, /RSA jouet/i);
  assert.match(toySignature.brief, /sans établir l’intégrité ni l’identité/i);
  assert.match(toySignature.brief, /RSA-PSS.{0,80}authentifier la clé publique/i);
});

test('F194 : un hachage recalculé ne protège pas contre une modification', () => {
  const original = 'Transfert de 500 EUR';
  const modified = 'Transfert de 900 EUR';
  const sha256 = message => crypto.createHash('sha256').update(message).digest('hex');
  const attackerReference = sha256(modified);
  assert.equal(sha256(modified), attackerReference);
  assert.notEqual(sha256(original), attackerReference);
  const key = Buffer.from('cle-secrete-de-demonstration');
  const hmac = message => crypto.createHmac('sha256', key).update(message).digest('hex');
  assert.notEqual(hmac(original), hmac(modified));
  const { privateKey, publicKey } = crypto.generateKeyPairSync('ed25519');
  const signature = crypto.sign(null, Buffer.from(original), privateKey);
  assert.equal(crypto.verify(null, Buffer.from(original), publicKey, signature), true);
  assert.equal(crypto.verify(null, Buffer.from(modified), publicKey, signature), false);
});

test('F185/F194 : assemblages, projection publique et pages régénérées', () => {
  assert.equal(assembledChapters[0], chapter1);
  assert.equal(assembledChapters[1], chapter2);
  for (const exercise of [passwordExercise, hashExercise]) {
    assert.equal(assembledExercises.find(item => item.id === exercise.id), exercise);
    const registered = catalogue.getExercise(exercise.id);
    assert.equal(registered.brief, exercise.brief);
    assert.equal(registered.solution, exercise.solution);
    const published = catalogue.toClient(registered);
    assert.equal(published.brief, exercise.brief);
    assert.ok(!Object.hasOwn(published, 'tests'));
    assert.ok(!Object.hasOwn(published, 'solution'));
    assert.ok(published.examples.every(example => !Object.hasOwn(example, 'expected')));
    const html = fs.readFileSync(path.join(root, courseDirectory, `chapitres/chapitre${exercise.chapter}.html`), 'utf8');
    assert.ok(!html.includes(exercise.solution));
    assert.match(page(`chapitres/chapitre${exercise.chapter}.html`), new RegExp(exercise.id));
  }
  assert.match(page('chapitres/chapitre1.html'), /NIST SP 800-63B-4/);
  assert.match(page('chapitres/chapitre2.html'), /(?:référence|empreinte).{0,60}(?:fiable|confiance)/i);
});
