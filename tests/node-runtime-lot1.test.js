'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.resolve(__dirname, '..');

test('Node 22 est défini dans les métadonnées npm', () => {
  const manifest = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
  const lock = JSON.parse(fs.readFileSync(path.join(root, 'package-lock.json'), 'utf8'));

  assert.equal(manifest.engines.node, '22.x');
  assert.equal(lock.packages[''].engines.node, manifest.engines.node);
});

test('le blueprint Render épingle Node 22.23.4', context => {
  const parse = spawnSync('ruby', [
    '-rjson', '-ryaml', '-e',
    'print JSON.generate(YAML.safe_load(File.read(ARGV.fetch(0)), aliases: false))',
    path.join(root, 'render.yaml')
  ], { encoding: 'utf8' });
  if (parse.error && parse.error.code === 'ENOENT') {
    context.skip('Ruby/Psych est nécessaire pour analyser le blueprint YAML');
    return;
  }
  assert.equal(parse.status, 0, parse.stderr);
  const blueprint = JSON.parse(parse.stdout);
  const service = blueprint.services.find(item => item.name === 'cours-interactif');
  assert.ok(service);
  assert.equal(service.runtime, 'node');
  assert.equal(service.envVars.find(item => item.key === 'NODE_VERSION')?.value, '22.23.4');
});

test('la documentation distingue la version voulue de celle effectivement déployée', () => {
  const readme = fs.readFileSync(path.join(root, 'README.md'), 'utf8');

  assert.match(readme, /Node\.js 22\.x/);
  assert.match(readme, /NODE_VERSION=22\.23\.4/);
  assert.match(readme, /Vercel[\s\S]*version exacte peut différer/);
  assert.match(readme, /ne confirment pas, à eux seuls, la version d'un déploiement existant/);
});
