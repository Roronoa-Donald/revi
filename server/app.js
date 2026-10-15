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
    bodyLimit: 1048576, // 1MB
    trustProxy: true   // Render/Vercel : req.ip = IP réelle du client (rate-limit par IP fiable)
  });

  // ========================
  // Plugins
  // ========================
  fastify.register(require('@fastify/cookie'));
  fastify.register(require('@fastify/cors'), {
    origin: function(origin, cb) {
      // Allow requests with no origin (mobile apps, curl, same-origin)
      if (!origin) return cb(null, true);
      const allowed = [
        /^https?:\/\/localhost(:\d+)?$/,
        /^https?:\/\/127\.0\.0\.1(:\d+)?$/,
        /\.vercel\.app$/,
        /\.onrender\.com$/
      ];
      if (allowed.some(re => re.test(origin))) return cb(null, true);
      return cb(null, false); // refus propre : pas d'en-têtes CORS, pas d'exception 500
    },
    credentials: true
  });

  // Sécurité : headers HTTP
  fastify.register(require('@fastify/helmet'), {
    contentSecurityPolicy: false
  });

  // Rate-limiting global (100 req/min par IP réelle — trustProxy activé)
  fastify.register(require('@fastify/rate-limit'), {
    max: 100,
    timeWindow: '1 minute'
  });

  // Capture du body brut pour les webhooks signés (ex: FedaPay HMAC)
  fastify.addContentTypeParser('application/json', { parseAs: 'buffer' }, function (req, body, done) {
    try {
      req.rawBody = body.toString('utf8');
      const json = req.rawBody ? JSON.parse(req.rawBody) : {};
      done(null, json);
    } catch (err) {
      err.statusCode = 400;
      done(err, undefined);
    }
  });

  // ========================
  // Routes API
  // ========================
  fastify.register(require('./routes/auth'), { prefix: '/api' });
  fastify.register(require('./routes/admin'), { prefix: '/api/admin' });
  fastify.register(require('./routes/ai-chat'), { prefix: '/api' });
  fastify.register(require('./routes/execute'), { prefix: '/api' });
  fastify.register(require('./routes/exercises'), { prefix: '/api' });
  fastify.register(require('./routes/preparation'), { prefix: '/api/preparation' });
  fastify.register(require('./routes/fedapay'), { prefix: '/api/fedapay' });

  return fastify;
}

module.exports = { buildApp };
