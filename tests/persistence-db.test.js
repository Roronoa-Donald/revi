'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const jwt = require('jsonwebtoken');

const ROOT = path.resolve(__dirname, '..');
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-lot3a-persistence';

const db = require('../server/db');
const { buildApp } = require('../server/app');
const budget = require('../server/services/execution/budget');
const execution = require('../server/services/execution');
const exercises = require('../server/exercises');
const gradingPolicy = require('../server/exercises/grading-policy');
const exerciseRoutes = require('../server/routes/exercises');

function makeAuthCookie(userId, extra = {}) {
  const token = jwt.sign({ userId, ...extra }, process.env.JWT_SECRET);
  return { auth_token: token };
}

// ============================================================================
// 1. Migration SQL 006_student_progress_and_exams.sql
// ============================================================================

test('Lot 3A (Migration 006) : le fichier SQL déclare les 5 tables et index requis de manière idempotente', () => {
  const migrationPath = path.join(ROOT, 'server/migrations/006_student_progress_and_exams.sql');
  assert.equal(fs.existsSync(migrationPath), true, '006_student_progress_and_exams.sql doit exister');

  const sql = fs.readFileSync(migrationPath, 'utf8');

  assert.match(sql, /CREATE TABLE IF NOT EXISTS user_chapter_progress/i);
  assert.match(sql, /PRIMARY KEY\s*\(\s*user_id\s*,\s*course_id\s*,\s*chapter_num\s*\)/i);

  assert.match(sql, /CREATE TABLE IF NOT EXISTS user_exercise_attempts/i);
  assert.match(sql, /PRIMARY KEY\s*\(\s*user_id\s*,\s*exercise_id\s*\)/i);
  assert.match(sql, /solution_revealed\s+BOOLEAN\s+DEFAULT\s+FALSE/i);

  assert.match(sql, /CREATE TABLE IF NOT EXISTS user_flashcard_leitner/i);
  assert.match(sql, /PRIMARY KEY\s*\(\s*user_id\s*,\s*course_id\s*,\s*card_hash\s*\)/i);

  assert.match(sql, /CREATE TABLE IF NOT EXISTS qcm_exam_sessions/i);
  assert.match(sql, /session_id\s+UUID\s+PRIMARY KEY/i);
  assert.match(sql, /payload_json\s+JSONB\s+NOT NULL/i);
  assert.match(sql, /ON\s+qcm_exam_sessions\s*\(\s*user_key\s*,\s*course_id\s*,\s*status\s*\)/i);

  assert.match(sql, /CREATE TABLE IF NOT EXISTS execution_quota_daily/i);
  assert.match(sql, /PRIMARY KEY\s*\(\s*quota_key\s*,\s*day_key\s*\)/i);
});

// ============================================================================
// 2. Helpers server/db.js (Repli mémoire + Exécution SQL quand pool actif)
// ============================================================================

