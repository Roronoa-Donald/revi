const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const db = require('../db');

const JWT_SECRET = process.env.JWT_SECRET;
const IS_PROD = process.env.NODE_ENV === 'production';
const PREPARATION_COOKIE = 'preparation_token';
const PROJECT_COUNT = 10;

const VALIDATION_RULES = {
  1: {
    htmlTags: ['section', 'img', 'h1', 'p', 'ul', 'li', 'a'],
    classes: ['profile-card', 'profile-avatar', 'profile-name', 'profile-role', 'profile-bio', 'profile-skills', 'profile-link']
  },
  2: {
    htmlTags: ['article', 'img', 'h2', 'p', 'ul', 'li', 'button'],
    classes: ['product-card', 'product-image', 'product-title', 'product-price', 'product-description', 'product-features', 'buy-button']
  },
  3: {
    htmlTags: ['form', 'label', 'input', 'textarea', 'select', 'button'],
    classes: ['contact-form', 'form-row', 'form-label', 'form-input', 'form-textarea', 'form-select', 'submit-button'],
    inputTypes: ['text', 'email', 'password', 'checkbox', 'radio']
  },
  4: {
    htmlTags: ['header', 'section', 'h1', 'h2', 'p', 'ul', 'li', 'a'],
    classes: ['cv-card', 'cv-header', 'cv-name', 'cv-title', 'cv-section', 'skill-list', 'cv-contact']
  },
  5: {
    htmlTags: ['main', 'section', 'h1', 'h2', 'article', 'p', 'ul', 'li', 'a'],
    classes: ['portfolio-page', 'hero-section', 'portfolio-title', 'portfolio-tagline', 'portfolio-skills', 'skill-list', 'project-grid', 'project-card', 'contact-link']
  },
  6: {
    jsNames: ['score', 'incrementer']
  },
  7: {
    jsNames: ['score', 'checkAnswer']
  },
  8: {
    jsNames: ['addTodo']
  },
  9: {
    jsNames: ['calculate']
  },
  10: {
    htmlTags: ['button'],
    classes: ['game-board', 'choice-btn', 'score-board', 'result-message', 'reset-btn'],
    jsNames: ['choices', 'playRound', 'resetGame']
  }
};

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

const BEHAVIOR_RULES = {
  6: {
    htmlIds: ['countValue', 'incrementBtn'],
    jsChecks: [
      { pattern: /countValue/i, message: 'Le script doit lire ou mettre a jour #countValue.' },
      { pattern: /incrementBtn/i, message: 'Le script doit ecouter le clic de #incrementBtn.' },
      { pattern: /textContent|innerText/i, message: 'Le compteur doit mettre a jour le texte affiche.' }
    ]
  },
  7: {
    htmlClasses: ['answer'],
    htmlIds: ['quizFeedback', 'quizScore'],
    dataAttrs: ['correct'],
    jsChecks: [
      { pattern: /dataset|getAttribute\([^)]*data-correct/i, message: 'Le script doit lire data-correct.' },
      { pattern: /quizScore|score/i, message: 'Le script doit mettre a jour le score.' }
    ]
  },
  8: {
    htmlIds: ['todoInput', 'addTodoBtn', 'todoList'],
    jsChecks: [
      { pattern: /createElement\(['"]li['"]\)/i, message: 'La todo doit creer un element li.' },
      { pattern: /appendChild|append\(/i, message: 'La todo doit ajouter le li a la liste.' }
    ]
  },
  9: {
    htmlIds: ['numberA', 'numberB', 'calcResult'],
    dataAttrs: ['op'],
    jsChecks: [
      { pattern: /Number\(|parseFloat\(/i, message: 'La calculatrice doit convertir les valeurs en nombres.' },
      { pattern: /calcResult/i, message: 'Le script doit mettre a jour #calcResult.' }
    ]
  },
  10: {
    htmlClasses: ['choice-btn'],
    htmlIds: ['playerScore', 'botScore', 'resultMessage', 'resetBtn'],
    dataAttrs: ['choice'],
    jsChecks: [
      { pattern: /Math\.random/i, message: 'Le bot doit faire un choix aleatoire.' },
      { pattern: /resultMessage/i, message: 'Le script doit afficher le message de resultat.' },
      { pattern: /reset/i, message: 'Le script doit gerer le bouton reset.' }
    ]
  }
};

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
    if (check.pattern && !check.pattern.test(js)) errors.push(check.message || 'Le comportement JS attendu est absent.');
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
