const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');
const {
  PROJECT_COUNT,
  VALIDATION_RULES,
  BEHAVIOR_RULES,
  SOLUTIONS
} = require('../preparation-content');

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';
const PREPARATION_COOKIE = 'preparation_token';

function preparationEnabled() {
  return Boolean(process.env.PREPARATION_PASSWORD);
}

function sameSecret(a, b) {
  const left = Buffer.from(String(a || ''));
  const right = Buffer.from(String(b || ''));
  if (left.length !== right.length) return false;
  return crypto.timingSafeEqual(left, right);
}

async function verifyUser(request) {
  try {
    const token = request.cookies.auth_token;
    if (!token) return { valid: false, reason: 'auth' };

    const decoded = jwt.verify(token, JWT_SECRET);
    const session = await db.getSessionByJti(decoded.jti);
    if (!session || !session.is_valid) return { valid: false, reason: 'auth' };

    const keyRecord = await db.getKeyById(decoded.keyId);
    if (!keyRecord || !keyRecord.is_active) return { valid: false, reason: 'auth' };
    if (keyRecord.expires_at && new Date(keyRecord.expires_at) < new Date()) {
      return { valid: false, reason: 'expired' };
    }

    const keyClass = keyRecord.class || decoded.keyClass || 'b2';
    if (keyClass !== 'b2') return { valid: false, reason: 'class' };

    await db.updateSessionVerified(decoded.jti);
    return {
      valid: true,
      keyId: decoded.keyId,
      scope: decoded.scope || keyRecord.scope || '',
      keyClass,
      keyRecord
    };
  } catch {
    return { valid: false, reason: 'auth' };
  }
}

function signPreparationToken(keyId) {
  return jwt.sign({ prepWeb: true, keyId, passwordVersion: preparationPasswordVersion() }, JWT_SECRET, { expiresIn: '365d' });
}

function buildStorageKey(keyId) {
  return crypto.createHash('sha256').update(`${keyId}:${JWT_SECRET}`).digest('hex').slice(0, 24);
}

function preparationPasswordVersion() {
  return crypto.createHash('sha256').update(String(process.env.PREPARATION_PASSWORD || '')).digest('hex').slice(0, 24);
}

function verifyPreparationToken(request, keyId) {
  try {
    const token = request.cookies[PREPARATION_COOKIE];
    if (!token) return false;
    const decoded = jwt.verify(token, JWT_SECRET);
    return (
      decoded.prepWeb === true &&
      Number(decoded.keyId) === Number(keyId) &&
      decoded.passwordVersion === preparationPasswordVersion()
    );
  } catch {
    return false;
  }
}

async function getAuthContext(request, reply, requirePrep = true) {
  if (!preparationEnabled()) {
    reply.code(503).send({ success: false, enabled: false, message: 'La section Preparation Web est desactivee.' });
    return null;
  }

  const auth = await verifyUser(request);
  if (!auth.valid) {
    reply.code(auth.reason === 'class' ? 403 : 401).send({
      success: false,
      authenticated: false,
      message: auth.reason === 'class' ? 'Section reservee aux cles B2.' : 'Connexion requise.'
    });
    return null;
  }

  if (requirePrep && !verifyPreparationToken(request, auth.keyId)) {
    reply.code(403).send({ success: false, unlocked: false, message: 'Mot de passe Preparation requis.' });
    return null;
  }

  await db.ensurePreparationProfile(auth.keyId);
  return auth;
}

function cookieOptions() {
  return {
    httpOnly: true,
    secure: IS_PROD,
    sameSite: 'lax',
    path: '/',
    maxAge: 365 * 24 * 60 * 60,
    domain: process.env.COOKIE_DOMAIN || undefined
  };
}

function normalizeProgressRows(rows) {
  return rows.map((row) => ({
    projectId: Number(row.project_id),
    htmlCode: row.html_code || '',
    jsCode: row.js_code || '',
    completed: Boolean(row.completed),
    projectXp: Number(row.project_xp || 0),
    quizXp: Number(row.quiz_xp || 0),
    quizScore: Number(row.quiz_score || 0),
    quizCompleted: Boolean(row.quiz_completed),
    usedHint: Boolean(row.used_hint),
    usedSolution: Boolean(row.used_solution),
    attempts: Number(row.attempts || 0),
    updatedAt: row.updated_at ? new Date(row.updated_at).toISOString() : null
  }));
}

function normalizeProfile(profile) {
  if (!profile) return null;
  return {
    displayName: profile.display_name,
    totalXp: Number(profile.total_xp || 0),
    projectsCompleted: Number(profile.projects_completed || 0),
    rank: Number(profile.rank || 0),
    lastActivity: profile.last_activity ? new Date(profile.last_activity).toISOString() : null
  };
}

