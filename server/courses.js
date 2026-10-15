'use strict';

/**
 * ════════════════════════════════════════════════════════════════════════════
 *  REGISTRE CANONIQUE DES COURS — SOURCE DE VÉRITÉ UNIQUE
 * ════════════════════════════════════════════════════════════════════════════
 *
 * Toute la plateforme (serveur Node, edge Vercel, build statique, client) doit
 * refléter cette liste. Les blocs dupliqués (middleware.js, public/js/auth-check.js)
 * sont GÉNÉRÉS depuis ce fichier par `node scripts/sync-courses.js` et vérifiés par
 * `node scripts/check-course-sync.js`.
 *
 * Un cours = { name, level, icon, theme }.
 *   level : 'b1' | 'b2' | 'b3'  (règle d'accès hiérarchique : B1 ⊂ B2 ⊂ B3)
 *   theme : { mode, accent, accentLight, accentDark, gradient }
 *
 * Niveaux :
 *   - B2 = les cours historiques servis à la racine.
 *   - B1 = les 24 modules de « cours B1 IT » (dossiers racine b1-*).
 *   - B3 = les 23 modules de « COURS_B3 » / spécialité Réseaux & SI (b3-*).
 */

const LEVEL_RANK = { b1: 1, b2: 2, b3: 3 };
const LEVELS = ['b1', 'b2', 'b3'];

const LEVEL_LABELS = {
  b1: 'Licence 1',
  b2: 'Licence 2',
  b3: 'Licence 3'
};

function theme(mode, accent, accentLight, accentDark, gradient) {
  return {
    mode,
    accent,
    accentLight,
    accentDark,
    gradient: gradient || `linear-gradient(135deg, ${accent}, ${accentDark})`
  };
}

const T = theme;

