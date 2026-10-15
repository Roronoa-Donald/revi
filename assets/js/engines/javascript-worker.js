/**
 * Web Worker pour l'exécution JavaScript sécurisée dans le navigateur.
 * Isole l'exécution, neutralise les APIs réseau/stockage et capture console.log / console.error / readline.
 */
'use strict';

var MAX_CHARS = 50000;
var MAX_LINES = 2000;

// ========================
// Verrouillage du bac à sable
// ========================
(function neutralizeDangerousGlobals() {
  var blocked = [
    'fetch',
    'XMLHttpRequest',
    'WebSocket',
    'EventSource',
    'importScripts',
    'Worker',
    'SharedWorker',
    'indexedDB',
    'caches',
    'cookieStore'
  ];

  for (var i = 0; i < blocked.length; i++) {
    try {
      Object.defineProperty(self, blocked[i], {
        value: undefined,
        writable: false,
        configurable: false
      });
    } catch (e) {
      self[blocked[i]] = undefined;
    }
  }

  if (self.navigator) {
    try {
      self.navigator.sendBeacon = undefined;
    } catch (e) {}
  }
})();

function safeStringify(arg) {
  if (arg === null) return 'null';
  if (arg === undefined) return 'undefined';
  if (typeof arg === 'string') return arg;
  if (typeof arg === 'number' || typeof arg === 'boolean') return String(arg);
  if (typeof arg === 'function') return '[Function: ' + (arg.name || 'anonymous') + ']';
  try {
    return JSON.stringify(arg, function (k, v) {
      if (typeof v === 'bigint') return v.toString() + 'n';
      return v;
    }, 2);
  } catch (err) {
    return String(arg);
  }
}

self.onmessage = function (event) {
  var data = event.data || {};
  if (data.type !== 'EXECUTE') return;

  var code = data.code || '';
  var stdin = data.stdin || '';
  var startTime = Date.now();

  var stdout = '';
  var stderr = '';
  var outputTruncated = false;
  var lineCount = 0;

  function appendOut(text) {
    if (outputTruncated) return;
    if (stdout.length + text.length > MAX_CHARS) {
      stdout += text.slice(0, MAX_CHARS - stdout.length) + '\n\n[... Sortie tronquée (dépassement de 50 Ko) ...]';
      outputTruncated = true;
      return;
    }
    stdout += text;
    var newlines = (text.match(/\n/g) || []).length;
    lineCount += newlines;
    if (lineCount >= MAX_LINES) {
      stdout += '\n\n[... Sortie tronquée (dépassement de 2000 lignes) ...]';
      outputTruncated = true;
    }
  }

  function appendErr(text) {
    if (stderr.length < MAX_CHARS) {
      stderr += text;
    }
  }

  // Remplacement de console.*
  var customConsole = {
    log: function () {
      var args = Array.prototype.slice.call(arguments);
      appendOut(args.map(safeStringify).join(' ') + '\n');
    },
    info: function () {
      var args = Array.prototype.slice.call(arguments);
      appendOut(args.map(safeStringify).join(' ') + '\n');
    },
    warn: function () {
      var args = Array.prototype.slice.call(arguments);
      appendOut('[Avertissement] ' + args.map(safeStringify).join(' ') + '\n');
    },
    error: function () {
      var args = Array.prototype.slice.call(arguments);
      appendErr(args.map(safeStringify).join(' ') + '\n');
    }
  };

  // Support stdin / readline
  function parseStdinLines(input) {
    if (!input || typeof input !== 'string') return [];
    var s = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (s.endsWith('\n')) s = s.slice(0, -1);
    return s.length > 0 ? s.split('\n') : [];
  }

  var stdinLines = parseStdinLines(stdin);
  var stdinIdx = 0;

  function readline() {
    if (stdinIdx < stdinLines.length) {
      return stdinLines[stdinIdx++];
    }
    return '';
  }

  function prompt(msg) {
    if (msg) appendOut(String(msg) + '\n');
    return readline();
  }

  // Exécution du code utilisateur
  try {
    // Vérification de syntaxe préliminaire
    var fn;
    try {
      fn = new Function(
        'console',
        'readline',
        'prompt',
        'stdin',
        '"use strict";\n' + code
      );
    } catch (syntaxErr) {
      var elapsedSyntax = (Date.now() - startTime) / 1000;
      self.postMessage({
        type: 'DONE',
        result: {
          status: 'compile_error',
          stdout: '',
          stderr: '',
          compileError: 'SyntaxError: ' + (syntaxErr.message || syntaxErr),
          exitCode: 1,
          executionTime: elapsedSyntax,
          provenance: 'browser',
          provider: 'Moteur JavaScript V8/Worker (Navigateur)',
          userMessage: 'Erreur de syntaxe JavaScript dans votre code.'
        }
      });
      return;
    }

    // Exécution
    var retVal = fn(customConsole, readline, prompt, stdin);

    // Si le code renvoie une Promise (code asynchrone)
    if (retVal && typeof retVal.then === 'function') {
      retVal.then(function () {
        var elapsed = (Date.now() - startTime) / 1000;
        self.postMessage({
          type: 'DONE',
          result: {
            status: stderr ? 'runtime_error' : 'success',
            stdout: stdout,
            stderr: stderr,
            compileError: '',
            exitCode: stderr ? 1 : 0,
            executionTime: elapsed,
            provenance: 'browser',
            provider: 'Moteur JavaScript V8/Worker (Navigateur)',
            userMessage: stderr ? 'Exécution terminée avec des erreurs signalées.' : 'Programme exécuté avec succès.'
          }
        });
      }).catch(function (asyncErr) {
        var elapsed = (Date.now() - startTime) / 1000;
        var errMsg = (asyncErr && (asyncErr.stack || asyncErr.message)) ? (asyncErr.stack || asyncErr.message) : String(asyncErr);
        self.postMessage({
          type: 'DONE',
          result: {
            status: 'runtime_error',
            stdout: stdout,
            stderr: errMsg,
            compileError: '',
            exitCode: 1,
            executionTime: elapsed,
            provenance: 'browser',
            provider: 'Moteur JavaScript V8/Worker (Navigateur)',
            userMessage: 'Le programme asynchrone s’est arrêté sur une promesse rejetée.'
          }
        });
      });
    } else {
      var elapsed = (Date.now() - startTime) / 1000;
      self.postMessage({
        type: 'DONE',
        result: {
          status: stderr ? 'runtime_error' : 'success',
          stdout: stdout,
          stderr: stderr,
          compileError: '',
          exitCode: stderr ? 1 : 0,
          executionTime: elapsed,
          provenance: 'browser',
          provider: 'Moteur JavaScript V8/Worker (Navigateur)',
          userMessage: stderr ? 'Exécution terminée avec des erreurs signalées.' : 'Programme exécuté avec succès.'
        }
      });
    }
  } catch (runtimeErr) {
    var elapsed = (Date.now() - startTime) / 1000;
    var errText = (runtimeErr && (runtimeErr.stack || runtimeErr.message)) ? (runtimeErr.stack || runtimeErr.message) : String(runtimeErr);
    self.postMessage({
      type: 'DONE',
      result: {
        status: 'runtime_error',
        stdout: stdout,
        stderr: errText,
        compileError: '',
        exitCode: 1,
        executionTime: elapsed,
        provenance: 'browser',
        provider: 'Moteur JavaScript V8/Worker (Navigateur)',
        userMessage: 'Le programme JavaScript s’est arrêté sur une erreur d’exécution.'
      }
    });
  }
};
