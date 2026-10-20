require('dotenv').config();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const jwt = require('jsonwebtoken');
const { buildApp } = require('./server/app');
const { initDB, getSessionByJti, updateSessionVerified, getUserById, hasActiveSubscription } = require('./server/db');
const { isProtected, getCourseFromUrl, COURSES, canAccessCourse } = require('./server/middleware/access-control');

// ========================
// Créer l'app Fastify partagée (plugins + routes API)
// ========================
const fastify = buildApp({ logger: true });

// ========================
// Constantes
// ========================
const SITE_ROOT = __dirname;
const PUBLIC_DIR = path.join(__dirname, 'public');
const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';

// Dossiers et fichiers à ne jamais servir
// Note : '/api/' retiré — les routes API sont enregistrées AVANT le catch-all,
// donc une requête GET sur un endpoint POST-only renvoie désormais 405 propre
// au lieu du 403 générique qui masquait le véritable état de l'API.
const BLOCKED_PATHS = ['/server/', '/node_modules/', '/public/', '/.env', '/.git/', '/package.json', '/package-lock.json', '/scripts/', '/dist/', '/vercel.json', '/.vercelignore', '/b1/'];

// Allowlist des fichiers racine servables (tout le reste → 404).
// Empêche l'exposition des fichiers de test/preview et des scripts jetables.
const ROOT_ALLOWLIST = new Set([
  'index.html', 'rd-ai-chat.js',
  'preparation-cheatsheet.html', 'preparation-progression.html', 'preparation-classement.html',
  'robots.txt', 'sitemap.xml', '404.html'
]);

function isRootPathAllowed(urlPath) {
  const parts = urlPath.split('/').filter(Boolean);
  if (parts.length !== 1) return true;   // sous-dossier : règles habituelles
  return ROOT_ALLOWLIST.has(parts[0]);   // fichier racine : allowlist stricte
}

// Types MIME
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.eot': 'application/vnd.ms-fontobject',
  '.pdf': 'application/pdf',
  '.txt': 'text/plain; charset=utf-8',
  '.md': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mp3': 'audio/mpeg',
  '.map': 'application/json',
  '.py': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm'
};

// ========================
// Vérification JWT utilisateur
// ========================
async function verifyUserAuth(request) {
  try {
    const token = request.cookies.auth_token;
    if (!token) return { valid: false };

    const decoded = jwt.verify(token, JWT_SECRET);
    if (!decoded.userId) return { valid: false };

    // Vérifier la session en base (comptes users)
    const session = await getSessionByJti(decoded.jti);
    if (!session || !session.is_valid || session.user_id !== decoded.userId) return { valid: false };

    // Vérifier que le compte existe et est actif
    const user = await getUserById(decoded.userId);
    if (!user || !user.is_active) return { valid: false };

    // Throttle : mettre à jour last_verified max 1×/5 min par session
    // (réduit drastiquement les UPDATE sur les pages protégées vues en rafale)
    const last = session.last_verified ? new Date(session.last_verified).getTime() : 0;
    if (Date.now() - last > 5 * 60 * 1000) {
      await updateSessionVerified(decoded.jti);
    }

    const subscribed = hasActiveSubscription(user);
    return { valid: true, userId: user.id, scope: subscribed ? 'all' : '', subscribed, level: user.level || 'b2' };
  } catch (err) {
    return { valid: false };
  }
}

function verifyPreparationForPage(request, authResult) {
  try {
    if (!process.env.PREPARATION_PASSWORD) return false;
    const token = request.cookies.preparation_token;
    if (!token || !authResult || !authResult.userId) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    const passwordVersion = require('crypto')
      .createHash('sha256')
      .update(String(process.env.PREPARATION_PASSWORD || ''))
      .digest('hex')
      .slice(0, 24);
    return decoded.prepWeb === true &&
      Number(decoded.userId) === Number(authResult.userId) &&
      decoded.passwordVersion === passwordVersion;
  } catch {
    return false;
  }
}

// ========================
// Vérification admin pour servir les pages admin
// ========================
function verifyAdminForPage(request) {
  try {
    const token = request.cookies.admin_token;
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded.admin === true;
  } catch {
    return false;
  }
}

// ========================
// Script d'injection pour les pages HTML des cours
// ========================
const AUTH_INJECT_HEAD = '<link rel="stylesheet" href="/_auth/css/auth-styles.css">';
const AUTH_INJECT_BODY = '<script src="/_auth/js/fingerprint.js"></script>\n<script src="/_auth/js/auth-check.js"></script>\n<script src="/assets/js/delight.js" defer></script>';

