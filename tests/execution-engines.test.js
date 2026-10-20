/**
 * Tests unitaires et d'intégration pour le système d'exécution de code multi-moteurs :
 * 1. Interface et contrats standard
 * 2. Moteur pédagogique de pseudo-code (Lexer, Parser, AST, Runtime, limites)
 * 3. Routeur d'exécution (résolution des moteurs, provenance, badges)
 * 4. Moteur de correction et comparateurs adaptés (exact, tolérance numérique, lignes)
 */
const { test, describe } = require('node:test');
const assert = require('node:assert/strict');

const engineInterface = require('../assets/js/engines/engine-interface');
const pseudoCode = require('../assets/js/engines/pseudo-code-engine');
const ExecutionRouter = require('../assets/js/execution-router');
const { runTests } = require('../server/exercises/runner');

describe('1. Contrat et interface d’exécution (engine-interface.js)', () => {
  test('createResult : structure complète et valeurs par défaut', () => {
    const res = engineInterface.createResult({
      status: 'success',
      stdout: 'Bonjour\n',
      executionTime: 0.042
    });

    assert.equal(res.status, 'success');
    assert.equal(res.stdout, 'Bonjour\n');
    assert.equal(res.stderr, '');
    assert.equal(res.compileError, '');
    assert.equal(res.exitCode, 0);
    assert.equal(res.executionTime, 0.042);
    assert.equal(res.memory, null);
    assert.equal(res.provenance, 'browser');
    assert.equal(res.provider, 'Navigateur');
    assert.deepEqual(res.warnings, []);
  });

  test('createResult : code de sortie 1 par défaut sur erreur', () => {
    const res = engineInterface.createResult({ status: 'runtime_error', stderr: 'Oups' });
    assert.equal(res.exitCode, 1);
    assert.equal(res.stderr, 'Oups');
  });

  test('truncateOutput : respect des limites de caractères et de lignes', () => {
    const longText = 'x'.repeat(60000);
    const truncated = engineInterface.truncateOutput(longText, 50000, 2000);
    assert.ok(truncated.length <= 51000);
    assert.ok(truncated.includes('Sortie tronquée'));

    const lines = Array.from({ length: 3000 }, (_, i) => `Ligne ${i}`).join('\n');
    const truncatedLines = engineInterface.truncateOutput(lines, 100000, 2000);
    assert.ok(truncatedLines.split('\n').length <= 2010);
    assert.ok(truncatedLines.includes('Sortie tronquée'));
  });
});

describe('2. Interpréteur pédagogique de pseudo-code (pseudo-code-engine.js)', () => {
  test('Variables, affectations et affichage simple', async () => {
    const code = `
    Variables
      a, b : Entier
      message : Chaine
    Début
      a <- 15
      b <- 27
      message <- "Résultat :"
      Afficher(message, a + b)
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'success');
    assert.equal(res.stdout.trim(), 'Résultat : 42');
  });

  test('Conditions Si ... Alors ... Sinon ... FinSi', async () => {
    const code = `
    Début
      note <- 14
      Si note >= 10 Alors
        Afficher("Admis")
      Sinon
        Afficher("Ajourné")
      FinSi
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'success');
    assert.equal(res.stdout.trim(), 'Admis');
  });

  test('Boucle Pour de ... à ... avec accumulation', async () => {
    const code = `
    Début
      somme <- 0
      Pour i De 1 A 5 Faire
        somme <- somme + i
      FinPour
      Afficher("Somme =", somme)
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'success');
    assert.equal(res.stdout.trim(), 'Somme = 15');
  });

  test('Boucle Tant que', async () => {
    const code = `
    Début
      compteur <- 3
      Tant que compteur > 0 Faire
        Afficher("Décompte:", compteur)
        compteur <- compteur - 1
      FinTantQue
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'success');
    assert.match(res.stdout, /Décompte: 3\nDécompte: 2\nDécompte: 1/);
  });

  test('Lecture interactive avec Lire() et entrée standard', async () => {
    const code = `
    Début
      Lire(x, y)
      Afficher("Produit:", x * y)
    Fin
    `;
    const res = await pseudoCode.execute(code, '6\n7');
    assert.equal(res.status, 'success');
    assert.equal(res.stdout.trim(), 'Produit: 42');
  });

  test('Opérateurs logiques ET, OU, NON et modulo MOD / DIV', async () => {
    const code = `
    Début
      x <- 17
      est_pair <- (x MOD 2) == 0
      division_entiere <- x DIV 5
      Afficher("Pair ?", est_pair)
      Afficher("Div:", division_entiere)
      Si NON est_pair ET x > 10 Alors
        Afficher("Impair et supérieur à 10")
      FinSi
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'success');
    assert.match(res.stdout, /Pair \? false/);
    assert.match(res.stdout, /Div: 3/);
    assert.match(res.stdout, /Impair et supérieur à 10/);
  });

  test('Détection et arrêt des boucles infinies (sécurité anti-freeze)', async () => {
    const code = `
    Début
      i <- 1
      Tant que i > 0 Faire
        i <- i + 1
      FinTantQue
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'runtime_error');
    assert.match(res.stderr, /Boucle infinie détectée/);
  });

  test('Détection des erreurs de syntaxe avec ligne précise', async () => {
    const code = `
    Début
      Si x > 5
        Afficher("Erreur")
      FinSi
    Fin
    `;
    const res = await pseudoCode.execute(code, '');
    assert.equal(res.status, 'compile_error');
    assert.match(res.compileError, /Erreur de syntaxe/);
  });
});

