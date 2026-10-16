'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const pg = require('pg');
const jwt = require('jsonwebtoken');
const Fastify = require('fastify');
const fastifyCookie = require('@fastify/cookie');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-persistence-001';
process.env.PREPARATION_PASSWORD = process.env.PREPARATION_PASSWORD || 'prep-secret-pass-2026';

const { SOLUTIONS } = require('../server/preparation-content');

/**
 * Stateful in-memory PostgreSQL simulator for preparation persistence & auth verification.
 */
const store = {
  users: new Map(),
  sessions: new Map(),
  profiles: new Map(),
  progress: new Map(), // key: `${userId}:${projectId}`
  activityLogs: [],
  queries: []
};

function resetStore() {
  store.users.clear();
  store.sessions.clear();
  store.profiles.clear();
  store.progress.clear();
  store.activityLogs.length = 0;
  store.queries.length = 0;

  const futureExpiry = new Date(Date.now() + 30 * 24 * 3600 * 1000).toISOString();
  store.users.set(101, {
    id: 101,
    email: 'learner101@example.com',
    display_name: 'Apprenant 101',
    is_active: true,
    subscription_status: 'active',
    subscription_expires_at: futureExpiry,
    level: 'b2'
  });
  store.users.set(202, {
    id: 202,
    email: 'learner202@example.com',
    display_name: 'Apprenant 202',
    is_active: true,
    subscription_status: 'active',
    subscription_expires_at: futureExpiry,
    level: 'b2'
  });

  store.sessions.set('jti-user-101', {
    id: 1,
    user_id: 101,
    jti: 'jti-user-101',
    is_valid: true,
    last_verified: new Date().toISOString()
  });
  store.sessions.set('jti-user-202', {
    id: 2,
    user_id: 202,
    jti: 'jti-user-202',
    is_valid: true,
    last_verified: new Date().toISOString()
  });
}

function computeRankedProfiles() {
  const list = Array.from(store.profiles.values()).filter((p) => p.user_id != null);
  list.sort((a, b) => {
    if (b.total_xp !== a.total_xp) return b.total_xp - a.total_xp;
    if (b.projects_completed !== a.projects_completed) return b.projects_completed - a.projects_completed;
    return new Date(a.last_activity) - new Date(b.last_activity);
  });
  return list.map((p, idx) => ({
    ...p,
    rank: idx + 1
  }));
}

