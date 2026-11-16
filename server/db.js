const { Pool } = require('pg');
const PREPARATION_CURRICULUM_VERSION = 2;

let pool;

/**
 * Initialise la connexion PostgreSQL et crée les tables
 */
async function initDB() {
  const dbUrl = process.env.DATABASE_URL || '';
  const needsSSL = dbUrl.includes('sslmode=require') || dbUrl.includes('sslmode=verify') || process.env.NODE_ENV === 'production';

  // Retirer sslmode de l'URL pour éviter que pg le convertisse en verify-full
  const cleanUrl = dbUrl.replace(/[?&]sslmode=[^&]*/g, '').replace(/\?$/, '');

  pool = new Pool({
    connectionString: cleanUrl,
    ssl: needsSSL ? { rejectUnauthorized: false } : false
  });

  // Protection contre les erreurs de pool non gérées
  pool.on('error', (err) => {
    console.error(' Erreur inattendue du pool PostgreSQL:', err.message);
  });

  // Test de connexion
  const client = await pool.connect();
  console.log(' Connexion PostgreSQL établie');

  // Création des tables — via le système de migrations partagé (un seul format)
  // server/migrations/*.sql + bookkeeping schema_migrations.
  // Le build Vercel (scripts/migrate.js) applique en amont ; ici = filet de sécurité cold start.
  const MIGRATIONS_DIR = require('path').resolve(__dirname, 'migrations');
  const fs = require('fs');
  const files = fs.existsSync(MIGRATIONS_DIR)
    ? fs.readdirSync(MIGRATIONS_DIR).filter(f => f.endsWith('.sql') && /^\d{3}_/.test(f)).sort()
    : [];

  await client.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      name TEXT PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
  const { rows: appliedRows } = await client.query('SELECT name FROM schema_migrations');
  const appliedSet = new Set(appliedRows.map(r => r.name));

  let appliedCount = 0;
  for (const file of files) {
    if (appliedSet.has(file)) continue;
    const sql = fs.readFileSync(require('path').join(MIGRATIONS_DIR, file), 'utf8');
    await client.query('BEGIN');
    try {
      await client.query(sql);
      await client.query('INSERT INTO schema_migrations (name) VALUES ($1)', [file]);
      await client.query('COMMIT');
      appliedCount += 1;
      console.log(`    migration ${file} appliquée (runtime)`);
    } catch (err) {
      await client.query('ROLLBACK');
      throw new Error(`Migration ${file} échouée au runtime: ${err.message}`);
    }
  }
  if (appliedCount === 0) console.log(' Schéma à jour (aucune migration à appliquer)');
  client.release();
}

/**
 * Exécute une requête SQL
 */
let customQueryRunner = null;

function isConnected() {
  return Boolean(pool || typeof customQueryRunner === 'function');
}

function setQueryRunnerForTest(fn) {
  customQueryRunner = typeof fn === 'function' ? fn : null;
}

async function query(text, params) {
  if (typeof customQueryRunner === 'function') {
    return customQueryRunner(text, params);
  }
  return pool.query(text, params);
}

// ========================
// CRUD Clés d'activation
// ========================

async function createKey(keyCode, scope, note, expiresAt, keyClass) {
  const result = await query(
    'INSERT INTO activation_keys (key_code, scope, note, expires_at, class) VALUES ($1, $2, $3, COALESCE($4, CURRENT_TIMESTAMP + INTERVAL \'30 days\'), $5) RETURNING *',
    [keyCode, scope, note || null, expiresAt || null, keyClass || 'b2']
  );
  return result.rows[0];
}

async function getKeyByCode(keyCode) {
  const result = await query('SELECT * FROM activation_keys WHERE key_code = $1', [keyCode]);
  return result.rows[0];
}

async function getKeyById(id) {
  const result = await query('SELECT * FROM activation_keys WHERE id = $1', [id]);
  return result.rows[0];
}

async function getAllKeys(filter, search) {
  let sql = 'SELECT * FROM activation_keys';
  const conditions = [];
  const params = [];

  if (filter === 'active') {
    conditions.push('is_active = TRUE AND is_used = FALSE');
  } else if (filter === 'used') {
    conditions.push('is_used = TRUE');
  } else if (filter === 'revoked') {
    conditions.push('is_active = FALSE');
  } else if (filter === 'expired') {
    conditions.push('expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP');
  }

  if (search && search.trim()) {
    params.push('%' + search.trim() + '%');
    conditions.push('(key_code ILIKE $' + params.length + ' OR note ILIKE $' + params.length + ' OR scope ILIKE $' + params.length + ')');
  }

  if (conditions.length > 0) {
    sql += ' WHERE ' + conditions.join(' AND ');
  }

  sql += ' ORDER BY created_at DESC';
  const result = await query(sql, params);
  return result.rows;
}

async function markKeyUsed(keyId, fingerprint) {
  const result = await query(
    'UPDATE activation_keys SET is_used = TRUE, used_at = CURRENT_TIMESTAMP, machine_fingerprint = $1 WHERE id = $2 RETURNING *',
    [fingerprint, keyId]
  );
  return result.rows[0];
}

async function resetKey(keyId) {
  // Invalider toutes les sessions liées
  await query('UPDATE sessions SET is_valid = FALSE WHERE key_id = $1', [keyId]);
  // Réinitialiser la clé
  const result = await query(
    'UPDATE activation_keys SET is_used = FALSE, used_at = NULL, machine_fingerprint = NULL WHERE id = $1 RETURNING *',
    [keyId]
  );
  return result.rows[0];
}

async function revokeKey(keyId) {
  // Invalider toutes les sessions liées
  await query('UPDATE sessions SET is_valid = FALSE WHERE key_id = $1', [keyId]);
  // Désactiver la clé
  const result = await query(
    'UPDATE activation_keys SET is_active = FALSE WHERE id = $1 RETURNING *',
    [keyId]
  );
  return result.rows[0];
}

async function reactivateKey(keyId) {
  const result = await query(
    'UPDATE activation_keys SET is_active = TRUE WHERE id = $1 RETURNING *',
    [keyId]
  );
  return result.rows[0];
}

async function renewKey(keyId) {
  const result = await query(
    'UPDATE activation_keys SET expires_at = CURRENT_TIMESTAMP + INTERVAL \'30 days\', renewed_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *',
    [keyId]
  );
  return result.rows[0];
}

async function deleteKey(keyId) {
  await query('DELETE FROM sessions WHERE key_id = $1', [keyId]);
  await query('DELETE FROM activation_keys WHERE id = $1', [keyId]);
}

// ========================
// CRUD Sessions
// ========================

async function createSession(keyId, jti, fingerprint, platform) {
  const result = await query(
    'INSERT INTO sessions (key_id, jti, machine_fingerprint, platform) VALUES ($1, $2, $3, $4) RETURNING *',
    [keyId, jti, fingerprint, platform || 'b2']
  );
  return result.rows[0];
}

async function getSessionByJti(jti) {
  const result = await query('SELECT * FROM sessions WHERE jti = $1', [jti]);
  return result.rows[0];
}

async function isSessionValid(jti) {
  if (!jti) return false;
  const session = await getSessionByJti(jti);
  if (!session || !session.is_valid) return false;
  if (session.expires_at && new Date(session.expires_at) <= new Date()) return false;
  return true;
}

async function getAllSessions() {
  const result = await query(`
    SELECT s.*, k.key_code, k.scope, k.note
    FROM sessions s
    JOIN activation_keys k ON s.key_id = k.id
    ORDER BY s.created_at DESC
  `);
  return result.rows;
}

async function revokeSession(sessionId) {
  const result = await query(
    'UPDATE sessions SET is_valid = FALSE WHERE id = $1 RETURNING *',
    [sessionId]
  );
  return result.rows[0];
}

