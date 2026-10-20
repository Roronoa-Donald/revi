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
function matchOutputs(actualRaw, expectedRaw, test, exercise) {
  const opts = test || {};
  const actual = String(actualRaw || '');
  const expected = String(expectedRaw || '');

  if (opts.mode === 'exact' || opts.comparator === 'exact') {
    return actual === expected;
  }

  const isAnalyse = exercise && exercise.language === 'analyse';

  const normA = normalizeOutput(actual);
  const normE = normalizeOutput(expected);
  if (normA === normE) return true;

  if (isAnalyse) {
    const trimA = normA.trim();
    const trimE = normE.trim();
    if (trimA === trimE) return true;

    // Tolérance à la casse pour les notions et termes disciplinaires
    if (trimA.toLowerCase() === trimE.toLowerCase()) return true;

    // Tolérance virgule / point décimal (ex: 0,25 vs 0.25)
    if (trimA.replace(',', '.') === trimE.replace(',', '.')) return true;

    // Tolérance fraction vs décimal (ex: 1/4 vs 0.25 ou 0,25)
    if (/^-?\d+\s*\/\s*\d+$/.test(trimA) || /^-?\d+\s*\/\s*\d+$/.test(trimE)) {
      const evalFrac = (str) => {
        const parts = str.split('/');
        return parts.length === 2 && Number(parts[1]) !== 0 ? Number(parts[0]) / Number(parts[1]) : NaN;
      };
      const valA = /^-?\d+\s*\/\s*\d+$/.test(trimA) ? evalFrac(trimA) : parseFloat(trimA.replace(',', '.'));
      const valE = /^-?\d+\s*\/\s*\d+$/.test(trimE) ? evalFrac(trimE) : parseFloat(trimE.replace(',', '.'));
      if (!isNaN(valA) && !isNaN(valE) && Math.abs(valA - valE) < 1e-6) {
        return true;
      }
    }

    // Normalisation sémantique et tolérance mathématique robuste
    const stripAccents = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const cleanAnalyse = (s) => {
      return stripAccents(s)
        .toLowerCase()
        .replace(/,/g, '.')
        .replace(/·/g, '*')
        .replace(/\b(valide|non_valide|realisable|irrealisable|meilleur)\s*:\s*/g, '$1 ')
        .replace(/\s*([=:<>;])\s*/g, '$1')
        .replace(/\s*\*\s*/g, '*')
        .replace(/\b(\d+)\.0+\b/g, '$1')
        .replace(/\s+/g, ' ')
        .trim();
    };

    const cleanA = cleanAnalyse(trimA);
    const cleanE = cleanAnalyse(trimE);
    if (cleanA === cleanE) return true;

    // Normalisation des multiplications implicites : ex: 4x1 -> 4*x1
    const expandMul = (s) => s.replace(/(\d)([a-z])/g, '$1*$2');
    if (expandMul(cleanA) === expandMul(cleanE)) return true;
  }

  if (typeof opts.tolerance === 'number' && !isNaN(opts.tolerance)) {
    const actNum = parseFloat(actual.trim().replace(',', '.'));
    const expNum = parseFloat(expected.trim().replace(',', '.'));
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

    const matched = matchOutputs(outcome.stdout, test.expected, test, exercise);
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
        userMessage: test.hint || test.explanation || ''
      });
    }
  }

  return report(null);
}

module.exports = { runTests, MAX_TESTS };
