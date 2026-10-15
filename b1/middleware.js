import { NextResponse } from 'next/server';

const COURSE_DIRS = [
  'algo',
  'c_cpp',
  'python',
  'reseaux',
  'stats',
  'fbd',
  'merise',
  'algebre',
  'ato'
];

function isProtectedPath(pathname) {
  const parts = pathname.split('/').filter(Boolean);
  if (parts.length < 2) return false;

  const courseName = parts[0];
  if (!COURSE_DIRS.includes(courseName)) return false;

  if (parts[1] === 'assets') return false;
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

function buildRedirect(request, course, reason) {
  const redirectTarget = encodeURIComponent(request.nextUrl.pathname + request.nextUrl.search);
  let url = `/_auth/activate.html?redirect=${redirectTarget}`;
  if (course) url += `&course=${encodeURIComponent(course)}`;
  if (reason === 'scope') url += '&error=scope';
  return NextResponse.redirect(new URL(url, request.nextUrl.origin));
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith('/_auth/') || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  if (!isProtectedPath(pathname)) {
    return NextResponse.next();
  }

  const course = getCourseFromPath(pathname);
  const verifyUrl = new URL('/api/verify', request.nextUrl.origin);

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
    return buildRedirect(request, course, 'auth');
  }

  const scope = data.scope || '';
  if (course && scope !== 'all' && !scope.split(',').includes(course)) {
    return buildRedirect(request, course, 'scope');
  }

  return NextResponse.next();
}
