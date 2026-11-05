/**
 * server/routes/qcm.js
 *
 * Architecture d'évaluation QCM sécurisée pour revi-cours-html.
 *
 * Principes de sécurité et de conformité métrologique :
 * 1. Zéro fuite dans le DOM client (aucun attribut data-correct ni corrigé en mode examen).
 * 2. Séparation étanche entre entraînement formatif et examen sommatif :
 *    - L'absence de sessionId ne permet JAMAIS de basculer une épreuve d'examen en entraînement libre.
 *    - Les questions d'examens ne sont JAMAIS vérifiables unitairement par /verify (HTTP 403 permanent).
 *    - Si un utilisateur a une session d'examen active sur un cours, /verify est totalement verrouillé (anti-oracle).
 * 3. Défense Anti-Oracle : interdiction de sonder les propositions une à une.
 * 4. Défense Anti-Rejeu et Idempotence : une session soumise est figée et renvoie son score sans recalcul.
 * 5. Isolation utilisateur : une session appartient à son créateur et ne peut être soumise par un tiers.
 * 6. Expiration temporelle stricte côté serveur avec tolérance réseau de 30 secondes.
 */
'use strict';

const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { COURSES } = require('../courses');
const { getUser, quotaKey } = require('../utils/auth');

// Caches en mémoire
const chapterCache = new Map();
const examQuestionCache = new Map();

// Stockage des sessions d'examen sommatif : Map<sessionId, sessionObject>
const examSessions = new Map();

// Index des sessions d'examen actives par utilisateur/IP et cours : Map<`${userKey}:${courseId}`, sessionId>
const activeExamByUserCourse = new Map();

function getCourseDirs(courseId) {
  return [
    courseId,
    courseId.replace(/\s+/g, '-').toLowerCase(),
    courseId.replace(/\s+/g, '-'),
    courseId.toLowerCase(),
    courseId.replace(/_/g, '-')
  ];
}

function getClientUserKey(req) {
  const user = getUser(req);
  if (user && user.userId) return `user:${user.userId}`;
  return `ip:${req.ip || 'unknown'}`;
}

function isExamChapter(chapter) {
  return chapter === 'exam' || chapter === 'examen' || chapter === 'simulateur' || Number(chapter) === 0;
}

function loadCourseChapters(courseId) {
  if (chapterCache.has(courseId)) {
    return chapterCache.get(courseId);
  }
  if (!Object.prototype.hasOwnProperty.call(COURSES, courseId)) {
    return null;
  }

  const contentDir = path.resolve(__dirname, '..', 'content');
  const possibleDirs = getCourseDirs(courseId);

  for (const d of possibleDirs) {
    const dirPath = path.join(contentDir, d);
    if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
      const p1 = path.join(dirPath, 'chapitres-1-3.js');
      const p2 = path.join(dirPath, 'chapitres-4-6.js');
      if (fs.existsSync(p1) && fs.existsSync(p2)) {
        try {
          const chapters = [...require(p1), ...require(p2)];
          chapterCache.set(courseId, chapters);
          return chapters;
        } catch {
          return null;
        }
      }
      const individual = [];
      let i = 1;
      while (fs.existsSync(path.join(dirPath, `chapitre${i}.js`))) {
        try {
          individual.push(require(path.join(dirPath, `chapitre${i}.js`)));
        } catch {
          return null;
        }
        i++;
      }
      if (individual.length > 0) {
        chapterCache.set(courseId, individual);
        return individual;
      }
    }
  }
  return null;
}

