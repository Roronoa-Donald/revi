'use strict';

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const jwt = require('jsonwebtoken');

process.env.JWT_SECRET = process.env.JWT_SECRET || 'test-jwt-secret-progress-integrity';

const db = require('../server/db');
const { buildApp } = require('../server/app');

function makeUserCookie(userId = 42, extra = {}) {
  const token = jwt.sign({ userId, level: 'b2', ...extra }, process.env.JWT_SECRET);
  return { auth_token: token };
}

function loadProgressSyncBrowserEnv({ verifyResponse, initialPathname = '/b1-python/chapitres/chapitre1.html' }) {
  const code = fs.readFileSync(path.join(__dirname, '..', 'assets/js/progress-sync.js'), 'utf8');
  const fetchCalls = [];
  const docListeners = new Map();
  const winListeners = new Map();
  const storage = new Map();

  function addListener(map, type, fn) {
    if (!map.has(type)) map.set(type, []);
    map.get(type).push(fn);
  }

  class CustomEventPolyfill {
    constructor(type, init = {}) {
      this.type = type;
      this.detail = init.detail;
    }
  }

  const document = {
    readyState: 'complete',
    body: { getAttribute: () => null },
    querySelector: () => null,
    addEventListener: (t, fn) => addListener(docListeners, t, fn),
    dispatchEvent: (ev) => {
      for (const fn of (docListeners.get(ev.type) || [])) fn(ev);
      return true;
    }
  };

  const window = {
    location: { pathname: initialPathname },
    localStorage: {
      getItem: (k) => (storage.has(k) ? storage.get(k) : null),
      setItem: (k, v) => storage.set(k, String(v))
    },
    addEventListener: (t, fn) => addListener(winListeners, t, fn),
    dispatchEvent: (ev) => {
      for (const fn of (winListeners.get(ev.type) || [])) fn(ev);
      return true;
    }
  };

  async function fetch(url, opts = {}) {
    fetchCalls.push({ url, opts });
    if (url === '/api/verify') {
      return { ok: true, status: 200, json: async () => verifyResponse };
    }
    if (url.startsWith('/api/progress/sync')) {
      return { ok: true, status: 200, json: async () => ({ ok: true, progress: { chapters: [] } }) };
    }
    if (url.startsWith('/api/progress')) {
      return { ok: true, status: 200, json: async () => ({ ok: true, chapters: [] }) };
    }
    return { ok: false, status: 404, json: async () => ({}) };
  }

  const sandbox = {
    window,
    document,
    localStorage: window.localStorage,
    CustomEvent: CustomEventPolyfill,
    fetch,
    console
  };
  vm.runInNewContext(code, sandbox);

  return { window, document, fetchCalls, CustomEvent: CustomEventPolyfill };
}

describe('Tâche 2.1 : Contrat /api/verify <-> progress-sync.js <-> cours.js', () => {
  test('GET /api/verify renvoie userId numérique quand la session DB est active et authentifiée', async (t) => {
    const app = buildApp({ logger: false });
    const origIsConnected = db.isConnected;
    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;
    const origQuery = db.query;

    db.isConnected = () => true;
    db.getSessionByJti = async (jti) => ({
      jti,
      user_id: 42,
      is_valid: true,
      expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
    });
    db.getUserById = async (id) => ({
      id,
      email: 'student42@example.com',
      display_name: 'Élève 42',
      level: 'b2',
      is_active: true,
      subscription_status: 'active',
      subscription_expires_at: new Date(Date.now() + 3600 * 1000).toISOString()
    });
    db.query = async () => ({ rows: [] });

    t.after(async () => {
      db.isConnected = origIsConnected;
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      db.query = origQuery;
      await app.close();
    });

    const res = await app.inject({
      method: 'GET',
      url: '/api/verify',
      cookies: makeUserCookie(42, { jti: 'jti-42' })
    });
    assert.equal(res.statusCode, 200);
    const body = res.json();
    assert.equal(body.authenticated, true);
    assert.equal(body.userId, 42);
    assert.equal(body.account.email, 'student42@example.com');
  });

  test('progress-sync.js résout /api/verify { authenticated: true, userId } et écoute les events sur window', async () => {
    const env = loadProgressSyncBrowserEnv({
      verifyResponse: {
        authenticated: true,
        userId: 42,
        account: { email: 'etu@example.com', displayName: 'Etu', level: 'b2' },
        level: 'b2'
      }
    });

    await new Promise((r) => setTimeout(r, 20));
    assert.ok(env.window.__rdUser, 'window.__rdUser doit être renseigné après /api/verify');
    assert.equal(env.window.__rdUser.userId, 42);

    // 1. rd:chapter-mastery sur window avec mastered/done false puis true
    env.window.dispatchEvent(new env.CustomEvent('rd:chapter-mastery', {
      detail: { courseId: 'b1-python', chapter: 1, mastered: false, done: false }
    }));
    const chUncheckCall = env.fetchCalls.find((c) => c.url === '/api/progress/chapter');
    assert.ok(chUncheckCall, 'window rd:chapter-mastery doit appeler POST /api/progress/chapter');
    assert.deepEqual(JSON.parse(chUncheckCall.opts.body), {
      courseId: 'b1-python',
      chapterNum: 1,
      masteryChecked: false
    });

    // 2. rd:flashcard-review sur window
    env.window.dispatchEvent(new env.CustomEvent('rd:flashcard-review', {
      detail: { courseId: 'b1-python', cardHash: 'fc-abc', rating: 'easy' }
    }));
    const fcCall = env.fetchCalls.find((c) => c.url === '/api/progress/flashcard');
    assert.ok(fcCall, 'window rd:flashcard-review doit appeler POST /api/progress/flashcard');

    // 3. rd:exam-completed sur window doit synchroniser l'examen côté serveur
    env.window.dispatchEvent(new env.CustomEvent('rd:exam-completed', {
      detail: { courseId: 'b1-python', score: 16, total: 20, percentage: 80, passed: true }
    }));
    const examSyncCall = env.fetchCalls.find((c) => c.url === '/api/progress/sync');
    assert.ok(examSyncCall, 'window rd:exam-completed doit envoyer POST /api/progress/sync');
    const syncBody = JSON.parse(examSyncCall.opts.body);
    assert.ok(syncBody.exams && syncBody.exams['b1-python'], 'exams doit contenir b1-python');
  });
});