async function simulatedQuery(text, params = []) {
  const sql = String(text || '').replace(/\s+/g, ' ').trim();
  store.queries.push({ sql, params });

  // Migration bookkeeping queries during initDB()
  if (
    sql.startsWith('CREATE TABLE IF NOT EXISTS schema_migrations') ||
    sql.startsWith('BEGIN') ||
    sql.startsWith('COMMIT') ||
    sql.startsWith('ROLLBACK') ||
    sql.startsWith('INSERT INTO schema_migrations')
  ) {
    return { rows: [] };
  }
  if (sql.startsWith('SELECT name FROM schema_migrations')) {
    return {
      rows: [
        { name: '001_init.sql' },
        { name: '002_users.sql' },
        { name: '003_user_level.sql' },
        { name: '004_ai_config.sql' }
      ]
    };
  }

  // Auth / session queries
  if (sql.startsWith('SELECT * FROM sessions WHERE jti = $1')) {
    const s = store.sessions.get(params[0]);
    return { rows: s ? [{ ...s }] : [] };
  }
  if (sql.startsWith('SELECT * FROM users WHERE id = $1')) {
    const u = store.users.get(Number(params[0]));
    return { rows: u ? [{ ...u }] : [] };
  }
  if (sql.startsWith('UPDATE sessions SET last_verified = CURRENT_TIMESTAMP WHERE jti = $1')) {
    const s = store.sessions.get(params[0]);
    if (s) s.last_verified = new Date().toISOString();
    return { rows: s ? [{ ...s }] : [] };
  }
  if (sql.startsWith('INSERT INTO activity_logs')) {
    store.activityLogs.push({ params });
    return { rows: [] };
  }

  // ensurePreparationProfile
  if (sql.startsWith('INSERT INTO preparation_profiles')) {
    const userId = params[0];
    const displayName = params[1];
    if (userId == null) {
      throw new Error('null value in column "user_id" violates constraint');
    }
    const now = new Date().toISOString();
    const existing = store.profiles.get(userId);
    const resolvedName = displayName || (existing && existing.display_name) || `Apprenant #${userId}`;
    const record = existing
      ? {
          ...existing,
          display_name: resolvedName,
          last_activity: now
        }
      : {
          user_id: userId,
          display_name: resolvedName,
          unlocked_at: now,
          total_xp: 0,
          projects_completed: 0,
          last_activity: now
        };
    store.profiles.set(userId, record);
    return { rows: [{ ...record }] };
  }

  // getPreparationProfile
  if (sql.includes('FROM preparation_profiles p') && sql.includes('WHERE p.user_id = $1')) {
    const userId = params[0];
    const ranked = computeRankedProfiles();
    const found = ranked.find((p) => p.user_id === userId) || null;
    return { rows: found ? [{ ...found }] : [] };
  }

  // getPreparationLeaderboard
  if (sql.startsWith('SELECT') && sql.includes('FROM preparation_profiles') && sql.includes('LIMIT $1')) {
    const limit = Number(params[0] || 20);
    const ranked = computeRankedProfiles().slice(0, limit);
    return { rows: ranked };
  }

  // getPreparationProgress
  if (sql.startsWith('SELECT') && sql.includes('FROM preparation_progress') && sql.includes('WHERE user_id = $1 AND curriculum_version = $2')) {
    const userId = params[0];
    const curriculumVersion = params[1];
    const rows = Array.from(store.progress.values())
      .filter((r) => r.user_id === userId && r.curriculum_version === curriculumVersion)
      .sort((a, b) => a.project_id - b.project_id)
      .map((r) => ({ ...r }));
    return { rows };
  }

  // refreshPreparationTotals
  if (sql.startsWith('UPDATE preparation_profiles SET total_xp =')) {
    const userId = params[0];
    const curriculumVersion = params[1];
    const userRows = Array.from(store.progress.values()).filter(
      (r) => r.user_id === userId && r.curriculum_version === curriculumVersion
    );
    const totalXp = userRows.reduce((acc, r) => acc + Number(r.project_xp || 0) + Number(r.quiz_xp || 0), 0);
    const projectsCompleted = userRows.filter((r) => r.completed === true).length;
    const now = new Date().toISOString();

    let profile = store.profiles.get(userId);
    if (!profile) {
      profile = {
        user_id: userId,
        display_name: `Apprenant #${userId}`,
        unlocked_at: now,
        total_xp: totalXp,
        projects_completed: projectsCompleted,
        last_activity: now
      };
    } else {
      profile = {
        ...profile,
        total_xp: totalXp,
        projects_completed: projectsCompleted,
        last_activity: now
      };
    }
    store.profiles.set(userId, profile);
    return { rows: [{ ...profile }] };
  }

  // savePreparationProgress / completePreparationProject / recordPreparationQuiz
  if (sql.startsWith('INSERT INTO preparation_progress')) {
    const userId = params[0];
    const projectId = Number(params[1]);
    const key = `${userId}:${projectId}`;
    const existing = store.progress.get(key) || {
      user_id: userId,
      project_id: projectId,
      html_code: '',
      js_code: '',
      completed: false,
      project_xp: 0,
      quiz_xp: 0,
      quiz_score: 0,
      quiz_completed: false,
      used_hint: false,
      used_solution: false,
      attempts: 0,
      curriculum_version: 2,
      updated_at: new Date().toISOString()
    };
    const now = new Date().toISOString();

    // recordPreparationQuiz (5 params)
    if (sql.includes('quiz_completed, quiz_score, quiz_xp')) {
      const quizScore = Number(params[2] || 0);
      const quizXp = Number(params[3] || 0);
      const curriculumVersion = params[4];
      const updated = {
        ...existing,
        quiz_completed: true,
        quiz_score: Math.max(Number(existing.quiz_score || 0), quizScore),
        quiz_xp: Math.max(Number(existing.quiz_xp || 0), quizXp),
        curriculum_version: curriculumVersion,
        updated_at: now
      };
      store.progress.set(key, updated);
      return { rows: [{ ...updated }] };
    }

    // completePreparationProject (9 params, completed = TRUE)
    if (sql.includes('completed, project_xp')) {
      const htmlCode = params[2];
      const jsCode = params[3];
      const projectXp = Number(params[4] || 0);
      const usedHint = Boolean(params[5]);
      const usedSolution = Boolean(params[6]);
      const attempts = Number(params[7] || 0);
      const curriculumVersion = params[8];
      const updated = {
        ...existing,
        html_code: htmlCode,
        js_code: jsCode,
        completed: true,
        project_xp: Math.max(Number(existing.project_xp || 0), projectXp),
        used_hint: Boolean(existing.used_hint) || usedHint,
        used_solution: Boolean(existing.used_solution) || usedSolution,
        attempts: Math.max(Number(existing.attempts || 0), attempts),
        curriculum_version: curriculumVersion,
        updated_at: now
      };
      store.progress.set(key, updated);
      return { rows: [{ ...updated }] };
    }

    // savePreparationProgress (8 params)
    const htmlCode = params[2];
    const jsCode = params[3];
    const usedHint = Boolean(params[4]);
    const usedSolution = Boolean(params[5]);
    const attempts = Number(params[6] || 0);
    const curriculumVersion = params[7];
    const updated = {
      ...existing,
      html_code: htmlCode,
      js_code: jsCode,
      used_hint: Boolean(existing.used_hint) || usedHint,
      used_solution: Boolean(existing.used_solution) || usedSolution,
      attempts: Math.max(Number(existing.attempts || 0), attempts),
      curriculum_version: curriculumVersion,
      updated_at: now
    };
    store.progress.set(key, updated);
    return { rows: [{ ...updated }] };
  }

  throw new Error(`Unhandled SQL in test simulator: ${sql}`);
}

