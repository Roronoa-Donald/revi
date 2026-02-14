/**
 * Vercel Serverless Function — Point d'entrée API
 * 
 * Toutes les requêtes /api/* sont routées ici via vercel.json.
 * On utilise l'app Fastify partagée (server/app.js) et on la
 * wrappe dans le handler serverless de Vercel.
 * 
 * Compatible avec Vercel Functions (Node.js runtime).
 */
const { buildApp } = require('../server/app');
const { initDB } = require('../server/db');

let app;
let dbInitialized = false;

/**
 * Initialise l'app Fastify + la DB (une seule fois par cold start)
 */
async function getApp() {
  if (!app) {
    app = buildApp({ logger: false });
    await app.ready();
  }
  if (!dbInitialized) {
    await initDB();
    dbInitialized = true;
  }
  return app;
}

/**
 * Handler Vercel
 * Convertit req/res Node natifs en requête Fastify
 */
module.exports = async function handler(req, res) {
  try {
    const fastify = await getApp();
    
    // Fastify peut traiter des requêtes Node natives
    fastify.server.emit('request', req, res);
  } catch (err) {
    console.error('Erreur API serverless:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ success: false, message: 'Erreur serveur' }));
  }
};
