#!/usr/bin/env node
/**
 * Injection des ateliers de code dans les chapitres des cours à atelier.
 *
 * Pourquoi un générateur : les ateliers d'un cours partagent la même structure,
 * et la moindre divergence entre la fiche d'exercice (server/exercises) et la
 * page servie produirait un atelier injouable. Une source unique, un rendu
 * unique — pour tous les cours.
 *
 * Le cours et ses caractéristiques (dossier, nombre de chapitres, préfixe des
 * identifiants) viennent de `server/exercises/course-config.js` : ajouter un
 * cours se limite donc à y déclarer une entrée et à fournir son catalogue.
 *
 * Ce que le script fait, et refait à l'identique, pour chaque cours :
 *   1. retire le bloc déjà généré (repéré par ses marqueurs) ;
 *   2. régénère le bloc à partir du catalogue serveur ;
 *   3. renumérote les titres <h2> du chapitre pour rester cohérent ;
 *   4. garantit la présence de la feuille de style et du script de l'atelier ;
 *   5. ajoute le lien « Atelier » dans la navigation des pages du cours.
 *
 * Aucun test de correction n'est écrit ici : ils restent dans server/exercises.
 *
 * Usage :
 *   node scripts/generate-code-labs.js            applique
 *   node scripts/generate-code-labs.js --check    vérifie, ne modifie rien
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const START = '<!-- code-labs:start -->';
const END = '<!-- code-labs:end -->';

const CHECK = process.argv.includes('--check');

const CSS_LINK = '<link rel="stylesheet" href="/assets/css/code-lab.css">';
const SCRIPT_TAG = '<script src="/assets/js/code-lab.js" defer></script>';
const SPRITE = '/assets/img/ui-icons.svg';

const LEVELS = {
  n1: 'Niveau 1 — Acquisition',
  n2: 'Niveau 2 — Application',
  n3: 'Niveau 3 — Raisonnement',
  n4: 'Niveau 4 — Examen',
  n5: 'Niveau 5 — Challenge'
};

const exercises = require('../server/exercises');
const courseConfig = require('../server/exercises/course-config');
const { getLanguage } = require('../server/services/execution/languages');

// ========================
// Utilitaires de rendu
// ========================

function escText(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function escAttr(value) {
  return escText(value)
    .replace(/"/g, '&quot;')
    .replace(/\r?\n/g, '&#10;');
}

/** Contenu d'un <script type="text/plain"> : la seule séquence interdite est la balise de fermeture. */
function escRawText(value) {
  return String(value === undefined || value === null ? '' : value)
    .replace(/<\/(script)/gi, '<\\/$1');
}

function icon(name) {
  return '<svg class="ic" aria-hidden="true" focusable="false"><use href="' + SPRITE + '#i-' + name + '"></use></svg>';
}

function languageLabel(id) {
  const lang = getLanguage(id);
  return lang ? lang.label : String(id || '');
}

// ========================
// Bloc d'un atelier
// ========================

function renderLab(exercise, index) {
  const example = exercise.examples[0] || { stdin: '', expected: '' };
  const isAnalyse = exercise.language === 'analyse';

  const head =
    '  <div class="lab__head">\n' +
    '    <h3 class="lab__title">Exercice ' + (index + 1) + ' — ' + escText(exercise.title) + '</h3>\n' +
    '    <div class="lab__meta">\n' +
    '      <span class="lab__lang">' + icon(isAnalyse ? 'book' : 'terminal') + ' ' + escText(languageLabel(exercise.language)) + '</span>\n' +
    '      <span class="badge badge--' + exercise.level + '">' + LEVELS[exercise.level] + '</span>\n' +
    '    </div>\n' +
    '  </div>\n';

  const sample =
    '    <div class="lab__sample">\n' +
    '      <div class="lab__sample-part"><b>' + (isAnalyse ? 'Cas d’exemple' : 'Entrée du programme') + '</b><pre>' +
        escText(example.stdin === '' ? '(aucune)' : example.stdin) + '</pre></div>\n' +
    '      <div class="lab__sample-part"><b>' + (isAnalyse ? 'Résolution attendue' : 'Sortie attendue') + '</b><pre>' + escText(example.expected) + '</pre></div>\n' +
    '    </div>\n' +
    (example.note ? '    <p class="lab__note">' + escText(example.note) + '</p>\n' : '');

  const hints =
    '    <details class="lab__hints">\n' +
    '      <summary>' + icon('lightbulb') + ' Deux indices, rédigés en mots</summary>\n' +
    '      <ol>\n' +
    exercise.hints.map(hint => '        <li>' + escText(hint) + '</li>').join('\n') + '\n' +
    '      </ol>\n' +
    '    </details>\n';

  const body =
    '  <div class="lab__body">\n' +
    '    <p class="lab__goal"><strong>Objectif :</strong> ' + escText(exercise.goal) + '</p>\n' +
    '    <div class="lab__brief">' + exercise.brief + '</div>\n' +
    sample +
    hints +
    '  </div>\n';

  return (
    '<div class="lab" data-lab\n' +
    '     data-exercise="' + escAttr(exercise.id) + '"\n' +
    '     data-language="' + escAttr(exercise.language) + '"\n' +
    '     data-height="300"\n' +
    '     data-stdin="' + escAttr(example.stdin) + '">\n' +
    '  <script type="text/plain" data-lab-starter>' + escRawText(exercise.starter) + '</script>\n' +
    head +
    body +
    '</div>\n'
  );
}

