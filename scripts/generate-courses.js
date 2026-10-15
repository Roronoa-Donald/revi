#!/usr/bin/env node
/**
 * scripts/generate-courses.js — écrit les pages d'un cours B1.
 *
 * Pourquoi un générateur : un cours compte quinze pages (accueil, sommaire,
 * atelier, chapitres, cartes, mémo, examen blanc, exercices) qui partagent la
 * même coquille. Recopier cette coquille à la main, c'est garantir qu'un jour
 * un chemin relatif ou une feuille de style manquera quelque part.
 *
 * Le contenu pédagogique reste, lui, dans `server/content/<cours>.js` : le
 * générateur ne fabrique aucun texte, il met en page.
 *
 * Usage :
 *   node scripts/generate-courses.js            applique
 *   node scripts/generate-courses.js --check    vérifie, ne modifie rien
 *   node scripts/generate-courses.js b1-sql     traite un seul cours
 */
const fs = require('fs');
const path = require('path');

const kit = require('./course-kit');
// Les chapitres portent aussi les ateliers : leur version finale est produite
// par le générateur d'ateliers, pour que page et atelier ne divergent jamais.
const labs = require('./generate-code-labs');

const ROOT = path.resolve(__dirname, '..');
const CONTENT = path.join(ROOT, 'server', 'content');

const CHECK = process.argv.includes('--check');
const ONLY = process.argv.slice(2).filter(arg => !arg.startsWith('--'));

const changes = [];
const problems = [];

function write(file, content) {
  if (CHECK) {
    if (!fs.existsSync(file) || fs.readFileSync(file, 'utf8') !== content) {
      problems.push(path.relative(ROOT, file));
    }
    return;
  }
  const current = fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
  if (current === content) return;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, 'utf8');
  changes.push(path.relative(ROOT, file));
}

if (!fs.existsSync(CONTENT)) {
  console.error('[!!] dossier de contenu introuvable : server/content');
  process.exit(1);
}

const modules = fs.readdirSync(CONTENT)
  .filter(file => file.endsWith('.js'))
  .sort();

let pages = 0;
let courses = 0;

for (const file of modules) {
  const course = require(path.join(CONTENT, file));

  if (ONLY.length && !ONLY.includes(course.id)) continue;

  for (const field of ['id', 'slug', 'brand', 'brandIcon', 'accent', 'accentDeep', 'accentSoft', 'accentBorder', 'storeKey', 'sources']) {
    if (!course[field]) problems.push(`${file} : champ « ${field} » manquant`);
  }
  if (!Array.isArray(course.chapters) || !course.chapters.length) {
    problems.push(`${file} : chapitres manquants`);
    continue;
  }

  courses++;

  const dir = path.join(ROOT, course.id);
  const rendered = course.render(kit);

  for (const [pagePath, definition] of Object.entries(rendered)) {
    let html = kit.page(course, pagePath, definition);
    const chapter = /^chapitres\/chapitre(\d+)\.html$/.exec(pagePath);
    if (chapter) {
      html = labs.finalizeChapter(html, course.id, Number(chapter[1]));
    } else {
      html = labs.finalizePage(html, kit.prefix(pagePath) + 'atelier.html');
    }
    write(path.join(dir, pagePath), html);
    pages++;
  }

  write(path.join(dir, 'assets', 'css', 'cours.css'), kit.renderCss(course));
  write(path.join(dir, 'assets', 'js', 'cours.js'), kit.renderJs(course));
}

if (CHECK) {
  if (problems.length) {
    console.error(`[!!] cours désynchronisés (${problems.length}) :`);
    for (const problem of problems) console.error(`     ${problem}`);
    process.exit(1);
  }
  console.log(`[ok] cours à jour (${pages} pages, ${courses} cours)`);
} else {
  console.log(`[ok] ${changes.length} fichier(s) écrit(s) — ${pages} pages, ${courses} cours`);
  for (const file of changes) console.log(`     ${file}`);
}

if (problems.length && !CHECK) {
  for (const problem of problems) console.error(`[!!] ${problem}`);
  process.exit(1);
}
