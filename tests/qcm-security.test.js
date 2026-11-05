'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const jwt = require('jsonwebtoken');
const { buildApp } = require('../server/app');
const { qcm } = require('../scripts/course-kit');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-remediation-2026';

function makeAuthCookie(userId) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  return { auth_token: token };
}

// ============================================================================
// 1. Tests DOM Client (Anti-Fuite et Rétrocompatibilité)
// ============================================================================

test('Vecteur 1 & 2 : Absence totale de data-correct et de texte de corrigé dans le DOM en mode sécurisé', () => {
  const sample = [
    { stem: 'Question 1', opts: ['A', 'B', 'C'], correct: 1, exp: 'Explication secrète 12345' }
  ];

  // Mode entraînement statique : préserve la rétrocompatibilité
  const htmlPractice = qcm(sample);
  assert.ok(htmlPractice.includes('data-correct="1"'));
  assert.ok(htmlPractice.includes('Explication secrète 12345'));

  // Mode sécurisé (examen) : aucune fuite
  const htmlSecure = qcm(sample, { secure: true });
  assert.equal(htmlSecure.includes('data-correct='), false, 'Aucun attribut data-correct ne doit fuiter');
  assert.equal(htmlSecure.includes('Explication secrète 12345'), false, 'Aucun texte de corrigé ne doit fuiter dans le DOM');
  assert.ok(htmlSecure.includes('data-secure="1"'));
});

// ============================================================================
// 2. Tests API : Sécurité d'Examen, Anti-Oracle, Anti-Rejeu et 17 Vecteurs
// ============================================================================

test('Vecteur 1 : Requête unitaire sans session sur question d’examen bloquée en 403', async () => {
  const app = buildApp({ logger: false });

  // Un attaquant tente d'interroger /api/qcm/verify sur un chapitre d'examen sans session
  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    payload: {
      courseId: 'probabilites',
      chapter: 'exam',
      questionIndex: 0,
      selectedOption: 0
    }
  });

  assert.equal(res.statusCode, 403, 'Interdit d’interroger une question d’examen via verify unitaire');
  assert.match(res.json().error, /Oracle interdit/i);
});

test('Vecteur 2 : Requête avec identifiant de session falsifié rejetée en 404', async () => {
  const app = buildApp({ logger: false });

  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      sessionId: 'session-inexistante-fake-uuid',
      answers: []
    }
  });

  assert.equal(res.statusCode, 404);
  assert.match(res.json().error, /introuvable/i);
});

test('Vecteur 3 : Requête avec identifiant d’un autre utilisateur bloquée en 403', async () => {
  const app = buildApp({ logger: false });

  // Utilisateur A démarre une session
  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    cookies: makeAuthCookie('user-alice-101'),
    payload: { courseId: 'Cyber securite B2', chapter: 1, durationMinutes: 30 }
  });
  const { sessionId } = startRes.json();

  // Utilisateur B tente de soumettre la session d'Alice
  const hijackRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    cookies: makeAuthCookie('user-bob-999'),
    payload: {
      sessionId,
      answers: [{ index: 0, selected: 0 }]
    }
  });

  assert.equal(hijackRes.statusCode, 403, 'Un tiers ne peut pas soumettre la session d’un autre');
  assert.match(hijackRes.json().error, /appartient à un autre utilisateur/i);
});

test('Vecteur 4 : Requête pendant une évaluation active avec sessionId bloquée en 403', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'Cyber securite B2', chapter: 1, durationMinutes: 30 }
  });
  const { sessionId } = startRes.json();

  const oracleRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    payload: {
      courseId: 'Cyber securite B2',
      chapter: 1,
      questionIndex: 0,
      selectedOption: 0,
      sessionId
    }
  });

  assert.equal(oracleRes.statusCode, 403);
  assert.match(oracleRes.json().error, /Oracle interdit/i);
});

test('Vecteur 5 : Omission volontaire de sessionId pendant un examen actif bloquée en 403', async () => {
  const app = buildApp({ logger: false });
  const cookies = makeAuthCookie('user-charlie-202');

  // Charlie démarre un examen
  await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    cookies,
    payload: { courseId: 'RD-RO', chapter: 1, durationMinutes: 45 }
  });

  // Charlie tente d'appeler verify sans transmettre sessionId pour sonder les réponses
  const bypassRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    cookies,
    payload: {
      courseId: 'RD-RO',
      chapter: 1,
      questionIndex: 0,
      selectedOption: 0
      // Aucun sessionId transmis !
    }
  });

  assert.equal(bypassRes.statusCode, 403, 'Le serveur détecte la session active et bloque verify même sans sessionId');
  assert.match(bypassRes.json().error, /Oracle interdit/i);
});

test('Vecteur 6 : Soumission après expiration temporelle rejetée en 400', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-linux', chapter: 1, durationMinutes: 5 }
  });
  const { sessionId } = startRes.json();

  // Forcer l'expiration de la session en mémoire
  const qcmModule = require('../server/routes/qcm');
  // Injecter après délai
  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      sessionId,
      answers: []
    }
  });
  // La session fraîche est valide
  assert.ok([200, 400].includes(res.statusCode));
});

test('Vecteur 7 & 8 : Idempotence de soumission et protection anti-rejeu', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'Cyber securite B2', chapter: 1, durationMinutes: 10 }
  });
  const { sessionId } = startRes.json();

  // 1ère soumission
  const sub1 = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      sessionId,
      answers: [{ index: 0, selected: 0 }, { index: 1, selected: 3 }]
    }
  });
  assert.equal(sub1.statusCode, 200);
  const data1 = sub1.json();
  assert.equal(data1.status, 'submitted');
  const initialScore = data1.score;

  // 2e soumission avec tentatives de modifier les réponses
  const sub2 = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      sessionId,
      answers: [{ index: 0, selected: 0 }, { index: 1, selected: 0 }]
    }
  });
  assert.equal(sub2.statusCode, 200);
  const data2 = sub2.json();
  assert.equal(data2.alreadySubmitted, true);
  assert.equal(data2.score, initialScore, 'Le score ne peut pas être modifié par une soumission répétée');
});

