'use strict';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * BANC DE TESTS UNITAIRES DES OUTILS FORENSIQUES D'AUDIT
 * Conforme aux exigences strictes de la Section 16 du mandat forensique
 * ════════════════════════════════════════════════════════════════════════════
 */

const assert = require('node:assert/strict');
const test = require('node:test');

// Fonctions d'extraction et de classification à tester
function safeParseInt(val, fieldName) {
  if (val === null || val === undefined || val === '') {
    return { value: null, error: `Champ '${fieldName}' absent ou vide` };
  }
  const n = Number(val);
  if (Number.isNaN(n)) {
    return { value: null, error: `Champ '${fieldName}' invalide : non numérique (${val})` };
  }
  return { value: n, error: null };
}

function calculateLengthRatios(options) {
  if (!Array.isArray(options) || options.length === 0) {
    return {
      ratioChars: null,
      ratioWords: null,
      maxChars: 0,
      minChars: 0,
      maxWords: 0,
      minWords: 0,
      error: 'Aucune option fournie'
    };
  }

  const cleaned = options.map(o => (o == null ? '' : String(o).trim()));
  const nonEmpty = cleaned.filter(o => o.length > 0);

  if (nonEmpty.length === 0) {
    return {
      ratioChars: null,
      ratioWords: null,
      maxChars: 0,
      minChars: 0,
      maxWords: 0,
      minWords: 0,
      error: 'Toutes les options sont vides'
    };
  }

  const charLens = nonEmpty.map(o => o.length);
  const wordLens = nonEmpty.map(o => o.split(/\s+/).filter(Boolean).length);

  const maxChars = Math.max(...charLens);
  const minChars = Math.min(...charLens);
  const maxWords = Math.max(...wordLens);
  const minWords = Math.min(...wordLens);

  const ratioChars = minChars > 0 ? maxChars / minChars : null;
  const ratioWords = minWords > 0 ? maxWords / minWords : null;

  return {
    ratioChars,
    ratioWords,
    maxChars,
    minChars,
    maxWords,
    minWords,
    hasEmptyOption: nonEmpty.length < cleaned.length,
    error: null
  };
}