test('Lot 3A (DB Helpers) : dégradation gracieuse en mémoire et exécution SQL paramétrée quand le runner PG est actif', async () => {
  assert.equal(typeof db.clearMemoryStoresForTest, 'function');
  assert.equal(typeof db.upsertChapterProgress, 'function');
  assert.equal(typeof db.upsertExerciseAttempt, 'function');
  assert.equal(typeof db.getExerciseAttempt, 'function');
  assert.equal(typeof db.upsertFlashcardLeitner, 'function');
  assert.equal(typeof db.getUserProgressSummary, 'function');
  assert.equal(typeof db.saveExamSession, 'function');
  assert.equal(typeof db.getExamSession, 'function');
  assert.equal(typeof db.findActiveExamSession, 'function');
  assert.equal(typeof db.updateExamSession, 'function');

  db.clearMemoryStoresForTest();

  // Mode sans PostgreSQL (pool null) : fonctionne en mémoire sans crasher
  const chRow = await db.upsertChapterProgress(42, 'b1-python', 2, true);
  assert.equal(chRow.user_id, 42);
  assert.equal(chRow.course_id, 'b1-python');
  assert.equal(chRow.chapter_num, 2);
  assert.equal(chRow.mastery_checked, true);

  const exRow1 = await db.upsertExerciseAttempt(42, 'py-c1-e1', {
    solved: false,
    incrementAttempts: true,
    bestPassed: 1,
    totalTests: 3,
    lastCode: 'print(1)'
  });
  assert.equal(exRow1.attempts_count, 1);
  assert.equal(exRow1.solved, false);
  assert.equal(exRow1.best_passed, 1);

  const exRow2 = await db.upsertExerciseAttempt(42, 'py-c1-e1', {
    solved: true,
    incrementAttempts: true,
    bestPassed: 3,
    totalTests: 3,
    lastCode: 'print(42)'
  });
  assert.equal(exRow2.attempts_count, 2);
  assert.equal(exRow2.solved, true);
  assert.equal(exRow2.best_passed, 3);

  // Vérification avec un runner SQL simulé (spy PostgreSQL)
  const executedSql = [];
  if (typeof db.setQueryRunnerForTest === 'function') {
    db.setQueryRunnerForTest(async (text, params) => {
      executedSql.push({ text: text.trim(), params });
      if (/INSERT INTO user_chapter_progress/i.test(text)) {
        return {
          rows: [{
            user_id: params[0],
            course_id: params[1],
            chapter_num: params[2],
            mastery_checked: params[3],
            updated_at: new Date().toISOString()
          }]
        };
      }
      return { rows: [] };
    });

    try {
      const pgRow = await db.upsertChapterProgress(77, 'b1-sql', 1, true);
      assert.equal(pgRow.user_id, 77);
      assert.equal(pgRow.course_id, 'b1-sql');
      assert.equal(executedSql.length, 1);
      assert.match(executedSql[0].text, /INSERT INTO user_chapter_progress/i);
      assert.deepEqual(executedSql[0].params.slice(0, 4), [77, 'b1-sql', 1, true]);
    } finally {
      db.setQueryRunnerForTest(null);
    }
  }
});

// ============================================================================
// 3. Sessions d'examen QCM persistées via db.js (survie redémarrage / anti-oracle)
// ============================================================================

test('Lot 3A (QCM Sessions DB) : cycle complet session examen via db.js (start -> anti-oracle -> submit -> review)', async () => {
  db.clearMemoryStoresForTest();
  const app1 = buildApp({ logger: false });
  const cookies = makeAuthCookie(501);

  const startRes = await app1.inject({
    method: 'POST',
    url: '/api/qcm/session/start',
    cookies,
    payload: { courseId: 'Cyber securite B2', chapter: 1, durationMinutes: 30 }
  });
  assert.equal(startRes.statusCode, 200);
  const { sessionId } = startRes.json();

  // Vérifie que la session est bien stockée dans db.js
  const persistedSession = await db.getExamSession(sessionId);
  assert.ok(persistedSession, 'La session QCM doit être persistée dans db.js');
  assert.equal(persistedSession.status, 'in_progress');
  assert.equal(persistedSession.courseId, 'Cyber securite B2');

  const activeSession = await db.findActiveExamSession('user:501', 'Cyber securite B2');
  assert.ok(activeSession);
  assert.equal(activeSession.sessionId, sessionId);

  await app1.close();

  // Simulation d'une nouvelle instance Fastify (redémarrage / autre lambda partageant la DB)
  const app2 = buildApp({ logger: false });

  // Anti-oracle actif sur la seconde instance sans passer sessionId
  const verifyRes = await app2.inject({
    method: 'POST',
    url: '/api/qcm/verify',
    cookies,
    payload: {
      courseId: 'Cyber securite B2',
      chapter: 1,
      questionIndex: 0,
      selectedOption: 0
    }
  });
  assert.equal(verifyRes.statusCode, 403);
  assert.match(verifyRes.json().error, /Oracle interdit/i);

  // Soumission sur la seconde instance
  const submitRes = await app2.inject({
    method: 'POST',
    url: '/api/qcm/submit',
    cookies,
    payload: {
      sessionId,
      answers: [{ index: 0, selected: 0 }]
    }
  });
  assert.equal(submitRes.statusCode, 200);
  assert.equal(submitRes.json().status, 'submitted');

  const afterSubmit = await db.getExamSession(sessionId);
  assert.equal(afterSubmit.status, 'submitted');
  assert.equal(await db.findActiveExamSession('user:501', 'Cyber securite B2'), null);

  await app2.close();
});

// ============================================================================
// 4. Persistance des essais d'exercices dans server/routes/exercises.js
// ============================================================================