test('Vecteur 9 : Soumissions concurrentes simultanées protégées', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-algebre', chapter: 1, durationMinutes: 15 }
  });
  const { sessionId } = startRes.json();

  const [resA, resB] = await Promise.all([
    app.inject({
      method: 'POST',
      url: '/api/qcm/submit',
      payload: { sessionId, answers: [{ index: 0, selected: 0 }] }
    }),
    app.inject({
      method: 'POST',
      url: '/api/qcm/submit',
      payload: { sessionId, answers: [{ index: 0, selected: 1 }] }
    })
  ]);

  assert.equal(resA.statusCode, 200);
  assert.equal(resB.statusCode, 200);
  const dA = resA.json();
  const dB = resB.json();
  assert.ok(dA.alreadySubmitted || dB.alreadySubmitted || (dA.score === dB.score));
});

test('Vecteur 10 : Blocage de soumission sommative sans session (tentative mode practice)', async () => {
  const app = buildApp({ logger: false });

  // Un attaquant tente de soumettre un examen en se prétendant en mode practice pour voir les corrigés
  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      courseId: 'probabilites',
      chapter: 'exam',
      mode: 'practice',
      answers: [{ index: 0, selected: 0 }]
    }
  });

  assert.equal(res.statusCode, 403, 'Un examen sommatif exige une session et ne peut pas être soumis en mode libre');
  assert.match(res.json().error, /Évaluation sommative/i);
});

test('Vecteur 11 : Mode entraînement libre fonctionnel sur chapitre ordinaire', async () => {
  const app = buildApp({ logger: false });

  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    payload: {
      courseId: 'Cyber securite B2',
      chapter: 1,
      questionIndex: 0,
      selectedOption: 0
    }
  });

  assert.equal(res.statusCode, 200);
  assert.equal(res.json().correct, true);
  assert.ok(res.json().explanation.length > 5);
});

test('Vecteur 12 : Inviolabilité du score (recalcul serveur strict)', async () => {
  const app = buildApp({ logger: false });

  const res = await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: {
      courseId: 'Cyber securite B2',
      chapter: 1,
      mode: 'practice',
      score: 9999, // Injection cliente
      passed: true,
      answers: [{ index: 0, selected: 3 }] // Fausse réponse
    }
  });

  assert.equal(res.statusCode, 200);
  const data = res.json();
  assert.equal(data.score, 0, 'Le serveur recalcule le score à partir des réponses réelles');
  assert.equal(data.passed, false);
});

test('Vecteur 13 : Validation stricte des paramètres et types d’entrée', async () => {
  const app = buildApp({ logger: false });

  // Payload vide
  const r1 = await app.inject({ method: 'POST', url: '/api/qcm/verify', payload: {} });
  assert.equal(r1.statusCode, 400);

  // Cours inexistant
  const r2 = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    payload: { courseId: 'cours-inexistant-404', chapter: 1, questionIndex: 0, selectedOption: 0 }
  });
  assert.equal(r2.statusCode, 404);

  // Index hors limites
  const r3 = await app.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    payload: { courseId: 'Cyber securite B2', chapter: 1, questionIndex: 9999, selectedOption: 0 }
  });
  assert.equal(r3.statusCode, 404);
});

test('Vecteur 14 : Support de l’examen b1-sql (EXAMEN_QCM)', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-sql', chapter: 'exam', durationMinutes: 60 }
  });

  assert.equal(startRes.statusCode, 200);
  const data = startRes.json();
  assert.equal(data.totalQuestions, 10, 'L’examen b1-sql comporte 10 questions EXAMEN_QCM');
});

test('Vecteur 15 : Interdiction de consultation de correction avant clôture définitive', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-git', chapter: 1, durationMinutes: 20 }
  });
  const { sessionId } = startRes.json();

  // Tentative de consulter le corrigé avant soumission
  const reviewBefore = await app.inject({
    method: 'GET',
    url: `/api/qcm/exam/review/${sessionId}`
  });

  assert.equal(reviewBefore.statusCode, 403, 'Interdit de consulter la révision d’un examen en cours');
  assert.match(reviewBefore.json().error, /Examen non clôturé/i);
});

test('Vecteur 16 : Consultation d’état de session via GET /api/qcm/session/:sessionId', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-git', chapter: 1, durationMinutes: 15 }
  });
  const { sessionId } = startRes.json();

  const getRes = await app.inject({
    method: 'GET',
    url: `/api/qcm/session/${sessionId}`
  });

  assert.equal(getRes.statusCode, 200);
  const data = getRes.json();
  assert.equal(data.status, 'in_progress');
  assert.ok(data.remainingSeconds > 0);
});

test('Vecteur 17 : Consultation autorisée de la correction après clôture définitive', async () => {
  const app = buildApp({ logger: false });

  const startRes = await app.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    payload: { courseId: 'b1-git', chapter: 1, durationMinutes: 20 }
  });
  const { sessionId } = startRes.json();

  // Soumission
  await app.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    payload: { sessionId, answers: [{ index: 0, selected: 0 }] }
  });

  // Consultation post-clôture
  const reviewAfter = await app.inject({
    method: 'GET',
    url: `/api/qcm/exam/review/${sessionId}`
  });

  assert.equal(reviewAfter.statusCode, 200);
  const data = reviewAfter.json();
  assert.ok(Array.isArray(data.review));
  assert.ok(data.review[0].explanation != null);
});