function normalizeLeaderboard(rows) {
  return rows.map((row) => ({
    name: row.display_name,
    xp: Number(row.total_xp || 0),
    projectsCompleted: Number(row.projects_completed || 0),
    rank: Number(row.rank || 0),
    lastActivity: row.last_activity ? new Date(row.last_activity).toISOString() : null
  }));
}

function completedSet(rows) {
  return new Set(rows.filter((row) => row.completed).map((row) => Number(row.project_id)));
}

function isProjectUnlocked(projectId, rows) {
  if (projectId === 1) return true;
  const done = completedSet(rows);
  for (let id = 1; id < projectId; id += 1) {
    if (!done.has(id)) return false;
  }
  return true;
}

function hasTag(html, tag) {
  return new RegExp(`<\\s*${tag}(\\s|>|/)`, 'i').test(html);
}

function hasExactClass(html, className) {
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    if (classes.includes(className)) return true;
  }
  return false;
}

function hasInputType(html, type) {
  return new RegExp(`<\\s*input[^>]*type\\s*=\\s*["']${type}["']`, 'i').test(html);
}

function hasJsName(js, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`\\b(function\\s+${escaped}|const\\s+${escaped}|let\\s+${escaped}|var\\s+${escaped})\\b`),
    new RegExp(`\\b${escaped}\\s*=\\s*(\\([^)]*\\)\\s*=>|function\\b)`)
  ];
  return patterns.some((pattern) => pattern.test(js));
}

function hasId(html, id) {
  return new RegExp(`id\\s*=\\s*["']${id}["']`, 'i').test(html);
}

function hasDataAttr(html, attr) {
  return new RegExp(`data-${attr}\\s*=`, 'i').test(html);
}

function countExactClass(html, className) {
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let count = 0;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    if (classes.includes(className)) count += 1;
  }
  return count;
}

function countSelector(html, selector) {
  const value = String(selector || '').trim();
  if (!value) return 0;
  if (value.startsWith('.')) return countExactClass(html, value.slice(1));
  if (value.startsWith('#')) return hasId(html, value.slice(1)) ? 1 : 0;
  if (/^[a-z][a-z0-9-]*$/i.test(value)) {
    const matches = html.match(new RegExp(`<\\s*${value}(\\s|>|/)`, 'gi'));
    return matches ? matches.length : 0;
  }
  return 0;
}

function testJsPattern(check, js) {
  if (!check || !check.pattern) return true;
  if (check.pattern instanceof RegExp) return check.pattern.test(js);
  return new RegExp(check.pattern, check.flags || 'i').test(js);
}

function validateBehaviorStatic(projectId, html, js) {
  const rules = BEHAVIOR_RULES[projectId];
  if (!rules) return [];

  const errors = [];
  for (const id of rules.htmlIds || []) {
    if (!hasId(html, id)) errors.push(`L element #${id} est attendu.`);
  }
  for (const className of rules.htmlClasses || []) {
    if (!hasExactClass(html, className)) errors.push(`La classe "${className}" est attendue pour le comportement.`);
  }
  for (const attr of rules.dataAttrs || []) {
    if (!hasDataAttr(html, attr)) errors.push(`L attribut data-${attr} est attendu.`);
  }
  for (const check of rules.jsChecks || []) {
    if (!testJsPattern(check, js)) errors.push(check.message || 'Le comportement JS attendu est absent.');
  }

  return errors;
}

function validateSubmission(projectId, htmlCode = '', jsCode = '') {
  const rules = VALIDATION_RULES[projectId];
  if (!rules) return ['Projet inconnu.'];

  const errors = [];
  const html = String(htmlCode || '');
  const js = String(jsCode || '');

  for (const tag of rules.htmlTags || []) {
    if (!hasTag(html, tag)) errors.push(`La balise <${tag}> est attendue.`);
  }

  for (const className of rules.classes || []) {
    if (!hasExactClass(html, className)) {
      errors.push(`La classe "${className}" est introuvable. Attention: elle est sensible aux majuscules/minuscules.`);
    }
  }

  for (const inputType of rules.inputTypes || []) {
    if (!hasInputType(html, inputType)) errors.push(`Un input de type "${inputType}" est attendu.`);
  }

  for (const attr of rules.dataAttrs || []) {
    if (!hasDataAttr(html, attr)) errors.push(`L attribut data-${attr} est attendu.`);
  }

  for (const rule of rules.minElements || []) {
    const count = countSelector(html, rule.selector);
    if (count < Number(rule.count || 0)) {
      errors.push(rule.message || `Il manque des elements ${rule.selector}.`);
    }
  }

  for (const name of rules.jsNames || []) {
    if (!hasJsName(js, name)) errors.push(`Le nom JavaScript "${name}" est attendu.`);
  }

  const behaviorErrors = validateBehaviorStatic(projectId, html, js);
  errors.push(...behaviorErrors);

  return errors;
}

