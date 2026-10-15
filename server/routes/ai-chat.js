/**
 * Route proxy pour le chat IA (RD-AI)
 * Connecté au pool de clés multi-fournisseurs (OpenRouter, NVIDIA NIM, Ollama)
 */

const jwt = require('jsonwebtoken');
const aiPool = require('../services/ai-pool');
const JWT_SECRET = process.env.JWT_SECRET;

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
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (e) {
      return reply.code(401).send({ error: 'Session invalide ou expirée' });
    }

    const { messages, model, max_tokens, temperature, stream } = request.body || {};

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return reply.code(400).send({ error: 'Messages requis' });
    }

    // Limiter la taille des messages pour éviter les abus
    const safeMessages = messages.slice(-25).map(m => ({
      role: m.role === 'system' || m.role === 'user' || m.role === 'assistant' ? m.role : 'user',
      content: typeof m.content === 'string' ? m.content.slice(0, 4000) : ''
    }));

    try {
      const result = await aiPool.chatCompletion({
        messages: safeMessages,
        model,
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

module.exports = aiChatRoutes;
