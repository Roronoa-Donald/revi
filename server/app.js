/**
 * Application Fastify partagée
 * Utilisée par :
 *   - server.js (Render / local) → ajoute le serveur de fichiers statiques + listen()
 *   - api/index.js (Vercel) → expose en serverless function
 */
require('dotenv').config();

function buildApp(opts = {}) {
  const fastify = require('fastify')({
    logger: opts.logger !== undefined ? opts.logger : true,
    bodyLimit: 1048576 // 1MB
  });

  // ========================
  // Plugins
  // ========================
  fastify.register(require('@fastify/cookie'));
  fastify.register(require('@fastify/cors'), {
    origin: true,
    credentials: true
  });

  // Sécurité : headers HTTP
  fastify.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false
  });

  // Rate-limiting global (100 req/min par IP)
  fastify.register(require('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute',
    keyGenerator: (req) => req.ip || req.headers['x-forwarded-for'] || '127.0.0.1'
  });

  // ========================
  // Routes API
  // ========================
  fastify.register(require('./routes/auth'), { prefix: '/api' });
  fastify.register(require('./routes/admin'), { prefix: '/api/admin' });
  fastify.register(require('./routes/ai-chat'), { prefix: '/api' });

  return fastify;
}

module.exports = { buildApp };
