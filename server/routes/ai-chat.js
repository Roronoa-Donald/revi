/**
 * Route proxy pour le chat IA (RD-AI)
 * Connecté au pool de clés multi-fournisseurs (OpenRouter, NVIDIA NIM, Ollama)
 * Enrichit dynamiquement le prompt système depuis le registre canonique server/courses.js
 */

const jwt = require('jsonwebtoken');
const db = require('../db');
const aiPool = require('../services/ai-pool');
const { COURSES, COURSE_DIRS, LEVEL_LABELS, canAccessCourse, normalizeLevel } = require('../courses');

const ALLOWED_CLIENT_MODELS = new Set([
  'deepseek/deepseek-chat',
  'deepseek/deepseek-chat-v3-0324:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'qwen/qwen-2.5-72b-instruct:free'
]);

const ACTIVE_COURSE_DIRS = COURSE_DIRS.filter((id) => !COURSES[id].archived);
const COURSES_BY_LEVEL = {
  b1: ACTIVE_COURSE_DIRS.filter((id) => COURSES[id].level === 'b1'),
  b2: ACTIVE_COURSE_DIRS.filter((id) => COURSES[id].level === 'b2'),
  b3: ACTIVE_COURSE_DIRS.filter((id) => COURSES[id].level === 'b3')
};

const COURSE_LOOKUP = new Map();
for (const id of COURSE_DIRS) {
  COURSE_LOOKUP.set(id.toLowerCase(), id);
}

function sanitizeField(val, maxLen = 160) {
  if (typeof val !== 'string') return '';
  return val.replace(/[\r\n\t]+/g, ' ').trim().slice(0, maxLen);
}

function resolveCourseContext(rawContext = {}) {
  const src = rawContext && typeof rawContext === 'object' ? rawContext : {};
  const rawId = sanitizeField(src.courseId || src.project || '', 80);
  const matchedId = rawId ? (COURSES[rawId] ? rawId : COURSE_LOOKUP.get(rawId.toLowerCase()) || null) : null;
  const chapter = sanitizeField(src.chapter || src.page || 'index', 80) || 'index';
  const pageTitle = sanitizeField(src.pageTitle || '', 160);

  if (matchedId && COURSES[matchedId]) {
    const course = COURSES[matchedId];
    const levelCode = course.level;
    const levelLabel = LEVEL_LABELS[levelCode] || levelCode.toUpperCase();
    return {
      courseId: matchedId,
      courseTitle: course.name,
      level: levelCode,
      levelLabel: `${levelLabel} (${levelCode.toUpperCase()})`,
      chapter,
      pageTitle: pageTitle || `${course.name} — ${chapter}`
    };
  }

  return {
    courseId: 'portal',
    courseTitle: 'Portail des Cours Interactifs',
    level: 'all',
    levelLabel: 'Licence 1, Licence 2 et Licence 3 (B1, B2, B3)',
    chapter,
    pageTitle: pageTitle || 'Portail Informatique B1, B2 & B3'
  };
}

function buildServerSystemPrompt(rawContext = {}) {
  const resolved = resolveCourseContext(rawContext);
  const b1Names = COURSES_BY_LEVEL.b1.map((id) => COURSES[id].name).join(', ');
  const b2Names = COURSES_BY_LEVEL.b2.map((id) => COURSES[id].name).join(', ');
  const b3Names = COURSES_BY_LEVEL.b3.map((id) => COURSES[id].name).join(', ');

  const catalogBlock = [
    `CATALOGUE OFFICIEL DE LA PLATEFORME (${ACTIVE_COURSE_DIRS.length} cours actifs sur ${COURSE_DIRS.length} référencés) :`,
    `- Licence 1 / B1 (${COURSES_BY_LEVEL.b1.length} cours actifs) : ${b1Names}.`,
    `- Licence 2 / B2 (${COURSES_BY_LEVEL.b2.length} cours actifs) : ${b2Names}.`,
    `- Licence 3 / B3 (${COURSES_BY_LEVEL.b3.length} cours actifs) : ${b3Names}.`
  ].join('\n');

  const pageBlock = resolved.courseId === 'portal'
    ? `PAGE ACTUELLE : ${resolved.courseTitle} — ${resolved.pageTitle} (chapitre/vue : ${resolved.chapter}).`
    : `COURS ET PAGE ACTUELS : ${resolved.courseTitle} (identifiant : ${resolved.courseId}, niveau : ${resolved.levelLabel}, chapitre : ${resolved.chapter}, titre : ${resolved.pageTitle}).`;

  return [
    `Tu es RD-AI, l'assistant pédagogique intelligent du Portail des Cours Interactifs (${ACTIVE_COURSE_DIRS.length} cours actifs en B1, B2 et B3).`,
    'RÈGLES STRICTES :',
    '- Ne mentionne jamais DeepSeek, OpenAI, ChatGPT ou un fournisseur tiers ; présente-toi uniquement comme RD-AI.',
    '- Réponds dans la langue de la question avec des explications claires, structurées et adaptées au niveau académique.',
    '- Utilise LaTeX ($...$ ou $$...$$) pour les formules mathématiques.',
    '- Reste concis (moins de 400 mots sauf demande explicite).',
    catalogBlock,
    pageBlock
  ].join('\n');
}

