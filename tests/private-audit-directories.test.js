'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');

test('les répertoires internes sont déclarés exclus des sources Vercel', () => {
  const root = path.resolve(__dirname, '..');
  const rules = fs.readFileSync(path.join(root, '.vercelignore'), 'utf8')
    .split(/\r?\n/).map(line => line.trim()).filter(line => line && !line.startsWith('#'));
  for (const directory of ['audit/', 'corrections/', 'verification/', 'tests/', '.taskstate/']) {
    assert.ok(rules.includes(directory), `${directory} absent de .vercelignore`);
    assert.ok(!rules.some(rule => rule.startsWith(`!${directory}`)), `${directory} réinclus`);
  }
});

test('le build statique ne copie pas les répertoires internes racine', () => {
  const root = path.resolve(__dirname, '..');
  const fixture = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-build-prive-'));
  try {
    for (const directory of ['scripts', 'server', 'corrections', 'verification', 'tests', 'audit', '.taskstate']) {
      fs.mkdirSync(path.join(fixture, directory));
    }
    fs.copyFileSync(path.join(root, 'scripts/build.js'), path.join(fixture, 'scripts/build.js'));
    fs.writeFileSync(path.join(fixture, 'server/courses.js'), 'module.exports = { COURSE_DIRS: [] };\n');
    fs.writeFileSync(path.join(fixture, 'index.html'), '<html><head></head><body>public</body></html>\n');
    for (const directory of ['corrections', 'verification', 'tests', 'audit', '.taskstate']) {
      fs.writeFileSync(path.join(fixture, directory, 'temoin.json'), '{"prive":true}\n');
    }
    const result = spawnSync(process.execPath, [path.join(fixture, 'scripts/build.js')], { encoding: 'utf8' });
    assert.equal(result.status, 0, result.stderr);
    assert.ok(fs.existsSync(path.join(fixture, 'dist/index.html')));
    for (const directory of ['corrections', 'verification', 'tests', 'audit', '.taskstate']) {
      assert.ok(!fs.existsSync(path.join(fixture, 'dist', directory)), `${directory} présent dans dist`);
    }
  } finally {
    fs.rmSync(fixture, { recursive: true, force: true });
  }
});

test('le serveur local refuse les dossiers internes d’audit, corrections et tests', async () => {
  const root = path.resolve(__dirname, '..');
  let handler;
  const app = {
    get(route, callback) { handler = callback; },
    async listen() {},
    log: { error() {} }
  };
  const dependencies = {
    dotenv: { config() {} },
    './server/app': { buildApp: () => app },
    './server/db': { initDB: async () => {} },
    './server/middleware/access-control': require('../server/middleware/access-control')
  };
  const source = fs.readFileSync(path.join(root, 'server.js'), 'utf8');
  const context = {
    __dirname: root,
    require(name) { return dependencies[name] || require(name); },
    process: { env: { DATABASE_URL: 'test', JWT_SECRET: 'test', ADMIN_USERNAME: 'test', ADMIN_PASSWORD: 'test' }, exit() {} },
    console: { log() {}, error() {} }
  };
  vm.runInNewContext(source, context, { filename: 'server.js' });
  assert.equal(typeof handler, 'function');
  for (const url of [
    '/verification/00-synthese.md', '/corrections/suivi.csv',
    '/corrections/resultats/generalisation-csharp-final-lot1-partie3.json',
    '/%63orrections/resultats/coincidences-attendus-grilles-lot1-partie3.jsonl.gz',
    '/x/../verification/00-synthese.md', '/x/../corrections/suivi.csv', '/%63orrections/suivi.csv',
    '/tests/csharp-lot1.test.js', '/x/../tests/csharp-lot1.test.js', '/%74ests/csharp-lot1.test.js',
    '/audit/00-cartographie.md', '/x/../audit/00-cartographie.md', '/%61udit/00-cartographie.md',
    '/.taskstate/evidence.md', '/x/../.taskstate/evidence.md', '/%2etaskstate/evidence.md'
  ]) {
    const reply = {
      statusCode: 200,
      code(status) { this.statusCode = status; return this; },
      type() { return this; },
      send(body) { this.body = body; return this; }
    };
    await handler({ url, cookies: {} }, reply);
    assert.equal(reply.statusCode, 403, url);
  }
});

test('les requêtes HTTP Fastify refusent les fichiers de tests sans fermer les pages publiques', async () => {
  const root = path.resolve(__dirname, '..');
  const app = require('fastify')({ logger: false });
  app.listen = async () => {};
  const dependencies = {
    dotenv: { config() {} },
    './server/app': { buildApp: () => app },
    './server/db': { initDB: async () => {} },
    './server/middleware/access-control': require('../server/middleware/access-control')
  };
  const context = {
    __dirname: root,
    require(name) { return dependencies[name] || require(name); },
    process: { env: { DATABASE_URL: 'test', JWT_SECRET: 'test', ADMIN_USERNAME: 'test', ADMIN_PASSWORD: 'test' }, exit() {} },
    console: { log() {}, error() {} }
  };
  vm.runInNewContext(fs.readFileSync(path.join(root, 'server.js'), 'utf8'), context, { filename: 'server.js' });
  try {
    await app.ready();
    for (const url of [
      '/tests/csharp-lot1.test.js', '/%74ests/sql-lot1-variants.test.js', '/.taskstate/evidence.md',
      '/audit/00-cartographie.md', '/corrections/resultats/generalisation-csharp-final-lot1-partie3.json',
      '/%63orrections/resultats/coincidences-attendus-grilles-lot1-partie3.jsonl.gz'
    ]) {
      const response = await app.inject({ method: 'GET', url });
      assert.equal(response.statusCode, 403, url);
    }
    const publicPage = await app.inject({ method: 'GET', url: '/index.html' });
    assert.equal(publicPage.statusCode, 200);
  } finally {
    await app.close();
  }
});