async function revokeSessionByJti(jti) {
  const result = await query(
    'UPDATE sessions SET is_valid = FALSE WHERE jti = $1 RETURNING *',
    [jti]
  );
  return result.rows[0];
}

async function updateSessionVerified(jti) {
  await query('UPDATE sessions SET last_verified = CURRENT_TIMESTAMP WHERE jti = $1', [jti]);
}

// ========================
// Preparation Web
// ========================

function preparationDisplayNameFromKey(keyRecord) {
  const note = keyRecord && keyRecord.note ? String(keyRecord.note).trim() : '';
  if (note) return note.slice(0, 80);
  return `Apprenant #${keyRecord.id}`;
}

async function ensurePreparationProfile(userId, displayName) {
  if (!userId) throw new Error('userId requis');
  const cleanName = displayName && String(displayName).trim()
    ? String(displayName).trim().slice(0, 80)
    : null;
  const result = await query(`
    INSERT INTO preparation_profiles (user_id, display_name, last_activity)
    VALUES ($1, COALESCE($2, 'Apprenant #' || $1::text), CURRENT_TIMESTAMP)
    ON CONFLICT (user_id) WHERE user_id IS NOT NULL DO UPDATE SET
      display_name = COALESCE($2, preparation_profiles.display_name),
      last_activity = CURRENT_TIMESTAMP
    RETURNING *
  `, [userId, cleanName]);

  return result.rows[0];
}

async function getPreparationProfile(userId) {
  if (!userId) throw new Error('userId requis');
  const result = await query(`
    SELECT p.*, COALESCE(r.position, 0) AS rank
    FROM preparation_profiles p
    LEFT JOIN (
      SELECT user_id, RANK() OVER (ORDER BY total_xp DESC, projects_completed DESC, last_activity ASC) AS position
      FROM preparation_profiles
      WHERE user_id IS NOT NULL
    ) r ON r.user_id = p.user_id
    WHERE p.user_id = $1
  `, [userId]);
  return result.rows[0] || null;
}

async function getPreparationProgress(userId) {
  if (!userId) throw new Error('userId requis');
  const result = await query(`
    SELECT
      project_id,
      html_code,
      js_code,
      completed,
      project_xp,
      quiz_xp,
      quiz_score,
      quiz_completed,
      used_hint,
      used_solution,
      attempts,
      updated_at
    FROM preparation_progress
    WHERE user_id = $1 AND curriculum_version = $2
    ORDER BY project_id ASC
  `, [userId, PREPARATION_CURRICULUM_VERSION]);
  return result.rows;
}

async function refreshPreparationTotals(userId) {
  if (!userId) throw new Error('userId requis');
  const result = await query(`
    UPDATE preparation_profiles
    SET
      total_xp = (
        SELECT COALESCE(SUM(project_xp + quiz_xp), 0)
        FROM preparation_progress
        WHERE user_id = $1 AND curriculum_version = $2
      ),
      projects_completed = (
        SELECT COUNT(*)
        FROM preparation_progress
        WHERE user_id = $1 AND completed = TRUE AND curriculum_version = $2
      ),
      last_activity = CURRENT_TIMESTAMP
    WHERE user_id = $1
    RETURNING *
  `, [userId, PREPARATION_CURRICULUM_VERSION]);
  return result.rows[0] || null;
}

async function savePreparationProgress(userId, data = {}) {
  if (!userId) throw new Error('userId requis');
  const projectId = Number(data.projectId);
  if (!projectId || projectId < 1) throw new Error('projectId requis');

  const result = await query(`
    INSERT INTO preparation_progress (
      user_id, project_id, html_code, js_code, used_hint, used_solution, attempts, curriculum_version, updated_at
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, project_id) WHERE user_id IS NOT NULL DO UPDATE SET
      html_code = EXCLUDED.html_code,
      js_code = EXCLUDED.js_code,
      used_hint = preparation_progress.used_hint OR EXCLUDED.used_hint,
      used_solution = preparation_progress.used_solution OR EXCLUDED.used_solution,
      attempts = GREATEST(preparation_progress.attempts, EXCLUDED.attempts),
      curriculum_version = EXCLUDED.curriculum_version,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `, [
    userId,
    projectId,
    data.htmlCode || '',
    data.jsCode || '',
    Boolean(data.usedHint),
    Boolean(data.usedSolution),
    Number(data.attempts || 0),
    PREPARATION_CURRICULUM_VERSION
  ]);

  await refreshPreparationTotals(userId);
  return result.rows[0];
}

async function completePreparationProject(userId, data = {}) {
  if (!userId) throw new Error('userId requis');
  const projectId = Number(data.projectId);
  if (!projectId || projectId < 1) throw new Error('projectId requis');

  const result = await query(`
    INSERT INTO preparation_progress (
      user_id, project_id, html_code, js_code, completed, project_xp,
      used_hint, used_solution, attempts, curriculum_version, updated_at
    )
    VALUES ($1, $2, $3, $4, TRUE, $5, $6, $7, $8, $9, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, project_id) WHERE user_id IS NOT NULL DO UPDATE SET
      html_code = EXCLUDED.html_code,
      js_code = EXCLUDED.js_code,
      completed = TRUE,
      project_xp = GREATEST(preparation_progress.project_xp, EXCLUDED.project_xp),
      used_hint = preparation_progress.used_hint OR EXCLUDED.used_hint,
      used_solution = preparation_progress.used_solution OR EXCLUDED.used_solution,
      attempts = GREATEST(preparation_progress.attempts, EXCLUDED.attempts),
      curriculum_version = EXCLUDED.curriculum_version,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `, [
    userId,
    projectId,
    data.htmlCode || '',
    data.jsCode || '',
    Number(data.projectXp || 0),
    Boolean(data.usedHint),
    Boolean(data.usedSolution),
    Number(data.attempts || 0),
    PREPARATION_CURRICULUM_VERSION
  ]);

  await refreshPreparationTotals(userId);
  return result.rows[0];
}

async function recordPreparationQuiz(userId, data = {}) {
  if (!userId) throw new Error('userId requis');
  const projectId = Number(data.projectId);
  if (!projectId || projectId < 1) throw new Error('projectId requis');

  const result = await query(`
    INSERT INTO preparation_progress (
      user_id, project_id, quiz_completed, quiz_score, quiz_xp, curriculum_version, updated_at
    )
    VALUES ($1, $2, TRUE, $3, $4, $5, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id, project_id) WHERE user_id IS NOT NULL DO UPDATE SET
      quiz_completed = TRUE,
      quiz_score = GREATEST(preparation_progress.quiz_score, EXCLUDED.quiz_score),
      quiz_xp = GREATEST(preparation_progress.quiz_xp, EXCLUDED.quiz_xp),
      curriculum_version = EXCLUDED.curriculum_version,
      updated_at = CURRENT_TIMESTAMP
    RETURNING *
  `, [
    userId,
    projectId,
    Number(data.quizScore || 0),
    Number(data.quizXp || 0),
    PREPARATION_CURRICULUM_VERSION
  ]);

  await refreshPreparationTotals(userId);
  return result.rows[0];
}

async function getPreparationLeaderboard(limit = 20) {
  const result = await query(`
    SELECT
      display_name,
      total_xp,
      projects_completed,
      last_activity,
      RANK() OVER (ORDER BY total_xp DESC, projects_completed DESC, last_activity ASC) AS rank
    FROM preparation_profiles
    WHERE user_id IS NOT NULL
    ORDER BY total_xp DESC, projects_completed DESC, last_activity ASC
    LIMIT $1
  `, [Math.min(Math.max(Number(limit) || 20, 1), 50)]);
  return result.rows;
}

// ========================
// Statistiques
// ========================

