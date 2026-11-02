'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const actions = require('../server/content/b3-github/chapitre5');
const gitChapter = require('../server/content/b3-github/chapitre6');

test('F48 : la carte distingue index, arbre de travail, commit et historique', () => {
  const card = gitChapter.flashcards.find(item => /git rm/.test(item.q));
  assert.match(card.a, /index/i);
  assert.match(card.a, /(?:pas|ne crée)[^.]*commit/i);
  assert.match(card.a, /historique/i);
  assert.match(card.a, /révoq/i);
});

test('F48 : git rm prépare une suppression sans créer de commit dans un dépôt temporaire', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'revi-git-rm-'));
  const env = { ...process.env, GIT_CONFIG_GLOBAL: '/dev/null', GIT_CONFIG_NOSYSTEM: '1' };
  const git = (...args) => execFileSync('git', args, { cwd: directory, env, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  try {
    git('init', '--quiet');
    fs.writeFileSync(path.join(directory, 'removed.txt'), 'valeur-fictive\n');
    fs.writeFileSync(path.join(directory, 'cached.txt'), 'autre-valeur-fictive\n');
    git('add', 'removed.txt', 'cached.txt');
    git('-c', 'user.name=Test local', '-c', 'user.email=test@example.invalid', 'commit', '--quiet', '-m', 'fixture');
    const original = git('rev-parse', 'HEAD');
    git('rm', '--quiet', 'removed.txt');
    git('rm', '--quiet', '--cached', 'cached.txt');
    assert.equal(git('rev-parse', 'HEAD'), original);
    assert.equal(git('show', 'HEAD:removed.txt'), 'valeur-fictive');
    assert.equal(fs.existsSync(path.join(directory, 'removed.txt')), false);
    assert.equal(fs.existsSync(path.join(directory, 'cached.txt')), true);
    assert.match(git('diff', '--cached', '--name-status'), /D\s+removed\.txt/);
  } finally {
    fs.rmSync(directory, { recursive: true, force: true });
  }
});

test('F64 : env évite la substitution directe sans garantir toute sécurité', () => {
  const card = actions.flashcards.find(item => /(?:immuniser|variable.*environnement)/i.test(item.q));
  assert.match(card.a, /guillemets/i);
  assert.match(card.a, /valid/i);
  assert.match(card.a, /eval/i);
  assert.match(card.a, /ne (?:garantit|suffit)/i);
  const payload = '$(printf INJECTION)';
  const output = execFileSync('bash', ['-c', 'printf "%s" "$TITLE"'], { env: { ...process.env, TITLE: payload }, encoding: 'utf8' });
  assert.equal(output, payload);
});
