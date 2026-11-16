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

// ============================================================================
// Lot 2A — Unification du parsing & tolérance, moteur pseudo-code, tuteur IA
// ============================================================================

const localRunner = require('../server/services/execution/local-runner');
const runner = require('../server/exercises/runner');
const languages = require('../server/services/execution/languages');
const aiHelp = require('../server/services/ai-help');

test('Lot 2A — localRunner.runAnalyse : entêtes [Question N], [Cas N], [Exemple], sélecteurs q:N / question:N / cas:N et A_COMPLETER', async () => {
  const draft = [
    '# Format REVI-ANALYSE:1',
    '[Exemple]',
    'Reponse exemple',
    '[Question 1 — Diagnostic réseau]',
    'Premiere ligne',
    'A_COMPLETER',
    '[Question 2]',
    '\\=A_COMPLETER',
    '[Cas 3 — Synthèse finale]',
    'Reponse cas 3'
  ].join('\n');

  const rEx = await localRunner.runAnalyse(draft, 'cas:exemple');
  assert.equal(rEx.ok, true);
  assert.equal(rEx.data.stdout, 'Reponse exemple');

  const rQ1 = await localRunner.runAnalyse(draft, 'q:1');
  assert.equal(rQ1.data.stdout, 'Premiere ligne');

  const rQ1Long = await localRunner.runAnalyse(draft, 'question:1');
  assert.equal(rQ1Long.data.stdout, 'Premiere ligne');

  const rQ2 = await localRunner.runAnalyse(draft, 'q:2');
  assert.equal(rQ2.data.stdout, 'A_COMPLETER');

  const rC3 = await localRunner.runAnalyse(draft, 'cas:3');
  assert.equal(rC3.data.stdout, 'Reponse cas 3');

  const rQ3 = await localRunner.runAnalyse(draft, 'q:3');
  assert.equal(rQ3.data.stdout, 'Reponse cas 3');

  // Entête partiellement préfixé (sans crochets) : "Question 1 — ..." ou "Cas 2 : ..."
  const partialDraft = [
    'Question 1 — Protocole',
    'HTTPS',
    'Cas 2 : Port standard',
    '443'
  ].join('\n');
  assert.equal((await localRunner.runAnalyse(partialDraft, 'q:1')).data.stdout, 'HTTPS');
  assert.equal((await localRunner.runAnalyse(partialDraft, 'cas:2')).data.stdout, '443');

  // Sans entête REVI-ANALYSE:1, \\= doit rester littéral
  const legacyDraft = 'Question 1\n\\=valeur';
  assert.equal((await localRunner.runAnalyse(legacyDraft, 'q:1')).data.stdout, '\\=valeur');
});

test('Lot 2A — runner.matchOutputs (analyse) : variantes ||, normalisation tolérante et gardes strictes', () => {
  const analyseEx = { id: 'test-analyse', language: 'analyse' };

  // Variantes séparées par ||
  assert.equal(runner.matchOutputs('TCP', 'UDP||TCP||QUIC', { expected: 'UDP||TCP||QUIC' }, analyseEx), true);
  assert.equal(runner.matchOutputs('udp', 'UDP||TCP', { expected: 'UDP||TCP' }, analyseEx), true);
  assert.equal(runner.matchOutputs('HTTP', 'UDP||TCP', { expected: 'UDP||TCP' }, analyseEx), false);

  // Normalisation tolérante : accents NFD, espaces multiples, ponctuation mineure, % et unités décimales
  assert.equal(runner.matchOutputs('Réseau   local !', 'reseau local', { expected: 'reseau local' }, analyseEx), true);
  assert.equal(runner.matchOutputs('25,5 %', '25.5%', { expected: '25.5%' }, analyseEx), true);
  assert.equal(runner.matchOutputs('12,5 ms', '12.5 ms', { expected: '12.5 ms' }, analyseEx), true);

  // Gardes anti-régression : mode exact, fraction vs unité, JSON strict, ordre clé:valeur
  assert.equal(runner.matchOutputs('tcp', 'UDP||TCP', { expected: 'UDP||TCP', mode: 'exact' }, analyseEx), false);
  assert.equal(runner.matchOutputs('0,25 kg', '1/4', { expected: '1/4' }, analyseEx), false);
  assert.equal(runner.matchOutputs('{"a":"TCP"}', '{"a":"tcp"}', { expected: '{"a":"tcp"}' }, analyseEx), false);
  assert.equal(
    runner.matchOutputs('BEST_PATH=R2\nBACKUP_PATH=R1', 'BEST_PATH=R1\nBACKUP_PATH=R2', { expected: 'BEST_PATH=R1\nBACKUP_PATH=R2' }, analyseEx),
    false
  );
});