test('Lot 3A (Exercices DB) : les tentatives et le déblocage du corrigé survivent au vidage du cache mémoire de la route', async t => {
  db.clearMemoryStoresForTest();
  budget.reset();
  exerciseRoutes._resetAttempts();

  const originalExecute = execution.execute;
  const originalIsSuspended = gradingPolicy.isGradingSuspended;
  gradingPolicy.isGradingSuspended = () => false;
  execution.execute = async () => ({
    ok: true,
    status: 'success',
    stdout: 'SORTIE_FAUSSE\n',
    stderr: '',
    compileError: '',
    exitCode: 0
  });

  const app = buildApp({ logger: false });
  t.after(async () => {
    await app.close();
    execution.execute = originalExecute;
    gradingPolicy.isGradingSuspended = originalIsSuspended;
    budget.reset();
    exerciseRoutes._resetAttempts();
    db.clearMemoryStoresForTest();
  });

  const allExercises = exercises.listExercises ? exercises.listExercises() : [];
  const sampleEx = exercises.getExercise('py-c1-e1') || allExercises[0];
  assert.ok(sampleEx, 'Au moins un exercice du catalogue doit exister');

  const cookies = makeAuthCookie(808);

  // 3 soumissions échouées par l'utilisateur 808
  for (let i = 0; i < 3; i++) {
    const res = await app.inject({
      method: 'POST',
      url: '/api/exercise/submit',
      cookies,
      payload: { exerciseId: sampleEx.id, code: `print(${i})` }
    });
    assert.equal(res.statusCode, 200);
  }

  // Vérifier la persistance dans db.js
  const dbAttempt = await db.getExerciseAttempt(808, sampleEx.id);
  assert.ok(dbAttempt, 'La tentative doit être enregistrée dans db.js');
  assert.equal(dbAttempt.attempts_count, 3);
  assert.equal(dbAttempt.solved, false);
  assert.equal(dbAttempt.last_code, 'print(2)');

  // Vider le cache mémoire local de server/routes/exercises.js (simule redémarrage serveur)
  exerciseRoutes._resetAttempts();

  // L'appel à /api/exercise/reveal doit relire l'état depuis db.js et autoriser le déblocage (200)
  const revealRes = await app.inject({
    method: 'POST',
    url: '/api/exercise/reveal',
    cookies,
    payload: { exerciseId: sampleEx.id }
  });
  assert.equal(revealRes.statusCode, 200);
  assert.ok(revealRes.json().solution.length > 0);

  const afterReveal = await db.getExerciseAttempt(808, sampleEx.id);
  assert.equal(afterReveal.solution_revealed, true);
});

// ============================================================================
// 5. Routes /api/progress/* (chapitre, flashcard Leitner, sync, résumé)
// ============================================================================