function renderSection(courseId, chapter) {
  const list = exercises.listExercises()
    .filter(exercise => exercise.course === courseId && exercise.chapter === chapter)
    .sort((a, b) => a.id.localeCompare(b.id));

  const allAnalyse = list.length > 0 && list.every(exercise => exercise.language === 'analyse');

  const intro = allAnalyse
    ? '  <p class="lead">Ces trois études de cas se réalisent directement dans la page. Complétez chaque grille d’analyse à partir des données du cas, puis lancez la validation pour vérifier vos réponses critère par critère.</p>\n' +
      '  <p>En cas d’hésitation, le bouton <strong>Expliquer mon erreur</strong> sollicite le tuteur pédagogique pour vous guider dans l’application de la méthodologie sans donner directement la solution.</p>\n'
    : '  <p class="lead">Ces trois exercices se font dans la page. L’éditeur du navigateur exécute votre code\n' +
      '  sur un service distant, puis la validation fait tourner des tests que vous ne voyez pas :\n' +
      '  réussir l’exemple affiché ne suffit donc pas, il faut traiter le cas général.</p>\n' +
      '  <p>En cas d’erreur, le bouton <strong>Expliquer mon erreur</strong> interroge le tuteur : il décrit ce qui\n' +
      '  s’est passé et par où chercher, sans jamais écrire de code à votre place — c’est le principe de l’exercice.</p>\n';

  return (
    START + '\n' +
    // Numéro de remplissage : la renumérotation du chapitre le réécrit.
    (allAnalyse ? '  <h2>0. Études de cas &amp; applications pratiques</h2>\n' : '  <h2>0. Exercices de code</h2>\n') +
    intro +
    list.map((exercise, index) => renderLab(exercise, index)).join('\n') +
    '  ' + END + '\n'
  );
}

// ========================
// Transformation d'un chapitre
// ========================

// Le remplacement conserve exactement l'espacement produit par l'insertion,
// sinon chaque passage retirerait un saut de ligne et le fichier ne
// convergerait qu'après plusieurs exécutions.
function stripGenerated(html) {
  const pattern = new RegExp('\\n?[ \\t]*' + START + '[\\s\\S]*?' + END + '\\n?', 'g');
  return html.replace(pattern, '\n');
}

function renumber(html) {
  let counter = 0;
  return html.replace(/<h2>(\d+)\.\s/g, () => '<h2>' + (++counter) + '. ');
}

function ensureAssets(html) {
  if (!html.includes(CSS_LINK)) {
    html = html.replace('</head>', '  ' + CSS_LINK + '\n</head>');
  }
  if (!html.includes(SCRIPT_TAG)) {
    html = html.replace('</body>', SCRIPT_TAG + '\n</body>');
  }
  return html;
}

function transformChapter(html, courseId, chapter) {
  let out = stripGenerated(html);

  // Un cours sans catalogue d'exercices (matière non exécutable, atelier
  // remplacé par un simulateur dédié) garde ses chapitres tels quels : les
  // numéros de sections restent ceux écrits par le kit.
  const hasExercises = exercises.listExercises()
    .some(exercise => exercise.course === courseId);
  if (!hasExercises) {
    return ensureAssets(out);
  }

  // Réinstallation juste avant le QCM : la pratique vient après la théorie
  // du chapitre et avant l'évaluation.
  const anchor = /  <h2>\d+\.\s*QCM/;
  if (!anchor.test(out)) {
    throw new Error(`${courseId}/${chapter} : ancre QCM introuvable`);
  }
  out = out.replace(anchor, match => renderSection(courseId, chapter) + match);

  out = renumber(out);
  out = ensureAssets(out);
  return out;
}

