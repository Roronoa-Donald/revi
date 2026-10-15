import { next } from '@vercel/functions';

export const config = { runtime: 'edge' };

// >>> COURSE_REGISTRY (généré depuis server/courses.js par scripts/sync-courses.js — NE PAS ÉDITER À LA MAIN)
const COURSE_DIRS = [
  "linux",
  "php",
  "probabilites",
  "rd_java",
  "rd_winserver",
  "admin-vm",
  "droit",
  "react",
  "api-rest-flask",
  "erp-si",
  "ingenierie-besoin",
  "masterclass-apprendre",
  "RD-RO",
  "assembleur",
  "Cyber securite B2",
  "sql",
  "csharp",
  "ccna",
  "uml",
  "uiux",
  "docker",
  "infographie",
  "preparation-web",
  "epreuves",
  "b1-admin-windows",
  "b1-algebre",
  "b1-algo",
  "b1-anglais",
  "b1-reseaux",
  "b1-bureautique",
  "b1-ccna1",
  "b1-architecture",
  "b1-robotique",
  "b1-cyber",
  "b1-droit",
  "b1-fr-pro",
  "b1-git",
  "b1-c-cpp",
  "b1-linux",
  "b1-merise",
  "b1-php",
  "b1-prog-web",
  "b1-projet",
  "b1-python",
  "b1-sql",
  "b1-stats",
  "b1-vb-excel",
  "b1-virtualisation",
  "b3-algo",
  "b3-cloud-computing",
  "b3-devops",
  "b3-document-technique",
  "b3-etude-quantitative",
  "b3-firewall",
  "b3-github",
  "b3-linux",
  "b3-agile",
  "b3-pfsense",
  "b3-reseau-lan",
  "b3-sql",
  "b3-veille",
  "b3-windows-server",
  "b3-anglais",
  "b3-cloud-azure",
  "b3-cryptographie",
  "b3-google-cloud",
  "b3-hacking",
  "b3-cloud-aws",
  "b3-supervision",
  "b3-voip",
  "b3-virtualisation"
];

const COURSE_LEVELS = {
  "linux": "b2",
  "php": "b2",
  "probabilites": "b2",
  "rd_java": "b2",
  "rd_winserver": "b2",
  "admin-vm": "b2",
  "droit": "b2",
  "react": "b2",
  "api-rest-flask": "b2",
  "erp-si": "b2",
  "ingenierie-besoin": "b2",
  "masterclass-apprendre": "b2",
  "RD-RO": "b2",
  "assembleur": "b2",
  "Cyber securite B2": "b2",
  "sql": "b2",
  "csharp": "b2",
  "ccna": "b2",
  "uml": "b2",
  "uiux": "b2",
  "docker": "b2",
  "infographie": "b2",
  "preparation-web": "b2",
  "epreuves": "b2",
  "b1-admin-windows": "b1",
  "b1-algebre": "b1",
  "b1-algo": "b1",
  "b1-anglais": "b1",
  "b1-reseaux": "b1",
  "b1-bureautique": "b1",
  "b1-ccna1": "b1",
  "b1-architecture": "b1",
  "b1-robotique": "b1",
  "b1-cyber": "b1",
  "b1-droit": "b1",
  "b1-fr-pro": "b1",
  "b1-git": "b1",
  "b1-c-cpp": "b1",
  "b1-linux": "b1",
  "b1-merise": "b1",
  "b1-php": "b1",
  "b1-prog-web": "b1",
  "b1-projet": "b1",
  "b1-python": "b1",
  "b1-sql": "b1",
  "b1-stats": "b1",
  "b1-vb-excel": "b1",
  "b1-virtualisation": "b1",
  "b3-algo": "b3",
  "b3-cloud-computing": "b3",
  "b3-devops": "b3",
  "b3-document-technique": "b3",
  "b3-etude-quantitative": "b3",
  "b3-firewall": "b3",
  "b3-github": "b3",
  "b3-linux": "b3",
  "b3-agile": "b3",
  "b3-pfsense": "b3",
  "b3-reseau-lan": "b3",
  "b3-sql": "b3",
  "b3-veille": "b3",
  "b3-windows-server": "b3",
  "b3-anglais": "b3",
  "b3-cloud-azure": "b3",
  "b3-cryptographie": "b3",
  "b3-google-cloud": "b3",
  "b3-hacking": "b3",
  "b3-cloud-aws": "b3",
  "b3-supervision": "b3",
  "b3-voip": "b3",
  "b3-virtualisation": "b3"
};

const LEVEL_RANK = { b1: 1, b2: 2, b3: 3 };
// <<< COURSE_REGISTRY