// Intercept pg.Pool methods before initializing db
pg.Pool.prototype.connect = async function mockConnect() {
  return {
    query: simulatedQuery,
    release: () => {}
  };
};
pg.Pool.prototype.query = simulatedQuery;

const db = require('../server/db');
const preparationRoutes = require('../server/routes/preparation');

function makeCookiesForUser(userId, jti) {
  const authToken = jwt.sign({ userId, jti }, process.env.JWT_SECRET, { expiresIn: '30d' });
  const passwordVersion = crypto
    .createHash('sha256')
    .update(String(process.env.PREPARATION_PASSWORD || ''))
    .digest('hex')
    .slice(0, 24);
  const prepToken = jwt.sign(
    { prepWeb: true, userId, passwordVersion },
    process.env.JWT_SECRET,
    { expiresIn: '365d' }
  );
  return `auth_token=${authToken}; preparation_token=${prepToken}`;
}

test.before(async () => {
  resetStore();
  await db.initDB();
});

test.beforeEach(() => {
  resetStore();
});

// ============================================================================
// 1. Direct unit tests for all 5 preparation persistence functions in server/db.js
// ============================================================================

test('db.getPreparationProgress(userId) binds userId as $1 without ReferenceError', async () => {
  const rows = await db.getPreparationProgress(101);
  assert.ok(Array.isArray(rows));
  assert.equal(rows.length, 0);

  const lastQuery = store.queries.at(-1);
  assert.ok(lastQuery.sql.includes('FROM preparation_progress'));
  assert.equal(lastQuery.params[0], 101);
  assert.equal(lastQuery.params[1], 2);
});

