'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const CONTENT_DIR = path.resolve(__dirname, '../server/content');

/**
 * Charge tous les cours et leurs questions QCM définies sous `server/content/`.
 */
function loadAllCoursesWithQuestions() {
  const courseFiles = fs.readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith('.js') && f !== 'index.js')
    .sort();

  const courses = [];

  for (const file of courseFiles) {
    const courseId = file.replace(/\.js$/, '');
    const coursePath = path.join(CONTENT_DIR, file);
    const src = fs.readFileSync(coursePath, 'utf8');

    // Récupère les imports de chapitres (chapitres-1-3, chapitres-4-6, etc.)
    const reqMatches = [...src.matchAll(/require\((\x27|\x22)(\.\/[^\x27\x22]+chapitres-[^\x27\x22]+)(\x27|\x22)\)/g)];
    const questions = [];
    const sourceFiles = new Set();

    for (const m of reqMatches) {
      const relPath = m[2];
      const fullChapPath = path.resolve(CONTENT_DIR, relPath);
      const chapFile = fullChapPath + (fullChapPath.endsWith('.js') ? '' : '.js');
      const chapSrc = fs.readFileSync(chapFile, 'utf8');
      const subRequires = [...chapSrc.matchAll(/require\((\x27|\x22)(\.\/chapitre\d+)(\x27|\x22)\)/g)];

      const filesToLoad = subRequires.length > 0
        ? subRequires.map(sm => path.resolve(path.dirname(fullChapPath), sm[2] + '.js'))
        : [chapFile];

      for (const f of filesToLoad) {
        sourceFiles.add(f);
        delete require.cache[require.resolve(f)];
        const mod = require(f);
        const chapterList = Array.isArray(mod) ? mod : [mod];
        for (const ch of chapterList) {
          if (Array.isArray(ch.questions)) {
            for (let i = 0; i < ch.questions.length; i++) {
              const q = ch.questions[i];
              questions.push({
                courseId,
                file: f,
                chapterNum: ch.n,
                indexInChapter: i,
                raw: q,
                q: q.q || q.stem || '',
                opts: q.opts || q.choices || q.options || [],
                correct: typeof q.correct === 'number' ? q.correct : q.answer,
                exp: q.exp || q.explanation || ''
              });
            }
          }
        }
      }
    }

    if (questions.length > 0) {
      courses.push({
        id: courseId,
        file,
        sourceFiles: Array.from(sourceFiles),
        questions
      });
    }
  }

  return courses;
}

const allCourses = loadAllCoursesWithQuestions();

test('QCM Intégrité — Toutes les questions ont une explication (exp) non vide (≥ 10 caractères)', () => {
  const invalidExp = [];

  for (const course of allCourses) {
    for (const q of course.questions) {
      if (typeof q.exp !== 'string' || q.exp.trim().length < 10) {
        invalidExp.push({
          course: course.id,
          file: path.relative(path.resolve(__dirname, '..'), q.file),
          chapter: q.chapterNum,
          question: q.q,
          exp: q.exp
        });
      }
    }
  }

  assert.deepEqual(invalidExp, [], `Des questions n'ont pas d'explication valide (≥ 10 car.) : ${JSON.stringify(invalidExp)}`);
});

test('QCM Intégrité — Équilibre statistique des réponses correctes (< 50% par indice)', async (t) => {
  const failingCourses = [];

  for (const course of allCourses) {
    if (course.questions.length < 12) continue;

    const counts = { 0: 0, 1: 0, 2: 0, 3: 0 };
    for (const q of course.questions) {
      if (typeof q.correct === 'number' && counts[q.correct] !== undefined) {
        counts[q.correct]++;
      }
    }

    const total = course.questions.length;
    let maxCount = 0;
    let maxIdx = 0;
    for (let i = 0; i < 4; i++) {
      if (counts[i] > maxCount) {
        maxCount = counts[i];
        maxIdx = i;
      }
    }

    const ratio = maxCount / total;
    const pct = Math.round(ratio * 100);

    await t.test(`Cours ${course.id} (${total} questions, max indice ${maxIdx}: ${pct}%)`, () => {
      assert.ok(
        ratio <= 0.50,
        `Biais excessif dans ${course.id} : l'indice ${maxIdx} représente ${pct}% des bonnes réponses (${maxCount}/${total} > 50%)`
      );
    });

    if (ratio > 0.50) {
      failingCourses.push({
        course: course.id,
        total,
        maxIdx,
        pct,
        counts
      });
    }
  }

  assert.equal(
    failingCourses.length,
    0,
    `${failingCourses.length} cours ont un indice correct représentant plus de 50% des questions : ${failingCourses.map(f => `${f.course} (indice ${f.maxIdx}: ${f.pct}%)`).join(', ')}`
  );
});
