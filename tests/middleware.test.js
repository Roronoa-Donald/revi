'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { isProtected, getCourseFromUrl } = require('../server/middleware/access-control');

async function loadEdgeMiddleware() {
  return import('../middleware.js');
}

test('Edge middleware : normalisation et décodage itératif anti-contournement', async () => {
  const mw = await loadEdgeMiddleware();
  assert.strictEqual(typeof mw.isProtectedPath, 'function', 'middleware.js doit exporter isProtectedPath');
  assert.strictEqual(typeof mw.normalizePathname, 'function', 'middleware.js doit exporter normalizePathname');
  assert.strictEqual(typeof mw.getCourseFromPath, 'function', 'middleware.js doit exporter getCourseFromPath');
  assert.strictEqual(typeof mw.canAccessPath, 'function', 'middleware.js doit exporter canAccessPath');

  // Encodage simple et double du chemin ou du nom de cours
  assert.strictEqual(mw.isProtectedPath('/b1-python/%63hapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/b1-python/%2563hapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/%6c%69%6e%75%78/chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/%256c%2569%256e%2575%2578/chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.getCourseFromPath('/%6c%69%6e%75%78/chapitres/chapitre2.html'), 'linux');
  assert.strictEqual(mw.getCourseFromPath('/%256c%2569%256e%2575%2578/chapitres/chapitre2.html'), 'linux');

  // Cours avec espaces encodés
  assert.strictEqual(mw.isProtectedPath('/Cyber%20securite%20B2/chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/Cyber%20securite%20B2/chapitres/chapitre1.html'), false);
  assert.strictEqual(mw.getCourseFromPath('/Cyber%20securite%20B2/chapitres/chapitre2.html'), 'Cyber securite B2');

  // Traversée .. (brute ou encodée)
  assert.strictEqual(mw.isProtectedPath('/b1-python/chapitres/../chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/b1-python/assets/%2e%2e/chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/_auth/../b1-python/chapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/b1-python/chapitres/chapitre1.html/../../chapitres/chapitre2.html'), true);

  // Encodage UTF-8 malformé -> fail-closed (jamais traité comme public)
  assert.strictEqual(mw.isProtectedPath('/b1-python/%c0%afchapitres/chapitre2.html'), true);
  assert.strictEqual(mw.isProtectedPath('/%ZZ/chapitre2.html'), true);

  // Contrôle de niveau résistant à l'encodage
  assert.strictEqual(mw.canAccessPath('b1', '/%62%33-linux/chapitres/chapitre2.html'), false);
  assert.strictEqual(mw.canAccessPath('b3', '/%62%33-linux/chapitres/chapitre2.html'), true);
});

test('Edge middleware() handler : bloque %63hapitres, traversée /_auth/.. et /_auth/%61dmin/dashboard', async () => {
  const { default: middleware } = await loadEdgeMiddleware();
  const origFetch = global.fetch;

  global.fetch = async (url) => {
    const u = String(url);
    if (u.includes('/api/admin/verify')) {
      return new Response(JSON.stringify({ valid: false }), { status: 401 });
    }
    return new Response(JSON.stringify({ authenticated: false }), { status: 200 });
  };

  try {
    for (const badPath of [
      '/b1-python/%63hapitres/chapitre2.html',
      '/b1-python/%2563hapitres/chapitre2.html',
      '/_auth/../b1-python/chapitres/chapitre2.html',
      '/%6c%69%6e%75%78/chapitres/chapitre2.html'
    ]) {
      const res = await middleware(new Request(`https://example.test${badPath}`));
      assert.strictEqual(res.status, 307, `Doit rediriger vers login pour ${badPath}`);
      assert.match(res.headers.get('location') || '', /\/_auth\/login\.html/);
    }

    const adminBypass = await middleware(new Request('https://example.test/_auth/%61dmin/dashboard.html'));
    assert.strictEqual(adminBypass.status, 307, 'Contournement /_auth/%61dmin/dashboard.html doit rediriger');
    assert.match(adminBypass.headers.get('location') || '', /\/_auth\/admin\/login\.html/);

    const malformed = await middleware(new Request('https://example.test/b1-python/%c0%afchapitres/chapitre2.html'));
    assert.ok([307, 400].includes(malformed.status), 'URL malformée doit être bloquée');
  } finally {
    global.fetch = origFetch;
  }
});

test('Node access-control : cohérence encodage itératif et fail-closed malformé', () => {
  assert.strictEqual(isProtected('/%6c%69%6e%75%78/chapitres/chapitre2.html'), true);
  assert.strictEqual(isProtected('/%256c%2569%256e%2575%2578/chapitres/chapitre2.html'), true);
  assert.strictEqual(isProtected('/b1-python/%c0%afchapitres/chapitre2.html'), true);
  assert.strictEqual(getCourseFromUrl('/%256c%2569%256e%2575%2578/chapitres/chapitre2.html'), 'linux');
});
