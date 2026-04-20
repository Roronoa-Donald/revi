export const config = { runtime: 'edge' };

const COURSE_DIRS = [
  'linux',
  'php',
  'probabilites',
  'rd_java',
  'rd_winserver',
  'admin-vm',
  'droit',
  'RD-RO',
  'assembleur',
  'Cyber securite B2',
  'sql',
  'csharp',
  'ccna',
  'uml',
  'uiux',
  'epreuves'
];

function isProtectedPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) return false;

  const courseName = parts[0];
  if (!COURSE_DIRS.includes(courseName)) return false;

  if (courseName === 'epreuves') return true;
  const filename = parts[parts.length - 1] || '';
  const isQcmData = /qcm/i.test(filename) && (filename.endsWith('.js') || filename.endsWith('.json'));
  if (isQcmData) return true;

  if (parts[1] === 'assets') return pathname.endsWith('.pdf');

  if (parts.length === 2 && (parts[1] === 'index.html' || parts[1] === '')) return false;
  if (parts[1] === 'chapitres' && parts.length >= 3 && parts[2] === 'chapitre1.html') return false;

  if (!pathname.endsWith('.html') && !pathname.endsWith('.pdf')) return false;
  return true;
}

function getCourseFromPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length >= 1 && COURSE_DIRS.includes(parts[0])) return parts[0];
  return null;
}

function buildRedirect(requestUrl, course, reason) {
  const redirectTarget = encodeURIComponent(requestUrl.pathname + requestUrl.search);
  let url = `${requestUrl.origin}/_auth/activate.html?redirect=${redirectTarget}`;
  if (course) url += `&course=${encodeURIComponent(course)}`;
  if (reason === 'scope') url += '&error=scope';
  return Response.redirect(url, 307);
}

export default async function middleware(request) {
  const requestUrl = new URL(request.url);
  const { pathname } = requestUrl;

  if (pathname.startsWith('/_auth/') || pathname.startsWith('/api/')) {
    return fetch(request);
  }

  if (!isProtectedPath(pathname)) {
    return fetch(request);
  }

  const course = getCourseFromPath(pathname);
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
    return buildRedirect(requestUrl, course, 'auth');
  }

  const scope = data.scope || '';
  if (course && scope !== 'all' && !scope.split(',').includes(course)) {
    return buildRedirect(requestUrl, course, 'scope');
  }

  return fetch(request);
}