describe('3. Routeur d’exécution et provenance (execution-router.js)', () => {
  const router = new ExecutionRouter();

  test('Reconnaissance des langages exécutables dans le navigateur', () => {
    assert.equal(router.supportsBrowser('python'), true);
    assert.equal(router.supportsBrowser('py'), true);
    assert.equal(router.supportsBrowser('javascript'), true);
    assert.equal(router.supportsBrowser('js'), true);
    assert.equal(router.supportsBrowser('algo'), true);
    assert.equal(router.supportsBrowser('pseudocode'), true);
    assert.equal(router.supportsBrowser('sql'), true);
  });

  test('Reconnaissance des langages nécessitant le serveur', () => {
    assert.equal(router.supportsBrowser('c'), false);
    assert.equal(router.supportsBrowser('cpp'), false);
    assert.equal(router.supportsBrowser('java'), false);
    assert.equal(router.supportsBrowser('php'), false);
    assert.equal(router.supportsBrowser('shell'), false);
    assert.equal(router.supportsBrowser('csharp'), false);
  });

  test('Badges de provenance UI (getProvenanceInfo)', () => {
    const pyBadge = router.getProvenanceInfo('python');
    assert.equal(pyBadge.mode, 'browser');
    assert.equal(pyBadge.label, 'Navigateur');
    assert.equal(pyBadge.icon, 'lightning');

    const cBadge = router.getProvenanceInfo('c');
    assert.equal(cBadge.mode, 'server');
    assert.equal(cBadge.label, 'Serveur');
    assert.equal(cBadge.icon, 'cloud');
  });

  test('Exécution de pseudo-code via le routeur unifié', async () => {
    const code = 'Début\nAfficher("OK Routeur")\nFin';
    const res = await router.execute('algo', code, '');
    assert.equal(res.status, 'success');
    assert.equal(res.stdout.trim(), 'OK Routeur');
    assert.equal(res.provenance, 'browser');
  });
});