test('Lot 3A (API Progress) : GET /api/progress, POST chapter, POST flashcard (1j/3j/7j), POST sync', async t => {
  db.clearMemoryStoresForTest();
  const app = buildApp({ logger: false });
  t.after(async () => {
    await app.close();
    db.clearMemoryStoresForTest();
  });

  // Non authentifié -> 401
  const unauthRes = await app.inject({ method: 'GET', url: '/api/progress' });
  assert.equal(unauthRes.statusCode, 401);

  const cookies = makeAuthCookie(909);

  // 1) POST /api/progress/chapter
  const chRes = await app.inject({
    method: 'POST',
    url: '/api/progress/chapter',
    cookies,
    payload: { courseId: 'b1-python', chapterNum: 1, masteryChecked: true }
  });
  assert.equal(chRes.statusCode, 200);
  assert.equal(chRes.json().chapter.mastery_checked, true);

  // 2) POST /api/progress/flashcard (ratings: again -> 1j, good -> box 2 / 3j, easy -> box 3 / 7j)
  const now = Date.now();
  const fcAgain = await app.inject({
    method: 'POST',
    url: '/api/progress/flashcard',
    cookies,
    payload: { courseId: 'b1-python', cardHash: 'card-1', rating: 'again' }
  });
  assert.equal(fcAgain.statusCode, 200);
  assert.equal(fcAgain.json().flashcard.box, 1);
  const againDiffDays = (new Date(fcAgain.json().flashcard.next_review_at).getTime() - now) / (86400 * 1000);
  assert.ok(againDiffDays >= 0.9 && againDiffDays <= 1.1, `Attendu ~1j pour again, reçu ${againDiffDays}j`);

  const fcGood = await app.inject({
    method: 'POST',
    url: '/api/progress/flashcard',
    cookies,
    payload: { courseId: 'b1-python', cardHash: 'card-1', rating: 'good' }
  });
  assert.equal(fcGood.statusCode, 200);
  assert.equal(fcGood.json().flashcard.box, 2);
  const goodDiffDays = (new Date(fcGood.json().flashcard.next_review_at).getTime() - now) / (86400 * 1000);
  assert.ok(goodDiffDays >= 2.9 && goodDiffDays <= 3.1, `Attendu ~3j pour box 2, reçu ${goodDiffDays}j`);

  const fcEasy = await app.inject({
    method: 'POST',
    url: '/api/progress/flashcard',
    cookies,
    payload: { courseId: 'b1-python', cardHash: 'card-2', rating: 'easy' }
  });
  assert.equal(fcEasy.statusCode, 200);
  assert.equal(fcEasy.json().flashcard.box, 3);
  const easyDiffDays = (new Date(fcEasy.json().flashcard.next_review_at).getTime() - now) / (86400 * 1000);
  assert.ok(easyDiffDays >= 6.9 && easyDiffDays <= 7.1, `Attendu ~7j pour easy/box 3, reçu ${easyDiffDays}j`);

  // 3) POST /api/progress/sync (fusion paquet localStorage)
  const pastDue = new Date(Date.now() - 3600 * 1000).toISOString();
  const syncRes = await app.inject({
    method: 'POST',
    url: '/api/progress/sync',
    cookies,
    payload: {
      chapters: [
        { courseId: 'b1-python', chapterNum: 2, masteryChecked: true },
        { courseId: 'b1-sql', chapterNum: 1, masteryChecked: true }
      ],
      exercises: [
        { exerciseId: 'py-c1-e1', attemptsCount: 2, solved: true, bestPassed: 4, totalTests: 4, lastCode: 'print(1)' }
      ],
      flashcards: [
        { courseId: 'b1-python', cardHash: 'card-due', box: 1, nextReviewAt: pastDue }
      ]
    }
  });
  assert.equal(syncRes.statusCode, 200);
  const syncData = syncRes.json();
  assert.equal(syncData.ok, true);
  assert.equal(syncData.synced.chapters, 2);
  assert.equal(syncData.synced.exercises, 1);
  assert.equal(syncData.synced.flashcards, 1);

  // 4) GET /api/progress global et filtré par cours
  //    (le champ solved client dans /sync ne peut pas valider un exercice sans /exercise/submit)
  const getRes = await app.inject({
    method: 'GET',
    url: '/api/progress',
    cookies
  });
  assert.equal(getRes.statusCode, 200);
  const summary = getRes.json();
  assert.equal(summary.stats.masteredChaptersCount, 3);
  assert.equal(summary.stats.solvedExercisesCount, 0);
  assert.equal(summary.stats.dueFlashcardsCount, 1);
  assert.equal(summary.dueFlashcards[0].card_hash, 'card-due');

  const courseRes = await app.inject({
    method: 'GET',
    url: '/api/progress?course=b1-python',
    cookies
  });
  assert.equal(courseRes.statusCode, 200);
  assert.equal(courseRes.json().chapters.length, 2);
});

// ============================================================================
// 6. Quota journalier budget.js + execution_quota_daily et client progress-sync.js
// ============================================================================

test('Lot 3A (Quota DB & Client Sync) : budget.js synchronise avec execution_quota_daily et progress-sync.js est valide sans emoji', async () => {
  db.clearMemoryStoresForTest();
  budget.reset();

  const count1 = budget.consume('u:700', 2);
  assert.equal(count1, 2);
  assert.equal(budget.snapshot('u:700').used, 2);

  if (typeof budget.syncFromDb === 'function') {
    await budget.syncFromDb('u:700');
    assert.equal(budget.snapshot('u:700').used, 2);
  }

  const clientPath = path.join(ROOT, 'assets/js/progress-sync.js');
  assert.equal(fs.existsSync(clientPath), true, 'assets/js/progress-sync.js doit exister');
  const clientCode = fs.readFileSync(clientPath, 'utf8');

  assert.match(clientCode, /rd:chapter-mastery/);
  assert.match(clientCode, /rd:flashcard-review/);
  assert.match(clientCode, /rd:exercise-attempt/);
  assert.match(clientCode, /\/api\/progress/);

  const emojiRe = /[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/u;
  assert.equal(emojiRe.test(clientCode), false, 'progress-sync.js ne doit contenir aucun emoji');
});
