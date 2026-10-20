/**
 * Exécution de code — /api/execute
 *
 * L'élève n'a jamais la clé du fournisseur : le navigateur appelle ce serveur,
 * le serveur appelle le fournisseur (spec §7 et §29).
 */

const execution = require('../services/execution');
const budget = require('../services/execution/budget');
const { requireUser, quotaKey } = require('../utils/auth');

async function executeRoutes(fastify) {
  // Catalogue affiché dans le sélecteur de langage. Recoupé avec ce que le
  // fournisseur annonce réellement, avec repli local s'il est injoignable.
  fastify.get('/execute/languages', {
    config: { rateLimit: { max: 30, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const catalogue = await execution.getLanguages();
    return reply.send({
      source: catalogue.source,
      matched: catalogue.matched,
      languages: catalogue.languages
    });
  });

  // Une seule action d'exécution par clic : pas d'auto-run à la frappe,
  // pas de rafale (spec §22, §23, §38).
  fastify.post('/execute', {
    config: { rateLimit: { max: 15, timeWindow: '1 minute' } }
  }, async (request, reply) => {
    const user = requireUser(request, reply);
    if (!user) return;

    const key = quotaKey(user, request);
    const guard = budget.canExecute(key);
    if (!guard.allowed) {
      return reply.code(429).send({
        status: 'rate_limited',
        error: guard.reason === 'global'
          ? 'Le service d’exécution est saturé pour aujourd’hui. Réessayez demain.'
          : 'Vous avez atteint votre nombre d’exécutions pour aujourd’hui. Réessayez demain.',
        quota: budget.snapshot(key)
      });
    }

    const body = request.body || {};
    try {
      budget.consume(key, 1);
      const result = await execution.execute({
        language: body.language,
        code: body.code,
        stdin: body.stdin,
        args: body.args,
        options: body.options,
        compiler: body.compiler
      });
      return reply.send({ ...result, quota: budget.snapshot(key) });
    } catch (error) {
      fastify.log.error({ code: error && error.code }, 'Échec d’exécution');
      const { statusCode, message, code } = execution.errorToHttp(error);
      return reply.code(statusCode).send({ error: message, status: 'api_error', code });
    }
  });
}

module.exports = executeRoutes;
