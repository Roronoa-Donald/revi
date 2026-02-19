/**
 * Middleware de contrôle d'accès aux contenus protégés
 * Détermine quels fichiers nécessitent une clé d'activation
 */

// Liste des cours disponibles avec leurs noms d'affichage
const COURSES = {
  'linux': 'Administration Linux',
  'php': 'PHP',
  'probabilites': 'Probabilités',
  'rd_java': 'Java',
  'rd_winserver': 'Windows Server',
  'RD-RO': 'Recherche Opérationnelle',
  'sql': 'SQL',
  'csharp': 'C#'
};

const COURSE_ICONS = {
  'linux': '🐧',
  'php': '🐘',
  'probabilites': '🎲',
  'rd_java': '☕',
  'rd_winserver': '🖥️',
  'RD-RO': '📊',
  'sql': '🗃️',
  'csharp': '🔷'
};

// Thème visuel de chaque cours (couleurs + mode)
const COURSE_THEMES = {
  'linux':        { mode: 'dark',  accent: '#f97316', accentLight: '#fb923c', accentDark: '#ea580c', gradient: 'linear-gradient(135deg, #f97316, #ea580c)' },
  'php':          { mode: 'light', accent: '#2563eb', accentLight: '#60a5fa', accentDark: '#1e40af', gradient: 'linear-gradient(135deg, #2563eb, #1e40af)' },
  'probabilites': { mode: 'dark',  accent: '#6366f1', accentLight: '#818cf8', accentDark: '#4f46e5', gradient: 'linear-gradient(135deg, #6366f1, #a855f7)' },
  'rd_java':      { mode: 'light', accent: '#ef4444', accentLight: '#f87171', accentDark: '#dc2626', gradient: 'linear-gradient(135deg, #ef4444, #dc2626)' },
  'rd_winserver': { mode: 'light', accent: '#6b7280', accentLight: '#9ca3af', accentDark: '#4b5563', gradient: 'linear-gradient(135deg, #6b7280, #4b5563)' },
  'RD-RO':        { mode: 'dark',  accent: '#10b981', accentLight: '#34d399', accentDark: '#059669', gradient: 'linear-gradient(135deg, #10b981, #059669)' },
  'sql':          { mode: 'dark',  accent: '#2563eb', accentLight: '#60a5fa', accentDark: '#1e40af', gradient: 'linear-gradient(135deg, #2563eb, #1e40af)' },
  'csharp':       { mode: 'light', accent: '#C4A882', accentLight: '#D4B896', accentDark: '#A89070', gradient: 'linear-gradient(135deg, #C4A882, #A89070)' }
};

const COURSE_DIRS = Object.keys(COURSES);

/**
 * Détermine si une URL pointe vers du contenu protégé
 * Seul le chapitre 1 et l'index de chaque cours sont gratuits
 */
function isProtected(urlPath) {
  // Nettoyer l'URL
  const cleanUrl = urlPath.split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/').filter(Boolean);

  // Pas assez de segments → fichier racine → libre
  if (parts.length < 2) return false;

  const courseName = parts[0];

  // Pas un dossier de cours → libre
  if (!COURSE_DIRS.includes(courseName)) return false;

  // Assets toujours libres (CSS, JS, images)
  if (parts[1] === 'assets') return false;

  // index.html du cours → libre
  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;

  // Chapitre 1 → libre
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

  // Seuls les fichiers HTML sont protégés (pas les images, etc. dans les sous-dossiers)
  if (!cleanUrl.endsWith('.html')) return false;

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

module.exports = { isProtected, getCourseFromUrl, COURSES, COURSE_ICONS, COURSE_THEMES, COURSE_DIRS };
