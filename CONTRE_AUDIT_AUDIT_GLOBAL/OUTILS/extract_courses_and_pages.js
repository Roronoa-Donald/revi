'use strict';

const fs = require('node:fs');
const path = require('node:path');

const ROOT = path.resolve(__dirname, '..', '..');

// 1. Inspect exports of server/courses.js
const coursesExport = require(path.join(ROOT, 'server', 'courses.js'));
const COURSES = coursesExport.COURSES || coursesExport;
console.log('--- EXPORT server/courses.js ---');
console.log('Type:', typeof coursesExport);
console.log('Keys in export:', Object.keys(coursesExport));
console.log('Total entries in COURSES:', Object.keys(COURSES).length);

// 2. Inspect exports of server/exercises/course-config.js
const courseConfigExport = require(path.join(ROOT, 'server', 'exercises', 'course-config.js'));
console.log('\n--- EXPORT server/exercises/course-config.js ---');
console.log('Type:', typeof courseConfigExport);
console.log('Keys count:', Object.keys(courseConfigExport).length);
console.log('Sample keys:', Object.keys(courseConfigExport).slice(0, 10));

// 3. Inspect listExercises() distribution per course
const { listExercises } = require(path.join(ROOT, 'server', 'exercises', 'index.js'));
const allExercises = listExercises();
console.log('\n--- EXERCISES IN CATALOGUE ---');
console.log('Total listExercises():', allExercises.length);

const exPerCourse = {};
allExercises.forEach(ex => {
  exPerCourse[ex.course] = (exPerCourse[ex.course] || 0) + 1;
});
console.log('Total courses with exercises:', Object.keys(exPerCourse).length);

// 4. Inspect filesystem HTML files recursively
function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  let list;
  try {
    list = fs.readdirSync(dir);
  } catch {
    return results;
  }
  for (const f of list) {
    if (f.startsWith('.') || f === 'node_modules' || f === 'dist' || f.startsWith('CONTRE_AUDIT') || f.startsWith('AUDIT_') || f.startsWith('REMEDIATION_') || f.startsWith('CONSOLIDATION_') || f.startsWith('FINALISATION_')) continue;
    const full = path.join(dir, f);
    try {
      const stat = fs.lstatSync(full);
      if (stat.isSymbolicLink()) continue;
      if (stat.isDirectory()) {
        results = results.concat(getHtmlFiles(full));
      } else if (f.endsWith('.html')) {
        results.push(full);
      }
    } catch {}
  }
  return results;
}

const allHtmlFiles = getHtmlFiles(ROOT);
console.log('\n--- HTML FILES IN WORKSPACE (excluding node_modules, dist, git, audits, deliveries) ---');
console.log('Total HTML files found:', allHtmlFiles.length);

// Also let us check how many HTML files are in the whole repository if we only exclude node_modules, dist, .git
function getRepoHtml(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  let list;
  try { list = fs.readdirSync(dir); } catch { return results; }
  for (const f of list) {
    if (f === 'node_modules' || f === 'dist' || f === '.git' || f === '.claude') continue;
    const full = path.join(dir, f);
    try {
      const stat = fs.lstatSync(full);
      if (stat.isSymbolicLink()) continue;
      if (stat.isDirectory()) {
        results = results.concat(getRepoHtml(full));
      } else if (f.endsWith('.html')) {
        results.push(full);
      }
    } catch {}
  }
  return results;
}

const allRepoHtml = getRepoHtml(ROOT);
console.log('Total HTML files in entire repo (including historical delivery folders):', allRepoHtml.length);

// Generated courses from server/content
const contentDir = path.join(ROOT, 'server', 'content');
const generatedCourseIds = new Set(
  fs.readdirSync(contentDir)
    .filter(f => f.endsWith('.js'))
    .map(f => {
      try {
        const mod = require(path.join(contentDir, f));
        return mod.id || f.replace('.js', '');
      } catch {
        return f.replace('.js', '');
      }
    })
);

console.log('Generated courses in server/content:', generatedCourseIds.size);

const manualCourses = new Set(['b1-python', 'b1-c-cpp', 'b1-algo', 'b1-php']);
const legacyDirs = new Set(['b1', 'cours windows', 'administration machine virtuel', 'roadmap', 'droitb2']);