test('Lot 2A — languages.js & local-runner.js : support complet de algo / pseudocode côté serveur', async () => {
  const algoLang = languages.getLanguage('algo');
  assert.ok(algoLang, 'languages.getLanguage("algo") doit être défini');
  assert.equal(algoLang.id, 'algo');
  assert.equal(algoLang.monaco, 'pseudocode');
  assert.equal(algoLang.ext, 'algo');
  assert.equal(algoLang.aliases.includes('pseudocode'), true);
  assert.equal(algoLang.aliases.includes('pseudo-code'), true);
  assert.equal(languages.getLanguage('pseudocode'), null);

  assert.equal(localRunner.canHandle('algo'), true);
  assert.equal(localRunner.canHandle('pseudocode'), true);
  assert.equal(localRunner.canHandle('pseudo-code'), true);

  const algoCode = [
    'Algorithme DoubleNombre',
    'Variable',
    '  n, r : Entier',
    'Debut',
    '  Lire(n)',
    '  r <- n * 2',
    '  Afficher(r)',
    'Fin'
  ].join('\n');

  const execRes = await localRunner.run({ language: 'algo', code: algoCode, stdin: '21' });
  assert.equal(execRes.ok, true);
  assert.equal(execRes.data.exit_code, 0);
  assert.equal(execRes.data.stdout.trim(), '42');

  // Erreur de syntaxe
  const badCode = 'Algorithme Casse\nDebut\n  Si x > 0 Alors\n    Afficher(x)\nFin';
  const badRes = await localRunner.run({ language: 'algo', code: badCode, stdin: '' });
  assert.equal(badRes.ok, false);
  assert.ok(badRes.data.compile_error || badRes.data.stderr);
});

test('Lot 2A — runner.runTests : notation déterministe d’un exercice b1-algo avec tests cachés et stdin', async () => {
  const algoEx = {
    id: 'al-test-1',
    language: 'algo',
    tests: [
      { id: 'ex', stdin: '5', expected: '25', isExample: true },
      { id: 't1', stdin: '0', expected: '0' },
      { id: 't2', stdin: '-4', expected: '16' }
    ]
  };
  const code = [
    'Algorithme Carre',
    'Variable x : Entier',
    'Debut',
    '  Lire(x)',
    '  Afficher(x * x)',
    'Fin'
  ].join('\n');

  const res = await runner.runTests(algoEx, code, {
    execute: async ({ language, code: src, stdin }) => {
      const out = await localRunner.run({ language, code: src, stdin });
      return {
        ok: out.ok,
        status: out.ok ? 'success' : (out.data.compile_error ? 'compile_error' : 'runtime_error'),
        stdout: out.data.stdout,
        stderr: out.data.stderr,
        compileError: out.data.compile_error || '',
        exitCode: out.data.exit_code
      };
    }
  });

  assert.equal(res.ok, true);
  assert.equal(res.passed, 3);
  assert.equal(res.total, 3);
});

test('Lot 2A — ai-help.js : diagnostic contextuel pédagogique pour analyse sans fuite de solution ni réponse générique vide', () => {
  const msgs = aiHelp.buildMessages({
    language: 'analyse',
    title: 'Routage statique IPv4',
    courseTitle: 'Réseaux CCNA 1',
    chapterTitle: 'Routage et passerelles',
    goal: 'Identifier la route par défaut et son saut suivant',
    statement: 'Complète la table de diagnostic.',
    code: '# Format REVI-ANALYSE:1\n[Question 1 — Passerelle]\n192.168.1.254\n[Question 2 — Métrique]\n10',
    status: 'wrong_output',
    failingCaseLabel: 'Question 2 — Métrique',
    actual: '10',
    question: 'Pourquoi ma métrique est incorrecte ?'
  });

  assert.equal(Array.isArray(msgs), true);
  assert.equal(msgs.length, 2);
  const userMsg = msgs[1].content;
  assert.match(userMsg, /Routage statique IPv4/);
  assert.match(userMsg, /Question 2 — Métrique/);
  assert.match(userMsg, /Réseaux CCNA 1/);
  assert.match(userMsg, /192\.168\.1\.254/);
  assert.match(userMsg, /Pourquoi ma métrique est incorrecte/);
  assert.match(userMsg, /attendu.{0,35}(non transmis|non communiqué|masqué)/i);
  assert.doesNotMatch(userMsg, /Résultat attendu\s*:\s*(?:\n|$)/);
});