// ========================
// Serveur de fichiers statiques avec contrôle d'accès
// ========================
fastify.get('/*', async (request, reply) => {
  let urlPath = decodeURIComponent(request.url.split('?')[0]);
  const queryString = request.url.includes('?') ? request.url.substring(request.url.indexOf('?')) : '';

  // Default to index.html
  if (urlPath === '/' || urlPath === '') urlPath = '/index.html';
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  // ---- Servir les fichiers auth (/_auth/*) depuis public/ ----
  if (urlPath.startsWith('/_auth/')) {
    const relativePath = urlPath.replace('/_auth/', '');
    const filePath = path.join(PUBLIC_DIR, relativePath);

    // Sécurité anti path-traversal
    const resolved = path.resolve(filePath);
    if (!resolved.startsWith(path.resolve(PUBLIC_DIR))) {
      return reply.code(403).send('Forbidden');
    }

    // Admin dashboard : vérifier authentification admin
    if (relativePath.startsWith('admin/dashboard')) {
      if (!verifyAdminForPage(request)) {
        return reply.redirect('/_auth/admin/login.html');
      }
    }

    try {
      await fsPromises.access(filePath);
      const ext = path.extname(filePath);
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      const content = await fsPromises.readFile(filePath);
      return reply.type(contentType).send(content);
    } catch {
      return reply.code(404).type('text/html').send('<h1>404 - Page non trouvée</h1>');
    }
  }

  // ---- Bloquer les fichiers sensibles ----
  for (const blocked of BLOCKED_PATHS) {
    if (urlPath.startsWith(blocked) || urlPath === blocked) {
      return reply.code(403).send('Forbidden');
    }
  }

  // ---- Allowlist racine : ne servir que les fichiers racine déclarés ----
  if (!isRootPathAllowed(urlPath)) {
    return reply.code(404).type('text/html').send('<h1>404 - Page non trouvée</h1>');
  }

  // ---- Résoudre le chemin du fichier ----
  const filePath = path.join(SITE_ROOT, urlPath);
  const resolved = path.resolve(filePath);

  // Sécurité anti path-traversal
  if (!resolved.startsWith(path.resolve(SITE_ROOT))) {
    return reply.code(403).send('Forbidden');
  }

  // Vérifier l'existence du fichier
  try {
    const stat = await fsPromises.stat(filePath);
    if (stat.isDirectory()) {
      // Rediriger vers le fichier index.html du répertoire
      const indexPath = path.join(filePath, 'index.html');
      try {
        await fsPromises.access(indexPath);
        return reply.redirect(urlPath + '/');
      } catch {
        return reply.code(404).type('text/html').send('<h1>404 - Page non trouvée</h1>');
      }
    }
  } catch {
    return reply.code(404).type('text/html').send('<h1>404 - Page non trouvée</h1>');
  }

  // ---- Contrôle d'accès pour contenu protégé uniquement ----
  // Les index, sommaires et chapitres 1 de tous les cours sont 100% gratuits et libres d'accès.
  if (isProtected(urlPath)) {
    const authResult = await verifyUserAuth(request);

    if (!authResult.valid) {
      return reply.redirect('/_auth/login.html?redirect=' + encodeURIComponent(urlPath));
    }

    // Garde de niveau sur le contenu protégé : B1 ⊂ B2 ⊂ B3
    const courseId = getCourseFromUrl(urlPath);
    if (courseId && !canAccessCourse(authResult.level, courseId)) {
      return reply.redirect('/_auth/account.html?level=denied&redirect=' + encodeURIComponent(urlPath));
    }

    // Contenu payant : abonnement requis
    if (!authResult.subscribed) {
      return reply.redirect('/_auth/account.html?payment=required&redirect=' + encodeURIComponent(urlPath));
    }

    if (urlPath.startsWith('/preparation-web/') && !verifyPreparationForPage(request, authResult)) {
      return reply.redirect('/index.html?preparation=locked');
    }
  }

  // ---- Servir le fichier ----
  const ext = path.extname(filePath);
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  // Pour les fichiers HTML : injecter les scripts d'authentification
  if (ext === '.html') {
    let content = await fsPromises.readFile(filePath, 'utf-8');

    // Injecter le CSS avant </head>
    if (content.includes('</head>')) {
      content = content.replace('</head>', AUTH_INJECT_HEAD + '\n</head>');
    }

    // Injecter le JS avant </body>
    if (content.includes('</body>')) {
      content = content.replace('</body>', AUTH_INJECT_BODY + '\n</body>');
    }

    return reply.type(contentType).send(content);
  }

  // Pour les autres fichiers : streaming
  const stream = fs.createReadStream(filePath);
  return reply.type(contentType).send(stream);
});

// ========================
// Démarrage du serveur
// ========================
async function start() {
  try {
    // Vérifier les variables d'environnement requises
    const required = ['DATABASE_URL', 'JWT_SECRET', 'ADMIN_USERNAME', 'ADMIN_PASSWORD'];
    for (const key of required) {
      if (!process.env[key]) {
        console.error(` Variable d'environnement manquante : ${key}`);
        process.exit(1);
      }
    }

    // Initialiser la base de données
    await initDB();

    // Démarrer Fastify
    await fastify.listen({ port: PORT, host: '127.0.0.1' });
    console.log(`\n Serveur démarré sur le port ${PORT}`);
    console.log(` Site : http://localhost:${PORT}`);
    console.log(` Connexion : http://localhost:${PORT}/_auth/login.html`);
    console.log(`  Admin : http://localhost:${PORT}/_auth/admin/login.html\n`);

  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

start();
