/**
 * Web Worker pour l'exécution Python via Skulpt dans le navigateur.
 * Isole l'exécution hors du thread UI de Monaco et gère stdout, stderr, stdin et le formatage d'erreurs.
 */
'use strict';

var MAX_CHARS = 50000;
var MAX_LINES = 2000;

var isLoaded = false;

function registerMissingExceptions() {
  if (!self.Sk || !self.Sk.builtin) return;

  var missingExceptions = [
    { name: 'EOFError', base: self.Sk.builtin.Exception },
    { name: 'FileNotFoundError', base: self.Sk.builtin.IOError || self.Sk.builtin.Exception },
    { name: 'PermissionError', base: self.Sk.builtin.IOError || self.Sk.builtin.Exception },
    { name: 'TimeoutError', base: self.Sk.builtin.Exception },
    { name: 'FileExistsError', base: self.Sk.builtin.IOError || self.Sk.builtin.Exception },
    { name: 'IsADirectoryError', base: self.Sk.builtin.IOError || self.Sk.builtin.Exception },
    { name: 'NotADirectoryError', base: self.Sk.builtin.IOError || self.Sk.builtin.Exception }
  ];

  missingExceptions.forEach(function (item) {
    if (!self.Sk.builtin[item.name]) {
      try {
        if (self.Sk.abstr && typeof self.Sk.abstr.buildNativeClass === 'function') {
          self.Sk.builtin[item.name] = self.Sk.abstr.buildNativeClass(item.name, {
            constructor: function () {
              var args = Array.prototype.slice.call(arguments);
              (item.base || self.Sk.builtin.Exception).apply(this, args);
            },
            base: item.base || self.Sk.builtin.Exception
          });
        } else {
          self.Sk.builtin[item.name] = item.base || self.Sk.builtin.Exception;
        }

        if (self.Sk.exportSymbol) {
          self.Sk.exportSymbol('Sk.builtin.' + item.name, self.Sk.builtin[item.name]);
        }
        if (self.Sk.builtins) {
          self.Sk.builtins[item.name] = self.Sk.builtin[item.name];
        }
      } catch (_) {
        self.Sk.builtin[item.name] = item.base || self.Sk.builtin.Exception;
      }
    }
  });
}

function loadSkulpt() {
  if (isLoaded) return;
  try {
    importScripts('/assets/vendor/skulpt/skulpt.min.js', '/assets/vendor/skulpt/skulpt-stdlib.js');
    registerMissingExceptions();
    isLoaded = true;
  } catch (err) {
    throw new Error('Impossible de charger Skulpt dans le Web Worker : ' + (err.message || err));
  }
}

// Si Skulpt est déjà présent dans le contexte (chargement préalable ou test runner)
if (typeof self.Sk !== 'undefined') {
  registerMissingExceptions();
}

function builtinRead(x) {
  if (self.Sk.builtinFiles === undefined || self.Sk.builtinFiles['files'][x] === undefined) {
    throw new Error("Module non trouvé : '" + x + "'");
  }
  return self.Sk.builtinFiles['files'][x];
}