test('db.refreshPreparationTotals(userId) binds userId as $1 without ReferenceError', async () => {
  await db.ensurePreparationProfile(101, 'Apprenant 101');
  store.queries.length = 0;

  const updatedProfile = await db.refreshPreparationTotals(101);
  assert.ok(updatedProfile);
  assert.equal(updatedProfile.user_id, 101);
  assert.equal(updatedProfile.total_xp, 0);
  assert.equal(updatedProfile.projects_completed, 0);

  const lastQuery = store.queries.at(-1);
  assert.ok(lastQuery.sql.includes('UPDATE preparation_profiles'));
  assert.equal(lastQuery.params[0], 101);
  assert.equal(lastQuery.params[1], 2);
});

test('db.savePreparationProgress(userId, data) binds userId as $1 without ReferenceError', async () => {
  await db.ensurePreparationProfile(101, 'Apprenant 101');
  store.queries.length = 0;

  const saved = await db.savePreparationProgress(101, {
    projectId: 1,
    htmlCode: '<section class="profile-card">Draft</section>',
    jsCode: 'console.log(1);',
    usedHint: true,
    usedSolution: false,
    attempts: 2
  });

  assert.equal(saved.user_id, 101);
  assert.equal(saved.project_id, 1);
  assert.equal(saved.html_code, '<section class="profile-card">Draft</section>');
  assert.equal(saved.used_hint, true);
  assert.equal(saved.attempts, 2);

  const insertQuery = store.queries.find((q) => q.sql.startsWith('INSERT INTO preparation_progress'));
  assert.ok(insertQuery, 'INSERT INTO preparation_progress should be executed');
  assert.equal(insertQuery.params[0], 101);
  assert.equal(insertQuery.params[1], 1);
});

test('db.completePreparationProject(userId, data) binds userId as $1 without ReferenceError', async () => {
  await db.ensurePreparationProfile(101, 'Apprenant 101');
  store.queries.length = 0;

  const completed = await db.completePreparationProject(101, {
    projectId: 1,
    htmlCode: SOLUTIONS[1].html,
    jsCode: SOLUTIONS[1].js,
    projectXp: 70,
    usedHint: false,
    usedSolution: false,
    attempts: 1
  });

  assert.equal(completed.user_id, 101);
  assert.equal(completed.project_id, 1);
  assert.equal(completed.completed, true);
  assert.equal(completed.project_xp, 70);

  const insertQuery = store.queries.find((q) => q.sql.startsWith('INSERT INTO preparation_progress'));
  assert.ok(insertQuery);
  assert.equal(insertQuery.params[0], 101);
  assert.equal(insertQuery.params[1], 1);
  assert.equal(insertQuery.params[4], 70);
});

test('db.recordPreparationQuiz(userId, data) binds userId as $1 without ReferenceError', async () => {
  await db.ensurePreparationProfile(101, 'Apprenant 101');
  store.queries.length = 0;

  const recorded = await db.recordPreparationQuiz(101, {
    projectId: 1,
    quizScore: 4,
    quizXp: 16
  });

  assert.equal(recorded.user_id, 101);
  assert.equal(recorded.project_id, 1);
  assert.equal(recorded.quiz_completed, true);
  assert.equal(recorded.quiz_score, 4);
  assert.equal(recorded.quiz_xp, 16);

  const insertQuery = store.queries.find((q) => q.sql.startsWith('INSERT INTO preparation_progress'));
  assert.ok(insertQuery);
  assert.equal(insertQuery.params[0], 101);
  assert.equal(insertQuery.params[1], 1);
  assert.equal(insertQuery.params[2], 4);
  assert.equal(insertQuery.params[3], 16);
});

// ============================================================================
// 2. Multi-user stateful flow & strict tenant isolation (User 101 vs User 202)
// ============================================================================

