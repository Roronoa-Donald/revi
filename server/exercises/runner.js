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
 * En cas d'échec, les détails du premier test restent internes au serveur ;
 * la route de correction construit séparément le retour destiné à l'élève.
 */

const { normalizeOutput } = require('../services/execution');
const { isDeepStrictEqual } = require('node:util');

/** Nombre maximal de tests cachés lancés par soumission. */
const MAX_TESTS = 7;

function parseDecimal(value) {
  const text = value.trim();
  if (!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)(?:[eE][+-]?\d+)?$/.test(text)) return NaN;
  const number = Number(text.replace(',', '.'));
  return Number.isFinite(number) ? number : NaN;
}

function parseReducedFraction(value) {
  const text = value.trim();
  if (text.length > 256) return null;
  const match = /^([+-]?\d+)[ \t]*\/[ \t]*([+]?\d+)$/.exec(text);
  if (!match) return null;
  const numerator = BigInt(match[1]);
  const denominator = BigInt(match[2]);
  if (denominator === 0n) return null;
  let dividend = numerator < 0n ? -numerator : numerator;
  let divisor = denominator;
  while (divisor !== 0n) {
    const remainder = dividend % divisor;
    dividend = divisor;
    divisor = remainder;
  }
  return dividend === 1n ? { numerator, denominator } : null;
}

function canonicalJsonNumber(value) {
  const negative = value.startsWith('-');
  const unsigned = negative ? value.slice(1) : value;
  const [mantissa, exponentText = '0'] = unsigned.split(/[eE]/);
  const [integerPart, fractionPart = ''] = mantissa.split('.');
  const digits = (integerPart + fractionPart).replace(/^0+/, '');
  if (!digits) return '0';
  const significant = digits.replace(/0+$/, '');
  const exponent = BigInt(exponentText) - BigInt(fractionPart.length) + BigInt(digits.length - significant.length);
  return (negative ? '-' : '') + significant + 'e' + exponent.toString();
}

function jsonKeys(value, keys) {
  const remaining = [value];
  while (remaining.length) {
    const current = remaining.pop();
    if (current === null || typeof current !== 'object') continue;
    for (const key of Object.keys(current)) {
      keys.add(key);
      remaining.push(current[key]);
    }
  }
}

function jsonWithExactNumbers(value, marker) {
  let result = '';
  let inString = false;
  let escaped = false;
  for (let index = 0; index < value.length; index++) {
    const character = value[index];
    if (inString) {
      result += character;
      if (escaped) escaped = false;
      else if (character === '\\') escaped = true;
      else if (character === '"') inString = false;
    } else if (character === '"') {
      inString = true;
      result += character;
    } else if (character === '-' || (character >= '0' && character <= '9')) {
      const number = /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?/.exec(value.slice(index));
      if (!number) throw new Error('Nombre JSON invalide');
      result += '{' + JSON.stringify(marker) + ':' + JSON.stringify(canonicalJsonNumber(number[0])) + '}';
      index += number[0].length - 1;
    } else {
      result += character;
    }
  }
  return JSON.parse(result);
}

function matchesStructuredJson(actual, expected) {
  let parsedExpected;
  try {
    parsedExpected = JSON.parse(expected);
  } catch {
    return null;
  }
  if (parsedExpected === null || typeof parsedExpected !== 'object') return null;
  try {
    const parsedActual = JSON.parse(actual);
    const keys = new Set();
    jsonKeys(parsedExpected, keys);
    jsonKeys(parsedActual, keys);
    let marker = '\u0000revi-number';
    while (keys.has(marker)) marker += '\u0000';
    return isDeepStrictEqual(jsonWithExactNumbers(actual, marker), jsonWithExactNumbers(expected, marker));
  } catch {
    return false;
  }
}

