'use strict';

/**
 * ════════════════════════════════════════════════════════════════════════════
 * OUTIL FORENSIQUE 01 : RÉCONCILIATION DES EXERCICES DE CODE ET DES TESTS
 * Recalcul exhaustif sans troncature, sans slice et sans quotas artificiels
 * ════════════════════════════════════════════════════════════════════════════
 */

const fs = require('node:fs');
const path = require('node:path');
const { createHash } = require('node:crypto');

const ROOT = path.resolve(__dirname, '..', '..');
const catalogue = require(path.join(ROOT, 'server', 'exercises'));
const policy = require(path.join(ROOT, 'server', 'exercises', 'grading-policy'));
const { COURSES } = require(path.join(ROOT, 'server', 'courses'));
const courseConfig = require(path.join(ROOT, 'server', 'exercises', 'course-config'));

console.log('=== [OUTIL 01] RÉCONCILIATION FORENSIQUE DES EXERCICES ===');

const exercises = catalogue.listExercises();
console.log(`Exercices totaux chargés depuis catalogue : ${exercises.length}`);

const verifiedExercises = require(path.join(ROOT, 'server', 'exercises', 'grading-evidence.json'));
const runtimeEvidence = require(path.join(ROOT, 'server', 'exercises', 'grading-runtime-evidence.json'));

function exerciseFingerprint(exercise) {
  return createHash('sha256').update(JSON.stringify(exercise)).digest('hex');
}

// Classification fine des tests
function inspectExerciseTests(exercise) {
  const tests = Array.isArray(exercise.tests) ? exercise.tests : [];
  let posCount = 0;
  let negCount = 0;
  let limCount = 0;
  const testDetails = [];

  tests.forEach((t, idx) => {
    const label = (t.label || t.name || t.description || '').toLowerCase();
    const stdin = (t.stdin != null ? String(t.stdin) : '').toLowerCase();
    const expected = (t.expected != null ? String(t.expected) : '').toLowerCase();

    let isNegative = false;
    let isLimit = false;

    // Détection négatif : gestion d'erreur, entrée invalide, refus, borne négative invalide
    if (
      label.includes('invalide') || label.includes('erreur') || label.includes('rejet') ||
      label.includes('négatif') || label.includes('negatif') || label.includes('hors bornes') ||
      label.includes('faux') || label.includes('interdit') || label.includes('refus') ||
      label.includes('exception') || label.includes('non trouvé') || (label.includes('vide') && expected.includes('erreur')) ||
      (stdin.includes('-') && (expected.includes('erreur') || expected.includes('invalide') || expected.includes('impossible'))) ||
      expected.includes('erreur') || expected.includes('invalide') || expected.includes('impossible') || expected.includes('usage:')
    ) {
      isNegative = true;
    }

    // Détection limite : frontières, 0, 1, chaîne vide sans erreur, valeurs extrêmes, cas neutre
    if (
      label.includes('limite') || label.includes('borne') || label.includes('extrême') ||
      label.includes('seuil') || (label.includes('vide') && !isNegative) || label.includes('zéro') ||
      label.includes('zero') || stdin === '0' || stdin === '0\n' || stdin === '' ||
      label.includes('neutre') || label.includes('un seul') || label.includes('minimum') || label.includes('maximum')
    ) {
      isLimit = true;
    }

    if (isNegative) negCount++;
    else if (isLimit) limCount++;
    else posCount++;

    testDetails.push({
      testIndex: idx + 1,
      label: t.label || t.name || t.description || `Test ${idx + 1}`,
      isNegative,
      isLimit,
      isPositive: !isNegative && !isLimit
    });
  });

  return {
    totalTests: tests.length,
    posCount,
    negCount,
    limCount,
    testDetails
  };
}

// Définitions des groupes pilotes et complémentaires
const pilotCourseNames = new Set(['b1-linux', 'probabilites', 'RD-RO']);
const complementaryCourseNames = new Set(['b1-python', 'b1-c-cpp', 'rd_winserver', 'react']);

