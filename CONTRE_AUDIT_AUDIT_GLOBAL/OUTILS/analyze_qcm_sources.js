'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..', '..');
const CONTENT = path.join(ROOT, 'server', 'content');
const { COURSES } = require(path.join(ROOT, 'server', 'courses'));

console.log('--- SCANNING ALL QCM SOURCES ---');

// 1. Chapters in server/content/
const courseFolders = fs.readdirSync(CONTENT).filter(f => {
  return fs.statSync(path.join(CONTENT, f)).isDirectory();
});

console.log(`Found ${courseFolders.length} course folders in server/content/`);

let totalChapterQ = 0;
let chapterDetails = [];
let coursesWithChapters = 0;

for (const courseId of Object.keys(COURSES)) {
  const courseDir = path.join(CONTENT, courseId);
  if (!fs.existsSync(courseDir)) {
    continue;
  }

  // Find all chapter files
  let chapters = [];
  const p1 = path.join(courseDir, 'chapitres-1-3.js');
  const p2 = path.join(courseDir, 'chapitres-4-6.js');
  const p3 = path.join(courseDir, 'chapitres-7-9.js');
  const p4 = path.join(courseDir, 'chapitres-10-12.js');

  if (fs.existsSync(p1)) {
    try {
      const c1 = require(p1);
      chapters.push(...c1);
      if (fs.existsSync(p2)) chapters.push(...require(p2));
      if (fs.existsSync(p3)) chapters.push(...require(p3));
      if (fs.existsSync(p4)) chapters.push(...require(p4));
    } catch (err) {
      console.error(`Error requiring chunk files for ${courseId}:`, err.message);
    }
  } else {
    // Individual chapter files
    let i = 1;
    while (fs.existsSync(path.join(courseDir, `chapitre${i}.js`))) {
      try {
        const cp = path.join(courseDir, `chapitre${i}.js`);
        chapters.push(require(cp));
      } catch (err) {
        console.error(`Error requiring ${courseId}/chapitre${i}.js:`, err.message);
      }
      i++;
    }
  }

  // Also check if any standalone chapitre*.js exists that was missed
  const allFiles = fs.readdirSync(courseDir);
  const extraChapFiles = allFiles.filter(f => /^chapitre\d+\.js$/.test(f));
  if (!fs.existsSync(p1) && extraChapFiles.length !== chapters.length) {
    console.warn(`Discrepancy in ${courseId}: extraChapFiles=${extraChapFiles.length}, loaded=${chapters.length}`);
  }

  let courseQCount = 0;
  for (let chIdx = 0; chIdx < chapters.length; chIdx++) {
    const ch = chapters[chIdx];
    if (ch && Array.isArray(ch.questions)) {
      courseQCount += ch.questions.length;
      totalChapterQ += ch.questions.length;
    }
  }
  if (chapters.length > 0) {
    coursesWithChapters++;
    chapterDetails.push({ courseId, chaptersCount: chapters.length, questionsCount: courseQCount });
  }
}

console.log(`Courses with loaded chapters: ${coursesWithChapters}`);
console.log(`Total chapter questions found: ${totalChapterQ}`);

// 2. Exam questions across all course folders in server/content/
console.log('\n--- SCANNING EXAM QUESTIONS IN ALL CONTENT FOLDERS ---');
const vm = require('node:vm');
let totalExamQ = 0;
let examDetails = [];

for (const courseId of Object.keys(COURSES)) {
  const courseDir = path.join(CONTENT, courseId);
  if (!fs.existsSync(courseDir)) continue;

  const candidates = [
    path.join(courseDir, 'pages.js'),
    path.join(courseDir, 'pages', 'examens-exercices.js'),
    path.join(courseDir, 'pages', 'examen.js')
  ];

  for (const cand of candidates) {
    if (!fs.existsSync(cand)) continue;
    const txt = fs.readFileSync(cand, 'utf8');
    const match = txt.match(/const (?:mastery|EXAMEN_QCM)\s*=\s*\[([\s\S]*?)\];/);
    if (match) {
      try {
        const parsed = vm.runInNewContext('[' + match[1] + ']');
        totalExamQ += parsed.length;
        examDetails.push({
          courseId,
          file: path.relative(ROOT, cand),
          count: parsed.length
        });
      } catch (err) {
        console.error(`Error evaluating exam in ${cand}:`, err.message);
      }
    }
  }
}

console.log(`Total exam questions found: ${totalExamQ} across ${examDetails.length} files`);
console.log(`Sum of Chapter (${totalChapterQ}) + Exam (${totalExamQ}) = ${totalChapterQ + totalExamQ}`);