describe('4. Moteur de correction multi-tests (server/exercises/runner.js)', () => {
  const fakeExercise = {
    language: 'python',
    tests: [
      { label: 'Cas 1', stdin: '2\n3', expected: '5\n' },
      { label: 'Cas 2 (tolérance)', stdin: '7', expected: '3.14159', tolerance: 0.01 },
      { label: 'Cas 3 (exact)', stdin: 'test', expected: 'STRICT', mode: 'exact' }
    ]
  };

  test('Validation avec tests exacts, tolérances et lignes normalisées', async () => {
    const mockExecute = async ({ stdin }) => {
      if (stdin === '2\n3') return { ok: true, status: 'success', stdout: '5\n' };
      if (stdin === '7') return { ok: true, status: 'success', stdout: '3.141589\n' }; // Dans la tolérance 0.01
      if (stdin === 'test') return { ok: true, status: 'success', stdout: 'STRICT' };
      return { ok: true, status: 'success', stdout: '' };
    };

    const report = await runTests(fakeExercise, 'code', { execute: mockExecute });
    assert.equal(report.ok, true);
    assert.equal(report.passed, 3);
    assert.equal(report.total, 3);
    assert.equal(report.stop, null);
  });

  test('Échec si hors de la tolérance numérique', async () => {
    const mockExecute = async ({ stdin }) => {
      if (stdin === '2\n3') return { ok: true, status: 'success', stdout: '5\n' };
      if (stdin === '7') return { ok: true, status: 'success', stdout: '3.25\n' }; // Hors de tolérance 0.01
      return { ok: true, status: 'success', stdout: '' };
    };

    const report = await runTests(fakeExercise, 'code', { execute: mockExecute });
    assert.equal(report.ok, true);
    assert.equal(report.passed, 1);
    assert.ok(report.stop);
    assert.equal(report.stop.reason, 'wrong_output');
    assert.equal(report.stop.testIndex, 1);
  });
});