// Categorize each workspace HTML file
const categories = {
  PAGE_GENERATED_CANONICAL: [],
  PAGE_MANUELLE: [],
  PAGE_STATIC_AUTH_ADMIN: [],
  PAGE_LEGACY_NON_CANONICAL: [],
  PAGE_SPECIAL_SECTIONS: [],
  PAGE_ROOT_STATIC: [],
  PAGE_OTHER: []
};

allHtmlFiles.forEach(f => {
  const rel = path.relative(ROOT, f);
  const parts = rel.split(path.sep);
  const topDir = parts[0];

  if (topDir === 'public') {
    categories.PAGE_STATIC_AUTH_ADMIN.push(rel);
  } else if (legacyDirs.has(topDir)) {
    categories.PAGE_LEGACY_NON_CANONICAL.push(rel);
  } else if (manualCourses.has(topDir)) {
    categories.PAGE_MANUELLE.push(rel);
  } else if (generatedCourseIds.has(topDir)) {
    categories.PAGE_GENERATED_CANONICAL.push(rel);
  } else if (['preparation-web', 'epreuves', 'b1-vb-excel'].includes(topDir)) {
    categories.PAGE_SPECIAL_SECTIONS.push(rel);
  } else if (parts.length === 1 && f.endsWith('.html')) {
    categories.PAGE_ROOT_STATIC.push(rel);
  } else {
    categories.PAGE_OTHER.push(rel);
  }
});

console.log('\n--- BREAKDOWN OF WORKSPACE HTML FILES ---');
console.log('PAGE_GENERATED_CANONICAL:', categories.PAGE_GENERATED_CANONICAL.length);
console.log('PAGE_MANUELLE (4 hand-written courses):', categories.PAGE_MANUELLE.length);
console.log('PAGE_STATIC_AUTH_ADMIN (public/):', categories.PAGE_STATIC_AUTH_ADMIN.length);
console.log('PAGE_SPECIAL_SECTIONS (preparation-web, epreuves, b1-vb-excel):', categories.PAGE_SPECIAL_SECTIONS.length);
console.log('PAGE_ROOT_STATIC (root index.html, etc.):', categories.PAGE_ROOT_STATIC.length);
console.log('PAGE_LEGACY_NON_CANONICAL:', categories.PAGE_LEGACY_NON_CANONICAL.length);
console.log('PAGE_OTHER:', categories.PAGE_OTHER.length, categories.PAGE_OTHER);
console.log('SUM WORKSPACE HTML:', Object.values(categories).reduce((a, b) => a + b.length, 0));

// Also count pages generated by generate-courses.js exactly
let totalRenderedPages = 0;
const kit = require(path.join(ROOT, 'scripts', 'course-kit.js'));
for (const file of fs.readdirSync(contentDir).filter(f => f.endsWith('.js'))) {
  try {
    const course = require(path.join(contentDir, file));
    if (typeof course.render === 'function') {
      const rendered = course.render(kit);
      totalRenderedPages += Object.keys(rendered).length;
    }
  } catch {}
}
console.log('\nTotal pages rendered by course.render(kit) across all server/content/*.js:', totalRenderedPages);

// Write to PREUVES
fs.writeFileSync(
  path.join(ROOT, 'CONTRE_AUDIT_AUDIT_GLOBAL', 'PREUVES', 'html_files_categorized.json'),
  JSON.stringify({
    summary: {
      generated_canonical: categories.PAGE_GENERATED_CANONICAL.length,
      manual_courses: categories.PAGE_MANUELLE.length,
      static_auth_admin: categories.PAGE_STATIC_AUTH_ADMIN.length,
      special_sections: categories.PAGE_SPECIAL_SECTIONS.length,
      root_static: categories.PAGE_ROOT_STATIC.length,
      legacy_non_canonical: categories.PAGE_LEGACY_NON_CANONICAL.length,
      other: categories.PAGE_OTHER.length,
      total_workspace_html: Object.values(categories).reduce((a, b) => a + b.length, 0),
      total_repo_html_with_audits: allRepoHtml.length,
      pages_rendered_by_course_kit: totalRenderedPages
    },
    categories
  }, null, 2),
  'utf8'
);