test('Multi-step learner flow isolates User 101 and User 202 progress and profile totals', async () => {
  await db.ensurePreparationProfile(101, 'Apprenant 101');
  await db.ensurePreparationProfile(202, 'Apprenant 202');

  // Step 1: User 101 saves code draft on project 1
  await db.savePreparationProgress(101, {
    projectId: 1,
    htmlCode: '<section>Brouillon 101</section>',
    jsCode: '// js 101',
    usedHint: false,
    usedSolution: false,
    attempts: 1
  });

  // Step 2: User 202 saves code draft on project 1
  await db.savePreparationProgress(202, {
    projectId: 1,
    htmlCode: '<section>Brouillon 202</section>',
    jsCode: '// js 202',
    usedHint: true,
    usedSolution: false,
    attempts: 3
  });

  // Step 3: User 101 completes project 1 and records quiz 1
  await db.completePreparationProject(101, {
    projectId: 1,
    htmlCode: SOLUTIONS[1].html,
    jsCode: '',
    projectXp: 65,
    usedHint: false,
    usedSolution: false,
    attempts: 1
  });

  await db.recordPreparationQuiz(101, {
    projectId: 1,
    quizScore: 5,
    quizXp: 20
  });

  // Verify getPreparationProgress(101) returns ONLY User 101's progress
  const progress101 = await db.getPreparationProgress(101);
  assert.equal(progress101.length, 1);
  assert.equal(progress101[0].user_id, 101);
  assert.equal(progress101[0].project_id, 1);
  assert.equal(progress101[0].completed, true);
  assert.equal(progress101[0].project_xp, 65);
  assert.equal(progress101[0].quiz_completed, true);
  assert.equal(progress101[0].quiz_score, 5);
  assert.equal(progress101[0].quiz_xp, 20);
  assert.equal(progress101[0].html_code, SOLUTIONS[1].html);

  // Verify User 202's progress was NOT overwritten or leaked
  const progress202 = await db.getPreparationProgress(202);
  assert.equal(progress202.length, 1);
  assert.equal(progress202[0].user_id, 202);
  assert.equal(progress202[0].project_id, 1);
  assert.equal(progress202[0].completed, false);
  assert.equal(progress202[0].project_xp, 0);
  assert.equal(progress202[0].quiz_completed, false);
  assert.equal(progress202[0].html_code, '<section>Brouillon 202</section>');
  assert.equal(progress202[0].used_hint, true);
  assert.equal(progress202[0].attempts, 3);

  // Verify refreshPreparationTotals(101) updates ONLY User 101's profile totals
  const refreshed101 = await db.refreshPreparationTotals(101);
  assert.equal(refreshed101.user_id, 101);
  assert.equal(refreshed101.total_xp, 85); // 65 + 20
  assert.equal(refreshed101.projects_completed, 1);

  const profile202 = await db.getPreparationProfile(202);
  assert.equal(profile202.user_id, 202);
  assert.equal(profile202.total_xp, 0);
  assert.equal(profile202.projects_completed, 0);
});

// ============================================================================
// 3. Input validation: invalid / missing userId or projectId rejected cleanly
// ============================================================================

test('Missing or invalid userId and projectId are rejected with descriptive errors', async () => {
  await assert.rejects(() => db.getPreparationProgress(null), /userId requis/i);
  await assert.rejects(() => db.getPreparationProgress(0), /userId requis/i);
  await assert.rejects(() => db.refreshPreparationTotals(undefined), /userId requis/i);
  await assert.rejects(() => db.savePreparationProgress(null, { projectId: 1 }), /userId requis/i);
  await assert.rejects(() => db.completePreparationProject(null, { projectId: 1 }), /userId requis/i);
  await assert.rejects(() => db.recordPreparationQuiz(null, { projectId: 1 }), /userId requis/i);

  await assert.rejects(() => db.savePreparationProgress(101, {}), /projectId requis/i);
  await assert.rejects(() => db.savePreparationProgress(101, { projectId: 0 }), /projectId requis/i);
  await assert.rejects(() => db.completePreparationProject(101, {}), /projectId requis/i);
  await assert.rejects(() => db.recordPreparationQuiz(101, { projectId: NaN }), /projectId requis/i);
});

// ============================================================================
// 4. End-to-End Fastify route handlers (/progress, /validate, /quiz)
// ============================================================================

