/**
 * assets/js/progress-sync.js
 *
 * Client léger de synchronisation de la progression étudiant (Lot 3A) :
 * - Persiste localement dans localStorage (mode anonyme / hors-ligne).
 * - Écoute DOMContentLoaded et les CustomEvents :
 *     - rd:chapter-mastery ({ courseId, chapterNum, masteryChecked })
 *     - rd:flashcard-review ({ courseId, cardHash, rating })
 *     - rd:exercise-attempt ({ exerciseId, solved, attemptsCount, bestPassed, totalTests, lastCode })
 * - Détecte l'état de connexion via window.__rdUser ou /api/verify.
 * - Fusionne le paquet local via POST /api/progress/sync et récupère l'état
 *   consolidé via GET /api/progress.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'rd:progress:v1';
  var currentUser = null;
  var remoteSummary = null;

  function readLocalStore() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var parsed = raw ? JSON.parse(raw) : {};
      return {
        chapters: parsed.chapters && typeof parsed.chapters === 'object' ? parsed.chapters : {},
        exercises: parsed.exercises && typeof parsed.exercises === 'object' ? parsed.exercises : {},
        flashcards: parsed.flashcards && typeof parsed.flashcards === 'object' ? parsed.flashcards : {},
        exams: parsed.exams && typeof parsed.exams === 'object' ? parsed.exams : {}
      };
    } catch (e) {
      return { chapters: {}, exercises: {}, flashcards: {}, exams: {} };
    }
  }

  function writeLocalStore(store) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
    } catch (e) {
      /* stockage indisponible */
    }
  }

  function detectCourseIdFromPath() {
    if (typeof window === 'undefined' || !window.location) return '';
    var bodyCourse = document.body && document.body.getAttribute('data-course');
    if (bodyCourse) return bodyCourse;
    var parts = String(window.location.pathname || '').split('/').filter(Boolean);
    return parts.length > 0 ? decodeURIComponent(parts[0]) : '';
  }

  function computeLocalLeitner(currentBox, rating) {
    var base = Number(currentBox) >= 1 ? Number(currentBox) : 1;
    var r = String(rating || 'good').toLowerCase();
    var box = base;
    if (r === 'again' || r === 'hard') box = 1;
    else if (r === 'good') box = Math.min(3, base + 1);
    else if (r === 'easy') box = 3;
    var days = box === 3 ? 7 : (box === 2 ? 3 : 1);
    return {
      box: box,
      nextReviewAt: new Date(Date.now() + days * 86400 * 1000).toISOString()
    };
  }

  function saveLocalChapter(courseId, chapterNum, masteryChecked) {
    if (!courseId || !chapterNum) return;
    var store = readLocalStore();
    store.chapters[courseId] = store.chapters[courseId] || {};
    store.chapters[courseId]['ch' + chapterNum] = {
      courseId: courseId,
      chapterNum: Number(chapterNum),
      done: Boolean(masteryChecked),
      masteryChecked: Boolean(masteryChecked),
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
  }

  function saveLocalFlashcard(courseId, cardHash, rating) {
    if (!courseId || !cardHash) return null;
    var store = readLocalStore();
    store.flashcards[courseId] = store.flashcards[courseId] || {};
    var prev = store.flashcards[courseId][cardHash];
    var sched = computeLocalLeitner(prev ? prev.box : 1, rating);
    var entry = {
      courseId: courseId,
      cardHash: cardHash,
      rating: rating || 'good',
      box: sched.box,
      nextReviewAt: sched.nextReviewAt,
      updatedAt: new Date().toISOString()
    };
    store.flashcards[courseId][cardHash] = entry;
    writeLocalStore(store);
    return entry;
  }

  function saveLocalExercise(detail) {
    if (!detail || !detail.exerciseId) return;
    var store = readLocalStore();
    var exId = String(detail.exerciseId);
    var prev = store.exercises[exId] || { attemptsCount: 0, solved: false, bestPassed: 0, totalTests: 0 };
    store.exercises[exId] = {
      exerciseId: exId,
      attemptsCount: detail.attemptsCount != null ? Number(detail.attemptsCount) : (prev.attemptsCount + 1),
      solved: Boolean(prev.solved || detail.solved),
      bestPassed: Math.max(prev.bestPassed || 0, Number(detail.bestPassed || 0)),
      totalTests: Math.max(prev.totalTests || 0, Number(detail.totalTests || 0)),
      lastCode: detail.lastCode !== undefined ? detail.lastCode : prev.lastCode,
      solutionRevealed: Boolean(prev.solutionRevealed || detail.solutionRevealed),
      updatedAt: new Date().toISOString()
    };
    writeLocalStore(store);
  }

  function collectLegacyCourseProgress(store) {
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var key = localStorage.key(i);
        if (!key || key === STORAGE_KEY || key.indexOf('rd:') === 0) continue;
        var val = localStorage.getItem(key);
        if (!val || val.charAt(0) !== '{') continue;
        var parsed = JSON.parse(val);
        if (!parsed || typeof parsed !== 'object') continue;
        var courseId = key.replace(/_progress$|^revi_progress_/, '');
        Object.keys(parsed).forEach(function (chKey) {
          var m = /^ch(\d+)$/.exec(chKey);
          if (m && parsed[chKey] && parsed[chKey].done) {
            store.chapters[courseId] = store.chapters[courseId] || {};
            if (!store.chapters[courseId][chKey]) {
              store.chapters[courseId][chKey] = {
                courseId: courseId,
                chapterNum: parseInt(m[1], 10),
                done: true,
                masteryChecked: true
              };
            }
          }
        });
      }
    } catch (e) {
      /* ignore */
    }
    return store;
  }

  function resolveAuthenticatedUser() {
    if (typeof window !== 'undefined' && window.__rdUser && (window.__rdUser.userId || window.__rdUser.id)) {
      currentUser = window.__rdUser;
      return Promise.resolve(currentUser);
    }
    if (typeof fetch !== 'function') {
      return Promise.resolve(null);
    }
    return fetch('/api/verify', { credentials: 'include' })
      .then(function (res) {
        if (!res.ok) return null;
        return res.json();
      })
      .then(function (data) {
        var isAuthed = Boolean(data && (data.authenticated === true || data.valid === true));
        var resolvedUserId = data && (
          data.userId != null
            ? data.userId
            : (data.user && data.user.id != null
              ? data.user.id
              : (data.account && data.account.userId != null ? data.account.userId : null))
        );
        if (isAuthed && resolvedUserId != null) {
          currentUser = {
            userId: resolvedUserId,
            email: data.email || (data.account && data.account.email) || (data.user && data.user.email) || null,
            level: data.level || (data.account && data.account.level) || (data.user && data.user.level) || null
          };
          if (typeof window !== 'undefined' && !window.__rdUser) {
            window.__rdUser = currentUser;
          }
          return currentUser;
        }
        return null;
      })
      .catch(function () {
        return null;
      });
  }

  function postJson(url, payload) {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    return fetch(url, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (res) { return res.ok ? res.json() : null; })
      .catch(function () { return null; });
  }

  function fetchProgress(courseId) {
    if (typeof fetch !== 'function') return Promise.resolve(null);
    var url = '/api/progress' + (courseId ? '?course=' + encodeURIComponent(courseId) : '');
    return fetch(url, { credentials: 'include' })
      .then(function (res) { return res.ok ? res.json() : null; })
      .then(function (summary) {
        if (summary) {
          remoteSummary = summary;
          applySummaryToDom(summary);
          if (typeof document !== 'undefined' && typeof CustomEvent === 'function') {
            document.dispatchEvent(new CustomEvent('rd:progress-loaded', { detail: summary }));
          }
        }
        return summary;
      })
      .catch(function () { return null; });
  }

  function syncLocalToRemote() {
    var store = collectLegacyCourseProgress(readLocalStore());
    var hasChapters = Object.keys(store.chapters).length > 0;
    var hasExercises = Object.keys(store.exercises).length > 0;
    var hasFlashcards = Object.keys(store.flashcards).length > 0;
    var hasExams = store.exams && Object.keys(store.exams).length > 0;

    if (!hasChapters && !hasExercises && !hasFlashcards && !hasExams) {
      return fetchProgress(detectCourseIdFromPath());
    }

    return postJson('/api/progress/sync', {
      chapters: store.chapters,
      exercises: store.exercises,
      flashcards: store.flashcards,
      exams: store.exams || {}
    }).then(function (res) {
      if (res && res.progress) {
        remoteSummary = res.progress;
        applySummaryToDom(res.progress);
        if (typeof document !== 'undefined' && typeof CustomEvent === 'function') {
          document.dispatchEvent(new CustomEvent('rd:progress-loaded', { detail: res.progress }));
        }
        return res.progress;
      }
      return fetchProgress(detectCourseIdFromPath());
    });
  }

  function applySummaryToDom(summary) {
    if (typeof document === 'undefined' || !summary) return;
    var courseId = detectCourseIdFromPath();
    var chapterAttr = document.body && document.body.getAttribute('data-chapter');
    var chapterNum = chapterAttr ? parseInt(chapterAttr, 10) : NaN;

    if (courseId && Number.isInteger(chapterNum) && Array.isArray(summary.chapters)) {
      var found = summary.chapters.find(function (c) {
        return c.course_id === courseId && Number(c.chapter_num) === chapterNum;
      });
      if (found) {
        var mark = document.querySelector('[data-mark-done]');
        if (mark && Boolean(found.mastery_checked) !== Boolean(mark.checked)) {
          mark.checked = Boolean(found.mastery_checked);
        }
      }
    }
  }

  function onChapterMastery(detail) {
    if (!detail) return;
    var courseId = detail.courseId || detectCourseIdFromPath();
    var chapterNum = Number(detail.chapterNum != null ? detail.chapterNum : detail.chapter);
    var masteryChecked = detail.masteryChecked !== undefined
      ? Boolean(detail.masteryChecked)
      : (detail.mastered !== undefined
        ? Boolean(detail.mastered)
        : (detail.done !== undefined ? Boolean(detail.done) : true));
    if (!courseId || !Number.isInteger(chapterNum) || chapterNum < 1) return;

    saveLocalChapter(courseId, chapterNum, masteryChecked);
    if (currentUser) {
      postJson('/api/progress/chapter', {
        courseId: courseId,
        chapterNum: chapterNum,
        masteryChecked: masteryChecked
      });
    }
  }

  function onFlashcardReview(detail) {
    if (!detail) return;
    var courseId = detail.courseId || detectCourseIdFromPath();
    var cardHash = String(detail.cardHash || '').trim();
    var rating = String(detail.rating || 'good').toLowerCase();
    if (!courseId || !cardHash) return;

    saveLocalFlashcard(courseId, cardHash, rating);
    if (currentUser) {
      postJson('/api/progress/flashcard', {
        courseId: courseId,
        cardHash: cardHash,
        rating: rating
      });
    }
  }

  function onExerciseAttempt(detail) {
    if (!detail || !detail.exerciseId) return;
    saveLocalExercise(detail);
    if (currentUser) {
      postJson('/api/progress/sync', {
        exercises: [detail]
      });
    }
  }

  function saveLocalExam(detail) {
    if (!detail) return null;
    var courseId = detail.courseId || detectCourseIdFromPath();
    if (!courseId) return null;
    var store = readLocalStore();
    var entry = {
      courseId: courseId,
      score: Number(detail.score || 0),
      total: Number(detail.total || 0),
      percentage: Number(detail.percentage || 0),
      noteSur20: Number(detail.noteSur20 != null ? detail.noteSur20 : (detail.total > 0 ? ((detail.score / detail.total) * 20).toFixed(1) : 0)),
      passed: Boolean(detail.passed),
      updatedAt: new Date().toISOString()
    };
    store.exams[courseId] = entry;
    writeLocalStore(store);
    return entry;
  }

  function onExamCompleted(detail) {
    if (!detail) return;
    var entry = saveLocalExam(detail);
    if (currentUser && entry) {
      var examsPayload = {};
      examsPayload[entry.courseId] = entry;
      postJson('/api/progress/sync', { exams: examsPayload }).then(function (res) {
        if (res && res.progress) {
          remoteSummary = res.progress;
          applySummaryToDom(res.progress);
          return res.progress;
        }
        return fetchProgress(entry.courseId);
      });
    }
  }

  function bindDomEvents() {
    if (typeof document === 'undefined') return;

    var seenEvents = typeof WeakSet === 'function' ? new WeakSet() : null;
    function listenEvent(type, handler) {
      var wrapped = function (e) {
        if (seenEvents && e && typeof e === 'object') {
          if (seenEvents.has(e)) return;
          seenEvents.add(e);
        }
        handler(e && e.detail);
      };
      document.addEventListener(type, wrapped);
      if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
        window.addEventListener(type, wrapped);
      }
    }

    listenEvent('rd:chapter-mastery', onChapterMastery);
    listenEvent('rd:flashcard-review', onFlashcardReview);
    listenEvent('rd:exercise-attempt', onExerciseAttempt);
    listenEvent('rd:exam-completed', onExamCompleted);

    var mark = document.querySelector('[data-mark-done]');
    var chapterAttr = document.body && document.body.getAttribute('data-chapter');
    if (mark && chapterAttr) {
      mark.addEventListener('change', function () {
        onChapterMastery({
          courseId: detectCourseIdFromPath(),
          chapterNum: parseInt(chapterAttr, 10),
          masteryChecked: Boolean(mark.checked)
        });
      });
    }
  }

  function init() {
    bindDomEvents();
    resolveAuthenticatedUser().then(function (user) {
      if (user) {
        syncLocalToRemote();
      }
    });
  }

  if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', init);
    } else {
      init();
    }
  }

  if (typeof window !== 'undefined') {
    window.RDProgressSync = {
      sync: syncLocalToRemote,
      fetchProgress: fetchProgress,
      recordChapter: onChapterMastery,
      recordFlashcard: onFlashcardReview,
      recordExercise: onExerciseAttempt,
      recordExam: onExamCompleted,
      getLocalStore: readLocalStore,
      getRemoteSummary: function () { return remoteSummary; }
    };
  }
})();
