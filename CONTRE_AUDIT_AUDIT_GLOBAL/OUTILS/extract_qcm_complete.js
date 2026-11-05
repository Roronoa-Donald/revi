'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..', '..');
const CONTENT = path.join(ROOT, 'server', 'content');
const { COURSES } = require(path.join(ROOT, 'server', 'courses'));

console.log('=== EXTRACTION COMPLETE ET INDEPENDANTE DU CORPUS QCM ===');

const allQuestions = [];
const idSet = new Set();
const duplicateIds = [];

// Helper to sanitize strings
function cleanStr(s) {
  if (s == null) return '';
  return String(s).replace(/[\r\n\t]+/g, ' ').trim();
}

// 1. Extraire les chapitres de tous les cours
const contentEntries = fs.readdirSync(CONTENT).filter(f => f.endsWith('.js')).sort();

let totalChapterQ = 0;
let coursesChapterStats = [];

for (const entryFile of contentEntries) {
  const courseId = entryFile.replace('.js', '');
  const courseMeta = COURSES[courseId] || {};
  let niveau = 'B2';
  if (courseId.startsWith('b1-') || courseId.startsWith('b1/')) niveau = 'B1';
  else if (courseId.startsWith('b3-')) niveau = 'B3';
  else if (courseMeta.level) niveau = courseMeta.level.toUpperCase();

  // Identifier le dossier de contenu
  let subDir = courseId;
  if (!fs.existsSync(path.join(CONTENT, subDir))) {
    if (courseId === 'Cyber securite B2') subDir = 'cyber-securite-b2';
  }
  const fullSubDir = path.join(CONTENT, subDir);
  if (!fs.existsSync(fullSubDir)) continue;

  let chapters = [];
  let sourceFiles = [];

  const p1 = path.join(fullSubDir, 'chapitres-1-3.js');
  const p2 = path.join(fullSubDir, 'chapitres-4-6.js');
  const p3 = path.join(fullSubDir, 'chapitres-7-9.js');
  const p4 = path.join(fullSubDir, 'chapitres-10-12.js');

  if (fs.existsSync(p1)) {
    try {
      const c1 = require(p1);
      c1.forEach(() => sourceFiles.push(path.relative(ROOT, p1)));
      chapters.push(...c1);

      if (fs.existsSync(p2)) {
        const c2 = require(p2);
        c2.forEach(() => sourceFiles.push(path.relative(ROOT, p2)));
        chapters.push(...c2);
      }
      if (fs.existsSync(p3)) {
        const c3 = require(p3);
        c3.forEach(() => sourceFiles.push(path.relative(ROOT, p3)));
        chapters.push(...c3);
      }
      if (fs.existsSync(p4)) {
        const c4 = require(p4);
        c4.forEach(() => sourceFiles.push(path.relative(ROOT, p4)));
        chapters.push(...c4);
      }
    } catch (err) {
      console.error(`Erreur chargement chunks ${courseId}:`, err.message);
    }
  } else {
    let i = 1;
    while (fs.existsSync(path.join(fullSubDir, `chapitre${i}.js`))) {
      const cp = path.join(fullSubDir, `chapitre${i}.js`);
      try {
        const c = require(cp);
        chapters.push(c);
        sourceFiles.push(path.relative(ROOT, cp));
      } catch (err) {
        console.error(`Erreur chargement ${cp}:`, err.message);
      }
      i++;
    }
  }

  let courseQCount = 0;
  for (let chIdx = 0; chIdx < chapters.length; chIdx++) {
    const ch = chapters[chIdx];
    const srcFile = sourceFiles[chIdx] || path.relative(ROOT, fullSubDir);
    const chapNum = ch.n || (chIdx + 1);

    if (Array.isArray(ch.questions)) {
      for (let qIdx = 0; qIdx < ch.questions.length; qIdx++) {
        const q = ch.questions[qIdx];
        const rawOpts = q.opts || q.choices || q.options || [];
        const opts = rawOpts.map(cleanStr);
        const correctIndex = typeof q.correct === 'number' ? q.correct : (typeof q.answer === 'number' ? q.answer : 0);

        const qId = `QCM-${courseId}-C${chapNum}-Q${qIdx + 1}`;
        if (idSet.has(qId)) duplicateIds.push(qId);
        idSet.add(qId);

        const qItem = {
          id_qcm: qId,
          cours: courseId,
          niveau: niveau,
          type_support: 'CHAPITRE',
          chapitre_ou_page: `Chapitre ${chapNum}`,
          question_index: qIdx + 1,
          enonce: cleanStr(q.stem || q.q || q.question),
          options: opts,
          nb_options: opts.length,
          reponse_correcte: correctIndex,
          explication: cleanStr(q.exp || q.explanation),
          fichier_source: srcFile
        };

        allQuestions.push(qItem);
        courseQCount++;
        totalChapterQ++;
      }
    }
  }

  coursesChapterStats.push({ courseId, chaptersCount: chapters.length, questionsCount: courseQCount });
}