async function getStats() {
  const result = await query(`
    SELECT
      (SELECT COUNT(*) FROM activation_keys) as total_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE is_used = TRUE AND is_active = TRUE) as used_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE is_used = FALSE AND is_active = TRUE) as available_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE is_active = FALSE) as revoked_keys,
      (SELECT COUNT(*) FROM sessions WHERE is_valid = TRUE) as active_sessions,
      (SELECT COUNT(*) FROM activation_keys WHERE expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP) as expired_keys
  `);
  return result.rows[0];
}

/**
 * Stats par cours
 */
async function getStatsByCourse() {
  const result = await query(`
    SELECT
      unnest(string_to_array(scope, ',')) as course,
      COUNT(*) as total_keys,
      COUNT(*) FILTER (WHERE is_used = TRUE AND is_active = TRUE) as used_keys,
      COUNT(*) FILTER (WHERE is_used = FALSE AND is_active = TRUE) as available_keys,
      COUNT(*) FILTER (WHERE is_active = FALSE) as revoked_keys
    FROM activation_keys
    WHERE scope != 'all'
    GROUP BY course
    ORDER BY course
  `);
  // Ajouter les stats pour 'all'
  const allResult = await query(`
    SELECT
      COUNT(*) as total_keys,
      COUNT(*) FILTER (WHERE is_used = TRUE AND is_active = TRUE) as used_keys,
      COUNT(*) FILTER (WHERE is_used = FALSE AND is_active = TRUE) as available_keys,
      COUNT(*) FILTER (WHERE is_active = FALSE) as revoked_keys
    FROM activation_keys
    WHERE scope = 'all'
  `);
  return {
    byCourse: result.rows,
    allScope: allResult.rows[0]
  };
}

// ========================
// Logs d'activité
// ========================

async function logActivity(eventType, data = {}) {
  try {
    await query(
      `INSERT INTO activity_logs (event_type, key_id, session_id, key_code, scope, course, ip_address, machine_fingerprint, details, user_id, email)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
      [
        eventType,
        data.keyId || null,
        data.sessionId || null,
        data.keyCode || null,
        data.scope || null,
        data.course || null,
        data.ip || null,
        data.fingerprint || null,
        data.details || null,
        data.userId || null,
        data.email || null
      ]
    );
  } catch (err) {
    console.error('Erreur log activité:', err.message);
  }
}

async function getActivityLogs(limit = 100, offset = 0, eventType = null) {
  let sql = 'SELECT * FROM activity_logs';
  const params = [];
  if (eventType) {
    params.push(eventType);
    sql += ' WHERE event_type = $1';
  }
  sql += ' ORDER BY created_at DESC';
  params.push(limit);
  sql += ' LIMIT $' + params.length;
  params.push(offset);
  sql += ' OFFSET $' + params.length;
  const result = await query(sql, params);
  return result.rows;
}

async function getActivityLogsCount(eventType = null) {
  let sql = 'SELECT COUNT(*) as count FROM activity_logs';
  const params = [];
  if (eventType) {
    params.push(eventType);
    sql += ' WHERE event_type = $1';
  }
  const result = await query(sql, params);
  return parseInt(result.rows[0].count);
}

// ========================
// Class-filtered functions (B1/B2 separation)
// ========================

async function getAllKeysByClass(keyClass, filter, search) {
  let sql = 'SELECT * FROM activation_keys';
  const conditions = ['class = $1'];
  const params = [keyClass];

  if (filter === 'active') {
    conditions.push('is_active = TRUE AND is_used = FALSE');
  } else if (filter === 'used') {
    conditions.push('is_used = TRUE');
  } else if (filter === 'revoked') {
    conditions.push('is_active = FALSE');
  } else if (filter === 'expired') {
    conditions.push('expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP');
  }

  if (search && search.trim()) {
    params.push('%' + search.trim() + '%');
    conditions.push('(key_code ILIKE $' + params.length + ' OR note ILIKE $' + params.length + ' OR scope ILIKE $' + params.length + ')');
  }

  sql += ' WHERE ' + conditions.join(' AND ');
  sql += ' ORDER BY created_at DESC';
  const result = await query(sql, params);
  return result.rows;
}

async function getStatsByClass(keyClass) {
  const result = await query(`
    SELECT
      (SELECT COUNT(*) FROM activation_keys WHERE class = $1) as total_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE class = $1 AND is_used = TRUE AND is_active = TRUE) as used_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE class = $1 AND is_used = FALSE AND is_active = TRUE) as available_keys,
      (SELECT COUNT(*) FROM activation_keys WHERE class = $1 AND is_active = FALSE) as revoked_keys,
      (SELECT COUNT(*) FROM sessions s JOIN activation_keys k ON s.key_id = k.id WHERE k.class = $1 AND s.is_valid = TRUE) as active_sessions,
      (SELECT COUNT(*) FROM activation_keys WHERE class = $1 AND expires_at IS NOT NULL AND expires_at < CURRENT_TIMESTAMP) as expired_keys
  `, [keyClass]);
  return result.rows[0];
}

async function getStatsByCourseByClass(keyClass) {
  const result = await query(`
    SELECT
      unnest(string_to_array(scope, ',')) as course,
      COUNT(*) as total_keys,
      COUNT(*) FILTER (WHERE is_used = TRUE AND is_active = TRUE) as used_keys,
      COUNT(*) FILTER (WHERE is_used = FALSE AND is_active = TRUE) as available_keys,
      COUNT(*) FILTER (WHERE is_active = FALSE) as revoked_keys
    FROM activation_keys
    WHERE scope != 'all' AND class = $1
    GROUP BY course
    ORDER BY course
  `, [keyClass]);
  const allResult = await query(`
    SELECT
      COUNT(*) as total_keys,
      COUNT(*) FILTER (WHERE is_used = TRUE AND is_active = TRUE) as used_keys,
      COUNT(*) FILTER (WHERE is_used = FALSE AND is_active = TRUE) as available_keys,
      COUNT(*) FILTER (WHERE is_active = FALSE) as revoked_keys
    FROM activation_keys
    WHERE scope = 'all' AND class = $1
  `, [keyClass]);
  return {
    byCourse: result.rows,
    allScope: allResult.rows[0]
  };
}

async function getAllSessionsByClass(keyClass) {
  const result = await query(`
    SELECT s.*, k.key_code, k.scope, k.note
    FROM sessions s
    JOIN activation_keys k ON s.key_id = k.id
    WHERE k.class = $1
    ORDER BY s.created_at DESC
  `, [keyClass]);
  return result.rows;
}

async function getActivityLogsByClass(keyClass, limit = 100, offset = 0, eventType = null) {
  let sql = `SELECT al.* FROM activity_logs al
    LEFT JOIN activation_keys ak ON al.key_id = ak.id
    WHERE (ak.class = $1 OR al.key_id IS NULL)`;
  const params = [keyClass];
  if (eventType) {
    params.push(eventType);
    sql += ' AND al.event_type = $' + params.length;
  }
  sql += ' ORDER BY al.created_at DESC';
  params.push(limit);
  sql += ' LIMIT $' + params.length;
  params.push(offset);
  sql += ' OFFSET $' + params.length;
  const result = await query(sql, params);
  return result.rows;
}

async function getActivityLogsCountByClass(keyClass, eventType = null) {
  let sql = `SELECT COUNT(*) as count FROM activity_logs al
    LEFT JOIN activation_keys ak ON al.key_id = ak.id
    WHERE (ak.class = $1 OR al.key_id IS NULL)`;
  const params = [keyClass];
  if (eventType) {
    params.push(eventType);
    sql += ' AND al.event_type = $' + params.length;
  }
  const result = await query(sql, params);
  return parseInt(result.rows[0].count);
}

// ========================
// Users (comptes email + mot de passe)
// ========================

async function getUserByEmail(email) {
  const result = await query('SELECT * FROM users WHERE email = $1', [String(email || '').toLowerCase().trim()]);
  return result.rows[0] || null;
}

async function getUserById(id) {
  const result = await query('SELECT * FROM users WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function createUser(email, passwordHash, displayName, level) {
  const lvl = ['b1', 'b2', 'b3'].includes(String(level || '').toLowerCase()) ? String(level).toLowerCase() : 'b2';
  const cleanName = displayName && String(displayName).trim()
    ? String(displayName).trim().slice(0, 120)
    : null;
  const result = await query(
    `INSERT INTO users (email, password_hash, display_name, level)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [String(email).toLowerCase().trim().slice(0, 255), passwordHash, cleanName, lvl]
  );
  return result.rows[0];
}