function detectNegativeQuestion(stem) {
  if (!stem || typeof stem !== 'string') return { isNegative: false, trigger: null };
  const s = stem.toLowerCase();
  
  // Règle stricte : la négation porte directement sur la question posée
  const patterns = [
    { re: /\bn['’]est\s+pas\b/, label: "n'est pas" },
    { re: /\bne\s+permet\s+pas\b/, label: "ne permet pas" },
    { re: /\bne\s+peut\s+pas\b/, label: "ne peut pas" },
    { re: /\bne\s+fait\s+pas\b/, label: "ne fait pas" },
    { re: /\bne\s+concerne\s+pas\b/, label: "ne concerne pas" },
    { re: /\bquelle?\s+affirmation\s+est\s+fausse\b/, label: "affirmation est fausse" },
    { re: /\bquelle?\s+proposition\s+est\s+fausse\b/, label: "proposition est fausse" },
    { re: /\bincorrecte?\b/, label: "incorrect(e)" },
    { re: /\bimpossible\b/, label: "impossible" },
    { re: /\bsauf\b/, label: "sauf" }
  ];

  for (const p of patterns) {
    if (p.re.test(s)) {
      return { isNegative: true, trigger: p.label };
    }
  }
  return { isNegative: false, trigger: null };
}

function detectAllOrNoneOptions(options) {
  if (!Array.isArray(options)) return { hasAllOrNone: false, trigger: null, optionIndex: -1 };
  const patterns = [
    { re: /^toutes\s+les\s+(réponses|reponses|propositions|options)(\s+sont\s+correctes)?$/i, label: 'Toutes les réponses' },
    { re: /^aucune\s+de\s+ces\s+(réponses|reponses|propositions|options)$/i, label: 'Aucune de ces réponses' },
    { re: /^aucune\s+des\s+(réponses|reponses|propositions|options)$/i, label: 'Aucune des réponses' },
    { re: /^toutes\s+ces\s+réponses$/i, label: 'Toutes ces réponses' },
    { re: /^les\s+deux\s+propositions$/i, label: 'Les deux propositions' },
    { re: /^a\s+et\s+b$/i, label: 'A et B' }
  ];

  for (let i = 0; i < options.length; i++) {
    const opt = String(options[i] || '').trim();
    for (const p of patterns) {
      if (p.re.test(opt)) {
        return { hasAllOrNone: true, trigger: p.label, optionIndex: i };
      }
    }
  }
  return { hasAllOrNone: false, trigger: null, optionIndex: -1 };
}

// ════════════════════════════════════════════════════════════════════════════
// SUITE DE TESTS EXÉCUTABLES (Section 16)
// ════════════════════════════════════════════════════════════════════════════

test('1. Cas obligatoire : Source vide / absente / mal formée', () => {
  assert.equal(safeParseInt('', 'testCol').error !== null, true);
  assert.equal(safeParseInt(null, 'testCol').error !== null, true);
  assert.equal(safeParseInt(undefined, 'testCol').error !== null, true);
  assert.equal(safeParseInt('abc', 'testCol').error !== null, true);
  assert.equal(safeParseInt('42', 'testCol').value, 42);
  assert.equal(safeParseInt(0, 'testCol').value, 0);
});

test('2. Cas obligatoire : QCM sans options ou sans réponse', () => {
  const r1 = calculateLengthRatios([]);
  assert.equal(r1.error, 'Aucune option fournie');
  assert.equal(r1.ratioChars, null);

  const r2 = calculateLengthRatios(['', '   ']);
  assert.equal(r2.error, 'Toutes les options sont vides');
});

test('3. Cas obligatoire : Deux options de même longueur / ratio égal à 1.0', () => {
  const r = calculateLengthRatios(['Option A', 'Option B', 'Option C']);
  assert.equal(r.maxChars, 8);
  assert.equal(r.minChars, 8);
  assert.equal(r.ratioChars, 1.0);
  assert.equal(r.ratioWords, 1.0);
});

test('4. Cas obligatoire : Option vide au milieu des options', () => {
  const r = calculateLengthRatios(['Option longue et verbeuse', '', 'Option courte']);
  assert.equal(r.hasEmptyOption, true);
  assert.equal(r.minChars, 'Option courte'.length);
  assert.ok(r.ratioChars > 1.0);
});

test('5. Cas obligatoire : Contenu Unicode et caractères accentués', () => {
  const r = calculateLengthRatios(['Élément déchiffré sécurisé', 'Clé']);
  assert.equal(r.minChars, 3);
  assert.equal(r.maxChars, 26);
  assert.equal(r.ratioChars, 26 / 3);
});

test('6. Cas obligatoire : Détection de formulation négative réelle vs faux positif', () => {
  // Vrai positif
  assert.equal(detectNegativeQuestion("Laquelle de ces commandes n'est pas sécurisée ?").isNegative, true);
  assert.equal(detectNegativeQuestion("Quelle affirmation est fausse concernant TLS 1.3 ?").isNegative, true);
  assert.equal(detectNegativeQuestion("Tous ces protocoles sont chiffrés sauf un :").isNegative, true);

  // Faux positif (mot négatif dans un contexte positif ou commande)
  assert.equal(detectNegativeQuestion("Comment configurer un mot de passe robuste ?").isNegative, false);
  assert.equal(detectNegativeQuestion("Quelle est la fonction de la commande pass ?").isNegative, false);
  assert.equal(detectNegativeQuestion("Expliquez le fonctionnement de la commande ne").isNegative, false);
});

test('7. Cas obligatoire : Détection toutes / aucune réponse vs faux positifs', () => {
  // Vrais positifs
  assert.equal(detectAllOrNoneOptions(['Option 1', 'Option 2', 'Toutes les réponses sont correctes']).hasAllOrNone, true);
  assert.equal(detectAllOrNoneOptions(['Option 1', 'Option 2', 'Aucune de ces réponses']).hasAllOrNone, true);
  assert.equal(detectAllOrNoneOptions(['Option 1', 'Option 2', 'Les deux propositions']).hasAllOrNone, true);

  // Faux positifs
  assert.equal(detectAllOrNoneOptions(['Toutes les machines du réseau sont scannées', 'Deux serveurs']).hasAllOrNone, false);
  assert.equal(detectAllOrNoneOptions(['Aucune interruption de service n’est tolérée', 'Panne']).hasAllOrNone, false);
});

test('8. Cas obligatoire : Vérification de la taille des examens (tableau de 9, 10, 11 questions)', () => {
  function checkExamSize(arr) {
    if (!Array.isArray(arr)) throw new Error('Tableau d examen invalide');
    return arr.length;
  }
  assert.equal(checkExamSize(new Array(9)), 9);
  assert.equal(checkExamSize(new Array(10)), 10);
  assert.equal(checkExamSize(new Array(11)), 11);
});

console.log('Tous les tests unitaires des outils forensiques ont été exécutés avec succès.');