function loadCourseExamQuestions(courseId) {
  if (examQuestionCache.has(courseId)) {
    return examQuestionCache.get(courseId);
  }
  if (!Object.prototype.hasOwnProperty.call(COURSES, courseId)) {
    return null;
  }

  const contentDir = path.resolve(__dirname, '..', 'content');
  const possibleDirs = getCourseDirs(courseId);

  for (const d of possibleDirs) {
    const dir = path.join(contentDir, d);
    if (!fs.existsSync(dir) || !fs.statSync(dir).isDirectory()) continue;
    const candidates = [
      path.join(dir, 'pages.js'),
      path.join(dir, 'pages', 'examens-exercices.js')
    ];
    for (const c of candidates) {
      if (fs.existsSync(c)) {
        const txt = fs.readFileSync(c, 'utf8');
        // Supporte const mastery = [ ... ] et const EXAMEN_QCM = [ ... ]
        const match = txt.match(/const (?:mastery|EXAMEN_QCM)\s*=\s*\[([\s\S]*?)\];/);
        if (match) {
          const re = /\{\s*(?:stem|q)\s*:\s*['"`](.*?)['"`]\s*,\s*(?:opts|choices|options)\s*:\s*\[(.*?)\]\s*,\s*(?:correct|answer)\s*:\s*(\d+)/g;
          const items = [];
          let item;
          while ((item = re.exec(match[1])) !== null) {
            const opts = Array.from(item[2].matchAll(/['"`](.*?)['"`]/g)).map(x => x[1]);
            const expMatch = match[1].slice(item.index).match(/exp\s*:\s*['"`](.*?)['"`]/);
            items.push({
              stem: item[1],
              opts,
              correct: parseInt(item[3], 10),
              exp: expMatch ? expMatch[1] : ''
            });
          }
          if (items.length > 0) {
            examQuestionCache.set(courseId, items);
            return items;
          }
        }
      }
    }
  }
  return null;
}

function resolveQuestions(courseId, chapter) {
  if (isExamChapter(chapter)) {
    return loadCourseExamQuestions(courseId);
  }
  const chapters = loadCourseChapters(courseId);
  if (!chapters) return null;
  const num = Number(chapter);
  const chap = chapters.find(c => Number(c.n) === num) || chapters[num - 1];
  if (!chap) return null;
  const quiz = chap.questions || chap.quiz || [];
  return Array.isArray(quiz) ? quiz : null;
}

async function qcmRoutes(fastify) {
  // ==========================================================================
  // 1. Démarrer une session d'examen sommatif sécurisé
  // ==========================================================================
  const startExamHandler = async (req, reply) => {
    const { courseId, chapter, durationMinutes = 60, userId } = req.body || {};

    if (!courseId || typeof courseId !== 'string') {
      return reply.code(400).send({ error: 'Identifiant de cours invalide ou manquant' });
    }
    if (chapter == null) {
      return reply.code(400).send({ error: 'Numéro de chapitre ou mention examen manquant' });
    }

    const questions = resolveQuestions(courseId, chapter);
    if (!questions || questions.length === 0) {
      return reply.code(404).send({ error: 'Évaluation non trouvée ou sans questions QCM' });
    }

    const sessionId = crypto.randomUUID();
    const duration = Math.min(Math.max(Number(durationMinutes) || 60, 5), 240); // 5 min à 4h
    const now = Date.now();
    const expiresAt = now + duration * 60 * 1000;
    const userKey = getClientUserKey(req);
    const resolvedUserId = userId || (getUser(req)?.userId) || userKey;

    const session = {
      sessionId,
      userKey,
      userId: resolvedUserId,
      courseId,
      chapter,
      mode: 'exam',
      totalQuestions: questions.length,
      startedAt: now,
      expiresAt,
      status: 'in_progress', // 'in_progress' | 'submitted' | 'expired'
      submittedAt: null,
      score: null,
      percentage: null,
      passed: null,
      answers: null
    };

    examSessions.set(sessionId, session);
    activeExamByUserCourse.set(`${userKey}:${courseId}`, sessionId);

    return {
      sessionId,
      courseId,
      chapter,
      totalQuestions: questions.length,
      startedAt: now,
      expiresAt,
      durationMinutes: duration,
      mode: 'exam'
    };
  };

  fastify.post('/session/start', startExamHandler);
  fastify.post('/exam/start', startExamHandler);

  // ==========================================================================
  // 2. Vérification unitaire formative (Strictement interdite en évaluation sommative)
  // ==========================================================================
  const verifyPracticeHandler = async (req, reply) => {
    const { courseId, chapter, questionIndex, selectedOption, sessionId } = req.body || {};

    if (!courseId || typeof courseId !== 'string') {
      return reply.code(400).send({ error: 'Identifiant de cours invalide ou manquant' });
    }
    if (chapter == null) {
      return reply.code(400).send({ error: 'Numéro de chapitre invalide ou manquant' });
    }
    if (typeof questionIndex !== 'number' || questionIndex < 0) {
      return reply.code(400).send({ error: 'Index de question invalide' });
    }
    if (typeof selectedOption !== 'number' || selectedOption < 0) {
      return reply.code(400).send({ error: 'Option sélectionnée invalide' });
    }

    // RÈGLE DE SÉCURITÉ 1 :
    // Les questions d'examens (chapitre 'exam', 'simulateur', 0) ne sont JAMAIS accessibles
    // en vérification unitaire, même si aucun sessionId n'est transmis par le client.
    if (isExamChapter(chapter)) {
      return reply.code(403).send({
        error: "Oracle interdit : les questions d'examen sommatif ne peuvent pas faire l'objet d'une vérification unitaire immédiate."
      });
    }

    // RÈGLE DE SÉCURITÉ 2 :
    // Si un sessionId est fourni et correspond à une session active, verify est bloqué.
    if (sessionId) {
      const session = examSessions.get(sessionId);
      if (session && session.status === 'in_progress') {
        return reply.code(403).send({
          error: "Oracle interdit : la vérification unitaire immédiate est désactivée pendant une session d'examen sommatif."
        });
      }
    }

    // RÈGLE DE SÉCURITÉ 3 :
    // Même si l'apprenant omet intentionnellement sessionId dans sa requête,
    // si le serveur sait qu'il a une session d'examen active sur ce cours, verify est bloqué.
    const userKey = getClientUserKey(req);
    const activeSessionId = activeExamByUserCourse.get(`${userKey}:${courseId}`);
    if (activeSessionId) {
      const activeSession = examSessions.get(activeSessionId);
      if (activeSession && activeSession.status === 'in_progress' && Date.now() <= activeSession.expiresAt + 30000) {
        return reply.code(403).send({
          error: "Oracle interdit : vous avez une session d'examen sommatif active en cours sur ce cours."
        });
      }
    }

    const questions = resolveQuestions(courseId, chapter);
    if (!questions || questionIndex >= questions.length) {
      return reply.code(404).send({ error: 'Chapitre ou question non trouvé' });
    }

    const q = questions[questionIndex];
    const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
    const isCorrect = (selectedOption === correctIdx);

    return {
      valid: true,
      correct: isCorrect,
      explanation: isCorrect ? (q.exp || q.explanation || 'Bonne réponse !') : (q.exp || q.explanation || null)
    };
  };

  fastify.post('/verify', verifyPracticeHandler);
  fastify.post('/practice/verify', verifyPracticeHandler);

  // ==========================================================================
  // 3. Soumission et clôture sécurisée d'une évaluation / examen
  // ==========================================================================
  const submitHandler = async (req, reply) => {
    const { courseId, chapter, answers, mode, sessionId } = req.body || {};
    const userKey = getClientUserKey(req);

    // CAS A : Soumission avec session d'examen déclarée
    if (sessionId) {
      const session = examSessions.get(sessionId);
      if (!session) {
        return reply.code(404).send({ error: "Session d'examen introuvable ou expirée" });
      }

      // Contrôle d'isolation utilisateur : une session ne peut être soumise par un autre utilisateur
      const authUser = getUser(req);
      if (authUser && session.userKey && session.userKey.startsWith('user:') && session.userKey !== `user:${authUser.userId}`) {
        return reply.code(403).send({ error: "Accès refusé : cette session appartient à un autre utilisateur." });
      }

      // Protection anti-rejeu et idempotence : si déjà soumis, renvoie le score acquis sans modification
      if (session.status === 'submitted') {
        return {
          sessionId: session.sessionId,
          alreadySubmitted: true,
          total: session.totalQuestions,
          score: session.score,
          percentage: session.percentage,
          passed: session.passed,
          submittedAt: session.submittedAt,
          status: 'submitted'
        };
      }

      // Vérification d'expiration de session (tolérance réseau de 30 secondes)
      const now = Date.now();
      if (now > session.expiresAt + 30000) {
        session.status = 'expired';
        activeExamByUserCourse.delete(`${session.userKey}:${session.courseId}`);
        return reply.code(400).send({ error: "Session d'examen expirée : le délai imparti est dépassé." });
      }

      if (!Array.isArray(answers)) {
        return reply.code(400).send({ error: 'Le champ answers doit être un tableau' });
      }

      const questions = resolveQuestions(session.courseId, session.chapter);
      if (!questions) {
        return reply.code(500).send({ error: 'Erreur interne de chargement du référentiel' });
      }

      const total = questions.length;
      let score = 0;

      const results = answers.map((ans) => {
        const qIdx = Number(ans.questionIndex != null ? ans.questionIndex : ans.index);
        const sel = Number(ans.selectedOption != null ? ans.selectedOption : ans.selected);
        if (isNaN(qIdx) || qIdx < 0 || qIdx >= total) {
          return { index: qIdx, valid: false, correct: false };
        }
        const q = questions[qIdx];
        const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
        const isCorrect = (sel === correctIdx);
        if (isCorrect) score++;

        return {
          index: qIdx,
          valid: true,
          correct: isCorrect,
          // En session d'examen sommatif, aucune explication n'est divulguée
          explanation: null
        };
      });

      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      const passed = percentage >= 70;

      // Verrouillage définitif de la session côté serveur
      session.status = 'submitted';
      session.submittedAt = now;
      session.score = score;
      session.percentage = percentage;
      session.passed = passed;
      session.answers = answers;

      // Libérer l'index actif pour cet utilisateur
      activeExamByUserCourse.delete(`${session.userKey}:${session.courseId}`);

      return {
        sessionId: session.sessionId,
        total,
        score,
        percentage,
        passed,
        submittedAt: now,
        status: 'submitted',
        results
      };
    }

    // CAS B : Soumission sans sessionId
    if (!courseId || typeof courseId !== 'string') {
      return reply.code(400).send({ error: 'Identifiant de cours invalide ou manquant' });
    }
    if (chapter == null) {
      return reply.code(400).send({ error: 'Numéro de chapitre invalide ou manquant' });
    }

    // RÈGLE DE SÉCURITÉ MAJEURE :
    // Un examen sommatif (chapter === 'exam', 'simulateur', 0) NE PEUT PAS être soumis
    // sans session, même si le client prétend envoyer mode: 'practice' !
    if (isExamChapter(chapter)) {
      return reply.code(403).send({
        error: "Évaluation sommative : une session d'examen active est obligatoire pour soumettre cette épreuve."
      });
    }

    if (!Array.isArray(answers)) {
      return reply.code(400).send({ error: 'Le champ answers doit être un tableau' });
    }

    const questions = resolveQuestions(courseId, chapter);
    if (!questions) {
      return reply.code(404).send({ error: 'Évaluation ou questions non trouvées' });
    }

    const total = questions.length;
    let score = 0;
    const isExam = mode === 'exam';

    const results = answers.map((ans) => {
      const qIdx = Number(ans.questionIndex != null ? ans.questionIndex : ans.index);
      const sel = Number(ans.selectedOption != null ? ans.selectedOption : ans.selected);
      if (isNaN(qIdx) || qIdx < 0 || qIdx >= total) {
        return { index: qIdx, valid: false, correct: false };
      }
      const q = questions[qIdx];
      const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
      const isCorrect = (sel === correctIdx);
      if (isCorrect) score++;

      return {
        index: qIdx,
        valid: true,
        correct: isCorrect,
        explanation: (!isExam || isCorrect) ? (q.exp || q.explanation || null) : null
      };
    });

    const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
    return {
      total,
      score,
      percentage,
      passed: percentage >= 70,
      mode: isExam ? 'exam' : 'practice',
      results
    };
  };

  fastify.post('/submit', submitHandler);
  fastify.post('/exam/submit', submitHandler);

  // ==========================================================================
  // 4. Consultation d'état de session
  // ==========================================================================
  const getSessionHandler = async (req, reply) => {
    const { sessionId } = req.params || {};
    const session = examSessions.get(sessionId);
    if (!session) {
      return reply.code(404).send({ error: "Session introuvable" });
    }

    const now = Date.now();
    const isExpired = session.status === 'in_progress' && (now > session.expiresAt + 30000);
    if (isExpired) {
      session.status = 'expired';
      activeExamByUserCourse.delete(`${session.userKey}:${session.courseId}`);
    }

    return {
      sessionId: session.sessionId,
      courseId: session.courseId,
      chapter: session.chapter,
      status: session.status,
      startedAt: session.startedAt,
      expiresAt: session.expiresAt,
      remainingSeconds: Math.max(0, Math.floor((session.expiresAt - now) / 1000)),
      totalQuestions: session.totalQuestions,
      submittedAt: session.submittedAt,
      score: session.score,
      percentage: session.percentage,
      passed: session.passed
    };
  };

  fastify.get('/session/:sessionId', getSessionHandler);
  fastify.get('/exam/session/:sessionId', getSessionHandler);

  // ==========================================================================
  // 5. Consultation de la correction après clôture définitive
  // ==========================================================================
  fastify.get('/exam/review/:sessionId', async (req, reply) => {
    const { sessionId } = req.params || {};
    const session = examSessions.get(sessionId);
    if (!session) {
      return reply.code(404).send({ error: "Session introuvable" });
    }
    if (session.status !== 'submitted') {
      return reply.code(403).send({
        error: "Examen non clôturé : la consultation de la correction est interdite avant soumission définitive."
      });
    }

    const questions = resolveQuestions(session.courseId, session.chapter);
    if (!questions) {
      return reply.code(500).send({ error: "Impossible de charger les questions" });
    }

    const review = (session.answers || []).map(ans => {
      const qIdx = Number(ans.questionIndex != null ? ans.questionIndex : ans.index);
      const q = questions[qIdx];
      if (!q) return null;
      const correctIdx = typeof q.correct === 'number' ? q.correct : q.answer;
      return {
        questionIndex: qIdx,
        stem: q.stem || q.q,
        userChoice: ans.selectedOption != null ? ans.selectedOption : ans.selected,
        correctChoice: correctIdx,
        isCorrect: (ans.selectedOption != null ? ans.selectedOption : ans.selected) === correctIdx,
        explanation: q.exp || q.explanation || null
      };
    }).filter(Boolean);

    return {
      sessionId: session.sessionId,
      score: session.score,
      total: session.totalQuestions,
      percentage: session.percentage,
      review
    };
  });
}

module.exports = qcmRoutes;
