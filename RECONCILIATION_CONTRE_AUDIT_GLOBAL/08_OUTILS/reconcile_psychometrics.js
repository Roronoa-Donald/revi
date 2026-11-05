'use strict';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * OUTIL FORENSIQUE 03 : AUDIT PSYCHOMÉTRIQUE ET RÉCONCILIATION STATISTIQUE
 * Recalcul des négations (31 vs 35), toutes/aucune (1 vs 33), asymétries (701 vs 1160 vs 844)
 * Comparaison systématique des deux définitions de ratio (Méthode A : Max/Min ; Méthode B : Clé/Moyenne)
 * ════════════════════════════════════════════════════════════════════════════
 */

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');
const qcmManifestPath = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '07_MANIFESTES', 'manifest_qcm_complet.json');

if (!fs.existsSync(qcmManifestPath)) {
  console.error('Erreur : manifest_qcm_complet.json introuvable. Exécuter reconcile_qcm.js en amont.');
  process.exit(1);
}

const questions = JSON.parse(fs.readFileSync(qcmManifestPath, 'utf8'));
console.log(`=== [OUTIL 03] AUDIT PSYCHOMÉTRIQUE SUR ${questions.length} QUESTIONS QCM ===`);

// 1. Charger les anciens jeux historiques
const flagged184Path = path.join(ROOT, 'FINALISATION_REMEDIATION', 'flagged_184_items.json');
let historical184Set = new Set();
if (fs.existsSync(flagged184Path)) {
  const hItems = JSON.parse(fs.readFileSync(flagged184Path, 'utf8'));
  hItems.forEach(it => historical184Set.add(it.id_qcm));
}
console.log(`Questions historiques 184 chargées : ${historical184Set.size}`);

