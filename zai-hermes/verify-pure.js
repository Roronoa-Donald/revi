// Validation par exécution des fonctions pures (server/preparation-content via preparation.js copies + keygen + dates)
const ROOT = '/home/rd/Bureau/proba';
const path = require('path');
const { PROJECT_COUNT, VALIDATION_RULES, BEHAVIOR_RULES, SOLUTIONS } = require(ROOT + '/server/preparation-content.js');

console.log('PROJECT_COUNT =', PROJECT_COUNT, '| SOLUTIONS :', Object.keys(SOLUTIONS).length, 'entrées ->', Object.keys(SOLUTIONS).join(','));
console.log('VALIDATION_RULES :', Object.keys(VALIDATION_RULES).length, 'entrées | BEHAVIOR_RULES :', Object.keys(BEHAVIOR_RULES).length, 'entrées');

// ---- Copie fidèle des fonctions de preparation.js ----
function hasTag(html, tag) {
  return new RegExp(`<\\s*${tag}(\\s|>|/)`, 'i').test(html);
}
function hasExactClass(html, className) {
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    if (classes.includes(className)) return true;
  }
  return false;
}
function hasInputType(html, type) {
  return new RegExp(`<\\s*input[^>]*type\\s*=\\s*["']${type}["']`, 'i').test(html);
}
function hasJsName(js, name) {
  const escaped = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const patterns = [
    new RegExp(`\\b(function\\s+${escaped}|const\\s+${escaped}|let\\s+${escaped}|var\\s+${escaped})\\b`),
    new RegExp(`\\b${escaped}\\s*=\\s*(\\([^)]*\\)\\s*=>|function\\b)`)
  ];
  return patterns.some((pattern) => pattern.test(js));
}
function hasId(html, id) {
  return new RegExp(`id\\s*=\\s*["']${id}["']`, 'i').test(html);
}
function hasDataAttr(html, attr) {
  return new RegExp(`data-${attr}\\s*=`, 'i').test(html);
}
function countExactClass(html, className) {
  const classRegex = /class\s*=\s*["']([^"']+)["']/g;
  let count = 0;
  let match;
  while ((match = classRegex.exec(html)) !== null) {
    const classes = match[1].split(/\s+/).filter(Boolean);
    if (classes.includes(className)) count += 1;
  }
  return count;
}
function countSelector(html, selector) {
  const value = String(selector || '').trim();
  if (!value) return 0;
  if (value.startsWith('.')) return countExactClass(html, value.slice(1));
  if (value.startsWith('#')) return hasId(html, value.slice(1)) ? 1 : 0;
  if (/^[a-z][a-z0-9-]*$/i.test(value)) {
    const matches = html.match(new RegExp(`<\\s*${value}(\\s|>|/)`, 'gi'));
    return matches ? matches.length : 0;
  }
  return 0;
}
function testJsPattern(check, js) {
  if (!check || !check.pattern) return true;
  if (check.pattern instanceof RegExp) return check.pattern.test(js);
  return new RegExp(check.pattern, check.flags || 'i').test(js);
}
function validateBehaviorStatic(projectId, html, js) {
  const rules = BEHAVIOR_RULES[projectId];
  if (!rules) return [];
  const errors = [];
  for (const id of rules.htmlIds || []) if (!hasId(html, id)) errors.push(`#${id}`);
  for (const className of rules.htmlClasses || []) if (!hasExactClass(html, className)) errors.push(`classe ${className}`);
  for (const attr of rules.dataAttrs || []) if (!hasDataAttr(html, attr)) errors.push(`data-${attr}`);
  for (const check of rules.jsChecks || []) if (!testJsPattern(check, js)) errors.push(check.message || 'comportement JS');
  return errors;
}
function validateSubmission(projectId, htmlCode = '', jsCode = '') {
  const rules = VALIDATION_RULES[projectId];
  if (!rules) return ['Projet inconnu.'];
  const errors = [];
  const html = String(htmlCode || '');
  const js = String(jsCode || '');
  for (const tag of rules.htmlTags || []) if (!hasTag(html, tag)) errors.push(`<${tag}>`);
  for (const className of rules.classes || []) if (!hasExactClass(html, className)) errors.push(`classe ${className}`);
  for (const inputType of rules.inputTypes || []) if (!hasInputType(html, inputType)) errors.push(`input ${inputType}`);
  for (const attr of rules.dataAttrs || []) if (!hasDataAttr(html, attr)) errors.push(`data-${attr}`);
  for (const rule of rules.minElements || []) {
    const count = countSelector(html, rule.selector);
    if (count < Number(rule.count || 0)) errors.push(`min ${rule.selector}`);
  }
  for (const name of rules.jsNames || []) if (!hasJsName(js, name)) errors.push(`jsName ${name}`);
  errors.push(...validateBehaviorStatic(projectId, html, js));
  return errors;
}
function computeProjectXp({ usedHint, usedSolution, attempts }) {
  let xp = 50;
  if (!usedHint) xp += 10;
  if (!usedSolution) xp += 5;
  if ((Number(attempts) || 0) <= 1) xp += 5;
  if (usedSolution) xp -= 20;
  if ((Number(attempts) || 0) > 3) xp -= Math.min(10, (Number(attempts) - 3) * 2);
  return Math.max(20, xp);
}
function isProjectUnlocked(projectId, rows) {
  if (projectId === 1) return true;
  const done = new Set(rows.filter((row) => row.completed).map((row) => Number(row.project_id)));
  for (let id = 1; id < projectId; id += 1) {
    if (!done.has(id)) return false;
  }
  return true;
}
function quizXpOf(score, total) {
  return Math.round(Math.max(0, Math.min(score, total)) * 20 / Math.max(total, 1));
}

