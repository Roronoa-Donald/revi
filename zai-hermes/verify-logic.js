// Vérification : isProtected Node vs Edge vs client + synchro des listes de cours
const fs = require('fs');
const ROOT = '/home/rd/Bureau/proba';

const acSrc = fs.readFileSync(ROOT + '/server/middleware/access-control.js', 'utf8');
const mwSrc = fs.readFileSync(ROOT + '/middleware.js', 'utf8');
const chkSrc = fs.readFileSync(ROOT + '/public/js/auth-check.js', 'utf8');
const buildSrc = fs.readFileSync(ROOT + '/scripts/build.js', 'utf8');
void acSrc; void chkSrc;

function extractArrayAfter(src, marker) {
  const idx = src.indexOf(marker);
  if (idx === -1) return null;
  const start = src.indexOf('[', idx);
  if (start === -1) return null;
  let depth = 0, end = -1;
  for (let i = start; i < src.length; i++) {
    if (src[i] === '[') depth++;
    else if (src[i] === ']') { depth--; if (depth === 0) { end = i; break; } }
  }
  if (end === -1) return null;
  return eval(src.slice(start, end + 1));
}

const edgeDirs = extractArrayAfter(mwSrc, 'const COURSE_DIRS');
const buildDirs = extractArrayAfter(buildSrc, 'const COURSE_DIRS');
const chkDirs = extractArrayAfter(chkSrc, 'var COURSE_DIRS');

const acModule = require(ROOT + '/server/middleware/access-control.js');
const canonical = Object.keys(acModule.COURSES);

const sameList = (a, b) => a.length === b.length && a.every((x, i) => a[i] === b[i]);
const sameSet = (a, b) => a.length === b.length && a.every(x => b.includes(x));
const diff = (a, b) => ({ onlyInA: a.filter(c => !b.includes(c)), onlyInB: b.filter(c => !a.includes(c)) });

console.log('=== SYNCHRO DES LISTES DE COURS ===');
console.log('canonique (access-control COURSES) :', canonical.length);
console.log('Edge middleware.js  :', edgeDirs.length, '| set identique :', sameSet(canonical, edgeDirs), '| diff :', JSON.stringify(diff(canonical, edgeDirs)));
console.log('build.js COURSE_DIRS:', buildDirs.length, '| set identique :', sameSet(canonical, buildDirs), '| diff :', JSON.stringify(diff(canonical, buildDirs)));
console.log('auth-check COURSE_DIRS:', chkDirs.length, '| set identique :', sameSet(canonical, chkDirs), '| diff :', JSON.stringify(diff(canonical, chkDirs)));

// ---------- isProtected Node (module réel) ----------
const nodeIsProtected = acModule.isProtected;

// ---------- isProtected Edge (copie fidèle du code lu) ----------
const EDGE_DIRS = edgeDirs;
function edgeIsProtected(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 1) return false;
  const courseName = parts[0];
  if (!EDGE_DIRS.includes(courseName)) return false;
  if (parts.length < 2) return courseName === 'epreuves' || courseName === 'preparation-web';
  if (courseName === 'epreuves') return true;
  if (courseName === 'preparation-web') {
    if (parts[1] === 'assets') return false;
    return true;
  }
  const filename = parts[parts.length - 1] || '';
  const isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
  if (isQcmData) return true;
  if (parts[1] === 'assets') return pathname.endsWith('.pdf');
  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;
  if (!pathname.endsWith('.html') && !pathname.endsWith('.pdf')) return false;
  return true;
}

// ---------- isProtectedPage client (copie fidèle auth-check.js) ----------
const CHK_DIRS = chkDirs;
function clientIsProtectedPage(pathname) {
  const cleanUrl = String(pathname).split('?')[0].split('#')[0];
  const parts = cleanUrl.split('/').filter(Boolean);
  if (parts.length < 2) return false;
  const courseName = parts[0];
  if (CHK_DIRS.indexOf(courseName) === -1) return false;
  if (courseName === 'epreuves') return true;
  const filename = parts[parts.length - 1] || '';
  const isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
  if (isQcmData) return true;
  if (parts[1] === 'assets') return cleanUrl.endsWith('.pdf');
  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapter1_placeholder') return false;
  if (!cleanUrl.endsWith('.html') && !cleanUrl.endsWith('.pdf')) return false;
  return true;
}

const urls = [
  '/index.html', '/', '/robots.txt',
  '/probabilites/index.html', '/probabilites/chapitres/chapitre1.html', '/probabilites/chapitres/chapitre2.html',
  '/probabilites/assets/css/style.css', '/probabilites/assets/pdf/cours.pdf',
  '/probabilites/qcm/qcm-data.js', '/probabilites/data/quiz.json',
  '/epreuves/index.html', '/epreuves/Epreuves.pdf',
  '/preparation-web/index.html', '/preparation-web/assets/data/preparation-quiz.json', '/preparation-web/atelier.html',
  '/react/chapitres/chapitre2.html', '/api-rest-flask/chapitres/chapitre2.html',
  '/Cyber securite B2/chapitres/chapitre2.html', '/RD-RO/chapitres/chapitre3.html',
  '/b1/index.html', '/droitb2/page.html', '/roadmap/index.html',
  '/unknowncourse/page.html', '/probabilites/chapitres/chapitre1.html?x=1'
];

console.log('\n=== isProtected : Node vs Edge vs Client ===');
console.log('URL'.padEnd(52), 'Node'.padEnd(6), 'Edge'.padEnd(6), 'Client');
let divergences = 0;
for (const u of urls) {
  const n = nodeIsProtected(u);
  const e = edgeIsProtected(u);
  const c = clientIsProtectedPage(u);
  const mark = (n !== e || n !== c) ? ' <-- DIVERGENCE' : '';
  if (mark) divergences++;
  console.log(u.padEnd(52), String(n).padEnd(6), String(e).padEnd(6), String(c) + mark);
}
console.log('\nDivergences trouvées :', divergences);