const csv701Path = path.join(ROOT, 'AUDIT_GLOBAL_FINAL', '13_ASYMETRIE_701_QCM.csv');
let historical701Set = new Set();
if (fs.existsSync(csv701Path)) {
  const lines = fs.readFileSync(csv701Path, 'utf8').trim().split('\n').slice(1);
  lines.forEach(l => {
    const id = l.split(';')[0].replace(/"/g, '').trim();
    if (id) historical701Set.add(id);
  });
}
console.log(`Questions historiques 701 chargées : ${historical701Set.size}`);

// Intersection et Union historiques
const interHist = new Set([...historical184Set].filter(id => historical701Set.has(id)));
const unionHist = new Set([...historical184Set, ...historical701Set]);
console.log(`\n--- VÉRIFICATION ÉQUATION HISTORIQUE (184 + 701 - 41 = 844) ---`);
console.log(`|H (184)| : ${historical184Set.size}`);
console.log(`|L_old (701)| : ${historical701Set.size}`);
console.log(`|H ∩ L_old| : ${interHist.size}`);
console.log(`|H ∪ L_old| : ${unionHist.size}`);
console.log(`Vérification : ${historical184Set.size} + ${historical701Set.size} - ${interHist.size} = ${historical184Set.size + historical701Set.size - interHist.size} (obtenu : ${unionHist.size})`);

// 2. Détection des Questions Négatives
// Formulation historique (analyze_qcm_psychometrics.js qui produit exactement 31)
const histNegKeywords = [
  "n'est pas", "n’est pas", 'ne permet pas', 'ne peut pas', 'ne fait pas',
  'ne concerne pas', 'ne s’applique pas', "ne s'applique pas", 'incorrect',
  'faux', 'non recommandé', 'non valide', 'interdit', 'sauf', 'exclut',
  'aucun rôle', 'contrairement', 'hors de'
];

// Stricte (grammaticale pure dans la question)
const strictNegPatterns = [
  /\bn['’]est\s+pas\b/i,
  /\bne\s+permet\s+pas\b/i,
  /\bne\s+peut\s+pas\b/i,
  /\bne\s+fait\s+pas\b/i,
  /\bne\s+concerne\s+pas\b/i,
  /\bne\s+s['’]applique\s+pas\b/i,
  /\bquelle?\s+affirmation\s+est\s+fausse\b/i,
  /\bquelle?\s+proposition\s+est\s+fausse\b/i,
  /\bincorrecte?\b/i,
  /\bimpossible\b/i,
  /\bsauf\b/i
];

// 3. Détection des Options "Toutes / Aucune"
// Historique (analyze_qcm_psychometrics.js qui produit exactement 33)
const histAllNoneKeywords = [
  'toutes les réponses', 'toutes les reponses', 'toutes ces réponses', 'toutes ces reponses',
  'aucune des réponses', 'aucune des reponses', 'aucune de ces réponses', 'aucune de ces reponses',
  'tous les choix', 'aucun des choix', 'les deux', 'a et b', '1 et 2', 'toutes les propositions'
];

// Stricte (option standard "toutes les réponses" / "aucune des réponses")
const strictAllNonePatterns = [
  /toutes\s+les\s+(réponses|reponses|propositions|options)/i,
  /aucune\s+de\s+ces\s+(réponses|reponses|propositions|options)/i,
  /aucune\s+des\s+(réponses|reponses|propositions|options)/i
];

const negativeHistItems = [];
const negativeStrictItems = [];
const allOrNoneHistItems = [];
const allOrNoneStrictItems = [];

questions.forEach(q => {
  const stem = q.enonce || '';
  const stemLower = stem.toLowerCase();
  const opts = q.options || [];

  if (histNegKeywords.some(kw => stemLower.includes(kw))) {
    negativeHistItems.push(q);
  }
  if (strictNegPatterns.some(p => p.test(stem))) {
    negativeStrictItems.push(q);
  }

  const hasHistAllNone = opts.some(opt => {
    const optLower = opt.toLowerCase();
    return histAllNoneKeywords.some(kw => optLower.includes(kw));
  });
  if (hasHistAllNone) {
    allOrNoneHistItems.push(q);
  }

  const hasStrictAllNone = opts.some(opt => strictAllNonePatterns.some(p => p.test(opt)));
  if (hasStrictAllNone) {
    allOrNoneStrictItems.push(q);
  }
});

console.log(`\n--- RÉCONCILIATION QUESTIONS NÉGATIVES (31 vs 18) ---`);
console.log(`Questions négatives méthode historique (analyze_qcm_psychometrics.js, 31 attendues) : ${negativeHistItems.length}`);
console.log(`Questions négatives méthode grammaticale stricte : ${negativeStrictItems.length}`);

console.log(`\n--- RÉCONCILIATION QUESTIONS TOUTES / AUCUNE (33 vs 1) ---`);
console.log(`Questions avec option type Toutes/Aucune/Les deux méthode historique (33 attendues) : ${allOrNoneHistItems.length}`);
console.log(`Questions avec option standard stricte ("toutes les réponses"/"aucune...") (1 attendue) : ${allOrNoneStrictItems.length}`);
allOrNoneStrictItems.forEach(item => {
  console.log(`  - [${item.id_qcm}] Énoncé: "${item.enonce.slice(0, 60)}..."`);
});

// 4. Analyse de l'Asymétrie de Longueur
// METHODE A (Mandat Forensique Section 5.3) : Max Option / Min Option Non-Vide
// METHODE B (Historique / CONTRE_AUDIT_AUDIT_GLOBAL) : Clé / Moyenne Distracteurs

const asymMethodA_Chars = new Set();
const asymMethodA_Words = new Set();

const asymMethodB_Chars = new Set(); // 983 attendues
const asymMethodB_Words = new Set(); // 976 attendues

const qcmAnalysisRecords = [];

questions.forEach(q => {
  const opts = q.options || [];
  const correctIdx = q.reponse_correcte;
  const correctOpt = (correctIdx >= 0 && correctIdx < opts.length) ? opts[correctIdx] : '';
  const distractors = opts.filter((_, idx) => idx !== correctIdx);

  // Méthode A : Max / Min
  const nonEmptyOpts = opts.filter(o => o.trim().length > 0);
  let ratioA_Chars = 1.0;
  let ratioA_Words = 1.0;

  if (nonEmptyOpts.length > 1) {
    const charLens = nonEmptyOpts.map(o => o.length);
    const wordLens = nonEmptyOpts.map(o => o.split(/\s+/).filter(Boolean).length);
    const maxChars = Math.max(...charLens);
    const minChars = Math.min(...charLens);
    const maxWords = Math.max(...wordLens);
    const minWords = Math.min(...wordLens);

    ratioA_Chars = minChars > 0 ? (maxChars / minChars) : 1.0;
    ratioA_Words = minWords > 0 ? (maxWords / minWords) : 1.0;
  }

  if (ratioA_Chars >= 2.0) asymMethodA_Chars.add(q.id_qcm);
  if (ratioA_Words >= 2.0) asymMethodA_Words.add(q.id_qcm);

  // Méthode B : Clé / Moyenne Distracteurs
  const lenCorrectChars = correctOpt.length;
  const wordsCorrect = correctOpt.trim() ? correctOpt.trim().split(/\s+/).filter(Boolean).length : 0;

  let meanDistChars = 0;
  let meanDistWords = 0;

  if (distractors.length > 0) {
    const totalDistChars = distractors.reduce((acc, d) => acc + d.length, 0);
    const totalDistWords = distractors.reduce((acc, d) => acc + (d.trim() ? d.trim().split(/\s+/).filter(Boolean).length : 0), 0);
    meanDistChars = totalDistChars / distractors.length;
    meanDistWords = totalDistWords / distractors.length;
  }

  const ratioB_Chars = meanDistChars > 0 ? (lenCorrectChars / meanDistChars) : 1.0;
  const ratioB_Words = meanDistWords > 0 ? (wordsCorrect / meanDistWords) : 1.0;

  if (ratioB_Chars >= 2.0) asymMethodB_Chars.add(q.id_qcm);
  if (ratioB_Words >= 2.0) asymMethodB_Words.add(q.id_qcm);

  qcmAnalysisRecords.push({
    id_qcm: q.id_qcm,
    cours: q.cours,
    niveau: q.niveau,
    type_support: q.type_support,
    chapitre_ou_page: q.chapitre_ou_page,
    enonce: q.enonce,
    nb_options: opts.length,
    reponse_correcte: correctIdx,
    correctOpt,
    ratioA_Chars: Number(ratioA_Chars.toFixed(2)),
    ratioA_Words: Number(ratioA_Words.toFixed(2)),
    isAsymA: (ratioA_Chars >= 2.0 || ratioA_Words >= 2.0),
    ratioB_Chars: Number(ratioB_Chars.toFixed(2)),
    ratioB_Words: Number(ratioB_Words.toFixed(2)),
    isAsymB: (ratioB_Chars >= 2.0 || ratioB_Words >= 2.0),
    isNegativeHist: negativeHistItems.some(n => n.id_qcm === q.id_qcm),
    isNegativeStrict: negativeStrictItems.some(n => n.id_qcm === q.id_qcm),
    isAllOrNoneHist: allOrNoneHistItems.some(a => a.id_qcm === q.id_qcm),
    isAllOrNoneStrict: allOrNoneStrictItems.some(a => a.id_qcm === q.id_qcm)
  });
});

console.log('\n--- ANALYSE DE L ASYMÉTRIE : METHODE B (Clé / Moyenne Distracteurs - RÉSULTATS DU DERNIER CONTRE-AUDIT) ---');
console.log(`|C_hist| (Ratio Caractères >= 2.0) : ${asymMethodB_Chars.size} (attendu : 983)`);
console.log(`|W_hist| (Ratio Mots >= 2.0)        : ${asymMethodB_Words.size} (attendu : 976)`);

const interB = new Set([...asymMethodB_Chars].filter(id => asymMethodB_Words.has(id)));
const unionB = new Set([...asymMethodB_Chars, ...asymMethodB_Words]);

console.log(`|C_hist ∩ W_hist|                   : ${interB.size} (attendu : 799)`);
console.log(`|C_hist ∪ W_hist| (Union asymétries): ${unionB.size} (attendu : 1 160)`);
console.log(`Vérification arithmétique 983 + 976 - 799 = ${983 + 976 - 799} (obtenu : ${unionB.size})`);
console.log(`Pourcentage du corpus asymétrique (Méthode B) : ${(unionB.size / questions.length * 100).toFixed(2)} %`);

console.log('\n--- ANALYSE DE L ASYMÉTRIE : METHODE A (Mandat Forensique Section 5.3 : Max Option / Min Option) ---');
console.log(`|C_prompt| (Ratio Caractères >= 2.0) : ${asymMethodA_Chars.size}`);
console.log(`|W_prompt| (Ratio Mots >= 2.0)        : ${asymMethodA_Words.size}`);
const interA = new Set([...asymMethodA_Chars].filter(id => asymMethodA_Words.has(id)));
const unionA = new Set([...asymMethodA_Chars, ...asymMethodA_Words]);
console.log(`|C_prompt ∩ W_prompt|                 : ${interA.size}`);
console.log(`|C_prompt ∪ W_prompt| (Union)         : ${unionA.size}`);
console.log(`Pourcentage du corpus asymétrique (Méthode A) : ${(unionA.size / questions.length * 100).toFixed(2)} %`);

// Sauvegardes
const OUT_QCM = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '03_RECONCILIATION_QCM');
const OUT_MANIF = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '07_MANIFESTES');

const psychometricsSummary = {
  totalCorpus: questions.length,
  historicalSets: {
    set184_size: historical184Set.size,
    set701_size: historical701Set.size,
    inter_184_701: interHist.size,
    union_184_701_expected844: unionHist.size
  },
  negativeQuestions: {
    historicalKeywordsCount_expected31: negativeHistItems.length,
    strictGrammaticalCount: negativeStrictItems.length,
    historicalItems: negativeHistItems.map(d => ({ id: d.id_qcm, stem: d.enonce })),
    strictItems: negativeStrictItems.map(d => ({ id: d.id_qcm, stem: d.enonce }))
  },
  allOrNoneQuestions: {
    historicalBroadCount_expected33: allOrNoneHistItems.length,
    strictPatternCount_expected1: allOrNoneStrictItems.length,
    historicalItems: allOrNoneHistItems.map(a => ({ id: a.id_qcm, stem: a.enonce })),
    strictItems: allOrNoneStrictItems.map(a => ({ id: a.id_qcm, stem: a.enonce }))
  },
  asymmetryMethodB_KeyVsMean: {
    charsGte2_expected983: asymMethodB_Chars.size,
    wordsGte2_expected976: asymMethodB_Words.size,
    intersection_expected799: interB.size,
    union_expected1160: unionB.size,
    pctCorpus: (unionB.size / questions.length * 100).toFixed(2)
  },
  asymmetryMethodA_MaxVsMin: {
    charsGte2: asymMethodA_Chars.size,
    wordsGte2: asymMethodA_Words.size,
    intersection: interA.size,
    union: unionA.size,
    pctCorpus: (unionA.size / questions.length * 100).toFixed(2)
  }
};

fs.writeFileSync(path.join(OUT_QCM, 'reconciliation_psychometrique.json'), JSON.stringify(psychometricsSummary, null, 2), 'utf8');

// Manifestes requis dans 07_MANIFESTES
const diffNeg = negativeHistItems.filter(h => !negativeStrictItems.some(s => s.id_qcm === h.id_qcm));

fs.writeFileSync(path.join(OUT_MANIF, 'manifest_qcm_negatifs.json'), JSON.stringify({
  historical31: negativeHistItems,
  strict18: negativeStrictItems,
  difference13: diffNeg
}, null, 2), 'utf8');

fs.writeFileSync(path.join(OUT_MANIF, 'manifest_qcm_toutes_aucune.json'), JSON.stringify({
  historical33: allOrNoneHistItems,
  strict1: allOrNoneStrictItems,
  details: allOrNoneHistItems.map(a => ({ id: a.id_qcm, stem: a.enonce, options: a.options }))
}, null, 2), 'utf8');

fs.writeFileSync(path.join(OUT_MANIF, 'manifest_qcm_asymetrie_caracteres.json'), JSON.stringify([...asymMethodB_Chars].sort(), null, 2), 'utf8');
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_qcm_asymetrie_mots.json'), JSON.stringify([...asymMethodB_Words].sort(), null, 2), 'utf8');

// Manifeste d'anomalies QCM combinées
const anomalies = qcmAnalysisRecords.filter(r => r.isAsymB || r.isNegativeHist || r.isAllOrNoneHist);
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_qcm_anomalies.json'), JSON.stringify({
  totalAnomalies: anomalies.length,
  anomalies
}, null, 2), 'utf8');

console.log('Manifestes psychométriques générés avec succès dans 07_MANIFESTES/.');
