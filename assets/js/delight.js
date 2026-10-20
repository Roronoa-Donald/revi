/* ════════════════════════════════════════════════════════════════════════════
   DELIGHT v3 — Micro-célébrations du monde « Papier chaud »
   Écoute les événements de progress.js (bf:chapter-complete, bf:exercise-passed)
   et rend : toast avec check animé + compteur XP.
   Zéro dépendance. Zéro effet si rien n'est écouté. Silence sous reduced-motion.
   XP local (localStorage cours-xp-v1) — distinct de l'XP serveur preparation-web.
   ════════════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  var XP_KEY = 'cours-xp-v1';
  var REDUCED = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (REDUCED) return; // décision D5 : pas de délice du tout, pas juste moins animé

  /* ───────── XP local ───────── */

  function loadXp() {
    try {
      var raw = localStorage.getItem(XP_KEY);
      return raw ? JSON.parse(raw) : { total: 0, courses: {} };
    } catch (e) { return { total: 0, courses: {} }; }
  }

  function saveXp(data) {
    try { localStorage.setItem(XP_KEY, JSON.stringify(data)); } catch (e) {}
  }

  function addXp(courseId, amount) {
    var data = loadXp();
    data.total = (data.total || 0) + amount;
    data.courses[courseId] = (data.courses[courseId] || 0) + amount;
    saveXp(data);
    return data.total;
  }

  /* ───────── Styles (injectés une fois) ───────── */

  var CSS = ''
    + '.bf-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);'
    + 'z-index:999990;display:flex;align-items:center;gap:12px;padding:14px 22px;'
    + 'background:#141414;color:#fafaf9;border:1px solid rgba(250,250,249,0.14);'
    + 'border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,0.35);'
    + 'font-family:\'JetBrains Mono\',monospace;font-size:0.875rem;font-weight:500;'
    + 'opacity:0;pointer-events:none;transition:opacity 250ms cubic-bezier(0.4,0,0.2,1),transform 250ms cubic-bezier(0.4,0,0.2,1);}'
    + '.bf-toast.is-visible{opacity:1;transform:translateX(-50%) translateY(0);}'
    + '.bf-toast__check{display:flex;align-items:center;justify-content:center;width:34px;height:34px;'
    + 'background:#047857;border-radius:10px;flex-shrink:0;}'
    + '.bf-toast__check svg{width:18px;height:18px;stroke:#fafaf9;stroke-width:3;fill:none;'
    + 'stroke-linecap:round;stroke-linejoin:round;}'
    + '.bf-toast__check svg path{stroke-dasharray:24;stroke-dashoffset:24;'
    + 'animation:bf-check-draw 400ms cubic-bezier(0.34,1.56,0.64,1) 150ms forwards;}'
    + '@keyframes bf-check-draw{to{stroke-dashoffset:0;}}'
    + '.bf-toast__title{font-weight:700;}'
    + '.bf-toast__xp{color:#e5bc5c;font-weight:700;font-variant-numeric:tabular-nums;}'
    + '.bf-toast__body{display:flex;flex-direction:column;gap:2px;}'
    + '.bf-toast__sub{color:#a8a29e;font-size:0.72rem;}';

  function injectStyles() {
    if (document.getElementById('bf-delight-css')) return;
    var style = document.createElement('style');
    style.id = 'bf-delight-css';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  /* ───────── Toast ───────── */

  var toastEl = null;
  var toastTimer = null;

  function ensureToast() {
    if (toastEl) return toastEl;
    injectStyles();
    toastEl = document.createElement('div');
    toastEl.className = 'bf-toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
    return toastEl;
  }

  function showToast(opts) {
    var el = ensureToast();
    el.innerHTML = ''
      + '<span class="bf-toast__check" aria-hidden="true">'
      + '<svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5"/></svg></span>'
      + '<span class="bf-toast__body">'
      + '<span class="bf-toast__title">' + opts.title + '</span>'
      + '<span class="bf-toast__sub"><span class="bf-toast__xp">+' + opts.xp + ' XP</span> · ' + opts.sub + '</span>'
      + '</span>';
    // reflow pour relancer l'animation du check à chaque toast
    el.classList.remove('is-visible');
    void el.offsetWidth;
    el.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      el.classList.remove('is-visible');
    }, 3200);
  }

  /* ───────── Gestion des événements ───────── */

  var XP_RULES = {
    'bf:chapter-complete': { xp: 20, firstBonus: 10, title: 'Chapitre terminé' },
    'bf:exercise-passed':  { xp: 30, firstBonus: 10, title: 'Exercice réussi' }
  };

  function firstActivityOfCourse(courseId) {
    var data = loadXp();
    return !data.courses[courseId];
  }

  function onProgressEvent(e) {
    var d = (e && e.detail) || {};
    var rule = XP_RULES[e.type];
    if (!rule || !d.courseId) return;

    var bonus = firstActivityOfCourse(d.courseId) ? rule.firstBonus : 0;
    var total = addXp(d.courseId, rule.xp + bonus);

    var sub = bonus > 0 ? 'Nouveau cours commencé · ' + total + ' XP au total'
                        : total + ' XP au total';
    showToast({ title: rule.title, xp: rule.xp + bonus, sub: sub });

    try { document.dispatchEvent(new CustomEvent('bf:xp-gained', { detail: { courseId: d.courseId, gained: rule.xp + bonus, total: total } })); } catch (err) {}
  }

  if (document.addEventListener) {
    document.addEventListener('bf:chapter-complete', onProgressEvent);
    document.addEventListener('bf:exercise-passed', onProgressEvent);
  }
})();
