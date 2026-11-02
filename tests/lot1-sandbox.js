'use strict';

const assert = require('node:assert/strict');
const { spawnSync } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

function runInsideIsolatedOrRegister(filename) {
  if (process.env.REVI_LOT1_ISOLATED === '1') {
    const home = process.env.HOME;
    const hostNetwork = process.env.REVI_AUDIT_NET_NS_HOTE;
    assert.ok(hostNetwork, 'Espace réseau de référence absent');
    assert.notEqual(fs.readlinkSync('/proc/self/ns/net'), hostNetwork, 'Réseau non isolé');
    assert.equal(fs.readFileSync('/proc/1/comm', 'utf8').trim(), 'bwrap');
    assert.ok(home === undefined || home === '/tmp', 'HOME utilisateur exposé');
    assert.equal(fs.existsSync('/home'), false, 'Répertoire utilisateur exposé');
    return true;
  }

  const name = path.basename(filename);
  const isSql = /^sql-lot1(?:-(?:examples|variants|dom|browser|fresh|b2-ddl|index|b2-course|b3-wal|b1-oracle|b2b3-oracle))?\.test\.js$/.test(name);
  const course = name.replace(/-lot1\.test\.js$/, '');
  const root = path.resolve(__dirname, '..');
  const launcher = path.join(root, 'corrections/outils/rejouer-isole.sh');
  const available = process.platform === 'linux' && fs.existsSync('/usr/bin/bwrap') && fs.existsSync(launcher);
  test(`banc ${isSql ? name : course} exécuté dans bubblewrap`, {
    skip: available ? false : 'bubblewrap et le lanceur du projet sont requis'
  }, context => {
    const result = spawnSync('/bin/bash', [launcher, isSql ? 'sql' : 'catalogue', isSql ? name : course], {
      encoding: 'utf8', timeout: 240000, maxBuffer: 8 * 1024 * 1024
    });
    assert.equal(result.status, 0, `${result.error || ''}\n${result.stdout}\n${result.stderr}`);
    context.diagnostic(result.stdout.trim());
  });
  return false;
}

module.exports = { runInsideIsolatedOrRegister };