// Registres
const allRecords = [];
const duplicateMap = new Map();
const suspendedRecords = [];
const activeRecords = [];
const activePilotRecords = [];
const activeComplementaryRecords = [];
const activeNonPilot814Records = [];

// Ensembles psychométriques pour les 814 fiches non-pilotes
const setN = new Set();
const setL = new Set();
const setBoth = new Set();
const setEither = new Set();
const setNeither = new Set();

let countSuspendedCourses = 0;
let countSuspendedIndiv = 0;
let countSuspendedEvidence = 0;

exercises.forEach((ex, idx) => {
  // Contrôle d'unicité
  if (duplicateMap.has(ex.id)) {
    duplicateMap.get(ex.id).push(ex.course);
  } else {
    duplicateMap.set(ex.id, [ex.course]);
  }

  const courseId = ex.course;
  const courseMeta = COURSES[courseId] || {};
  let niveau = 'B2';
  if (courseId.startsWith('b1-') || courseId.startsWith('b1/')) niveau = 'B1';
  else if (courseId.startsWith('b3-')) niveau = 'B3';
  else if (courseMeta.level) niveau = courseMeta.level.toUpperCase();

  const isSusp = policy.isGradingSuspended(courseId, ex.id);
  const inSuspCourse = policy.suspendedCourses.includes(courseId);
  const inSuspIndiv = Object.hasOwn(policy.suspendedExercises, ex.id) && policy.suspendedExercises[ex.id] === courseId;
  const calculatedFp = exerciseFingerprint(ex);
  const expectedFp = verifiedExercises[ex.id];
  const fpMatch = Object.hasOwn(verifiedExercises, ex.id) && expectedFp === calculatedFp;

  let typeSuspension = 'AUCUNE';
  let motifSuspension = 'Exercice actif éligible à la notation';

  if (isSusp) {
    if (inSuspCourse) {
      countSuspendedCourses++;
      typeSuspension = 'SUSPENSION_COURS_GLOBAL';
      motifSuspension = ['b1-sql', 'sql', 'b3-sql'].includes(courseId)
        ? 'Absence de moteur SQL interactif serveur (simulateur WebAssembly client).'
        : 'Cours globalement suspendu pour refonte didactique et technique.';
    } else if (inSuspIndiv) {
      countSuspendedIndiv++;
      typeSuspension = 'SUSPENSION_INDIVIDUELLE';
      motifSuspension = 'Correction suspendue : ne vérifie pas la méthode demandée.';
    } else {
      countSuspendedEvidence++;
      typeSuspension = 'SUSPENSION_PREUVES_SHA256';
      motifSuspension = 'Preuves de fiabilité incomplètes ou empreinte SHA-256 manquante/périmée.';
    }
  }

  const { totalTests, posCount, negCount, limCount, testDetails } = inspectExerciseTests(ex);

  // Classification pédagogique / pilote
  let groupClassification = 'HORS_PILOTE';
  if (pilotCourseNames.has(courseId)) {
    groupClassification = 'PILOTE_HISTORIQUE';
  } else if (complementaryCourseNames.has(courseId)) {
    groupClassification = 'LOT_COMPLEMENTAIRE';
  }

  let testClassification = 'AUCUN_TEST_LIMITE_OU_NEGATIF';
  if (negCount > 0 && limCount > 0) testClassification = 'BOTH_CONFIRMED';
  else if (negCount > 0) testClassification = 'NEGATIVE_TEST_CONFIRMED';
  else if (limCount > 0) testClassification = 'LIMIT_TEST_CONFIRMED';

  const record = {
    id: ex.id,
    courseId,
    courseTitle: courseConfig[courseId] ? courseConfig[courseId].title : (courseMeta.name || courseId),
    level: niveau,
    chapter: ex.chapter || 1,
    title: ex.title || ex.id,
    language: ex.language || 'analyse',
    isSuspended: isSusp,
    typeSuspension,
    motifSuspension,
    groupClassification,
    totalTests,
    casPositifs: posCount,
    casNegatifs: negCount,
    casLimites: limCount,
    testClassification,
    fingerprintCalculated: calculatedFp,
    fingerprintExpected: expectedFp || null,
    evidenceLevel: 'P1'
  };

  allRecords.push(record);

  if (isSusp) {
    suspendedRecords.push(record);
  } else {
    activeRecords.push(record);
    if (pilotCourseNames.has(courseId)) {
      activePilotRecords.push(record);
    } else if (complementaryCourseNames.has(courseId)) {
      activeComplementaryRecords.push(record);
    } else {
      activeNonPilot814Records.push(record);

      if (negCount > 0) setN.add(ex.id);
      if (limCount > 0) setL.add(ex.id);
      if (negCount > 0 && limCount > 0) setBoth.add(ex.id);
      if (negCount > 0 || limCount > 0) setEither.add(ex.id);
      if (negCount === 0 && limCount === 0) setNeither.add(ex.id);
    }
  }
});