async function aiChatRoutes(fastify) {

  // Rate-limit spécifique pour le chat IA (plus restrictif)
  fastify.post('/ai-chat', {
    config: {
      rateLimit: {
        max: 30,
        timeWindow: '1 minute'
      }
    }
  }, async (request, reply) => {
    // Vérification d'authentification
    const token = request.cookies?.auth_token;
    if (!token) {
      return reply.code(401).send({ error: 'Authentification requise pour utiliser le chat IA' });
    }

    const jwtSecret = process.env.JWT_SECRET;
    if (typeof jwtSecret !== 'string' || !jwtSecret.trim()) {
      return reply.code(401).send({ error: 'Session invalide ou expirée' });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, jwtSecret);
    } catch (e) {
      return reply.code(401).send({ error: 'Session invalide ou expirée' });
    }

    // Vérification de la révocation de session et de l'état actif du compte (AUTH-001)
    let resolvedDbUser = null;
    if (decoded && decoded.jti) {
      let session;
      let sessionChecked = false;
      try {
        session = await db.getSessionByJti(decoded.jti);
        sessionChecked = true;
      } catch (dbErr) {
        if (process.env.DATABASE_URL || db.isConfigured) {
          return reply.code(401).send({ error: 'Session révoquée ou compte désactivé' });
        }
      }

      if (sessionChecked) {
        if (!session || !session.is_valid || (decoded.userId !== undefined && session.user_id !== decoded.userId)) {
          return reply.code(401).send({ error: 'Session révoquée ou compte désactivé' });
        }

        if (decoded.userId !== undefined) {
          let user;
          let userChecked = false;
          try {
            user = await db.getUserById(decoded.userId);
            userChecked = true;
          } catch (dbErr) {
            if (process.env.DATABASE_URL || db.isConfigured) {
              return reply.code(401).send({ error: 'Session révoquée ou compte désactivé' });
            }
          }
          if (userChecked && (!user || !user.is_active)) {
            return reply.code(401).send({ error: 'Session révoquée ou compte désactivé' });
          }
          if (userChecked && user) {
            resolvedDbUser = user;
          }
        }
      }
    }

    const body = request.body || {};
    const { messages, model, max_tokens, temperature, stream } = body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return reply.code(400).send({ error: 'Messages requis' });
    }

    // Liste blanche stricte des modèles sélectionnables par le client (SEC-003)
    const safeModel = typeof model === 'string' && ALLOWED_CLIENT_MODELS.has(model.trim())
      ? model.trim()
      : undefined;

    // Contexte dynamique validé à partir de server/courses.js
    const rawContext = body.context && typeof body.context === 'object'
      ? body.context
      : {
          courseId: body.courseId,
          courseTitle: body.courseTitle,
          level: body.level,
          pageTitle: body.pageTitle,
          chapter: body.chapter
        };

    // Contrôle d'accès niveau + abonnement lorsque le contexte cible un contenu payant
    const ctxResolved = resolveCourseContext(rawContext);
    const chapMatch = String(ctxResolved.chapter || '').match(/(\d+)/);
    const chapNum = chapMatch ? Number(chapMatch[1]) : null;
    const isPaidContext = Boolean(ctxResolved.courseId && (
      ctxResolved.courseId === 'epreuves'
      || ctxResolved.courseId === 'preparation-web'
      || /exam|simulateur|carte|formule|exercice/i.test(String(ctxResolved.chapter || ''))
      || (chapNum !== null && chapNum >= 2)
    ));
    if (resolvedDbUser && isPaidContext) {
      const userLvl = normalizeLevel(resolvedDbUser.level || decoded.level || 'b2') || 'b2';
      if (!canAccessCourse(userLvl, ctxResolved.courseId)) {
        return reply.code(403).send({ error: 'Votre niveau de compte ne permet pas d’accéder à ce cours.' });
      }
      if (!db.hasActiveSubscription(resolvedDbUser)) {
        return reply.code(403).send({ error: 'Un abonnement actif est requis pour ce contenu.' });
      }
    }

    const serverSystemPrompt = buildServerSystemPrompt(rawContext);

    // Limiter la taille des messages pour éviter les abus et injecter le prompt système serveur
    const clientConversation = messages
      .filter((m) => m && m.role !== 'system')
      .slice(-24)
      .map((m) => ({
        role: m.role === 'assistant' ? 'assistant' : 'user',
        content: typeof m.content === 'string' ? m.content.slice(0, 4000) : ''
      }));

    const safeMessages = [
      { role: 'system', content: serverSystemPrompt.slice(0, 4000) },
      ...clientConversation
    ];

    try {
      const result = await aiPool.chatCompletion({
        messages: safeMessages,
        model: safeModel,
        max_tokens: Math.min(max_tokens || 2048, 4096),
        temperature: typeof temperature === 'number' ? Math.min(temperature, 1.5) : 0.7,
        stream: !!stream,
        task: 'chat'
      });

      if (stream) {
        // Streaming : relayer le flux SSE directement
        reply.raw.writeHead(200, {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive'
        });

        const reader = result.response.body.getReader();
        const decoder = new TextDecoder();

        try {
          while (true) {
            const { value, done } = await reader.read();
            if (done) break;
            reply.raw.write(decoder.decode(value, { stream: true }));
          }
        } catch (e) {
          // Client disconnected
        } finally {
          reply.raw.end();
        }
        return;
      }

      // Non-streaming : retourner la réponse JSON
      return reply.send(result.data);

    } catch (err) {
      fastify.log.error('AI Chat proxy error:', err);
      const status = err.status && Number.isInteger(err.status) ? err.status : 503;
      return reply.code(status).send({ error: err.message || 'Service IA indisponible' });
    }
  });
}

aiChatRoutes.ALLOWED_CLIENT_MODELS = ALLOWED_CLIENT_MODELS;
aiChatRoutes.resolveCourseContext = resolveCourseContext;
aiChatRoutes.buildServerSystemPrompt = buildServerSystemPrompt;
module.exports = aiChatRoutes;