self.onmessage = function (event) {
  var data = event.data || {};
  if (data.type !== 'EXECUTE') return;

  var code = data.code || '';
  var stdin = data.stdin || '';
  var options = data.options || {};
  var startTime = Date.now();

  try {
    loadSkulpt();
  } catch (e) {
    self.postMessage({
      type: 'DONE',
      result: {
        status: 'runtime_error',
        stdout: '',
        stderr: e.message,
        compileError: '',
        exitCode: 1,
        executionTime: 0,
        provenance: 'browser',
        provider: 'Skulpt Python 3 (Navigateur)',
        userMessage: 'Le moteur Python local n’a pas pu être chargé.'
      }
    });
    return;
  }

  var stdout = '';
  var outputTruncated = false;
  var lineCount = 0;

  function outf(text) {
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

  // Gestion de stdin : découpage normalisé par lignes (comportement splitlines de Python)
  function parseStdinLines(input) {
    if (!input || typeof input !== 'string') return [];
    var s = input.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    if (s.endsWith('\n')) s = s.slice(0, -1);
    return s.length > 0 ? s.split('\n') : [];
  }

  var stdinLines = parseStdinLines(stdin);
  var stdinIdx = 0;

  function inputfun(promptText) {
    if (promptText) outf(promptText);
    if (stdinIdx < stdinLines.length) {
      return stdinLines[stdinIdx++];
    }
    throw new self.Sk.builtin.EOFError('EOF lors de la lecture d’une ligne (l’entrée standard est vide ou épuisée)');
  }

  self.Sk.configure({
    output: outf,
    read: builtinRead,
    inputfun: inputfun,
    inputfunTakesPrompt: true,
    python3: true,
    execLimit: (options.timeoutMs || 5000)
  });

  self.Sk.misceval.asyncToPromise(function () {
    return self.Sk.importMainWithBody('<stdin>', false, code, true);
  }).then(function () {
    var elapsed = (Date.now() - startTime) / 1000;
    self.postMessage({
      type: 'DONE',
      result: {
        status: 'success',
        stdout: stdout,
        stderr: '',
        compileError: '',
        exitCode: 0,
        executionTime: elapsed,
        provenance: 'browser',
        provider: 'Skulpt Python 3 (Navigateur)',
        userMessage: 'Programme exécuté avec succès.'
      }
    });
  }).catch(function (err) {
    var elapsed = (Date.now() - startTime) / 1000;
    var errStr = err ? (err.toString ? err.toString() : String(err)) : 'Erreur inconnue';
    var isSyntax = errStr.indexOf('SyntaxError') !== -1 || errStr.indexOf('IndentationError') !== -1;
    var isImport = errStr.indexOf('ImportError') !== -1;
    var isEOF = errStr.indexOf('EOFError') !== -1;

    var formattedStderr = '';
    var userMessage = '';

    // Construction d'une trace lisible avec numéros de lignes
    if (err && err.traceback && Array.isArray(err.traceback) && err.traceback.length) {
      formattedStderr += 'Traceback (derniers appels):\n';
      err.traceback.forEach(function (frame) {
        var fn = frame.filename === '<stdin>.py' ? 'programme' : frame.filename;
        formattedStderr += '  Fichier "' + fn + '", ligne ' + frame.lineno;
        if (typeof frame.colno === 'number') formattedStderr += ', colonne ' + frame.colno;
        formattedStderr += '\n';
      });
    }
    formattedStderr += errStr;

    if (isSyntax) {
      userMessage = 'Erreur de syntaxe Python dans votre code.';
    } else if (isImport) {
      userMessage = 'Module non disponible dans le moteur Python du navigateur.';
      formattedStderr += '\n\nNote : L’environnement Python du navigateur (Skulpt) supporte la bibliothèque standard (math, random, sys, datetime, json, re, collections, etc.). Les paquets tiers avec extensions C (comme numpy, pandas) nécessitent une exécution serveur.';
    } else if (isEOF) {
      userMessage = 'Votre programme attend une saisie utilisateur (input()), mais l’entrée standard est vide ou épuisée.';
      formattedStderr += '\n\nAstuce : Dépliez la section « Entrée du programme (ce que le programme lira) » sous les boutons avant d’exécuter, et écrivez les valeurs attendues (une par ligne).';
    } else {
      userMessage = 'Le programme s’est arrêté sur une exception d’exécution.';
    }

    self.postMessage({
      type: 'DONE',
      result: {
        status: isSyntax ? 'compile_error' : 'runtime_error',
        stdout: stdout,
        stderr: isSyntax ? '' : formattedStderr,
        compileError: isSyntax ? formattedStderr : '',
        exitCode: 1,
        executionTime: elapsed,
        provenance: 'browser',
        provider: 'Skulpt Python 3 (Navigateur)',
        userMessage: userMessage
      }
    });
  });
};