// Analyse des doublons
const duplicates = [];
for (const [id, coursesList] of duplicateMap.entries()) {
  if (coursesList.length > 1) {
    duplicates.push({ id, courses: coursesList });
  }
}

console.log('\n--- RÉSULTATS DU RECALCUL DES EXERCICES ---');
console.log(`Exercices totaux : ${allRecords.length}`);
console.log(`Identifiants uniques : ${duplicateMap.size}`);
console.log(`Doublons d'identifiants : ${duplicates.length}`);
console.log(`Exercices suspendus : ${suspendedRecords.length}`);
console.log(`  - Par cours global (126 attendus) : ${countSuspendedCourses}`);
console.log(`  - Suspension individuelle (algo-c9-e2, 1 attendu) : ${countSuspendedIndiv}`);
console.log(`  - Preuves SHA-256 manquantes/périmées (227 attendus) : ${countSuspendedEvidence}`);
console.log(`Exercices non suspendus (actifs) : ${activeRecords.length}`);
console.log(`Vérification arithmétique 1250 = ${suspendedRecords.length} + ${activeRecords.length} : ${allRecords.length === suspendedRecords.length + activeRecords.length}`);

console.log('\n--- DÉCOMPOSITION DES PILOTES ET COMPLÉMENTAIRES ---');
console.log(`Pilotes historiques actifs (55 attendus) : ${activePilotRecords.length}`);
const pilotsByCourse = {};
activePilotRecords.forEach(r => pilotsByCourse[r.courseId] = (pilotsByCourse[r.courseId] || 0) + 1);
console.log('  Par cours pilote :', pilotsByCourse);

console.log(`Lots complémentaires actifs (27 attendus) : ${activeComplementaryRecords.length}`);
const compByCourse = {};
activeComplementaryRecords.forEach(r => compByCourse[r.courseId] = (compByCourse[r.courseId] || 0) + 1);
console.log('  Par cours complémentaire :', compByCourse);

const totalPilotesPlusComp = activePilotRecords.length + activeComplementaryRecords.length;
console.log(`Total Pilotes + Complémentaires : ${totalPilotesPlusComp}`);

console.log('\n--- ANALYSE DE LA POPULATION HORS PILOTE (814 ATTENDUES) ---');
console.log(`Nombre d'exercices hors pilote actifs : ${activeNonPilot814Records.length}`);
console.log(`Vérification arithmétique : 896 - 82 = ${896 - 82} (obtenu : ${activeNonPilot814Records.length})`);

console.log('\n--- ANALYSE PSYCHOMÉTRIQUE DES 814 FICHES ---');
console.log(`|N| (possède au moins 1 test négatif) : ${setN.size}`);
console.log(`|L| (possède au moins 1 test limite)  : ${setL.size}`);
console.log(`|N ∩ L| (possède négatif ET limite)   : ${setBoth.size}`);
console.log(`|N ∪ L| (possède négatif OU limite)   : ${setEither.size}`);
console.log(`Vérification formule |N ∪ L| = |N| + |L| - |N ∩ L| : ${setN.size} + ${setL.size} - ${setBoth.size} = ${setN.size + setL.size - setBoth.size} (obtenu : ${setEither.size})`);
console.log(`|Complémentaire| (zéro négatif et zéro limite) : ${setNeither.size}`);
console.log(`Vérification 814 = |N ∪ L| + |Complémentaire| : ${setEither.size} + ${setNeither.size} = ${setEither.size + setNeither.size}`);