// ================= TESTS =================
console.log('\n=== XP PAR PROJET (computeProjectXp) ===');
const xpCases = [
  { usedHint: false, usedSolution: false, attempts: 0 },  // parfait  : 65
  { usedHint: false, usedSolution: false, attempts: 1 },  // 1 essai  : 65
  { usedHint: false, usedSolution: false, attempts: 2 },  // 60
  { usedHint: false, usedSolution: false, attempts: 4 },  // 58
  { usedHint: false, usedSolution: false, attempts: 8 },  // 50
  { usedHint: true,  usedSolution: false, attempts: 5 },  // 45
  { usedHint: false, usedSolution: true,  attempts: 1 },  // 50-5-20=40
  { usedHint: true,  usedSolution: true,  attempts: 0 },  // 50-20=30
  { usedHint: true,  usedSolution: true,  attempts: 99 }, // 50-20-10=20 (floor)
];
for (const c of xpCases) console.log(JSON.stringify(c).padEnd(52), '->', computeProjectXp(c));

console.log('\n=== PROJET 1 : isProjectUnlocked avec liste VIDE (première utilisation) ===');
console.log('liste vide, projet 1 :', isProjectUnlocked(1, []), '(attendu true)');
console.log('liste vide, projet 2 :', isProjectUnlocked(2, []), '(attendu false)');

console.log('\n=== REGEX hasTag : faux positif sur préfixe de balise ===');
console.log('hasTag("<section class=...>", "section") :', hasTag('<section class="x">', 'section'), '(attendu true)');
console.log('hasTag("<sectionx>") vs tag "section" :', hasTag('<sectionx>', 'section'), '(attendu false, préfixe)');
const sec = '<section class="hero">';
console.log('hasTag(section, "section") :', hasTag(sec, 'section'));

console.log('\n=== VALIDATION PROJET 1 : SOLUTION RÉELLE vs RÈGLES (auto-validation) ===');
// Prendre la solution officielle du projet 1 et la valider avec ses propres règles
for (const pid of Object.keys(SOLUTIONS).map(Number).sort((a, b) => a - b)) {
  const sol = SOLUTIONS[pid];
  const html = typeof sol === 'object' && sol !== null ? (sol.html || sol.htmlCode || '') : String(sol);
  const js = typeof sol === 'object' && sol !== null ? (sol.js || sol.jsCode || '') : '';
  const errs = validateSubmission(pid, html, js);
  console.log(`Projet ${pid} : solution officielle validée par ses règles -> ${errs.length === 0 ? 'OK' : 'ÉCHECS : ' + errs.join(' | ').slice(0, 200)}`);
}

console.log('\n=== QUIZ XP (formule ligne 553 preparation.js) ===');
for (const [s, t] of [[0, 10], [5, 10], [10, 10], [7, 0], [15, 10], [3.7, 10], [2.5, 3]]) {
  console.log(`score=${s}, total=${t} -> quizXp=${quizXpOf(s, t)}`);
}
console.log('\n=== DATE : expires_at création clé admin (admin.js ligne 157) vs default SQL ===');
const now = new Date();
const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);
console.log('30 jours en ms =', 30 * 24 * 60 * 60 * 1000, '→ expiration fixe (drift DST négligeable, mois réels 28-31j non gérés)');
console.log('createKey COALESCE SQL : CURRENT_TIMESTAMP + INTERVAL \'30 days\' — même sémantique 30x24h');
