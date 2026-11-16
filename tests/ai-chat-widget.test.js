'use strict';

/**
 * Tests TDD — Lot 3C (AI-Widget-Fix)
 * Vérifie :
 * 1. Refonte visuelle neutre alignée Stitch dans rd-ai-chat.js (absence de #DB2777, #9D174D,
 *    rdai-pulse, wa-pulse, keyframes infinis, 0 emoji, tokens CSS var(--accent), var(--surface),
 *    var(--ink), var(--border), mode sombre [data-theme="dark"], mobile < 768px).
 * 2. Validité syntaxique de rd-ai-chat.js et server/routes/ai-chat.js (node --check).
 * 3. Détection dynamique de contexte (70 cours actifs B1/B2/B3 + portail /index.html),
 *    absence de "7 cours".
 * 4. Enrichissement du prompt système côté serveur (server/routes/ai-chat.js) depuis
 *    server/courses.js, conservation du rate-limit, validation de taille et absence de fuite de clé API.
 */

const { test, describe } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const jwt = require('jsonwebtoken');

const ROOT = path.resolve(__dirname, '..');
const WIDGET_PATH = path.join(ROOT, 'rd-ai-chat.js');
const ROUTE_PATH = path.join(ROOT, 'server', 'routes', 'ai-chat.js');
const { COURSES, COURSE_DIRS } = require('../server/courses');
const { buildApp } = require('../server/app');
const db = require('../server/db');
const aiPool = require('../server/services/ai-pool');

const EMOJI_REGEX = /\p{Extended_Pictographic}/u;