// ========================
// Navigation
// ========================

function ensureAtelierLink(html, href, label) {
  if (/href="[^"]*atelier\.html"/.test(html)) return html;
  // Le lien suit « Exercices » quand il existe, sinon il suit « Sommaire ».
  const afterExercices = /(<a href="[^"]*exercices\/exercices\.html">Exercices<\/a>)/;
  if (afterExercices.test(html)) {
    return html.replace(afterExercices, '$1\n    <a href="' + href + '">' + label + '</a>');
  }
  const afterSommaire = /(<a href="[^"]*sommaire\.html">Sommaire<\/a>)/;
  if (afterSommaire.test(html)) {
    return html.replace(afterSommaire, '$1\n    <a href="' + href + '">' + label + '</a>');
  }
  return html;
}

/**
 * Version finale d'un chapitre : blocs d'ateliers régénérés, ressources
 * assurées, lien « Atelier » présent. C'est le seul rendu légitime d'un
 * chapitre — `scripts/generate-courses.js` l'utilise pour que la génération des
 * pages et l'injection des ateliers ne fassent qu'un seul pipeline.
 */
function finalizeChapter(html, courseId, chapter) {
  return ensureAtelierLink(transformChapter(html, courseId, chapter), '../atelier.html', 'Atelier');
}

/** Version finale d'une page transverse du cours. */
function finalizePage(html, href) {
  return ensureAssets(ensureAtelierLink(html, href, 'Atelier'));
}

// Pages transverses : même liste pour tous les cours (elles portent les mêmes
// noms de fichiers). « atelier.html » est à la racine du cours, les autres
// peuvent être dans un sous-dossier.
const EXTRA_PAGES = [
  ['index.html', 'atelier.html'],
  ['sommaire.html', 'atelier.html'],
  ['chapitres/cartes.html', '../atelier.html'],
  ['chapitres/formules.html', '../atelier.html'],
  ['chapitres/simulateur-examen.html', '../atelier.html'],
  ['exercices/exercices.html', '../atelier.html'],
  ['atelier.html', 'atelier.html']
];

// ========================
// Exécution (ligne de commande uniquement)
// ========================

if (require.main === module) {
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
  fs.writeFileSync(file, content, 'utf8');
  changes.push(path.relative(ROOT, file));
}

let total = 0;
let processedCourses = 0;

for (const [courseId, config] of Object.entries(courseConfig)) {
  const courseDir = path.join(ROOT, config.dir);
  const chapterDir = path.join(courseDir, config.chapterDir);

  if (!fs.existsSync(courseDir)) {
    problems.push(`${courseId} : dossier introuvable (${config.dir})`);
    continue;
  }
  processedCourses++;

  // 1. Chapitres
  for (let chapter = 1; chapter <= config.chapters; chapter++) {
    const file = path.join(chapterDir, `chapitre${chapter}.html`);
    if (!fs.existsSync(file)) {
      problems.push(`${config.dir}/chapitre${chapter}.html introuvable`);
      continue;
    }
    const html = fs.readFileSync(file, 'utf8');
    let out = transformChapter(html, courseId, chapter);
    out = ensureAtelierLink(out, '../atelier.html', 'Atelier');
    write(file, out);
  }

  // 2. Navigation et ressources des autres pages du cours (l'atelier inclus :
  //    sans son script, la page afficherait un cadre mort).
  for (const [relative, href] of EXTRA_PAGES) {
    const file = path.join(courseDir, relative);
    if (!fs.existsSync(file)) continue;
    const html = fs.readFileSync(file, 'utf8');
    write(file, ensureAssets(ensureAtelierLink(html, href, 'Atelier')));
  }

  total += exercises.listExercises().filter(exercise => exercise.course === courseId).length;
}

// ========================
// Bilan
// ========================

if (CHECK) {
  if (problems.length) {
    console.error(`[!!] ateliers désynchronisés (${problems.length}) :`);
    for (const file of problems) console.error(`     ${file}`);
    process.exit(1);
  }
  console.log(`[ok] ateliers à jour (${total} exercices, ${processedCourses} cours)`);
} else {
  console.log(`[ok] ${changes.length} fichier(s) mis à jour — ${total} exercices sur ${processedCourses} cours`);
  for (const file of changes) console.log(`     ${file}`);
}

if (problems.length && !CHECK) {
  for (const problem of problems) console.error(`[!!] ${problem}`);
  process.exit(1);
}
}

module.exports = {
  transformChapter,
  ensureAssets,
  ensureAtelierLink,
  finalizeChapter,
  finalizePage,
  renderSection,
  START,
  END
};