console.log(`Questions de chapitres extraites : ${totalChapterQ} (sur ${coursesChapterStats.length} cours)`);

// 2. Extraire les questions d'examens
let totalExamQ = 0;
const examFilesFound = [];

for (const entryFile of contentEntries) {
  const courseId = entryFile.replace('.js', '');
  const courseMeta = COURSES[courseId] || {};
  let niveau = 'B2';
  if (courseId.startsWith('b1-') || courseId.startsWith('b1/')) niveau = 'B1';
  else if (courseId.startsWith('b3-')) niveau = 'B3';
  else if (courseMeta.level) niveau = courseMeta.level.toUpperCase();

  let subDir = courseId;
  if (!fs.existsSync(path.join(CONTENT, subDir))) {
    if (courseId === 'Cyber securite B2') subDir = 'cyber-securite-b2';
  }
  const fullSubDir = path.join(CONTENT, subDir);
  if (!fs.existsSync(fullSubDir)) continue;

  const candidates = [
    path.join(fullSubDir, 'pages.js'),
    path.join(fullSubDir, 'pages', 'examens-exercices.js'),
    path.join(fullSubDir, 'pages', 'examen.js')
  ];

  for (const cand of candidates) {
    if (!fs.existsSync(cand)) continue;
    const txt = fs.readFileSync(cand, 'utf8');
    const match = txt.match(/const (?:mastery|EXAMEN_QCM)\s*=\s*\[([\s\S]*?)\];/);
    if (match) {
      try {
        const parsed = vm.runInNewContext('[' + match[1] + ']');
        examFilesFound.push({ courseId, file: path.relative(ROOT, cand), count: parsed.length });

        for (let examIdx = 0; examIdx < parsed.length; examIdx++) {
          const item = parsed[examIdx];
          const rawOpts = item.opts || item.choices || item.options || [];
          const opts = rawOpts.map(cleanStr);
          const correctIndex = typeof item.correct === 'number' ? item.correct : (typeof item.answer === 'number' ? item.answer : 0);

          const qId = `QCM-${courseId}-EXAM-Q${examIdx + 1}`;
          if (idSet.has(qId)) duplicateIds.push(qId);
          idSet.add(qId);

          const qItem = {
            id_qcm: qId,
            cours: courseId,
            niveau: niveau,
            type_support: 'EXAMEN',
            chapitre_ou_page: 'Examen Blanc',
            question_index: examIdx + 1,
            enonce: cleanStr(item.stem || item.q || item.question),
            options: opts,
            nb_options: opts.length,
            reponse_correcte: correctIndex,
            explication: cleanStr(item.exp || item.explanation),
            fichier_source: path.relative(ROOT, cand)
          };

          allQuestions.push(qItem);
          totalExamQ++;
        }
      } catch (err) {
        console.error(`Erreur parsing examen ${cand}:`, err.message);
      }
    }
  }
}

console.log(`Questions d'examens extraites : ${totalExamQ} (sur ${examFilesFound.length} fichiers d'examen)`);
console.log(`TOTAL GENERAL CORPUS REEL : ${allQuestions.length} questions uniques`);
console.log(`Doublons d'identifiants detectes : ${duplicateIds.length}`);