describe('5. Moteurs Python (Skulpt) et Bac à sable JavaScript (sécurité et exécution)', () => {
  const fs = require('fs');
  const vm = require('vm');

  test('Skulpt : exécution Python standard (math, boucles, f-strings)', async () => {
    const skulptCode = fs.readFileSync('assets/vendor/skulpt/skulpt.min.js', 'utf8');
    const stdlibCode = fs.readFileSync('assets/vendor/skulpt/skulpt-stdlib.js', 'utf8');

    const ctx = { console };
    ctx.self = ctx;
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(skulptCode, ctx);
    vm.runInContext(stdlibCode, ctx);

    let stdout = '';
    ctx.Sk.configure({
      output: (t) => { stdout += t; },
      read: (x) => ctx.Sk.builtinFiles.files[x],
      python3: true
    });

    const pyScript = `
import math
carres = [i**2 for i in range(1, 5)]
print("Racine:", int(math.sqrt(100)))
print("Carres:", carres)
`;
    await ctx.Sk.misceval.asyncToPromise(() =>
      ctx.Sk.importMainWithBody('<stdin>', false, pyScript, true)
    );

    assert.match(stdout, /Racine: 10/);
    assert.match(stdout, /Carres: \[1, 4, 9, 16\]/);
  });

  test('Skulpt : gestion de stdin multi-lignes avec input()', async () => {
    const skulptCode = fs.readFileSync('assets/vendor/skulpt/skulpt.min.js', 'utf8');
    const stdlibCode = fs.readFileSync('assets/vendor/skulpt/skulpt-stdlib.js', 'utf8');

    const ctx = { console };
    ctx.self = ctx;
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(skulptCode, ctx);
    vm.runInContext(stdlibCode, ctx);

    let stdout = '';
    const stdinLines = ['Alice', '25'];
    let idx = 0;

    ctx.Sk.configure({
      output: (t) => { stdout += t; },
      read: (x) => ctx.Sk.builtinFiles.files[x],
      inputfun: () => (idx < stdinLines.length ? stdinLines[idx++] : ''),
      python3: true
    });

    const pyScript = `
nom = input()
age = int(input())
print(f"Bienvenue {nom}, age = {age}")
`;
    await ctx.Sk.misceval.asyncToPromise(() =>
      ctx.Sk.importMainWithBody('<stdin>', false, pyScript, true)
    );

    assert.match(stdout, /Bienvenue Alice, age = 25/);
  });

  test('Skulpt : gestion de EOFError lors d’un input() sur stdin vide ou épuisé', async () => {
    const skulptCode = fs.readFileSync('assets/vendor/skulpt/skulpt.min.js', 'utf8');
    const stdlibCode = fs.readFileSync('assets/vendor/skulpt/skulpt-stdlib.js', 'utf8');
    const workerCode = fs.readFileSync('assets/js/engines/skulpt-worker.js', 'utf8');

    const ctx = { console, importScripts: () => {} };
    ctx.self = ctx;
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(skulptCode, ctx);
    vm.runInContext(stdlibCode, ctx);

    // Exécute le code du worker pour charger registerMissingExceptions et la config
    vm.runInContext(workerCode, ctx);

    // Vérifie que EOFError est maintenant un constructeur Skulpt natif
    assert.equal(typeof ctx.Sk.builtin.EOFError, 'function');
    assert.equal(typeof ctx.Sk.builtins.EOFError, 'function');

    // 1. Test quand stdin est vide : input() doit lever EOFError et NON TypeError
    let caughtError = null;
    let postMessageResult = null;
    ctx.postMessage = (msg) => { postMessageResult = msg; };

    ctx.onmessage({
      data: {
        type: 'EXECUTE',
        code: 'val = int(input())\nprint("Double:", val * 2)',
        stdin: ''
      }
    });

    // Attendre la résolution asynchrone du worker
    await new Promise((resolve) => setTimeout(resolve, 50));

    assert.ok(postMessageResult);
    assert.equal(postMessageResult.result.status, 'runtime_error');
    assert.match(postMessageResult.result.stderr, /EOFError/);
    assert.doesNotMatch(postMessageResult.result.stderr, /TypeError.*is not a constructor/);
    assert.match(postMessageResult.result.userMessage, /attend une saisie utilisateur/);

    // 2. Test avec stdin normalisé CRLF
    let successResult = null;
    ctx.postMessage = (msg) => { successResult = msg; };

    ctx.onmessage({
      data: {
        type: 'EXECUTE',
        code: 'a = input()\nb = int(input())\nprint(f"OK {a}:{b*2}")',
        stdin: "test\r\n21\r\n"
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 50));

    assert.ok(successResult);
    assert.equal(successResult.result.status, 'success');
    assert.equal(successResult.result.stdout.trim(), 'OK test:42');

    // 3. Test capture try ... except EOFError en Python
    let catchResult = null;
    ctx.postMessage = (msg) => { catchResult = msg; };

    ctx.onmessage({
      data: {
        type: 'EXECUTE',
        code: 'try:\n    x = input()\nexcept EOFError:\n    print("EOF attrape avec succes")',
        stdin: ""
      }
    });

    await new Promise((resolve) => setTimeout(resolve, 50));

    assert.ok(catchResult);
    assert.equal(catchResult.result.status, 'success');
    assert.equal(catchResult.result.stdout.trim(), 'EOF attrape avec succes');
  });

  test('Skulpt : capture d’exception d’exécution (ZeroDivisionError)', async () => {
    const skulptCode = fs.readFileSync('assets/vendor/skulpt/skulpt.min.js', 'utf8');
    const stdlibCode = fs.readFileSync('assets/vendor/skulpt/skulpt-stdlib.js', 'utf8');

    const ctx = { console };
    ctx.self = ctx;
    ctx.window = ctx;
    vm.createContext(ctx);
    vm.runInContext(skulptCode, ctx);
    vm.runInContext(stdlibCode, ctx);

    ctx.Sk.configure({
      output: () => {},
      read: (x) => ctx.Sk.builtinFiles.files[x],
      python3: true
    });

    let caughtError = null;
    try {
      await ctx.Sk.misceval.asyncToPromise(() =>
        ctx.Sk.importMainWithBody('<stdin>', false, 'x = 10 / 0', true)
      );
    } catch (e) {
      caughtError = e;
    }

    assert.ok(caughtError);
    assert.match(caughtError.toString(), /ZeroDivisionError/);
  });

  test('Bac à sable JavaScript : neutralisation des APIs réseau et dangereuses', () => {
    // Vérifie le code de neutralisation présent dans javascript-worker.js
    const workerScript = fs.readFileSync('assets/js/engines/javascript-worker.js', 'utf8');
    assert.ok(workerScript.includes("'fetch'"));
    assert.ok(workerScript.includes("'XMLHttpRequest'"));
    assert.ok(workerScript.includes("'WebSocket'"));
    assert.ok(workerScript.includes("'Worker'"));
    assert.ok(workerScript.includes("'importScripts'"));
    assert.ok(workerScript.includes("'indexedDB'"));
  });
});
