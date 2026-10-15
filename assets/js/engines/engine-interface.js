/**
 * Contrat standard et utilitaires partagés pour les moteurs d'exécution de code.
 * Compatible navigateur (IIFE/global) et Node.js (module.exports).
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.ExecutionInterface = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var MAX_OUTPUT_CHARS = 50000; // 50 Ko max de sortie standard/erreur
  var MAX_OUTPUT_LINES = 2000;  // 2000 lignes max
  var DEFAULT_TIMEOUT_MS = 6000; // 6 secondes de délai avant terminaison

  var STATUS = {
    SUCCESS: 'success',
    RUNTIME_ERROR: 'runtime_error',
    COMPILE_ERROR: 'compile_error',
    TIMEOUT: 'timeout',
    CANCELLED: 'cancelled',
    API_ERROR: 'api_error',
    UNSUPPORTED: 'unsupported'
  };

  /**
   * Tronque proprement une chaîne de caractères selon des limites en taille et en nombre de lignes.
   */
  function truncateOutput(text, maxChars, maxLines) {
    if (!text) return '';
    var str = String(text);
    var limitChars = maxChars || MAX_OUTPUT_CHARS;
    var limitLines = maxLines || MAX_OUTPUT_LINES;
    var truncated = false;

    if (str.length > limitChars) {
      str = str.slice(0, limitChars);
      truncated = true;
    }

    var lines = str.split('\n');
    if (lines.length > limitLines) {
      lines = lines.slice(0, limitLines);
      str = lines.join('\n');
      truncated = true;
    }

    if (truncated) {
      str += '\n\n[... Sortie tronquée car elle dépasse la limite autorisée ...]';
    }
    return str;
  }

  /**
   * Crée un objet de résultat normalisé et garanti complet.
   */
  function createResult(partial) {
    var p = partial || {};
    var status = p.status || STATUS.SUCCESS;
    var stdout = truncateOutput(p.stdout || '');
    var stderr = truncateOutput(p.stderr || '');
    var compileError = truncateOutput(p.compileError || '');

    return {
      status: status,
      stdout: stdout,
      stderr: stderr,
      compileError: compileError,
      exitCode: typeof p.exitCode === 'number' ? p.exitCode : (status === STATUS.SUCCESS ? 0 : 1),
      executionTime: typeof p.executionTime === 'number' ? Math.round(p.executionTime * 1000) / 1000 : 0,
      memory: typeof p.memory === 'number' ? p.memory : null,
      provenance: p.provenance || 'browser', // 'browser' | 'server'
      provider: p.provider || 'Navigateur',
      userMessage: p.userMessage || '',
      warnings: Array.isArray(p.warnings) ? p.warnings : []
    };
  }

  return {
    STATUS: STATUS,
    MAX_OUTPUT_CHARS: MAX_OUTPUT_CHARS,
    MAX_OUTPUT_LINES: MAX_OUTPUT_LINES,
    DEFAULT_TIMEOUT_MS: DEFAULT_TIMEOUT_MS,
    truncateOutput: truncateOutput,
    createResult: createResult
  };
});
