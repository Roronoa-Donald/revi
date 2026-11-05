'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const manifestPath = path.resolve(__dirname, '..', 'MANIFESTES', '08_INVENTAIRE_QCM_COMPLET.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Erreur: 08_INVENTAIRE_QCM_COMPLET.json introuvable. Executer d abord extract_qcm_complete.js');
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const questions = manifest.questions;
console.log(`=== ANALYSE PSYCHOMETRIQUE DE ${questions.length} QUESTIONS QCM ===`);

// Charger les 184 questions historiques
const flagged184Path = path.join(ROOT, 'FINALISATION_REMEDIATION', 'flagged_184_items.json');
let historical184Set = new Set();
let historical184Map = new Map();
if (fs.existsSync(flagged184Path)) {
  const hItems = JSON.parse(fs.readFileSync(flagged184Path, 'utf8'));
  hItems.forEach(it => {
    historical184Set.add(it.id_qcm);
    historical184Map.set(it.id_qcm, it);
  });
}
console.log(`Questions historiques 184 chargees : ${historical184Set.size}`);

// Charger les 701 IDs asymetriques de AUDIT_GLOBAL_FINAL
const csv701Path = path.join(ROOT, 'AUDIT_GLOBAL_FINAL', '13_ASYMETRIE_701_QCM.csv');
let historical701Set = new Set();
if (fs.existsSync(csv701Path)) {
  const lines = fs.readFileSync(csv701Path, 'utf8').trim().split('\n').slice(1);
  lines.forEach(l => {
    const id = l.split(';')[0].replace(/"/g, '').trim();
    if (id) historical701Set.add(id);
  });
}
console.log(`Questions historiques 701 asymetries chargees : ${historical701Set.size}`);

// Mots-cles pour formulation negative
const negativeKeywords = [
  "n'est pas", "n’est pas", 'ne permet pas', 'ne peut pas', 'ne fait pas',
  'ne concerne pas', 'ne s’applique pas', "ne s'applique pas", 'incorrect',
  'faux', 'non recommandé', 'non valide', 'interdit', 'sauf', 'exclut',
  'aucun rôle', 'contrairement', 'hors de'
];

// Mots-cles pour toutes / aucune des reponses
const allOrNoneKeywords = [
  'toutes les réponses', 'toutes les reponses', 'toutes ces réponses', 'toutes ces reponses',
  'aucune des réponses', 'aucune des reponses', 'aucune de ces réponses', 'aucune de ces reponses',
  'tous les choix', 'aucun des choix', 'les deux', 'a et b', '1 et 2', 'toutes les propositions'
];

// Metriques globales
let countRealRatio2Chars = 0;
let countRealRatio2Words = 0;
let countRealRatio2Either = 0;
let countRealNegatives = 0;
let countRealAllOrNone = 0;

const auditQcmRecords = [];
const realAsymmetrySet = new Set();
const realNegativeSet = new Set();
const realAllOrNoneSet = new Set();

questions.forEach(q => {
  const opts = q.options || [];
  const correctIdx = q.reponse_correcte;
  const stem = q.enonce || '';
  const stemLower = stem.toLowerCase();

  // 1. Calculs des longueurs
  const correctOpt = (correctIdx >= 0 && correctIdx < opts.length) ? opts[correctIdx] : '';
  const distractors = opts.filter((_, idx) => idx !== correctIdx);

  const lenCorrectChars = correctOpt.length;
  const wordsCorrect = correctOpt.trim() ? correctOpt.trim().split(/\s+/).length : 0;

  let meanDistChars = 0;
  let meanDistWords = 0;

  if (distractors.length > 0) {
    const totalDistChars = distractors.reduce((acc, d) => acc + d.length, 0);
    const totalDistWords = distractors.reduce((acc, d) => acc + (d.trim() ? d.trim().split(/\s+/).length : 0), 0);
    meanDistChars = totalDistChars / distractors.length;
    meanDistWords = totalDistWords / distractors.length;
  }

  const ratioChars = meanDistChars > 0 ? (lenCorrectChars / meanDistChars) : 1.0;
  const ratioWords = meanDistWords > 0 ? (wordsCorrect / meanDistWords) : 1.0;

  const isAsymChars = ratioChars >= 2.0;
  const isAsymWords = ratioWords >= 2.0;
  const isAsymmetric = isAsymChars || isAsymWords;

  if (isAsymChars) countRealRatio2Chars++;
  if (isAsymWords) countRealRatio2Words++;
  if (isAsymmetric) {
    countRealRatio2Either++;
    realAsymmetrySet.add(q.id_qcm);
  }

  // 2. Detection formulation negative
  const isNegativeStem = negativeKeywords.some(kw => stemLower.includes(kw));
  if (isNegativeStem) {
    countRealNegatives++;
    realNegativeSet.add(q.id_qcm);
  }

  // 3. Detection toutes / aucune
  const hasAllNoneOpt = opts.some(opt => {
    const optLower = opt.toLowerCase();
    return allOrNoneKeywords.some(kw => optLower.includes(kw));
  });
  if (hasAllNoneOpt) {
    countRealAllOrNone++;
    realAllOrNoneSet.add(q.id_qcm);
  }

  // Verifications croisees avec les historiques
  const inHist184 = historical184Set.has(q.id_qcm);
  const inHist701 = historical701Set.has(q.id_qcm);

  let avisPedagogique = 'CONFORME_STANDARDS';
  const signalements = [];
  if (isAsymmetric) signalements.push('ASYMETRIE_LONGUEUR');
  if (isNegativeStem) signalements.push('FORMULATION_NEGATIVE');
  if (hasAllNoneOpt) signalements.push('OPTION_TOUTES_AUCUNE');

  if (signalements.length > 0) {
    avisPedagogique = signalements.join('_ET_');
  }

  auditQcmRecords.push({
    id_qcm: q.id_qcm,
    cours: q.cours,
    niveau: q.niveau,
    support: q.type_support,
    chapitre_ou_page: q.chapitre_ou_page,
    question_index: q.question_index,
    enonce_tronque: stem.length > 80 ? stem.substring(0, 77) + '...' : stem,
    nb_options: opts.length,
    longueur_reponse_chars: lenCorrectChars,
    moyenne_distracteurs_chars: meanDistChars.toFixed(1),
    ratio_longueur_chars: ratioChars.toFixed(2),
    mots_reponse: wordsCorrect,
    moyenne_distracteurs_mots: meanDistWords.toFixed(1),
    ratio_mots: ratioWords.toFixed(2),
    asymetrie_detectee: isAsymmetric ? 'OUI' : 'NON',
    formulation_negative: isNegativeStem ? 'OUI' : 'NON',
    option_toutes_aucune: hasAllNoneOpt ? 'OUI' : 'NON',
    present_dans_184_historique: inHist184 ? 'OUI' : 'NON',
    present_dans_701_historique: inHist701 ? 'OUI' : 'NON',
    avis_pedagogique: avisPedagogique,
    statut_securite_serveur: 'PROTEGE_SERVEUR_FASTIFY',
    action_recommandee: (isAsymmetric || isNegativeStem || hasAllNoneOpt) ? 'ARBITRAGE_COMMISSION_ENSEIGNANTE' : 'MAINTENIR'
  });
});

console.log('\n--- RESULTATS REELS DE L ANALYSE PSYCHOMETRIQUE ---');
console.log(`Questions avec ratio caracteres >= 2.0 : ${countRealRatio2Chars}`);
console.log(`Questions avec ratio mots >= 2.0 : ${countRealRatio2Words}`);
console.log(`Questions asymetriques reelles (ratio chars OU mots >= 2.0) : ${countRealRatio2Either}`);
console.log(`Questions a formulation negative reelles : ${countRealNegatives}`);
console.log(`Questions avec option toutes/aucune reelles : ${countRealAllOrNone}`);

// Intersections et unions
const hist184Array = Array.from(historical184Set);
const hist701Array = Array.from(historical701Set);

const histInter = hist184Array.filter(id => historical701Set.has(id));
const histUnionSet = new Set([...hist184Array, ...hist701Array]);

console.log('\n--- RECONCILIATION HISTORIQUE (184 vs 701 vs 844) ---');
console.log(`|H (184)| = ${historical184Set.size}`);
console.log(`|L (701)| = ${historical701Set.size}`);
console.log(`|H inter L| historique = ${histInter.length}`);
console.log(`|H union L| historique = ${histUnionSet.size} (844 attendu : ${histUnionSet.size === 844 ? 'CONFIRME' : 'DIVERGENCE'})`);

// Intersection réelle des signalements
const realUnionSet = new Set([...realAsymmetrySet, ...realNegativeSet, ...realAllOrNoneSet]);
console.log('\n--- ENSEMBLES REELS ACTUELS ---');
console.log(`Union reelle de toutes les questions signalees : ${realUnionSet.size} questions`);

// Ecriture de 09_AUDIT_QCM.csv
const outDir = path.resolve(__dirname, '..');
const csvQcmHeader = 'Id_QCM;Cours;Niveau;Support;Chapitre_Ou_Page;Question_Index;Enonce_Tronque;Nb_Options;Longueur_Reponse_Chars;Moyenne_Distracteurs_Chars;Ratio_Longueur_Chars;Mots_Reponse;Moyenne_Distracteurs_Mots;Ratio_Mots;Asymetrie_Detectee;Formulation_Negative;Option_Toutes_Aucune;Present_Dans_184_Historique;Present_Dans_701_Historique;Avis_Pedagogique;Statut_Securite_Serveur;Action_Recommandee\n';

const csvQcmLines = auditQcmRecords.map(r => [
  r.id_qcm,
  r.cours,
  r.niveau,
  r.support,
  `"${r.chapitre_ou_page.replace(/"/g, '""')}"`,
  r.question_index,
  `"${r.enonce_tronque.replace(/"/g, '""')}"`,
  r.nb_options,
  r.longueur_reponse_chars,
  r.moyenne_distracteurs_chars,
  r.ratio_longueur_chars,
  r.mots_reponse,
  r.moyenne_distracteurs_mots,
  r.ratio_mots,
  r.asymetrie_detectee,
  r.formulation_negative,
  r.option_toutes_aucune,
  r.present_dans_184_historique,
  r.present_dans_701_historique,
  r.avis_pedagogique,
  r.statut_securite_serveur,
  r.action_recommandee
].join(';'));

fs.writeFileSync(path.join(outDir, '09_AUDIT_QCM.csv'), csvQcmHeader + csvQcmLines.join('\n') + '\n', 'utf8');
console.log(`09_AUDIT_QCM.csv ecrit : ${auditQcmRecords.length} lignes`);

// Sauvegarde preuve
const preuveQcmPath = path.resolve(__dirname, '..', 'PREUVES', 'qcm_psychometrics_summary.json');
fs.writeFileSync(preuveQcmPath, JSON.stringify({
  total_questions: questions.length,
  historical_sets: {
    size_184: historical184Set.size,
    size_701: historical701Set.size,
    intersection_size: histInter.length,
    union_size: histUnionSet.size,
    intersection_ids: histInter
  },
  real_metrics: {
    ratio_chars_ge_2: countRealRatio2Chars,
    ratio_words_ge_2: countRealRatio2Words,
    asymmetry_either: countRealRatio2Either,
    negatives_count: countRealNegatives,
    all_or_none_count: countRealAllOrNone,
    total_unique_flagged: realUnionSet.size
  }
}, null, 2), 'utf8');
console.log(`Preuve ecrite : ${preuveQcmPath}`);