// Sauvegarde dans les dossiers de mission
const OUT_RAW = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '01_INVENTAIRES_RECONSTRUITS');
const OUT_EX = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '02_RECONCILIATION_EXERCICES');
const OUT_MANIF = path.join(ROOT, 'RECONCILIATION_CONTRE_AUDIT_GLOBAL', '07_MANIFESTES');

fs.writeFileSync(path.join(OUT_RAW, 'inventaire_exercices_brut.json'), JSON.stringify(allRecords, null, 2), 'utf8');

const summaryData = {
  totalExercices: allRecords.length,
  idsUniques: duplicateMap.size,
  doublons: duplicates,
  suspendus: {
    total: suspendedRecords.length,
    coursGlobal: countSuspendedCourses,
    individuel: countSuspendedIndiv,
    preuvesSha256: countSuspendedEvidence
  },
  actifs: {
    total: activeRecords.length,
    pilotesHistoriquesActifs: {
      total: activePilotRecords.length,
      parCours: pilotsByCourse
    },
    lotsComplementairesActifs: {
      total: activeComplementaryRecords.length,
      parCours: compByCourse
    },
    totalPilotesEtComplementaires: totalPilotesPlusComp,
    horsPilote: activeNonPilot814Records.length
  },
  tests814: {
    populationEtudiee: activeNonPilot814Records.length,
    setN_negatifs: setN.size,
    setL_limites: setL.size,
    setN_inter_L: setBoth.size,
    setN_union_L: setEither.size,
    sansTestsNegatifsNiLimites: setNeither.size,
    pourcentageSansTests: (setNeither.size / activeNonPilot814Records.length * 100).toFixed(2)
  }
};

fs.writeFileSync(path.join(OUT_EX, 'reconciliation_exercices_complete.json'), JSON.stringify(summaryData, null, 2), 'utf8');

// Génération des manifestes de référence demandés dans 07_MANIFESTES
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_exercices.json'), JSON.stringify(allRecords, null, 2), 'utf8');

// CSV Exercices
const csvHeader = 'id;courseId;courseTitle;level;chapter;title;language;isSuspended;typeSuspension;motifSuspension;groupClassification;totalTests;casPositifs;casNegatifs;casLimites;testClassification;fingerprintCalculated;evidenceLevel\n';
const csvLines = allRecords.map(r => [
  r.id,
  r.courseId,
  `"${r.courseTitle.replace(/"/g, '""')}"`,
  r.level,
  r.chapter,
  `"${r.title.replace(/"/g, '""')}"`,
  r.language,
  r.isSuspended ? 'OUI' : 'NON',
  r.typeSuspension,
  `"${r.motifSuspension.replace(/"/g, '""')}"`,
  r.groupClassification,
  r.totalTests,
  r.casPositifs,
  r.casNegatifs,
  r.casLimites,
  r.testClassification,
  r.fingerprintCalculated,
  r.evidenceLevel
].join(';'));
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_exercices.csv'), csvHeader + csvLines.join('\n') + '\n', 'utf8');

fs.writeFileSync(path.join(OUT_MANIF, 'manifest_pilotes.json'), JSON.stringify({
  pilotesHistoriquesActifs: activePilotRecords,
  lotsComplementairesActifs: activeComplementaryRecords,
  totalPilotes: totalPilotesPlusComp
}, null, 2), 'utf8');

fs.writeFileSync(path.join(OUT_MANIF, 'manifest_hors_pilote.json'), JSON.stringify(activeNonPilot814Records, null, 2), 'utf8');
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_tests_negatifs.json'), JSON.stringify([...setN].sort(), null, 2), 'utf8');
fs.writeFileSync(path.join(OUT_MANIF, 'manifest_tests_limites.json'), JSON.stringify([...setL].sort(), null, 2), 'utf8');

console.log('Manifestes exercices générés avec succès dans 07_MANIFESTES/.');