const COURSES = {
  // ─────────────────────────── B2 — cours historiques ───────────────────────────
  'linux':        { name: 'Administration Linux',            level: 'b2', icon: 'terminal', theme: T('dark',  '#f97316', '#fb923c', '#ea580c', 'linear-gradient(135deg, #f97316, #ea580c)') },
  'php':          { name: 'PHP',                             level: 'b2', icon: 'code', theme: T('light', '#2563eb', '#60a5fa', '#1e40af', 'linear-gradient(135deg, #2563eb, #1e40af)') },
  'probabilites': { name: 'Probabilités',                    level: 'b2', icon: 'chart', theme: T('dark',  '#6366f1', '#818cf8', '#4f46e5', 'linear-gradient(135deg, #6366f1, #a855f7)') },
  'rd_java':      { name: 'Java',                            level: 'b2', icon: 'code', theme: T('light', '#ef4444', '#f87171', '#dc2626', 'linear-gradient(135deg, #ef4444, #dc2626)') },
  'rd_winserver': { name: 'Windows Server',                  level: 'b2', icon: 'cpu', theme: T('light', '#6366f1', '#818cf8', '#4f46e5', 'linear-gradient(135deg, #6366f1, #4f46e5)') },
  'admin-vm':     { name: 'Administration des Machines Virtuelles', level: 'b2', icon: 'blocks', theme: T('light', '#0ea5e9', '#38bdf8', '#0284c7', 'linear-gradient(135deg, #0ea5e9, #0284c7)') },
  'droit':        { name: 'Droit Informatique',              level: 'b2', icon: 'scale', theme: T('light', '#b45309', '#f59e0b', '#92400e', 'linear-gradient(135deg, #b45309, #92400e)') },
  'react':        { name: 'React',                           level: 'b2', icon: 'code', theme: T('light', '#087ea4', '#38bdf8', '#0c4a6e', 'linear-gradient(135deg, #087ea4, #0c4a6e)') },
  'api-rest-flask': { name: 'API REST avec Flask',           level: 'b2', icon: 'code', theme: T('light', '#047857', '#10b981', '#065f46', 'linear-gradient(135deg, #047857, #065f46)') },
  'erp-si':       { name: 'ERP & SI',                        level: 'b2', icon: 'blocks', theme: T('light', '#c2410c', '#fb923c', '#9a3412', 'linear-gradient(135deg, #c2410c, #9a3412)') },
  'ingenierie-besoin': { name: 'Ingénierie du besoin',       level: 'b2', icon: 'clipboard', theme: T('light', '#7c3aed', '#a78bfa', '#6d28d9', 'linear-gradient(135deg, #7c3aed, #6d28d9)') },
  'masterclass-apprendre': { name: 'Masterclass Apprendre a apprendre', level: 'b2', icon: 'graduation', theme: T('light', '#be185d', '#f472b6', '#9d174d', 'linear-gradient(135deg, #be185d, #9d174d)') },
  'RD-RO':        { name: 'Recherche Opérationnelle',        level: 'b2', icon: 'chart', theme: T('light', '#0f766e', '#14b8a6', '#115e59', 'linear-gradient(135deg, #0f766e, #115e59)') },
  'assembleur':   { name: 'Assembleur',                      level: 'b2', icon: 'cpu', theme: T('light', '#c2410c', '#fb923c', '#9a3412', 'linear-gradient(135deg, #c2410c, #9a3412)') },
  'Cyber securite B2': { name: 'Cybersecurite B2',           level: 'b2', icon: 'shield', theme: T('light', '#0e7490', '#38bdf8', '#155e75', 'linear-gradient(135deg, #0e7490, #155e75)') },
  'sql':          { name: 'SQL',                             level: 'b2', icon: 'database', theme: T('light', '#1d4ed8', '#3b82f6', '#1e40af', 'linear-gradient(135deg, #1d4ed8, #1e40af)') },
  'csharp':       { name: 'C#',                              level: 'b2', icon: 'code', theme: T('light', '#7e22ce', '#a855f7', '#6b21a8', 'linear-gradient(135deg, #7e22ce, #6b21a8)') },
  'ccna':         { name: 'CCNA Réseau',                     level: 'b2', icon: 'globe', theme: T('light', '#0369a1', '#38bdf8', '#075985', 'linear-gradient(135deg, #0369a1, #075985)') },
  'uml':          { name: 'UML',                             level: 'b2', icon: 'layers', theme: T('light', '#a21caf', '#f472b6', '#86198f', 'linear-gradient(135deg, #a21caf, #86198f)') },
  'uiux':         { name: 'UI/UX Design',                    level: 'b2', icon: 'palette', theme: T('light', '#0f766e', '#2dd4bf', '#115e59', 'linear-gradient(135deg, #0f766e, #115e59)') },
  'docker':       { name: 'Docker',                          level: 'b2', icon: 'blocks', theme: T('light', '#0369a1', '#38bdf8', '#075985', 'linear-gradient(135deg, #0369a1, #075985)') },
  'infographie':  { name: 'Infographie',                     level: 'b2', icon: 'image', theme: T('light', '#be123c', '#fb7185', '#9f1239', 'linear-gradient(135deg, #be123c, #9f1239)') },
  'preparation-web': { name: 'Preparation Web',              level: 'b2', icon: 'code', theme: T('dark',  '#34d399', '#a7f3d0', '#047857', 'linear-gradient(135deg, #111827, #047857, #22d3ee)') },
  'epreuves':     { name: 'Épreuves Passées',                level: 'b2', icon: 'file', theme: T('light', '#f59e0b', '#fbbf24', '#d97706', 'linear-gradient(135deg, #f59e0b, #d97706)') },

  // ─────────────────────── B1 — modules de « cours B1 IT » ───────────────────────
  'b1-admin-windows':   { name: 'Administration Windows',                    level: 'b1', icon: 'cpu', theme: T('light', '#0369a1', '#38bdf8', '#075985') },
  'b1-algebre':         { name: 'Algèbre linéaire',                          level: 'b1', icon: 'calculator', theme: T('light', '#6366f1', '#818cf8', '#4f46e5') },
  'b1-algo':            { name: 'Algorithmique',                             level: 'b1', icon: 'code', theme: T('light', '#2563eb', '#60a5fa', '#1e40af') },
  'b1-anglais':         { name: 'Anglais des affaires',                      level: 'b1', icon: 'book', theme: T('light', '#ef4444', '#f87171', '#dc2626') },
  'b1-reseaux':         { name: 'Architecture des réseaux',                  level: 'b1', icon: 'globe', theme: T('light', '#0e7490', '#67e8f9', '#155e75') },
  'b1-bureautique':     { name: 'Bureautique',                               level: 'b1', icon: 'chart', theme: T('light', '#b45309', '#fcd34d', '#92400e') },
  'b1-ccna1':           { name: 'CCNA 1',                                    level: 'b1', icon: 'globe', theme: T('light', '#0e7490', '#67e8f9', '#155e75') },
  'b1-architecture':    { name: "Circuit logique & architecture des ordinateurs", level: 'b1', icon: 'cpu', theme: T('light', '#7c3aed', '#a78bfa', '#5b21b6') },
  'b1-robotique':       { name: 'Club de robotique',                         level: 'b1', icon: 'blocks', theme: T('light', '#f97316', '#fb923c', '#ea580c') },
  'b1-cyber':           { name: 'Cybersécurité',                             level: 'b1', icon: 'shield', theme: T('light', '#0d9488', '#2dd4bf', '#0f766e') },
  'b1-droit':           { name: 'Droit',                                     level: 'b1', icon: 'scale', theme: T('light', '#b45309', '#f59e0b', '#92400e') },
  'b1-fr-pro':          { name: 'Français professionnel',                    level: 'b1', icon: 'book', theme: T('light', '#2563eb', '#60a5fa', '#1e40af') },
  'b1-git':             { name: 'Git',                                       level: 'b1', icon: 'code', theme: T('light', '#ea580c', '#fb923c', '#c2410c') },
  'b1-c-cpp':           { name: 'Langage C & C++',                           level: 'b1', icon: 'code', theme: T('light', '#1d4ed8', '#60a5fa', '#1e3a8a') },
  'b1-linux':           { name: 'Linux',                                     level: 'b1', icon: 'terminal', theme: T('light', '#f97316', '#fb923c', '#ea580c') },
  'b1-merise':          { name: 'Modélisation (MERISE)',                     level: 'b1', icon: 'database', theme: T('light', '#0f766e', '#2dd4bf', '#115e59') },
  'b1-php':             { name: 'PHP',                                       level: 'b1', icon: 'code', theme: T('light', '#6366f1', '#818cf8', '#4f46e5') },
  'b1-prog-web':        { name: 'Programmation Web',                         level: 'b1', icon: 'code', theme: T('light', '#0284c7', '#38bdf8', '#075985') },
  'b1-projet':          { name: 'Projet',                                    level: 'b1', icon: 'folder', theme: T('light', '#64748b', '#94a3b8', '#475569') },
  'b1-python':          { name: 'Python',                                    level: 'b1', icon: 'code', theme: T('light', '#3776ab', '#60a5fa', '#2b5d8a') },
  'b1-sql':             { name: 'SQL',                                       level: 'b1', icon: 'database', theme: T('light', '#2563eb', '#60a5fa', '#1e40af') },
  'b1-stats':           { name: 'Statistique descriptive',                   level: 'b1', icon: 'chart', theme: T('light', '#059669', '#34d399', '#047857') },
  'b1-vb-excel':        { name: 'VB Excel',                                  level: 'b1', icon: 'chart', theme: T('light', '#217346', '#34d399', '#166534') },
  'b1-virtualisation':  { name: 'Virtualisation des serveurs',               level: 'b1', icon: 'vm', theme: T('light', '#0e7490', '#22d3ee', '#155e75') },

  // ───────────── B3 — « COURS_B3 » spécialité Réseaux & SI ─────────────
  // Semestre I
  'b3-algo':            { name: 'Algorithmique',                             level: 'b3', icon: 'code', theme: T('light', '#1d4ed8', '#3b82f6', '#1e40af', 'linear-gradient(135deg, #1d4ed8, #1e40af)') },
  'b3-cloud-computing': { name: 'Cloud Computing',                           level: 'b3', icon: 'cloud', theme: T('light', '#0284c7', '#38bdf8', '#075985', 'linear-gradient(135deg, #0284c7, #075985)') },
  'b3-devops':          { name: 'DevOps',                                    level: 'b3', icon: 'layers', theme: T('light', '#0e7490', '#22d3ee', '#155e75', 'linear-gradient(135deg, #0e7490, #155e75)') },
  'b3-document-technique': { name: 'Document technique',                     level: 'b3', icon: 'file', theme: T('light', '#334155', '#64748b', '#1e293b', 'linear-gradient(135deg, #334155, #1e293b)') },
  'b3-etude-quantitative': { name: 'Étude quantitative & qualitative',       level: 'b3', icon: 'chart', theme: T('light', '#047857', '#10b981', '#064e3b', 'linear-gradient(135deg, #047857, #064e3b)') },
  'b3-firewall':        { name: 'Firewall',                                  level: 'b3', icon: 'shield', theme: T('light', '#b91c1c', '#ef4444', '#7f1d1d', 'linear-gradient(135deg, #b91c1c, #7f1d1d)') },
  'b3-github':          { name: 'Git & GitHub',                              level: 'b3', icon: 'code', theme: T('light', '#c2410c', '#ea580c', '#9a3412', 'linear-gradient(135deg, #c2410c, #9a3412)') },
  'b3-linux':          { name: 'Linux Avancé',                               level: 'b3', icon: 'terminal', theme: T('light', '#b45309', '#d97706', '#78350f', 'linear-gradient(135deg, #b45309, #78350f)') },
  'b3-agile':          { name: 'Méthodes agiles',                            level: 'b3', icon: 'layers', theme: T('light', '#6d28d9', '#8b5cf6', '#4c1d95', 'linear-gradient(135deg, #6d28d9, #4c1d95)') },
  'b3-pfsense':        { name: 'pfSense & Routage',                          level: 'b3', icon: 'shield', theme: T('light', '#0f766e', '#14b8a6', '#134e4a', 'linear-gradient(135deg, #0f766e, #134e4a)') },
  'b3-reseau-lan':     { name: 'Réseau LAN Avancé',                         level: 'b3', icon: 'globe', theme: T('light', '#4338ca', '#6366f1', '#312e81', 'linear-gradient(135deg, #4338ca, #312e81)') },
  'b3-sql':            { name: 'SQL Avancé',                                level: 'b3', icon: 'database', theme: T('light', '#1e40af', '#3b82f6', '#172554', 'linear-gradient(135deg, #1e40af, #172554)') },
  'b3-veille':         { name: 'Veille technologique & Innovation',          level: 'b3', icon: 'search', theme: T('light', '#0e7490', '#06b6d4', '#164e63', 'linear-gradient(135deg, #0e7490, #164e63)') },
  'b3-windows-server': { name: 'Windows Server',                             level: 'b3', icon: 'cpu', theme: T('light', '#3730a3', '#6366f1', '#1e1b4b', 'linear-gradient(135deg, #3730a3, #1e1b4b)') },
  // Semestre II
  'b3-anglais':        { name: 'Anglais',                                    level: 'b3', icon: 'book', theme: T('light', '#991b1b', '#dc2626', '#7f1d1d', 'linear-gradient(135deg, #991b1b, #7f1d1d)') },
  'b3-cloud-azure':    { name: 'Cloud Azure',                                level: 'b3', icon: 'cloud', theme: T('light', '#0078d4', '#0284c7', '#004578', 'linear-gradient(135deg, #0078d4, #004578)') },
  'b3-cryptographie':  { name: 'Cryptographie & PKI',                         level: 'b3', icon: 'lock', theme: T('light', '#5b21b6', '#7c3aed', '#3b0764', 'linear-gradient(135deg, #5b21b6, #3b0764)') },
  'b3-google-cloud':   { name: 'Google Cloud Platform',                      level: 'b3', icon: 'cloud', theme: T('light', '#1a73e8', '#3b82f6', '#174ea6', 'linear-gradient(135deg, #1a73e8, #174ea6)') },
  'b3-hacking':        { name: 'Hacking éthique',                            level: 'b3', icon: 'shield', theme: T('light', '#065f46', '#059669', '#022c22', 'linear-gradient(135deg, #065f46, #022c22)') },
  'b3-cloud-aws':      { name: 'Services Cloud AWS',                         level: 'b3', icon: 'cloud', theme: T('light', '#c2410c', '#ea580c', '#7c2d12', 'linear-gradient(135deg, #c2410c, #7c2d12)') },
  'b3-supervision':    { name: 'Supervision',                                level: 'b3', icon: 'chart', theme: T('light', '#0f766e', '#14b8a6', '#042f2e', 'linear-gradient(135deg, #0f766e, #042f2e)') },
  'b3-voip':           { name: 'Téléphonie VoIP',                            level: 'b3', icon: 'phone', theme: T('light', '#0e7490', '#06b6d4', '#164e63', 'linear-gradient(135deg, #0e7490, #164e63)') },
  'b3-virtualisation': { name: 'Virtualisation Avancée',                     level: 'b3', icon: 'vm', theme: T('light', '#0369a1', '#38bdf8', '#0c4a6e', 'linear-gradient(135deg, #0369a1, #0c4a6e)') }
};