async function setUserLevel(userId, level) {
  const lvl = ['b1', 'b2', 'b3'].includes(String(level || '').toLowerCase()) ? String(level).toLowerCase() : null;
  if (!lvl) return null;
  const result = await query(
    'UPDATE users SET level = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [lvl, userId]
  );
  return result.rows[0] || null;
}

async function touchUserLogin(userId, fingerprintHash) {
  await query(
    'UPDATE users SET last_login_at = CURRENT_TIMESTAMP, last_fingerprint = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2',
    [fingerprintHash || null, userId]
  );
}

/**
 * Abonnement actif ? (status active + expiry future)
 */
function hasActiveSubscription(user) {
  if (!user || user.subscription_status !== 'active') return false;
  if (!user.subscription_expires_at) return true; // actif sans échéance = illimité
  return new Date(user.subscription_expires_at) > new Date();
}

/**
 * Étend l'abonnement de `months` mois. Si l'abonnement courant est encore
 * valide, la nouvelle période s'ajoute après l'échéance existante (renouvellement
 * anticipé sans perte). Sinon, démarre maintenant.
 */
async function extendSubscription(userId, months, source) {
  const user = await getUserById(userId);
  if (!user) return null;

  const currentValid = hasActiveSubscription(user);
  const base = currentValid && user.subscription_expires_at ? new Date(user.subscription_expires_at) : new Date();
  base.setMonth(base.getMonth() + Math.max(1, Math.min(12, Number(months) || 1)));

  const result = await query(
    `UPDATE users
     SET subscription_status = 'active',
         subscription_expires_at = $1,
         subscription_source = $2,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $3 RETURNING *`,
    [base.toISOString(), source || 'admin', userId]
  );
  return result.rows[0];
}

async function setSubscription(userId, status, expiresAt, source) {
  const result = await query(
    `UPDATE users
     SET subscription_status = $1,
         subscription_expires_at = $2,
         subscription_source = $3,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $4 RETURNING *`,
    [status, expiresAt || null, source || 'admin', userId]
  );
  return result.rows[0];
}

// ========================
// Password reset tokens
// ========================

async function createPasswordResetToken(userId, tokenHash, ttlMinutes) {
  // Purge : tokens expirés ou utilisés de plus de 7 jours
  await query(
    `DELETE FROM password_reset_tokens
     WHERE expires_at < CURRENT_TIMESTAMP - INTERVAL '7 days'
        OR (used_at IS NOT NULL AND used_at < CURRENT_TIMESTAMP - INTERVAL '7 days')`
  );
  const result = await query(
    `INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
     VALUES ($1, $2, CURRENT_TIMESTAMP + ($3 || ' minutes')::interval)
     RETURNING *`,
    [userId, tokenHash, String(ttlMinutes || 30)]
  );
  return result.rows[0];
}

async function getValidPasswordResetToken(tokenHash) {
  const result = await query(
    `SELECT * FROM password_reset_tokens
     WHERE token_hash = $1 AND used_at IS NULL AND expires_at > CURRENT_TIMESTAMP`,
    [tokenHash]
  );
  return result.rows[0] || null;
}

async function consumePasswordResetToken(id) {
  await query('UPDATE password_reset_tokens SET used_at = CURRENT_TIMESTAMP WHERE id = $1', [id]);
}

async function updateUserPassword(userId, passwordHash) {
  // Parano : révoque toutes les sessions du user après un reset
  await query('UPDATE sessions SET is_valid = FALSE WHERE user_id = $1', [userId]);
  const result = await query(
    'UPDATE users SET password_hash = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *',
    [passwordHash, userId]
  );
  return result.rows[0];
}

// ========================
// Payments (FedaPay)
// ========================

