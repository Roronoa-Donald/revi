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
async function query(text, params) {
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
  const result = await query(`
    INSERT INTO preparation_profiles (user_id, display_name, last_activity)
    VALUES ($1, $2, CURRENT_TIMESTAMP)
    ON CONFLICT (user_id) WHERE user_id IS NOT NULL DO UPDATE SET
      display_name = COALESCE(EXCLUDED.display_name, preparation_profiles.display_name),
      last_activity = CURRENT_TIMESTAMP
    RETURNING *
  `, [userId, displayName || null]);

  return result.rows[0];
}

async function getPreparationProfile(userId) {
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

async function getPreparationProgress(keyId) {
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
  `, [keyId, PREPARATION_CURRICULUM_VERSION]);
  return result.rows[0] || null;
}

async function savePreparationProgress(userId, data = {}) {
  const projectId = Number(data.projectId);
  if (!projectId) throw new Error('projectId requis');

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
    keyId,
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
  const projectId = Number(data.projectId);
  if (!projectId) throw new Error('projectId requis');

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
    keyId,
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
  const projectId = Number(data.projectId);
  if (!projectId) throw new Error('projectId requis');

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
    keyId,
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
  const result = await query(
    `INSERT INTO users (email, password_hash, display_name, level)
     VALUES ($1, $2, $3, $4) RETURNING *`,
    [String(email).toLowerCase().trim(), passwordHash, displayName || null, lvl]
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
    `INSERT INTO payments (user_id, fedapay_transaction_id, fedapay_customer_id, amount, currency, description, status, months_granted, metadata)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *`,
    [
      data.userId || null,
      data.fedapayTransactionId || null,
      data.fedapayCustomerId || null,
      Number(data.amount || 0),
      data.currency || 'XOF',
      data.description || null,
      data.status || 'pending',
      Number(data.monthsGranted || 1),
      data.metadata ? JSON.stringify(data.metadata) : null
    ]
  );
  return result.rows[0];
}

async function getPaymentByTxId(fedapayTransactionId) {
  const result = await query('SELECT * FROM payments WHERE fedapay_transaction_id = $1', [String(fedapayTransactionId)]);
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
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6 RETURNING *`,
    [status, extra.fedapayTransactionId || null, extra.fedapayCustomerId || null, extra.periodStart || null, extra.periodEnd || null, id]
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

module.exports = {
  initDB,
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
  getAllSessions,
  revokeSession,
  revokeSessionByJti,
  updateSessionVerified,
  ensurePreparationProfile,
  getPreparationProfile,
  getPreparationProgress,
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
  getPaymentById,
  getLatestPaymentForUser,
  updatePaymentStatus,
  // Class-filtered variants for B1/B2 separation
  getAllKeysByClass,
  getStatsByClass,
  getStatsByCourseByClass,
  getAllSessionsByClass,
  getActivityLogsByClass,
  getActivityLogsCountByClass
};