const COURSE_DIRS = Object.keys(COURSES);

// Cartes dérivées (compat avec les exports historiques d'access-control.js)
const COURSE_ICONS = {};
const COURSE_THEMES = {};
for (const id of COURSE_DIRS) {
  COURSE_ICONS[id] = COURSES[id].icon;
  if (COURSES[id].theme) COURSE_THEMES[id] = COURSES[id].theme;
}

function getCourseLevel(courseId) {
  const c = COURSES[courseId];
  return c ? c.level : null;
}

function normalizeLevel(level) {
  const v = String(level || '').toLowerCase().trim();
  return LEVELS.includes(v) ? v : null;
}

/**
 * Décision d'accès hiérarchique : un compte de niveau `userLevel` peut-il
 * accéder au cours `courseId` ?  B1 ⊂ B2 ⊂ B3.
 * Un cours inconnu ou un niveau inconnu → refus (fail-closed).
 */
function canAccessCourse(userLevel, courseId) {
  const u = normalizeLevel(userLevel);
  const level = getCourseLevel(courseId);
  if (!u || !level) return false;
  return LEVEL_RANK[u] >= LEVEL_RANK[level];
}

/**
 * Liste des ids de cours visibles par un niveau donné.
 */
function coursesForLevel(userLevel) {
  const u = normalizeLevel(userLevel);
  if (!u) return [];
  return COURSE_DIRS.filter((id) => canAccessCourse(u, id));
}

module.exports = {
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
};
