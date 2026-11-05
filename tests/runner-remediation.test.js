'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const { validateShellCommand, normalizeCommand, MAX_COMMAND_LENGTH } = require('../server/exercises/command-validator');

test('command-validator.js : Comparateur command_challenge pour l’apprentissage shell', () => {
  // 1. Commande attendue et variantes reconnues
  const t1 = {
    expected: 'ls -la',
    patterns: [/^ls\s+-(?:la|al)$/, /^ls\s+-l\s+-a$/]
  };

  assert.equal(validateShellCommand('ls -la', t1).matched, true);
  assert.equal(validateShellCommand('ls -al', t1).matched, true);
  assert.equal(validateShellCommand('ls -l -a', t1).matched, true);
  assert.equal(validateShellCommand('ls   -a   -l', t1).matched, true);

  // Commande erronée
  assert.equal(validateShellCommand('dir', t1).matched, false);
  assert.equal(validateShellCommand('rm -rf /', t1).matched, false);
});

test('command-validator.js : Normalisation syntaxique des arguments et drapeaux', () => {
  // Drapeaux combinés et ordonnés
  assert.equal(normalizeCommand('ls -l -a'), 'ls -al');
  assert.equal(normalizeCommand('ls -a -l'), 'ls -al');
  assert.equal(normalizeCommand('ls -la'), 'ls -al');

  // Nettoyage des chemins relatifs redondants
  assert.equal(normalizeCommand('cat ./fichier.txt'), 'cat fichier.txt');
  assert.equal(normalizeCommand('cd mon_dossier/'), 'cd mon_dossier');

  // Préservation sémantique des guillemets simples avec variables shell
  assert.equal(normalizeCommand("echo '$HOME'"), "echo '$HOME'");
  assert.equal(normalizeCommand('echo "$HOME"'), 'echo "$HOME"');
});

test('command-validator.js : Détection des quasi-erreurs fréquentes avec messages explicatifs', () => {
  const t = {
    expected: 'chmod 755 script.sh',
    rejected: [
      { pattern: /chmod\s+777/, message: 'Permissions trop permissives : 777 accorde tous les droits à tout le monde.' },
      { pattern: /chmod\s+\+x/, message: 'Précisez les permissions numériques 755.' }
    ]
  };

  const res777 = validateShellCommand('chmod 777 script.sh', t);
  assert.equal(res777.matched, false);
  assert.match(res777.rejectionMessage, /777 accorde tous les droits/);

  const resExact = validateShellCommand('chmod 755 script.sh', t);
  assert.equal(resExact.matched, true);
  assert.equal(resExact.rejectionMessage, null);
});

test('command-validator.js : Protection contre les commandes anormalement longues (ReDoS)', () => {
  const longCmd = 'ls ' + 'a'.repeat(MAX_COMMAND_LENGTH + 10);
  const res = validateShellCommand(longCmd, { expected: 'ls' });
  assert.equal(res.matched, false);
  assert.match(res.rejectionMessage, /dépasse la longueur maximale autorisée/);
});