describe('Lot 3C — 1. Hygiène visuelle Stitch & Zéro Emoji (rd-ai-chat.js)', () => {
  const widgetSource = fs.readFileSync(WIDGET_PATH, 'utf8');
  const routeSource = fs.readFileSync(ROUTE_PATH, 'utf8');

  test('Syntaxe valide via node --check sur rd-ai-chat.js et server/routes/ai-chat.js', () => {
    execFileSync(process.execPath, ['--check', WIDGET_PATH], { stdio: 'pipe' });
    execFileSync(process.execPath, ['--check', ROUTE_PATH], { stdio: 'pipe' });
  });

  test('Absence totale de dégradés rose/magenta (#DB2777, #9D174D) et de "7 cours"', () => {
    assert.ok(!/#db2777/i.test(widgetSource), 'rd-ai-chat.js ne doit plus contenir #DB2777');
    assert.ok(!/#9d174d/i.test(widgetSource), 'rd-ai-chat.js ne doit plus contenir #9D174D');
    assert.ok(!/\b7\s+cours\b/i.test(widgetSource), 'rd-ai-chat.js ne doit plus affirmer "7 cours"');
    assert.ok(!/\b7\s+cours\b/i.test(routeSource), 'server/routes/ai-chat.js ne doit pas affirmer "7 cours"');
  });

  test('Absence des animations CSS infinies (rdai-pulse, wa-pulse, infinite)', () => {
    assert.ok(!widgetSource.includes('rdai-pulse'), 'rdai-pulse doit être supprimé');
    assert.ok(!widgetSource.includes('wa-pulse'), 'wa-pulse doit être supprimé');
    assert.ok(!/@keyframes\s+[\w-]+\s*\{[\s\S]*?\}/i.test(widgetSource) || !/animation\s*:[^;]*infinite/i.test(widgetSource), 'Aucune animation CSS infinie ne doit subsister');
    assert.ok(!/infinite/i.test(widgetSource), 'Aucun mot-clé CSS infinite dans rd-ai-chat.js');
  });

  test('Zéro emoji dans rd-ai-chat.js et server/routes/ai-chat.js', () => {
    assert.ok(!EMOJI_REGEX.test(widgetSource), 'rd-ai-chat.js ne doit contenir aucun emoji');
    assert.ok(!EMOJI_REGEX.test(routeSource), 'server/routes/ai-chat.js ne doit contenir aucun emoji');
  });

  test('Utilise les tokens CSS du design system Stitch, le mode sombre et le placement mobile < 768px', () => {
    assert.ok(widgetSource.includes('var(--accent, #2563eb)'), 'Doit utiliser var(--accent, #2563eb)');
    assert.ok(widgetSource.includes('var(--surface'), 'Doit utiliser var(--surface)');
    assert.ok(widgetSource.includes('var(--ink'), 'Doit utiliser var(--ink)');
    assert.ok(widgetSource.includes('var(--border'), 'Doit utiliser var(--border)');
    assert.ok(widgetSource.includes('[data-theme="dark"]'), 'Doit supporter [data-theme="dark"]');
    assert.ok(widgetSource.includes('@media (max-width: 768px)'), 'Doit gérer le placement mobile < 768px');
    assert.ok(/bottom:\s*7[2-9]px|bottom:\s*8[0-4]px/.test(widgetSource), 'Placement discret au-dessus de la bottom bar mobile (~72px)');
  });
});

describe('Lot 3C — 2. Détection de contexte dynamique (70 cours B1/B2/B3 + portail)', () => {
  test('Détecte correctement un cours B1 (b1-python), B2 (api-rest-flask), B3 (b3-cloud-aws) et le portail (/index.html)', () => {
    const widget = require('../rd-ai-chat');
    assert.equal(typeof widget.detectContext, 'function', 'detectContext doit être exporté pour les tests');

    // Cours B1 : b1-python
    const ctxB1 = widget.detectContext({
      url: 'https://revi-mu.vercel.app/b1-python/chapitres/chapitre2.html',
      h1: 'Chapitre 2 — Structures conditionnelles et boucles',
      title: 'Chapitre 2 — Python B1'
    });
    assert.equal(ctxB1.courseId, 'b1-python');
    assert.equal(ctxB1.level, 'b1');
    assert.equal(ctxB1.courseTitle, 'Python');
    assert.equal(ctxB1.chapter, 'chapitre2');
    assert.ok(ctxB1.pageTitle.includes('Chapitre 2'), 'pageTitle B1 doit reprendre le h1/title');
    assert.ok(ctxB1.context.includes('Python'), 'context B1 doit mentionner Python');

    // Cours B2 : api-rest-flask
    const ctxB2 = widget.detectContext({
      url: 'https://revi-mu.vercel.app/api-rest-flask/chapitres/chapitre4.html',
      h1: 'Chapitre 4 — Authentification JWT et middlewares',
      title: 'Chapitre 4 — API REST avec Flask B2'
    });
    assert.equal(ctxB2.courseId, 'api-rest-flask');
    assert.equal(ctxB2.level, 'b2');
    assert.equal(ctxB2.courseTitle, 'API REST avec Flask');
    assert.equal(ctxB2.chapter, 'chapitre4');
    assert.ok(ctxB2.context.includes('API REST avec Flask'), 'context B2 doit mentionner API REST avec Flask');

    // Cours B3 : b3-cloud-aws
    const ctxB3 = widget.detectContext({
      url: 'https://revi-mu.vercel.app/b3-cloud-aws/chapitres/chapitre1.html',
      h1: 'Chapitre 1 — Fondamentaux AWS et IAM',
      title: 'Chapitre 1 — Services Cloud AWS B3'
    });
    assert.equal(ctxB3.courseId, 'b3-cloud-aws');
    assert.equal(ctxB3.level, 'b3');
    assert.equal(ctxB3.courseTitle, 'Services Cloud AWS');
    assert.equal(ctxB3.chapter, 'chapitre1');
    assert.ok(ctxB3.context.includes('Services Cloud AWS'), 'context B3 doit mentionner Services Cloud AWS');

    // Portail : /index.html
    const ctxPortal = widget.detectContext({
      url: 'https://revi-mu.vercel.app/index.html',
      h1: 'Apprenez en codant.',
      title: 'Cours Interactifs — Portail Informatique B1, B2 & B3'
    });
    assert.equal(ctxPortal.courseId, 'portal');
    assert.equal(ctxPortal.chapter, 'index');
    assert.ok(ctxPortal.context.includes('71 cours'), 'Le contexte portail doit mentionner les 71 cours actifs');
    assert.ok(!ctxPortal.context.includes('7 cours'), 'Le contexte portail ne doit jamais dire 7 cours');

    // Vérifie que les 71 cours actifs de server/courses.js sont reconnus par detectContext
    const activeDirs = COURSE_DIRS.filter((id) => !COURSES[id].archived);
    assert.equal(activeDirs.length, 71);
    for (const dir of activeDirs) {
      const c = widget.detectContext({ url: `/${encodeURIComponent(dir)}/chapitres/chapitre1.html` });
      assert.equal(c.courseId, dir, `Le cours ${dir} doit être reconnu par detectContext`);
      assert.equal(c.level, COURSES[dir].level, `Le niveau de ${dir} doit correspondre à server/courses.js`);
      assert.equal(c.courseTitle, COURSES[dir].name, `Le titre de ${dir} doit correspondre à server/courses.js`);
    }
  });
});

describe('Lot 3C — 3. Prompt système dynamique & sécurité serveur (server/routes/ai-chat.js)', () => {
  test('POST /api/ai-chat enrichit le prompt système depuis server/courses.js et préserve la sécurité', async () => {
    const savedSecret = process.env.JWT_SECRET;
    const savedOpenRouterKey = process.env.OPENROUTER_API_KEY;
    process.env.JWT_SECRET = 'test-secret-lot3c-ai-chat';
    process.env.OPENROUTER_API_KEY = 'sk-or-v1-secret-must-never-leak-3c';

    const origChat = aiPool.chatCompletion;
    const origGetSession = db.getSessionByJti;
    const origGetUser = db.getUserById;

    const capturedCalls = [];
    aiPool.chatCompletion = async (opts) => {
      capturedCalls.push(opts);
      return { data: { choices: [{ message: { content: 'Explication pédagogique claire.' } }] } };
    };
    db.getSessionByJti = async () => ({ is_valid: true, user_id: 7 });
    db.getUserById = async () => ({
      id: 7,
      is_active: true,
      level: 'b3',
      subscription_status: 'active',
      subscription_expires_at: new Date(Date.now() + 86400000).toISOString()
    });

    const app = buildApp({ logger: false });
    try {
      const token = jwt.sign({ userId: 7, jti: 'jti-lot3c' }, process.env.JWT_SECRET);

      // 1. Requête avec contexte de cours B3 (b3-cloud-aws)
      const longContent = 'Q'.repeat(5000);
      const resB3 = await app.inject({
        method: 'POST',
        url: '/api/ai-chat',
        cookies: { auth_token: token },
        payload: {
          context: {
            courseId: 'b3-cloud-aws',
            courseTitle: 'Services Cloud AWS',
            level: 'b3',
            pageTitle: 'Chapitre 3 — VPC et sous-réseaux',
            chapter: 'chapitre3'
          },
          messages: [
            { role: 'user', content: longContent }
          ]
        }
      });

      assert.equal(resB3.statusCode, 200);
      assert.equal(capturedCalls.length, 1);

      const sentMessages = capturedCalls[0].messages;
      assert.equal(sentMessages[0].role, 'system', 'Un message system dynamique doit être présent en tête');
      assert.ok(sentMessages[0].content.includes('Services Cloud AWS'), 'Le prompt système doit citer le titre officiel du cours depuis server/courses.js');
      assert.ok(sentMessages[0].content.includes('b3-cloud-aws'), 'Le prompt système doit référencer l’identifiant du cours');
      assert.ok(sentMessages[0].content.includes('Licence 3') || sentMessages[0].content.includes('B3'), 'Le prompt système doit indiquer le niveau B3 / Licence 3');
      assert.ok(sentMessages[0].content.includes('chapitre3'), 'Le prompt système doit inclure le chapitre courant');
      assert.ok(sentMessages[0].content.includes('71 cours'), 'Le prompt système doit mentionner le catalogue de 71 cours actifs');
      assert.ok(!/\b7\s+cours\b/i.test(sentMessages[0].content), 'Le prompt système ne doit jamais mentionner "7 cours"');

      // Vérifie la troncature à 4000 caractères (validation taille)
      const userMsg = sentMessages.find((m) => m.role === 'user');
      assert.equal(userMsg.content.length, 4000, 'Le message utilisateur doit être tronqué à 4000 caractères max');

      // Vérifie l'absence de fuite de clé API dans la réponse
      const rawBody = resB3.body;
      assert.ok(!rawBody.includes('sk-or-v1-secret-must-never-leak-3c'), 'La clé API ne doit jamais fuiter dans la réponse');

      // 2. Vérifie la configuration du rate-limit sur la route
      const routeSource = fs.readFileSync(ROUTE_PATH, 'utf8');
      assert.ok(routeSource.includes('rateLimit') && routeSource.includes('max: 30'), 'Le rate-limit (max: 30 / 1 minute) doit être conservé');
    } finally {
      aiPool.chatCompletion = origChat;
      db.getSessionByJti = origGetSession;
      db.getUserById = origGetUser;
      await app.close();
      if (savedSecret !== undefined) process.env.JWT_SECRET = savedSecret;
      else delete process.env.JWT_SECRET;
      if (savedOpenRouterKey !== undefined) process.env.OPENROUTER_API_KEY = savedOpenRouterKey;
      else delete process.env.OPENROUTER_API_KEY;
    }
  });
});
