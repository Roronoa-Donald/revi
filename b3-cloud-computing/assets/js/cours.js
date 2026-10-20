/* ============================================================================
   Interactions pédagogiques d'un cours B1 (aucune dépendance). Modèle
   paramétré : b3cloud:progress est remplacé par la clé de stockage propre au cours.
   - QCM interactif avec correction expliquée + score + palier de maîtrise
   - Cartes de révision (retournement)
   - Checklist et progression locale (localStorage)
   - Chronomètre des examens blancs
   Même moteur que les autres cours ; seule la clé de stockage change (par cours).
   ========================================================================= */
(function () {
  'use strict';

  var STORE = 'b3cloud:progress';

  /* ---------- Palier de maîtrise (grille de la mission) ---------- */
  function band(pct) {
    if (pct >= 95) return { label: 'Maîtrise recherchée (≥ 95 %)', cls: 'bandrow--top' };
    if (pct >= 90) return { label: 'Très bonne maîtrise (90–94 %)', cls: 'bandrow--top' };
    if (pct >= 80) return { label: 'Bonne maîtrise (80–89 %)', cls: 'bandrow--good' };
    if (pct >= 70) return { label: 'Base correcte, lacunes (70–79 %)', cls: 'bandrow--good' };
    if (pct >= 50) return { label: 'Compréhension partielle (50–69 %)', cls: 'bandrow--mid' };
    return { label: 'Notions insuffisamment maîtrisées (< 50 %)', cls: 'bandrow--low' };
  }

  /* ---------- QCM ---------- */
  function initQcm() {
    document.querySelectorAll('.qcm').forEach(function (qcm) {
      var questions = Array.prototype.slice.call(qcm.querySelectorAll('.q'));
      var scoreEl = qcm.querySelector('.qcm__score');
      var answered = 0, correct = 0;
      var mastery = qcm.getAttribute('data-mastery') === '1';

      if (!scoreEl) {
        scoreEl = document.createElement('div');
        scoreEl.className = 'qcm__score';
        qcm.appendChild(scoreEl);
      }
      scoreEl.setAttribute('role', 'status');
      scoreEl.setAttribute('aria-live', 'polite');

      function render() {
        if (answered === 0) return;
        scoreEl.classList.add('is-shown');
        var pct = Math.round((correct / questions.length) * 100);
        var b = band(pct);
        scoreEl.innerHTML = 'Score : <strong>' + correct + '/' + questions.length +
          '</strong> (' + pct + ' %) <span class="band ' + b.cls + '">' + b.label + '</span>' +
          (mastery && pct < 95 ? ' — reprends les notions faibles avant de passer au chapitre suivant.' : '');
      }

      questions.forEach(function (q) {
        var opts = Array.prototype.slice.call(q.querySelectorAll('.opt'));
        var exp = q.querySelector('.q__exp');
        opts.forEach(function (opt) {
          opt.addEventListener('click', function () {
            if (q.dataset.done === '1') return;
            q.dataset.done = '1';
            var ok = opt.getAttribute('data-correct') === '1';
            opts.forEach(function (o) {
              o.disabled = true;
              if (o.getAttribute('data-correct') === '1') o.classList.add('is-correct');
            });
            if (!ok) opt.classList.add('is-wrong');
            if (exp) exp.classList.add('is-shown');
            answered++;
            if (ok) correct++;
            render();
          });
        });
      });
    });
  }

  /* ---------- Flashcards ---------- */
  function initCards() {
    document.querySelectorAll('.fc').forEach(function (card) {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      function flip() {
        var flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
      }
      card.addEventListener('click', flip);
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
      });
    });
  }

  /* ---------- Progression locale ---------- */
  function readProgress() {
    try { return JSON.parse(localStorage.getItem(STORE) || '{}'); } catch (e) { return {}; }
  }
  function writeProgress(p) {
    try { localStorage.setItem(STORE, JSON.stringify(p)); } catch (e) { /* ignore */ }
  }
  function initProgress() {
    var chapter = document.body.getAttribute('data-chapter');
    if (!chapter) return;
    var p = readProgress();
    if (!p['ch' + chapter]) {
      p['ch' + chapter] = { seen: true, at: Date.now() };
      writeProgress(p);
    }
    var mark = document.querySelector('[data-mark-done]');
    if (mark) {
      var done = !!(p['ch' + chapter] && p['ch' + chapter].done);
      mark.checked = done;
      mark.addEventListener('change', function () {
        var pp = readProgress();
        pp['ch' + chapter] = pp['ch' + chapter] || {};
        pp['ch' + chapter].done = mark.checked;
        writeProgress(pp);
      });
    }
  }

  /* ---------- Simulateur d'examen : chronomètre ---------- */
  function initTimer() {
    var el = document.querySelector('[data-timer]');
    if (!el) return;
    var mins = Number(el.getAttribute('data-minutes') || 60);
    var left = mins * 60;
    var startBtn = el.querySelector('[data-start]');
    var out = el.querySelector('[data-clock]');
    var id = null;
    if (!startBtn || !out) return;
    startBtn.addEventListener('click', function () {
      if (id) return;
      startBtn.disabled = true;
      id = setInterval(function () {
        left--;
        var m = String(Math.floor(left / 60)).padStart(2, '0');
        var s = String(left % 60).padStart(2, '0');
        out.textContent = m + ':' + s;
        if (left <= 0) { clearInterval(id); out.textContent = 'Temps écoulé'; }
      }, 1000);
    });
  }

  /* ---------- Thème (Clair / Sombre) ---------- */
  function initTheme() {
    var btn = document.getElementById('themeToggle');
    if (!btn) return;
    btn.addEventListener('click', function () {
      if (typeof window.toggleTheme === 'function') {
        window.toggleTheme();
      }
    });
  }

  function init() {
    initQcm();
    initCards();
    initProgress();
    initTimer();
    initTheme();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