async function createPayment(data = {}) {
  const result = await query(
    `INSERT INTO payments (user_id, fedapay_transaction_id, fedapay_customer_id, amount, currency, description, status, months_granted, merchant_reference, plan, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
    [
      data.userId || null,
      data.fedapayTransactionId || null,
      data.fedapayCustomerId || null,
      Number(data.amount || 0),
      data.currency || 'XOF',
      data.description || null,
      data.status || 'pending',
      Number(data.monthsGranted || 1),
      data.merchantReference || null,
      data.plan || 'monthly',
      data.metadata ? JSON.stringify(data.metadata) : null
    ]
  );
  return result.rows[0];
}

async function getPaymentByTxId(fedapayTransactionId) {
  const result = await query('SELECT * FROM payments WHERE fedapay_transaction_id = $1', [String(fedapayTransactionId)]);
  return result.rows[0] || null;
}

async function getPaymentByMerchantRef(merchantReference) {
  if (!merchantReference) return null;
  const result = await query('SELECT * FROM payments WHERE merchant_reference = $1', [String(merchantReference)]);
  return result.rows[0] || null;
}

async function getPaymentById(id) {
  const result = await query('SELECT * FROM payments WHERE id = $1', [id]);
  return result.rows[0] || null;
}

async function updatePaymentStatus(id, status, extra = {}) {
  const result = await query(
    `UPDATE payments
     SET status = $1,
         fedapay_transaction_id = COALESCE($2, fedapay_transaction_id),
         fedapay_customer_id = COALESCE($3, fedapay_customer_id),
         period_start = COALESCE($4, period_start),
         period_end = COALESCE($5, period_end),
         merchant_reference = COALESCE($6, merchant_reference),
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $7 RETURNING *`,
    [status, extra.fedapayTransactionId || null, extra.fedapayCustomerId || null, extra.periodStart || null, extra.periodEnd || null, extra.merchantReference || null, id]
  );
  return result.rows[0];
}

async function getLatestPaymentForUser(userId) {
  const result = await query(
    'SELECT * FROM payments WHERE user_id = $1 ORDER BY created_at DESC LIMIT 1',
    [userId]
  );
  return result.rows[0] || null;
}

/**
 * Réserve atomiquement une transaction FedaPay pour crédit d'abonnement (anti-rejeu).
 * Retourne la ligne insérée si la réservation a réussi, ou null si la transaction a déjà été créditée.
 */
async function claimFedapayTransaction(transactionId, { paymentId = null, userId = null, source = 'callback' } = {}) {
  const txIdStr = String(transactionId || '').trim();
  if (!txIdStr) return null;
  const result = await query(
    `INSERT INTO fedapay_credited_transactions (transaction_id, payment_id, user_id, source)
     VALUES ($1, $2, $3, $4)
     ON CONFLICT (transaction_id) DO NOTHING
     RETURNING *`,
    [txIdStr, paymentId || null, userId || null, source || 'callback']
  );
  return result.rows[0] || null;
}

async function recordWebhookEvent(data = {}) {
  const result = await query(
    `INSERT INTO payment_webhook_events (event_id, event_name, transaction_id, payload, processed_at)
     VALUES ($1, $2, $3, $4, $5)
     ON CONFLICT (event_id) DO NOTHING
     RETURNING *`,
    [
      data.eventId,
      data.eventName || null,
      data.transactionId || null,
      data.payload ? JSON.stringify(data.payload) : null,
      data.processedAt || null
    ]
  );
  return result.rows[0] || null;
}

async function getWebhookEvent(eventId) {
  if (!eventId) return null;
  const result = await query('SELECT * FROM payment_webhook_events WHERE event_id = $1', [String(eventId)]);
  return result.rows[0] || null;
}

async function markWebhookEventProcessed(eventId) {
  if (!eventId) return null;
  const result = await query(
    'UPDATE payment_webhook_events SET processed_at = CURRENT_TIMESTAMP WHERE event_id = $1 RETURNING *',
    [String(eventId)]
  );
  return result.rows[0] || null;
}

// ========================
// Lot 3A : Progression étudiant, Exercices, Leitner, Examens QCM & Quotas
// (Avec dégradation gracieuse en mémoire lorsque pool PostgreSQL est absent)
// ========================

const memChapterProgress = new Map();
const memExerciseAttempts = new Map();
const memFlashcardLeitner = new Map();
const memExamSessions = new Map();
const memActiveExamByUserCourse = new Map();
const memPracticeExams = new Map();
const memExecutionQuota = new Map();

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function clearMemoryStoresForTest() {
  memChapterProgress.clear();
  memExerciseAttempts.clear();
  memFlashcardLeitner.clear();
  memExamSessions.clear();
  memActiveExamByUserCourse.clear();
  memPracticeExams.clear();
  memExecutionQuota.clear();
}

/**
 * Convertit et valide strictement un identifiant utilisateur SQL (entier > 0).
 */
function toDbUserId(userId) {
  if (typeof userId === 'number') {
    if (Number.isInteger(userId) && userId > 0) return userId;
    throw new Error('userId invalide : entier positif requis');
  }
  const str = String(userId != null ? userId : '').trim();
  if (/^\d+$/.test(str)) {
    const parsed = parseInt(str, 10);
    if (Number.isSafeInteger(parsed) && parsed > 0) return parsed;
  }
  throw new Error('userId invalide : entier positif requis');
}

async function upsertChapterProgress(userId, courseId, chapterNum, masteryChecked = true) {
  if (userId == null) throw new Error('userId requis');
  if (!courseId || typeof courseId !== 'string') throw new Error('courseId requis');
  const num = Number(chapterNum);
  if (!Number.isInteger(num) || num < 1) throw new Error('chapterNum invalide');

  const uid = toDbUserId(userId);
  const checked = Boolean(masteryChecked);
  const nowIso = new Date().toISOString();
  const memKey = `${uid}::${courseId}::${num}`;
  const memRow = {
    user_id: uid,
    course_id: courseId,
    chapter_num: num,
    mastery_checked: checked,
    updated_at: nowIso
  };
  memChapterProgress.set(memKey, memRow);

  if (isConnected()) {
    try {
      const result = await query(
        `INSERT INTO user_chapter_progress (user_id, course_id, chapter_num, mastery_checked, updated_at)
         VALUES ($1, $2, $3, $4, NOW())
         ON CONFLICT (user_id, course_id, chapter_num) DO UPDATE SET
           mastery_checked = EXCLUDED.mastery_checked,
           updated_at = NOW()
         RETURNING *`,
        [uid, courseId, num, checked]
      );
      if (result && result.rows && result.rows[0]) {
        memChapterProgress.set(memKey, result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur upsertChapterProgress:', err.message);
      }
    }
  }
  return memRow;
}

async function getChapterProgress(userId, courseId = null) {
  if (userId == null) return [];
  const uid = toDbUserId(userId);

  if (isConnected()) {
    try {
      const sql = courseId
        ? 'SELECT * FROM user_chapter_progress WHERE user_id = $1 AND course_id = $2 ORDER BY course_id ASC, chapter_num ASC'
        : 'SELECT * FROM user_chapter_progress WHERE user_id = $1 ORDER BY course_id ASC, chapter_num ASC';
      const params = courseId ? [uid, courseId] : [uid];
      const result = await query(sql, params);
      if (result && Array.isArray(result.rows) && result.rows.length > 0) {
        return result.rows;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getChapterProgress:', err.message);
      }
    }
  }

  const rows = [];
  for (const row of memChapterProgress.values()) {
    if (row.user_id === uid && (!courseId || row.course_id === courseId)) {
      rows.push(row);
    }
  }
  return rows.sort((a, b) => a.course_id.localeCompare(b.course_id) || a.chapter_num - b.chapter_num);
}

async function upsertExerciseAttempt(userId, exerciseId, data = {}) {
  if (userId == null) throw new Error('userId requis');
  if (!exerciseId || typeof exerciseId !== 'string') throw new Error('exerciseId requis');

  const uid = toDbUserId(userId);
  const memKey = `${uid}::${exerciseId}`;
  const existing = memExerciseAttempts.get(memKey) || {
    user_id: uid,
    exercise_id: exerciseId,
    attempts_count: 0,
    solved: false,
    best_passed: 0,
    total_tests: 0,
    last_code: null,
    solution_revealed: false,
    updated_at: null
  };

  const isIncrement = data.incrementAttempts !== false && data.attemptsCount === undefined;
  const deltaOrTarget = isIncrement
    ? (data.incrementAttempts === false ? 0 : 1)
    : Math.max(0, Number(data.attemptsCount || 0));

  const nextAttemptsCount = isIncrement
    ? existing.attempts_count + deltaOrTarget
    : Math.max(existing.attempts_count, deltaOrTarget);

  const solved = Boolean(existing.solved || data.solved);
  const bestPassed = Math.max(existing.best_passed, Number(data.bestPassed || 0));
  const totalTests = Math.max(existing.total_tests, Number(data.totalTests || 0));
  const lastCode = data.lastCode !== undefined ? String(data.lastCode) : existing.last_code;
  const solutionRevealed = Boolean(existing.solution_revealed || data.solutionRevealed);
  const nowIso = new Date().toISOString();

  const memRow = {
    user_id: uid,
    exercise_id: exerciseId,
    attempts_count: nextAttemptsCount,
    solved,
    best_passed: bestPassed,
    total_tests: totalTests,
    last_code: lastCode,
    solution_revealed: solutionRevealed,
    updated_at: nowIso
  };
  memExerciseAttempts.set(memKey, memRow);

  if (isConnected()) {
    try {
      const result = await query(
        `INSERT INTO user_exercise_attempts (
           user_id, exercise_id, attempts_count, solved, best_passed, total_tests, last_code, solution_revealed, updated_at
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW())
         ON CONFLICT (user_id, exercise_id) DO UPDATE SET
           attempts_count = CASE
             WHEN $9::boolean THEN user_exercise_attempts.attempts_count + $3
             ELSE GREATEST(user_exercise_attempts.attempts_count, EXCLUDED.attempts_count)
           END,
           solved = user_exercise_attempts.solved OR EXCLUDED.solved,
           best_passed = GREATEST(user_exercise_attempts.best_passed, EXCLUDED.best_passed),
           total_tests = GREATEST(user_exercise_attempts.total_tests, EXCLUDED.total_tests),
           last_code = COALESCE(EXCLUDED.last_code, user_exercise_attempts.last_code),
           solution_revealed = user_exercise_attempts.solution_revealed OR EXCLUDED.solution_revealed,
           updated_at = NOW()
         RETURNING *`,
        [
          uid,
          exerciseId,
          isIncrement ? deltaOrTarget : nextAttemptsCount,
          solved,
          bestPassed,
          totalTests,
          lastCode,
          solutionRevealed,
          isIncrement
        ]
      );
      if (result && result.rows && result.rows[0]) {
        memExerciseAttempts.set(memKey, result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur upsertExerciseAttempt:', err.message);
      }
    }
  }
  return memRow;
}

async function getExerciseAttempt(userId, exerciseId) {
  if (userId == null || !exerciseId) return null;
  const uid = toDbUserId(userId);
  const memKey = `${uid}::${exerciseId}`;

  if (isConnected()) {
    try {
      const result = await query(
        'SELECT * FROM user_exercise_attempts WHERE user_id = $1 AND exercise_id = $2',
        [uid, exerciseId]
      );
      if (result && result.rows && result.rows[0]) {
        memExerciseAttempts.set(memKey, result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getExerciseAttempt:', err.message);
      }
    }
  }
  return memExerciseAttempts.get(memKey) || null;
}

async function getUserExerciseAttempts(userId) {
  if (userId == null) return [];
  const uid = toDbUserId(userId);

  if (isConnected()) {
    try {
      const result = await query(
        'SELECT * FROM user_exercise_attempts WHERE user_id = $1 ORDER BY updated_at DESC',
        [uid]
      );
      if (result && Array.isArray(result.rows) && result.rows.length > 0) {
        return result.rows;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getUserExerciseAttempts:', err.message);
      }
    }
  }

  const rows = [];
  for (const row of memExerciseAttempts.values()) {
    if (row.user_id === uid) rows.push(row);
  }
  return rows;
}

function computeLeitnerSchedule(currentBox, ratingOrOpts = {}) {
  const opts = typeof ratingOrOpts === 'string' ? { rating: ratingOrOpts } : (ratingOrOpts || {});
  const rating = opts.rating ? String(opts.rating).toLowerCase() : null;
  const baseBox = Number.isInteger(Number(currentBox)) && Number(currentBox) >= 1 ? Number(currentBox) : 1;

  let box = baseBox;
  if (rating === 'again' || rating === 'hard') {
    box = 1;
  } else if (rating === 'good') {
    box = Math.min(3, baseBox + 1);
  } else if (rating === 'easy') {
    box = 3;
  } else if (opts.box != null) {
    box = Math.min(3, Math.max(1, Number(opts.box) || 1));
  }

  const intervalDays = box === 3 ? 7 : (box === 2 ? 3 : 1);
  const nextReviewAt = opts.nextReviewAt && !rating
    ? new Date(opts.nextReviewAt).toISOString()
    : new Date(Date.now() + intervalDays * 86400 * 1000).toISOString();

  return { box, intervalDays, nextReviewAt };
}

async function upsertFlashcardLeitner(userId, courseId, cardHash, ratingOrOpts = 'good') {
  if (userId == null) throw new Error('userId requis');
  if (!courseId || typeof courseId !== 'string') throw new Error('courseId requis');
  if (!cardHash || typeof cardHash !== 'string') throw new Error('cardHash requis');

  const uid = toDbUserId(userId);
  const memKey = `${uid}::${courseId}::${cardHash}`;
  let existing = memFlashcardLeitner.get(memKey);

  if (!existing && isConnected()) {
    try {
      const existingRes = await query(
        'SELECT * FROM user_flashcard_leitner WHERE user_id = $1 AND course_id = $2 AND card_hash = $3',
        [uid, courseId, cardHash]
      );
      if (existingRes && existingRes.rows && existingRes.rows[0]) {
        existing = existingRes.rows[0];
      }
    } catch {
      // ignore fallback
    }
  }

  const { box, nextReviewAt } = computeLeitnerSchedule(existing ? existing.box : 1, ratingOrOpts);
  const nowIso = new Date().toISOString();
  const memRow = {
    user_id: uid,
    course_id: courseId,
    card_hash: cardHash,
    box,
    next_review_at: nextReviewAt,
    updated_at: nowIso
  };
  memFlashcardLeitner.set(memKey, memRow);

  if (isConnected()) {
    try {
      const result = await query(
        `INSERT INTO user_flashcard_leitner (user_id, course_id, card_hash, box, next_review_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         ON CONFLICT (user_id, course_id, card_hash) DO UPDATE SET
           box = EXCLUDED.box,
           next_review_at = EXCLUDED.next_review_at,
           updated_at = NOW()
         RETURNING *`,
        [uid, courseId, cardHash, box, nextReviewAt]
      );
      if (result && result.rows && result.rows[0]) {
        memFlashcardLeitner.set(memKey, result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur upsertFlashcardLeitner:', err.message);
      }
    }
  }
  return memRow;
}

async function getFlashcardsLeitner(userId, courseId = null) {
  if (userId == null) return [];
  const uid = toDbUserId(userId);

  if (isConnected()) {
    try {
      const sql = courseId
        ? 'SELECT * FROM user_flashcard_leitner WHERE user_id = $1 AND course_id = $2 ORDER BY next_review_at ASC'
        : 'SELECT * FROM user_flashcard_leitner WHERE user_id = $1 ORDER BY next_review_at ASC';
      const params = courseId ? [uid, courseId] : [uid];
      const result = await query(sql, params);
      if (result && Array.isArray(result.rows) && result.rows.length > 0) {
        return result.rows;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getFlashcardsLeitner:', err.message);
      }
    }
  }

  const rows = [];
  for (const row of memFlashcardLeitner.values()) {
    if (row.user_id === uid && (!courseId || row.course_id === courseId)) {
      rows.push(row);
    }
  }
  return rows.sort((a, b) => new Date(a.next_review_at) - new Date(b.next_review_at));
}

function hydrateSessionRow(row) {
  if (!row) return null;
  const payload = typeof row.payload_json === 'string'
    ? JSON.parse(row.payload_json)
    : (row.payload_json || {});
  const answers = typeof row.answers_json === 'string'
    ? JSON.parse(row.answers_json)
    : (row.answers_json != null ? row.answers_json : payload.answers || null);
  return {
    ...payload,
    sessionId: row.session_id || payload.sessionId,
    userKey: row.user_key || payload.userKey,
    courseId: row.course_id || payload.courseId,
    chapter: payload.chapter !== undefined ? payload.chapter : row.chapter,
    status: row.status || payload.status,
    startedAt: payload.startedAt || (row.started_at ? new Date(row.started_at).getTime() : Date.now()),
    expiresAt: payload.expiresAt || (row.expires_at ? new Date(row.expires_at).getTime() : Date.now()),
    score: row.score != null ? Number(row.score) : payload.score,
    percentage: row.percentage != null ? Number(row.percentage) : payload.percentage,
    passed: row.passed != null ? Boolean(row.passed) : payload.passed,
    answers
  };
}

async function saveExamSession(session) {
  if (!session || !session.sessionId) throw new Error('session invalide');
  const copy = { ...session };
  memExamSessions.set(copy.sessionId, copy);
  if (copy.status === 'in_progress') {
    memActiveExamByUserCourse.set(`${copy.userKey}:${copy.courseId}`, copy.sessionId);
  }

  if (isConnected() && UUID_RE.test(copy.sessionId)) {
    const dbUserId = copy.userId != null && /^-?\d+$/.test(String(copy.userId))
      ? parseInt(String(copy.userId), 10)
      : null;
    const dbChapter = Number.isInteger(Number(copy.chapter)) ? Number(copy.chapter) : 0;
    const startedIso = new Date(copy.startedAt || Date.now()).toISOString();
    const expiresIso = new Date(copy.expiresAt || Date.now()).toISOString();

    try {
      await query(
        `INSERT INTO qcm_exam_sessions (
           session_id, user_key, user_id, course_id, chapter, status,
           started_at, expires_at, payload_json, answers_json, score, percentage, passed, updated_at
         )
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW())
         ON CONFLICT (session_id) DO UPDATE SET
           status = EXCLUDED.status,
           payload_json = EXCLUDED.payload_json,
           answers_json = EXCLUDED.answers_json,
           score = EXCLUDED.score,
           percentage = EXCLUDED.percentage,
           passed = EXCLUDED.passed,
           updated_at = NOW()`,
        [
          copy.sessionId,
          copy.userKey,
          dbUserId,
          copy.courseId,
          dbChapter,
          copy.status,
          startedIso,
          expiresIso,
          JSON.stringify(copy),
          copy.answers ? JSON.stringify(copy.answers) : null,
          copy.score != null ? copy.score : null,
          copy.percentage != null ? copy.percentage : null,
          copy.passed != null ? copy.passed : null
        ]
      );
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur saveExamSession:', err.message);
      }
    }
  }
  return copy;
}

async function getExamSession(sessionId) {
  if (!sessionId || typeof sessionId !== 'string') return null;

  if (isConnected() && UUID_RE.test(sessionId)) {
    try {
      const result = await query(
        'SELECT * FROM qcm_exam_sessions WHERE session_id = $1',
        [sessionId]
      );
      if (result && result.rows && result.rows[0]) {
        const hydrated = hydrateSessionRow(result.rows[0]);
        memExamSessions.set(sessionId, hydrated);
        return hydrated;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getExamSession:', err.message);
      }
    }
  }

  return memExamSessions.get(sessionId) || null;
}

async function findActiveExamSession(userKey, courseId) {
  if (!userKey || !courseId) return null;

  if (isConnected()) {
    try {
      const result = await query(
        `SELECT * FROM qcm_exam_sessions
         WHERE user_key = $1 AND course_id = $2 AND status = 'in_progress'
         ORDER BY started_at DESC
         LIMIT 1`,
        [userKey, courseId]
      );
      if (result && result.rows && result.rows[0]) {
        const hydrated = hydrateSessionRow(result.rows[0]);
        memExamSessions.set(hydrated.sessionId, hydrated);
        memActiveExamByUserCourse.set(`${userKey}:${courseId}`, hydrated.sessionId);
        return hydrated;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur findActiveExamSession:', err.message);
      }
    }
  }

  const activeId = memActiveExamByUserCourse.get(`${userKey}:${courseId}`);
  if (!activeId) return null;
  const session = memExamSessions.get(activeId);
  if (!session || session.status !== 'in_progress') {
    memActiveExamByUserCourse.delete(`${userKey}:${courseId}`);
    return null;
  }
  return session;
}

async function updateExamSession(sessionId, patch = {}) {
  if (!sessionId) return null;
  const existing = memExamSessions.get(sessionId) || (await getExamSession(sessionId));
  if (!existing) return null;

  // Protection atomique anti-rejeu : si déjà soumis, ne jamais écraser le premier score
  if (existing.status === 'submitted' && patch.status === 'submitted') {
    return { ...existing, alreadySubmitted: true };
  }

  const updated = {
    ...existing,
    ...patch
  };
  memExamSessions.set(sessionId, updated);

  if (updated.status !== 'in_progress') {
    memActiveExamByUserCourse.delete(`${updated.userKey}:${updated.courseId}`);
  }

  if (isConnected() && UUID_RE.test(sessionId)) {
    try {
      const result = await query(
        `UPDATE qcm_exam_sessions
         SET status = $2,
             payload_json = $3,
             answers_json = $4,
             score = $5,
             percentage = $6,
             passed = $7,
             updated_at = NOW()
         WHERE session_id = $1 AND status != 'submitted'
         RETURNING *`,
        [
          sessionId,
          updated.status,
          JSON.stringify(updated),
          updated.answers ? JSON.stringify(updated.answers) : null,
          updated.score != null ? updated.score : null,
          updated.percentage != null ? updated.percentage : null,
          updated.passed != null ? updated.passed : null
        ]
      );
      if (result && Array.isArray(result.rows) && result.rows.length === 0 && patch.status === 'submitted') {
        const currentInDb = await getExamSession(sessionId);
        if (currentInDb && currentInDb.status === 'submitted') {
          return { ...currentInDb, alreadySubmitted: true };
        }
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur updateExamSession:', err.message);
      }
    }
  }

  return updated;
}

async function getUserExamSessions(userId, courseId = null) {
  if (userId == null) return [];
  const uid = toDbUserId(userId);
  const userKey = `user:${userId}`;

  if (isConnected()) {
    try {
      const sql = courseId
        ? `SELECT * FROM qcm_exam_sessions WHERE (user_id = $1 OR user_key = $2) AND course_id = $3 AND status = 'submitted' ORDER BY updated_at DESC`
        : `SELECT * FROM qcm_exam_sessions WHERE (user_id = $1 OR user_key = $2) AND status = 'submitted' ORDER BY updated_at DESC`;
      const params = courseId ? [uid, userKey, courseId] : [uid, userKey];
      const result = await query(sql, params);
      if (result && Array.isArray(result.rows) && result.rows.length > 0) {
        return result.rows.map(hydrateSessionRow);
      }
    } catch {
      // ignore fallback
    }
  }

  const list = [];
  for (const s of memExamSessions.values()) {
    if (s.status === 'submitted' && (s.userKey === userKey || toDbUserId(s.userId) === uid)) {
      if (!courseId || s.courseId === courseId) {
        list.push(s);
      }
    }
  }
  return list;
}

async function upsertPracticeExam(userId, courseId, clientExamKey = 'default', data = {}) {
  if (userId == null) throw new Error('userId requis');
  if (!courseId || typeof courseId !== 'string') throw new Error('courseId requis');

  const uid = toDbUserId(userId);
  const cid = courseId.trim();
  const key = String(clientExamKey || 'default').trim() || 'default';
  const score = Math.max(0, Math.round(Number(data.score || 0)));
  const total = Math.max(0, Math.round(Number(data.total || 0)));
  const passed = Boolean(data.passed);
  const completedAt = data.completedAt ? new Date(data.completedAt).toISOString() : new Date().toISOString();
  const memKey = `${uid}::${cid}::${key}`;

  const memRow = {
    user_id: uid,
    course_id: cid,
    client_exam_key: key,
    score,
    total,
    passed,
    completed_at: completedAt,
    updated_at: new Date().toISOString()
  };
  memPracticeExams.set(memKey, memRow);

  if (isConnected()) {
    try {
      const result = await query(
        `INSERT INTO user_practice_exams (user_id, course_id, client_exam_key, score, total, passed, completed_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         ON CONFLICT (user_id, course_id, client_exam_key) DO UPDATE SET
           score = EXCLUDED.score,
           total = EXCLUDED.total,
           passed = EXCLUDED.passed,
           completed_at = EXCLUDED.completed_at,
           updated_at = NOW()
         RETURNING *`,
        [uid, cid, key, score, total, passed, completedAt]
      );
      if (result && result.rows && result.rows[0]) {
        memPracticeExams.set(memKey, result.rows[0]);
        return result.rows[0];
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur upsertPracticeExam:', err.message);
      }
    }
  }
  return memRow;
}

async function getUserPracticeExams(userId, courseId = null) {
  if (userId == null) return [];
  const uid = toDbUserId(userId);

  if (isConnected()) {
    try {
      const sql = courseId
        ? 'SELECT * FROM user_practice_exams WHERE user_id = $1 AND course_id = $2 ORDER BY updated_at DESC'
        : 'SELECT * FROM user_practice_exams WHERE user_id = $1 ORDER BY updated_at DESC';
      const params = courseId ? [uid, courseId] : [uid];
      const result = await query(sql, params);
      if (result && Array.isArray(result.rows)) {
        return result.rows;
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur getUserPracticeExams:', err.message);
      }
    }
  }

  const rows = [];
  for (const row of memPracticeExams.values()) {
    if (row.user_id === uid && (!courseId || row.course_id === courseId)) {
      rows.push(row);
    }
  }
  return rows.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
}

async function getUserProgressSummary(userId, courseId = null) {
  if (userId == null) throw new Error('userId requis');
  const [chapters, allExercises, flashcards, exams, practiceExams] = await Promise.all([
    getChapterProgress(userId, courseId),
    getUserExerciseAttempts(userId),
    getFlashcardsLeitner(userId, courseId),
    getUserExamSessions(userId, courseId),
    getUserPracticeExams(userId, courseId)
  ]);

  let exercisesCatalog = null;
  try {
    exercisesCatalog = require('./exercises');
  } catch {
    exercisesCatalog = null;
  }

  const exercises = courseId && exercisesCatalog && typeof exercisesCatalog.getExercise === 'function'
    ? allExercises.filter(att => {
        const ex = exercisesCatalog.getExercise(att.exercise_id);
        return ex ? ex.course === courseId : true;
      })
    : allExercises;

  const masteredChapters = chapters.filter(c => Boolean(c.mastery_checked));
  const solvedExercises = exercises.filter(e => Boolean(e.solved));
  const totalExerciseAttempts = exercises.reduce((acc, e) => acc + Number(e.attempts_count || 0), 0);

  const nowMs = Date.now();
  const dueFlashcards = flashcards.filter(f => new Date(f.next_review_at).getTime() <= nowMs);

  // Calcul des cours complétés (>= 6 chapitres maîtrisés dans un cours)
  const masteredByCourse = new Map();
  for (const ch of masteredChapters) {
    masteredByCourse.set(ch.course_id, (masteredByCourse.get(ch.course_id) || 0) + 1);
  }
  const completedCourses = [];
  for (const [cid, count] of masteredByCourse.entries()) {
    if (count >= 6) completedCourses.push(cid);
  }

  const activeCoursesSet = new Set(masteredChapters.map(c => c.course_id));
  for (const ex of solvedExercises) {
    if (exercisesCatalog && typeof exercisesCatalog.getExercise === 'function') {
      const meta = exercisesCatalog.getExercise(ex.exercise_id);
      if (meta && meta.course) activeCoursesSet.add(meta.course);
    }
  }

  let averageScore = 0;
  if (exams.length > 0) {
    const sumPct = exams.reduce((acc, s) => acc + Number(s.percentage || 0), 0);
    averageScore = Math.round(sumPct / exams.length);
  } else if (exercises.length > 0) {
    const sumRatio = exercises.reduce((acc, e) => {
      const total = Number(e.total_tests || 0);
      const passed = Number(e.best_passed || 0);
      return acc + (total > 0 ? (passed / total) * 100 : (e.solved ? 100 : 0));
    }, 0);
    averageScore = Math.round(sumRatio / exercises.length);
  }

  return {
    userId,
    courseId: courseId || null,
    chapters,
    masteredChapters,
    exercises,
    flashcards,
    dueFlashcards,
    exams,
    practiceExams,
    stats: {
      masteredChaptersCount: masteredChapters.length,
      completedChapters: masteredChapters.length,
      completedCoursesCount: completedCourses.length,
      completedCourses,
      coursesInProgressCount: activeCoursesSet.size,
      solvedExercisesCount: solvedExercises.length,
      totalExerciseAttempts,
      dueFlashcardsCount: dueFlashcards.length,
      examsCount: exams.length,
      averageScore
    }
  };
}

async function incrementExecutionQuota(quotaKey, dayKey, count = 1) {
  if (!quotaKey || !dayKey) return 0;
  const delta = Math.max(0, Number(count) || 0);
  const memKey = `${quotaKey}::${dayKey}`;
  const current = memExecutionQuota.get(memKey) || {
    quota_key: quotaKey,
    day_key: dayKey,
    used_count: 0,
    updated_at: null
  };
  current.used_count += delta;
  current.updated_at = new Date().toISOString();
  memExecutionQuota.set(memKey, current);

  if (isConnected()) {
    try {
      const result = await query(
        `INSERT INTO execution_quota_daily (quota_key, day_key, used_count, updated_at)
         VALUES ($1, $2, $3, NOW())
         ON CONFLICT (quota_key, day_key) DO UPDATE SET
           used_count = execution_quota_daily.used_count + EXCLUDED.used_count,
           updated_at = NOW()
         RETURNING *`,
        [quotaKey, dayKey, delta]
      );
      if (result && result.rows && result.rows[0]) {
        memExecutionQuota.set(memKey, result.rows[0]);
        return Number(result.rows[0].used_count || 0);
      }
    } catch (err) {
      if (process.env.NODE_ENV !== 'test') {
        console.error('Erreur incrementExecutionQuota:', err.message);
      }
    }
  }
  return current.used_count;
}

async function getExecutionQuota(quotaKey, dayKey) {
  if (!quotaKey || !dayKey) return 0;
  const memKey = `${quotaKey}::${dayKey}`;

  if (isConnected()) {
    try {
      const result = await query(
        'SELECT * FROM execution_quota_daily WHERE quota_key = $1 AND day_key = $2',
        [quotaKey, dayKey]
      );
      if (result && result.rows && result.rows[0]) {
        memExecutionQuota.set(memKey, result.rows[0]);
        return Number(result.rows[0].used_count || 0);
      }
    } catch {
      // ignore fallback
    }
  }
  const entry = memExecutionQuota.get(memKey);
  return entry ? Number(entry.used_count || 0) : 0;
}

module.exports = {
  initDB,
  isConnected,
  setQueryRunnerForTest,
  clearMemoryStoresForTest,
  query,
  createKey,
  getKeyByCode,
  getKeyById,
  getAllKeys,
  markKeyUsed,
  resetKey,
  revokeKey,
  reactivateKey,
  renewKey,
  deleteKey,
  createSession,
  getSessionByJti,
  isSessionValid,
  getAllSessions,
  revokeSession,
  revokeSessionByJti,
  updateSessionVerified,
  ensurePreparationProfile,
  getPreparationProfile,
  getPreparationProgress,
  refreshPreparationTotals,
  savePreparationProgress,
  completePreparationProject,
  recordPreparationQuiz,
  getPreparationLeaderboard,
  getStats,
  getStatsByCourse,
  logActivity,
  getActivityLogs,
  getActivityLogsCount,
  // Users / comptes
  getUserByEmail,
  getUserById,
  createUser,
  setUserLevel,
  touchUserLogin,
  hasActiveSubscription,
  extendSubscription,
  setSubscription,
  createPasswordResetToken,
  getValidPasswordResetToken,
  consumePasswordResetToken,
  updateUserPassword,
  // Payments
  createPayment,
  getPaymentByTxId,
  getPaymentByMerchantRef,
  getPaymentById,
  getLatestPaymentForUser,
  claimFedapayTransaction,
  updatePaymentStatus,
  recordWebhookEvent,
  getWebhookEvent,
  markWebhookEventProcessed,
  // Class-filtered variants for B1/B2 separation
  getAllKeysByClass,
  getStatsByClass,
  getStatsByCourseByClass,
  getAllSessionsByClass,
  getActivityLogsByClass,
  getActivityLogsCountByClass,
  // Lot 3A : Student progress, exercise attempts, Leitner, QCM exam sessions & quotas
  toDbUserId,
  upsertChapterProgress,
  getChapterProgress,
  upsertExerciseAttempt,
  getExerciseAttempt,
  getUserExerciseAttempts,
  computeLeitnerSchedule,
  upsertFlashcardLeitner,
  getFlashcardsLeitner,
  upsertPracticeExam,
  getUserPracticeExams,
  getUserProgressSummary,
  saveExamSession,
  getExamSession,
  findActiveExamSession,
  updateExamSession,
  getUserExamSessions,
  incrementExecutionQuota,
  getExecutionQuota
};
