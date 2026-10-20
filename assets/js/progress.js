/* ════════════════════════════════════════════════════════════════════════════
   PROGRESS — localStorage pour suivi de progression par cours
   Pattern best practice (Brilliant + Khan Academy)
   - Par chapitre : read status + % scroll atteint
   - Par exercice : passed/failed + score + attempts
   - lastVisited : pour bouton "Reprendre"
   ════════════════════════════════════════════════════════════════════════════ */

(function (global) {
  'use strict';

  const STORAGE_KEY = 'cours-progress-v1';

  /* ─────────────────────────────────────────────────────────────────────────
     Events (v3 « délice ») — dispatch silencieux : si personne n'écoute,
     zéro effet. Les consommateurs de l'API ne connaissent pas ces événements.
     ──────────────────────────────────────────────────────────────────────── */
  function emit(type, detail) {
    try {
      if (typeof document === 'undefined') return; // environnement sans DOM
      document.dispatchEvent(new CustomEvent(type, { detail: detail || {} }));
    } catch (e) { /* jamais bloquant */ }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Storage helpers
     ──────────────────────────────────────────────────────────────────────── */

  function loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.warn('progress.js: failed to load', e);
      return {};
    }
  }

  function saveAll(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('progress.js: failed to save', e);
    }
  }

  function getCourse(courseId) {
    const all = loadAll();
    return all[courseId] || {
      lastVisited: null,
      chapters: {},
      exercises: {},
      startedAt: null,
      lastActivityAt: null
    };
  }

  function setCourse(courseId, data) {
    const all = loadAll();
    data.lastActivityAt = new Date().toISOString();
    if (!data.startedAt) data.startedAt = data.lastActivityAt;
    all[courseId] = data;
    saveAll(all);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Chapter tracking
     ──────────────────────────────────────────────────────────────────────── */

  function trackChapter(courseId, chapterId, scrollPct) {
    const data = getCourse(courseId);
    const chap = data.chapters[chapterId] || { read: false, scroll: 0 };
    chap.scroll = Math.max(chap.scroll, scrollPct);
    const wasRead = chap.read;
    if (scrollPct >= 90) {
      chap.read = true;
      chap.completedAt = new Date().toISOString();
    }
    data.chapters[chapterId] = chap;
    data.lastVisited = chapterId;
    setCourse(courseId, data);
    if (!wasRead && chap.read) {
      emit('bf:chapter-complete', { courseId: courseId, chapterId: chapterId, source: 'track' });
    }
    return chap;
  }

  function markChapterComplete(courseId, chapterId) {
    const data = getCourse(courseId);
    const wasRead = data.chapters[chapterId] && data.chapters[chapterId].read;
    data.chapters[chapterId] = {
      read: true,
      scroll: 100,
      completedAt: new Date().toISOString()
    };
    setCourse(courseId, data);
    if (!wasRead) {
      emit('bf:chapter-complete', { courseId: courseId, chapterId: chapterId, source: 'mark' });
    }
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Exercise tracking
     ──────────────────────────────────────────────────────────────────────── */

  function trackExercise(courseId, exerciseId, status, score) {
    // status: 'passed' | 'failed' | 'in_progress'
    const data = getCourse(courseId);
    const ex = data.exercises[exerciseId] || { status: 'in_progress', score: 0, attempts: 0 };
    ex.status = status;
    ex.score = score;
    ex.attempts = (ex.attempts || 0) + 1;
    ex.lastAttemptAt = new Date().toISOString();
    const firstPass = status === 'passed' && !ex.completedAt;
    if (firstPass) {
      ex.completedAt = new Date().toISOString();
    }
    data.exercises[exerciseId] = ex;
    data.lastVisited = exerciseId;
    setCourse(courseId, data);
    if (firstPass) {
      emit('bf:exercise-passed', { courseId: courseId, exerciseId: exerciseId, score: score, attempts: ex.attempts });
    }
    return ex;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Aggregates
     ──────────────────────────────────────────────────────────────────────── */

  function getStats(courseId) {
    const data = getCourse(courseId);
    const totalChapters = Object.keys(data.chapters).length;
    const readChapters = Object.values(data.chapters).filter(c => c.read).length;
    const totalExercises = Object.keys(data.exercises).length;
    const passedExercises = Object.values(data.exercises).filter(e => e.status === 'passed').length;
    return {
      chapters: { total: totalChapters, read: readChapters, pct: totalChapters > 0 ? Math.round((readChapters / totalChapters) * 100) : 0 },
      exercises: { total: totalExercises, passed: passedExercises, pct: totalExercises > 0 ? Math.round((passedExercises / totalExercises) * 100) : 0 },
      overall: totalChapters + totalExercises > 0
        ? Math.round(((readChapters + passedExercises) / (totalChapters + totalExercises)) * 100)
        : 0,
      lastVisited: data.lastVisited,
      startedAt: data.startedAt,
      lastActivityAt: data.lastActivityAt
    };
  }

  function getLastVisited(courseId) {
    const data = getCourse(courseId);
    return data.lastVisited;
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Auto-tracker (à inclure dans chaque page chapitre)
     Tracke le scroll à 25/50/75/90% pour optimiser les écritures
     ──────────────────────────────────────────────────────────────────────── */

  function setupAutoTracker(courseId, chapterId) {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 90, 100];
    let nextMilestone = 0;

    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const pct = Math.min(100, Math.round((window.scrollY / docHeight) * 100));
      if (pct > maxScroll) maxScroll = pct;
      if (nextMilestone < milestones.length && pct >= milestones[nextMilestone]) {
        trackChapter(courseId, chapterId, pct);
        nextMilestone++;
      }
    }

    let raf = null;
    window.addEventListener('scroll', () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        onScroll();
      });
    }, { passive: true });

    // Track on unload
    window.addEventListener('beforeunload', () => {
      if (maxScroll > 0) trackChapter(courseId, chapterId, maxScroll);
    });

    // Track once on load (50% minimum pour les pages courtes)
    setTimeout(() => onScroll(), 500);
  }

  /* ─────────────────────────────────────────────────────────────────────────
     Public API
     ──────────────────────────────────────────────────────────────────────── */

  global.Progress = {
    getCourse,
    trackChapter,
    markChapterComplete,
    trackExercise,
    getStats,
    getLastVisited,
    setupAutoTracker
  };

})(window);
