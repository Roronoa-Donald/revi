/* ============================================================================
   Interactions pédagogiques d'un cours B1 (aucune dépendance). Modèle
   paramétré : b2linux:progress est remplacé par la clé de stockage propre au cours.
   - QCM interactif avec correction expliquée + score + palier de maîtrise
   - Cartes de révision (retournement)
   - Checklist et progression locale (localStorage)
   - Chronomètre des examens blancs
   Même moteur que les autres cours ; seule la clé de stockage change (par cours).
   ========================================================================= */
(function () {
  'use strict';

  var STORE = 'b2linux:progress';

  /* ---------- Palier de maîtrise (grille de la mission) ---------- */
  function band(pct) {
    if (pct >= 95) return { label: 'Maîtrise recherchée (≥ 95 %)', cls: 'bandrow--top' };
    if (pct >= 70) return { label: 'Bonne maîtrise (70–94 %)', cls: 'bandrow--good' };
    if (pct >= 50) return { label: 'Compréhension partielle (50–69 %)', cls: 'bandrow--mid' };
    return { label: 'Notions insuffisamment maîtrisées (< 50 %)', cls: 'bandrow--low' };
  }

  /* ---------- QCM ---------- */
  function initQcm() {
    document.querySelectorAll('.qcm').forEach(function (qcm) {
      var questions = Array.prototype.slice.call(qcm.querySelectorAll('.q'));
      var scoreEl = qcm.querySelector('.qcm__score');
      var mastery = qcm.getAttribute('data-mastery') === '1';
      var isExam = qcm.getAttribute('data-exam') === '1' ||
                   qcm.getAttribute('data-secure') === '1' ||
                   !!document.querySelector('[data-timer]') ||
                   /(?:simulateur-examen|examen-blanc|examens)\.html$/.test(window.location.pathname);

      if (!scoreEl) {
        scoreEl = document.createElement('div');
        scoreEl.className = 'qcm__score';
        qcm.appendChild(scoreEl);
      }
      scoreEl.setAttribute('role', 'status');
      scoreEl.setAttribute('aria-live', 'polite');

      // Mélange Fisher-Yates commun des options au chargement (en mémorisant l’indice initial)
      questions.forEach(function (q) {
        var optsContainer = q.querySelector('.opts');
        var opts = Array.prototype.slice.call(q.querySelectorAll('.opt'));
        opts.forEach(function (o, idx) {
          if (o.dataset.origIdx == null) o.dataset.origIdx = String(idx);
        });
        if (optsContainer && opts.length > 1 && q.dataset.done !== '1') {
          var lastOpt = opts[opts.length - 1];
          var lastText = (lastOpt.textContent || '').trim().toLowerCase();
          var keepLast = /ci-dessus|ci dessus|pr[ée]c[ée]dentes|toutes les|aucune des/i.test(lastText);

          var shuffleSlice = keepLast ? opts.slice(0, opts.length - 1) : opts.slice(0);
          for (var i = shuffleSlice.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffleSlice[i];
            shuffleSlice[i] = shuffleSlice[j];
            shuffleSlice[j] = temp;
          }

          var finalOpts = keepLast ? shuffleSlice.concat([lastOpt]) : shuffleSlice;
          finalOpts.forEach(function (o, idx) {
            var label = o.querySelector('.opt__key, .opt-key, .opt__letter, .opt-badge');
            if (label && 'ABCD'[idx]) {
              label.textContent = 'ABCD'[idx] + '.';
            }
            optsContainer.appendChild(o);
          });
        }
      });

      if (isExam) {
        setupExamMode(qcm, questions, scoreEl);
      } else {
        setupTrainingMode(qcm, questions, scoreEl, mastery);
      }
    });
  }

  function setupTrainingMode(qcm, questions, scoreEl, mastery) {
    var answered = 0, correct = 0;
    function render() {
      if (answered === 0) return;
      scoreEl.classList.add('is-shown');
      var pct = Math.round((correct / questions.length) * 100);
      var b = band(pct);
      scoreEl.innerHTML = 'Score : <strong>' + correct + '/' + questions.length +
        '</strong> (' + pct + ' %) <span class="band ' + b.cls + '">' + b.label + '</span>' +
        (mastery && pct < 95 ? ' — reprenez les notions faibles avant de passer au chapitre suivant.' : '');
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
  }

  function setupExamMode(qcm, questions, scoreEl) {
    questions.forEach(function (q) {
      var opts = Array.prototype.slice.call(q.querySelectorAll('.opt'));
      opts.forEach(function (opt) {
        opt.addEventListener('click', function () {
          if (qcm.dataset.submitted === '1') return;
          opts.forEach(function (o) {
            o.classList.remove('is-selected');
            o.setAttribute('aria-pressed', 'false');
          });
          opt.classList.add('is-selected');
          opt.setAttribute('aria-pressed', 'true');
        });
      });
    });

    var submitBtn = qcm.querySelector('.qcm__submit-exam');
    if (!submitBtn) {
      submitBtn = document.createElement('button');
      submitBtn.type = 'button';
      submitBtn.className = 'btn btn--primary qcm__submit-exam';
      submitBtn.innerHTML = '<svg class="ic" aria-hidden="true" focusable="false"><use href="/assets/img/ui-icons.svg#i-award"></use></svg> Valider mon examen (Calculer ma note /20)';
      qcm.appendChild(submitBtn);
    }

    function finalizeExam(score, total, percentage, passed, details) {
      qcm.dataset.submitted = '1';
      scoreEl.classList.add('is-shown');
      var noteSur20 = total > 0 ? (Math.round((score / total) * 200) / 10).toFixed(1) : '0.0';
      var mention = passed ? 'Admis' : 'Ajourné';
      var mentionCls = passed ? 'band--top' : 'band--low';
      scoreEl.innerHTML = 'Note d’examen : <strong>' + noteSur20 + '/20</strong> (' + score + '/' + total +
        ' — ' + percentage + ' %) <span class="band ' + mentionCls + '">' + mention + '</span>' +
        (passed ? ' — Félicitations ! Épreuve validée.' : ' — Note inférieure au seuil de validation (14/20). Vous pouvez vous réentraîner.');

      questions.forEach(function (q, qIdx) {
        q.dataset.done = '1';
        var opts = Array.prototype.slice.call(q.querySelectorAll('.opt'));
        var exp = q.querySelector('.q__exp');
        var det = details && details[qIdx];
        var selectedOpt = q.querySelector('.opt.is-selected');

        opts.forEach(function (o) {
          o.disabled = true;
          if (det) {
            if (det.correct && o === selectedOpt) {
              o.classList.add('is-correct');
            } else if (!det.correct && o === selectedOpt) {
              o.classList.add('is-wrong');
            }
          } else {
            if (o.getAttribute('data-correct') === '1') o.classList.add('is-correct');
            if (o === selectedOpt && o.getAttribute('data-correct') !== '1') o.classList.add('is-wrong');
          }
        });
        if (det && det.explanation && exp) {
          exp.textContent = det.explanation;
        }
        if (exp) exp.classList.add('is-shown');
      });

      submitBtn.disabled = true;
      submitBtn.textContent = 'Examen validé (' + noteSur20 + '/20)';

      window.dispatchEvent(new CustomEvent('rd:exam-completed', {
        detail: {
          courseId: getCourseId(),
          score: score,
          total: total,
          percentage: percentage,
          passed: passed,
          noteSur20: Number(noteSur20)
        }
      }));
    }

    function executeSubmit() {
      if (qcm.dataset.submitted === '1') return;
      var isSecure = qcm.getAttribute('data-secure') === '1';
      var userAnswers = questions.map(function (q, qIdx) {
        var chosen = q.querySelector('.opt.is-selected');
        var sel = -1;
        if (chosen) {
          if (chosen.dataset.origIdx != null) {
            sel = Number(chosen.dataset.origIdx);
          } else {
            var opts = Array.prototype.slice.call(q.querySelectorAll('.opt'));
            sel = opts.indexOf(chosen);
          }
        }
        return { questionIndex: qIdx, selectedOption: sel };
      });

      function localGrade() {
        var sc = 0;
        questions.forEach(function (q) {
          var sel = q.querySelector('.opt.is-selected');
          if (sel && sel.getAttribute('data-correct') === '1') sc++;
        });
        var tot = questions.length;
        var pct = tot > 0 ? Math.round((sc / tot) * 100) : 0;
        finalizeExam(sc, tot, pct, pct >= 70, null);
      }

      function showServerError(msg) {
        scoreEl.classList.add('is-shown');
        scoreEl.innerHTML = '<span class="band band--low">' + (msg || 'Connexion requise pour la correction serveur de cet examen.') + '</span>';
      }

      function submitWithSession(sid) {
        return fetch('/api/qcm/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            sessionId: sid,
            courseId: getCourseId(),
            chapter: 'exam',
            answers: userAnswers
          })
        }).then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          return res.json();
        }).then(function (data) {
          finalizeExam(data.score, data.total, data.percentage, data.passed, data.results);
        });
      }

      var sessionId = window.__examSessionId;
      if (typeof fetch === 'function' && (sessionId || isSecure)) {
        var timerEl = document.querySelector('[data-timer]');
        var examMinutes = (timerEl && Number(timerEl.getAttribute('data-minutes'))) || 120;
        var sessionPromise = sessionId
          ? Promise.resolve(sessionId)
          : fetch('/api/qcm/session/start', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                courseId: getCourseId(),
                chapter: 'exam',
                durationMinutes: examMinutes
              })
            }).then(function (res) {
              if (!res.ok) throw new Error('AUTH_' + res.status);
              return res.json();
            }).then(function (data) {
              if (!data || !data.sessionId) throw new Error('NO_SESSION');
              window.__examSessionId = data.sessionId;
              return data.sessionId;
            });

        sessionPromise.then(submitWithSession).catch(function (err) {
          if (!isSecure && qcm.querySelector('.opt[data-correct="1"]')) {
            localGrade();
          } else {
            var authMsg = (err && /^AUTH_40[13]$/.test(err.message))
              ? 'Activez ou connectez votre compte avant de valider cet examen officiel.'
              : 'Impossible de contacter le serveur d’examen. Vérifiez votre connexion et réessayez.';
            showServerError(authMsg);
          }
        });
      } else if (!isSecure) {
        localGrade();
      } else {
        showServerError();
      }
    }

    submitBtn.addEventListener('click', executeSubmit);
    qcm.__submitExam = executeSubmit;
  }

  function getCourseId() {
    try {
      var segs = (window.location.pathname || '').split('/').filter(Boolean);
      if (segs.length > 0 && segs[0] !== 'chapitres' && segs[0] !== 'exercices') {
        return decodeURIComponent(segs[0]);
      }
    } catch (e) { /* ignore */ }
    return String(STORE || '').replace(/:progress$/, '') || 'course';
  }

  function computeCardHash(card, idx) {
    var existing = card.getAttribute('data-card-hash');
    if (existing) return existing;
    var face = card.querySelector('.fc__face');
    var raw = ((face ? face.textContent : card.textContent) || '').replace(/^Question\s*/i, '').trim() || ('card-' + idx);
    var h = 2166136261;
    for (var i = 0; i < raw.length; i++) {
      h ^= raw.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    var hash = 'fc-' + (h >>> 0).toString(16);
    card.setAttribute('data-card-hash', hash);
    return hash;
  }

  /* ---------- Flashcards & Répétition Espacée Leitner ---------- */
  function initCards() {
    var cards = Array.prototype.slice.call(document.querySelectorAll('.fc'));
    if (!cards.length) return;

    var courseId = getCourseId();
    var leitnerIntervals = { again: 1, hard: 3, easy: 7 };
    var p = readProgress();
    var leitnerMap = (p && p.leitner) || {};
    var activeCard = cards[0];

    function setActiveCard(card) {
      if (!card) return;
      activeCard = card;
      cards.forEach(function (c) {
        c.classList.toggle('is-active', c === card);
      });
      var hash = computeCardHash(card, cards.indexOf(card));
      var entry = leitnerMap[hash];
      var currentRating = entry ? entry.rating : '';
      document.querySelectorAll('[data-leitner]').forEach(function (btn) {
        var r = btn.getAttribute('data-leitner');
        btn.classList.toggle('is-selected', r === currentRating);
        btn.setAttribute('aria-pressed', r === currentRating ? 'true' : 'false');
      });
    }

    cards.forEach(function (card, idx) {
      var hash = computeCardHash(card, idx);
      if (leitnerMap[hash] && leitnerMap[hash].rating) {
        card.setAttribute('data-leitner-state', leitnerMap[hash].rating);
        if (leitnerMap[hash].nextReview) {
          card.setAttribute('data-next-review', String(leitnerMap[hash].nextReview));
        }
      }
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-pressed', 'false');
      function flip() {
        var flipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', flipped ? 'true' : 'false');
        setActiveCard(card);
      }
      card.addEventListener('click', flip);
      card.addEventListener('focus', function () { setActiveCard(card); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flip(); }
      });
    });

    // Filtrer / trier les cartes à revoir en priorité dans chaque grille .cards
    var now = Date.now();
    document.querySelectorAll('.cards').forEach(function (grid) {
      var gridCards = Array.prototype.slice.call(grid.querySelectorAll('.fc'));
      gridCards.sort(function (a, b) {
        var ha = a.getAttribute('data-card-hash') || '';
        var hb = b.getAttribute('data-card-hash') || '';
        var ea = leitnerMap[ha];
        var eb = leitnerMap[hb];
        var dueA = (!ea || !ea.nextReview || ea.nextReview <= now || ea.rating === 'again') ? 0 : ea.nextReview;
        var dueB = (!eb || !eb.nextReview || eb.nextReview <= now || eb.rating === 'again') ? 0 : eb.nextReview;
        return dueA - dueB;
      });
      gridCards.forEach(function (c) { grid.appendChild(c); });
    });

    // Garantir la présence de la barre Leitner sous la carte active si absente du DOM
    var leitnerBar = document.querySelector('[data-leitner-bar], .leitner-bar');
    if (!leitnerBar && document.querySelector('.cards')) {
      leitnerBar = document.createElement('div');
      leitnerBar.className = 'leitner-bar';
      leitnerBar.setAttribute('data-leitner-bar', '');
      leitnerBar.setAttribute('role', 'group');
      leitnerBar.setAttribute('aria-label', 'Répétition espacée Leitner');
      leitnerBar.innerHTML =
        '<button type="button" class="btn leitner-btn leitner-btn--again" data-leitner="again">À revoir · 1j</button>' +
        '<button type="button" class="btn leitner-btn leitner-btn--hard" data-leitner="hard">Moyen · 3j</button>' +
        '<button type="button" class="btn leitner-btn leitner-btn--easy" data-leitner="easy">Acquis · 7j</button>';
      var firstGrid = document.querySelector('.cards');
      if (firstGrid && firstGrid.parentNode) {
        firstGrid.parentNode.insertBefore(leitnerBar, firstGrid);
      }
    }

    document.querySelectorAll('[data-leitner]').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        var rating = btn.getAttribute('data-leitner');
        if (!rating || !activeCard) return;
        var days = leitnerIntervals[rating] || 1;
        var nextReview = Date.now() + days * 86400000;
        var cardHash = computeCardHash(activeCard, cards.indexOf(activeCard));

        var pp = readProgress();
        pp.leitner = pp.leitner || {};
        pp.leitner[cardHash] = {
          rating: rating,
          intervalDays: days,
          updatedAt: Date.now(),
          nextReview: nextReview
        };
        leitnerMap = pp.leitner;
        writeProgress(pp);

        activeCard.setAttribute('data-leitner-state', rating);
        activeCard.setAttribute('data-next-review', String(nextReview));
        setActiveCard(activeCard);

        window.dispatchEvent(new CustomEvent('rd:flashcard-review', {
          detail: {
            courseId: courseId,
            cardHash: cardHash,
            rating: rating,
            nextReview: nextReview
          }
        }));
      });
    });

    setActiveCard(cards[0]);
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
        window.dispatchEvent(new CustomEvent('rd:chapter-mastery', {
          detail: {
            courseId: getCourseId(),
            chapter: Number(chapter) || chapter,
            mastered: !!mark.checked,
            done: !!mark.checked
          }
        }));
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

      // Initialiser la session d’examen sur le serveur
      if (typeof fetch === 'function') {
        fetch('/api/qcm/session/start', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            courseId: getCourseId(),
            chapter: 'exam',
            durationMinutes: mins
          })
        }).then(function (res) {
          return res.ok ? res.json() : null;
        }).then(function (data) {
          if (data && data.sessionId) {
            window.__examSessionId = data.sessionId;
          }
        }).catch(function () {});
      }

      id = setInterval(function () {
        left--;
        var m = String(Math.floor(left / 60)).padStart(2, '0');
        var s = String(left % 60).padStart(2, '0');
        out.textContent = m + ':' + s;
        if (left <= 0) {
          clearInterval(id);
          out.textContent = 'Temps écoulé';
          // Auto-validation de l’examen à la fin du temps imparti
          document.querySelectorAll('.qcm').forEach(function (q) {
            if (typeof q.__submitExam === 'function') q.__submitExam();
          });
        }
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
