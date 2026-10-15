/**
 * Moteur de correction des exercices de code.
 *
 * Principe (spec fournisseur §20 et §21) :
 *   - les tests vivent ICI, côté serveur ; ils ne partent jamais au navigateur ;
 *   - on exécute le programme de l'élève une fois par test, séquentiellement :
 *     le plan gratuit du fournisseur n'autorise que 2 requêtes / seconde, une
 *     rafale en parallèle provoquerait nos propres 429 ;
 *   - on s'arrête au premier échec : inutile de consommer du quota pour des
 *     tests dont le résultat est déjà connu.
 *
 * En cas d'échec, on remonte le premier test en défaut (entrée, attendu, obtenu)
 * pour que l'élève puisse diagnostiquer. Les autres tests restent invisibles.
 */

const { normalizeOutput } = require('../services/execution');

/** Nombre maximal de tests lancés par soumission. */
const MAX_TESTS = 4;

/**
 * Compare la sortie obtenue avec la sortie attendue selon le mode de test.
 * Supporte : normalisation standard (par défaut), comparaison exacte, et tolérance numérique.
 */
function matchOutputs(actualRaw, expectedRaw, test) {
  const opts = test || {};
  const actual = String(actualRaw || '');
  const expected = String(expectedRaw || '');

  if (opts.mode === 'exact' || opts.comparator === 'exact') {
    return actual === expected;
  }

  if (typeof opts.tolerance === 'number' && !isNaN(opts.tolerance)) {
    const actNum = parseFloat(actual.trim());
    const expNum = parseFloat(expected.trim());
    if (!isNaN(actNum) && !isNaN(expNum)) {
      return Math.abs(actNum - expNum) <= opts.tolerance;
    }
  }

  return normalizeOutput(actual) === normalizeOutput(expected);
}

/**
 * @param {object} exercise fiche d'exercice (voir server/exercises)
 * @param {string} code code de l'élève
 * @param {{execute: Function, maxTests?: number}} deps
 * @returns {Promise<object>} rapport de correction
 */
async function runTests(exercise, code, deps) {
  const execute = deps.execute;
  const tests = exercise.tests.slice(0, deps.maxTests || MAX_TESTS);

  const results = [];
  const passedCount = () => results.filter(r => r.ok).length;

  const report = stop => ({
    ok: true,
    passed: passedCount(),
    total: tests.length,
    results,
    stop: stop || null
  });

  for (let index = 0; index < tests.length; index++) {
    const test = tests[index];

    let outcome;
    try {
      outcome = await execute({
        language: exercise.language,
        code,
        stdin: test.stdin || ''
      });
    } catch (error) {
      // Panne de transport ou de configuration : ce n'est pas un échec de
      // l'élève, on le dit explicitement et on n'incrémente pas le score.
      return {
        ok: false,
        passed: passedCount(),
        total: tests.length,
        results,
        stop: null,
        error: {
          code: error.code || 'api_error',
          message: error.userMessage || error.message || 'Service d’exécution indisponible.'
        }
      };
    }

    // Le programme ne compile pas ou plante : aucune raison de lancer la suite.
    if (!outcome.ok) {
      return report({
        reason: outcome.status,
        testIndex: index,
        label: test.label || `Test ${index + 1}`,
        input: test.stdin || '',
        expected: null,
        actual: outcome.stdout || '',
        stderr: outcome.stderr || '',
        compileError: outcome.compileError || '',
        exitCode: outcome.exitCode,
        userMessage: outcome.userMessage || ''
      });
    }

    const matched = matchOutputs(outcome.stdout, test.expected, test);
    results.push({ label: test.label || `Test ${index + 1}`, ok: matched });

    if (!matched) {
      return report({
        reason: 'wrong_output',
        testIndex: index,
        label: test.label || `Test ${index + 1}`,
        input: test.stdin || '',
        expected: test.expected,
        actual: outcome.stdout || '',
        stderr: outcome.stderr || '',
        compileError: '',
        exitCode: outcome.exitCode,
        userMessage: ''
      });
    }
  }

  return report(null);
}

module.exports = { runTests, MAX_TESTS };