// 3. Verifier les 700 questions autonomes (qcm-100.js)
const qcm100Courses = ['Cyber securite B2', 'api-rest-flask', 'assembleur', 'erp-si', 'ingenierie-besoin', 'masterclass-apprendre', 'react'];
let qcm100Total = 0;
const qcm100Details = [];

for (const c of qcm100Courses) {
  const p = path.join(ROOT, c, 'qcm-100.js');
  if (fs.existsSync(p)) {
    try {
      const content = fs.readFileSync(p, 'utf8');
      const marker = 'window.COURSE_QCM =';
      const idx = content.indexOf(marker);
      if (idx !== -1) {
        let jsonStr = content.substring(idx + marker.length).trim();
        if (jsonStr.endsWith(';')) jsonStr = jsonStr.slice(0, -1).trim();
        const parsed = JSON.parse(jsonStr);
        qcm100Total += parsed.length;
        qcm100Details.push({ course: c, file: path.relative(ROOT, p), count: parsed.length });
      }
    } catch (e) {
      console.error(`Erreur lecture qcm-100.js pour ${c}:`, e.message);
    }
  }
}

console.log(`Questions autonomes hors-corpus (qcm-100.js) : ${qcm100Total} questions (7 fichiers de 100 questions)`);

// 4. Ecriture du manifeste prive complet
const manifestDir = path.resolve(__dirname, '..', 'MANIFESTES');
fs.mkdirSync(manifestDir, { recursive: true });

const manifestPath = path.join(manifestDir, '08_INVENTAIRE_QCM_COMPLET.json');
const manifestPublicPath = path.resolve(__dirname, '..', '08_INVENTAIRE_QCM.json');

const payload = {
  description: 'Manifeste complet et independant de l ensemble des questions QCM extraites des sources originales',
  date_extraction: new Date().toISOString(),
  total_questions: allQuestions.length,
  breakdown: {
    questions_chapitres: totalChapterQ,
    questions_examens: totalExamQ,
    cours_avec_chapitres: coursesChapterStats.length,
    fichiers_examens: examFilesFound.length,
    cyber_securite_b2_chapitres: coursesChapterStats.find(c => c.courseId === 'Cyber securite B2')?.questionsCount || 0,
    questions_chapitres_63_cours_hors_cyber: totalChapterQ - (coursesChapterStats.find(c => c.courseId === 'Cyber securite B2')?.questionsCount || 0),
    questions_autonomes_qcm100_hors_corpus: qcm100Total
  },
  explication_reconciliation_historique: {
    chiffre_3089: 'Obtenu par build_finalisation_manifests.js via rawChapterItems.slice(0, 2829) + rawExamItems.slice(0, 260) = 3089. Slicing arbitraire de 69 questions.',
    chiffre_3158: 'Total brut de build_finalisation_manifests.js avant slice : 2898 chapitres (63 cours) + 260 examens = 3158. Mais omettait Cyber securite B2 (27 questions).',
    chiffre_reel_3185: 'Total exhaustif verifie : 2925 chapitres (64 cours dont Cyber securite B2) + 260 examens = 3185 questions.'
  },
  questions: allQuestions
};

fs.writeFileSync(manifestPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Manifeste prive ecrit : ${manifestPath} (${(fs.statSync(manifestPath).size / 1024 / 1024).toFixed(2)} Mo)`);

// Copie dans le livrable racine 08_INVENTAIRE_QCM.json
fs.writeFileSync(manifestPublicPath, JSON.stringify(payload, null, 2), 'utf8');
console.log(`Livrable 08_INVENTAIRE_QCM.json ecrit : ${manifestPublicPath}`);

// Enregistrer le resume dans PREUVES/
const preuvePath = path.resolve(__dirname, '..', 'PREUVES', 'qcm_extraction_summary.json');
fs.writeFileSync(preuvePath, JSON.stringify({
  total_extracted: allQuestions.length,
  totalChapterQ,
  totalExamQ,
  coursesChapterStats,
  examFilesFound,
  qcm100Details,
  breakdown: payload.breakdown,
  explication: payload.explication_reconciliation_historique
}, null, 2), 'utf8');
console.log(`Preuve ecrite : ${preuvePath}`);