describe('Tâche 2.2 : Intégrité DB progression, exams locaux et validation stricte toDbUserId', () => {
  test('POST /api/progress/sync ignore solved/bestPassed/solutionRevealed client mais persiste lastCode et exams dans user_practice_exams', async (t) => {
    db.clearMemoryStoresForTest();
    const app = buildApp({ logger: false });
    t.after(async () => {
      await app.close();
      db.clearMemoryStoresForTest();
    });

    const cookies = makeUserCookie(505);
    const syncRes = await app.inject({
      method: 'POST',
      url: '/api/progress/sync',
      cookies,
      payload: {
        exercises: [
          {
            exerciseId: 'py-c1-e1',
            attemptsCount: 99,
            solved: true,
            bestPassed: 99,
            totalTests: 4,
            solutionRevealed: true,
            lastCode: 'print("brouillon")'
          }
        ],
        exams: {
          'b1-python': {
            score: 17,
            total: 20,
            percentage: 85,
            passed: true
          }
        }
      }
    });

    assert.equal(syncRes.statusCode, 200);
    const body = syncRes.json();
    assert.equal(body.ok, true);
    assert.equal(body.synced.exams, 1);

    const attempt = await db.getExerciseAttempt(505, 'py-c1-e1');
    assert.ok(attempt, 'Le brouillon exercice doit être enregistré');
    assert.equal(attempt.solved, false, 'solved ne doit JAMAIS être cru depuis /progress/sync');
    assert.equal(attempt.best_passed, 0, 'best_passed ne doit pas être falsifié depuis /progress/sync');
    assert.equal(attempt.solution_revealed, false, 'solution_revealed ne doit pas être falsifié depuis /progress/sync');
    assert.equal(attempt.attempts_count, 0, 'attempts_count ne doit pas être gonflé depuis /progress/sync');
    assert.equal(attempt.last_code, 'print("brouillon")');

    // Examens locaux stockés séparément sans polluer qcm_exam_sessions
    assert.equal(body.progress.exams.length, 0, 'qcm_exam_sessions certifiés ne doivent pas être pollués');
    assert.ok(Array.isArray(body.progress.practiceExams), 'practiceExams doit être exposé dans le résumé');
    assert.equal(body.progress.practiceExams.length, 1);
    assert.equal(body.progress.practiceExams[0].course_id, 'b1-python');
    assert.equal(body.progress.practiceExams[0].score, 17);
  });

  test('toDbUserId rejette strictement toute valeur non numérique entière positive en mode PostgreSQL (ou invalide)', () => {
    assert.equal(typeof db.toDbUserId, 'function', 'server/db.js doit exporter toDbUserId');
    assert.equal(db.toDbUserId(42), 42);
    assert.equal(db.toDbUserId('42'), 42);
    assert.throws(() => db.toDbUserId('non-numeric-junk'), /userId/i);
    assert.throws(() => db.toDbUserId('0'), /userId/i);
    assert.throws(() => db.toDbUserId(-3), /userId/i);
    assert.throws(() => db.toDbUserId('12abc'), /userId/i);
  });
});