function stripAccents(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const ANALYSE_UNIT_SUFFIX = /(\d)\s*(min|minutes?|mn|secondes?|ms|cm|mm|km|kg|mg|ml|euros?|eur|keuros?|degres?|jours?|points?|appels?|clients?|eleves?|salaries?)$/;

function freeFormAnalyse(value) {
  return stripAccents(value)
    .toLowerCase()
    .replace(/\(/g, ' ')
    .replace(/\)/g, ' ')
    .replace(/\[|\]/g, ' ')
    .replace(/,\s+/g, ' ')
    .replace(/;\s*/g, ' ')
    .replace(/\s+\/\s+/g, ' ')
    .replace(/\s*%\s*/g, '%')
    .replace(/[!?]+(?=\s|$)/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanAnalyse(value) {
  return stripAccents(value)
    .toLowerCase()
    .replace(/,/g, '.')
    .replace(/·/g, '*')
    .replace(/\b(valide|non_valide|realisable|irrealisable|meilleur)\s*:\s*/g, '$1 ')
    .replace(/\s*([=:<>;])\s*/g, '$1')
    .replace(/\s*\*\s*/g, '*')
    .replace(/\b(\d+)\.0+\b/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function matchAnalyseVariant(actual, expectedVariant, opts) {
  const normA = normalizeOutput(actual);
  const normE = normalizeOutput(expectedVariant);
  if (normA === normE) return true;

  const trimA = normA.trim();
  const trimE = normE.trim();
  if (trimA === trimE) return true;

  const structuredJson = matchesStructuredJson(trimA, trimE);
  if (structuredJson !== null) return structuredJson;

  // Tolérance à la casse pour les notions et termes disciplinaires
  if (trimA.toLowerCase() === trimE.toLowerCase()) return true;

  // Tolérance virgule / point décimal (ex: 0,25 vs 0.25)
  if (trimA.replace(',', '.') === trimE.replace(',', '.')) return true;

  // Tolérance fraction vs décimal stricte (ex: 1/4 vs 0.25 ou 0,25, sans retrait d'unité)
  const isFracA = /^-?\d+\s*\/\s*\d+$/.test(trimA);
  const isFracE = /^-?\d+\s*\/\s*\d+$/.test(trimE);
  if (isFracA || isFracE) {
    const evalFrac = (str) => {
      const parts = str.split('/');
      return parts.length === 2 && Number(parts[1]) !== 0 ? Number(parts[0]) / Number(parts[1]) : NaN;
    };
    const valA = isFracA ? evalFrac(trimA) : parseDecimal(trimA);
    const valE = isFracE ? evalFrac(trimE) : parseDecimal(trimE);
    if (Number.isFinite(valA) && Number.isFinite(valE) && Math.abs(valA - valE) < 1e-6) {
      return true;
    }
    return false;
  }

  // Normalisation sémantique et tolérance mathématique existante
  const cleanA = cleanAnalyse(trimA);
  const cleanE = cleanAnalyse(trimE);
  if (cleanA === cleanE) return true;

  // Normalisation des multiplications implicites : ex: 4x1 -> 4*x1
  const expandMul = (s) => s.replace(/(\d)([a-z])/g, '$1*$2');
  if (expandMul(cleanA) === expandMul(cleanE)) return true;

  // Normalisation tolérante « forme libre » (accents NFD, espaces, ponctuation mineure, %, décimales, unités)
  const freeA = freeFormAnalyse(trimA);
  const freeE = freeFormAnalyse(trimE);
  if (freeA === freeE) return true;

  const decA = freeA.replace(/(\d),(\d)/g, '$1.$2');
  const decE = freeE.replace(/(\d),(\d)/g, '$1.$2');
  if (decA === decE) return true;

  if ((/%/.test(freeA) || /%/.test(freeE)) && decA.replace(/%/g, '') === decE.replace(/%/g, '')) {
    return true;
  }

  const stripUnit = (value) => value.replace(ANALYSE_UNIT_SUFFIX, '$1').trim();
  const unitlessA = stripUnit(freeA);
  const unitlessE = stripUnit(freeE);
  if (unitlessA !== freeA || unitlessE !== freeE) {
    if (unitlessA === unitlessE || unitlessA.replace(/(\d),(\d)/g, '$1.$2') === unitlessE.replace(/(\d),(\d)/g, '$1.$2')) {
      return true;
    }
  }

  if (opts && typeof opts.tolerance === 'number' && !isNaN(opts.tolerance)) {
    const actNum = parseDecimal(unitlessA);
    const expNum = parseDecimal(unitlessE);
    if (Number.isFinite(actNum) && Number.isFinite(expNum)) {
      return Math.abs(actNum - expNum) <= opts.tolerance;
    }
  }

  return false;
}

/**
 * Compare la sortie obtenue avec la sortie attendue selon le mode de test.
 * Supporte : normalisation standard (par défaut), comparaison exacte, variantes || (analyse), et tolérance numérique.
 */
function matchOutputs(actualRaw, expectedRaw, test, exercise) {
  const opts = test || {};
  const actual = String(actualRaw || '');
  const expected = String(expectedRaw || '');

  if (opts.mode === 'exact' || opts.comparator === 'exact') {
    return actual === expected;
  }

  if (opts.comparator === 'fraction_reduite') {
    const actualFraction = parseReducedFraction(actual);
    const expectedFraction = parseReducedFraction(expected);
    return actualFraction !== null && expectedFraction !== null &&
      actualFraction.numerator === expectedFraction.numerator &&
      actualFraction.denominator === expectedFraction.denominator;
  }

  const isAnalyse = exercise && exercise.language === 'analyse';

  const normA = normalizeOutput(actual);
  const normE = normalizeOutput(expected);
  if (normA === normE) return true;

  if (isAnalyse) {
    if (expected.includes('||')) {
      const variants = expected.split('||').map(v => v.trim()).filter(Boolean);
      if (variants.length > 0) {
        return variants.some(v => matchAnalyseVariant(actual, v, opts));
      }
      return actual.trim() === '';
    }
    if (matchAnalyseVariant(actual, expected, opts)) return true;
  }

  if (typeof opts.tolerance === 'number' && !isNaN(opts.tolerance)) {
    const actNum = parseDecimal(actual);
    const expNum = parseDecimal(expected);
    if (Number.isFinite(actNum) && Number.isFinite(expNum)) {
      return Math.abs(actNum - expNum) <= opts.tolerance;
    }
  }

  return normA === normE;
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

  if (exercise.verifyFirstExample === true) {
    const example = Array.isArray(exercise.examples) ? exercise.examples[0] : null;
    if (exercise.language === 'analyse' || !example || typeof example.stdin !== 'string' ||
        typeof example.expected !== 'string') {
      return {
        ok: false, passed: 0, total: tests.length, results: [], stop: null,
        error: { code: 'invalid_exercise', message: 'Exemple visible invalide.' }
      };
    }
    tests.push({ ...example, label: 'Exemple affiché' });
  }

  const results = [];
  const passedCount = () => results.filter(r => r.ok).length;

  const report = stop => ({
    ok: true,
    passed: passedCount(),
    total: tests.length,
    results,
    stop: stop || null
  });

  if (exercise.requiredShebang &&
      (typeof code !== 'string' || code.split('\n', 1)[0] !== exercise.requiredShebang)) {
    results.push({ label: 'Shebang', ok: false });
    return report({
      reason: 'invalid_source',
      testIndex: 0,
      label: 'Shebang',
      input: '',
      expected: null,
      actual: '',
      stderr: '',
      compileError: '',
      exitCode: null,
      userMessage: `La première ligne doit être exactement ${exercise.requiredShebang}, sans caractère avant ni après.`
    });
  }

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

module.exports = { runTests, matchOutputs, MAX_TESTS };
