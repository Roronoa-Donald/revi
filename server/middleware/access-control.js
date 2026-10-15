/**
 * Middleware de contrôle d'accès aux contenus protégés
 * Détermine quels fichiers nécessitent une clé d'activation
 *
 *  La liste canonique des cours vit dans `server/courses.js` (source de vérité unique).
 *    Ce fichier ne fait que dériver les exports historiques + la logique de protection.
 *    Toute modification de cours doit être faite dans server/courses.js, puis
 *    `node scripts/sync-courses.js` propage les listes dupliquées.
 */

const registry = require('../courses');

const {
  COURSES,
  COURSE_DIRS,
  COURSE_ICONS,
  COURSE_THEMES,
  LEVELS,
  LEVEL_RANK,
  LEVEL_LABELS,
  getCourseLevel,
  normalizeLevel,
  canAccessCourse,
  coursesForLevel
} = registry;

/**
 * Détermine si une URL pointe vers du contenu protégé
 * Seul le chapitre 1 et l'index de chaque cours sont gratuits
 */
function isProtected(urlPath) {
  // Nettoyer l'URL
  const cleanUrl = urlPath.split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/').filter(Boolean);

  // Pas assez de segments → fichier racine → libre
  if (parts.length < 1) return false;

  const courseName = parts[0];

  // Pas un dossier de cours → libre
  if (!COURSE_DIRS.includes(courseName)) return false;

  if (parts.length < 2) {
    return courseName === 'epreuves' || courseName === 'preparation-web';
  }

  // Épreuves passées → tout protégé (y compris index et PDF)
  if (courseName === 'epreuves') return true;

  // Preparation Web: cle B2 + mot de passe de section. Les assets restent libres.
  if (courseName === 'preparation-web') {
    if (parts[1] === 'assets') return false;
    return true;
  }

  const filename = parts[parts.length - 1] || '';
  const isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
  if (isQcmData) return true;

  // Assets toujours libres (CSS, JS, images) sauf PDF
  if (parts[1] === 'assets') return cleanUrl.endsWith('.pdf');

  // index.html ou sommaire.html du cours → libre
  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === 'sommaire.html' || parts[1] === '')) return false;

  // Chapitre 1 → libre (que ce soit dans /chapitres/chapitre1.html ou /chapitre1.html)
  if (parts.length === 2 && parts[1] === 'chapitre1.html') return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

  // Seuls les fichiers HTML et PDF sont protégés (pas les images, etc. dans les sous-dossiers)
  if (!cleanUrl.endsWith('.html') && !cleanUrl.endsWith('.pdf')) return false;

  // Tout le reste dans un cours est protégé :
  // - chapitres 2+
  // - formules, cartes, simulateur-examen
  // - exercices
  // - qcm, etc.
  return true;
}

/**
 * Extrait le nom du cours depuis l'URL
 */
function getCourseFromUrl(urlPath) {
  const parts = urlPath.split('/').filter(Boolean);
  if (parts.length >= 1 && COURSE_DIRS.includes(parts[0])) {
    return parts[0];
  }
  return null;
}

/**
 * Niveau requis pour l'URL donnée (null si hors cours canonique).
 */
function getCourseLevelFromUrl(urlPath) {
  const course = getCourseFromUrl(urlPath);
  return course ? getCourseLevel(course) : null;
}

module.exports = {
  isProtected,
  getCourseFromUrl,
  getCourseLevelFromUrl,
  COURSES,
  COURSE_ICONS,
  COURSE_THEMES,
  COURSE_DIRS,
  LEVELS,
  LEVEL_RANK,
  LEVEL_LABELS,
  getCourseLevel,
  normalizeLevel,
  canAccessCourse,
  coursesForLevel
};
