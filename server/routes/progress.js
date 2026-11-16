/**
 * server/routes/progress.js
 *
 * Persistance et synchronisation de la progression étudiant (Lot 3A) :
 * - GET /api/progress (?course=...)
 * - POST /api/progress/chapter
 * - POST /api/progress/flashcard
 * - POST /api/progress/sync
 */
'use strict';

const db = require('../db');
const { requireUser } = require('../utils/auth');

const VALID_RATINGS = new Set(['again', 'hard', 'good', 'easy']);

function resolveUserId(user) {
  if (!user) return null;
  return user.userId != null ? user.userId : user.id;
}

async function progressRoutes(fastify) {
  // ==========================================================================
  // 1. Résumé de progression (portail global ou filtré par cours)
  // ==========================================================================
  fastify.get('/progress', async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const userId = resolveUserId(user);
    const courseId = request.query && typeof request.query.course === 'string' && request.query.course.trim()
      ? request.query.course.trim()
      : null;

    const summary = await db.getUserProgressSummary(userId, courseId);
    return reply.send(summary);
  });

  // ==========================================================================
  // 2. Mise à jour de la maîtrise d'un chapitre
  // ==========================================================================
  fastify.post('/progress/chapter', async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const userId = resolveUserId(user);
    const body = request.body || {};
    const courseId = typeof body.courseId === 'string' ? body.courseId.trim() : '';
    const chapterNum = Number(body.chapterNum);
    const masteryChecked = body.masteryChecked !== undefined ? Boolean(body.masteryChecked) : true;

    if (!courseId) {
      return reply.code(400).send({ error: 'Identifiant de cours (courseId) requis.' });
    }
    if (!Number.isInteger(chapterNum) || chapterNum < 1 || chapterNum > 50) {
      return reply.code(400).send({ error: 'Numéro de chapitre (chapterNum) invalide.' });
    }

    const chapter = await db.upsertChapterProgress(userId, courseId, chapterNum, masteryChecked);
    return reply.send({ ok: true, chapter });
  });

  // ==========================================================================
  // 3. Révision d'une flashcard Leitner (1j / 3j / 7j)
  // ==========================================================================
  fastify.post('/progress/flashcard', async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const userId = resolveUserId(user);
    const body = request.body || {};
    const courseId = typeof body.courseId === 'string' ? body.courseId.trim() : '';
    const cardHash = typeof body.cardHash === 'string' ? body.cardHash.trim() : '';
    const rating = typeof body.rating === 'string' ? body.rating.trim().toLowerCase() : 'good';

    if (!courseId) {
      return reply.code(400).send({ error: 'Identifiant de cours (courseId) requis.' });
    }
    if (!cardHash) {
      return reply.code(400).send({ error: 'Identifiant de carte (cardHash) requis.' });
    }
    if (!VALID_RATINGS.has(rating)) {
      return reply.code(400).send({ error: 'Évaluation (rating) invalide : again, hard, good ou easy attendu.' });
    }

    const flashcard = await db.upsertFlashcardLeitner(userId, courseId, cardHash, { rating });
    return reply.send({ ok: true, flashcard });
  });

  // ==========================================================================
  // 4. Synchronisation initiale d'un paquet localStorage à la connexion
  // ==========================================================================
  fastify.post('/progress/sync', async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const userId = resolveUserId(user);
    const body = request.body || {};
    let syncedChapters = 0;
    let syncedExercises = 0;
    let syncedFlashcards = 0;
    let syncedExams = 0;

    // A) Chapitres (tableau ou dictionnaire par cours)
    const rawChapters = body.chapters;
    if (Array.isArray(rawChapters)) {
      for (const item of rawChapters) {
        if (!item || typeof item !== 'object') continue;
        const courseId = String(item.courseId || item.course || '').trim();
        const chapterNum = Number(item.chapterNum != null ? item.chapterNum : item.chapter);
        const masteryChecked = item.masteryChecked !== undefined
          ? Boolean(item.masteryChecked)
          : Boolean(item.done !== undefined ? item.done : true);
        if (courseId && Number.isInteger(chapterNum) && chapterNum >= 1 && chapterNum <= 50) {
          await db.upsertChapterProgress(userId, courseId, chapterNum, masteryChecked);
          syncedChapters += 1;
        }
      }
    } else if (rawChapters && typeof rawChapters === 'object') {
      for (const [courseId, courseMap] of Object.entries(rawChapters)) {
        if (!courseMap || typeof courseMap !== 'object') continue;
        for (const [chKey, chVal] of Object.entries(courseMap)) {
          const numMatch = String(chKey).match(/(\d+)/);
          const chapterNum = numMatch ? parseInt(numMatch[1], 10) : NaN;
          const done = typeof chVal === 'object' && chVal !== null ? Boolean(chVal.done) : Boolean(chVal);
          if (courseId && Number.isInteger(chapterNum) && chapterNum >= 1 && done) {
            await db.upsertChapterProgress(userId, courseId, chapterNum, true);
            syncedChapters += 1;
          }
        }
      }
    }

    // B) Essais d'exercices : seul le brouillon lastCode peut provenir du client.
    //    solved, bestPassed, attemptsCount et solutionRevealed sont strictement contrôlés
    //    par le serveur (/api/exercise/submit et /api/exercise/reveal).
    const rawExercises = body.exercises || body.attempts;
    if (Array.isArray(rawExercises)) {
      for (const item of rawExercises) {
        if (!item || typeof item !== 'object') continue;
        const exerciseId = String(item.exerciseId || item.id || '').trim();
        if (!exerciseId) continue;
        const draftCode = item.lastCode !== undefined ? item.lastCode : item.last_code;
        await db.upsertExerciseAttempt(userId, exerciseId, {
          incrementAttempts: false,
          attemptsCount: 0,
          solved: false,
          bestPassed: 0,
          totalTests: 0,
          lastCode: draftCode,
          solutionRevealed: false
        });
        syncedExercises += 1;
      }
    } else if (rawExercises && typeof rawExercises === 'object') {
      for (const [exerciseId, item] of Object.entries(rawExercises)) {
        if (!exerciseId || !item || typeof item !== 'object') continue;
        const draftCode = item.lastCode !== undefined ? item.lastCode : item.last_code;
        await db.upsertExerciseAttempt(userId, exerciseId, {
          incrementAttempts: false,
          attemptsCount: 0,
          solved: false,
          bestPassed: 0,
          totalTests: 0,
          lastCode: draftCode,
          solutionRevealed: false
        });
        syncedExercises += 1;
      }
    }

    // C) Cartes Leitner (tableau ou dictionnaire)
    const rawFlashcards = body.flashcards || body.leitner;
    if (Array.isArray(rawFlashcards)) {
      for (const item of rawFlashcards) {
        if (!item || typeof item !== 'object') continue;
        const courseId = String(item.courseId || item.course || '').trim();
        const cardHash = String(item.cardHash || item.card_hash || '').trim();
        if (!courseId || !cardHash) continue;
        await db.upsertFlashcardLeitner(userId, courseId, cardHash, {
          rating: item.rating && VALID_RATINGS.has(String(item.rating).toLowerCase())
            ? String(item.rating).toLowerCase()
            : null,
          box: item.box,
          nextReviewAt: item.nextReviewAt || item.next_review_at
        });
        syncedFlashcards += 1;
      }
    } else if (rawFlashcards && typeof rawFlashcards === 'object') {
      for (const [courseId, cardsMap] of Object.entries(rawFlashcards)) {
        if (!cardsMap || typeof cardsMap !== 'object') continue;
        for (const [cardHash, item] of Object.entries(cardsMap)) {
          if (!courseId || !cardHash || !item || typeof item !== 'object') continue;
          await db.upsertFlashcardLeitner(userId, courseId, cardHash, {
            rating: item.rating && VALID_RATINGS.has(String(item.rating).toLowerCase())
              ? String(item.rating).toLowerCase()
              : null,
            box: item.box,
            nextReviewAt: item.nextReviewAt || item.next_review_at
          });
          syncedFlashcards += 1;
        }
      }
    }

    // D) Examens locaux (stockés à part dans user_practice_exams, jamais dans qcm_exam_sessions)
    const rawExams = body.exams;
    if (Array.isArray(rawExams)) {
      for (const item of rawExams) {
        if (!item || typeof item !== 'object') continue;
        const courseId = String(item.courseId || item.course || '').trim();
        if (!courseId) continue;
        const examKey = String(item.clientExamKey || item.client_exam_key || item.key || 'default').trim();
        await db.upsertPracticeExam(userId, courseId, examKey, {
          score: item.score,
          total: item.total,
          passed: item.passed,
          completedAt: item.completedAt || item.updatedAt
        });
        syncedExams += 1;
      }
    } else if (rawExams && typeof rawExams === 'object') {
      for (const [courseId, item] of Object.entries(rawExams)) {
        if (!courseId || !item || typeof item !== 'object') continue;
        const examKey = String(item.clientExamKey || item.client_exam_key || 'default').trim();
        await db.upsertPracticeExam(userId, courseId, examKey, {
          score: item.score,
          total: item.total,
          passed: item.passed,
          completedAt: item.completedAt || item.updatedAt
        });
        syncedExams += 1;
      }
    }

    const progress = await db.getUserProgressSummary(userId);
    return reply.send({
      ok: true,
      synced: {
        chapters: syncedChapters,
        exercises: syncedExercises,
        flashcards: syncedFlashcards,
        exams: syncedExams
      },
      progress
    });
  });
}

module.exports = progressRoutes;