// Contenu protégé (payant) :
//  - epreuves : tout (index + PDFs)
//  - preparation-web : tout sauf assets/
//  - autres cours : données QCM (.js/.json), chapitres >= 2, PDFs (assets inclus)
// Gratuit et sans aucune trace d'abonnement : portail, index de cours, chapitre1.html.
function isProtectedPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 1) return false;

  const courseName = parts[0];
  if (!COURSE_DIRS.includes(courseName)) return false;
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

  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === 'sommaire.html' || parts[1] === '')) return false;
  if (parts.length === 2 && parts[1] === 'chapitre1.html') return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

  if (!pathname.endsWith('.html') && !pathname.endsWith('.pdf')) return false;
  return true;
}

function getCourseFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 1 && COURSE_DIRS.includes(parts[0])) return parts[0];
  return null;
}

/**
 * Le niveau du compte permet-il d'accéder au cours de cette page ?
 * fail-closed : niveau inconnu → refus.
 */
function canAccessPath(userLevel, pathname) {
  const course = getCourseFromPath(pathname);
  if (!course) return true; // hors cours canonique : pas de garde de niveau
  const courseLevel = COURSE_LEVELS[course];
  if (!courseLevel) return true;
  const u = LEVEL_RANK[userLevel] || 0;
  return u >= LEVEL_RANK[courseLevel];
}

function buildLoginRedirect(requestUrl) {
  const redirectTarget = encodeURIComponent(requestUrl.pathname + requestUrl.search);
  return Response.redirect(`${requestUrl.origin}/_auth/login.html?redirect=${redirectTarget}`, 307);
}

function buildPaywallRedirect(requestUrl) {
  const redirectTarget = encodeURIComponent(requestUrl.pathname + requestUrl.search);
  return Response.redirect(`${requestUrl.origin}/_auth/account.html?payment=required&redirect=${redirectTarget}`, 307);
}

function buildPreparationRedirect(requestUrl) {
  return Response.redirect(`${requestUrl.origin}/index.html?preparation=locked`, 307);
}

function buildLevelRedirect(requestUrl) {
  const redirectTarget = encodeURIComponent(requestUrl.pathname + requestUrl.search);
  return Response.redirect(`${requestUrl.origin}/_auth/account.html?level=denied&redirect=${redirectTarget}`, 307);
}

export default async function middleware(request) {
  const requestUrl = new URL(request.url);
  const { pathname } = requestUrl;

  // Protection du dashboard admin : requiert le cookie admin_token valide
  if (pathname.startsWith('/_auth/admin/dashboard')) {
    const adminVerifyUrl = new URL('/api/admin/verify', requestUrl.origin);
    try {
      const res = await fetch(adminVerifyUrl, {
        headers: {
          cookie: request.headers.get('cookie') || ''
        }
      });
      if (!res.ok) {
        return Response.redirect(`${requestUrl.origin}/_auth/admin/login.html`, 307);
      }
    } catch {
      return Response.redirect(`${requestUrl.origin}/_auth/admin/login.html`, 307);
    }
    return next();
  }

  if (pathname.startsWith('/_auth/') || pathname.startsWith('/api/')) {
    return next();
  }

  const protectedPath = isProtectedPath(pathname);

  // Gratuit et sans restriction pour tous : portail, index de cours, sommaire et chapitre 1.
  if (!protectedPath) return next();

  const verifyUrl = new URL('/api/verify', requestUrl.origin);

  let data = null;
  try {
    const res = await fetch(verifyUrl, {
      headers: {
        cookie: request.headers.get('cookie') || ''
      }
    });
    data = await res.json();
  } catch {
    data = null;
  }

  if (!data || !data.authenticated) {
    return buildLoginRedirect(requestUrl);
  }

  // Niveau : B1 ⊂ B2 ⊂ B3 sur le contenu protégé.
  if (!canAccessPath(data.level, pathname)) {
    return buildLevelRedirect(requestUrl);
  }

  // Abonnement requis pour le contenu payant
  if (!data.subscribed) {
    return buildPaywallRedirect(requestUrl);
  }

  if (getCourseFromPath(pathname) === 'preparation-web') {
    const prepUrl = new URL('/api/preparation/status', requestUrl.origin);
    let prepData = null;
    try {
      const res = await fetch(prepUrl, {
        headers: {
          cookie: request.headers.get('cookie') || ''
        }
      });
      prepData = await res.json();
    } catch {
      prepData = null;
    }

    if (!prepData || !prepData.enabled || !prepData.unlocked) {
      return buildPreparationRedirect(requestUrl);
    }
  }

  return next();
}