function computeProjectXp({ usedHint, usedSolution, attempts }) {
  let xp = 50;
  if (!usedHint) xp += 10;
  if (!usedSolution) xp += 5;
  if ((Number(attempts) || 0) <= 1) xp += 5;
  if (usedSolution) xp -= 20;
  if ((Number(attempts) || 0) > 3) xp -= Math.min(10, (Number(attempts) - 3) * 2);
  return Math.max(20, xp);
}

module.exports = async function preparationRoutes(fastify) {
  fastify.get('/status', async (request, reply) => {
    if (!preparationEnabled()) {
      return reply.send({ enabled: false, authenticated: false, unlocked: false });
    }

    const auth = await verifyUser(request);
    if (!auth.valid) {
      return reply.send({
        enabled: true,
        authenticated: false,
        unlocked: false,
        reason: auth.reason
      });
    }

    const unlocked = verifyPreparationToken(request, auth.keyId);
    let profile = null;
    if (unlocked) {
      await db.ensurePreparationProfile(auth.keyId);
      profile = normalizeProfile(await db.getPreparationProfile(auth.keyId));
    }

    return reply.send({
      enabled: true,
      authenticated: true,
      unlocked,
      keyClass: auth.keyClass,
      storageKey: unlocked ? buildStorageKey(auth.keyId) : null,
      profile
    });
  });

  fastify.get('/config', async (request, reply) => {
    if (!preparationEnabled()) {
      return reply.send({
        enabled: false,
        projectCount: PROJECT_COUNT
      });
    }

    const auth = await verifyUser(request);
    return reply.send({
      enabled: true,
      authenticated: auth.valid,
      keyClass: auth.valid ? auth.keyClass : null,
      projectCount: PROJECT_COUNT,
      xp: {
        projectBase: 50,
        quizMax: 20,
        bonusNoHint: 10,
        bonusNoSolution: 5
      }
    });
  });

  fastify.post('/login', {
    config: {
      rateLimit: {
        max: 6,
        timeWindow: '1 minute'
      }
    }
  }, async (request, reply) => {
    if (!preparationEnabled()) {
      return reply.code(503).send({ success: false, enabled: false, message: 'Section desactivee.' });
    }

    const auth = await verifyUser(request);
    if (!auth.valid) {
      return reply.code(auth.reason === 'class' ? 403 : 401).send({
        success: false,
        message: auth.reason === 'class' ? 'Section reservee aux cles B2.' : 'Activez votre cle avant de continuer.'
      });
    }

    const { password } = request.body || {};
    if (!sameSecret(password, process.env.PREPARATION_PASSWORD)) {
      return reply.code(403).send({ success: false, message: 'Mot de passe incorrect.' });
    }

    await db.ensurePreparationProfile(auth.keyId);
    const token = signPreparationToken(auth.keyId);
    reply.setCookie(PREPARATION_COOKIE, token, cookieOptions());
    await db.logActivity('preparation_unlocked', {
      keyId: auth.keyId,
      scope: auth.scope,
      ip: request.ip,
      details: 'Section Preparation Web deverrouillee'
    });

    return reply.send({
      success: true,
      unlocked: true,
      storageKey: buildStorageKey(auth.keyId),
      profile: normalizeProfile(await db.getPreparationProfile(auth.keyId))
    });
  });

  fastify.get('/progress', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const [profile, progress, leaderboard] = await Promise.all([
      db.getPreparationProfile(auth.keyId),
      db.getPreparationProgress(auth.keyId),
      db.getPreparationLeaderboard(20)
    ]);

    return reply.send({
      success: true,
      storageKey: buildStorageKey(auth.keyId),
      profile: normalizeProfile(profile),
      progress: normalizeProgressRows(progress),
      leaderboard: normalizeLeaderboard(leaderboard)
    });
  });

  fastify.post('/progress', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const projectId = Number((request.body || {}).projectId);
    if (!projectId || projectId < 1 || projectId > PROJECT_COUNT) {
      return reply.code(400).send({ success: false, message: 'Projet invalide.' });
    }

    const rows = await db.getPreparationProgress(auth.keyId);
    if (!isProjectUnlocked(projectId, rows)) {
      return reply.code(403).send({ success: false, message: 'Respectez la chronologie des projets.' });
    }

    const saved = await db.savePreparationProgress(auth.keyId, request.body || {});
    return reply.send({ success: true, progress: normalizeProgressRows([saved])[0] });
  });

  fastify.post('/validate', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const body = request.body || {};
    const projectId = Number(body.projectId);
    if (!projectId || projectId < 1 || projectId > PROJECT_COUNT) {
      return reply.code(400).send({ success: false, message: 'Projet invalide.' });
    }

    const rows = await db.getPreparationProgress(auth.keyId);
    if (!isProjectUnlocked(projectId, rows)) {
      return reply.code(403).send({ success: false, message: 'Projet verrouille. Termine les etapes precedentes.' });
    }

    const errors = validateSubmission(projectId, body.htmlCode, body.jsCode);
    if (errors.length) {
      await db.savePreparationProgress(auth.keyId, {
        ...body,
        attempts: Number(body.attempts || 0)
      });
      return reply.code(422).send({ success: false, valid: false, errors });
    }

    const projectXp = computeProjectXp({
      usedHint: Boolean(body.usedHint),
      usedSolution: Boolean(body.usedSolution),
      attempts: Number(body.attempts || 0)
    });
    const completed = await db.completePreparationProject(auth.keyId, {
      ...body,
      projectXp
    });
    const [profile, leaderboard] = await Promise.all([
      db.getPreparationProfile(auth.keyId),
      db.getPreparationLeaderboard(20)
    ]);

    return reply.send({
      success: true,
      valid: true,
      projectXp,
      progress: normalizeProgressRows([completed])[0],
      profile: normalizeProfile(profile),
      leaderboard: normalizeLeaderboard(leaderboard)
    });
  });

  fastify.post('/solution', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const body = request.body || {};
    const projectId = Number(body.projectId);
    if (!projectId || projectId < 1 || projectId > PROJECT_COUNT) {
      return reply.code(400).send({ success: false, message: 'Projet invalide.' });
    }

    const rows = await db.getPreparationProgress(auth.keyId);
    if (!isProjectUnlocked(projectId, rows)) {
      return reply.code(403).send({ success: false, message: 'Projet verrouille. Termine les etapes precedentes.' });
    }

    const current = rows.find((row) => Number(row.project_id) === projectId);
    const attempts = Math.max(Number(body.attempts || 0), Number(current && current.attempts || 0));
    if (attempts < 2) {
      return reply.code(403).send({ success: false, message: 'La solution se debloque apres au moins deux echecs.' });
    }

    const solution = SOLUTIONS[projectId];
    if (!solution) {
      return reply.code(404).send({ success: false, message: 'Solution indisponible pour ce projet.' });
    }

    const saved = await db.savePreparationProgress(auth.keyId, {
      projectId,
      htmlCode: body.htmlCode || (current && current.html_code) || '',
      jsCode: body.jsCode || (current && current.js_code) || '',
      usedHint: Boolean(current && current.used_hint),
      usedSolution: true,
      attempts
    });

    return reply.send({
      success: true,
      solution,
      progress: normalizeProgressRows([saved])[0]
    });
  });

  fastify.post('/quiz', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const body = request.body || {};
    const projectId = Number(body.projectId);
    const score = Number(body.score || 0);
    const total = Number(body.total || 1);
    if (!projectId || projectId < 1 || projectId > PROJECT_COUNT) {
      return reply.code(400).send({ success: false, message: 'Projet invalide.' });
    }

    const rows = await db.getPreparationProgress(auth.keyId);
    const current = rows.find((row) => Number(row.project_id) === projectId);
    if (!current || !current.completed) {
      return reply.code(403).send({ success: false, message: 'Le quiz se debloque apres validation du projet.' });
    }

    const quizXp = Math.round(Math.max(0, Math.min(score, total)) * 20 / Math.max(total, 1));
    const saved = await db.recordPreparationQuiz(auth.keyId, {
      projectId,
      quizScore: score,
      quizXp
    });
    const [profile, leaderboard] = await Promise.all([
      db.getPreparationProfile(auth.keyId),
      db.getPreparationLeaderboard(20)
    ]);

    return reply.send({
      success: true,
      quizXp,
      progress: normalizeProgressRows([saved])[0],
      profile: normalizeProfile(profile),
      leaderboard: normalizeLeaderboard(leaderboard)
    });
  });

  fastify.get('/leaderboard', async (request, reply) => {
    const auth = await getAuthContext(request, reply, true);
    if (!auth) return;

    const leaderboard = await db.getPreparationLeaderboard(Number(request.query.limit || 20));
    return reply.send({ success: true, leaderboard: normalizeLeaderboard(leaderboard) });
  });
};
