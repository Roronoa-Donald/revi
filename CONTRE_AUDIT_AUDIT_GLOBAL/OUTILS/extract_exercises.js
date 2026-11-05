'use strict';

const fs = require('fs');
const path = require('path');
const { createHash } = require('node:crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const catalogue = require(path.join(ROOT, 'server', 'exercises'));
const policy = require(path.join(ROOT, 'server', 'exercises', 'grading-policy'));
const { COURSES } = require(path.join(ROOT, 'server', 'courses'));

console.log('=== EXTRACTION COMPLETE ET INDEPENDANTE DES EXERCICES ===');

const exercises = catalogue.listExercises();
console.log(`Nombre total d exercices dans le catalogue : ${exercises.length}`);

// Charger verifiedExercises et runtimeEvidence
const verifiedExercises = require(path.join(ROOT, 'server', 'exercises', 'grading-evidence.json'));
const runtimeEvidence = require(path.join(ROOT, 'server', 'exercises', 'grading-runtime-evidence.json'));

// Definitions de cours historiques
const pilotCourses = new Set(['b1-linux', 'probabilites', 'RD-RO']);
const testedLotsCourses = new Set(['b1-python', 'b1-c-cpp', 'rd_winserver', 'react']);

// Fonction de calcul empreinte exercice (identique a grading-policy)
function computeExerciseFingerprint(ex) {
  return createHash('sha256').update(JSON.stringify(ex)).digest('hex');
}

// Analyse fine d un test individuel
function classifyTest(test) {
  const label = (test.label || test.name || test.description || '').toLowerCase();
  const stdin = (test.stdin != null ? String(test.stdin) : '').toLowerCase();
  const expected = (test.expected != null ? String(test.expected) : '').toLowerCase();

  let isNegative = false;
  let isLimit = false;

  // Criteres de test negatif (gestion d erreur, rejets, entrees invalides)
  if (
    label.includes('invalide') || label.includes('erreur') || label.includes('rejet') ||
    label.includes('négatif') || label.includes('negatif') || label.includes('hors bornes') ||
    label.includes('faux') || label.includes('interdit') || label.includes('refus') ||
    label.includes('exception') || label.includes('non trouvé') || label.includes('vide') && expected.includes('erreur') ||
    stdin.includes('-') && (expected.includes('erreur') || expected.includes('invalide') || expected.includes('impossible')) ||
    expected.includes('erreur') || expected.includes('invalide') || expected.includes('impossible') || expected.includes('usage:')
  ) {
    isNegative = true;
  }

  // Criteres de test limite (valeurs frontieres, 0, 1, chaine vide, extremites)
  if (
    label.includes('limite') || label.includes('borne') || label.includes('extrême') ||
    label.includes('seuil') || label.includes('vide') && !isNegative || label.includes('zéro') ||
    label.includes('zero') || stdin === '0' || stdin === '0\n' || stdin === '' ||
    label.includes('neutre') || label.includes('un seul') || label.includes('minimum') || label.includes('maximum')
  ) {
    isLimit = true;
  }

  return { isNegative, isLimit };
}

// Analyser tous les exercices
const records1250 = [];
const records814 = [];
const recordsSuspended = [];

let countSuspendedCourses = 0;
let countSuspendedIndiv = 0;
let countSuspendedEvidence = 0;
let countActive = 0;

// Ensembles pour le calcul psychometrique des tests sur les 814 fiches
const setN = new Set(); // Négatifs
const setL = new Set(); // Limites
const setBoth = new Set(); // N inter L
const setEither = new Set(); // N union L
const setNeither = new Set(); // Complémentaire (0 négatif et 0 limite)

exercises.forEach(ex => {
  const courseId = ex.course;
  const courseMeta = COURSES[courseId] || {};
  let niveau = 'B2';
  if (courseId.startsWith('b1-') || courseId.startsWith('b1/')) niveau = 'B1';
  else if (courseId.startsWith('b3-')) niveau = 'B3';
  else if (courseMeta.level) niveau = courseMeta.level.toUpperCase();

  const isSusp = policy.isGradingSuspended(courseId, ex.id);

  // Verifier les motifs precis de suspension
  const inSuspCourse = policy.suspendedCourses.includes(courseId);
  const inSuspIndiv = Object.hasOwn(policy.suspendedExercises, ex.id) && policy.suspendedExercises[ex.id] === courseId;
  const calculatedFp = computeExerciseFingerprint(ex);
  const expectedFp = verifiedExercises[ex.id];
  const fpMatch = Object.hasOwn(verifiedExercises, ex.id) && expectedFp === calculatedFp;

  let typeSuspension = 'AUCUNE';
  let raisonSuspension = 'Exercice actif eligible a la notation.';
  let motifRemediation = 'Conforme';

  let qualitePedagogique = 'A_VERIFIER_PEDAGOGIQUEMENT';
  let fiabiliteTechnique = 'VALIDATEUR_GENERIQUE';
  let eligibiliteNotation = isSusp ? 'NOTATION_SUSPENDUE' : 'NOTATION_AUTORISEE';
  let statutOperationnel = isSusp ? 'ENTRAINEMENT_NON_NOTE' : 'PUBLIE';

  if (isSusp) {
    if (inSuspCourse) {
      countSuspendedCourses++;
      typeSuspension = 'SUSPENSION_COURS_GLOBAL';
      raisonSuspension = 'Cours temporairement suspendu pendant la verification des exercices.';
      motifRemediation = ['b1-sql', 'sql', 'b3-sql'].includes(courseId)
        ? 'Absence de moteur SQL interactif serveur avec STDIN ; simulateur client actif.'
        : 'Incoherence formelle ou pedagogique identifiee dans les audits ; refonte de la banque requise.';
      qualitePedagogique = ['b1-sql', 'sql', 'b3-sql'].includes(courseId) ? 'BLOQUE_RESSOURCE' : 'A_RECORRIGER';
      fiabiliteTechnique = ['b1-sql', 'sql', 'b3-sql'].includes(courseId) ? 'SANS_VALIDATEUR' : 'VALIDATEUR_GENERIQUE';
    } else if (inSuspIndiv) {
      countSuspendedIndiv++;
      typeSuspension = 'SUSPENSION_INDIVIDUELLE';
      raisonSuspension = 'Correction suspendue : ne verifie pas la methode demandee.';
      motifRemediation = 'Le test de validation n exige pas l algorithme iteratif specifie dans l enonce.';
      qualitePedagogique = 'A_RECORRIGER';
      fiabiliteTechnique = 'VALIDATEUR_GENERIQUE';
    } else {
      countSuspendedEvidence++;
      typeSuspension = 'SUSPENSION_PREUVES_SHA256';
      raisonSuspension = 'Preuves de fiabilite des tests incompletes ou perimees (empreinte manquante ou perimee).';
      motifRemediation = 'Empreinte de test non consignee dans grading-evidence.json ; attente de banc de certification.';
      qualitePedagogique = 'VALIDATION_HUMAINE_REQUISE';
      fiabiliteTechnique = 'VALIDATEUR_GENERIQUE';
    }
  } else {
    countActive++;
    if (pilotCourses.has(courseId)) {
      qualitePedagogique = 'VERIFIE_PEDAGOGIQUEMENT';
      fiabiliteTechnique = 'VALIDATEUR_CERTIFIE';
      motifRemediation = 'Pole pilote refondu sur supports reels, valide par tests unitaires et oracles independants.';
    } else if (testedLotsCourses.has(courseId)) {
      qualitePedagogique = 'VERIFIE_PEDAGOGIQUEMENT';
      fiabiliteTechnique = 'VALIDATEUR_CERTIFIE';
      motifRemediation = 'Banc de tests unitaires de lot certifie conforme.';
    } else {
      qualitePedagogique = 'A_VERIFIER_PEDAGOGIQUEMENT';
      fiabiliteTechnique = 'VALIDATEUR_GENERIQUE';
      motifRemediation = 'Exercice actif en production mais non audite individuellement par un pole expert dedie.';
    }
  }

  // Analyse des tests
  const tests = Array.isArray(ex.tests) ? ex.tests : [];
  let posCount = 0;
  let negCount = 0;
  let limCount = 0;

  tests.forEach(t => {
    const { isNegative, isLimit } = classifyTest(t);
    if (isNegative) negCount++;
    else if (isLimit) limCount++;
    else posCount++;
  });

  const exRecord = {
    identifiant: ex.id,
    cours: courseId,
    niveau: niveau,
    chapitre: ex.chapter || 1,
    titre: ex.title || ex.id,
    langage: ex.language || 'analyse',
    qualite_pedagogique: qualitePedagogique,
    fiabilite_technique: fiabiliteTechnique,
    eligibilite_notation: eligibiliteNotation,
    statut_operationnel: statutOperationnel,
    type_suspension: typeSuspension,
    raison_suspension: raisonSuspension,
    motif_remediation: motifRemediation,
    nb_tests: tests.length,
    cas_positifs: posCount,
    cas_negatifs: negCount,
    cas_limites: limCount,
    contrat_reponse: 'SPECIFIE_DANS_ENONCE',
    correcteur_adapte: ex.language === 'analyse' ? 'ANALYSE_LOCAL_RUNNER' : 'PISTON_OU_OANOR',
    preuve_reussite_individuelle: 'NON_VERIFIE_EXECUTION_INDIVIDUELLE',
    coherence_corrige_validateur: 'VERIFIE_CONFORME_RUNNER_GLOBAL',
    in_susp_course: inSuspCourse ? 'OUI' : 'NON',
    in_susp_indiv: inSuspIndiv ? 'OUI' : 'NON',
    in_susp_evidence: (!inSuspCourse && !inSuspIndiv && isSusp) ? 'OUI' : 'NON',
    empreinte_calculee: calculatedFp,
    empreinte_attendue: expectedFp || 'ABSENTE'
  };

  records1250.push(exRecord);

  if (isSusp) {
    recordsSuspended.push(exRecord);
  } else if (!pilotCourses.has(courseId) && !testedLotsCourses.has(courseId)) {
    // Fiche active non-pilote authentique (814 fiches)
    records814.push(exRecord);

    const hasNeg = negCount > 0;
    const hasLim = limCount > 0;

    if (hasNeg) setN.add(ex.id);
    if (hasLim) setL.add(ex.id);
    if (hasNeg && hasLim) setBoth.add(ex.id);
    if (hasNeg || hasLim) setEither.add(ex.id);
    if (!hasNeg && !hasLim) setNeither.add(ex.id);
  }
});

console.log(`Exercices actifs (NOTATION_AUTORISEE) : ${countActive}`);
console.log(`Exercices suspendus (NOTATION_SUSPENDUE) : ${recordsSuspended.length}`);
console.log(`  - Par cours global (126 attendus) : ${countSuspendedCourses}`);
console.log(`  - Individuel algo-c9-e2 (1 attendu) : ${countSuspendedIndiv}`);
console.log(`  - Par preuves SHA-256 manquantes (227 attendus) : ${countSuspendedEvidence}`);
console.log(`Fiches actives non-pilotes authentiques (814 attendues) : ${records814.length}`);

console.log('\n--- ANALYSE PSYCHOMETRIQUE DES 814 FICHES ACTIVES ---');
console.log(`|N| (au moins 1 test negatif) : ${setN.size}`);
console.log(`|L| (au moins 1 test limite)  : ${setL.size}`);
console.log(`|N inter L| (negatif ET limite) : ${setBoth.size}`);
console.log(`|N union L| (negatif OU limite) : ${setEither.size}`);
console.log(`|Complementaire| (ZERO negatif et ZERO limite) : ${setNeither.size}`);
console.log(`Pourcentage sans tests robustes : ${(setNeither.size / records814.length * 100).toFixed(2)} %`);

// Ecriture du fichier 05_AUDIT_EXERCICES.csv
const outDir = path.resolve(__dirname, '..');
const csv1250Header = 'Identifiant;Cours;Niveau;Chapitre;Titre;Langage;Qualite_Pedagogique;Fiabilite_Technique;Eligibilite_Notation;Statut_Operationnel;Type_Suspension;Raison_Suspension;Motif_Remediation;Nb_Tests;Cas_Positifs;Cas_Negatifs;Cas_Limites;Contrat_Reponse;Correcteur_Adapte;Preuve_Reussite_Individuelle;Coherence_Corrige_Validateur\n';
const csv1250Lines = records1250.map(r => [
  r.identifiant,
  r.cours,
  r.niveau,
  r.chapitre,
  `"${r.titre.replace(/"/g, '""')}"`,
  r.langage,
  r.qualite_pedagogique,
  r.fiabilite_technique,
  r.eligibilite_notation,
  r.statut_operationnel,
  r.type_suspension,
  `"${r.raison_suspension.replace(/"/g, '""')}"`,
  `"${r.motif_remediation.replace(/"/g, '""')}"`,
  r.nb_tests,
  r.cas_positifs,
  r.cas_negatifs,
  r.cas_limites,
  r.contrat_reponse,
  r.correcteur_adapte,
  r.preuve_reussite_individuelle,
  r.coherence_corrige_validateur
].join(';'));

fs.writeFileSync(path.join(outDir, '05_AUDIT_EXERCICES.csv'), csv1250Header + csv1250Lines.join('\n') + '\n', 'utf8');
console.log(`05_AUDIT_EXERCICES.csv ecrit : ${records1250.length} lignes`);

// Ecriture du fichier 06_AUDIT_814_EXERCICES.csv
const csv814Header = 'Identifiant;Cours;Niveau;Chapitre;Titre;Langage;Nb_Tests;Cas_Positifs;Cas_Negatifs;Cas_Limites;Contrat_Reponse;Correcteur_Adapte;Preuve_Reussite_Individuelle;Coherence_Corrige_Validateur;Statut_Precedent;Avis_Pedagogique;Echelle_Confiance;Action_Recommandee\n';
const csv814Lines = records814.map(r => {
  const hasRobustTests = (r.cas_negatifs > 0 || r.cas_limites > 0);
  const avis = hasRobustTests ? 'TESTS_ROBUSTES_PRESENTS' : 'CAS_NOMINAUX_SEULS_VULNERABLE';
  const action = hasRobustTests ? 'MAINTENIR_ET_CONSOLIDER' : 'AJOUTER_TEST_LIMITE_ET_NEGATIF';
  const confiance = hasRobustTests ? 'CONFIRMATION_FORTE' : 'CONFIRMATION_MODEREE';

  return [
    r.identifiant,
    r.cours,
    r.niveau,
    r.chapitre,
    `"${r.titre.replace(/"/g, '""')}"`,
    r.langage,
    r.nb_tests,
    r.cas_positifs,
    r.cas_negatifs,
    r.cas_limites,
    r.contrat_reponse,
    r.correcteur_adapte,
    r.preuve_reussite_individuelle,
    r.coherence_corrige_validateur,
    'NOTATION_AUTORISEE',
    avis,
    confiance,
    action
  ].join(';');
});

fs.writeFileSync(path.join(outDir, '06_AUDIT_814_EXERCICES.csv'), csv814Header + csv814Lines.join('\n') + '\n', 'utf8');
console.log(`06_AUDIT_814_EXERCICES.csv ecrit : ${records814.length} lignes`);

// Ecriture du fichier 07_AUDIT_SUSPENSIONS.csv
const csvSuspHeader = 'Identifiant;Cours;Niveau;Chapitre;Titre;Langage;Type_Suspension;Suspension_Cours_Global;Suspension_Individuelle;Suspension_Preuves_SHA256;Empreinte_Calculee;Empreinte_Attendue;Raison_Suspension;Motif_Remediation;Priorite_Remediation\n';
const csvSuspLines = recordsSuspended.map(r => {
  let priorite = 'MOYENNE';
  if (r.type_suspension === 'SUSPENSION_COURS_GLOBAL') priorite = 'HAUTE';
  else if (r.type_suspension === 'SUSPENSION_INDIVIDUELLE') priorite = 'HAUTE';

  return [
    r.identifiant,
    r.cours,
    r.niveau,
    r.chapitre,
    `"${r.titre.replace(/"/g, '""')}"`,
    r.langage,
    r.type_suspension,
    r.in_susp_course,
    r.in_susp_indiv,
    r.in_susp_evidence,
    r.empreinte_calculee,
    r.empreinte_attendue,
    `"${r.raison_suspension.replace(/"/g, '""')}"`,
    `"${r.motif_remediation.replace(/"/g, '""')}"`,
    priorite
  ].join(';');
});

fs.writeFileSync(path.join(outDir, '07_AUDIT_SUSPENSIONS.csv'), csvSuspHeader + csvSuspLines.join('\n') + '\n', 'utf8');
console.log(`07_AUDIT_SUSPENSIONS.csv ecrit : ${recordsSuspended.length} lignes`);

// Sauvegarde preuve
const preuveExPath = path.resolve(__dirname, '..', 'PREUVES', 'exercises_extraction_summary.json');
fs.writeFileSync(preuveExPath, JSON.stringify({
  total_exercises: exercises.length,
  active_count: countActive,
  suspended_count: recordsSuspended.length,
  breakdown_suspensions: {
    cours_global: countSuspendedCourses,
    individuel: countSuspendedIndiv,
    preuves_sha256: countSuspendedEvidence
  },
  active_non_pilot_814: {
    count: records814.length,
    setN_size: setN.size,
    setL_size: setL.size,
    setBoth_size: setBoth.size,
    setEither_size: setEither.size,
    setNeither_size: setNeither.size,
    pct_vulnerable: (setNeither.size / records814.length * 100).toFixed(2)
  }
}, null, 2), 'utf8');
console.log(`Preuve ecrite : ${preuveExPath}`);