test('Fastify routes /api/preparation/progress, /validate, /quiz persist end-to-end with HTTP 200', async () => {
  const app = Fastify({ logger: false });
  await app.register(fastifyCookie);
  await app.register(preparationRoutes, { prefix: '/api/preparation' });
  await app.ready();

  try {
    const cookie101 = makeCookiesForUser(101, 'jti-user-101');
    const cookie202 = makeCookiesForUser(202, 'jti-user-202');

    // 1. POST /api/preparation/progress (User 101 saves draft for project 1)
    const saveRes = await app.inject({
      method: 'POST',
      url: '/api/preparation/progress',
      headers: { cookie: cookie101 },
      payload: {
        projectId: 1,
        htmlCode: '<section class="profile-card">En cours</section>',
        jsCode: '',
        usedHint: false,
        usedSolution: false,
        attempts: 1
      }
    });
    assert.equal(saveRes.statusCode, 200);
    const saveBody = saveRes.json();
    assert.equal(saveBody.success, true);
    assert.equal(saveBody.progress.projectId, 1);
    assert.equal(saveBody.progress.completed, false);
    assert.equal(saveBody.progress.htmlCode, '<section class="profile-card">En cours</section>');

    // 2. POST /api/preparation/validate (User 101 validates project 1 with valid solution)
    const validateRes = await app.inject({
      method: 'POST',
      url: '/api/preparation/validate',
      headers: { cookie: cookie101 },
      payload: {
        projectId: 1,
        htmlCode: SOLUTIONS[1].html,
        jsCode: SOLUTIONS[1].js,
        usedHint: false,
        usedSolution: false,
        attempts: 1
      }
    });
    assert.equal(validateRes.statusCode, 200);
    const validateBody = validateRes.json();
    assert.equal(validateBody.success, true);
    assert.equal(validateBody.valid, true);
    assert.equal(validateBody.projectXp, 70);
    assert.equal(validateBody.progress.completed, true);
    assert.equal(validateBody.profile.totalXp, 70);
    assert.equal(validateBody.profile.projectsCompleted, 1);

    // 3. POST /api/preparation/quiz (User 101 submits quiz for completed project 1)
    const quizRes = await app.inject({
      method: 'POST',
      url: '/api/preparation/quiz',
      headers: { cookie: cookie101 },
      payload: {
        projectId: 1,
        score: 4,
        total: 5
      }
    });
    assert.equal(quizRes.statusCode, 200);
    const quizBody = quizRes.json();
    assert.equal(quizBody.success, true);
    assert.equal(quizBody.quizXp, 16);
    assert.equal(quizBody.progress.quizCompleted, true);
    assert.equal(quizBody.progress.quizScore, 4);
    assert.equal(quizBody.progress.quizXp, 16);
    assert.equal(quizBody.profile.totalXp, 86); // 70 + 16

    // 4. GET /api/preparation/progress for User 101 reflects persisted state
    const getRes101 = await app.inject({
      method: 'GET',
      url: '/api/preparation/progress',
      headers: { cookie: cookie101 }
    });
    assert.equal(getRes101.statusCode, 200);
    const getBody101 = getRes101.json();
    assert.equal(getBody101.success, true);
    assert.equal(getBody101.progress.length, 1);
    assert.equal(getBody101.progress[0].completed, true);
    assert.equal(getBody101.progress[0].quizCompleted, true);
    assert.equal(getBody101.profile.totalXp, 86);

    // 5. GET /api/preparation/progress for User 202 has empty progress (no cross-user leak)
    const getRes202 = await app.inject({
      method: 'GET',
      url: '/api/preparation/progress',
      headers: { cookie: cookie202 }
    });
    assert.equal(getRes202.statusCode, 200);
    const getBody202 = getRes202.json();
    assert.equal(getBody202.success, true);
    assert.equal(getBody202.progress.length, 0);
    assert.equal(getBody202.profile.totalXp, 0);
  } finally {
    await app.close();
  }
});
