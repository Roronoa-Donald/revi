/**
 * Route proxy pour le chat IA (RD-AI)
 * Connecté au pool de clés multi-fournisseurs (OpenRouter, NVIDIA NIM, Ollama)
 */

const jwt = require('jsonwebtoken');
const db = require('../db');
const aiPool = require('../services/ai-pool');

const ALLOWED_CLIENT_MODELS = new Set([
  'deepseek/deepseek-chat',
  'deepseek/deepseek-chat-v3-0324:free',
  'meta-llama/llama-3.3-70b-instruct:free',
  'google/gemini-2.0-flash-exp:free',
  'qwen/qwen-2.5-72b-instruct:free'
]);

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
        }
      }
    }

    const { messages, model, max_tokens, temperature, stream } = request.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return reply.code(400).send({ error: 'Messages requis' });
    }

    // Liste blanche stricte des modèles sélectionnables par le client (SEC-003)
    const safeModel = typeof model === 'string' && ALLOWED_CLIENT_MODELS.has(model.trim())
      ? model.trim()
      : undefined;

    // Limiter la taille des messages pour éviter les abus
    const safeMessages = messages.slice(-25).map(m => ({
      role: m.role === 'system' || m.role === 'user' || m.role === 'assistant' ? m.role : 'user',
      content: typeof m.content === 'string' ? m.content.slice(0, 4000) : ''
    }));

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
module.exports = aiChatRoutes;
